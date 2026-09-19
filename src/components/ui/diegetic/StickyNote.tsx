import React from 'react';

export interface StickyNoteProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'yellow' | 'parchment';
  pinColor?: 'red' | 'brass';
  rotation?: number;
  className?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  title,
  variant = 'yellow',
  pinColor = 'red',
  rotation = -2,
  className = ''
}) => {
  const bgClasses = {
    yellow: 'bg-[#fff9c4] text-[#1c1917] border-[#e2d589]',
    parchment: 'bg-[#f5ebd7] text-[#1c1917] border-[#c8b89e]'
  };

  const pinClasses = {
    red: 'bg-red-600 border-red-300 shadow-md',
    brass: 'bg-amber-600 border-amber-300 shadow-md'
  };

  return (
    <div
      className={`relative p-4 rounded-sm shadow-xl border select-none ${bgClasses[variant]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Pushpin at top center */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className={`w-3.5 h-3.5 rounded-full border-2 ${pinClasses[pinColor]}`} />
      </div>

      {title && (
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#735e4b] border-b border-black/10 pb-1 mb-2">
          {title}
        </div>
      )}

      <div className="font-typewriter text-xs leading-relaxed">
        {children}
      </div>
    </div>
  );
};
