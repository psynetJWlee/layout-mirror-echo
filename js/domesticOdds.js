function renderDomesticOdds() {
  const html = `
    <div class="odds-domestic-section">
      <div class="odds-flow-tile">국내</div>
      <table class="odds-domestic-table">
        <thead>
          <tr>
            <th>승</th>
            <th>무</th>
            <th>패</th>
            <th>변동 시간</th>
          </tr>
        </thead>
        <tbody>
          ${odds1x2Domestic.map(row => `
            <tr>
              <td>${row.win}</td>
              <td>${row.draw}</td>
              <td>${row.lose}</td>
              <td>${row.changedAt}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  $('#app').append(html);
} 