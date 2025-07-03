import React, { useState } from 'react';

interface ExpandableSectionProps {
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  children,
  isExpanded = false,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <div className="relative">
      {expanded ? (
        <>
          {children}
          <button
            onClick={handleToggle}
            className="bg-white border flex min-h-[50px] items-center gap-[5px] overflow-hidden text-black text-right justify-center py-[15px] rounded-lg border-[rgba(195,195,195,1)] border-solid w-full"
          >
            <div className="text-lg self-stretch my-auto">상세정보 접기</div>
            <div className="text-sm self-stretch my-auto">▼</div>
          </button>
        </>
      ) : (
        <button
          onClick={handleToggle}
          className="bg-white shadow-[0px_-20px_16px_rgba(255,255,255,0.7)] border z-10 flex min-h-[50px] items-center gap-[5px] overflow-hidden text-black font-normal text-right justify-center py-[15px] rounded-lg border-[rgba(195,195,195,1)] border-solid w-full"
        >
          <div className="text-lg self-stretch my-auto">상세정보 펼쳐보기</div>
          <div className="text-sm self-stretch my-auto">▼</div>
        </button>
      )}
    </div>
  );
};
