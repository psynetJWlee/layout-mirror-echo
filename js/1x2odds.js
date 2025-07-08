function renderDomesticTable() {
  const domestic = window.odds1x2Data.find(d => d.marketType === '국내');
  const data = domestic ? domestic.odds : [];
  let html = '<div class="odds-domestic-section">';
  html += '<div class="odds-flow-tile">국내</div>';
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
    const liveClass = row.isLive ? ' live-odds' : '';
    // 변화방향 span 추가 (null이어도 빈 span)
    let winArrow = '';
    if (row.win.change === "up") winArrow = ' <span class="odds-arrow up">▲</span>';
    else if (row.win.change === "down") winArrow = ' <span class="odds-arrow down">▼</span>';
    else winArrow = ' <span class="odds-arrow up"></span>';
    let loseArrow = '';
    if (row.lose.change === "up") loseArrow = ' <span class="odds-arrow up">▲</span>';
    else if (row.lose.change === "down") loseArrow = ' <span class="odds-arrow down">▼</span>';
    else loseArrow = ' <span class="odds-arrow up"></span>';
    html += `<tr class="${liveClass}"${isLast ? ' style="background:#EFEFEF"' : ''}>`;
    html += '<td>' + (row.win.value !== null ? row.win.value.toFixed(2) : '-') + winArrow + '</td>';
    html += '<td>' + (row.draw.value !== null ? row.draw.value.toFixed(2) : '-') + '</td>';
    html += '<td>' + (row.lose.value !== null ? row.lose.value.toFixed(2) : '-') + loseArrow + '</td>';
    if (row.changedAt && row.changedAt !== "초기") {
      const [date, time] = row.changedAt.split(' ');
      html += `<td class="odds-td-time"><span class="date">${date}</span> <span class="time">${time || ''}</span></td>`;
    } else {
      html += '<td class="odds-td-time">초기</td>';
    }
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function renderDomesticOddsTable() {
  const domestic = window.odds1x2Data.find(d => d.marketType === '국내');
  const data = domestic ? domestic.odds : [];
  const tbody = $('.odds-domestic-table tbody');
  tbody.empty();
  data.forEach(row => {
    let winArrow = '';
    if (row.win.value !== null) {
      if (row.win.change === 'up') winArrow = ' <span class="odds-arrow up">▲</span>';
      else if (row.win.change === 'down') winArrow = ' <span class="odds-arrow down">▼</span>';
      else winArrow = ' <span class="odds-arrow up"></span>';
    }
    let drawArrow = '';
    if (row.draw.value !== null) {
      if (row.draw.change === 'up') drawArrow = ' <span class="odds-arrow up">▲</span>';
      else if (row.draw.change === 'down') drawArrow = ' <span class="odds-arrow down">▼</span>';
      else drawArrow = ' <span class="odds-arrow up"></span>';
    }
    let loseArrow = '';
    if (row.lose.value !== null) {
      if (row.lose.change === 'up') loseArrow = ' <span class="odds-arrow up">▲</span>';
      else if (row.lose.change === 'down') loseArrow = ' <span class="odds-arrow down">▼</span>';
      else loseArrow = ' <span class="odds-arrow up"></span>';
    }
    let dateHtml = '';
    if (row.changedAt && row.changedAt !== '초기') {
      const [date, time] = row.changedAt.split(' ');
      dateHtml = `<span class="date">${date}</span> <span class="time">${time || ''}</span>`;
    } else {
      dateHtml = '초기';
    }
    tbody.append(`
      <tr${row.isLive ? ' class="live-odds"' : ''}>
        <td>${row.win.value !== null ? row.win.value.toFixed(2) : '-'}${winArrow}</td>
        <td>${row.draw.value !== null ? row.draw.value.toFixed(2) : '-'}${drawArrow}</td>
        <td>${row.lose.value !== null ? row.lose.value.toFixed(2) : '-'}${loseArrow}</td>
        <td class="odds-td-time">${dateHtml}</td>
      </tr>
    `);
  });
}

function render1x2Stats() {
  const stats = window.odds1x2Stats;
  if (!stats) return { html: '', donut: null };
  const total = stats.winCount + stats.drawCount + stats.loseCount;
  const winPercent = (stats.winCount / total) * 100;
  const drawPercent = winPercent + (stats.drawCount / total) * 100;

  // 도넛 그래프 DOM 생성
  const donut = document.createElement('div');
  donut.classList.add('odds-1x2-stats-donut');
  donut.style.setProperty('--win', `${winPercent}%`);
  donut.style.setProperty('--draw', `${drawPercent}%`);
  donut.style.setProperty('--lose', `100%`);
  donut.innerHTML = `
    <div class="odds-1x2-stats-donut-center">승 ${stats.winCount}회</div>
  `;

  // 나머지 HTML은 문자열로 반환
  let html = `<div class="odds-title-bar">
    <span class="odds-title">승무패 배당 통계</span>
  </div>`;
  html += `<div class="odds-1x2-stats-match-info">
    <span class="odds-1x2-stats-match-label">승무패 배당률 일치 :</span>
    <span class="odds-1x2-stats-match-count"> <a href="#" class="odds-1x2-stats-link">${stats.matchCount}경기</a> <span class="odds-1x2-stats-arrow">&gt;</span></span>
  </div>`;
  html += `<div class="odds-1x2-stats-odds-legend">
    <span class="odds-1x2-stats-odds-win"><span class="odds-1x2-stats-odds-box win"></span> 승 ${(stats.odds.win !== undefined ? Number(stats.odds.win).toFixed(2) : '-') }</span>
    <span class="odds-1x2-stats-odds-draw"><span class="odds-1x2-stats-odds-box draw"></span> 무 ${(stats.odds.draw !== undefined ? Number(stats.odds.draw).toFixed(2) : '-') }</span>
    <span class="odds-1x2-stats-odds-lose"><span class="odds-1x2-stats-odds-box lose"></span> 패 ${(stats.odds.lose !== undefined ? Number(stats.odds.lose).toFixed(2) : '-') }</span>
  </div>`;
  // 도넛 그래프는 .odds-1x2-stats-donut-wrap에 append 예정
  html += `<div class="odds-1x2-stats-donut-wrap"></div>`;
  html += `<div class="odds-1x2-stats-donut-labels">
      <span class="draw">무 ${stats.drawCount}회</span>
      <span class="lose">패 ${stats.loseCount}회</span>
    </div>`;
  html += `<div class="odds-1x2-stats-by-odds">
    <div class="odds-1x2-stats-by-odds-title">배당별 통계</div>`;
  stats.statsByOdds.forEach(item => {
    let colorClass = item.type;
    html += `<div class="odds-1x2-stats-by-odds-row">
      <span class="odds-1x2-stats-odds-box ${colorClass}"></span>
      <span class="odds-1x2-stats-by-odds-label ${colorClass}">${item.type === 'win' ? '승' : item.type === 'draw' ? '무' : '패'} ${(item.odds !== undefined ? Number(item.odds).toFixed(2) : '-')}</span>
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
  return { html, donut };
}

function renderOverseasOddsTable(folded = true) {
  const overseas = window.odds1x2Data.find(d => d.marketType === '해외');
  const data = overseas ? overseas.odds : [];
  const tbody = $('#overseas-odds-tbody');
  tbody.empty();
  const showData = folded ? data.slice(0, 4) : data;
  showData.forEach(row => {
    let dateHtml = '';
    if (row.changedAt && row.changedAt !== '초기') {
      const [date, time] = row.changedAt.split(' ');
      dateHtml = `<span class='date'>${date}</span> <span class='time'>${time || ''}</span>`;
    } else {
      dateHtml = '초기';
    }
    const liveClass = row.isLive ? ' live-odds' : '';
    let winArrow = '';
    if (row.win.change === 'up') winArrow = ' <span class="odds-arrow up">▲</span>';
    else if (row.win.change === 'down') winArrow = ' <span class="odds-arrow down">▼</span>';
    else winArrow = ' <span class="odds-arrow up"></span>';
    let drawArrow = '';
    if (row.draw.value !== null) {
      if (row.draw.change === 'up') drawArrow = ' <span class="odds-arrow up">▲</span>';
      else if (row.draw.change === 'down') drawArrow = ' <span class="odds-arrow down">▼</span>';
      else drawArrow = ' <span class="odds-arrow up"></span>';
    }
    let loseArrow = '';
    if (row.lose.change === 'up') loseArrow = ' <span class="odds-arrow up">▲</span>';
    else if (row.lose.change === 'down') loseArrow = ' <span class="odds-arrow down">▼</span>';
    else loseArrow = ' <span class="odds-arrow up"></span>';
    tbody.append(`
      <tr class="${liveClass}">
        <td>${row.win.value !== null ? row.win.value.toFixed(2) : '-'}${winArrow}</td>
        <td>${row.draw.value !== null ? row.draw.value.toFixed(2) : '-'}${drawArrow}</td>
        <td>${row.lose.value !== null ? row.lose.value.toFixed(2) : '-'}${loseArrow}</td>
        <td class="odds-td-time">${dateHtml}</td>
      </tr>
    `);
  });
}

function renderOverseasMainValues() {
  const overseas = window.odds1x2Data.find(d => d.marketType === '해외');
  const data = overseas ? overseas.odds : [];
  const latest = data[0];
  $('#overseas-win-value').text(latest && latest.win.value !== null ? latest.win.value.toFixed(2) : '-');
  $('#overseas-draw-value').text(latest && latest.draw.value !== null ? latest.draw.value.toFixed(2) : '-');
  $('#overseas-lose-value').text(latest && latest.lose.value !== null ? latest.lose.value.toFixed(2) : '-');
}

// Chart.js 마지막 점에 화살표 표시 플러그인 (v3+ 호환)
const arrowOnLastPoint = {
  id: 'arrowOnLastPoint',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta || !meta.data || !meta.data.length) return;
      const lastIndex = dataset.data.length - 1;
      const point = meta.data[lastIndex];
      if (!point) return;
      const prev = dataset.data[lastIndex - 1];
      const curr = dataset.data[lastIndex];
      // 방향 결정
      let arrow = '→';
      if (prev !== undefined) {
        if (curr > prev) arrow = '↑';
        else if (curr < prev) arrow = '↓';
      }
      ctx.save();
      ctx.font = 'bold 20px Pretendard, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = dataset.borderColor;
      // 위치: 점 오른쪽(12px) 또는 위쪽(↑일 때)
      let x = point.x + 12;
      let y = point.y;
      if (arrow === '↑') {
        x = point.x;
        y = point.y - 18;
      }
      ctx.fillText(arrow, x, y);
      ctx.restore();
    });
  }
};
if (window.Chart && Chart.register) Chart.register(arrowOnLastPoint);

function renderOverseasGraph() {
  const overseas = window.odds1x2Data.find(d => d.marketType === '해외');
  const data = overseas ? overseas.odds : [];
  const ctx = document.getElementById('overseas-odds-graph').getContext('2d');
  const labels = data.map(row => row.changedAt).reverse();
  const winData = data.map(row => row.win.value).reverse();
  const drawData = data.map(row => row.draw.value).reverse();
  const loseData = data.map(row => row.lose.value).reverse();
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
      scales: { x: { display: false }, y: { display: true } },
      elements: {
        point: {
          radius: 0,
          hoverRadius: 0
        }
      }
    }
    // plugins: [{ ... }] 제거 (Chart.register 사용)
  });
}

function renderOverseasAfterKickoffDesc() {
  const overseas = window.odds1x2Data.find(d => d.marketType === '해외');
  const data = overseas ? overseas.odds : [];
  const hasAfterKickoff = data.some(row => row.afterKickoff);
  if(hasAfterKickoff) {
    $('#overseas-after-kickoff-desc').show();
  } else {
    $('#overseas-after-kickoff-desc').hide();
  }
}

function render1x2Odds() {
  const stats = render1x2Stats();
  const domestic = window.odds1x2Data.find(d => d.marketType === '국내');
  const overseas = window.odds1x2Data.find(d => d.marketType === '해외');
  const domesticOdds = domestic ? domestic.odds : [];
  const overseasOdds = overseas ? overseas.odds : [];
  const html = `
    <div class="odds-1x2-flow">
      <div class="odds-title-bar">
        <span class="odds-title">승무패 배당 흐름</span>
      </div>
      <div class="odds-domestic-section">
        <div class="odds-flow-tile">국내</div>
        <table class="odds-domestic-table">
          <thead>
            <tr>
              <th class="odds-th-win">승</th>
              <th class="odds-th-draw">무</th>
              <th class="odds-th-lose">패</th>
              <th class="odds-th-time">변동 시간</th>
            </tr>
          </thead>
          <tbody>
            ${domesticOdds.map(row => {
              let dateHtml = '';
              if (row.changedAt && row.changedAt !== '초기') {
                const [date, time] = row.changedAt.split(' ');
                dateHtml = `<span class='date'>${date}</span> <span class='time'>${time || ''}</span>`;
              } else {
                dateHtml = '초기';
              }
              // 변화방향 span 추가
              const winArrow = row.win.change === 'up' ? ' <span class="odds-arrow up">▲</span>' : row.win.change === 'down' ? ' <span class="odds-arrow down">▼</span>' : '';
              const loseArrow = row.lose.change === 'up' ? ' <span class="odds-arrow up">▲</span>' : row.lose.change === 'down' ? ' <span class="odds-arrow down">▼</span>' : '';
              return `
                <tr${row.isLive ? ' class="live-odds"' : ''}>
                  <td>${row.win.value !== null ? row.win.value.toFixed(2) : '-'}${winArrow}</td>
                  <td>${row.draw.value !== null ? row.draw.value.toFixed(2) : '-'}</td>
                  <td>${row.lose.value !== null ? row.lose.value.toFixed(2) : '-'}${loseArrow}</td>
                  <td class="odds-td-time">${dateHtml}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div class="odds-overseas-section">
        <div class="odds-flow-tile">해외</div>
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
                <th class="odds-th-win">승</th>
                <th class="odds-th-draw">무</th>
                <th class="odds-th-lose">패</th>
                <th class="odds-th-time">변동 시간</th>
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
    </div>
    <div class="odds-1x2-stats">
      ${stats.html}
    </div>
  `;
  $('#section-1x2').html(html);
  // 도넛 그래프 append
  $('.odds-1x2-stats-donut-wrap').append(stats.donut);
  // 해외 배당 표, 그래프, 폴딩, 주요값, 안내문구 등은 기존 renderOverseasOddsTable/renderOverseasMainValues/renderOverseasGraph/renderOverseasAfterKickoffDesc 함수 활용
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

function initOddsContent() {
  // section-1x2의 innerHTML을 덮어쓰지 않고, 테이블/그래프 등만 갱신
  renderDomesticOddsTable();
  let folded = true;
  renderOverseasOddsTable(folded);
  renderOverseasMainValues();
  renderOverseasGraph();
  renderOverseasAfterKickoffDesc();
  $('#overseas-table-toggle').off('click').on('click', function() {
    folded = !folded;
    renderOverseasOddsTable(folded);
    $(this).text(folded ? '상세정보 펼쳐보기 ▼' : '상세정보 접기 ▲');
  });
}

$(document).on('click', '.odds-1x2-stats-link', function(e) {
  e.preventDefault();
  return false;
});

// odds-1x2-flow: 승무패 배당 흐름, odds-1x2-stats: 승무패 배당 통계
const section = document.getElementById('section-1x2');
const domestic = window.odds1x2Data.find(d => d.marketType === '국내');
const overseas = window.odds1x2Data.find(d => d.marketType === '해외');
const domesticOdds = domestic ? domestic.odds : [];
const overseasOdds = overseas ? overseas.odds : [];
section.innerHTML = `
  <div class="odds-1x2-flow">
    <div class="odds-title-bar">
      <span class="odds-title">승무패 배당 흐름</span>
    </div>
    <div class="odds-flow-tile">
      <div class="odds-flow-tile">국내</div>
      <table class="odds-domestic-table">
        <thead>
          <tr>
            <th class="odds-th-win">승</th>
            <th class="odds-th-draw">무</th>
            <th class="odds-th-lose">패</th>
            <th class="odds-th-time">변동 시간</th>
          </tr>
        </thead>
        <tbody>
          ${domesticOdds.map(row => {
            let dateHtml = '';
            if (row.changedAt && row.changedAt !== '초기') {
              const [date, time] = row.changedAt.split(' ');
              dateHtml = `<span class='date'>${date}</span> <span class='time'>${time || ''}</span>`;
            } else {
              dateHtml = '초기';
            }
            return `
              <tr${row.isLive ? ' class="live-odds"' : ''}>
                <td>${row.win.value !== null ? row.win.value.toFixed(2) : '-'}</td>
                <td>${row.draw.value !== null ? row.draw.value.toFixed(2) : '-'}</td>
                <td>${row.lose.value !== null ? row.lose.value.toFixed(2) : '-'}</td>
                <td class="odds-td-time">${dateHtml}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
    <div class="odds-overseas-section">
      <div class="odds-flow-tile">해외</div>
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
              <th class="odds-th-win">승</th>
              <th class="odds-th-draw">무</th>
              <th class="odds-th-lose">패</th>
              <th class="odds-th-time">변동 시간</th>
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
  </div>
  <div class="odds-1x2-stats">
    <div class="odds-title-bar">
      <span class="odds-title">승무패 배당 통계</span>
    </div>
    <div class="odds-1x2-stats-match-info">
      <span class="odds-1x2-stats-match-label">승무패 배당률 일치 :</span>
      <span class="odds-1x2-stats-match-count"> <a href="#" class="odds-1x2-stats-link">${window.odds1x2Stats.matchCount}경기</a> <span class="odds-1x2-stats-arrow">&gt;</span></span>
    </div>
    <div class="odds-1x2-stats-odds-legend">
      <span class="odds-1x2-stats-odds-win"><span class="odds-1x2-stats-odds-box win"></span> 승 ${window.odds1x2Stats.odds.win.toFixed(2)}</span>
      <span class="odds-1x2-stats-odds-draw"><span class="odds-1x2-stats-odds-box draw"></span> 무 ${window.odds1x2Stats.odds.draw.toFixed(2)}</span>
      <span class="odds-1x2-stats-odds-lose"><span class="odds-1x2-stats-odds-box lose"></span> 패 ${window.odds1x2Stats.odds.lose.toFixed(2)}</span>
    </div>
    <div class="odds-1x2-stats-donut-wrap">
      <div class="odds-1x2-stats-donut">
        <div class="odds-1x2-stats-donut-center">승 ${window.odds1x2Stats.winCount}회</div>
      </div>
      <div class="odds-1x2-stats-donut-labels">
        <span class="draw">무 ${window.odds1x2Stats.drawCount}회</span>
        <span class="lose">패 ${window.odds1x2Stats.loseCount}회</span>
      </div>
    </div>
    <div class="odds-1x2-stats-by-odds">
      <div class="odds-1x2-stats-by-odds-title">배당별 통계</div>
      ${window.odds1x2Stats.statsByOdds.map(item => `
        <div class="odds-1x2-stats-by-odds-row">
          <span class="odds-1x2-stats-odds-box ${item.type}"></span>
          <span class="odds-1x2-stats-by-odds-label ${item.type}">${item.type === 'win' ? '승' : item.type === 'draw' ? '무' : '패'} ${item.odds.toFixed(2)}</span>
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