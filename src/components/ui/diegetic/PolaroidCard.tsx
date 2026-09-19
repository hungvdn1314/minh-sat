import React from 'react';

export interface PolaroidCardProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  showPaperclip?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: 'square' | 'portrait' | 'video';
  onClick?: () => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  src,
  alt,
  title,
  subtitle,
  showPaperclip = true,
  className = '',
  imageClassName = '',
  aspectRatio = 'portrait',
  onClick
}) => {
  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    video: 'aspect-video'
  };

  return (
    <div
      onClick={onClick}
      className={`relative polaroid-card select-none group cursor-pointer ${className}`}
    >
      {/* Metal Paperclip */}
      {showPaperclip && (
        <div
          className="absolute -top-3 left-6 w-4 h-9 border-2 border-stone-400 rounded-full bg-stone-100/10 shadow-md pointer-events-none z-20"
          style={{ transform: 'rotate(-4deg)' }}
        />
      )}

      {/* Photo Frame with subtle vintage vignette */}
      <div className={`w-full overflow-hidden bg-stone-900 border border-stone-300 relative ${aspectClasses[aspectRatio]}`}>
        <img
          src={src}
          alt={alt}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/images/characters/son_neutral.jpg';
          }}
          className={`w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 ${imageClassName}`}
        />
        {/* Subtle photo film grain sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Handwritten or Typewritten Caption */}
      <div className="text-center mt-2.5 space-y-0.5 px-1">
        <h3 className="text-sm font-bold text-stone-900 font-dossier-serif leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[10px] font-mono text-stone-600 uppercase font-bold tracking-wider">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
