// 언더오버 배당 통계 데이터
window.overUnderStatsData = {
  line: "2.5",
  matchCount: 27,
  odds: {
    over: 1.85,
    under: 2.10
  },
  stats: {
    overCount: 20,
    underCount: 7
  },
  statsByLine: [
    { line: "2.5", over: 20, under: 7 },
    { line: "3.5", over: 15, under: 12 },
    { line: "1.5", over: 25, under: 2 }
  ]
};

// 언더오버 배당 흐름 데이터 (핸디캡 구조와 완전히 동일하게)
window.overUnderOddsFlowData = [
  {
    marketType: "국내",
    line: "1.5",
    odds: [
      { under: 1.95, draw: null, over: 1.90, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      { under: 1.97, draw: null, over: 1.88, changedAt: "12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.00, draw: null, over: 1.85, changedAt: "13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.03, draw: null, over: 1.82, changedAt: "14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.05, draw: null, over: 1.80, changedAt: "15:00", isInitial: false, afterKickoff: false, isLive: true }
    ]
  },
  {
    marketType: "국내",
    line: "2.5",
    odds: [
      { under: 1.98, draw: null, over: 1.92, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      { under: 2.00, draw: null, over: 1.90, changedAt: "12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.03, draw: null, over: 1.87, changedAt: "13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.07, draw: null, over: 1.83, changedAt: "14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.10, draw: null, over: 1.80, changedAt: "15:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.12, draw: null, over: 1.78, changedAt: "16:00", isInitial: false, afterKickoff: false, isLive: false }
    ]
  },
  {
    marketType: "국내",
    line: "3.5",
    odds: [
      { under: 2.20, draw: null, over: 1.70, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      { under: 2.22, draw: null, over: 1.68, changedAt: "12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.25, draw: null, over: 1.65, changedAt: "13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.28, draw: null, over: 1.62, changedAt: "14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.30, draw: null, over: 1.60, changedAt: "15:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.33, draw: null, over: 1.57, changedAt: "16:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.35, draw: null, over: 1.55, changedAt: "17:00", isInitial: false, afterKickoff: false, isLive: true }
    ]
  },
  {
    marketType: "해외",
    line: "1.5",
    odds: [
      { under: 1.97, draw: null, over: 1.88, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      { under: 2.00, draw: null, over: 1.85, changedAt: "12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.03, draw: null, over: 1.82, changedAt: "13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.06, draw: null, over: 1.79, changedAt: "14:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.08, draw: null, over: 1.77, changedAt: "15:00", isInitial: false, afterKickoff: false, isLive: true }
    ]
  },
  {
    marketType: "해외",
    line: "2.5",
    odds: [
      { under: 2.00, draw: null, over: 1.85, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      { under: 2.03, draw: null, over: 1.82, changedAt: "12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.06, draw: null, over: 1.79, changedAt: "13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.09, draw: null, over: 1.76, changedAt: "14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.12, draw: null, over: 1.73, changedAt: "15:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.15, draw: null, over: 1.70, changedAt: "16:00", isInitial: false, afterKickoff: false, isLive: true }
    ]
  },
  {
    marketType: "해외",
    line: "3.5",
    odds: [
      { under: 2.18, draw: null, over: 1.72, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      { under: 2.21, draw: null, over: 1.69, changedAt: "12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.24, draw: null, over: 1.66, changedAt: "13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.27, draw: null, over: 1.63, changedAt: "14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.31, draw: null, over: 1.59, changedAt: "15:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.34, draw: null, over: 1.56, changedAt: "16:00", isInitial: false, afterKickoff: false, isLive: true }
    ]
  }
]; 