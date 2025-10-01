// 경기 리스트 데이터 관리
class MatchListData {
  constructor() {
    this.matches = [];
    this.filteredMatches = [];
    this.currentSport = 'all';
    this.currentLeague = '';
    this.currentStatus = '';
    this.currentDate = this.getTodayDateString();
    this.isLoading = false;
    console.log('MatchListData 초기화 - 현재 날짜:', this.currentDate);
  }

  // API에서 경기 데이터 가져오기
  async fetchMatches() {
    this.isLoading = true;
    this.showLoading();

    try {
      // 실제 API 엔드포인트 (프록시를 통해)
      const url = `/api/data3V1/livescore/gameList?auth_key=J52SzTtpbEb8oe3baB9q55WDQZcfpVAV&search_date=${this.currentDate}`;
      console.log('API 호출 URL:', url);
      
      const response = await fetch(url);
      console.log('API 응답 상태:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API 응답 데이터:', data);
      console.log('데이터 타입:', typeof data);
      console.log('데이터 키들:', Object.keys(data));
      
      // API 응답을 우리 형식으로 변환
      // API 응답 구조에 따라 Data.list, list, gameList 또는 Data.gameList 확인
      const gameList = data.Data?.list || data.list || data.gameList || data.Data?.gameList || [];
      this.matches = this.transformApiData(gameList);
      
      // 데이터가 없을 때만 임시 데이터 사용
      if (this.matches.length === 0) {
        console.log('API에서 데이터를 가져올 수 없어 임시 데이터를 사용합니다.');
        this.matches = this.getMockData();
      }

      this.applyFilters();
      this.renderMatches();
    } catch (error) {
      console.error('경기 데이터 로드 실패:', error);
      // 에러 시에도 임시 데이터 표시
      this.matches = this.getMockData();
      this.applyFilters();
      this.renderMatches();
    } finally {
      this.isLoading = false;
      this.hideLoading();
    }
  }

  // API 데이터를 우리 형식으로 변환
  transformApiData(gameList) {
    return gameList.map(game => ({
      id: game.GAME_ID,
      COMPE: game.COMPE,
      LEAGUE_NAME: this.decodeKoreanText(game.LEAGUE_NAME),
      MATCH_TIME: this.formatMatchDateTime(game.MATCH_DATE, game.MATCH_TIME),
      HOME_TEAM_ID: game.HOME_TEAM_ID,
      AWAY_TEAM_ID: game.AWAY_TEAM_ID,
      HOME_TEAM_NAME: this.decodeKoreanText(game.HOME_TEAM_NAME),
      AWAY_TEAM_NAME: this.decodeKoreanText(game.AWAY_TEAM_NAME),
      HOME_SCORE: game.HOME_SCORE || null,
      AWAY_SCORE: game.AWAY_SCORE || null,
      status: this.convertStateToStatus(game.STATE),
      ARENA_NAME: this.decodeKoreanText(game.ARENA_NAME)
    }));
  }

  // 한글 텍스트 디코딩 (임시 해결책)
  decodeKoreanText(text) {
    if (!text) return '';
    
    // 이미 정상적인 한글이면 그대로 반환
    if (/[가-힣]/.test(text)) {
      return text;
    }
    
    // 깨진 한글 매핑 (임시 해결책)
    const koreanMapping = {
      'ì¬ë¦¼í½ ë°°êµ¬': '한국 배구',
      'ì¬ë¦¼í½ ì¶êµ¬': '한국 축구',
      'ë°°êµ¬ êµ­ì ì¹ì ì': '배구 여자부 리그',
      'ë´ë§í¬ ìíë¥´ë¦¬ê°': '브라질 세리에A',
      'ë¬ìì íë¦¬ë¯¸ì´ë¦¬ê·¸': '스페인 프리메라리그',
      'í"ì¤': '대한항공',
      'ë"ì¼': '우리카드',
      'ëª¨ë¡ì½': '현대캐피탈',
      'ì¤í"ì¸': '한국전력',
      'ë"í"ë¯¼êµ­': '흥국생명',
      'ë°"ì¼ë ': '울산현대',
      'ë¸ë¥ì¸ë"': '전북현대',
      'Sëª¨ì¤í¬ë°': 'S대전시티',
      'ì¬ë§¼': '광주FC'
    };
    
    return koreanMapping[text] || text;
  }

  // 날짜와 시간을 결합하여 ISO 형식으로 변환
  formatMatchDateTime(date, time) {
    if (!date || !time) return '';
    
    // YYYYMMDD 형식을 YYYY-MM-DD로 변환
    const formattedDate = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;
    
    // HH:MM 형식의 시간과 결합
    return `${formattedDate} ${time}`;
  }

  // API 상태 코드를 우리 상태로 변환
  convertStateToStatus(state) {
    const stateMap = {
      'B': 'upcoming',  // Before - 경기 전
      'L': 'live',      // Live - 진행중
      'F': 'finished',  // Finished - 종료
      'P': 'postponed', // Postponed - 연기
      'C': 'cancelled'  // Cancelled - 취소
    };
    
    return stateMap[state] || 'upcoming';
  }

  // 임시 데이터 (API 연동 전까지 사용)
  getMockData() {
    return [
      {
        id: 'match-001',
        COMPE: 'soccer',
        LEAGUE_NAME: '프리미어리그',
        MATCH_TIME: '2024-02-17 21:30',
        HOME_TEAM_ID: 'OT31017',
        AWAY_TEAM_ID: 'OT31018',
        HOME_TEAM_NAME: '맨체스터 유나이티드',
        AWAY_TEAM_NAME: '리버풀',
        HOME_SCORE: 2,
        AWAY_SCORE: 1,
        status: 'live'
      },
      {
        id: 'match-002',
        COMPE: 'soccer',
        LEAGUE_NAME: '라리가',
        MATCH_TIME: '2024-02-17 23:00',
        HOME_TEAM_ID: 'OT31019',
        AWAY_TEAM_ID: 'OT31020',
        HOME_TEAM_NAME: '레알 마드리드',
        AWAY_TEAM_NAME: '바르셀로나',
        HOME_SCORE: null,
        AWAY_SCORE: null,
        status: 'upcoming'
      },
      {
        id: 'match-003',
        COMPE: 'baseball',
        LEAGUE_NAME: 'KBO',
        MATCH_TIME: '2024-02-17 18:30',
        HOME_TEAM_ID: 'OT31021',
        AWAY_TEAM_ID: 'OT31022',
        HOME_TEAM_NAME: '삼성 라이온즈',
        AWAY_TEAM_NAME: '두산 베어스',
        HOME_SCORE: 5,
        AWAY_SCORE: 3,
        status: 'finished'
      },
      {
        id: 'match-004',
        COMPE: 'basketball',
        LEAGUE_NAME: 'KBL',
        MATCH_TIME: '2024-02-17 19:00',
        HOME_TEAM_ID: 'OT31023',
        AWAY_TEAM_ID: 'OT31024',
        HOME_TEAM_NAME: '울산 현대모비스',
        AWAY_TEAM_NAME: '서울 SK',
        HOME_SCORE: 89,
        AWAY_SCORE: 92,
        status: 'finished'
      },
      {
        id: 'match-005',
        COMPE: 'volleyball',
        LEAGUE_NAME: 'V리그',
        MATCH_TIME: '2024-02-17 20:00',
        HOME_TEAM_ID: 'OT31025',
        AWAY_TEAM_ID: 'OT31026',
        HOME_TEAM_NAME: '대한항공',
        AWAY_TEAM_NAME: '우리카드',
        HOME_SCORE: null,
        AWAY_SCORE: null,
        status: 'upcoming'
      }
    ];
  }

  // 필터 적용
  applyFilters() {
    this.filteredMatches = this.matches.filter(match => {
      // 종목 필터
      if (this.currentSport === 'all') {
        // 전체 선택 시 축구, 야구, 농구, 배구만 표시
        const mainSports = ['soccer', 'baseball', 'basketball', 'volleyball'];
        if (!mainSports.includes(match.COMPE)) {
          return false;
        }
      } else if (match.COMPE !== this.currentSport) {
        return false;
      }

      // 리그 필터
      if (this.currentLeague && match.LEAGUE_NAME !== this.currentLeague) {
        return false;
      }

      // 상태 필터
      if (this.currentStatus && match.status !== this.currentStatus) {
        return false;
      }

      return true;
    });

    this.updateLeagueFilter();
  }

  // 리그 필터 옵션 업데이트
  updateLeagueFilter() {
    const leagueFilter = document.getElementById('leagueFilter');
    if (!leagueFilter) return;

    // 현재 선택된 종목의 리그들만 표시
    let filteredMatches;
    if (this.currentSport === 'all') {
      // 전체 선택 시 축구, 야구, 농구, 배구만 표시
      const mainSports = ['soccer', 'baseball', 'basketball', 'volleyball'];
      filteredMatches = this.matches.filter(match => mainSports.includes(match.COMPE));
    } else {
      filteredMatches = this.matches.filter(match => match.COMPE === this.currentSport);
    }

    const leagues = [...new Set(filteredMatches.map(match => match.LEAGUE_NAME))];

    // 기존 옵션 제거 (전체 리그 제외)
    while (leagueFilter.children.length > 1) {
      leagueFilter.removeChild(leagueFilter.lastChild);
    }

    // 새로운 옵션 추가
    leagues.forEach(league => {
      const option = document.createElement('option');
      option.value = league;
      option.textContent = league;
      leagueFilter.appendChild(option);
    });
  }

  // 경기 카드 렌더링
  renderMatches() {
    const matchList = document.getElementById('matchList');
    const emptyState = document.getElementById('emptyState');
    
    if (!matchList) return;

    matchList.innerHTML = '';

    if (this.filteredMatches.length === 0) {
      matchList.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    matchList.style.display = 'grid';
    emptyState.style.display = 'none';

    this.filteredMatches.forEach(match => {
      const matchCard = this.createMatchCard(match);
      matchList.appendChild(matchCard);
    });
  }

  // 경기 카드 생성
  createMatchCard(match) {
    const template = document.getElementById('matchCardTemplate');
    if (!template) return document.createElement('div');

    const card = template.content.cloneNode(true);
    const matchCard = card.querySelector('.list-match-card');

    // 경기 ID 설정
    matchCard.setAttribute('data-match-id', match.id);
    matchCard.classList.add(`list-sport-${match.COMPE}`);
    matchCard.classList.add(`list-match-status-${match.status}`);

    // 헤더 정보
    const sportBadge = matchCard.querySelector('.list-match-sport-badge');
    const league = matchCard.querySelector('.list-match-league');
    const time = matchCard.querySelector('.list-match-time');

    sportBadge.textContent = this.getSportName(match.COMPE);
    league.textContent = match.LEAGUE_NAME;
    time.textContent = this.formatTime(match.MATCH_TIME);

    // 팀 정보
    const homeTeamName = matchCard.querySelector('.list-home-team .list-team-name');
    const awayTeamName = matchCard.querySelector('.list-away-team .list-team-name');
    const homeScore = matchCard.querySelector('.list-home-team .list-team-score');
    const awayScore = matchCard.querySelector('.list-away-team .list-team-score');
    const homeTeamLogo = matchCard.querySelector('.list-home-team .list-team-logo');
    const awayTeamLogo = matchCard.querySelector('.list-away-team .list-team-logo');

    homeTeamName.textContent = match.HOME_TEAM_NAME;
    awayTeamName.textContent = match.AWAY_TEAM_NAME;
    homeScore.textContent = match.HOME_SCORE !== null ? match.HOME_SCORE : '-';
    awayScore.textContent = match.AWAY_SCORE !== null ? match.AWAY_SCORE : '-';
    
    // 팀 로고 설정
    if (homeTeamLogo) {
      homeTeamLogo.src = this.getTeamLogoUrl(match.HOME_TEAM_ID);
      homeTeamLogo.alt = match.HOME_TEAM_NAME;
    }
    if (awayTeamLogo) {
      awayTeamLogo.src = this.getTeamLogoUrl(match.AWAY_TEAM_ID);
      awayTeamLogo.alt = match.AWAY_TEAM_NAME;
    }

    // 상세보기 버튼
    const detailBtn = matchCard.querySelector('.list-btn-detail');
    detailBtn.onclick = (e) => {
      e.stopPropagation();
      this.goToDetail(match.id);
    };

    // 카드 클릭 이벤트
    matchCard.onclick = () => {
      this.goToDetail(match.id);
    };

    return matchCard;
  }

  // 종목명 변환
  getSportName(compe) {
    const sportNames = {
      'soccer': '축구',
      'baseball': '야구',
      'basketball': '농구',
      'volleyball': '배구',
      'tennis': '테니스',
      'badminton': '배드민턴',
      'table_tennis': '탁구',
      'hockey': '하키',
      'rugby': '럭비',
      'cricket': '크리켓'
    };
    return sportNames[compe] || compe;
  }

  // 팀 로고 URL 생성
  getTeamLogoUrl(teamId) {
    if (!teamId) {
      return '/image/Team Logo.png'; // 기본 로고
    }
    return `http://lscdn.psynet.co.kr/livescore/photo/spt/livescore/emb_new/emblem_mid_${teamId}.png`;
  }

  // 시간 포맷팅
  formatTime(timeString) {
    if (!timeString) return '';
    
    const date = new Date(timeString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return '종료';
    } else if (diffDays === 0) {
      return date.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffDays === 1) {
      return '내일 ' + date.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('ko-KR', { 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  // 상세 페이지로 이동
  goToDetail(matchId) {
    window.location.href = `detail.html?match=${matchId}`;
  }

  // 로딩 상태 표시
  showLoading() {
    const loadingContainer = document.getElementById('loadingContainer');
    if (loadingContainer) {
      loadingContainer.style.display = 'flex';
    }
  }

  // 로딩 상태 숨김
  hideLoading() {
    const loadingContainer = document.getElementById('loadingContainer');
    if (loadingContainer) {
      loadingContainer.style.display = 'none';
    }
  }

  // 종목 필터 변경
  setSportFilter(sport) {
    this.currentSport = sport;
    this.currentLeague = ''; // 종목 변경 시 리그 필터 초기화
    this.applyFilters();
    this.renderMatches();
  }

  // 리그 필터 변경
  setLeagueFilter(league) {
    this.currentLeague = league;
    this.applyFilters();
    this.renderMatches();
  }

  // 상태 필터 변경
  setStatusFilter(status) {
    this.currentStatus = status;
    this.applyFilters();
    this.renderMatches();
  }

  // 날짜 필터 변경
  setDateFilter(date) {
    console.log('날짜 필터 변경:', this.currentDate, '->', date);
    this.currentDate = date;
    this.fetchMatches(); // 날짜 변경 시 API 재호출
  }

  // 오늘 날짜를 YYYYMMDD 형식으로 반환
  getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}${month}${day}`;
    console.log('현재 날짜:', dateString);
    return dateString;
  }
}

// 전역 인스턴스 생성
window.matchListData = new MatchListData(); 