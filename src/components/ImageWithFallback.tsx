import React, { useState, useEffect } from 'react';
import { ProgrammeIllustration } from './ProgrammeIllustration';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
  imageSvgType?: 'civil' | 'mechanical' | 'electrical' | 'software' | 'cyber' | 'quantity-surveying';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  fallbackText,
  imageSvgType,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    if (imageSvgType) {
      return <ProgrammeIllustration type={imageSvgType} className={className} />;
    }

    return (
      <div
        className={`bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center p-4 relative overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #FFFFFF 1px, transparent 1px),
              linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="w-8 h-8 rounded-lg bg-[#FFCC00]/20 text-[#FFCC00] flex items-center justify-center font-bold text-xs mb-2">
          BIET
        </div>
        <span className="text-[11px] text-neutral-400 font-medium text-center line-clamp-1 relative z-10">
          {fallbackText || alt || 'BIET Engineering & Technology'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-950 ${className}`}>
      {/* Background skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse pointer-events-none" />
      )}
      <img
        src={currentSrc}
        alt={alt || 'BIET Campus Visual'}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        loading="lazy"
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
