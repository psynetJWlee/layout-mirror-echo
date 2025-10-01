function renderMarketNav() {
  // 스크롤 스파이는 scroll-spy.js에서 처리하므로 여기서는 제거
  // 클릭 이벤트는 scroll-spy.js에서도 처리되므로 중복 제거
}

// 즉시 스크롤 함수
function fastScrollTo(targetElement, duration) {
  // 모든 요소에서 smooth 스크롤 비활성화
  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.scrollBehavior = 'auto';
  
  // 모든 컨테이너에서도 비활성화
  const containers = document.querySelectorAll('.scrollspy-container, #app, *');
  containers.forEach(container => {
    container.style.scrollBehavior = 'auto';
  });
  
  const targetPosition = targetElement.offsetTop - 80; // offset 고려
  
  // 즉시 목표 위치로 이동
  window.scrollTo(0, targetPosition);
  
  // scroll-behavior 복원 (더 늦게)
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = '';
    document.body.style.scrollBehavior = '';
    containers.forEach(container => {
      container.style.scrollBehavior = '';
    });
  }, 100);
} 