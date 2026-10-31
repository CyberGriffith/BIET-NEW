import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface CampusLifeSectionProps {
  onApplyClick: () => void;
}

export const CampusLifeSection: React.FC<CampusLifeSectionProps> = () => {
  const experiences = [
    {
      title: 'Robotics & Automation Labs',
      caption: 'Hardware test benches, microcontrollers, and precision robotics equipment.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Computing & Cyber Suites',
      caption: 'Modern workstations and collaborative network infrastructure.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Digital Library & Study Commons',
      caption: 'Quiet academic study spaces and engineering research resources.',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Student Societies & Clubs',
      caption: 'Student-led engineering societies, hackathons, and activities.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section id="student-life" className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Campus Life</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
              Life &amp; Learning at BIET
            </h2>
            <p className="text-base text-neutral-600">
              Specialized laboratories, collaborative spaces, and an active student community in Colombo.
            </p>
          </div>

          <Link
            to="/student-life"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#B38F00] transition-colors group shrink-0 cursor-pointer"
          >
            <span>Student Life</span>
            <ArrowRight className="w-4 h-4 text-[#FFCC00] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Large Photographs with Short Captions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-neutral-200 transition-all duration-300 aspect-[16/10]"
            >
              <ImageWithFallback
                src={exp.imageUrl}
                alt={exp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#FFCC00] text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                  Campus
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {exp.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 max-w-lg leading-relaxed">
                  {exp.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
