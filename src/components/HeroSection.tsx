import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProgrammes?: () => void;
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

interface SlideData {
  id: number;
  kicker: string;
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tabLabel: string;
  primaryCta: {
    label: string;
    type: 'link' | 'apply';
    to?: string;
  };
  secondaryCta?: {
    label: string;
    type: 'link' | 'apply';
    to?: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProgrammes,
  onApplyClick,
  onProspectusClick,
}) => {
  const slides: SlideData[] = [
    {
      id: 0,
      kicker: 'Welcome to BIET',
      headlinePrefix: 'Building Skills. ',
      headlineHighlight: 'Engineering Futures.',
      description:
        'Degree pathways in engineering and technology with British academic benchmarks in Sri Lanka.',
      imageUrl:
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2200&q=85',
      imageAlt: 'BIET university academic campus and lecture quadrangle',
      tabLabel: 'Welcome',
      primaryCta: {
        label: 'Explore Programmes',
        type: 'link',
        to: '/programmes',
      },
      secondaryCta: {
        label: 'About BIET',
        type: 'link',
        to: '/about',
      },
    },
    {
      id: 1,
      kicker: 'Engineering Education',
      headlinePrefix: 'Learn Beyond ',
      headlineHighlight: 'the Classroom.',
      description:
        'Practical laboratory training and industry-focused skills for modern engineering.',
      imageUrl:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2200&q=85',
      imageAlt: 'Engineering precision laboratory and prototyping equipment at BIET',
      tabLabel: 'Engineering',
      primaryCta: {
        label: 'Explore Programmes',
        type: 'link',
        to: '/programmes',
      },
    },
    {
      id: 2,
      kicker: 'Technology & Innovation',
      headlinePrefix: 'Shape the Future with ',
      headlineHighlight: 'Technology.',
      description:
        'Innovative computing and software degree programmes designed for industry.',
      imageUrl:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2200&q=85',
      imageAlt: 'Students and lecturers collaborating in technology innovation lab',
      tabLabel: 'Technology',
      primaryCta: {
        label: 'Explore Programmes',
        type: 'link',
        to: '/programmes',
      },
    },
    {
      id: 3,
      kicker: 'Admissions Open',
      headlinePrefix: 'Take the Next Step Towards ',
      headlineHighlight: 'Your Future.',
      description:
        'Enrol in undergraduate programmes for the 2026/2027 academic year.',
      imageUrl:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=85',
      imageAlt: 'University students consulting on admissions and academic pathways',
      tabLabel: 'Admissions',
      primaryCta: {
        label: 'Apply Now',
        type: 'apply',
      },
      secondaryCta: {
        label: 'Contact Us',
        type: 'link',
        to: '/contact',
      },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 5000;
  const TICK_INTERVAL = 50;

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const handleGoToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
        if (next >= 100) {
          handleNext();
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderCta = (
    cta: SlideData['primaryCta'] | SlideData['secondaryCta'],
    isPrimary: boolean
  ) => {
    if (!cta) return null;

    if (cta.type === 'apply') {
      return (
        <button
          key={cta.label}
          onClick={onApplyClick}
          className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg ${
            isPrimary
              ? 'text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800]'
              : 'text-white bg-black/40 hover:bg-black/60 border border-white/30 backdrop-blur-sm'
          }`}
        >
          <span>{cta.label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      );
    }

    return (
      <Link
        key={cta.label}
        to={cta.to || '/programmes'}
        className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg ${
          isPrimary
            ? 'text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800]'
            : 'text-white bg-black/40 hover:bg-black/60 border border-white/30 hover:border-white backdrop-blur-sm'
        }`}
      >
        <span>{cta.label}</span>
        {isPrimary && <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />}
      </Link>
    );
  };

  return (
    <section
      id="home"
      aria-label="BIET Institutional Hero Showcase"
      className="relative w-full bg-[#111111] text-white overflow-hidden min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Photographic Slides */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.imageAlt}
                loading={index === 0 ? 'eager' : 'lazy'}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          );
        })}

        {/* Minimal Transparent Overlay to preserve full photographic prominence */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Clean, Spacious Content Area Directly Over Photo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 relative z-10 w-full">
        <div className="relative min-h-[260px] sm:min-h-[280px] flex items-center max-w-3xl">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out ${
                  isActive
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider text-[#FFCC00]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00] animate-pulse" />
                    <span>{slide.kicker}</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] text-balance">
                    {slide.headlinePrefix}
                    <span className="text-[#FFCC00]">{slide.headlineHighlight}</span>
                  </h1>

                  <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {renderCta(slide.primaryCta, true)}
                    {slide.secondaryCta && renderCta(slide.secondaryCta, false)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Clean Controls */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-white/15 flex items-center justify-between gap-4">
          {/* Subtle Numbered Tabs with Progress Bar */}
          <div className="flex items-center gap-2 sm:gap-4">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleGoToSlide(index)}
                  className={`relative py-1.5 px-3 sm:px-4 rounded-lg text-left transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-white/50 hover:text-white/80 font-medium'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className={isActive ? 'text-[#FFCC00] font-mono' : 'text-white/40 font-mono'}>
                      0{index + 1}
                    </span>
                    <span className="hidden sm:inline text-xs">{slide.tabLabel}</span>
                  </div>
                  {/* Subtle active line indicator */}
                  <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    {isActive && (
                      <div
                        className="h-full bg-[#FFCC00] transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows & Pause */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#FFCC00]" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-black/40 hover:bg-[#FFCC00] text-white hover:text-[#111111] border border-white/20 hover:border-[#FFCC00] backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-black/40 hover:bg-[#FFCC00] text-white hover:text-[#111111] border border-white/20 hover:border-[#FFCC00] backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
