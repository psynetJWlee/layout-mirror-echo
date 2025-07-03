import React, { useState } from 'react';

interface MarketTab {
  id: string;
  label: string;
}

interface MarketNavigationProps {
  tabs: MarketTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const MarketNavigation: React.FC<MarketNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="bg-white flex w-full items-center overflow-hidden text-xl text-[#8A8A8A] font-normal whitespace-nowrap text-center tracking-[1px] leading-none pt-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`self-stretch flex min-h-[38px] items-center gap-2.5 justify-center flex-1 shrink basis-[0%] my-auto px-2.5 py-[11px] transition-colors ${
            activeTab === tab.id
              ? 'bg-[rgba(1,40,64,1)] text-2xl text-white font-bold leading-none'
              : 'bg-white text-[#8A8A8A] border-[rgba(200,200,200,1)] border-b'
          }`}
        >
          <div className="self-stretch my-auto">{tab.label}</div>
        </button>
      ))}
    </nav>
  );
};
