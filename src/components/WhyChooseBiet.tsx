import React from 'react';
import { GraduationCap, Microscope, Award } from 'lucide-react';

interface WhyChooseBietProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const WhyChooseBiet: React.FC<WhyChooseBietProps> = () => {
  const points = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#111111]" />,
      title: 'British Curriculum',
      description:
        'Curricula calibrated to UK engineering benchmarks, combining mathematical depth with practical problem-solving.',
    },
    {
      icon: <Microscope className="w-6 h-6 text-[#111111]" />,
      title: 'Hands-On Labs',
      description:
        'Specialized testing bays, robotics equipment, and computational suites providing practical laboratory experience.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#111111]" />,
      title: 'Industry Readiness',
      description:
        'Capstone projects, professional development, and mentorship structured for career success in modern engineering.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#111111] text-white border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFCC00]">
            <span className="w-6 h-0.5 bg-[#FFCC00]" />
            <span>Why Choose BIET</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Built for Academic &amp; Career Success
          </h2>
          <p className="text-base text-neutral-400">
            A focused learning environment combining international standards with practical application.
          </p>
        </div>

        {/* 3 Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {points.map((point, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 hover:border-[#FFCC00]/60 transition-all duration-300 space-y-4 shadow-xl group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFCC00] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{point.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
