// Match1x2.js
// 승무패 배당 관련 모듈

class Match1x2 {
  
  constructor() {
    this.renderer = new window.OddsRenderer();
    this.utils = window.OddsUtils;
    this.data = null;
    this.stats = null;
  }

  // 데이터 설정
  setData(data, stats) {
    this.data = data;
    this.stats = stats;
  }

  // 데이터 필터링
  filterData(filters = {}) {
    if (!this.data) return [];
    return this.utils.filterData(this.data, { oddstype: '1x2', ...filters });
  }

  // 국내 배당 데이터 가져오기
  getDomesticData() {
    return this.filterData({ markettype: '국내' });
  }

  // 해외 배당 데이터 가져오기
  getOverseasData() {
    return this.filterData({ markettype: '해외' });
  }

  // 현재 배당 가져오기 (가장 최신)
  getCurrentOdds(markettype = '국내') {
    const data = this.filterData({ markettype });
    if (!data || data.length === 0) return null;
    
    const item = data[0]; // 첫 번째 항목이 가장 최신
    if (!item.odds || item.odds.length === 0) return null;
    
    return item.odds[0]; // 첫 번째 배당이 가장 최신
  }

  // 배당 흐름 렌더링
  renderFlow(config = {}) {
    if (!this.data) return '<div>데이터 없음</div>';
    
    const filteredData = this.filterData();
    return this.renderer.renderOddsFlowSection(filteredData, { ...config, oddstype: '1x2' });
  }

  // 통계 렌더링
  renderStats(config = {}) {
    if (!this.stats) return '';
    
    return this.renderer.renderStatsSection(this.stats, { ...config, oddstype: '1x2' });
  }

  // 전체 섹션 렌더링
  render(config = {}) {
    if (!this.data) return '<div>데이터 없음</div>';
    
    return this.renderer.renderOddsSection('1x2', this.data, this.stats, config);
  }

  // 테이블 업데이트 (실시간)
  updateTable(containerId, markettype = '국내') {
    const data = this.filterData({ markettype });
    if (!data || data.length === 0) return;
    
    const item = data[0];
    if (!item.odds || item.odds.length === 0) return;
    
    const tableHtml = this.renderer.render1x2Table(item.odds);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = tableHtml;
    }
  }

  // 통계 업데이트
  updateStats(containerId) {
    if (!this.stats) return;
    
    const statsHtml = this.renderStats();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = statsHtml;
    }
  }

  // 배당 변화 감지 및 알림
  detectChanges(previousData) {
    if (!this.data || !previousData) return null;
    
    const changes = [];
    
    this.data.forEach(currentItem => {
      const previousItem = previousData.find(item => 
        item.markettype === currentItem.markettype && 
        item.line === currentItem.line
      );
      
      if (previousItem && currentItem.odds && previousItem.odds) {
        const currentOdds = currentItem.odds[0];
        const previousOdds = previousItem.odds[0];
        
        const oddsChanges = this.utils.detectOddsChange(currentOdds, previousOdds);
        if (oddsChanges && Object.keys(oddsChanges).length > 0) {
          changes.push({
            markettype: currentItem.markettype,
            line: currentItem.line,
            changes: oddsChanges,
            currentOdds,
            previousOdds
          });
        }
      }
    });
    
    return changes;
  }

  // 실시간 업데이트 시작
  startRealTimeUpdate(interval = 5000) {
    this.realTimeInterval = setInterval(() => {
      // 여기서 실제로는 서버에서 새로운 데이터를 가져와야 함
      // 현재는 예시로 기존 데이터를 복사해서 사용
      const previousData = this.utils.deepClone(this.data);
      
      // 데이터 업데이트 (실제로는 API 호출)
      // this.fetchLatestData();
      
      // 변화 감지
      const changes = this.detectChanges(previousData);
      if (changes && changes.length > 0) {
        this.handleOddsChanges(changes);
      }
    }, interval);
  }

  // 실시간 업데이트 중지
  stopRealTimeUpdate() {
    if (this.realTimeInterval) {
      clearInterval(this.realTimeInterval);
      this.realTimeInterval = null;
    }
  }

  // 배당 변화 처리
  handleOddsChanges(changes) {
    changes.forEach(change => {
      console.log(`배당 변화 감지: ${change.markettype} ${change.line || ''}`, change.changes);
      
      // UI 업데이트
      this.updateTable(`odds-1x2-${change.markettype}-table`);
      
      // 필요시 알림 표시
      this.showChangeNotification(change);
    });
  }

  // 변화 알림 표시
  showChangeNotification(change) {
    // 간단한 알림 표시 (실제로는 더 정교한 UI 필요)
    const notification = document.createElement('div');
    notification.className = 'odds-change-notification';
    notification.innerHTML = `
      <span>${change.markettype} 배당이 변경되었습니다.</span>
      <button onclick="this.parentElement.remove()">닫기</button>
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  }

  // 초기화
  init() {
    // 통합 데이터에서 1x2 데이터 추출
    if (window.unifiedOddsData) {
      const data = window.unifiedOddsData.filter(item => item.oddstype === '1x2');
      const statsItem = window.unifiedOddsStats ? 
        window.unifiedOddsStats.find(item => item.oddstype === '1x2') : null;
      const stats = statsItem ? statsItem.stats : null;
      
      this.setData(data, stats);
    }
  }
}

// 전역으로 노출
window.Match1x2 = Match1x2; 