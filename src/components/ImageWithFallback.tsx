import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (fallbackSrc && src !== fallbackSrc) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !src) {
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
        src={src}
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
