// 상세 페이지 경기 정보 관리
class MatchDetailData {
  constructor() {
    this.matchId = null;
    this.matchData = null;
    this.isLoading = false;
  }

  // URL에서 경기 ID 추출
  getMatchIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('match');
  }

  // 경기 상세 정보 가져오기
  async fetchMatchDetail() {
    this.matchId = this.getMatchIdFromUrl();
    
    if (!this.matchId) {
      console.error('경기 ID가 없습니다.');
      this.renderDefaultMatchInfo();
      return;
    }

    this.isLoading = true;
    this.showLoading();

    try {
      console.log('상세 페이지 - 경기 ID:', this.matchId);
      
      // 전체 경기 목록에서 해당 경기 찾기 (최근 7일 데이터 검색)
      const today = new Date();
      const dates = [];
      
      // 최근 7일간의 날짜 생성
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        dates.push(`${year}${month}${day}`);
      }

      let match = null;
      
      // 각 날짜별로 경기 검색
      for (const date of dates) {
        console.log(`날짜 ${date}에서 경기 검색 중...`);
        const response = await fetch(`/api/data3V1/livescore/gameList?auth_key=J52SzTtpbEb8oe3baB9q55WDQZcfpVAV&search_date=${date}`);
        
        if (response.ok) {
          const data = await response.json();
          const gameList = data.Data?.list || data.list || data.gameList || data.Data?.gameList || [];
          
          // 경기 ID로 해당 경기 찾기
          match = gameList.find(game => game.GAME_ID === this.matchId);
          
          if (match) {
            console.log(`경기를 찾았습니다! 날짜: ${date}`);
            break;
          }
        }
      }
      
      if (match) {
        this.matchData = this.transformApiData(match);
        this.renderMatchInfo();
      } else {
        console.error('해당 경기를 찾을 수 없습니다.');
        this.renderDefaultMatchInfo();
      }
    } catch (error) {
      console.error('경기 상세 정보 로드 실패:', error);
      this.renderDefaultMatchInfo();
    } finally {
      this.isLoading = false;
      this.hideLoading();
    }
  }

  // API 데이터를 우리 형식으로 변환
  transformApiData(game) {
    return {
      id: game.GAME_ID,
      COMPE: game.COMPE,
      LEAGUE_NAME: this.decodeKoreanText(game.LEAGUE_NAME),
      MATCH_DATE: game.MATCH_DATE,
      MATCH_TIME: game.MATCH_TIME,
      HOME_TEAM_ID: game.HOME_TEAM_ID,
      AWAY_TEAM_ID: game.AWAY_TEAM_ID,
      HOME_TEAM_NAME: this.decodeKoreanText(game.HOME_TEAM_NAME),
      AWAY_TEAM_NAME: this.decodeKoreanText(game.AWAY_TEAM_NAME),
      HOME_SCORE: game.HOME_SCORE || null,
      AWAY_SCORE: game.AWAY_SCORE || null,
      status: this.convertStateToStatus(game.STATE),
      ARENA_NAME: this.decodeKoreanText(game.ARENA_NAME),
      ARENA_ID: game.ARENA_ID
    };
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

  // API 상태 코드를 우리 상태로 변환
  convertStateToStatus(state) {
    const stateMap = {
      'B': 'upcoming',
      'L': 'live',
      'F': 'finished',
      'P': 'postponed',
      'C': 'cancelled'
    };
    
    return stateMap[state] || 'upcoming';
  }

  // 경기 정보 렌더링
  renderMatchInfo() {
    if (!this.matchData) {
      this.renderDefaultMatchInfo();
      return;
    }

    // 페이지 타이틀 및 meta description 업데이트
    this.updatePageTitle();
    this.updateMetaDescription();

    const html = `
      <div class="team home-team">
        <img src="${this.getTeamLogoUrl(this.matchData.HOME_TEAM_ID)}" alt="${this.matchData.HOME_TEAM_NAME}" class="team-logo">
        <div class="team-info">
          <div class="team-color" style="background-color: #BB2828;"></div>
          <div class="team-name">${this.matchData.HOME_TEAM_NAME}</div>
        </div>
      </div>
      <div class="vs-text">VS</div>
      <div class="team away-team">
        <img src="${this.getTeamLogoUrl(this.matchData.AWAY_TEAM_ID)}" alt="${this.matchData.AWAY_TEAM_NAME}" class="team-logo">
        <div class="team-info">
          <div class="team-color" style="background-color: #1E3384;"></div>
          <div class="team-name">${this.matchData.AWAY_TEAM_NAME}</div>
        </div>
      </div>
    `;
    
    $('section.match-info').html(html);
  }

  // 페이지 타이틀 업데이트
  updatePageTitle() {
    if (!this.matchData) {
      document.title = '경기 상세';
      return;
    }

    const homeTeam = this.matchData.HOME_TEAM_NAME;
    const awayTeam = this.matchData.AWAY_TEAM_NAME;
    document.title = `${homeTeam} vs ${awayTeam}`;
  }

  // Meta description 업데이트
  updateMetaDescription() {
    if (!this.matchData) {
      this.setMetaDescription('경기 상세 정보를 확인하세요.');
      return;
    }

    const homeTeam = this.matchData.HOME_TEAM_NAME;
    const awayTeam = this.matchData.AWAY_TEAM_NAME;
    const league = this.matchData.LEAGUE_NAME;
    const arena = this.matchData.ARENA_NAME;
    const sport = this.getSportName(this.matchData.COMPE);
    const matchDate = this.formatMatchDate(this.matchData.MATCH_DATE);
    const matchTime = this.formatMatchTime(this.matchData.MATCH_TIME);
    
    // 디버깅을 위한 로그
    console.log('MATCH_TIME 원본 데이터:', this.matchData.MATCH_TIME);
    console.log('포맷팅된 시간:', matchTime);
    console.log('ARENA_NAME 데이터:', arena);
    console.log('COMPE 데이터:', this.matchData.COMPE);
    
    // 경기장 정보가 있으면 포함, 없으면 제외
    const arenaInfo = arena ? ` 경기장: ${arena}.` : '';
    const description = `${homeTeam} vs ${awayTeam} - ${sport} ${league} 경기 정보. 경기 일시: ${matchDate} ${matchTime}.${arenaInfo} 실시간 배당 분석과 통계를 확인하세요.`;
    
    this.setMetaDescription(description);
  }

  // Meta description 설정
  setMetaDescription(description) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }

  // 경기 일자 포맷팅 (YYYYMMDD -> YYYY년 MM월 DD일)
  formatMatchDate(dateString) {
    if (!dateString || dateString.length !== 8) {
      return '날짜 미정';
    }
    
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    
    return `${year}년 ${month}월 ${day}일`;
  }

  // 경기 시간 포맷팅 (다양한 형태 지원)
  formatMatchTime(timeString) {
    if (!timeString) {
      return '시간 미정';
    }
    
    // 이미 HH:MM 형태인 경우
    if (timeString.includes(':')) {
      return timeString;
    }
    
    // HHMM 형태인 경우 (4자리)
    if (timeString.length === 4) {
      const hour = timeString.substring(0, 2);
      const minute = timeString.substring(2, 4);
      return `${hour}:${minute}`;
    }
    
    // HHMMSS 형태인 경우 (6자리) - 초는 제거
    if (timeString.length === 6) {
      const hour = timeString.substring(0, 2);
      const minute = timeString.substring(2, 4);
      return `${hour}:${minute}`;
    }
    
    // 그 외의 경우 원본 그대로 반환
    return timeString;
  }

  // 종목 코드를 종목명으로 변환
  getSportName(compeCode) {
    if (!compeCode) {
      return '스포츠';
    }
    
    const sportMapping = {
      'soccer': '축구',
      'baseball': '야구',
      'basketball': '농구',
      'volleyball': '배구',
      'tennis': '테니스',
      'hockey': '하키',
      'rugby': '럭비',
      'golf': '골프',
      'esports': 'e스포츠'
    };
    
    return sportMapping[compeCode.toLowerCase()] || compeCode;
  }

  // 기본 경기 정보 렌더링 (에러 시)
  renderDefaultMatchInfo() {
    // 기본 타이틀 및 meta description 설정
    document.title = '경기 상세';
    this.setMetaDescription('경기 상세 정보를 확인하세요.');
    
    const html = `
      <div class="team home-team">
        <img src="${this.getTeamLogoUrl(null)}" alt="홈팀" class="team-logo">
        <div class="team-info">
          <div class="team-color" style="background-color: #BB2828;"></div>
          <div class="team-name">홈팀</div>
        </div>
      </div>
      <div class="vs-text">VS</div>
      <div class="team away-team">
        <img src="${this.getTeamLogoUrl(null)}" alt="원정팀" class="team-logo">
        <div class="team-info">
          <div class="team-color" style="background-color: #1E3384;"></div>
          <div class="team-name">원정팀</div>
        </div>
      </div>
    `;
    
    $('section.match-info').html(html);
  }

  // 로딩 상태 표시
  showLoading() {
    const matchInfo = $('section.match-info');
    if (matchInfo.length) {
      matchInfo.html(`
        <div style="text-align: center; padding: 20px;">
          <div class="loading-spinner" style="width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #1E3384; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
          <p style="color: #666; margin: 0;">경기 정보를 불러오는 중...</p>
        </div>
      `);
    }
  }

  // 로딩 상태 숨김
  hideLoading() {
    // 로딩 상태는 renderMatchInfo에서 자동으로 해제됨
  }

  // 경기 데이터 getter
  getMatchData() {
    return this.matchData;
  }

  // 경기 상태 getter
  getMatchStatus() {
    return this.matchData ? this.matchData.status : 'unknown';
  }

  // 종목 getter
  getSportType() {
    return this.matchData ? this.matchData.COMPE : 'soccer';
  }

  // 팀 로고 URL 생성
  getTeamLogoUrl(teamId) {
    if (!teamId) {
      return '/image/Team Logo.png'; // 기본 로고
    }
    return `http://lscdn.psynet.co.kr/livescore/photo/spt/livescore/emb_new/emblem_mid_${teamId}.png`;
  }

  // 오늘 날짜를 YYYYMMDD 형식으로 반환
  getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }
}

// 전역 인스턴스 생성
window.matchDetailData = new MatchDetailData(); 