// 날짜 내비게이션 관리 클래스
class DateNavigation {
  constructor() {
    this.currentDate = new Date();
    this.init();
  }

  // 초기화
  init() {
    this.bindEvents();
    this.updateDateDisplay();
  }

  // 이벤트 바인딩
  bindEvents() {
    // 이전 날짜 그룹 버튼
    const prevGroupBtn = document.querySelector('.list-date-prev-group');
    if (prevGroupBtn) {
      prevGroupBtn.addEventListener('click', () => {
        this.goToPreviousDay();
      });
    }

    // 다음 날짜 그룹 버튼
    const nextGroupBtn = document.querySelector('.list-date-next-group');
    if (nextGroupBtn) {
      nextGroupBtn.addEventListener('click', () => {
        this.goToNextDay();
      });
    }

    // 현재 날짜 버튼 (Today 기능)
    const currentBtn = document.querySelector('.list-date-current');
    if (currentBtn) {
      currentBtn.addEventListener('click', () => {
        this.goToToday();
      });
    }
  }

  // 이전 날짜로 이동
  goToPreviousDay() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.updateDateDisplay();
    this.notifyDateChange();
  }

  // 다음 날짜로 이동
  goToNextDay() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.updateDateDisplay();
    this.notifyDateChange();
  }

  // 오늘 날짜로 이동
  goToToday() {
    this.currentDate = new Date();
    this.updateDateDisplay();
    this.notifyDateChange();
  }

  // 날짜 표시 업데이트
  updateDateDisplay() {
    const prevDay = document.querySelector('.list-date-prev-day');
    const nextDay = document.querySelector('.list-date-next-day');
    const currentDay = document.querySelector('.list-date-current-text');

    if (prevDay) {
      const prevDate = new Date(this.currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      prevDay.textContent = this.formatDateForDisplay(prevDate);
    }

    if (nextDay) {
      const nextDate = new Date(this.currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      nextDay.textContent = this.formatDateForDisplay(nextDate);
    }

    if (currentDay) {
      // 현재 선택된 날짜 표시
      currentDay.textContent = this.formatDateForDisplay(this.currentDate);
    }
  }

  // 날짜를 표시용 형식으로 변환 (MM월 DD일)
  formatDateForDisplay(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  }

  // 날짜를 API용 형식으로 변환 (YYYYMMDD)
  formatDateForAPI(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  // 현재 선택된 날짜를 API 형식으로 반환
  getCurrentDateForAPI() {
    return this.formatDateForAPI(this.currentDate);
  }

  // 날짜 변경 알림 (MatchListData에 전달)
  notifyDateChange() {
    if (window.matchListData) {
      window.matchListData.setDateFilter(this.getCurrentDateForAPI());
    }
  }

  // 특정 날짜로 설정
  setDate(date) {
    this.currentDate = new Date(date);
    this.updateDateDisplay();
    this.notifyDateChange();
  }

  // 현재 날짜가 오늘인지 확인
  isToday() {
    const today = new Date();
    return this.currentDate.toDateString() === today.toDateString();
  }
}

// 전역 인스턴스 생성
window.dateNavigation = new DateNavigation(); 