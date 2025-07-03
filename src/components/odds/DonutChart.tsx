import React from 'react';

interface DonutChartProps {
  centerText: string;
  centerValue: string;
  imageSrc: string;
  backgroundImageSrc?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  centerText,
  centerValue,
  imageSrc,
  backgroundImageSrc,
}) => {
  return (
    <div className="w-[250px] max-w-full text-[29px] text-[rgba(187,40,40,1)] font-bold">
      <div className="bg-[#8A8A8A] flex flex-col items-center aspect-[1] fill-[#8A8A8A] rounded-[50%]">
        <div className="flex flex-col relative aspect-[1] w-full items-center pb-[108px] px-[25px] rounded-[50%]">
          {backgroundImageSrc && (
            <img
              src={backgroundImageSrc}
              className="absolute h-full w-full object-cover inset-0"
              alt="Chart background"
            />
          )}
          <img
            src={imageSrc}
            className="aspect-[0.25] object-contain w-4 rounded-[50%]"
            alt="Chart indicator"
          />
          <div className="relative mb-[-22px] mt-11">
            {centerText} {centerValue}
          </div>
        </div>
      </div>
    </div>
  );
};
