// app-new.js
// 모듈화된 새로운 앱 파일

class OddsApp {
  
  constructor() {
    this.modules = {
      match1x2: null,
      handicap: null,
      overUnder: null
    };
    this.isInitialized = false;
  }

  // 초기화
  async init() {
    try {
      console.log('OddsApp 초기화 시작...');
      
      // 모듈 인스턴스 생성
      this.modules.match1x2 = new window.Match1x2();
      this.modules.handicap = new window.Handicap();
      this.modules.overUnder = new window.OverUnder();
      
      // 각 모듈 초기화
      this.modules.match1x2.init();
      this.modules.handicap.init();
      this.modules.overUnder.init();
      
      this.isInitialized = true;
      console.log('OddsApp 초기화 완료');
      
      return true;
    } catch (error) {
      console.error('OddsApp 초기화 실패:', error);
      return false;
    }
  }

  // 승무패 흐름 렌더링
  renderMatch1x2Flow(containerId = 'section-1x2-flow') {
    if (!this.isInitialized || !this.modules.match1x2) {
      console.error('Match1x2 모듈이 초기화되지 않았습니다.');
      return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
      return;
    }
    
    const html = this.modules.match1x2.renderFlow();
    container.innerHTML = html;
    
    // 꺾은선형 그래프 렌더링
    this.renderOddsTrendCharts(container);
    
    console.log('승무패 흐름 섹션 렌더링 완료');
  }

  // 승무패 통계 렌더링
  renderMatch1x2Stats(containerId = 'section-1x2-stats') {
    if (!this.isInitialized || !this.modules.match1x2) {
      console.error('Match1x2 모듈이 초기화되지 않았습니다.');
      return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
      return;
    }
    
    const html = this.modules.match1x2.renderStats();
    container.innerHTML = html;
    
    console.log('승무패 통계 섹션 렌더링 완료');
  }

  // 핸디캡 흐름 렌더링
  renderHandicapFlow(containerId = 'section-handicap-flow') {
    if (!this.isInitialized || !this.modules.handicap) {
      console.error('Handicap 모듈이 초기화되지 않았습니다.');
      return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
      return;
    }
    
    const html = this.modules.handicap.renderFlow();
    container.innerHTML = html;
    
    // 꺾은선형 그래프 렌더링
    this.renderOddsTrendCharts(container);
    
    console.log('핸디캡 흐름 섹션 렌더링 완료');
  }

  // 핸디캡 통계 렌더링
  renderHandicapStats(containerId = 'section-handicap-stats') {
    if (!this.isInitialized || !this.modules.handicap) {
      console.error('Handicap 모듈이 초기화되지 않았습니다.');
      return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
      return;
    }
    
    const html = this.modules.handicap.renderStats();
    container.innerHTML = html;
    
    console.log('핸디캡 통계 섹션 렌더링 완료');
  }

  // 언더오버 흐름 렌더링
  renderOverUnderFlow(containerId = 'section-overunder-flow') {
    if (!this.isInitialized || !this.modules.overUnder) {
      console.error('OverUnder 모듈이 초기화되지 않았습니다.');
      return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
      return;
    }
    
    const html = this.modules.overUnder.renderFlow();
    container.innerHTML = html;
    
    // 꺾은선형 그래프 렌더링
    this.renderOddsTrendCharts(container);
    
    console.log('언더오버 흐름 섹션 렌더링 완료');
  }

  // 언더오버 통계 렌더링
  renderOverUnderStats(containerId = 'section-overunder-stats') {
    if (!this.isInitialized || !this.modules.overUnder) {
      console.error('OverUnder 모듈이 초기화되지 않았습니다.');
      return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`컨테이너를 찾을 수 없습니다: ${containerId}`);
      return;
    }
    
    const html = this.modules.overUnder.renderStats();
    container.innerHTML = html;
    
    console.log('언더오버 통계 섹션 렌더링 완료');
  }

  // 모든 섹션 렌더링 (요청된 순서대로)
  renderAll() {
    if (!this.isInitialized) {
      console.error('앱이 초기화되지 않았습니다.');
      return;
    }
    
    console.log('모든 섹션 렌더링 시작...');
    
    // 승무패 배당 흐름
    this.renderMatch1x2Flow();
    // 승무패 배당 통계
    this.renderMatch1x2Stats();
    // 핸디캡 배당 흐름
    this.renderHandicapFlow();
    // 핸디캡 배당 통계
    this.renderHandicapStats();
    // 언더오버 배당 흐름
    this.renderOverUnderFlow();
    // 언더오버 배당 통계
    this.renderOverUnderStats();
    
    console.log('모든 섹션 렌더링 완료');
  }

  // 실시간 업데이트 시작
  startRealTimeUpdates() {
    if (!this.isInitialized) {
      console.error('앱이 초기화되지 않았습니다.');
      return;
    }
    
    console.log('실시간 업데이트 시작...');
    
    // 각 모듈의 실시간 업데이트 시작
    if (this.modules.match1x2) {
      this.modules.match1x2.startRealTimeUpdate();
    }
    if (this.modules.handicap) {
      this.modules.handicap.startRealTimeUpdate();
    }
    if (this.modules.overUnder) {
      this.modules.overUnder.startRealTimeUpdate();
    }
    
    console.log('실시간 업데이트 시작 완료');
  }

  // 실시간 업데이트 중지
  stopRealTimeUpdates() {
    console.log('실시간 업데이트 중지...');
    
    if (this.modules.match1x2) {
      this.modules.match1x2.stopRealTimeUpdate();
    }
    if (this.modules.handicap) {
      this.modules.handicap.stopRealTimeUpdate();
    }
    if (this.modules.overUnder) {
      this.modules.overUnder.stopRealTimeUpdate();
    }
    
    console.log('실시간 업데이트 중지 완료');
  }

  // 특정 모듈의 데이터 가져오기
  getModuleData(moduleName) {
    if (!this.isInitialized || !this.modules[moduleName]) {
      console.error(`모듈을 찾을 수 없습니다: ${moduleName}`);
      return null;
    }
    
    return this.modules[moduleName].data;
  }

  // 특정 모듈의 통계 가져오기
  getModuleStats(moduleName) {
    if (!this.isInitialized || !this.modules[moduleName]) {
      console.error(`모듈을 찾을 수 없습니다: ${moduleName}`);
      return null;
    }
    
    return this.modules[moduleName].stats;
  }

  // 라인 선택기 렌더링
  renderLineSelector(moduleName, containerId, onLineChange) {
    if (!this.isInitialized || !this.modules[moduleName]) {
      console.error(`모듈을 찾을 수 없습니다: ${moduleName}`);
      return;
    }
    
    this.modules[moduleName].renderLineSelector(containerId, onLineChange);
  }

  // 배팅 추천 가져오기 (언더오버만)
  getBettingRecommendation(line) {
    if (!this.isInitialized || !this.modules.overUnder) {
      console.error('OverUnder 모듈이 초기화되지 않았습니다.');
      return null;
    }
    
    return this.modules.overUnder.getBettingRecommendation(line);
  }

  // 꺾은선형 그래프 렌더링
  renderOddsTrendCharts(container) {
    if (!container) return;
    
    const chartContainers = container.querySelectorAll('.odds-trend-chart');
    chartContainers.forEach(chartContainer => {
      try {
        const chartId = chartContainer.getAttribute('data-chart-id');
        const oddsData = JSON.parse(chartContainer.getAttribute('data-odds-data'));
        const oddstype = chartContainer.getAttribute('data-oddstype');
        
        if (oddsData && oddsData.length >= 4) {
          // Canvas 생성
          const canvas = document.createElement('canvas');
          canvas.id = chartId;
          canvas.width = 400;
          canvas.height = 200;
          canvas.style.cssText = 'width: 100%; max-width: 400px;';
          
          chartContainer.appendChild(canvas);
          
          // 그래프 그리기
          setTimeout(() => {
            if (window.OddsTrendChart && window.OddsTrendChart.drawChart) {
              window.OddsTrendChart.drawChart(chartId, oddsData, oddstype);
            }
          }, 100);
        }
      } catch (error) {
        console.error('그래프 렌더링 오류:', error);
      }
    });
  }

  // 앱 상태 확인
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      modules: Object.keys(this.modules).map(name => ({
        name,
        initialized: this.modules[name] !== null
      }))
    };
  }

  // 앱 정리
  destroy() {
    console.log('OddsApp 정리 시작...');
    
    // 실시간 업데이트 중지
    this.stopRealTimeUpdates();
    
    // 모듈 정리
    this.modules = {
      match1x2: null,
      handicap: null,
      overUnder: null
    };
    
    this.isInitialized = false;
    
    console.log('OddsApp 정리 완료');
  }
}

// 전역 앱 인스턴스 생성
window.oddsApp = new OddsApp();

// DOM 로드 완료 시 자동 초기화
$(document).ready(async function() {
  console.log('DOM 로드 완료, OddsApp 초기화 시작...');
  
  // 경기 상세 정보 먼저 로드
  if (window.matchDetailData) {
    await window.matchDetailData.fetchMatchDetail();
  }
  
  // 앱 초기화
  const initSuccess = await window.oddsApp.init();
  
  if (initSuccess) {
    // 기존 렌더링 함수들 호출 (호환성 유지)
    renderTitle();
    // renderMatchInfo()는 matchDetailData에서 처리됨
    renderMarketNav();
    
    // 새로운 모듈화된 렌더링
    window.oddsApp.renderAll();
    
    // 실시간 업데이트 시작 (선택사항)
    // window.oddsApp.startRealTimeUpdates();
    
    console.log('OddsApp 초기화 및 렌더링 완료');
  } else {
    console.error('OddsApp 초기화 실패');
  }
});

// 전역으로 노출
window.OddsApp = OddsApp; 