import React from 'react';

export interface DossierSheetProps {
  children: React.ReactNode;
  className?: string;
  hasFolderTab?: boolean;
  folderTabTitle?: string;
}

export const DossierSheet: React.FC<DossierSheetProps> = ({
  children,
  className = '',
  hasFolderTab = false,
  folderTabTitle
}) => {
  return (
    <div className={`relative dossier-sheet p-5 sm:p-6 rounded-sm text-[#1c1917] ${className}`}>
      {/* Optional Manila File Folder Tab */}
      {hasFolderTab && folderTabTitle && (
        <div className="absolute -top-6 left-6 px-4 py-1 bg-[#cbbda1] border-t-2 border-l-2 border-r-2 border-[#a8957c] rounded-t text-[10px] font-mono font-bold uppercase tracking-wider text-[#3d3124] shadow-sm">
          {folderTabTitle}
        </div>
      )}

      {/* Subtle paper age corner curl decoration */}
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gradient-to-tl from-[#9e8b6f] to-transparent pointer-events-none opacity-40" />

      {children}
    </div>
  );
};
