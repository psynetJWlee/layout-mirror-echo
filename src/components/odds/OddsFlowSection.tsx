import React, { useState } from 'react';
import { OddsTable } from './OddsTable';
import { ExpandableSection } from './ExpandableSection';

interface OddsFlowSectionProps {
  title: string;
  subtitle?: string;
  isDomestic?: boolean;
  headers: string[];
  rows: any[];
  chartData?: {
    leftValues: string[];
    rightStats: { label: string; value: string; color: string }[];
    chartImage: string;
  };
  showExpandable?: boolean;
  showChangeIndicator?: boolean;
}

export const OddsFlowSection: React.FC<OddsFlowSectionProps> = ({
  title,
  subtitle,
  isDomestic = true,
  headers,
  rows,
  chartData,
  showExpandable = false,
  showChangeIndicator = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(!showExpandable);

  const titleColor = isDomestic
    ? 'text-[rgba(41,41,49,1)]'
    : 'text-[rgba(70,159,255,1)]';

  return (
    <div className="bg-white flex w-full flex-col items-stretch mt-6">
      <div className={`bg-white self-center flex w-full items-center gap-2.5 overflow-hidden text-2xl ${titleColor} font-bold whitespace-nowrap px-4 py-[5px]`}>
        <div className="self-stretch my-auto">{title}</div>
        {subtitle && (
          <div className="self-stretch my-auto">{subtitle}</div>
        )}
      </div>

      {chartData && (
        <div className="flex w-full items-stretch gap-4 whitespace-nowrap mt-4">
          <div className="text-sm font-normal mt-[37px]">
            {chartData.leftValues.map((value, index) => (
              <div
                key={index}
                className={`flex items-center gap-2.5 text-center justify-center ${
                  index > 0 ? 'mt-3' : ''
                } ${
                  index === 0
                    ? 'text-[#86869A]'
                    : index === 1
                    ? 'text-[rgba(30,51,132,1)]'
                    : 'text-[#BB2828]'
                }`}
              >
                <div className="self-stretch my-auto">{value}</div>
              </div>
            ))}
          </div>
          <img
            src={chartData.chartImage}
            className="aspect-[1.86] object-contain w-[201px] shrink-0 max-w-full"
            alt="Odds chart"
          />
          <div className="text-2xl font-bold text-right">
            {chartData.rightStats.map((stat, index) => (
              <div
                key={index}
                className={`flex items-center gap-[5px] ${
                  index === 0 ? 'min-h-[29px]' : index === 1 ? 'mt-5 pl-4' : ''
                }`}
              >
                <div
                  className="self-stretch my-auto"
                  style={{ color: stat.color }}
                >
                  {stat.label}
                </div>
                <div
                  className="self-stretch my-auto"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white w-full overflow-hidden mt-4">
        {showExpandable ? (
          <ExpandableSection
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          >
            <OddsTable
              headers={headers}
              rows={rows}
              showChangeIndicator={showChangeIndicator}
            />
          </ExpandableSection>
        ) : (
          <OddsTable
            headers={headers}
            rows={rows}
            showChangeIndicator={showChangeIndicator}
          />
        )}
      </div>
    </div>
  );
};
