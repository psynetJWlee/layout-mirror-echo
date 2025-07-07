// 국내 배당 데이터
const odds1x2Domestic = [
  { win: 2.30, draw: 3.75, lose: 2.80, changedAt: "2/17 00:28", isInitial: false, afterKickoff: false },
  { win: 2.40, draw: 3.75, lose: 2.70, changedAt: "2/16 23:02", isInitial: false, afterKickoff: false },
  { win: 2.45, draw: 3.75, lose: 2.62, changedAt: "초기", isInitial: true, afterKickoff: false }
];

// 해외 배당 데이터
const odds1x2Overseas = [
  { win: 1.22, draw: 4.50, lose: 34.00, changedAt: "03:10", isInitial: false, afterKickoff: true },
  { win: 1.44, draw: 4.00, lose: 7.50, changedAt: "02:33", isInitial: false, afterKickoff: true },
  { win: 1.57, draw: 4.00, lose: 5.50, changedAt: "2/18 01:55", isInitial: false, afterKickoff: true },
  { win: 2.15, draw: 3.80, lose: 3.10, changedAt: "20:09", isInitial: false, afterKickoff: false },
  { win: 2.20, draw: 3.80, lose: 3.00, changedAt: "18:18", isInitial: false, afterKickoff: false },
  { win: 2.25, draw: 3.80, lose: 2.90, changedAt: "17:43", isInitial: false, afterKickoff: false },
  { win: 2.20, draw: 3.80, lose: 3.00, changedAt: "17:09", isInitial: false, afterKickoff: false },
  { win: 2.20, draw: 3.75, lose: 3.00, changedAt: "16:34", isInitial: false, afterKickoff: false },
  { win: 2.25, draw: 3.75, lose: 2.90, changedAt: "16:20", isInitial: false, afterKickoff: false },
  { win: 2.35, draw: 3.70, lose: 2.80, changedAt: "15:52", isInitial: false, afterKickoff: false },
  { win: 2.30, draw: 3.70, lose: 2.80, changedAt: "14:52", isInitial: false, afterKickoff: false },
  { win: 2.25, draw: 3.75, lose: 2.87, changedAt: "14:17", isInitial: false, afterKickoff: false },
  { win: 2.20, draw: 3.75, lose: 2.87, changedAt: "10:19", isInitial: false, afterKickoff: false },
  { win: 2.15, draw: 3.75, lose: 2.87, changedAt: "02:28", isInitial: false, afterKickoff: false },
  { win: 2.20, draw: 3.75, lose: 2.87, changedAt: "01:16", isInitial: false, afterKickoff: false },
  { win: 2.25, draw: 3.75, lose: 2.87, changedAt: "00:28", isInitial: false, afterKickoff: false },
  { win: 2.30, draw: 3.75, lose: 2.80, changedAt: "2/17 00:28", isInitial: false, afterKickoff: false },
  { win: 2.40, draw: 3.75, lose: 2.70, changedAt: "2/16 23:02", isInitial: false, afterKickoff: false },
  { win: 2.45, draw: 3.75, lose: 2.62, changedAt: "초기", isInitial: true, afterKickoff: false }
];

// 통계 데이터(샘플)
const odds1x2Stats = {
  matchCount: 67,
  winCount: 61,
  drawCount: 5,
  loseCount: 1,
  odds: { win: 1.28, draw: 5.75, lose: 11.00 },
  statsByOdds: [
    { type: 'win', odds: 1.28, win: 67, draw: 21, lose: 12 },
    { type: 'draw', odds: 5.75, win: 52, draw: 27, lose: 21 },
    { type: 'lose', odds: 11.00, win: 98, draw: 1, lose: 1 }
  ]
}; 