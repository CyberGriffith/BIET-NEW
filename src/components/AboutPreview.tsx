import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutPreviewProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Short, Clear Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Welcome to BIET</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-[1.15] text-balance">
              British Standards. Practical Engineering.
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              BIET delivers industry-aligned higher education across Engineering, Computing, and the Built
              Environment in Sri Lanka. We combine British curricula with hands-on laboratory practice to prepare
              future-ready engineers.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#B38F00] transition-colors group cursor-pointer"
              >
                <span>About BIET</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FFCC00]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photograph */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] border border-neutral-200 group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=85"
                alt="BIET institutional campus architecture in Colombo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-2.5 py-1 rounded bg-[#FFCC00] text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                  Colombo Campus
                </span>
                <p className="text-sm font-bold mt-2 text-white">
                  Academic campus and engineering testing laboratories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
