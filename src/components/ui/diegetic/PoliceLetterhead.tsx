import React from 'react';

export interface PoliceLetterheadProps {
  title: string;
  docketNumber: string;
  department?: string;
  caseName?: string;
  actionButton?: React.ReactNode;
  className?: string;
}

export const PoliceLetterhead: React.FC<PoliceLetterheadProps> = ({
  title,
  docketNumber,
  department = 'CÔNG AN TP. HỒ CHÍ MINH — PHÒNG CẢNH SÁT HÌNH SỰ',
  caseName,
  actionButton,
  className = ''
}) => {
  return (
    <div className={`border-b-2 border-[#8a7663] pb-3.5 flex items-start justify-between select-none ${className}`}>
      <div className="space-y-1 text-left">
        <div className="text-[9px] font-mono uppercase tracking-widest text-[#594736] font-extrabold">
          {department}
        </div>
        <h1 className="text-base sm:text-lg font-bold font-dossier-serif text-[#1c1917] uppercase tracking-wide">
          {title}
        </h1>
        <div className="text-[10px] text-[#735e4b] font-mono">
          Số thụ lý: <span className="font-bold text-[#1c1917]">{docketNumber}</span>
          {caseName && <span> • Vụ án: <span className="italic">{caseName}</span></span>}
        </div>
      </div>

      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};
