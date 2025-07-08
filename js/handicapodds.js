function renderHandicapOdds() {
  const domesticList = (window.handicapOddsData || []).filter(item => item.marketType === '국내');
  const overseasList = (window.handicapOddsData || []).filter(item => item.marketType === '해외');

  function renderTable(oddsArr) {
    if (!oddsArr) return '';
    let html = `<table class="odds-handicap-table">
      <thead>
        <tr>
          <th class="odds-th-win">핸승</th>
          <th class="odds-th-draw">핸무</th>
          <th class="odds-th-lose">핸패</th>
          <th class="odds-th-time">변동 시간</th>
        </tr>
      </thead>
      <tbody>`;
    oddsArr.forEach((row, idx) => {
      const isLast = idx === oddsArr.length - 1;
      const liveClass = row.isLive ? ' live-odds' : '';
      // 변화방향 span 추가 (null이어도 빈 span)
      let winArrow = '';
      if (row.win.value !== null) {
        if (row.win.change === "up") winArrow = ' <span class="odds-arrow up">▲</span>';
        else if (row.win.change === "down") winArrow = ' <span class="odds-arrow down">▼</span>';
        else winArrow = ' <span class="odds-arrow up"></span>';
      }
      let drawArrow = '';
      if (row.draw.value !== null) {
        if (row.draw.change === "up") drawArrow = ' <span class="odds-arrow up">▲</span>';
        else if (row.draw.change === "down") drawArrow = ' <span class="odds-arrow down">▼</span>';
        else drawArrow = ' <span class="odds-arrow up"></span>';
      }
      let loseArrow = '';
      if (row.lose.value !== null) {
        if (row.lose.change === "up") loseArrow = ' <span class="odds-arrow up">▲</span>';
        else if (row.lose.change === "down") loseArrow = ' <span class="odds-arrow down">▼</span>';
        else loseArrow = ' <span class="odds-arrow up"></span>';
      }
      html += '<tr class="' + liveClass + '"' + (isLast ? ' style="background:#EFEFEF"' : '') + '>';
      html += '<td>' + (row.win.value !== null ? row.win.value.toFixed(2) : '-') + winArrow + '</td>';
      html += '<td>' + (row.draw.value !== null ? row.draw.value.toFixed(2) : '-') + drawArrow + '</td>';
      html += '<td>' + (row.lose.value !== null ? row.lose.value.toFixed(2) : '-') + loseArrow + '</td>';
      if (row.changedAt && row.changedAt !== "초기") {
        const [date, time] = row.changedAt.split(' ');
        html += `<td class="odds-td-time"><span class="date">${date}</span> <span class="time">${time || ''}</span></td>`;
      } else {
        html += '<td class="odds-td-time">초기</td>';
      }
      html += '</tr>';
    });
    html += '</tbody></table>';
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
    <div class="odds-handicap-flow">
      <div class="odds-title-bar">
        <span class="odds-title">핸디캡 배당 흐름</span>
      </div>
      <div class="odds-handicap-domestic-section">
        ${domesticHtml}
      </div>
      <div class="odds-handicap-overseas-section">
        ${overseasHtml}
      </div>
    </div>
  `;
  $('#section-handicap').html(html);
}

function renderHandicapStats() {
  const stats = window.handicapStatsData;
  if (!stats) return '';
  const total = stats.stats.winCount + stats.stats.drawCount + stats.stats.loseCount;
  const winPercent = total ? (stats.stats.winCount / total) * 100 : 0;
  const drawPercent = total ? (stats.stats.drawCount / total) * 100 : 0;
  const losePercent = total ? (stats.stats.loseCount / total) * 100 : 0;

  // 도넛 그래프
  let donut = `<div class="odds-1x2-stats-donut" style="--win:${winPercent}%; --draw:${winPercent + drawPercent}%; --lose:100%">
    <div class="odds-1x2-stats-donut-center" style="color:#BB2828">승 ${stats.stats.winCount}회</div>
  </div>
  <div class="odds-1x2-stats-donut-labels">
    <span class="lose" style="color:#1E3384">패 ${stats.stats.loseCount}회</span>
  </div>`;

  // 배당값 레전드
  let legend = `<div class="odds-1x2-stats-odds-legend">
    <span class="odds-1x2-stats-odds-win"><span class="odds-1x2-stats-odds-box win" style="background:#BB2828"></span> 승 ${(stats.odds.win !== undefined ? Number(stats.odds.win).toFixed(2) : '-') }</span>
    <span class="odds-1x2-stats-odds-draw"><span class="odds-1x2-stats-odds-box draw" style="background:#8a8a8a"></span> 무 ${(stats.odds.draw !== undefined ? Number(stats.odds.draw).toFixed(2) : '-') }</span>
    <span class="odds-1x2-stats-odds-lose"><span class="odds-1x2-stats-odds-box lose" style="background:#1E3384"></span> 패 ${(stats.odds.lose !== undefined ? Number(stats.odds.lose).toFixed(2) : '-') }</span>
  </div>`;

  // 기준점별 통계
  let byLine = `<div class="odds-1x2-stats-by-odds">
    <div class="odds-1x2-stats-by-odds-title">기준점별 통계</div>`;
  stats.statsByLine.forEach(item => {
    const sum = item.win + item.draw + item.lose;
    const winBar = sum ? (item.win / sum) * 100 : 0;
    const drawBar = sum ? (item.draw / sum) * 100 : 0;
    const loseBar = sum ? (item.lose / sum) * 100 : 0;
    byLine += `<div class="odds-1x2-stats-by-odds-row">
      <span class="odds-1x2-stats-odds-box" style="background:#323741"></span>
      <span class="odds-1x2-stats-by-odds-label" style="color:#323741">${item.line}</span>
      <span class="odds-1x2-stats-by-odds-counts">
        <span class="win" style="color:#BB2828;font-weight:700;text-decoration:underline;">${item.win}승</span>
        <span class="draw" style="color:#888;">${item.draw ? item.draw + '무' : ''}</span>
        <span class="lose" style="color:#1E3384;font-weight:700;text-decoration:underline;">${item.lose}패</span>
      </span>
      <div class="odds-1x2-stats-bar-bg" style="background:#F5CFCF;opacity:0.3;display:flex;">
        <div class="odds-1x2-stats-bar win" style="background:#BB2828;width:${winBar}%;height:10px;display:inline-block;"></div>
        <div class="odds-1x2-stats-bar draw" style="background:#8a8a8a;width:${drawBar}%;height:10px;display:inline-block;"></div>
        <div class="odds-1x2-stats-bar lose" style="background:#1E3384;width:${loseBar}%;height:10px;display:inline-block;"></div>
      </div>
    </div>`;
  });
  byLine += `</div>`;

  // 전체 HTML
  let html = `<div class="odds-1x2-stats">
    <div class="odds-title-bar">
      <span class="odds-title">핸디캡 배당 통계</span>
    </div>
    <div class="odds-1x2-stats-match-info">
      <span class="odds-1x2-stats-match-label">핸디캡 (${stats.line}) 동일 배당률 :</span>
      <span class="odds-1x2-stats-match-count"> <a href="#" class="odds-1x2-stats-link">${stats.matchCount}경기</a> <span class="odds-1x2-stats-arrow">&gt;</span></span>
    </div>
    ${legend}
    <div class="odds-1x2-stats-donut-wrap">${donut}</div>
    ${byLine}
  </div>`;
  return html;
}

$(document).on('click', '.odds-1x2-stats-link', function(e) {
  e.preventDefault();
  return false;
});

const prevRenderHandicapOdds = renderHandicapOdds;
renderHandicapOdds = function() {
  prevRenderHandicapOdds();
  // 핸디캡 배당 통계 콘텐츠를 핸디캡 배당 흐름 아래에 추가
  const statsHtml = renderHandicapStats();
  $("#section-handicap").append(statsHtml);
}; 