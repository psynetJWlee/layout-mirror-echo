document.getElementById('section-overunder').innerHTML = `
  <div class="odds-underover-flow">
    <div class="odds-title-bar">
      <span class="odds-title">언더오버 배당 흐름</span>
    </div>
    <div class="odds-underover-domestic-section">
      ${renderUnderOverOddsTable('국내')}
    </div>
    <div class="odds-underover-overseas-section">
      ${renderUnderOverOddsTable('해외')}
    </div>
  </div>

`;

function renderUnderOverOddsTable(marketType) {
  const data = (window.overUnderOddsFlowData || []).filter(g => g.marketType === marketType);
  if (!data.length) return '<div>데이터 없음</div>';
  let html = '';
  data.forEach(group => {
    html += `<div class="odds-flow-tile">${marketType} <span class="odds-flow-tile-line">${group.line}</span></div>`;
    html += `<table class="odds-underover-table">
      <thead>
        <tr>
          <th class="odds-th-under">언더</th>
          <th class="odds-th-draw">무</th>
          <th class="odds-th-over">오버</th>
          <th class="odds-th-time">변동 시간</th>
        </tr>
      </thead>
      <tbody>`;
    group.odds.forEach((row, idx) => {
      const isLast = idx === group.odds.length - 1;
      const liveClass = row.isLive ? ' live-odds' : '';
      let underArrow = '<span class="odds-arrow under"></span>';
      let drawArrow = '<span class="odds-arrow draw"></span>';
      let overArrow = '<span class="odds-arrow over"></span>';
      html += `<tr class="odds-underover-row${liveClass}"${isLast ? ' style=\"background:#EFEFEF\"' : ''}>
        <td class="odds-underover-td-under">${row.under !== null && row.under !== undefined ? Number(row.under).toFixed(2) : '-'}${underArrow}</td>
        <td class="odds-underover-td-draw">-${drawArrow}</td>
        <td class="odds-underover-td-over">${row.over !== null && row.over !== undefined ? Number(row.over).toFixed(2) : '-'}${overArrow}</td>
        <td class="odds-underover-td-time">${row.changedAt && row.changedAt !== "초기" ? row.changedAt : '초기'}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  });
  return html;
}

function renderOverUnderStats() {
  const stats = window.overUnderStatsData;
  if (!stats) return '';
  const total = stats.stats.underCount + stats.stats.overCount;
  const underPercent = total ? (stats.stats.underCount / total) * 100 : 0;
  const overPercent = total ? (stats.stats.overCount / total) * 100 : 0;

  // 도넛 그래프 중앙 텍스트 결정
  let centerText = '';
  let centerColor = '';
  let lowerText = '';
  let lowerColor = '';
  if (stats.stats.underCount > stats.stats.overCount) {
    centerText = `U ${stats.stats.underCount}회`;
    centerColor = '#BB2828';
    lowerText = `O ${stats.stats.overCount}회`;
    lowerColor = '#1E3384';
  } else {
    centerText = `O ${stats.stats.overCount}회`;
    centerColor = '#1E3384';
    lowerText = `U ${stats.stats.underCount}회`;
    lowerColor = '#BB2828';
  }

  // 도넛 그래프
  let donut = `<div class="odds-1x2-stats-donut" style="--win:${underPercent}%; --draw:${underPercent}%; --lose:100%">
    <div class="odds-1x2-stats-donut-center" style="color:${centerColor}">${centerText}</div>
  </div>
  <div class="odds-1x2-stats-donut-labels">
    <span style="color:${lowerColor}">${lowerText}</span>
  </div>`;

  // 배당값 레전드
  let legend = `<div class="odds-1x2-stats-odds-legend">
    <span class="odds-1x2-stats-odds-win"><span class="odds-1x2-stats-odds-box win" style="background:#BB2828"></span> U ${(stats.odds.under !== undefined ? Number(stats.odds.under).toFixed(2) : '-') }</span>
    <span class="odds-1x2-stats-odds-lose"><span class="odds-1x2-stats-odds-box lose" style="background:#1E3384"></span> O ${(stats.odds.over !== undefined ? Number(stats.odds.over).toFixed(2) : '-') }</span>
  </div>`;

  // 기준점별 통계
  let byLine = `<div class="odds-1x2-stats-by-odds">
    <div class="odds-1x2-stats-by-odds-title">기준점별 통계</div>`;
  stats.statsByLine.forEach(item => {
    const sum = item.under + item.over;
    const underBar = sum ? (item.under / sum) * 100 : 0;
    const overBar = sum ? (item.over / sum) * 100 : 0;
    byLine += `<div class="odds-1x2-stats-by-odds-row">
      <span class="odds-1x2-stats-odds-box" style="background:#323741"></span>
      <span class="odds-1x2-stats-by-odds-label" style="color:#323741">${item.line}</span>
      <span class="odds-1x2-stats-by-odds-counts">
        <span class="win" style="color:#BB2828;font-weight:700;text-decoration:underline;">${item.under}언더</span>
        <span class="lose" style="color:#1E3384;font-weight:700;text-decoration:underline;">${item.over}오버</span>
      </span>
      <div class="odds-1x2-stats-bar-bg" style="background:#F5CFCF;opacity:0.3;display:flex;">
        <div class="odds-1x2-stats-bar win" style="background:#BB2828;width:${underBar}%;height:10px;display:inline-block;"></div>
        <div class="odds-1x2-stats-bar lose" style="background:#1E3384;width:${overBar}%;height:10px;display:inline-block;"></div>
      </div>
    </div>`;
  });
  byLine += `</div>`;

  // 전체 HTML
  let html = `<div class="odds-1x2-stats">
    <div class="odds-title-bar">
      <span class="odds-title">언더오버 배당 통계</span>
    </div>
    <div class="odds-1x2-stats-match-info">
      <span class="odds-1x2-stats-match-label">언더오버 (${stats.line}) 동일 배당 :</span>
      <span class="odds-1x2-stats-match-count"> <a href="#" class="odds-1x2-stats-link">${stats.matchCount}경기</a> <span class="odds-1x2-stats-arrow">&gt;</span></span>
    </div>
    ${legend}
    <div class="odds-1x2-stats-donut-wrap">${donut}</div>
    ${byLine}
  </div>`;
  return html;
}

function renderUnderOverOdds() {
  const domesticList = (window.overUnderOddsFlowData || []).filter(g => g.marketType === '국내');
  const overseasList = (window.overUnderOddsFlowData || []).filter(g => g.marketType === '해외');

  function renderTable(oddsArr) {
    if (!oddsArr) return '';
    let html = `<table class="odds-underover-table">
      <thead>
        <tr>
          <th class="odds-th-under">언더</th>
          <th class="odds-th-draw">무</th>
          <th class="odds-th-over">오버</th>
          <th class="odds-th-time">변동 시간</th>
        </tr>
      </thead>
      <tbody>`;
    oddsArr.forEach((row, idx) => {
      const isLast = idx === oddsArr.length - 1;
      const liveClass = row.isLive ? ' live-odds' : '';
      // 언더 화살표
      let underArrow = '';
      if (row.change === "up") underArrow = '<span class="odds-arrow up">▲</span>';
      else if (row.change === "down") underArrow = '<span class="odds-arrow down">▼</span>';
      else underArrow = '<span class="odds-arrow"></span>';
      // 오버 화살표
      let overArrow = '';
      if (row.overChange === "up") overArrow = '<span class="odds-arrow up">▲</span>';
      else if (row.overChange === "down") overArrow = '<span class="odds-arrow down">▼</span>';
      else overArrow = '<span class="odds-arrow"></span>';
      let drawArrow = '<span class="odds-arrow draw"></span>';
      html += `<tr class="odds-underover-row${liveClass}"${isLast ? ' style=\"background:#EFEFEF\"' : ''}>
        <td class="odds-underover-td-under">${row.under !== null && row.under !== undefined ? Number(row.under).toFixed(2) : '-'}${underArrow}</td>
        <td class="odds-underover-td-draw">-${drawArrow}</td>
        <td class="odds-underover-td-over">${row.over !== null && row.over !== undefined ? Number(row.over).toFixed(2) : '-'}${overArrow}</td>
        <td class="odds-underover-td-time">${row.changedAt && row.changedAt !== "초기" ? row.changedAt : '초기'}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
    return html;
  }

  // 국내
  let domesticHtml = '';
  domesticList.forEach(item => {
    domesticHtml += `
      <div class="odds-flow-tile">국내 <span class="odds-flow-tile-line">${item.line}</span></div>
      ${renderTable(item.odds)}
    `;
  });

  // 해외
  let overseasHtml = '';
  overseasList.forEach(item => {
    overseasHtml += `
      <div class="odds-flow-tile">해외 <span class="odds-flow-tile-line">${item.line}</span></div>
      ${renderTable(item.odds)}
    `;
  });

  const html = `
    <div class="odds-underover-flow">
      <div class="odds-title-bar">
        <span class="odds-title">언더오버 배당 흐름</span>
      </div>
      <div class="odds-underover-domestic-section">
        ${domesticHtml}
      </div>
      <div class="odds-underover-overseas-section">
        ${overseasHtml}
      </div>
    </div>
  `;
  $('#section-overunder').html(html);
}

$(document).ready(function() {
  if (typeof renderOverUnderStats === 'function') {
    $('#overunder-stats').html(renderOverUnderStats());
  }
  if (typeof renderUnderOverOdds === 'function') {
    renderUnderOverOdds();
  }
}); 