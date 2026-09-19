import React from 'react';
import { ClipboardCheck } from 'lucide-react';

export interface ForensicClipboardItem {
  id: string;
  label: string;
  isCompleted: boolean;
  hint?: string;
}

export interface ForensicClipboardProps {
  title: string;
  docketNumber?: string;
  items: ForensicClipboardItem[];
  className?: string;
  onItemClick?: (id: string) => void;
}

export const ForensicClipboard: React.FC<ForensicClipboardProps> = ({
  title,
  docketNumber = 'KSTN #507',
  items,
  className = '',
  onItemClick
}) => {
  const completedCount = items.filter(i => i.isCompleted).length;

  return (
    <div className={`forensic-clipboard relative p-5 pt-8 select-none text-[#f4efe4] ${className}`}>
      {/* Heavy Metal Top Clip */}
      <div className="forensic-clipboard-clip" />

      {/* Header Docket Info */}
      <div className="border-b border-[#5c4632] pb-3 mb-3.5 flex items-center justify-between">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-amber-500/80 font-bold">
            BIÊN BẢN HIỆN TRƯỜNG • {docketNumber}
          </div>
          <h2 className="text-xs font-bold font-dossier-serif uppercase tracking-wider text-[#e6ded1]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-[#5c4632] text-amber-400 text-[10px] font-mono font-bold">
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>{completedCount}/{items.length}</span>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2 font-typewriter text-xs">
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onItemClick && onItemClick(item.id)}
            className={`p-2 rounded border transition-all flex items-start gap-2.5 ${
              item.isCompleted
                ? 'bg-[#181f19]/80 border-emerald-800/60 text-emerald-200'
                : 'bg-[#1c1611]/80 border-[#473627] text-[#c7baa8] hover:border-amber-600/60'
            } ${onItemClick ? 'cursor-pointer hover:scale-101' : ''}`}
          >
            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
              item.isCompleted
                ? 'bg-emerald-600 border-emerald-400 text-white'
                : 'border-[#735a43] text-transparent'
            }`}>
              {item.isCompleted ? '✓' : ''}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className={`font-semibold truncate ${item.isCompleted ? 'line-through text-emerald-300/80' : ''}`}>
                  {idx + 1}. {item.label}
                </span>
                {item.isCompleted && (
                  <span className="rubber-stamp stamp-green text-[8px] py-0 px-1 shrink-0">
                    ĐÃ THU THẬP
                  </span>
                )}
              </div>
              {item.hint && (
                <p className="text-[10px] text-[#8f7e6c] font-mono mt-0.5 truncate">
                  {item.hint}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
