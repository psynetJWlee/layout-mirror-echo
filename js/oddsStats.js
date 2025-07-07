function renderOddsStats() {
  const stats = odds1x2Stats;
  const html = `
    <div class="odds-1x2-stats">
      <div class="odds-1x2-stats-title-bar">
        <span class="odds-1x2-stats-title">승무패 배당 통계</span>
      </div>
      <div class="odds-1x2-stats-match-info">
        <span class="odds-1x2-stats-match-label">승무패 배당률 일치 :</span>
        <span class="odds-1x2-stats-match-count"> <a href="#" class="odds-1x2-stats-link">${stats.matchCount}경기</a> <span class="odds-1x2-stats-arrow">&gt;</span></span>
      </div>
      <div class="odds-1x2-stats-odds-legend">
        <span class="odds-1x2-stats-odds-win"><span class="odds-1x2-stats-odds-box win"></span> 승 ${stats.odds.win}</span>
        <span class="odds-1x2-stats-odds-draw"><span class="odds-1x2-stats-odds-box draw"></span> 무 ${stats.odds.draw}</span>
        <span class="odds-1x2-stats-odds-lose"><span class="odds-1x2-stats-odds-box lose"></span> 패 ${stats.odds.lose}</span>
      </div>
      <div class="odds-1x2-stats-donut-wrap">
        <div class="odds-1x2-stats-donut">
          <div class="odds-1x2-stats-donut-center">승 ${stats.winCount}회</div>
        </div>
        <div class="odds-1x2-stats-donut-labels">
          <span class="draw">무 ${stats.drawCount}회</span>
          <span class="lose">패 ${stats.loseCount}회</span>
        </div>
      </div>
      <div class="odds-1x2-stats-by-odds">
        <div class="odds-1x2-stats-by-odds-title">배당별 통계</div>
        ${stats.statsByOdds.map(item => `
          <div class="odds-1x2-stats-by-odds-row">
            <span class="odds-1x2-stats-odds-box ${item.type}"></span>
            <span class="odds-1x2-stats-by-odds-label ${item.type}">${item.type === 'win' ? '승' : item.type === 'draw' ? '무' : '패'} ${item.odds}</span>
            <span class="odds-1x2-stats-by-odds-counts">
              <span class="win${item.type === 'win' ? ' strong' : ''}">${item.win}승</span>
              <span class="draw${item.type === 'draw' ? ' strong' : ''}">${item.draw}무</span>
              <span class="lose${item.type === 'lose' ? ' strong' : ''}">${item.lose}패</span>
            </span>
            <div class="odds-1x2-stats-bar-bg">
              <div class="odds-1x2-stats-bar win" style="width:${item.win}%"></div>
              <div class="odds-1x2-stats-bar draw" style="width:${item.draw}%"></div>
              <div class="odds-1x2-stats-bar lose" style="width:${item.lose}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  $('#app').append(html);
} 