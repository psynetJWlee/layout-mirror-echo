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
  <div class="odds-underover-stats">
    <div class="odds-title-bar">
      <span class="odds-title">언더오버 배당 통계</span>
    </div>
    <div>원형 도넛 그래프</div>
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