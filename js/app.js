$(document).ready(function() {
  renderTitle();           // 1. 타이틀
  renderMatchInfo();       // 2. 매치 인포
  renderMarketNav();       // 3. 내비게이션(스크롤 스파이)
  render1x2Odds();         // 4. 승무패 세션(흐름+통계)
  renderHandicapOdds();    // 5. 핸디캡 세션(흐름+통계)
  // renderOverUnderOdds();   // 6. 언더오버 세션(흐름+통계, 추후 구현)
  initOddsContent();       // 기타 초기화(필요시)
}); 