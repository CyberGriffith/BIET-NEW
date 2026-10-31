import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TopNotificationBarProps {
  onApplyClick: () => void;
}

export const TopNotificationBar: React.FC<TopNotificationBarProps> = ({ onApplyClick }) => {
  return (
    <div className="bg-white text-[#111111] border-b border-neutral-200 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FFCC00] shrink-0" aria-hidden="true" />
          <span className="font-bold uppercase tracking-wider text-[11px] shrink-0 text-[#111111]">
            Admissions Open
          </span>
          <span className="hidden sm:inline text-neutral-400">·</span>
          <span className="truncate text-neutral-600 font-medium">
            Applications open for 2026/2027 intakes — Colombo Campus
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onApplyClick}
            className="flex items-center gap-1 text-[#111111] hover:text-[#B38F00] font-bold transition-colors text-xs cursor-pointer whitespace-nowrap"
          >
            <span className="hover:underline">Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />
          </button>
        </div>
      </div>
    </div>
  );
};
