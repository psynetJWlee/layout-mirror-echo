// 스크롤 스파이 기능 구현
function initScrollSpy() {
  const sections = ['section-1x2', 'section-handicap', 'section-overunder'];
  const navLinks = $('#market-nav .nav-link');
  const navHeight = $('#market-nav').outerHeight() || 60;
  
  function updateActiveNav() {
    let currentSection = '';
    const scrollTop = $(window).scrollTop() + navHeight + 50; // 네비게이션 높이 + 여유분
    
    // 현재 보이는 섹션 찾기
    sections.forEach(sectionId => {
      const section = $('#' + sectionId);
      if (section.length) {
        const sectionTop = section.offset().top;
        const sectionBottom = sectionTop + section.outerHeight();
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          currentSection = sectionId;
        }
      }
    });
    
    // active 클래스 업데이트
    navLinks.removeClass('active');
    if (currentSection) {
      const activeLink = navLinks.filter(`[href="#${currentSection}"]`);
      activeLink.addClass('active');
    }
  }
  
  // 부드러운 스크롤 기능
  $('#market-nav .nav-link').on('click', function(e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const targetSection = $(targetId);
    
    if (targetSection.length) {
      const scrollTo = targetSection.offset().top - navHeight - 20;
      $('html, body').animate({
        scrollTop: scrollTo
      }, 500);
    }
  });
  
  // 스크롤 이벤트 리스너
  $(window).on('scroll', updateActiveNav);
  
  // 초기 실행
  updateActiveNav();
}

// DOM 준비되면 초기화
$(document).ready(function() {
  initScrollSpy();
});