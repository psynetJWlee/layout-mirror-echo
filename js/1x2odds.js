function renderDomesticTable() {
  const data = window.odds1x2Domestic || [];
  let html = '<div class="odds-domestic-section">';
  html += '<div class="odds-domestic-title">국내</div>';
  html += '<table class="odds-domestic-table">';
  html += '<thead><tr>' +
    '<th class="odds-th-win">승</th>' +
    '<th class="odds-th-draw">무</th>' +
    '<th class="odds-th-lose">패</th>' +
    '<th class="odds-th-time">변동 시간</th>' +
    '</tr></thead>';
  html += '<tbody>';
  data.forEach((row, idx) => {
    const isLast = idx === data.length - 1;
    html += `<tr${isLast ? ' style="background:#EFEFEF"' : ''}>`;
    // 승
    html += '<td>' + row.win.value.toFixed(2);
    if (row.win.change === "up") html += ' <span class="odds-arrow up">▲</span>';
    if (row.win.change === "down") html += ' <span class="odds-arrow down">▼</span>';
    html += '</td>';
    // 무
    html += '<td>' + row.draw.value.toFixed(2) + '</td>';
    // 패
    html += '<td>' + row.lose.value.toFixed(2);
    if (row.lose.change === "up") html += ' <span class="odds-arrow up">▲</span>';
    if (row.lose.change === "down") html += ' <span class="odds-arrow down">▼</span>';
    html += '</td>';
    // 시간
    if (row.time && row.time !== "초기") {
      const [date, time] = row.time.split(' ');
      html += `<td class="odds-td-time"><span>${date}</span> ${time}</td>`;
    } else {
      html += '<td class="odds-td-time">초기</td>';
    }
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function render1x2Stats() {
  const stats = window.odds1x2Stats;
  if (!stats) return '';
  // 비율 계산
  const total = stats.winCount + stats.drawCount + stats.loseCount;
  const winPercent = (stats.winCount / total) * 100;
  const drawPercent = winPercent + (stats.drawCount / total) * 100;
  // 상단 정보
  let html = `<div class="odds-1x2-stats-title-bar">
    <span class="odds-1x2-stats-title">승무패 배당 통계</span>
  </div>`;
  html += `<div class="odds-1x2-stats-match-info">
    <span class="odds-1x2-stats-match-label">승무패 배당률 일치 :</span>
    <span class="odds-1x2-stats-match-count"> <a href="#" class="odds-1x2-stats-link">${stats.matchCount}경기</a> <span class="odds-1x2-stats-arrow">&gt;</span></span>
  </div>`;
  // 배당값 색상
  html += `<div class="odds-1x2-stats-odds-legend">
    <span class="odds-1x2-stats-odds-win"><span class="odds-1x2-stats-odds-box win"></span> 승 ${stats.odds.win}</span>
    <span class="odds-1x2-stats-odds-draw"><span class="odds-1x2-stats-odds-box draw"></span> 무 ${stats.odds.draw}</span>
    <span class="odds-1x2-stats-odds-lose"><span class="odds-1x2-stats-odds-box lose"></span> 패 ${stats.odds.lose}</span>
  </div>`;
  // 도넛 그래프
  html += `<div class="odds-1x2-stats-donut-wrap">
    <div class="odds-1x2-stats-donut" style="--win:${winPercent}%;--draw:${drawPercent}%;--lose:100%;">
      <div class="odds-1x2-stats-donut-center">승 ${stats.winCount}회</div>
    </div>
    <div class="odds-1x2-stats-donut-labels">
      <span class="draw">무 ${stats.drawCount}회</span>
      <span class="lose">패 ${stats.loseCount}회</span>
    </div>
  </div>`;
  // 배당별 통계
  html += `<div class="odds-1x2-stats-by-odds">
    <div class="odds-1x2-stats-by-odds-title">배당별 통계</div>`;
  stats.statsByOdds.forEach(item => {
    let colorClass = item.type;
    html += `<div class="odds-1x2-stats-by-odds-row">
      <span class="odds-1x2-stats-odds-box ${colorClass}"></span>
      <span class="odds-1x2-stats-by-odds-label ${colorClass}">${item.type === 'win' ? '승' : item.type === 'draw' ? '무' : '패'} ${item.odds}</span>
      <span class="odds-1x2-stats-by-odds-counts">
        <span class="win${colorClass === 'win' ? ' strong' : ''}">${item.win}승</span>
        <span class="draw${colorClass === 'draw' ? ' strong' : ''}">${item.draw}무</span>
        <span class="lose${colorClass === 'lose' ? ' strong' : ''}">${item.lose}패</span>
      </span>
      <div class="odds-1x2-stats-bar-bg">
        <div class="odds-1x2-stats-bar win" style="width:${item.win}%"></div>
        <div class="odds-1x2-stats-bar draw" style="width:${item.draw}%"></div>
        <div class="odds-1x2-stats-bar lose" style="width:${item.lose}%"></div>
      </div>
    </div>`;
  });
  html += `</div>`;
  return html;
}

function initOddsContent(matchId) {
  $('#section-1x2').html('<div class="odds-sample">여기에 승무패 배당 데이터가 들어갑니다</div>');
  $('#section-handicap').html('<div class="odds-sample">여기에 핸디캡 배당 데이터가 들어갑니다</div>');
  $('#section-overunder').html('<div class="odds-sample">여기에 언더오버 배당 데이터가 들어갑니다</div>');
}

// odds-1x2-flow: 승무패 배당 흐름, odds-1x2-stats: 승무패 배당 통계
const section = document.getElementById('section-1x2');
section.innerHTML = `
  <div class="odds-1x2-flow">
    <div class="odds-title-bar">
      <button class="odds-sort-btn" type="button">
        <img src="/image/Favorites.png" alt="소팅" />
      </button>
      <span class="odds-title-text">승무패 배당 흐름</span>
    </div>
    ${renderDomesticTable()}
    <div class="subsection mb-4" style="display:none;"></div>
  </div>
  <div class="odds-1x2-stats">
    ${render1x2Stats()}
  </div>
`; 