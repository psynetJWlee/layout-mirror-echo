function renderOverseasOdds() {
  const html = `
    <div class="odds-overseas-section">
      <div class="odds-overseas-title">해외</div>
      <div class="odds-overseas-graph">
        <canvas id="overseas-odds-graph" width="340" height="120"></canvas>
        <div class="odds-overseas-main-values">
          <span class="lose">패 <span id="overseas-lose-value"></span></span>
          <span class="draw">무 <span id="overseas-draw-value"></span></span>
          <span class="win">승 <span id="overseas-win-value"></span></span>
        </div>
      </div>
      <div class="odds-overseas-table-wrap">
        <table class="odds-overseas-table">
          <thead>
            <tr>
              <th>승</th><th>무</th><th>패</th><th>변동 시간</th>
            </tr>
          </thead>
          <tbody id="overseas-odds-tbody">
            <!-- JS로 데이터 렌더링 -->
          </tbody>
        </table>
        <button class="odds-table-toggle" id="overseas-table-toggle">상세정보 펼쳐보기 ▼</button>
      </div>
      <div class="odds-table-after-kickoff-desc" id="overseas-after-kickoff-desc" style="display:none;">
        <span>경기 시작 후 변동</span>
      </div>
    </div>
  `;
  $('#app').append(html);
  renderOverseasOddsTable(true);
  renderOverseasMainValues();
  renderOverseasGraph();
  renderOverseasAfterKickoffDesc();
  $('#overseas-table-toggle').off('click').on('click', function() {
    const folded = $(this).text().includes('펼쳐보기');
    renderOverseasOddsTable(!folded);
    $(this).text(folded ? '상세정보 접기 ▲' : '상세정보 펼쳐보기 ▼');
  });
}

function renderOverseasOddsTable(folded = true) {
  const tbody = $('#overseas-odds-tbody');
  tbody.empty();
  const data = folded ? odds1x2Overseas.slice(0, 4) : odds1x2Overseas;
  data.forEach(row => {
    tbody.append(`
      <tr${row.afterKickoff ? ' class="after-kickoff"' : ''}>
        <td>${row.win}</td>
        <td>${row.draw}</td>
        <td>${row.lose}</td>
        <td>${row.changedAt}</td>
      </tr>
    `);
  });
}

function renderOverseasMainValues() {
  const latest = odds1x2Overseas[0];
  $('#overseas-win-value').text(latest.win);
  $('#overseas-draw-value').text(latest.draw);
  $('#overseas-lose-value').text(latest.lose);
}

function renderOverseasGraph() {
  const ctx = document.getElementById('overseas-odds-graph').getContext('2d');
  const labels = odds1x2Overseas.map(row => row.changedAt).reverse();
  const winData = odds1x2Overseas.map(row => row.win).reverse();
  const drawData = odds1x2Overseas.map(row => row.draw).reverse();
  const loseData = odds1x2Overseas.map(row => row.lose).reverse();
  if(window.overseasOddsChart) window.overseasOddsChart.destroy();
  window.overseasOddsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: '승', data: winData, borderColor: '#BB2828', backgroundColor: 'rgba(187,40,40,0.1)', fill: false },
        { label: '무', data: drawData, borderColor: '#888', backgroundColor: 'rgba(136,136,136,0.1)', fill: false },
        { label: '패', data: loseData, borderColor: '#1E3384', backgroundColor: 'rgba(30,51,132,0.1)', fill: false }
      ]
    },
    options: {
      responsive: false,
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: true } }
    }
  });
}

function renderOverseasAfterKickoffDesc() {
  const hasAfterKickoff = odds1x2Overseas.some(row => row.afterKickoff);
  if(hasAfterKickoff) {
    $('#overseas-after-kickoff-desc').show();
  } else {
    $('#overseas-after-kickoff-desc').hide();
  }
} 