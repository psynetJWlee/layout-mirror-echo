import React, { useState } from 'react';
import { OddsHeader } from '../components/odds/OddsHeader';
import { MatchInfo } from '../components/odds/MatchInfo';
import { MarketNavigation } from '../components/odds/MarketNavigation';
import { OddsFlowSection } from '../components/odds/OddsFlowSection';
import { StatisticsSection } from '../components/odds/StatisticsSection';
import { DonutChart } from '../components/odds/DonutChart';

const Index = () => {
  const [activeTab, setActiveTab] = useState('1x2');

  const marketTabs = [
    { id: '1x2', label: '승무패' },
    { id: 'handicap', label: '핸디캡' },
    { id: 'overunder', label: '언더오버' },
  ];

  const homeTeam = {
    name: '맨체스터C',
    logo: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7106eb0c3f038a54e98e655c56174add0cab129c?placeholderIfAbsent=true',
    color: 'rgba(187,40,40,1)',
  };

  const awayTeam = {
    name: '맨체스터U',
    logo: 'https://cdn.builder.io/api/v1/image/assets/TEMP/849334d50efdfddc62d908fc49a48de8c49334e7?placeholderIfAbsent=true',
    color: 'rgba(30,51,132,1)',
  };

  const domesticOddsRows = [
    {
      win: '2.30',
      draw: '3.75',
      lose: '2.80',
      time: '00:28',
      date: '2/17',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
    },
    {
      win: '2.40',
      draw: '3.75',
      lose: '2.70',
      time: '23:02',
      date: '2/16',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
    },
    {
      win: '2.45',
      draw: '3.75',
      lose: '2.62',
      time: '초기',
      isInitial: true,
    },
  ];

  const internationalOddsRows = [
    {
      win: '1.22',
      draw: '4.50',
      lose: '34.00',
      time: '03:10',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      drawArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c5b293fe211e284a0aa0f1af8876f4e57b52fa80?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
      isHighlighted: true,
    },
    {
      win: '1.44',
      draw: '4.00',
      lose: '7.50',
      time: '02:33',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
      isHighlighted: true,
    },
    {
      win: '1.57',
      draw: '4.00',
      lose: '5.50',
      time: '01:55',
      date: '2/18',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      drawArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c5b293fe211e284a0aa0f1af8876f4e57b52fa80?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
      isHighlighted: true,
    },
  ];

  const handicapDomesticRows = [
    {
      win: '2.30',
      draw: '-',
      lose: '2.80',
      time: '00:28',
      date: '2/17',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
    },
    {
      win: '2.40',
      draw: '-',
      lose: '2.70',
      time: '23:02',
      date: '2/16',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
    },
    {
      win: '2.45',
      draw: '-',
      lose: '2.62',
      time: '초기',
      isInitial: true,
    },
  ];

  const overUnderRows = [
    {
      win: '2.30',
      draw: '-',
      lose: '2.80',
      time: '00:28',
      date: '2/17',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
    },
    {
      win: '2.40',
      draw: '-',
      lose: '2.70',
      time: '23:02',
      date: '2/16',
      winArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/857fc97ad95778a30e78c3090afdea046832a920?placeholderIfAbsent=true',
      loseArrow: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2c59e7200d9c44d18971b7c0c3fc5319be807b5?placeholderIfAbsent=true',
    },
    {
      win: '2.45',
      draw: '-',
      lose: '2.62',
      time: '초기',
      isInitial: true,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case '1x2':
        return (
          <>
            {/* 승무패 배당 흐름 */}
            <div className="items-stretch flex w-full gap-[40px_72px] text-xl text-white font-bold text-center leading-none bg-[#2F6285]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/851d239da99d6ad898e9d7bfd016d156f5fed7f9?placeholderIfAbsent=true"
                className="aspect-[1.4] object-contain w-14 shrink-0"
                alt="Section icon"
              />
              <div className="grow shrink w-[249px] basis-auto my-auto">
                승무패 배당 흐름
              </div>
            </div>

            <div className="bg-white flex w-full flex-col items-center pt-4 pb-[50px]">
              <OddsFlowSection
                title="국내"
                headers={['승', '무', '패', '변동 시간']}
                rows={domesticOddsRows}
                showChangeIndicator={true}
              />

              <OddsFlowSection
                title="해외"
                isDomestic={false}
                headers={['승', '무', '패', '변동 시간']}
                rows={internationalOddsRows}
                chartData={{
                  leftValues: ['3.75', '2.62', '2.45'],
                  rightStats: [
                    { label: '패', value: '34.00', color: '#1E3384' },
                    { label: '무', value: '4.50', color: '#86869A' },
                    { label: '승', value: '1.22', color: '#BB2828' },
                  ],
                  chartImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3016442668672cf7cdd7b7792eccff0c75426721?placeholderIfAbsent=true',
                }}
                showExpandable={true}
                showChangeIndicator={true}
              />

              {/* 승무패 스텔러 */}
              <div className="w-full mt-6">
                <div className="flex w-full items-stretch gap-5 text-base tracking-[0.48px] leading-[27px] px-4 py-1.5">
                  <div>
                    <div className="text-[rgba(187,40,40,1)] font-bold">
                      EPL 리그 1.28 배당, 최근 <br />
                      37 경기 동안 21번의 승리 기록,
                      <br />
                      이는 축구 종목 대비 20% 낮은 수치입니다.
                    </div>
                    <div className="w-full text-black font-normal mt-2.5">
                      <div className="flex w-full items-center gap-2.5 overflow-hidden justify-center">
                        <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
                          맨체스터 시티의 홈 승률은 62.3% (101경기 중 63승)로,
                          맨체스터 유나이티드 원정 승률 37.11% (97경기 중 36승)와 비교
                          시 +25.2% 차이를 보입니다.
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fecd67d04a806f15630deea9841a25b17466eb89?placeholderIfAbsent=true"
                    className="aspect-[0.55] object-contain w-[115px] shrink-0 max-w-full"
                    alt="Analysis chart"
                  />
                </div>
                <div className="bg-white w-full whitespace-nowrap text-center mt-4 px-4">
                  <div className="flex w-full">
                    <div className="flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%]">
                      <div className="bg-[rgba(187,40,40,1)] flex w-full flex-col overflow-hidden items-center text-xl text-white font-bold justify-center px-[70px] py-[11px] rounded-[5px_0px_0px_5px]">
                        <div>84%</div>
                      </div>
                      <div className="text-[rgba(187,40,40,1)] text-lg font-normal self-center mt-2">
                        승
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-[rgba(138,138,138,1)] flex min-h-[45px] flex-col overflow-hidden items-center text-xl text-white font-bold justify-center px-[5px] py-[11px]">
                        <div>1%</div>
                      </div>
                      <div className="text-[rgba(138,138,138,1)] text-lg font-normal mt-2">
                        무
                      </div>
                    </div>
                    <div className="flex flex-col items-stretch w-[69px]">
                      <div className="bg-[rgba(30,51,132,1)] flex w-full flex-col overflow-hidden items-stretch text-xl text-white font-bold justify-center px-[7px] py-[11px] rounded-[0px_5px_5px_0px]">
                        <div>15%</div>
                      </div>
                      <div className="text-[rgba(30,51,132,1)] text-lg font-normal self-center mt-2">
                        패
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 승무패 배당 통계 */}
            <div className="items-stretch flex w-full gap-[40px_72px] text-xl text-white font-bold text-center leading-none bg-[#2F6285]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/851d239da99d6ad898e9d7bfd016d156f5fed7f9?placeholderIfAbsent=true"
                className="aspect-[1.4] object-contain w-14 shrink-0"
                alt="Section icon"
              />
              <div className="grow shrink w-[249px] basis-auto my-auto">
                승무패 배당 통계
              </div>
            </div>

            <div className="bg-white flex w-full flex-col items-center pt-4 pb-[50px]">
              <div className="bg-white self-stretch w-full overflow-hidden">
                <div className="flex w-full items-stretch gap-2 overflow-hidden text-2xl font-bold px-4">
                  <div className="text-black text-center my-auto">
                    승무패 배당률 일치 :
                  </div>
                  <div className="flex items-stretch gap-[3px] text-[rgba(30,51,132,1)] whitespace-nowrap underline h-full">
                    <div className="flex items-center gap-2.5 justify-center h-full">
                      <div className="self-stretch my-auto">67경기</div>
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d04ac452782fc9ce9e7e6c036d4d3a90b3a10621?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-5 shrink-0 my-auto"
                      alt="Info icon"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 text-xl font-normal whitespace-nowrap text-center justify-center mt-4 px-4">
                  <div className="self-stretch flex items-center gap-[5px] text-[rgba(187,40,40,1)] my-auto">
                    <div className="bg-[rgba(187,40,40,1)] self-stretch flex w-5 shrink-0 h-5 my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div>승</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="self-stretch my-auto">1.28</div>
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-[5px] text-[#8A8A8A] my-auto">
                    <div className="self-stretch flex w-5 shrink-0 h-5 bg-[#8A8A8A] my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div className="text-[#8A8A8A]">무</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="text-[#8A8A8A] self-stretch my-auto">5.75</div>
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-[5px] text-[rgba(30,51,132,1)] my-auto">
                    <div className="bg-[rgba(30,51,132,1)] self-stretch flex w-5 shrink-0 h-5 my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div>패</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="self-stretch my-auto">11.00</div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center text-center mt-4">
                  <DonutChart
                    centerText="승"
                    centerValue="61회"
                    imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/913ae91c207d1d576fbc65f3be25b69cb198c134?placeholderIfAbsent=true"
                    backgroundImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c231f4cbe46aeca1f517e53e221e592d00d6c1e4?placeholderIfAbsent=true"
                  />
                  <div className="flex w-full items-center gap-6 text-base font-normal whitespace-nowrap justify-center mt-2 px-4">
                    <div className="self-stretch flex w-[60px] items-center gap-[5px] justify-center my-auto">
                      <div className="self-stretch flex flex-col items-center justify-center my-auto">
                        <div className="text-[#8A8A8A]">무</div>
                      </div>
                      <div className="self-stretch flex items-center gap-2.5 my-auto">
                        <div className="text-[#8A8A8A] self-stretch my-auto">5회</div>
                      </div>
                    </div>
                    <div className="self-stretch flex w-[60px] items-center gap-[5px] justify-center my-auto">
                      <div className="self-stretch flex flex-col items-center justify-center my-auto">
                        <div>패</div>
                      </div>
                      <div className="self-stretch flex items-center gap-2.5 my-auto">
                        <div className="self-stretch my-auto">1회</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(200,200,200,1)] flex min-h-px w-[358px] max-w-full mt-6" />
              <div className="bg-white flex w-full flex-col items-stretch justify-center mt-6 pb-2 px-4">
                <div className="w-full">
                  <div className="flex w-full items-center gap-2 overflow-hidden text-xl text-black font-bold text-center">
                    <div className="self-stretch my-auto">배당별 통계</div>
                  </div>
                  <div className="w-full mt-2">
                    <StatisticsSection
                      title="1.28"
                      items={[
                        { label: '승', value: '67', color: 'rgba(187,40,40,1)', isHighlighted: true },
                        { label: '무', value: '21', color: 'black' },
                        { label: '패', value: '12', color: 'black' },
                      ]}
                      barData={{
                        segments: [
                          { width: 232, color: 'rgba(187,40,40,1)' },
                          { width: 75, color: 'rgba(138,138,138,1)' },
                          { width: 51, color: 'rgba(30,51,132,1)' },
                        ],
                      }}
                    />
                  </div>
                </div>
                <div className="w-full mt-6">
                  <StatisticsSection
                    title="5.75"
                    items={[
                      { label: '승', value: '52', color: 'black' },
                      { label: '무', value: '27', color: '#323741', isHighlighted: true },
                      { label: '패', value: '21', color: 'black' },
                    ]}
                    barData={{
                      segments: [
                        { width: 186, color: 'rgba(187,40,40,1)' },
                        { width: 96, color: 'rgba(138,138,138,1)' },
                        { width: 76, color: 'rgba(30,51,132,1)' },
                      ],
                    }}
                  />
                </div>
                <div className="w-full mt-6">
                  <StatisticsSection
                    title="11.00"
                    items={[
                      { label: '승', value: '98', color: 'black' },
                      { label: '무', value: '1', color: 'black' },
                      { label: '패', value: '1', color: 'rgba(30,51,132,1)', isHighlighted: true },
                    ]}
                    barData={{
                      segments: [
                        { width: 332, color: 'rgba(187,40,40,1)' },
                        { width: 13, color: 'rgba(138,138,138,1)' },
                        { width: 13, color: 'rgba(30,51,132,1)' },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'handicap':
        return (
          <>
            {/* 핸디캡 배당 흐름 */}
            <div className="items-stretch flex w-full gap-[40px_72px] text-xl text-white font-bold text-center leading-none bg-[#2F6285]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/851d239da99d6ad898e9d7bfd016d156f5fed7f9?placeholderIfAbsent=true"
                className="aspect-[1.4] object-contain w-14 shrink-0"
                alt="Section icon"
              />
              <div className="grow shrink w-[249px] basis-auto my-auto">
                핸디캡 배당 흐름
              </div>
            </div>

            <div className="w-full pt-4 pb-[50px]">
              <OddsFlowSection
                title="국내"
                subtitle="(-1.0)"
                headers={['핸승', '핸무', '핸패', '변동 시간']}
                rows={[
                  {
                    win: '2.45',
                    draw: '3.75',
                    lose: '2.62',
                    time: '초기',
                    isInitial: true,
                  },
                ]}
              />

              <OddsFlowSection
                title="국내"
                subtitle="(-1.5)"
                headers={['핸승', '핸무', '핸패', '변동 시간']}
                rows={handicapDomesticRows}
              />

              <OddsFlowSection
                title="국내"
                subtitle="(-2.5)"
                headers={['핸승', '핸무', '핸패', '변동 시간']}
                rows={handicapDomesticRows}
              />

              <OddsFlowSection
                title="해외"
                subtitle="(-1.5)"
                isDomestic={false}
                headers={['핸승', '핸무', '핸패', '변동 시간']}
                rows={internationalOddsRows}
                chartData={{
                  leftValues: ['3.75', '2.62', '2.45'],
                  rightStats: [
                    { label: '패', value: '34.00', color: '#1E3384' },
                    { label: '무', value: '4.50', color: '#86869A' },
                    { label: '승', value: '1.22', color: '#BB2828' },
                  ],
                  chartImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0fcb4f721cc1653ffdd72739a184de70b9c9d9c5?placeholderIfAbsent=true',
                }}
                showExpandable={true}
              />

              <OddsFlowSection
                title="해외"
                subtitle="(-2.5)"
                isDomestic={false}
                headers={['핸승', '핸무', '핸패', '변동 시간']}
                rows={internationalOddsRows}
                chartData={{
                  leftValues: ['3.75', '2.62', '2.45'],
                  rightStats: [
                    { label: '패', value: '34.00', color: '#1E3384' },
                    { label: '무', value: '4.50', color: '#86869A' },
                    { label: '승', value: '1.22', color: '#BB2828' },
                  ],
                  chartImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6d7e699ea3c1089616f193d2e8f09c60ea066965?placeholderIfAbsent=true',
                }}
                showExpandable={true}
              />
            </div>

            {/* 핸디캡 배당 통계 */}
            <div className="items-stretch flex w-full gap-[40px_72px] text-xl text-white font-bold text-center leading-none bg-[#2F6285]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/851d239da99d6ad898e9d7bfd016d156f5fed7f9?placeholderIfAbsent=true"
                className="aspect-[1.4] object-contain w-14 shrink-0"
                alt="Section icon"
              />
              <div className="grow shrink w-[249px] basis-auto my-auto">
                핸디캡 배당 통계
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch pt-4 pb-[50px]">
              <div className="bg-white w-full overflow-hidden font-normal pb-4">
                <div className="flex w-full items-stretch gap-2 overflow-hidden text-2xl font-bold pl-4 pr-2.5">
                  <div className="text-black text-center my-auto">
                    핸디캡 (-2.5) 동일 배당률 :
                  </div>
                  <div className="flex items-stretch text-[rgba(30,51,132,1)] whitespace-nowrap underline h-full w-[95px]">
                    <div className="flex items-center gap-2.5 justify-center h-full">
                      <div className="self-stretch my-auto">27경기</div>
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/52e2142387cc0349eaa324db57412f9108e9cdc7?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-5 shrink-0 my-auto"
                      alt="Info icon"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 text-xl whitespace-nowrap text-center justify-center mt-5 px-4">
                  <div className="self-stretch flex items-center gap-[5px] text-[rgba(187,40,40,1)] my-auto">
                    <div className="bg-[rgba(187,40,40,1)] self-stretch flex w-5 shrink-0 h-5 my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div>승</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="self-stretch my-auto">1.85</div>
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-[5px] text-[#8A8A8A] my-auto">
                    <div className="self-stretch flex w-5 shrink-0 h-5 bg-[#8A8A8A] my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div className="text-[#8A8A8A]">무</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="text-[#8A8A8A] self-stretch my-auto">-</div>
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-[5px] text-[rgba(30,51,132,1)] my-auto">
                    <div className="bg-[rgba(30,51,132,1)] self-stretch flex w-5 shrink-0 h-5 my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div>패</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="self-stretch my-auto">2.10</div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center text-base text-[#8A8A8A] whitespace-nowrap text-center mt-5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ed5f9e0275799d9e83f473bb6ed39ac1e4e21cb?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[250px] max-w-full"
                    alt="Handicap statistics chart"
                  />
                  <div className="flex w-full items-center gap-6 justify-center mt-2 px-4">
                    <div className="self-stretch flex w-[60px] items-center gap-[5px] justify-center my-auto">
                      <div className="self-stretch flex flex-col items-center justify-center my-auto">
                        <div className="text-[#8A8A8A]">패</div>
                      </div>
                      <div className="self-stretch flex items-center gap-2.5 my-auto">
                        <div className="text-[#8A8A8A] self-stretch my-auto">7회</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(200,200,200,1)] self-center flex min-h-px w-[358px] max-w-full mt-6" />
              <div className="bg-white flex w-full flex-col items-stretch justify-center mt-6 px-4">
                <div className="flex w-full items-center gap-2 overflow-hidden text-2xl text-black font-bold text-center">
                  <div className="self-stretch my-auto">기준점별 통계</div>
                </div>
                <div className="w-full mt-5">
                  <StatisticsSection
                    title="-1"
                    items={[
                      { label: '승', value: '67', color: 'rgba(187,40,40,1)', isHighlighted: true },
                      { label: '무', value: '5', color: 'black' },
                      { label: '패', value: '28', color: 'black' },
                    ]}
                    barData={{
                      segments: [
                        { width: 232, color: 'rgba(187,40,40,1)' },
                        { width: 37, color: 'rgba(138,138,138,1)' },
                        { width: 89, color: 'rgba(30,51,132,1)' },
                      ],
                    }}
                  />
                </div>
                <div className="bg-[rgba(200,200,200,1)] flex min-h-px w-full mt-5" />
                <div className="w-full mt-5">
                  <StatisticsSection
                    title="-2.5"
                    items={[
                      { label: '승', value: '49', color: 'black' },
                      { label: '패', value: '51', color: 'rgba(30,51,132,1)', isHighlighted: true },
                    ]}
                    barData={{
                      segments: [
                        { width: 232, color: 'rgba(187,40,40,1)' },
                        { width: 126, color: 'rgba(30,51,132,1)' },
                      ],
                    }}
                  />
                </div>
                <div className="bg-[rgba(200,200,200,1)] flex min-h-px w-full mt-5" />
                <div className="w-full mt-5">
                  <StatisticsSection
                    title="-3.5"
                    items={[
                      { label: '승', value: '60', color: 'rgba(187,40,40,1)', isHighlighted: true },
                      { label: '패', value: '40', color: 'black' },
                    ]}
                    barData={{
                      segments: [
                        { width: 204, color: 'rgba(187,40,40,1)' },
                        { width: 154, color: 'rgba(30,51,132,1)' },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'overunder':
        return (
          <>
            {/* 언더오버 배당 흐름 */}
            <div className="items-stretch flex w-full gap-[40px_63px] text-xl text-white font-bold text-center leading-none bg-[#2F6285]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/851d239da99d6ad898e9d7bfd016d156f5fed7f9?placeholderIfAbsent=true"
                className="aspect-[1.4] object-contain w-14 shrink-0"
                alt="Section icon"
              />
              <div className="grow shrink w-[258px] basis-auto my-auto">
                언더오버 배당 흐름
              </div>
            </div>

            <div className="w-full pt-4 pb-[50px]">
              <OddsFlowSection
                title="국내"
                subtitle="(1.0)"
                headers={['언더', '-', '오버', '변동 시간']}
                rows={[
                  {
                    win: '2.45',
                    draw: '-',
                    lose: '2.62',
                    time: '초기',
                    isInitial: true,
                  },
                ]}
              />

              <OddsFlowSection
                title="국내"
                subtitle="(1.5)"
                headers={['언더', '-', '오버', '변동 시간']}
                rows={overUnderRows}
              />

              <OddsFlowSection
                title="국내"
                subtitle="(2.5)"
                headers={['언더', '-', '오버', '변동 시간']}
                rows={overUnderRows}
              />

              <OddsFlowSection
                title="해외"
                subtitle="(1.5)"
                isDomestic={false}
                headers={['언더', '-', '오버', '변동 시간']}
                rows={internationalOddsRows}
                chartData={{
                  leftValues: ['3.75', '2.62', '2.45'],
                  rightStats: [
                    { label: '패', value: '34.00', color: '#1E3384' },
                    { label: '무', value: '4.50', color: '#86869A' },
                    { label: '승', value: '1.22', color: '#BB2828' },
                  ],
                  chartImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6c49572232fef47e733b0e6329296edb404f8ab9?placeholderIfAbsent=true',
                }}
                showExpandable={true}
              />

              <OddsFlowSection
                title="해외"
                subtitle="(2.5)"
                isDomestic={false}
                headers={['언더', '-', '오버', '변동 시간']}
                rows={internationalOddsRows}
                chartData={{
                  leftValues: ['3.75', '2.62', '2.45'],
                  rightStats: [
                    { label: '패', value: '34.00', color: '#1E3384' },
                    { label: '무', value: '4.50', color: '#86869A' },
                    { label: '승', value: '1.22', color: '#BB2828' },
                  ],
                  chartImage: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0bdb8b0f9fddd3229d547b2f67fb284b6630a004?placeholderIfAbsent=true',
                }}
                showExpandable={true}
              />
            </div>

            {/* 언더오버 배당 통계 */}
            <div className="items-stretch flex w-full gap-[40px_63px] text-xl text-white font-bold text-center leading-none bg-[#2F6285]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/851d239da99d6ad898e9d7bfd016d156f5fed7f9?placeholderIfAbsent=true"
                className="aspect-[1.4] object-contain w-14 shrink-0"
                alt="Section icon"
              />
              <div className="grow shrink w-[258px] basis-auto my-auto">
                언더오버 배당 통계
              </div>
            </div>

            <div className="bg-white flex w-full flex-col items-stretch pt-4 pb-[50px]">
              <div className="w-full overflow-hidden text-base font-normal">
                <div className="flex w-full items-stretch gap-2 overflow-hidden text-2xl font-bold px-4">
                  <div className="text-black text-center my-auto">
                    언더오버 (222.5) 동배 :
                  </div>
                  <div className="flex items-stretch text-[rgba(30,51,132,1)] whitespace-nowrap underline h-full w-[95px]">
                    <div className="flex items-center gap-2.5 justify-center h-full">
                      <div className="self-stretch my-auto">47경기</div>
                    </div>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e11e634782f04d97dd4190ee534352e297db5920?placeholderIfAbsent=true"
                      className="aspect-[1] object-contain w-5 shrink-0 my-auto"
                      alt="Info icon"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 text-xl whitespace-nowrap text-center justify-center mt-4 px-4">
                  <div className="self-stretch flex items-center gap-[5px] text-[rgba(187,40,40,1)] my-auto">
                    <div className="bg-[rgba(187,40,40,1)] self-stretch flex w-5 shrink-0 h-5 my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div>U</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="self-stretch my-auto">1.85</div>
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-[5px] text-[rgba(30,51,132,1)] my-auto">
                    <div className="bg-[rgba(30,51,132,1)] self-stretch flex w-5 shrink-0 h-5 my-auto" />
                    <div className="self-stretch flex flex-col items-center justify-center my-auto">
                      <div>O</div>
                    </div>
                    <div className="self-stretch flex items-center gap-2.5 w-[42px] my-auto">
                      <div className="self-stretch my-auto">2.10</div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center text-[#8A8A8A] whitespace-nowrap text-center mt-4">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3157ca651f59d472aa442efa320bbfd60e025e74?placeholderIfAbsent=true"
                    className="aspect-[1] object-contain w-[250px] max-w-full"
                    alt="Over/Under statistics chart"
                  />
                  <div className="flex w-full items-center gap-6 justify-center mt-2 px-4">
                    <div className="self-stretch flex w-[60px] items-center gap-[5px] justify-center my-auto">
                      <div className="self-stretch flex flex-col items-center justify-center my-auto">
                        <div className="text-[#8A8A8A]">O</div>
                      </div>
                      <div className="self-stretch flex items-center gap-2.5 my-auto">
                        <div className="text-[#8A8A8A] self-stretch my-auto">10회</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full text-[#8a8a8a] tracking-[0.48px] leading-[27px] mt-4">
                  <div className="w-full px-4">
                    <div>
                      <span style={{ fontFamily: 'Pretendard, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        홈팀인{' '}
                      </span>
                      <span style={{ fontFamily: 'Pretendard, -apple-system, Roboto, Helvetica, sans-serif', fontWeight: 700, color: 'rgba(50,55,65,1)' }}>
                        맨체스터C는 2.5 기준점일 때 45%의 확률로 언더를 기록
                      </span>
                      <span style={{ fontFamily: 'Pretendard, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        {' '}하였고{' '}
                      </span>
                      <span style={{ fontFamily: 'Pretendard, -apple-system, Roboto, Helvetica, sans-serif', fontWeight: 700, color: 'rgba(50,55,65,1)' }}>
                        맨체스터U 역시 2.5 기준점일 때 36%의 확률로 언더를 기록
                      </span>
                      <span style={{ fontFamily: 'Pretendard, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        했습니다.
                      </span>
                      <br />
                      <span style={{ fontFamily: 'Pretendard, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        이 점을 감안한다면 비교적 높은 확률로 2.5 이상의 득점이
                        예상됩니다.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(200,200,200,1)] self-center flex min-h-px w-[358px] max-w-full mt-6" />
              <div className="flex w-full flex-col items-stretch justify-center mt-6 px-4">
                <div className="flex w-full items-center gap-2 overflow-hidden text-2xl text-black font-bold text-center">
                  <div className="self-stretch my-auto">기준점별 통계</div>
                </div>
                <div className="w-full mt-4">
                  <div className="flex w-full items-center gap-[5px] text-xl whitespace-nowrap text-center">
                    <div className="bg-[rgba(50,55,65,1)] self-stretch flex w-5 shrink-0 h-5 my-auto" />
                    <div className="self-stretch flex items-center gap-2.5 text-[rgba(50,55,65,1)] font-normal w-[42px] my-auto">
                      <div className="self-stretch my-auto">2.5</div>
                    </div>
                    <div className="self-stretch flex min-w-60 items-center gap-2.5 flex-1 shrink basis-[0%] my-auto">
                      <div className="text-[rgba(187,40,40,1)] font-bold underline self-stretch my-auto">
                        60언더
                      </div>
                      <div className="text-black font-normal self-stretch my-auto">
                        40오버
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8994948edb675132661b32f946b6c3f06e80229?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
                        alt="Trend indicator"
                      />
                    </div>
                  </div>
                  <div className="flex min-h-2.5 w-full items-stretch overflow-hidden mt-2">
                    <div className="bg-[rgba(187,40,40,1)] border flex w-[204px] shrink-0 h-2.5 gap-2.5 border-[rgba(187,40,40,1)] border-solid" />
                    <div className="bg-[rgba(30,51,132,1)] flex w-[154px] shrink h-2.5 gap-2.5 flex-1 basis-[0%]" />
                  </div>
                </div>
                <div className="w-full mt-4">
                  <div className="flex w-full items-center gap-[5px] text-xl whitespace-nowrap text-center">
                    <div className="self-stretch flex w-5 shrink-0 h-5 bg-[#323741] my-auto" />
                    <div className="self-stretch flex items-center gap-2.5 text-[#323741] font-normal w-[42px] my-auto">
                      <div className="text-[#323741] self-stretch my-auto">3.5</div>
                    </div>
                    <div className="self-stretch flex min-w-60 items-center gap-2.5 flex-1 shrink basis-[0%] my-auto">
                      <div className="text-black font-normal self-stretch my-auto">
                        49언더
                      </div>
                      <div className="text-[rgba(30,51,132,1)] font-bold underline self-stretch my-auto">
                        51오버
                      </div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8994948edb675132661b32f946b6c3f06e80229?placeholderIfAbsent=true"
                        className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
                        alt="Trend indicator"
                      />
                    </div>
                  </div>
                  <div className="flex min-h-2.5 w-full items-stretch overflow-hidden mt-2">
                    <div className="bg-[rgba(187,40,40,1)] border flex w-[232px] shrink-0 h-2.5 gap-2.5 border-[rgba(187,40,40,1)] border-solid" />
                    <div className="bg-[rgba(30,51,132,1)] flex w-[126px] shrink h-2.5 gap-2.5 flex-1 basis-[0%]" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <main className="max-w-[480px] w-full mx-auto bg-white">
      <OddsHeader title="배당" />
      
      <div className="bg-white flex min-h-12 w-full" />
      
      <MatchInfo homeTeam={homeTeam} awayTeam={awayTeam} />
      
      <MarketNavigation
        tabs={marketTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {renderContent()}
    </main>
  );
};

export default Index;
