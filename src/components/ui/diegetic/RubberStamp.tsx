import React from 'react';

export interface RubberStampProps {
  children: React.ReactNode;
  variant?: 'red' | 'amber' | 'green';
  rotation?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RubberStamp: React.FC<RubberStampProps> = ({
  children,
  variant = 'red',
  rotation,
  className = '',
  size = 'md'
}) => {
  const variantClasses = {
    red: 'stamp-red text-red-500 border-red-600 bg-red-950/20',
    amber: 'stamp-amber text-amber-500 border-amber-600 bg-amber-950/20',
    green: 'stamp-green text-emerald-500 border-emerald-600 bg-emerald-950/20'
  };

  const defaultRotations = {
    red: -3,
    amber: 2,
    green: -1
  };

  const rot = rotation !== undefined ? rotation : defaultRotations[variant];

  const sizeClasses = {
    sm: 'text-[9px] px-1.5 py-0.5 border',
    md: 'text-[10px] px-2.5 py-1 border-2',
    lg: 'text-xs px-3.5 py-1.5 border-2'
  };

  return (
    <span
      className={`rubber-stamp font-mono font-extrabold uppercase tracking-widest select-none inline-block ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {children}
    </span>
  );
};
