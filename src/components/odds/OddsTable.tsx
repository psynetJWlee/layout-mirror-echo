import React from 'react';

interface OddsRow {
  win: string;
  draw: string;
  lose: string;
  time: string;
  date?: string;
  winArrow?: string;
  drawArrow?: string;
  loseArrow?: string;
  isInitial?: boolean;
  isHighlighted?: boolean;
}

interface OddsTableProps {
  headers: string[];
  rows: OddsRow[];
  showChangeIndicator?: boolean;
}

export const OddsTable: React.FC<OddsTableProps> = ({
  headers,
  rows,
  showChangeIndicator = false,
}) => {
  return (
    <div className="bg-white w-full text-sm font-normal pb-6">
      <div className="flex min-h-[27px] w-full font-bold text-center">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`border flex items-center gap-0.5 whitespace-nowrap justify-center flex-1 shrink basis-[0%] py-[5px] border-[rgba(195,195,195,1)] border-solid ${
              index === 0
                ? 'text-[rgba(187,40,40,1)] pr-1'
                : index === 1
                ? 'text-black px-px'
                : index === 2
                ? 'text-[rgba(30,51,132,1)] pr-1'
                : 'text-[rgba(31,31,31,1)] gap-1.5 px-px'
            }`}
          >
            <div className="self-stretch my-auto">{header}</div>
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex min-h-6 w-full whitespace-nowrap ${
            row.isInitial
              ? 'bg-[rgba(239,239,239,1)]'
              : row.isHighlighted
              ? 'bg-[rgba(243,203,204,1)]'
              : ''
          }`}
        >
          <div className="border flex min-h-6 items-center text-[rgba(31,31,31,1)] justify-center flex-1 shrink basis-4 border-[rgba(195,195,195,1)] border-solid">
            <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
            <div className="self-stretch flex items-center justify-center h-full flex-1 shrink basis-[0%]">
              {row.win.includes('.') ? (
                <>
                  <div className="text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                    {row.win.split('.')[0]}
                  </div>
                  <div className="text-center self-stretch my-auto">.</div>
                  <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
                    {row.win.split('.')[1]}
                  </div>
                </>
              ) : (
                <div className="self-stretch my-auto">{row.win}</div>
              )}
            </div>
            {row.winArrow && (
              <img
                src={row.winArrow}
                className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                alt="Change indicator"
              />
            )}
            {!row.winArrow && !row.isInitial && (
              <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
            )}
          </div>
          <div className="border flex min-h-6 items-center text-[rgba(31,31,31,1)] justify-center flex-1 shrink basis-4 border-[rgba(195,195,195,1)] border-solid">
            <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
            <div className="self-stretch flex items-center justify-center h-full flex-1 shrink basis-[0%]">
              {row.draw.includes('.') ? (
                <>
                  <div className="text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                    {row.draw.split('.')[0]}
                  </div>
                  <div className="text-center self-stretch my-auto">.</div>
                  <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
                    {row.draw.split('.')[1]}
                  </div>
                </>
              ) : (
                <div className="self-stretch my-auto">{row.draw}</div>
              )}
            </div>
            {row.drawArrow && (
              <img
                src={row.drawArrow}
                className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                alt="Change indicator"
              />
            )}
            {!row.drawArrow && !row.isInitial && (
              <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
            )}
          </div>
          <div className="border flex min-h-6 items-center text-[rgba(31,31,31,1)] justify-center flex-1 shrink basis-4 border-[rgba(195,195,195,1)] border-solid">
            <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
            <div className="self-stretch flex items-center justify-center h-full flex-1 shrink basis-[0%]">
              {row.lose.includes('.') ? (
                <>
                  <div className="text-right self-stretch flex-1 shrink basis-[0%] my-auto">
                    {row.lose.split('.')[0]}
                  </div>
                  <div className="text-center self-stretch my-auto">.</div>
                  <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
                    {row.lose.split('.')[1]}
                  </div>
                </>
              ) : (
                <div className="self-stretch my-auto">{row.lose}</div>
              )}
            </div>
            {row.loseArrow && (
              <img
                src={row.loseArrow}
                className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                alt="Change indicator"
              />
            )}
            {!row.loseArrow && !row.isInitial && (
              <div className="self-stretch flex w-6 shrink-0 h-6 my-auto" />
            )}
          </div>
          <div className="border self-stretch flex items-center gap-2 justify-between h-full flex-1 shrink basis-[0%] px-2 border-[rgba(195,195,195,1)] border-solid">
            {row.date && (
              <div className="text-[rgba(143,143,143,1)] self-stretch my-auto">
                {row.date}
              </div>
            )}
            <div className="text-[rgba(31,31,31,1)] self-stretch my-auto">
              {row.time}
            </div>
          </div>
        </div>
      ))}
      {showChangeIndicator && (
        <div className="flex w-full items-center gap-1 text-base text-[rgba(255,124,128,1)] font-bold tracking-[-0.48px] leading-[1.2] py-4">
          <div className="bg-[rgba(255,124,128,1)] self-stretch flex w-3 shrink-0 h-3 my-auto rounded-[1px]" />
          <div className="self-stretch my-auto">경기 시작 후 변동</div>
        </div>
      )}
    </div>
  );
};
