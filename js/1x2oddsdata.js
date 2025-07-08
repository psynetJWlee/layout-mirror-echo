const odds1x2Stats = {
  matchCount: 10,
  winCount: 3,
  drawCount: 4,
  loseCount: 3,
  odds: { win: 1.22, draw: 4.50, lose: 6.00 },
  statsByOdds: [
    { type: 'win', odds: 1.22, win: 3, draw: 1, lose: 0 },
    { type: 'draw', odds: 4.50, win: 0, draw: 2, lose: 1 },
    { type: 'lose', odds: 6.00, win: 0, draw: 1, lose: 2 }
  ]
};

window.odds1x2Data = [
  {
    marketType: '국내',
    line: null,
    odds: [
      { win: { value: 2.30, change: null }, draw: { value: 3.75, change: null }, lose: { value: 2.80, change: null }, changedAt: "2/17 00:28", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.40, change: "up" }, draw: { value: 3.75, change: null }, lose: { value: 2.70, change: "down" }, changedAt: "2/16 23:02", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.45, change: null }, draw: { value: 3.75, change: null }, lose: { value: 2.62, change: null }, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false },
      // ... 이하 동일 구조로 변환 필요
    ]
  },
  {
    marketType: '해외',
    line: null,
    odds: [
      { win: { value: 1.22, change: null }, draw: { value: 4.50, change: null }, lose: { value: 6.00, change: null }, changedAt: "2/18 03:10", isInitial: false, afterKickoff: true, isLive: true },
      { win: { value: 1.44, change: "down" }, draw: { value: 4.00, change: null }, lose: { value: 7.50, change: "up" }, changedAt: "2/18 02:33", isInitial: false, afterKickoff: true, isLive: true },
      { win: { value: 1.57, change: null }, draw: { value: 4.00, change: null }, lose: { value: 5.50, change: null }, changedAt: "2/18 01:55", isInitial: false, afterKickoff: true, isLive: false },
      { win: { value: 1.65, change: "up" }, draw: { value: 3.90, change: null }, lose: { value: 5.20, change: "down" }, changedAt: "2/18 01:20", isInitial: false, afterKickoff: true, isLive: false },
      { win: { value: 1.70, change: null }, draw: { value: 3.85, change: null }, lose: { value: 5.00, change: null }, changedAt: "2/18 00:55", isInitial: false, afterKickoff: true, isLive: false },
      { win: { value: 1.80, change: "up" }, draw: { value: 3.80, change: null }, lose: { value: 4.80, change: "down" }, changedAt: "2/18 00:30", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 1.90, change: null }, draw: { value: 3.75, change: null }, lose: { value: 4.60, change: null }, changedAt: "2/18 00:10", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.00, change: "down" }, draw: { value: 3.70, change: null }, lose: { value: 4.40, change: "up" }, changedAt: "2/17 23:50", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.10, change: null }, draw: { value: 3.65, change: null }, lose: { value: 4.20, change: null }, changedAt: "2/17 23:30", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.20, change: "up" }, draw: { value: 3.60, change: null }, lose: { value: 4.00, change: "down" }, changedAt: "2/17 23:10", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.30, change: null }, draw: { value: 3.55, change: null }, lose: { value: 3.80, change: null }, changedAt: "2/17 22:50", isInitial: false, afterKickoff: false, isLive: false },
      { win: { value: 2.40, change: null }, draw: { value: 3.50, change: null }, lose: { value: 3.60, change: null }, changedAt: "초기", isInitial: true, afterKickoff: false, isLive: false }
    ]
  }
];

window.odds1x2Stats = odds1x2Stats; 