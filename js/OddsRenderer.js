// OddsRenderer.js
// 배당 관련 공통 렌더링 로직

class OddsRenderer {
  
  constructor() {
    this.utils = window.OddsUtils;
  }

  // 승무패 테이블 렌더링
  render1x2Table(oddsArray, config = {}) {
    if (!oddsArray || oddsArray.length === 0) return '<div>데이터 없음</div>';
    
    console.log('render1x2Table called with', oddsArray.length, 'items');
    
    // 4개 이하: 기존 로직
    if (oddsArray.length <= 4) {
      console.log('Using full table renderer');
      return this.renderFull1x2Table(oddsArray, config);
    }
    
    // 5개 이상: 접기 기능 포함
    console.log('Using collapsible table renderer');
    return this.renderCollapsible1x2Table(oddsArray, config);
  }

  // 전체 테이블 렌더링 (4개 이하용)
  renderFull1x2Table(oddsArray, config = {}) {
    let html = '<table class="odds-handicap-table">';
    html += '<thead><tr>' +
      '<th class="odds-th-win">승</th>' +
      '<th class="odds-th-draw">무</th>' +
      '<th class="odds-th-lose">패</th>' +
      '<th class="odds-th-time">변동 시간</th>' +
      '</tr></thead>';
    html += '<tbody>';
    
    oddsArray.forEach((row, idx) => {
      const isLast = idx === oddsArray.length - 1;
      const liveClass = this.utils.getLiveClass(row.isLive);
      const lastRowStyle = this.utils.getLastRowStyle(isLast);
      
      // 화살표 생성
      const winArrow = this.utils.renderArrow(row.win?.change);
      const drawArrow = this.utils.renderArrow(row.draw?.change);
      const loseArrow = this.utils.renderArrow(row.lose?.change);
      
      html += `<tr class="odds-handicap-row ${liveClass}"${lastRowStyle}>`;
      html += '<td>' + this.utils.formatOddsValue(row.win?.value) + winArrow + '</td>';
      html += '<td>' + (row.draw?.value !== null ? this.utils.formatOddsValue(row.draw?.value) + drawArrow : '-') + '</td>';
      html += '<td>' + this.utils.formatOddsValue(row.lose?.value) + loseArrow + '</td>';
      html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
      html += '</tr>';
    });
    
    html += '</tbody></table>';
    return html;
  }

  // 접기/펼치기 테이블 렌더링 (5개 이상용)
  renderCollapsible1x2Table(oddsArray, config = {}) {
    const initialRows = 3;
    const hasMoreData = oddsArray.length >= initialRows;
    
    console.log('renderCollapsible1x2Table:', {
      totalRows: oddsArray.length,
      initialRows,
      hasMoreData
    });
    
    let html = '<table class="odds-handicap-table">';
    html += '<thead><tr>' +
      '<th class="odds-th-win">승</th>' +
      '<th class="odds-th-draw">무</th>' +
      '<th class="odds-th-lose">패</th>' +
      '<th class="odds-th-time">변동 시간</th>' +
      '</tr></thead>';
    
    // 처음 5개 행 (항상 표시)
    html += '<tbody class="visible-rows">';
    oddsArray.slice(0, initialRows).forEach((row, idx) => {
      const liveClass = this.utils.getLiveClass(row.isLive);
      
      // 화살표 생성
      const winArrow = this.utils.renderArrow(row.win?.change);
      const drawArrow = this.utils.renderArrow(row.draw?.change);
      const loseArrow = this.utils.renderArrow(row.lose?.change);
      
      html += `<tr class="odds-handicap-row ${liveClass}">`;
      html += '<td>' + this.utils.formatOddsValue(row.win?.value) + winArrow + '</td>';
      html += '<td>' + (row.draw?.value !== null ? this.utils.formatOddsValue(row.draw?.value) + drawArrow : '-') + '</td>';
      html += '<td>' + this.utils.formatOddsValue(row.lose?.value) + loseArrow + '</td>';
      html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
      html += '</tr>';
    });
    html += '</tbody>';
    
    // 숨겨진 행들 (초기에는 display: none)
    if (hasMoreData) {
      html += '<tbody class="hidden-rows" style="display: none;">';
      oddsArray.slice(initialRows).forEach((row, idx) => {
        const isLast = idx === oddsArray.slice(initialRows).length - 1;
        const liveClass = this.utils.getLiveClass(row.isLive);
        const lastRowStyle = this.utils.getLastRowStyle(isLast);
        
        // 화살표 생성
        const winArrow = this.utils.renderArrow(row.win?.change);
        const drawArrow = this.utils.renderArrow(row.draw?.change);
        const loseArrow = this.utils.renderArrow(row.lose?.change);
        
        html += `<tr class="odds-handicap-row ${liveClass}"${lastRowStyle}>`;
        html += '<td>' + this.utils.formatOddsValue(row.win?.value) + winArrow + '</td>';
        html += '<td>' + (row.draw?.value !== null ? this.utils.formatOddsValue(row.draw?.value) + drawArrow : '-') + '</td>';
        html += '<td>' + this.utils.formatOddsValue(row.lose?.value) + loseArrow + '</td>';
        html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
        html += '</tr>';
      });
      html += '</tbody>';
    }
    
    html += '</table>';
    
    // 접기/펼치기 버튼
    if (hasMoreData) {
      console.log('Adding toggle button for 1x2 table');
      html += this.renderToggleButton();
    }
    
    return html;
  }

  // 핸디캡 테이블 렌더링
  renderHandicapTable(oddsArray, config = {}) {
    if (!oddsArray || oddsArray.length === 0) return '<div>데이터 없음</div>';
    
    console.log('renderHandicapTable called with', oddsArray.length, 'items');
    
    // 4개 이하: 기존 로직
    if (oddsArray.length <= 4) {
      console.log('Using full handicap table renderer');
      return this.renderFullHandicapTable(oddsArray, config);
    }
    
    // 5개 이상: 접기 기능 포함
    console.log('Using collapsible handicap table renderer');
    return this.renderCollapsibleHandicapTable(oddsArray, config);
  }

  // 전체 핸디캡 테이블 렌더링 (4개 이하용)
  renderFullHandicapTable(oddsArray, config = {}) {
    let html = '<table class="odds-handicap-table">';
    html += '<thead><tr>' +
      '<th class="odds-th-win">핸승</th>' +
      '<th class="odds-th-draw">핸무</th>' +
      '<th class="odds-th-lose">핸패</th>' +
      '<th class="odds-th-time">변동 시간</th>' +
      '</tr></thead>';
    html += '<tbody>';
    
    oddsArray.forEach((row, idx) => {
      const isLast = idx === oddsArray.length - 1;
      const liveClass = this.utils.getLiveClass(row.isLive);
      const lastRowStyle = this.utils.getLastRowStyle(isLast);
      
      // 화살표 생성
      const winArrow = this.utils.renderArrow(row.win?.change);
      const drawArrow = this.utils.renderArrow(row.draw?.change);
      const loseArrow = this.utils.renderArrow(row.lose?.change);
      
      html += `<tr class="${liveClass}"${lastRowStyle}>`;
      html += '<td>' + this.utils.formatOddsValue(row.win?.value) + winArrow + '</td>';
      html += '<td>' + (row.draw?.value !== null ? this.utils.formatOddsValue(row.draw?.value) + drawArrow : '-') + '</td>';
      html += '<td>' + this.utils.formatOddsValue(row.lose?.value) + loseArrow + '</td>';
      html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
      html += '</tr>';
    });
    
    html += '</tbody></table>';
    return html;
  }

  // 접기/펼치기 핸디캡 테이블 렌더링 (5개 이상용)
  renderCollapsibleHandicapTable(oddsArray, config = {}) {
    const initialRows = 3;
    const hasMoreData = oddsArray.length >= initialRows;
    
    console.log('renderCollapsibleHandicapTable:', {
      totalRows: oddsArray.length,
      initialRows,
      hasMoreData
    });
    
    let html = '<table class="odds-handicap-table">';
    html += '<thead><tr>' +
      '<th class="odds-th-win">핸승</th>' +
      '<th class="odds-th-draw">핸무</th>' +
      '<th class="odds-th-lose">핸패</th>' +
      '<th class="odds-th-time">변동 시간</th>' +
      '</tr></thead>';
    
    // 처음 5개 행 (항상 표시)
    html += '<tbody class="visible-rows">';
    oddsArray.slice(0, initialRows).forEach((row, idx) => {
      const liveClass = this.utils.getLiveClass(row.isLive);
      
      // 화살표 생성
      const winArrow = this.utils.renderArrow(row.win?.change);
      const drawArrow = this.utils.renderArrow(row.draw?.change);
      const loseArrow = this.utils.renderArrow(row.lose?.change);
      
      html += `<tr class="${liveClass}">`;
      html += '<td>' + this.utils.formatOddsValue(row.win?.value) + winArrow + '</td>';
      html += '<td>' + (row.draw?.value !== null ? this.utils.formatOddsValue(row.draw?.value) + drawArrow : '-') + '</td>';
      html += '<td>' + this.utils.formatOddsValue(row.lose?.value) + loseArrow + '</td>';
      html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
      html += '</tr>';
    });
    html += '</tbody>';
    
    // 숨겨진 행들 (초기에는 display: none)
    if (hasMoreData) {
      html += '<tbody class="hidden-rows" style="display: none;">';
      oddsArray.slice(initialRows).forEach((row, idx) => {
        const isLast = idx === oddsArray.slice(initialRows).length - 1;
        const liveClass = this.utils.getLiveClass(row.isLive);
        const lastRowStyle = this.utils.getLastRowStyle(isLast);
        
        // 화살표 생성
        const winArrow = this.utils.renderArrow(row.win?.change);
        const drawArrow = this.utils.renderArrow(row.draw?.change);
        const loseArrow = this.utils.renderArrow(row.lose?.change);
        
        html += `<tr class="${liveClass}"${lastRowStyle}>`;
        html += '<td>' + this.utils.formatOddsValue(row.win?.value) + winArrow + '</td>';
        html += '<td>' + (row.draw?.value !== null ? this.utils.formatOddsValue(row.draw?.value) + drawArrow : '-') + '</td>';
        html += '<td>' + this.utils.formatOddsValue(row.lose?.value) + loseArrow + '</td>';
        html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
        html += '</tr>';
      });
      html += '</tbody>';
    }
    
    html += '</table>';
    
    // 접기/펼치기 버튼
    if (hasMoreData) {
      console.log('Adding toggle button for handicap table');
      html += this.renderToggleButton();
    }
    
    return html;
  }

  // 언더오버 테이블 렌더링
  renderOverUnderTable(oddsArray, config = {}) {
    if (!oddsArray || oddsArray.length === 0) return '<div>데이터 없음</div>';
    
    console.log('renderOverUnderTable called with', oddsArray.length, 'items');
    
    // 4개 이하: 기존 로직
    if (oddsArray.length <= 4) {
      console.log('Using full overunder table renderer');
      return this.renderFullOverUnderTable(oddsArray, config);
    }
    
    // 5개 이상: 접기 기능 포함
    console.log('Using collapsible overunder table renderer');
    return this.renderCollapsibleOverUnderTable(oddsArray, config);
  }

  // 전체 언더오버 테이블 렌더링 (4개 이하용)
  renderFullOverUnderTable(oddsArray, config = {}) {
    let html = '<table class="odds-handicap-table">';
    html += '<thead><tr>' +
      '<th class="odds-th-under">언더</th>' +
      '<th class="odds-th-draw">무</th>' +
      '<th class="odds-th-over">오버</th>' +
      '<th class="odds-th-time">변동 시간</th>' +
      '</tr></thead>';
    html += '<tbody>';
    
    oddsArray.forEach((row, idx) => {
      const isLast = idx === oddsArray.length - 1;
      const liveClass = this.utils.getLiveClass(row.isLive);
      const lastRowStyle = this.utils.getLastRowStyle(isLast);
      
      // 화살표 생성
      const underArrow = this.utils.renderArrow(row.change);
      const overArrow = this.utils.renderArrow(row.overChange);
      
      html += `<tr class="odds-handicap-row ${liveClass}"${lastRowStyle}>`;
      html += '<td>' + 
        (row.under !== null ? this.utils.formatOddsValue(row.under) + '<span class="odds-arrow under">' + underArrow + '</span>' : '-') + '</td>';
      html += '<td>-</td>';
      html += '<td>' + 
        (row.over !== null ? this.utils.formatOddsValue(row.over) + '<span class="odds-arrow over">' + overArrow + '</span>' : '-') + '</td>';
      html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
      html += '</tr>';
    });
    
    html += '</tbody></table>';
    return html;
  }

  // 접기/펼치기 언더오버 테이블 렌더링 (5개 이상용)
  renderCollapsibleOverUnderTable(oddsArray, config = {}) {
    const initialRows = 3;
    const hasMoreData = oddsArray.length >= initialRows;
    
    console.log('renderCollapsibleOverUnderTable:', {
      totalRows: oddsArray.length,
      initialRows,
      hasMoreData
    });
    
    let html = '<table class="odds-handicap-table">';
    html += '<thead><tr>' +
      '<th class="odds-th-under">언더</th>' +
      '<th class="odds-th-draw">무</th>' +
      '<th class="odds-th-over">오버</th>' +
      '<th class="odds-th-time">변동 시간</th>' +
      '</tr></thead>';
    
    // 처음 5개 행 (항상 표시)
    html += '<tbody class="visible-rows">';
    oddsArray.slice(0, initialRows).forEach((row, idx) => {
      const liveClass = this.utils.getLiveClass(row.isLive);
      
      // 화살표 생성
      const underArrow = this.utils.renderArrow(row.change);
      const overArrow = this.utils.renderArrow(row.overChange);
      
      html += `<tr class="odds-handicap-row ${liveClass}">`;
      html += '<td>' + 
        (row.under !== null ? this.utils.formatOddsValue(row.under) + '<span class="odds-arrow under">' + underArrow + '</span>' : '-') + '</td>';
      html += '<td>-</td>';
      html += '<td>' + 
        (row.over !== null ? this.utils.formatOddsValue(row.over) + '<span class="odds-arrow over">' + overArrow + '</span>' : '-') + '</td>';
      html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
      html += '</tr>';
    });
    html += '</tbody>';
    
    // 숨겨진 행들 (초기에는 display: none)
    if (hasMoreData) {
      html += '<tbody class="hidden-rows" style="display: none;">';
      oddsArray.slice(initialRows).forEach((row, idx) => {
        const isLast = idx === oddsArray.slice(initialRows).length - 1;
        const liveClass = this.utils.getLiveClass(row.isLive);
        const lastRowStyle = this.utils.getLastRowStyle(isLast);
        
        // 화살표 생성
        const underArrow = this.utils.renderArrow(row.change);
        const overArrow = this.utils.renderArrow(row.overChange);
        
        html += `<tr class="odds-handicap-row ${liveClass}"${lastRowStyle}>`;
        html += '<td>' + 
          (row.under !== null ? this.utils.formatOddsValue(row.under) + '<span class="odds-arrow under">' + underArrow + '</span>' : '-') + '</td>';
        html += '<td>-</td>';
        html += '<td>' + 
          (row.over !== null ? this.utils.formatOddsValue(row.over) + '<span class="odds-arrow over">' + overArrow + '</span>' : '-') + '</td>';
        html += '<td class="odds-td-time">' + this.utils.formatTime(row.changedAt) + '</td>';
        html += '</tr>';
      });
      html += '</tbody>';
    }
    
    html += '</table>';
    
    // 접기/펼치기 버튼
    if (hasMoreData) {
      console.log('Adding toggle button for overunder table');
      html += this.renderToggleButton();
    }
    
    return html;
  }

  // 도넛 차트 렌더링 (승무패/핸디캡용)
  renderDonutChart(stats, config = {}) {
    if (!stats) return '';
    
    const percentages = this.utils.calculateDonutPercentages(stats);
    const centerText = config.centerText || `승 ${stats.winCount}회`;
    const centerColor = config.centerColor || '#BB2828';
    
    let donut = `
      <div class="odds-1x2-stats-donut" 
           style="--win:${percentages.win}%; --draw:${percentages.draw}%; --lose:100%">
        <div class="odds-1x2-stats-donut-center" style="color:${centerColor}">${centerText}</div>
      </div>
    `;
    
    // 도넛 차트 하단에 나머지 배팅 유형 수치 표시 (0이거나 null인 경우 제외)
    let labels = [];
    
    if (stats.drawCount !== undefined && stats.drawCount !== null && stats.drawCount > 0) {
      labels.push(`<span class="odds-stats-label draw">무 ${stats.drawCount}회</span>`);
    }
    
    if (stats.loseCount !== undefined && stats.loseCount !== null && stats.loseCount > 0) {
      const loseText = config.isHandicap ? '핸패' : '패';
      labels.push(`<span class="odds-stats-label lose">${loseText} ${stats.loseCount}회</span>`);
    }
    
    if (labels.length > 0) {
      donut += `
        <div class="odds-stats-donut-labels">
          ${labels.join(' ')}
        </div>
      `;
    }
    
    return donut;
  }

  // 언더오버 도넛 차트 렌더링
  renderOverUnderDonutChart(stats, config = {}) {
    if (!stats) return '';
    
    const percentages = this.utils.calculateOverUnderDonutPercentages(stats);
    
    // 중심 텍스트와 색상 결정 (언더: #1E3384, 오버: #BB2828로 통일)
    let centerText, centerColor, lowerText, lowerColor;
    if (stats.underCount > stats.overCount) {
      centerText = `U ${stats.underCount}회`;
      centerColor = '#1E3384'; // 언더는 파란색
      lowerText = `O ${stats.overCount}회`;
      lowerColor = '#BB2828'; // 오버는 빨간색
    } else {
      centerText = `O ${stats.overCount}회`;
      centerColor = '#BB2828'; // 오버는 빨간색
      lowerText = `U ${stats.underCount}회`;
      lowerColor = '#1E3384'; // 언더는 파란색
    }
    
    let donut = `
      <div class="odds-1x2-stats-donut overunder" 
           style="--over:${percentages.over}%">
        <div class="odds-1x2-stats-donut-center" style="color:${centerColor}">${centerText}</div>
      </div>
    `;
    
    // 도넛 차트 하단에 나머지 배팅 유형 수치 표시 (0이거나 null인 경우 제외)
    const lowerCount = lowerText.includes('U') ? stats.underCount : stats.overCount;
    if (lowerCount !== undefined && lowerCount !== null && lowerCount > 0) {
      donut += `
        <div class="odds-stats-donut-labels">
          <span class="odds-stats-label" style="color:${lowerColor}">${lowerText}</span>
        </div>
      `;
    }
    
    return donut;
  }

  // 배당별 통계 렌더링 (승무패용)
  renderOddsByStats(statsByOdds, config = {}) {
    if (!statsByOdds || statsByOdds.length === 0) return '';
    
    let html = '<div class="odds-by-stats-section">';
    html += '<h3 class="odds-by-stats-title">배당별 통계</h3>';
    
    statsByOdds.forEach(item => {
      const total = item.total || (item.win + item.draw + item.lose);
      const winPercent = total > 0 ? (item.win / total) * 100 : 0;
      const drawPercent = total > 0 ? (item.draw / total) * 100 : 0;
      const losePercent = total > 0 ? (item.lose / total) * 100 : 0;
      
      let typeText, typeColor;
      switch (item.type) {
        case 'win':
          typeText = config.isHandicap ? '핸승' : '승';
          typeColor = '#BB2828';
          break;
        case 'draw':
          typeText = '무';
          typeColor = '#666666';
          break;
        case 'lose':
          typeText = config.isHandicap ? '핸패' : '패';
          typeColor = '#1E3384';
          break;
        default:
          typeText = item.type;
          typeColor = '#333333';
      }
      
      // 0인 값들은 제외하고 표시 (해당 배당 타입만 강조, 나머지는 회색)
      let summaryParts = [];
      if (item.win > 0) {
        const winText = config.isHandicap ? '핸승' : '승';
        if (item.type === 'win') {
          summaryParts.push(`<span style="color: #BB2828; font-weight: bold; text-decoration: underline;">${item.win}${winText}</span>`);
        } else {
          summaryParts.push(`<span style="color: rgba(0, 0, 0, 0.3);">${item.win}${winText}</span>`);
        }
      }
      if (item.draw > 0) {
        if (item.type === 'draw') {
          summaryParts.push(`<span style="color: #666666; font-weight: bold; text-decoration: underline;">${item.draw}무</span>`);
        } else {
          summaryParts.push(`<span style="color: rgba(0, 0, 0, 0.3);">${item.draw}무</span>`);
        }
      }
      if (item.lose > 0) {
        const loseText = config.isHandicap ? '핸패' : '패';
        if (item.type === 'lose') {
          summaryParts.push(`<span style="color: #1E3384; font-weight: bold; text-decoration: underline;">${item.lose}${loseText}</span>`);
        } else {
          summaryParts.push(`<span style="color: rgba(0, 0, 0, 0.3);">${item.lose}${loseText}</span>`);
        }
      }
      
      html += `
        <div class="odds-by-stats-item">
          <div class="odds-by-stats-header">
            <span class="odds-by-stats-type" style="color: ${typeColor}">
              <span class="odds-by-stats-color-box" style="background-color: ${typeColor}"></span>
              ${typeText} ${this.utils.formatOddsValue(item.odds)}
            </span>
            <span class="odds-by-stats-summary">
              ${summaryParts.join(' ')}
            </span>
          </div>
          <div class="odds-by-stats-bar">
            <div class="odds-by-stats-bar-win" style="width: ${winPercent}%; background-color: #FFE6E6;"></div>
            <div class="odds-by-stats-bar-draw" style="width: ${drawPercent}%; background-color: #E6E6E6;"></div>
            <div class="odds-by-stats-bar-lose" style="width: ${losePercent}%; background-color: #E6E6F0;"></div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  }

  // 배당값 범례 렌더링
  renderOddsLegend(odds, oddstype) {
    let html = '<div class="odds-stats-info">';
    html += '<div class="odds-stats-odds-legend">';
    
    if (oddstype === 'overUnder') {
      // 언더오버 배당값
      if (odds.under) {
        html += `
          <span class="odds-stats-odds-box under"></span>
          <span class="odds-stats-odds-text">언더 ${odds.under}</span>
        `;
      }
      if (odds.over) {
        html += `
          <span class="odds-stats-odds-box over"></span>
          <span class="odds-stats-odds-text">오버 ${odds.over}</span>
        `;
      }
    } else {
      // 승무패/핸디캡 배당값
      const winText = oddstype === 'handi' ? '핸승' : '승';
      const loseText = oddstype === 'handi' ? '핸패' : '패';
      
      if (odds.win) {
        html += `
          <span class="odds-stats-odds-box win"></span>
          <span class="odds-stats-odds-text">${winText} ${odds.win}</span>
        `;
      }
      if (odds.draw) {
        html += `
          <span class="odds-stats-odds-box draw"></span>
          <span class="odds-stats-odds-text">무 ${odds.draw}</span>
        `;
      }
      if (odds.lose) {
        html += `
          <span class="odds-stats-odds-box lose"></span>
          <span class="odds-stats-odds-text">${loseText} ${odds.lose}</span>
        `;
      }
    }
    
    html += '</div></div>';
    return html;
  }

       // 라인별 통계 렌더링 (핸디캡/언더오버용)
  renderLineByStats(statsByLine) {
    if (!statsByLine || statsByLine.length === 0) return '';
    
    let html = '<div class="odds-line-stats-section">';
    html += '<h3 class="odds-line-stats-title">기준점별 통계</h3>';
   
   statsByLine.forEach(item => {
     const total = item.total || (item.win + item.draw + item.lose) || (item.over + item.under);
     
     if (item.win !== undefined) {
       // 핸디캡 통계
       const winPercent = total > 0 ? (item.win / total) * 100 : 0;
       const drawPercent = total > 0 ? (item.draw / total) * 100 : 0;
       const losePercent = total > 0 ? (item.lose / total) * 100 : 0;
       
       // 승패 통계 텍스트 (가장 높은 값에 강조 표시)
       let winText = `${item.win}승`;
       let drawText = item.draw > 0 ? `${item.draw}무` : '';
       let loseText = `${item.lose}패`;
       
       // 가장 높은 값에 강조 스타일 적용
       const maxValue = Math.max(item.win, item.draw, item.lose);
       if (item.win === maxValue) {
         winText = `<span style="color: #BB2828; font-weight: 700; text-decoration: underline;">${winText}</span>`;
       } else {
         winText = `<span style="color: #888;">${winText}</span>`;
       }
       
       if (item.draw > 0) {
         if (item.draw === maxValue) {
           drawText = `<span style="color: #BB2828; font-weight: 700; text-decoration: underline;">${drawText}</span>`;
         } else {
           drawText = `<span style="color: #888;">${drawText}</span>`;
         }
       }
       
       if (item.lose === maxValue) {
         loseText = `<span style="color: #1E3384; font-weight: 700; text-decoration: underline;">${loseText}</span>`;
       } else {
         loseText = `<span style="color: #888;">${loseText}</span>`;
       }
       
       html += `
         <div class="odds-line-stats-item">
           <div class="odds-line-stats-header">
             <div class="odds-line-stats-label">
               <span class="odds-line-stats-box"></span>
               <span class="odds-line-stats-line">${item.line}</span>
             </div>
             <span class="odds-line-stats-summary">
               ${winText} ${drawText} ${loseText}
             </span>
           </div>
           <div class="odds-line-stats-bar">
             <div class="odds-line-stats-bar-win" style="width: ${winPercent}%; background-color: #FFE6E6;"></div>
             <div class="odds-line-stats-bar-draw" style="width: ${drawPercent}%; background-color: #E6E6E6;"></div>
             <div class="odds-line-stats-bar-lose" style="width: ${losePercent}%; background-color: #E6E6F0;"></div>
           </div>
         </div>
       `;
     } else if (item.over !== undefined) {
       // 언더오버 통계
       const overPercent = total > 0 ? (item.over / total) * 100 : 0;
       const underPercent = total > 0 ? (item.under / total) * 100 : 0;
       
       // 오버/언더 통계 텍스트 (가장 높은 값에 강조 표시)
       let overText = `${item.over}오버`;
       let underText = `${item.under}언더`;
       
               // 가장 높은 값에 강조 스타일 적용 (언더: #1E3384, 오버: #BB2828로 통일)
        if (item.over > item.under) {
          overText = `<span style="color: #BB2828; font-weight: 700; text-decoration: underline;">${overText}</span>`;
          underText = `<span style="color: #888;">${underText}</span>`;
        } else {
          overText = `<span style="color: #888;">${overText}</span>`;
          underText = `<span style="color: #1E3384; font-weight: 700; text-decoration: underline;">${underText}</span>`;
        }
       
       html += `
         <div class="odds-line-stats-item">
           <div class="odds-line-stats-header">
             <div class="odds-line-stats-label">
               <span class="odds-line-stats-box"></span>
               <span class="odds-line-stats-line">${item.line}</span>
             </div>
             <span class="odds-line-stats-summary">
               ${overText} ${underText}
             </span>
           </div>
           <div class="odds-line-stats-bar">
             <div class="odds-line-stats-bar-under" style="width: ${underPercent}%; background-color: #E6E6F0;"></div>
             <div class="odds-line-stats-bar-over" style="width: ${overPercent}%; background-color: #FFE6E6;"></div>
           </div>
         </div>
       `;
     }
   });
   
   html += '</div>';
   return html;
  }

  // 통계 총평 영역 렌더링
  renderStatsSummary(summary) {
    if (!summary) return '';
    
    return `
      <div class="odds-stats-summary-section">
        <p class="odds-stats-summary-text">${summary}</p>
      </div>
    `;
  }

  // 배당 흐름 섹션 렌더링
  renderOddsFlowSection(data, config = {}) {
    if (!data || data.length === 0) return '<div>데이터 없음</div>';
    
    let html = '';
    
    // 배당 흐름 섹션 타이틀 바 (파란색 배너)
    const titles = {
      '1x2': '승무패 배당 흐름',
      'handi': '핸디캡 배당 흐름',
      'overUnder': '언더오버 배당 흐름'
    };
    
    const oddstype = config.oddstype || '1x2';
    const titleText = titles[oddstype] || '배당 흐름';
    
    html += `
      <div class="odds-flow-title-bar">
        <span class="odds-flow-title-text">${titleText}</span>
      </div>
    `;
    
    // 마켓타입별로 그룹화
    const groupedByMarket = {};
    data.forEach(item => {
      if (!groupedByMarket[item.markettype]) {
        groupedByMarket[item.markettype] = [];
      }
      groupedByMarket[item.markettype].push(item);
    });
    
    // 각 마켓타입별로 렌더링
    Object.keys(groupedByMarket).forEach(marketType => {
      html += `<div class="odds-${marketType === '국내' ? 'domestic' : 'overseas'}-section">`;
      
      groupedByMarket[marketType].forEach(item => {
        const lineText = item.line ? ` <span class="odds-flow-tile-line">(${item.line})</span>` : '';
        html += `<div class="odds-flow-tile">${marketType}${lineText}</div>`;
        
        // 꺾은선형 그래프 추가 (데이터가 4개 이상인 경우)
        if (item.odds && item.odds.length >= 4) {
          const chartId = `oddsChart-${item.oddstype}-${marketType}-${Math.random().toString(36).substr(2, 9)}`;
          html += `<div class="odds-trend-chart" data-chart-id="${chartId}" data-odds-data='${JSON.stringify(item.odds)}' data-oddstype="${item.oddstype}"></div>`;
        }
        
        // 배당 타입에 따른 테이블 렌더링
        switch (item.oddstype) {
          case '1x2':
            html += this.render1x2Table(item.odds, config);
            break;
          case 'handi':
            html += this.renderHandicapTable(item.odds, config);
            break;
          case 'overUnder':
            html += this.renderOverUnderTable(item.odds, config);
            break;
        }
      });
      
      html += '</div>';
    });
    
    return html;
  }

  // 통계 섹션 렌더링
  renderStatsSection(stats, config = {}) {
    if (!stats) return '';
    
    let html = '<div class="odds-stats-section">';
    
    // 통계 섹션 타이틀 바 (파란색 배너)
    const titles = {
      '1x2': '승무패 배당 통계',
      'handi': '핸디캡 배당 통계',
      'overUnder': '언더오버 배당 통계'
    };
    
    const oddstype = config.oddstype || '1x2';
    const titleText = titles[oddstype] || '배당 통계';
    
    html += `
      <div class="odds-stats-title-bar">
        <span class="odds-stats-title-text">${titleText}</span>
      </div>
    `;
    
         // 통계 제목 (총 경기 수 표시)
     if (stats.matchCount) {
       let titleText = '';
       let countText = '';
       
       if (oddstype === '1x2') {
         titleText = '승무패 배당 일치 :';
         countText = `${stats.matchCount}경기`;
       } else if (oddstype === 'handi') {
         titleText = `핸디캡 (${stats.line}) 기준 통계  :`;
         countText = `${stats.matchCount}경기`;
       } else if (oddstype === 'overUnder') {
         titleText = `언더오버 (${stats.line}) 기준 통계  :`;
         countText = `${stats.matchCount}경기`;
       }
       
       html += `<h3 class="odds-stats-match-count">
         <span class="odds-stats-match-title">${titleText}</span>
         <span class="odds-stats-match-number">${countText}</span>
       </h3>`;
     }
     
     // 배당값 표시 (odds-stats-info 재구성)
     if (stats.odds) {
       html += this.renderOddsLegend(stats.odds, oddstype);
     }
    
    // 도넛 차트 렌더링
    if (stats.underCount !== undefined) {
      // 언더오버 통계
      html += this.renderOverUnderDonutChart(stats, config);
    } else {
      // 승무패/핸디캡 통계
      const donutConfig = { ...config };
      if (oddstype === 'handi') {
        donutConfig.isHandicap = true;
      }
      html += this.renderDonutChart(stats, donutConfig);
    }
    
    // 통계 총평 영역 렌더링
    if (stats.summary) {
      html += this.renderStatsSummary(stats.summary);
    }
    
    // 배당별 통계 렌더링 (승무패용)
    if (stats.statsByOdds && stats.statsByOdds.length > 0) {
      const oddsConfig = { ...config };
      if (oddstype === 'handi') {
        oddsConfig.isHandicap = true;
      }
      html += this.renderOddsByStats(stats.statsByOdds, oddsConfig);
    }
    
    // 라인별 통계 렌더링 (핸디캡/언더오버용)
    if (stats.statsByLine && stats.statsByLine.length > 0) {
      html += this.renderLineByStats(stats.statsByLine);
    }
    
    html += '</div>';
    return html;
  }

  // 접기/펼치기 버튼 렌더링
  renderToggleButton() {
    return `
      <button class="expand-button" onclick="window.handleToggleClick(this)">
        <span class="expand-text">상세정보 펼쳐보기</span>
        <span class="expand-arrow">▼</span>
      </button>
    `;
  }

  // 전체 배당 섹션 렌더링
  renderOddsSection(oddstype, data, stats, config = {}) {
    let html = `<div class="odds-${oddstype}-flow">`;
    
    // 제목 바
    const titles = {
      '1x2': '승무패 배당 흐름',
      'handi': '핸디캡 배당 흐름',
      'overUnder': '언더오버 배당 흐름'
    };
    
    html += `
      <div class="odds-title-bar">
        <span class="odds-title">${titles[oddstype] || '배당 흐름'}</span>
      </div>
    `;
    
    // 배당 흐름 렌더링
    html += this.renderOddsFlowSection(data, config);
    
    // 통계 렌더링
    if (stats) {
      html += this.renderStatsSection(stats, config);
    }
    
    html += '</div>';
    return html;
  }
}

// 전역으로 노출
window.OddsRenderer = OddsRenderer;

// 접기/펼치기 버튼 클릭 이벤트 처리
window.handleToggleClick = function(button) {
  console.log('handleToggleClick called', button);
  
  // 버튼의 이전 형제 요소가 테이블
  const table = button.previousElementSibling;
  if (!table || table.tagName !== 'TABLE') {
    console.error('Table not found');
    return;
  }
  
  const hiddenRows = table.querySelector('.hidden-rows');
  if (!hiddenRows) {
    console.error('Hidden rows not found');
    return;
  }
  
  const isExpanded = hiddenRows.style.display !== 'none';
  console.log('Is expanded:', isExpanded);
  
  if (isExpanded) {
    // 접기
    hiddenRows.style.display = 'none';
    button.querySelector('.expand-text').textContent = '상세정보 펼쳐보기';
    button.querySelector('.expand-arrow').textContent = '▼';
    button.classList.remove('expanded');
  } else {
    // 펼치기
    hiddenRows.style.display = 'table-row-group';
    button.querySelector('.expand-text').textContent = '상세정보 접기';
    button.querySelector('.expand-arrow').textContent = '▼';
    button.classList.add('expanded');
  }
}; 