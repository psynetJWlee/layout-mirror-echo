window.handicapOddsData = [
  {
    marketType: "국내",
    line: "-1.5",
    odds: [
      { win: { value: 2.30, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.80, change: "up" }, changedAt: "2/17 00:28", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.40, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.70, change: "up" }, changedAt: "초기", isInitial: false, afterKickoff: false, isLive: false },
      // ... 이하 동일 구조로 변환 필요
    ]
  },
  {
    marketType: "국내",
    line: "-2.5",
    odds: [
      { win: { value: 2.30, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.80, change: "up" }, changedAt: "2/17 00:28", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.40, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.70, change: "up" }, changedAt: "초기", isInitial: false, afterKickoff: false, isLive: false },
      // ... 이하 동일 구조로 변환 필요
    ]
  },
  {
    marketType: "해외",
    line: "-2.5",
    odds: [
      { win: { value: 2.30, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.80, change: "up" }, changedAt: "2/17 00:28", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.40, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.70, change: "up" }, changedAt: "초기", isInitial: false, afterKickoff: false, isLive: false },
      // ... 이하 동일 구조로 변환 필요
    ]
  },
  {
    marketType: "해외",
    line: "+1.5",
    odds: [
      { win: { value: 1.90, change: "up" }, draw: { value: null, change: null }, lose: { value: 1.95, change: "down" }, changedAt: "2/17 00:28", isInitial: false, afterKickoff: true, isLive: true },
      { win: { value: 1.85, change: null }, draw: { value: null, change: null }, lose: { value: 2.00, change: null }, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      // ... 이하 동일 구조로 변환 필요
    ]
  }
];

window.handicapStatsData = {
  line: "-2.5",
  matchCount: 27,
  odds: {
    win: 1.85,
    draw: null,
    lose: 2.10
  },
  stats: {
    winCount: 20,
    drawCount: 0,
    loseCount: 7
  },
  statsByLine: [
    { line: "-1", win: 67, draw: 5, lose: 28 },
    { line: "-2.5", win: 49, draw: 0, lose: 51 },
    { line: "-3.5", win: 60, draw: 0, lose: 40 }
  ]
}; 