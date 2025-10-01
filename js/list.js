// 경기 리스트 페이지 메인 로직
class MatchListPage {
  constructor() {
    this.matchListData = window.matchListData;
    this.init();
  }

  // 페이지 초기화
  init() {
    this.bindEvents();
    this.loadMatches();
  }

  // 이벤트 바인딩
  bindEvents() {
    // 종목 내비게이션 이벤트
    this.bindSportNavigation();
    
    // 필터 이벤트
    this.bindFilterEvents();
    
    // 새로고침 이벤트
    this.bindRefreshEvents();
    
    // 스크롤 업 버튼 이벤트
    this.bindScrollToTopButton();
  }

  // 종목 내비게이션 이벤트 바인딩
  bindSportNavigation() {
    const sportNavItems = document.querySelectorAll('.list-sport-nav-item');
    
    sportNavItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // 활성 상태 변경
        sportNavItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // 필터 적용
        const sport = item.getAttribute('data-sport');
        this.matchListData.setSportFilter(sport);
      });
    });
  }

  // 필터 이벤트 바인딩
  bindFilterEvents() {
    // 리그 필터
    const leagueFilter = document.getElementById('leagueFilter');
    if (leagueFilter) {
      leagueFilter.addEventListener('change', (e) => {
        this.matchListData.setLeagueFilter(e.target.value);
      });
    }

    // 상태 필터
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.matchListData.setStatusFilter(e.target.value);
      });
    }
  }

  // 새로고침 이벤트 바인딩
  bindRefreshEvents() {
    // 페이지 새로고침 시에도 데이터 유지
    window.addEventListener('beforeunload', () => {
      // 필요한 경우 로컬 스토리지에 상태 저장
      const state = {
        currentSport: this.matchListData.currentSport,
        currentLeague: this.matchListData.currentLeague,
        currentStatus: this.matchListData.currentStatus
      };
      localStorage.setItem('matchListState', JSON.stringify(state));
    });

    // 페이지 로드 시 상태 복원
    window.addEventListener('load', () => {
      const savedState = localStorage.getItem('matchListState');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.restoreState(state);
      }
    });
  }

  // 상태 복원
  restoreState(state) {
    // 종목 필터 복원
    if (state.currentSport) {
      const sportNav = document.querySelector(`[data-sport="${state.currentSport}"]`);
      if (sportNav) {
        document.querySelectorAll('.list-sport-nav-item').forEach(nav => nav.classList.remove('active'));
        sportNav.classList.add('active');
        this.matchListData.setSportFilter(state.currentSport);
      }
    }

    // 리그 필터 복원
    if (state.currentLeague) {
      const leagueFilter = document.getElementById('leagueFilter');
      if (leagueFilter) {
        leagueFilter.value = state.currentLeague;
        this.matchListData.setLeagueFilter(state.currentLeague);
      }
    }

    // 상태 필터 복원
    if (state.currentStatus) {
      const statusFilter = document.getElementById('statusFilter');
      if (statusFilter) {
        statusFilter.value = state.currentStatus;
        this.matchListData.setStatusFilter(state.currentStatus);
      }
    }
  }

  // 경기 데이터 로드
  async loadMatches() {
    await this.matchListData.fetchMatches();
  }

  // 실시간 업데이트 (선택사항)
  startRealTimeUpdates() {
    // 30초마다 데이터 새로고침
    setInterval(async () => {
      await this.matchListData.fetchMatches();
    }, 30000);
  }

  // 검색 기능 (추가 기능)
  initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      let searchTimeout;
      
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
          const query = e.target.value.toLowerCase();
          this.performSearch(query);
        }, 300);
      });
    }
  }

  // 검색 수행
  performSearch(query) {
    if (!query) {
      this.matchListData.applyFilters();
      this.matchListData.renderMatches();
      return;
    }

    const filteredMatches = this.matchListData.matches.filter(match => {
      const searchText = [
        match.HOME_TEAM_NAME,
        match.AWAY_TEAM_NAME,
        match.LEAGUE_NAME,
        this.matchListData.getSportName(match.COMPE)
      ].join(' ').toLowerCase();

      return searchText.includes(query);
    });

    this.matchListData.filteredMatches = filteredMatches;
    this.matchListData.renderMatches();
  }

  // 스크롤 업 버튼 기능
  bindScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (!scrollToTopBtn) return;

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    // 버튼 클릭 이벤트
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 날짜 내비게이션이 먼저 초기화되도록 순서 조정
  if (window.dateNavigation) {
    console.log('날짜 내비게이션 초기화 완료');
  }
  
  window.matchListPage = new MatchListPage();
  
  // 실시간 업데이트 시작 (선택사항)
  // window.matchListPage.startRealTimeUpdates();
});

// 전역 함수들
function goToDetail(matchId) {
  if (window.matchListData) {
    window.matchListData.goToDetail(matchId);
  }
}

// API 연동을 위한 헬퍼 함수들
const API = {
  // 실제 API 엔드포인트 설정
  BASE_URL: 'https://your-api-domain.com/api',
  
  // 경기 목록 가져오기
  async getMatches(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.BASE_URL}/matches?${queryString}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 필요한 경우 인증 헤더 추가
          // 'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API 호출 실패:', error);
      throw error;
    }
  },

  // 특정 경기 상세 정보 가져오기
  async getMatchDetail(matchId) {
    const url = `${this.BASE_URL}/matches/${matchId}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('경기 상세 정보 로드 실패:', error);
      throw error;
    }
  }
};

// 전역으로 API 노출
window.API = API; 