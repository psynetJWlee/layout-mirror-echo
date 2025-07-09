function renderTitle() {
  const html = `
    <div class="header-left">
      <img src="/image/AI.gif" alt="AI" class="ai-icon" />
    </div>
    <div class="header-title">배당</div>
    <div class="header-right">
      <img src="/image/Calculator Icon.png" alt="계산기" class="calc-icon" />
      <img src="/image/닫기 터치 영역.png" alt="닫기" class="close-icon" />
    </div>
  `;
  $('header.custom-header').html(html);
} 