function renderMarketNav() {
  const html = `
    <nav id="market-nav" class="navbar market-scrollspy-nav px-0 sticky-top" style="background:#fff;z-index:20;">
      <ul class="nav nav-pills nav-justified w-100" id="market-scrollspy">
        <li class="nav-item"><a class="nav-link active" href="#section-1x2">승무패</a></li>
        <li class="nav-item"><a class="nav-link" href="#section-handicap">핸디캡</a></li>
        <li class="nav-item"><a class="nav-link" href="#section-overunder">언더오버</a></li>
      </ul>
    </nav>
  `;
  $('#app').append(html);
} 