function renderMarketNav() {
  const html = `
    <ul class="nav nav-pills nav-justified w-100" id="market-scrollspy">
      <li class="nav-item"><a class="nav-link active" href="#section-1x2">승무패</a></li>
      <li class="nav-item"><a class="nav-link" href="#section-handicap">핸디캡</a></li>
      <li class="nav-item"><a class="nav-link" href="#section-overunder">언더오버</a></li>
    </ul>
  `;
  $('#market-nav').html(html);
} 