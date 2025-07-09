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
      { under: 1.97, change: "down", draw: null, over: 1.88, overChange: "up", changedAt: "02/17 12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.00, change: "up", draw: null, over: 1.85, overChange: "down", changedAt: "02/17 13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.03, change: "down", draw: null, over: 1.82, overChange: "up", changedAt: "02/17 14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.05, change: "up", draw: null, over: 1.80, overChange: "down", changedAt: "02/17 15:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 1.95, change: "up", draw: null, over: 1.90, overChange: "down", changedAt: "02/17 00:00", isInitial: true, afterKickoff: false, isLive: false }
    ]
  },
  {
    marketType: "국내",
    line: "2.5",
    odds: [
      { under: 2.00, change: "up", draw: null, over: 1.90, overChange: "down", changedAt: "02/17 13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.03, change: "down", draw: null, over: 1.87, overChange: "up", changedAt: "02/17 14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.07, change: "up", draw: null, over: 1.83, overChange: "down", changedAt: "02/17 15:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.12, change: "up", draw: null, over: 1.78, overChange: "down", changedAt: "02/17 16:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 1.98, change: "down", draw: null, over: 1.92, overChange: "up", changedAt: "02/17 00:00", isInitial: true, afterKickoff: false, isLive: false }
    ]
  },
  {
    marketType: "국내",
    line: "3.5",
    odds: [
      { under: 2.22, change: "up", draw: null, over: 1.68, overChange: "down", changedAt: "02/17 12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.25, change: "down", draw: null, over: 1.65, overChange: "up", changedAt: "02/17 13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.28, change: "up", draw: null, over: 1.62, overChange: "down", changedAt: "02/17 14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.35, change: "down", draw: null, over: 1.55, overChange: "up", changedAt: "02/17 17:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.20, change: "down", draw: null, over: 1.70, overChange: "up", changedAt: "02/17 00:00", isInitial: true, afterKickoff: false, isLive: false }
    ]
  },
  {
    marketType: "해외",
    line: "1.5",
    odds: [
      { under: 2.00, change: "down", draw: null, over: 1.85, overChange: "up", changedAt: "02/17 13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.03, change: "up", draw: null, over: 1.82, overChange: "down", changedAt: "02/17 14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.06, change: "down", draw: null, over: 1.79, overChange: "up", changedAt: "02/17 15:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.08, change: "up", draw: null, over: 1.77, overChange: "down", changedAt: "02/17 16:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 1.97, change: "up", draw: null, over: 1.88, overChange: "down", changedAt: "02/17 00:00", isInitial: true, afterKickoff: false, isLive: false }
    ]
  },
  {
    marketType: "해외",
    line: "2.5",
    odds: [
      { under: 2.03, change: "up", draw: null, over: 1.82, overChange: "down", changedAt: "02/17 14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.06, change: "down", draw: null, over: 1.79, overChange: "up", changedAt: "02/17 15:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.09, change: "up", draw: null, over: 1.76, overChange: "down", changedAt: "02/17 16:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.15, change: "up", draw: null, over: 1.70, overChange: "down", changedAt: "02/17 17:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.00, change: "down", draw: null, over: 1.85, overChange: "up", changedAt: "02/17 00:00", isInitial: true, afterKickoff: false, isLive: false }
    ]
  },
  {
    marketType: "해외",
    line: "3.5",
    odds: [
      { under: 2.21, change: "down", draw: null, over: 1.69, overChange: "up", changedAt: "02/17 12:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.24, change: "up", draw: null, over: 1.66, overChange: "down", changedAt: "02/17 13:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.27, change: "down", draw: null, over: 1.63, overChange: "up", changedAt: "02/17 14:00", isInitial: false, afterKickoff: false, isLive: false },
      { under: 2.34, change: "down", draw: null, over: 1.56, overChange: "up", changedAt: "02/17 16:00", isInitial: false, afterKickoff: false, isLive: true },
      { under: 2.18, change: "up", draw: null, over: 1.72, overChange: "down", changedAt: "02/17 00:00", isInitial: true, afterKickoff: false, isLive: false }
    ]
  }
];

window.overUnderOddsFlowData = window.overUnderOddsFlowData.map(item => ({
  ...item,
  odds: [
    ...item.odds.filter(o => !o.isInitial),
    ...item.odds.filter(o => o.isInitial)
  ]
})); 