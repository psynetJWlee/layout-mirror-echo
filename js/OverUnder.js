// OverUnder.js
// 언더오버 배당 관련 모듈

class OverUnder {
  
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
    return this.utils.filterData(this.data, { oddstype: 'overUnder', ...filters });
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
    return this.renderer.renderOddsFlowSection(filteredData, { ...config, oddstype: 'overUnder' });
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
    
    return this.renderer.renderStatsSection(this.stats, { ...config, oddstype: 'overUnder' });
  }

  // 전체 섹션 렌더링
  render(config = {}) {
    if (!this.data) return '<div>데이터 없음</div>';
    
    return this.renderer.renderOddsSection('overUnder', this.data, this.stats, config);
  }

  // 테이블 업데이트 (실시간)
  updateTable(containerId, line, markettype = '국내') {
    const data = this.filterData({ line, markettype });
    if (!data || data.length === 0) return;
    
    const item = data[0];
    if (!item.odds || item.odds.length === 0) return;
    
    const tableHtml = this.renderer.renderOverUnderTable(item.odds);
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
      underCount: lineStats.under,
      overCount: lineStats.over
    };
    
    return this.renderer.renderOverUnderDonutChart(stats, config);
  }

  // 언더/오버 비율 계산
  calculateUnderOverRatio(line) {
    const lineStats = this.getLineStats(line);
    if (!lineStats) return { under: 0, over: 0 };
    
    const total = lineStats.under + lineStats.over;
    if (total === 0) return { under: 0, over: 0 };
    
    return {
      under: (lineStats.under / total) * 100,
      over: (lineStats.over / total) * 100
    };
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
      console.log(`언더오버 배당 변화 감지: ${change.markettype} ${change.line}`, change.changes);
      
      // UI 업데이트
      this.updateTable(`odds-overunder-${change.markettype}-${change.line}-table`, change.line, change.markettype);
      
      // 필요시 알림 표시
      this.showChangeNotification(change);
    });
  }

  // 변화 알림 표시
  showChangeNotification(change) {
    const notification = document.createElement('div');
    notification.className = 'odds-change-notification';
    notification.innerHTML = `
      <span>언더오버 ${change.line} ${change.markettype} 배당이 변경되었습니다.</span>
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
    
    let html = '<div class="overunder-line-selector">';
    html += '<label>언더오버 라인:</label>';
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

  // 언더/오버 트렌드 분석
  analyzeTrend(line, period = 10) {
    const data = this.getDataByLine(line);
    if (!data || data.length === 0) return null;
    
    const trends = {
      under: { up: 0, down: 0, stable: 0 },
      over: { up: 0, down: 0, stable: 0 }
    };
    
    data.forEach(item => {
      if (item.odds && item.odds.length >= 2) {
        // 최근 2개 배당 비교
        const current = item.odds[0];
        const previous = item.odds[1];
        
        if (current.under !== undefined && previous.under !== undefined) {
          if (current.under > previous.under) trends.under.up++;
          else if (current.under < previous.under) trends.under.down++;
          else trends.under.stable++;
        }
        
        if (current.over !== undefined && previous.over !== undefined) {
          if (current.over > previous.over) trends.over.up++;
          else if (current.over < previous.over) trends.over.down++;
          else trends.over.stable++;
        }
      }
    });
    
    return trends;
  }

  // 추천 배팅 분석
  getBettingRecommendation(line) {
    const lineStats = this.getLineStats(line);
    const trends = this.analyzeTrend(line);
    
    if (!lineStats || !trends) return null;
    
    const underRatio = (lineStats.under / (lineStats.under + lineStats.over)) * 100;
    const overRatio = (lineStats.over / (lineStats.under + lineStats.over)) * 100;
    
    let recommendation = {
      type: null,
      confidence: 0,
      reason: ''
    };
    
    // 통계 기반 추천
    if (underRatio > 60) {
      recommendation.type = 'under';
      recommendation.confidence = underRatio;
      recommendation.reason = `언더 비율이 ${underRatio.toFixed(1)}%로 높습니다.`;
    } else if (overRatio > 60) {
      recommendation.type = 'over';
      recommendation.confidence = overRatio;
      recommendation.reason = `오버 비율이 ${overRatio.toFixed(1)}%로 높습니다.`;
    }
    
    // 트렌드 기반 보정
    if (trends.under.up > trends.under.down && recommendation.type === 'under') {
      recommendation.confidence += 10;
      recommendation.reason += ' 언더 상승 트렌드가 확인됩니다.';
    } else if (trends.over.up > trends.over.down && recommendation.type === 'over') {
      recommendation.confidence += 10;
      recommendation.reason += ' 오버 상승 트렌드가 확인됩니다.';
    }
    
    return recommendation;
  }

  // 초기화
  init() {
    // 통합 데이터에서 언더오버 데이터 추출
    if (window.unifiedOddsData) {
      const data = window.unifiedOddsData.filter(item => item.oddstype === 'overUnder');
      const statsItem = window.unifiedOddsStats ? 
        window.unifiedOddsStats.find(item => item.oddstype === 'overUnder') : null;
      const stats = statsItem ? statsItem.stats : null;
      
      this.setData(data, stats);
    }
  }
}

// 전역으로 노출
window.OverUnder = OverUnder; 