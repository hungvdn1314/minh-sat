import React from 'react';

export interface EvidenceTentMarkerProps {
  number: string | number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const EvidenceTentMarker: React.FC<EvidenceTentMarkerProps> = ({
  number,
  label,
  size = 'md',
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-7 h-8 text-xs',
    md: 'w-10 h-11 text-base',
    lg: 'w-14 h-15 text-xl'
  };

  return (
    <div
      onClick={onClick}
      className={`evidence-marker relative flex flex-col items-center justify-between rounded-t-sm select-none cursor-pointer hover:scale-110 transition-transform ${sizeClasses[size]} ${className}`}
      style={{
        clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
      }}
      title={label ? `Vật chứng #${number}: ${label}` : `Vật chứng #${number}`}
    >
      {/* Top bevel edge */}
      <div className="w-full h-1 bg-yellow-200/50" />

      {/* Heavy bold forensic stencil number */}
      <div className="font-mono font-black text-black leading-none my-auto">
        {number}
      </div>

      {/* Bottom forensic centimeter scale bar markings */}
      <div className="w-full h-1.5 bg-black flex justify-around items-end pb-0.5">
        <span className="w-0.5 h-1 bg-yellow-400" />
        <span className="w-0.5 h-1 bg-yellow-400" />
        <span className="w-0.5 h-1 bg-yellow-400" />
      </div>
    </div>
  );
};
