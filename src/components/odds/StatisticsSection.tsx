import React from 'react';

interface StatisticItem {
  label: string;
  value: string;
  color: string;
  isHighlighted?: boolean;
}

interface StatisticsSectionProps {
  title: string;
  items: StatisticItem[];
  barData?: {
    segments: { width: number; color: string }[];
  };
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  title,
  items,
  barData,
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-[5px] text-xl font-normal whitespace-nowrap text-center">
        <div className="self-stretch flex w-5 shrink-0 h-5 bg-[#323741] my-auto" />
        <div className="self-stretch flex items-center gap-2.5 text-[#323741] w-[42px] my-auto">
          <div className="self-stretch my-auto">{title}</div>
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-2.5 text-black flex-1 shrink basis-[0%] my-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className={`self-stretch my-auto ${
                item.isHighlighted
                  ? 'font-bold underline'
                  : 'font-normal'
              }`}
              style={{ color: item.color }}
            >
              {item.value} {item.label}
            </div>
          ))}
        </div>
      </div>
      {barData && (
        <div className="flex min-h-2.5 w-full items-stretch overflow-hidden mt-2">
          {barData.segments.map((segment, index) => (
            <div
              key={index}
              className="flex h-2.5 gap-2.5"
              style={{
                backgroundColor: segment.color,
                width: `${segment.width}px`,
                border: segment.color === 'rgba(187,40,40,1)' ? `1px solid ${segment.color}` : 'none',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
