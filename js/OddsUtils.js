// OddsUtils.js
// 배당 관련 공통 유틸리티 함수들

class OddsUtils {
  
  // 화살표 표시 생성
  static renderArrow(change) {
    if (change === "up") return '<span class="odds-arrow up">▲</span>';
    if (change === "down") return '<span class="odds-arrow down">▼</span>';
    return '<span class="odds-arrow"></span>';
  }

  // 시간 포맷팅
  static formatTime(changedAt) {
    if (!changedAt || changedAt === "초기") return '초기';
    
    const [date, time] = changedAt.split(' ');
    return `<span class="date">${date}</span> <span class="time">${time || ''}</span>`;
  }

  // 배당 값 포맷팅 (소수점 2자리)
  static formatOddsValue(value) {
    return value !== null ? value.toFixed(2) : '-';
  }

  // 실시간 클래스 생성
  static getLiveClass(isLive) {
    return isLive ? ' live-odds' : '';
  }

  // 마지막 행 스타일 적용
  static getLastRowStyle(isLast) {
    return isLast ? ' style="background:#EFEFEF"' : '';
  }

  // 데이터 필터링
  static filterData(data, filters = {}) {
    return data.filter(item => {
      if (filters.oddstype && item.oddstype !== filters.oddstype) return false;
      if (filters.markettype && item.markettype !== filters.markettype) return false;
      if (filters.line !== undefined && item.line !== filters.line) return false;
      return true;
    });
  }

  // 통계 계산
  static calculateStats(oddsArray) {
    if (!oddsArray || oddsArray.length === 0) return null;
    
    const total = oddsArray.length;
    const liveCount = oddsArray.filter(odds => odds.isLive).length;
    const initialCount = oddsArray.filter(odds => odds.isInitial).length;
    
    return {
      total,
      liveCount,
      initialCount,
      livePercent: (liveCount / total) * 100,
      initialPercent: (initialCount / total) * 100
    };
  }

  // 도넛 차트 비율 계산
  static calculateDonutPercentages(stats) {
    if (!stats) return { win: 0, draw: 0, lose: 0 };
    
    const total = stats.winCount + stats.drawCount + stats.loseCount;
    if (total === 0) return { win: 0, draw: 0, lose: 0 };
    
    const winPercent = (stats.winCount / total) * 100;
    const drawPercent = (stats.drawCount / total) * 100;
    
    return {
      win: winPercent,
      draw: winPercent + drawPercent,
      lose: 100
    };
  }

  // 언더오버 도넛 차트 비율 계산
  static calculateOverUnderDonutPercentages(stats) {
    if (!stats) return { under: 0, over: 0 };
    
    const total = stats.underCount + stats.overCount;
    if (total === 0) return { under: 0, over: 0 };
    
    const underPercent = (stats.underCount / total) * 100;
    const overPercent = (stats.overCount / total) * 100;
    
    return {
      under: underPercent,
      over: overPercent
    };
  }

  // 배당 변화 감지
  static detectOddsChange(currentOdds, previousOdds) {
    if (!currentOdds || !previousOdds) return null;
    
    const changes = {};
    
    // 승무패 변화 감지
    if (currentOdds.win && previousOdds.win) {
      if (currentOdds.win.value > previousOdds.win.value) changes.win = 'up';
      else if (currentOdds.win.value < previousOdds.win.value) changes.win = 'down';
    }
    
    if (currentOdds.draw && previousOdds.draw) {
      if (currentOdds.draw.value > previousOdds.draw.value) changes.draw = 'up';
      else if (currentOdds.draw.value < previousOdds.draw.value) changes.draw = 'down';
    }
    
    if (currentOdds.lose && previousOdds.lose) {
      if (currentOdds.lose.value > previousOdds.lose.value) changes.lose = 'up';
      else if (currentOdds.lose.value < previousOdds.lose.value) changes.lose = 'down';
    }
    
    // 언더오버 변화 감지
    if (currentOdds.under !== undefined && previousOdds.under !== undefined) {
      if (currentOdds.under > previousOdds.under) changes.under = 'up';
      else if (currentOdds.under < previousOdds.under) changes.under = 'down';
    }
    
    if (currentOdds.over !== undefined && previousOdds.over !== undefined) {
      if (currentOdds.over > previousOdds.over) changes.over = 'up';
      else if (currentOdds.over < previousOdds.over) changes.over = 'down';
    }
    
    return changes;
  }

  // 안전한 숫자 변환
  static safeNumber(value, defaultValue = 0) {
    const num = parseFloat(value);
    return isNaN(num) ? defaultValue : num;
  }

  // 안전한 문자열 변환
  static safeString(value, defaultValue = '') {
    return value !== null && value !== undefined ? String(value) : defaultValue;
  }

  // 깊은 복사
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  }
}

// 전역으로 노출
window.OddsUtils = OddsUtils; 