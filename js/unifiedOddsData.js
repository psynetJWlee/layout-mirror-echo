// unifiedOddsData.js
// 승무패, 핸디캡, 언더오버 배당 데이터 통합 모듈

;(function(window) {
  
  // --- 1뎁스: 배당타입별 통합 데이터 (컬럼명 명시) ---
  window.unifiedOddsData = [
    
    // 1x2 (승무패) - 국내
    {
      oddstype: '1x2',
      markettype: '국내',
      line: null,
      odds: [
      { win: { value: 2.30, change: null }, draw: { value: 3.75, change: null }, lose: { value: 2.80, change: null }, changedAt: "2/17 00:28", isInitial: false, isLive: false },
      { win: { value: 2.40, change: "up" }, draw: { value: 3.75, change: null }, lose: { value: 2.70, change: "down" }, changedAt: "2/16 23:02", isInitial: false, isLive: false },
      { win: { value: 2.45, change: null }, draw: { value: 3.75, change: null }, lose: { value: 2.62, change: null }, changedAt: "초기", isInitial: true, isLive: false }
      ]
    },
    
    // 1x2 (승무패) - 해외
    {
      oddstype: '1x2',
      markettype: '해외',
      line: null,
      odds: [
        { win: { value: 1.22, change: null }, draw: { value: 4.50, change: null }, lose: { value: 6.00, change: null }, changedAt: "2/18 03:10", isInitial: false, isLive: true },
        { win: { value: 1.44, change: "down" }, draw: { value: 4.00, change: null }, lose: { value: 7.50, change: "up" }, changedAt: "2/18 02:33", isInitial: false, isLive: true },
        { win: { value: 1.57, change: null }, draw: { value: 4.00, change: null }, lose: { value: 5.50, change: null }, changedAt: "2/18 01:55", isInitial: false, isLive: false },
        { win: { value: 1.65, change: "up" }, draw: { value: 3.90, change: null }, lose: { value: 5.20, change: "down" }, changedAt: "2/18 01:20", isInitial: false, isLive: false },
        { win: { value: 1.70, change: null }, draw: { value: 3.85, change: null }, lose: { value: 5.00, change: null }, changedAt: "2/18 00:55", isInitial: false, isLive: false },
        { win: { value: 1.80, change: "up" }, draw: { value: 3.80, change: null }, lose: { value: 4.80, change: "down" }, changedAt: "2/18 00:30", isInitial: false, isLive: false },
        { win: { value: 1.90, change: null }, draw: { value: 3.75, change: null }, lose: { value: 4.60, change: null }, changedAt: "2/18 00:10", isInitial: false, isLive: false },
        { win: { value: 2.00, change: "down" }, draw: { value: 3.70, change: null }, lose: { value: 4.40, change: "up" }, changedAt: "2/17 23:50", isInitial: false, isLive: false },
        { win: { value: 2.10, change: null }, draw: { value: 3.65, change: null }, lose: { value: 4.20, change: null }, changedAt: "2/17 23:30", isInitial: false, isLive: false },
        { win: { value: 2.20, change: "up" }, draw: { value: 3.60, change: null }, lose: { value: 4.00, change: "down" }, changedAt: "2/17 23:10", isInitial: false, isLive: false },
        { win: { value: 2.30, change: null }, draw: { value: 3.55, change: null }, lose: { value: 3.80, change: null }, changedAt: "2/17 22:50", isInitial: false, isLive: false },
        { win: { value: 2.40, change: null }, draw: { value: 3.50, change: null }, lose: { value: 3.60, change: null }, changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 핸디캡 - 국내 -1.5
    {
      oddstype: 'handi',
      markettype: '국내',
      line: '-1.5',
      odds: [
        { win: { value: 2.35, change: "up" }, draw: { value: null, change: null }, lose: { value: 2.75, change: "down" }, changedAt: "02/17 15:00", isInitial: false, isLive: true },
        { win: { value: 2.32, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.78, change: "up" }, changedAt: "02/17 14:00", isInitial: false, isLive: false },
        { win: { value: 2.38, change: "up" }, draw: { value: null, change: null }, lose: { value: 2.72, change: "down" }, changedAt: "02/17 13:00", isInitial: false, isLive: false },
        { win: { value: 2.40, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.70, change: "up" }, changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { win: { value: 2.30, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.80, change: "up" }, changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 핸디캡 - 국내 -2.5
    {
      oddstype: 'handi',
      markettype: '국내',
      line: '-2.5',
      odds: [
        { win: { value: 2.33, change: "up" }, draw: { value: null, change: null }, lose: { value: 2.77, change: "down" }, changedAt: "02/17 15:00", isInitial: false, isLive: true },
        { win: { value: 2.36, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.74, change: "up" }, changedAt: "02/17 14:00", isInitial: false, isLive: false },
        { win: { value: 2.39, change: "up" }, draw: { value: null, change: null }, lose: { value: 2.71, change: "down" }, changedAt: "02/17 13:00", isInitial: false, isLive: false },
        { win: { value: 2.40, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.70, change: "up" }, changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { win: { value: 2.30, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.80, change: "up" }, changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 핸디캡 - 해외 -2.5
    {
      oddstype: 'handi',
      markettype: '해외',
      line: '-2.5',
      odds: [
        { win: { value: 2.32, change: "up" }, draw: { value: null, change: null }, lose: { value: 2.78, change: "down" }, changedAt: "02/17 14:00", isInitial: false, isLive: false },
        { win: { value: 2.35, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.75, change: "up" }, changedAt: "02/17 13:00", isInitial: false, isLive: false },
        { win: { value: 2.38, change: "up" }, draw: { value: null, change: null }, lose: { value: 2.72, change: "down" }, changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { win: { value: 2.40, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.70, change: "up" }, changedAt: "02/17 11:00", isInitial: false, isLive: false },
        { win: { value: 2.30, change: "down" }, draw: { value: null, change: null }, lose: { value: 2.80, change: "up" }, changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 핸디캡 - 해외 +1.5
    {
      oddstype: 'handi',
      markettype: '해외',
      line: '+1.5',
      odds: [
        { win: { value: 1.88, change: "up" }, draw: { value: null, change: null }, lose: { value: 1.98, change: "down" }, changedAt: "02/17 13:00", isInitial: false, isLive: false },
        { win: { value: 1.92, change: "down" }, draw: { value: null, change: null }, lose: { value: 1.93, change: "up" }, changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { win: { value: 1.95, change: "up" }, draw: { value: null, change: null }, lose: { value: 1.90, change: "down" }, changedAt: "02/17 11:00", isInitial: false, isLive: false },
        { win: { value: 1.85, change: null }, draw: { value: null, change: null }, lose: { value: 2.00, change: null }, changedAt: "02/17 10:00", isInitial: false, isLive: false },
        { win: { value: 1.90, change: "up" }, draw: { value: null, change: null }, lose: { value: 1.95, change: "down" }, changedAt: "초기", isInitial: true, isLive: true }
      ]
    },

    // 언더오버 - 국내 1.5
    {
      oddstype: 'overUnder',
      markettype: '국내',
      line: '1.5',
      odds: [
        { under: 1.97, change: "down", draw: null, over: 1.88, overChange: "up", changedAt: "02/17 14:00", isInitial: false, isLive: true },
        { under: 2.00, change: "up", draw: null, over: 1.85, overChange: "down", changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { under: 2.03, change: "down", draw: null, over: 1.82, overChange: "up", changedAt: "02/17 11:00", isInitial: false, isLive: false },
        { under: 2.05, change: "up", draw: null, over: 1.80, overChange: "down", changedAt: "02/17 10:00", isInitial: false, isLive: false },
        { under: 1.95, change: "up", draw: null, over: 1.90, overChange: "down", changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 언더오버 - 국내 2.5
    {
      oddstype: 'overUnder',
      markettype: '국내',
      line: '2.5',
      odds: [
        { under: 2.00, change: "up", draw: null, over: 1.90, overChange: "down", changedAt: "02/17 13:00", isInitial: false, isLive: false },
        { under: 2.03, change: "down", draw: null, over: 1.87, overChange: "up", changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { under: 2.07, change: "up", draw: null, over: 1.83, overChange: "down", changedAt: "02/17 10:00", isInitial: false, isLive: false },
        { under: 2.12, change: "up", draw: null, over: 1.78, overChange: "down", changedAt: "02/17 06:00", isInitial: false, isLive: false },
        { under: 1.98, change: "down", draw: null, over: 1.92, overChange: "up", changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 언더오버 - 국내 3.5
    {
      oddstype: 'overUnder',
      markettype: '국내',
      line: '3.5',
      odds: [
        { under: 2.22, change: "up", draw: null, over: 1.68, overChange: "down", changedAt: "02/17 15:00", isInitial: false, isLive: false },
        { under: 2.25, change: "down", draw: null, over: 1.65, overChange: "up", changedAt: "02/17 14:00", isInitial: false, isLive: false },
        { under: 2.28, change: "up", draw: null, over: 1.62, overChange: "down", changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { under: 2.35, change: "down", draw: null, over: 1.55, overChange: "up", changedAt: "02/17 10:00", isInitial: false, isLive: false },
        { under: 2.20, change: "down", draw: null, over: 1.70, overChange: "up", changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 언더오버 - 해외 1.5
    {
      oddstype: 'overUnder',
      markettype: '해외',
      line: '1.5',
      odds: [
        { under: 2.00, change: "down", draw: null, over: 1.85, overChange: "up", changedAt: "02/17 19:00", isInitial: false, isLive: true },
        { under: 2.03, change: "up", draw: null, over: 1.82, overChange: "down", changedAt: "02/17 17:00", isInitial: false, isLive: true },
        { under: 2.06, change: "down", draw: null, over: 1.79, overChange: "up", changedAt: "02/17 16:00", isInitial: false, isLive: false },
        { under: 2.08, change: "up", draw: null, over: 1.77, overChange: "down", changedAt: "02/17 13:00", isInitial: false, isLive: false },
        { under: 1.97, change: "up", draw: null, over: 1.88, overChange: "down", changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 언더오버 - 해외 2.5
    {
      oddstype: 'overUnder',
      markettype: '해외',
      line: '2.5',
      odds: [
        { under: 2.03, change: "up", draw: null, over: 1.82, overChange: "down", changedAt: "02/17 14:00", isInitial: false, isLive: false },
        { under: 2.06, change: "down", draw: null, over: 1.79, overChange: "up", changedAt: "02/17 13:00", isInitial: false, isLive: false },
        { under: 2.09, change: "up", draw: null, over: 1.76, overChange: "down", changedAt: "02/17 12:00", isInitial: false, isLive: false },
        { under: 2.15, change: "up", draw: null, over: 1.70, overChange: "down", changedAt: "02/17 11:00", isInitial: false, isLive: false },
        { under: 2.00, change: "down", draw: null, over: 1.85, overChange: "up", changedAt: "초기", isInitial: true, isLive: false }
      ]
    },

    // 언더오버 - 해외 3.5
    {
      oddstype: 'overUnder',
      markettype: '해외',
      line: '3.5',
      odds: [
        { under: 2.21, change: "down", draw: null, over: 1.69, overChange: "up", changedAt: "02/17 22:00", isInitial: false, isLive: false },
        { under: 2.24, change: "up", draw: null, over: 1.66, overChange: "down", changedAt: "02/17 19:00", isInitial: false, isLive: false },
        { under: 2.27, change: "down", draw: null, over: 1.63, overChange: "up", changedAt: "02/17 17:00", isInitial: false, isLive: false },
        { under: 2.34, change: "down", draw: null, over: 1.56, overChange: "up", changedAt: "02/17 14:00", isInitial: false, isLive: false },
        { under: 2.18, change: "up", draw: null, over: 1.72, overChange: "down", changedAt: "초기", isInitial: true, isLive: false }
      ]
    }
  ];

  // --- 통계 데이터도 통합 (흐름 데이터와 동일한 규격) ---
  window.unifiedOddsStats = [
    
    // 1x2 (승무패) 통계
    {
      oddstype: '1x2',
      markettype: '통계',
      line: null,
      stats: {
        // 전체 요약 통계
        matchCount: 67,
        winCount: 61,
        drawCount: 5,
        loseCount: 1,
        odds: { win: 1.28, draw: 5.75, lose: 11.00 },
        
        // 배당별 상세 통계 (이미지 기반)
        statsByOdds: [
          {
            type: 'win',
            odds: 1.28,
            win: 67,
            draw: 21,
            lose: 12,
            total: 100
          },
          {
            type: 'draw', 
            odds: 5.75,
            win: 52,
            draw: 27,
            lose: 21,
            total: 100
          },
          {
            type: 'lose',
            odds: 11.00,
            win: 98,
            draw: 1,
            lose: 1,
            total: 100
          }
        ],
        
        // 도넛 차트 데이터
        donutData: {
          win: 61,
          draw: 5,
          lose: 1,
          total: 67
        },
        
        // 배당별 통계 제목
        title: "승무패 배당 일치 : 67경기",
        
        // 총평 데이터
        summary: "동일 종목에서 1.79 배당은 62.3%의 승리 확률을 보이나 NPB 리그에서는 51%로 주의를 요합니다."
      }
    },
    
         // 핸디캡 통계
     {
       oddstype: 'handi',
       markettype: '통계',
       line: -2.5,
       stats: {
         // 전체 요약 통계
         matchCount: 27,
         line: -1.5,
         winCount: 65,
         drawCount: 0,
         loseCount: 35,
         odds: { win: 1.85, draw: null, lose: 2.10 },
        
        // 라인별 상세 통계
        statsByLine: [
          { line: "-1.5", win: 67, draw: 0, lose: 33, total: 100 },
          { line: "-2.5", win: 49, draw: 0, lose: 51, total: 100 },
          { line: "+1.5", win: 78, draw: 0, lose: 22, total: 100 }
        ],
        
        // 도넛 차트 데이터
        donutData: {
          win: 65,
          draw: 0,
          lose: 35,
          total: 100
        },
        
        // 통계 제목
        title: "핸디캡 (-1.5) 기준 통계 : 27경기",
        
        // 총평 데이터
        summary: "동일 종목에서 홈 기준 +1.5 핸디캡은 52.3%의 승리 확률을 보입니다. 그러나 NPB 리그에서는 61%로 상대적으로 높습니다."
      }
    },
    
         // 언더오버 통계
     {
       oddstype: 'overUnder',
       markettype: '통계',
       line: 2.5,
       stats: {
         // 전체 요약 통계
         matchCount: 27,
         line: 1.5,
         overCount: 60,
         underCount: 40,
         odds: { over: 1.85, under: 2.10 },
        
        // 라인별 상세 통계
        statsByLine: [
          { line: "1.5", over: 70, under: 30, total: 100 },
          { line: "2.5", over: 45, under: 55, total: 100 },
          { line: "3.5", over: 85, under: 15, total: 100 }
        ],
        
        // 도넛 차트 데이터
        donutData: {
          over: 60,
          under: 40,
          total: 100
        },
        
        // 통계 제목
        title: "언더오버 (1.5) 기준 통계 : 27경기",
        
        // 총평 데이터
        summary: "동일 종목에서 기준점 +5.5일때는 72.3%의 확률로 언더인 경우가 높습니다. 단, NPB리그에서는 49.7%의 확률로 언더가 발생하고 종목 대비 22.6%의 차이를 보이기에 주의를 요합니다."
      }
    }
  ];

  // 꺾은선형 그래프 렌더링 함수들
  window.OddsTrendChart = {
    
    // 그래프 그리기
    drawChart: function(canvasId, oddsData, oddstype) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // 데이터가 4개 미만이면 그래프를 그리지 않음
      if (oddsData.length < 4) return;
      
      // 데이터 정렬 (과거 -> 최신, 왼쪽 -> 오른쪽)
      const sortedData = [...oddsData];
      
      // Y축 범위 계산 (안전한 값만 사용)
      const allValues = [];
      sortedData.forEach(odd => {
        if (oddstype === '1x2') {
          if (odd.win && odd.win.value && this.isValidNumber(odd.win.value)) allValues.push(odd.win.value);
          if (odd.draw && odd.draw.value && this.isValidNumber(odd.draw.value)) allValues.push(odd.draw.value);
          if (odd.lose && odd.lose.value && this.isValidNumber(odd.lose.value)) allValues.push(odd.lose.value);
        } else if (oddstype === 'handi') {
          if (odd.win && odd.win.value && this.isValidNumber(odd.win.value)) allValues.push(odd.win.value);
          if (odd.lose && odd.lose.value && this.isValidNumber(odd.lose.value)) allValues.push(odd.lose.value);
        } else if (oddstype === 'overUnder') {
          if (odd.over && this.isValidNumber(odd.over)) allValues.push(odd.over);
          if (odd.under && this.isValidNumber(odd.under)) allValues.push(odd.under);
        }
      });
      
      // 유효한 값이 없으면 그래프를 그리지 않음
      if (allValues.length === 0) return;
      
      const minValue = Math.min(...allValues);
      const maxValue = Math.max(...allValues);
      const valueRange = maxValue - minValue;
      
      // 값 범위가 너무 작거나 같으면 기본값 설정
      if (valueRange <= 0.01) {
        const avgValue = (minValue + maxValue) / 2;
        const adjustedRange = Math.max(avgValue * 0.1, 0.1);
        const adjustedMin = avgValue - adjustedRange;
        const adjustedMax = avgValue + adjustedRange;
        this.drawChartWithRange(ctx, width, height, sortedData, oddstype, adjustedMin, adjustedMax);
      } else {
        this.drawChartWithRange(ctx, width, height, sortedData, oddstype, minValue, maxValue);
      }
    },
    
    // 유효한 숫자인지 확인
    isValidNumber: function(value) {
      return typeof value === 'number' && !isNaN(value) && isFinite(value) && value > 0;
    },
    
    // 범위를 지정하여 차트 그리기
    drawChartWithRange: function(ctx, width, height, sortedData, oddstype, minValue, maxValue) {
      // 여백 설정
      const margin = { top: 20, right: 100, bottom: 20, left: 40 };
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;
      
      // 그리드 그리기
      this.drawGrid(ctx, margin, chartWidth, chartHeight, minValue, maxValue);
      
      // Y축 레이블 그리기
      this.drawYAxisLabels(ctx, margin, chartHeight, minValue, maxValue);
      
      // 꺾은선 그리기
      if (oddstype === '1x2') {
        this.drawLine(ctx, margin, chartWidth, chartHeight, sortedData, 'win', '#BB2828', minValue, maxValue);
        this.drawLine(ctx, margin, chartWidth, chartHeight, sortedData, 'draw', '#86869A', minValue, maxValue);
        this.drawLine(ctx, margin, chartWidth, chartHeight, sortedData, 'lose', '#1E3384', minValue, maxValue);
        
        // 최신 값과 레이블 표시
        this.drawLatestLabels(ctx, margin, chartWidth, chartHeight, sortedData[0], minValue, maxValue);
      } else if (oddstype === 'handi') {
        this.drawLine(ctx, margin, chartWidth, chartHeight, sortedData, 'win', '#BB2828', minValue, maxValue);
        this.drawLine(ctx, margin, chartWidth, chartHeight, sortedData, 'lose', '#1E3384', minValue, maxValue);
        
        // 최신 값과 레이블 표시
        this.drawHandicapLabels(ctx, margin, chartWidth, chartHeight, sortedData[0], minValue, maxValue);
      } else if (oddstype === 'overUnder') {
        this.drawLine(ctx, margin, chartWidth, chartHeight, sortedData, 'over', '#BB2828', minValue, maxValue);
        this.drawLine(ctx, margin, chartWidth, chartHeight, sortedData, 'under', '#1E3384', minValue, maxValue);
        
        // 최신 값과 레이블 표시
        this.drawOverUnderLabels(ctx, margin, chartWidth, chartHeight, sortedData[0], minValue, maxValue);
      }
    },
    
    // 그리드 그리기
    drawGrid: function(ctx, margin, chartWidth, chartHeight, minValue, maxValue) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      
      // 수평 그리드 라인 (5개)
      for (let i = 0; i <= 4; i++) {
        const y = margin.top + (chartHeight * i / 4);
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + chartWidth, y);
        ctx.stroke();
      }
    },
    
    // Y축 레이블 그리기
    drawYAxisLabels: function(ctx, margin, chartHeight, minValue, maxValue) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'right';
      
      // 3개 값 표시 (상단, 중간, 하단)
      const values = [
        maxValue,
        (minValue + maxValue) / 2,
        minValue
      ];
      
      values.forEach((value, index) => {
        const y = margin.top + (chartHeight * index / 2);
        const color = index === 0 ? '#1E3384' : index === 1 ? '#86869A' : '#BB2828';
        ctx.fillStyle = color;
        ctx.fillText(value.toFixed(2), margin.left - 10, y + 4);
      });
    },
    
    // 꺾은선 그리기
    drawLine: function(ctx, margin, chartWidth, chartHeight, data, type, color, minValue, maxValue) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      let validPoints = [];
      
      data.forEach((odd, index) => {
        let value = null;
        if (type === 'win' && odd.win) value = odd.win.value;
        else if (type === 'draw' && odd.draw) value = odd.draw.value;
        else if (type === 'lose' && odd.lose) value = odd.lose.value;
        else if (type === 'over' && odd.over) value = odd.over;
        else if (type === 'under' && odd.under) value = odd.under;
        
        if (value !== null && this.isValidNumber(value)) {
          const x = margin.left + (chartWidth * index / (data.length - 1));
          const y = margin.top + chartHeight - ((value - minValue) / (maxValue - minValue) * chartHeight);
          validPoints.push({ x, y });
        }
      });
      
      // 유효한 포인트가 2개 이상일 때만 선 그리기
      if (validPoints.length >= 2) {
        validPoints.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
    },
    
    // 화살표 그리기
    drawArrow: function(ctx, x, y, direction, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      
      const arrowSize = 6;
      
      if (direction === 'up') {
        ctx.moveTo(x, y - arrowSize);
        ctx.lineTo(x - arrowSize, y);
        ctx.lineTo(x + arrowSize, y);
      } else if (direction === 'down') {
        ctx.moveTo(x, y + arrowSize);
        ctx.lineTo(x - arrowSize, y);
        ctx.lineTo(x + arrowSize, y);
      } else { // right
        ctx.moveTo(x + arrowSize, y);
        ctx.lineTo(x, y - arrowSize);
        ctx.lineTo(x, y + arrowSize);
      }
      
      ctx.closePath();
      ctx.fill();
    },
    
    // 1x2 최신 레이블 그리기
    drawLatestLabels: function(ctx, margin, chartWidth, chartHeight, latestOdd, minValue, maxValue) {
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'left';
      
      const labels = [
        { type: 'lose', color: '#1E3384', value: latestOdd.lose?.value },
        { type: 'draw', color: '#86869A', value: latestOdd.draw?.value },
        { type: 'win', color: '#BB2828', value: latestOdd.win?.value }
      ];
      
      labels.forEach((label, index) => {
        if (label.value !== null && this.isValidNumber(label.value)) {
          const y = margin.top + (chartHeight * index / 2);
          ctx.fillStyle = label.color;
          
          let text = '';
          if (label.type === 'win') text = '승 ' + label.value.toFixed(2);
          else if (label.type === 'draw') text = '무 ' + label.value.toFixed(2);
          else if (label.type === 'lose') text = '패 ' + label.value.toFixed(2);
          
          ctx.fillText(text, margin.left + chartWidth + 15, y + 4);
        }
      });
    },
    
    // 핸디캡 최신 레이블 그리기
    drawHandicapLabels: function(ctx, margin, chartWidth, chartHeight, latestOdd, minValue, maxValue) {
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'left';
      
      const labels = [
        { type: 'lose', color: '#1E3384', value: latestOdd.lose?.value },
        { type: 'win', color: '#BB2828', value: latestOdd.win?.value }
      ];
      
      labels.forEach((label, index) => {
        if (label.value !== null && this.isValidNumber(label.value)) {
          const y = margin.top + (chartHeight * index);
          ctx.fillStyle = label.color;
          
          let text = '';
          if (label.type === 'win') text = '승 ' + label.value.toFixed(2);
          else if (label.type === 'lose') text = '패 ' + label.value.toFixed(2);
          
          ctx.fillText(text, margin.left + chartWidth + 15, y + 4);
        }
      });
    },
    
    // 언더오버 최신 레이블 그리기
    drawOverUnderLabels: function(ctx, margin, chartWidth, chartHeight, latestOdd, minValue, maxValue) {
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'left';
      
      const labels = [
        { type: 'under', color: '#1E3384', value: latestOdd.under },
        { type: 'over', color: '#BB2828', value: latestOdd.over }
      ];
      
      labels.forEach((label, index) => {
        if (label.value !== null && this.isValidNumber(label.value)) {
          const y = margin.top + (chartHeight * index);
          ctx.fillStyle = label.color;
          
          let text = '';
          if (label.type === 'over') text = '오버 ' + label.value.toFixed(2);
          else if (label.type === 'under') text = '언더 ' + label.value.toFixed(2);
          
          ctx.fillText(text, margin.left + chartWidth + 15, y + 4);
        }
      });
    }
  };
  
  // HTML에 그래프 추가하는 함수
  window.addOddsTrendChart = function(containerId, oddsData, oddstype, matchId) {
    const container = document.getElementById(containerId);
    if (!container || oddsData.length < 4) return;
    
    // 그래프 컨테이너 생성
    const chartContainer = document.createElement('div');
    chartContainer.className = 'odds-trend-chart';
    chartContainer.style.cssText = 'margin: 20px 0; text-align: center;';
    
    // Canvas 생성
    const canvas = document.createElement('canvas');
    canvas.id = `oddsChart-${matchId || 'default'}`;
    canvas.width = 400;
    canvas.height = 200;
    canvas.style.cssText = 'width: 100%; max-width: 400px;';
    
    chartContainer.appendChild(canvas);
    
    // odds-flow-tile과 odds-handicap-table 사이에 삽입
    const flowTile = container.querySelector('.odds-flow-tile');
    const handicapTable = container.querySelector('.odds-handicap-table');
    
    if (flowTile && handicapTable) {
      flowTile.parentNode.insertBefore(chartContainer, handicapTable);
      
      // 그래프 그리기
      setTimeout(() => {
        window.OddsTrendChart.drawChart(canvas.id, oddsData, oddstype);
      }, 100);
    }
  };
  
})(window); 