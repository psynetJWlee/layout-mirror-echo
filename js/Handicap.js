// Handicap.js
// 핸디캡 배당 관련 모듈

class Handicap {
  
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
    return this.utils.filterData(this.data, { oddstype: 'handi', ...filters });
  }

  // 라인별 데이터 가져오기
  getDataByLine(line) {
    return this.filterData({ line });
  }

  // 마켓타입별 데이터 가져오기
  getDataByMarket(markettype) {
    return this.filterData({ markettype });
  }

  // 특정 라인과 마켓타입의 데이터 가져오기
  getDataByLineAndMarket(line, markettype) {
    return this.filterData({ line, markettype });
  }

  // 사용 가능한 라인 목록 가져오기
  getAvailableLines() {
    if (!this.data) return [];
    
    const lines = new Set();
    this.data.forEach(item => {
      if (item.line) {
        lines.add(item.line);
      }
    });
    
    return Array.from(lines).sort();
  }

  // 현재 배당 가져오기 (가장 최신)
  getCurrentOdds(line, markettype = '국내') {
    const data = this.filterData({ line, markettype });
    if (!data || data.length === 0) return null;
    
    const item = data[0];
    if (!item.odds || item.odds.length === 0) return null;
    
    return item.odds[0];
  }

  // 배당 흐름 렌더링
  renderFlow(config = {}) {
    if (!this.data) return '<div>데이터 없음</div>';
    
    const filteredData = this.filterData();
    return this.renderer.renderOddsFlowSection(filteredData, { ...config, oddstype: 'handi' });
  }

  // 특정 라인 배당 흐름 렌더링
  renderLineFlow(line, config = {}) {
    const data = this.getDataByLine(line);
    if (!data || data.length === 0) return '<div>데이터 없음</div>';
    
    return this.renderer.renderOddsFlowSection(data, config);
  }

  // 통계 렌더링
  renderStats(config = {}) {
    if (!this.stats) return '';
    
    return this.renderer.renderStatsSection(this.stats, { ...config, oddstype: 'handi' });
  }

  // 전체 섹션 렌더링
  render(config = {}) {
    if (!this.data) return '<div>데이터 없음</div>';
    
    return this.renderer.renderOddsSection('handi', this.data, this.stats, config);
  }

  // 테이블 업데이트 (실시간)
  updateTable(containerId, line, markettype = '국내') {
    const data = this.filterData({ line, markettype });
    if (!data || data.length === 0) return;
    
    const item = data[0];
    if (!item.odds || item.odds.length === 0) return;
    
    const tableHtml = this.renderer.renderHandicapTable(item.odds);
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

  // 라인별 통계 가져오기
  getLineStats(line) {
    if (!this.stats || !this.stats.statsByLine) return null;
    
    return this.stats.statsByLine.find(item => item.line === line);
  }

  // 라인별 통계 렌더링
  renderLineStats(line, config = {}) {
    const lineStats = this.getLineStats(line);
    if (!lineStats) return '';
    
    const stats = {
      winCount: lineStats.win,
      drawCount: lineStats.draw,
      loseCount: lineStats.lose
    };
    
    return this.renderer.renderDonutChart(stats, {
      centerText: `핸승 ${lineStats.win}회`,
      centerColor: '#BB2828',
      isHandicap: true,
      ...config
    });
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
      console.log(`핸디캡 배당 변화 감지: ${change.markettype} ${change.line}`, change.changes);
      
      // UI 업데이트
      this.updateTable(`odds-handi-${change.markettype}-${change.line}-table`, change.line, change.markettype);
      
      // 필요시 알림 표시
      this.showChangeNotification(change);
    });
  }

  // 변화 알림 표시
  showChangeNotification(change) {
    const notification = document.createElement('div');
    notification.className = 'odds-change-notification';
    notification.innerHTML = `
      <span>핸디캡 ${change.line} ${change.markettype} 배당이 변경되었습니다.</span>
      <button onclick="this.parentElement.remove()">닫기</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  }

  // 라인 선택 UI 생성
  renderLineSelector(containerId, onLineChange) {
    const lines = this.getAvailableLines();
    if (lines.length === 0) return '';
    
    let html = '<div class="handicap-line-selector">';
    html += '<label>핸디캡 라인:</label>';
    html += '<select onchange="this.onchange(event)">';
    
    lines.forEach(line => {
      html += `<option value="${line}">${line}</option>`;
    });
    
    html += '</select></div>';
    
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
      
      // 이벤트 리스너 추가
      const select = container.querySelector('select');
      if (select && onLineChange) {
        select.addEventListener('change', (event) => {
          onLineChange(event.target.value);
        });
      }
    }
    
    return html;
  }

  // 초기화
  init() {
    // 통합 데이터에서 핸디캡 데이터 추출
    if (window.unifiedOddsData) {
      const data = window.unifiedOddsData.filter(item => item.oddstype === 'handi');
      const statsItem = window.unifiedOddsStats ? 
        window.unifiedOddsStats.find(item => item.oddstype === 'handi') : null;
      const stats = statsItem ? statsItem.stats : null;
      
      this.setData(data, stats);
    }
  }
}

// 전역으로 노출
window.Handicap = Handicap; 