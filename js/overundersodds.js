// ====================================================================
// js/overundersodds.js
// 언더오버 배당 흐름과 통계를 그려주는 스크립트
// ====================================================================

// ————————————————————————————————————————————————————————————————
// 1) 언더오버 배당 흐름(테이블) 렌더링 함수
// ————————————————————————————————————————————————————————————————
function renderUnderOverOddsTable(marketType) {
  const data = (window.overUnderOddsFlowData || [])
                   .filter(g => g.marketType === marketType);
  if (!data.length) return '<div>데이터 없음</div>';

  let html = '';
  data.forEach(group => {
    html += `
      <div class="odds-flow-tile">
        ${marketType} <span class="odds-flow-tile-line">${group.line}</span>
      </div>
      <table class="odds-underover-table">
        <thead>
          <tr>
            <th class="odds-th-under">언더</th>
            <th class="odds-th-draw">무</th>
            <th class="odds-th-over">오버</th>
            <th class="odds-th-time">변동 시간</th>
          </tr>
        </thead>
        <tbody>
    `;
    group.odds.forEach((row, idx) => {
      const isLast   = idx === group.odds.length - 1;
      const liveCls  = row.isLive ? ' live-odds' : '';
      const underArr = row.change === 'up'   ? '▲'
                     : row.change === 'down' ? '▼'
                     : '';
      const overArr  = row.overChange === 'up'   ? '▲'
                     : row.overChange === 'down' ? '▼'
                     : '';
      html += `
        <tr class="odds-underover-row${liveCls}"${isLast ? ' style="background:#EFEFEF"' : ''}>
          <td class="odds-underover-td-under">
            ${row.under  != null ? row.under.toFixed(2) : '-'}<span class="odds-arrow under">${underArr}</span>
          </td>
          <td class="odds-underover-td-draw">-<span class="odds-arrow draw"></span></td>
          <td class="odds-underover-td-over">
            ${row.over   != null ? row.over.toFixed(2)  : '-'}<span class="odds-arrow over">${overArr}</span>
          </td>
          <td class="odds-underover-td-time">
            ${row.changedAt && row.changedAt !== '초기' ? row.changedAt : '초기'}
          </td>
        </tr>
      `;
    });
    html += `</tbody></table>`;
  });
  return html;
}

// ————————————————————————————————————————————————————————————————
// 2) 언더오버 배당 통계(도넛) 렌더링 함수
// ————————————————————————————————————————————————————————————————
function renderOverUnderStats() {
  const stats = window.overUnderStatsData;
  if (!stats) return '';

  // (1) 비율 계산
  const total       = stats.stats.underCount + stats.stats.overCount;
  const underPct    = total ? Math.round(stats.stats.underCount / total * 100) : 0;
  const overPct     = total ? Math.round(stats.stats.overCount  / total * 100) : 0;
  const donutPct    = underPct > overPct ? underPct : overPct;

  // (2) 텍스트·색상 결정
  let centerText, centerColor, lowerText, lowerColor;
  if (stats.stats.underCount > stats.stats.overCount) {
    centerText  = `U ${stats.stats.underCount}회`;
    centerColor = '#BB2828';
    lowerText   = `O ${stats.stats.overCount}회`;
    lowerColor  = '#1E3384';
  } else {
    centerText  = `O ${stats.stats.overCount}회`;
    centerColor = '#1E3384';
    lowerText   = `U ${stats.stats.underCount}회`;
    lowerColor  = '#BB2828';
  }

  // (3) 도넛 마크업
  const donut = `
    <div class="odds-1x2-stats-donut"
         style="--win:${donutPct}%; --draw:${donutPct}%; --lose:100%">
      <div class="odds-1x2-stats-donut-center"
           style="color:${centerColor}">${centerText}</div>
    </div>
  `;

  // (4) 도넛 소제목(작은 글씨)
  const donutLabel = `
    <div class="odds-1x2-stats-donut-labels">
      <span style="color:${lowerColor}">${lowerText}</span>
    </div>
  `;

  // (5) 배당 레전드
  const legend = `
    <div class="odds-1x2-stats-odds-legend">
      <span class="odds-1x2-stats-odds-win">
        <span class="odds-1x2-stats-odds-box win" style="background:${centerColor}"></span>
        U ${stats.odds.under != null ? stats.odds.under.toFixed(2) : '-'}
      </span>
      <span class="odds-1x2-stats-odds-lose">
        <span class="odds-1x2-stats-odds-box lose" style="background:${lowerColor}"></span>
        O ${stats.odds.over  != null ? stats.odds.over.toFixed(2)  : '-'}
      </span>
    </div>
  `;

  // (6) 기준점별 통계
  let byLine = `
    <div class="odds-1x2-stats-by-odds">
      <div class="odds-1x2-stats-by-odds-title">기준점별 통계</div>
  `;
  stats.statsByLine.forEach(item => {
    const sum      = item.under + item.over;
    const uBarPct  = sum ? Math.round(item.under / sum * 100) : 0;
    const oBarPct  = sum ? Math.round(item.over  / sum * 100) : 0;
    byLine += `
      <div class="odds-1x2-stats-by-odds-row">
        <span class="odds-1x2-stats-odds-box" style="background:#323741"></span>
        <span class="odds-1x2-stats-by-odds-label" style="color:#323741">${item.line}</span>
        <span class="odds-1x2-stats-by-odds-counts">
          <span class="win"  style="color:#BB2828;font-weight:700;text-decoration:underline;">
            ${item.under}언더
          </span>
          <span class="lose" style="color:#1E3384;font-weight:700;text-decoration:underline;">
            ${item.over}오버
          </span>
        </span>
        <div class="odds-1x2-stats-bar-bg" style="background:#F5CFCF;opacity:0.3;display:flex;">
          <div class="odds-1x2-stats-bar win"  style="width:${uBarPct}%;height:10px;"></div>
          <div class="odds-1x2-stats-bar lose" style="width:${oBarPct}%;height:10px;"></div>
        </div>
      </div>
    `;
  });
  byLine += `</div>`;

  // (7) 최종 조립
  return `
    <div class="odds-1x2-stats">
      <div class="odds-title-bar">
        <span class="odds-title">언더오버 배당 통계</span>
      </div>
      <div class="odds-1x2-stats-match-info">
        <span class="odds-1x2-stats-match-label">
          언더오버 (${stats.line}) 동일 배당 :
        </span>
        <span class="odds-1x2-stats-match-count">
          <a href="#" class="odds-1x2-stats-link">${stats.matchCount}경기</a>
          <span class="odds-1x2-stats-arrow">&gt;</span>
        </span>
      </div>
      ${legend}
      <div class="odds-underover-stats-donut-wrap">
        ${donut}
        ${donutLabel}
      </div>
      ${byLine}
    </div>
  `;
}

// ————————————————————————————————————————————————————————————————
// 3) DOM에 삽입
// ————————————————————————————————————————————————————————————————
$(document).ready(function() {
  // 3-1) 흐름 테이블
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

  // 3-2) 통계(도넛)
  if (typeof renderOverUnderStats === 'function') {
    $('#overunder-stats').html(renderOverUnderStats());
  }

  // (옵션) 1×2, 핸디캡 등 다른 섹션이 있을 경우
  if (typeof renderUnderOverOdds === 'function') {
    renderUnderOverOdds();
  }
});
