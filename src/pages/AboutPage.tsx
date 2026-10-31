import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, ShieldCheck, Users, CheckCircle2, ArrowRight, Building2, BookOpen } from 'lucide-react';
import { LEADERSHIP_DATA, INSTITUTION_INFO } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface AboutPageProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onApplyClick,
  onProspectusClick,
}) => {
  const values = [
    {
      title: 'Academic Rigor',
      description:
        'Upholding the theoretical depth and precision demanded by British engineering benchmark statements.',
    },
    {
      title: 'Hands-On Labs',
      description:
        'Ensuring theoretical formulations are verified through weekly laboratory experimentation and testing.',
    },
    {
      title: 'Professional Ethics',
      description:
        'Cultivating engineering ethics, safety standards, and environmental responsibility across all built assets.',
    },
    {
      title: 'Industry Relevance',
      description:
        'Maintaining consultative relationships with industry practitioners to ensure contemporary curricula.',
    },
    {
      title: 'Global Progression',
      description:
        'Structuring qualifications to support seamless pathways into international bachelor’s top-ups and research.',
    },
    {
      title: 'Innovation & Agility',
      description:
        'Fostering independent inquiry and computational analysis to solve emerging engineering challenges.',
    },
  ];

  return (
    <div className="bg-white text-[#111111]">
      {/* Page Header */}
      <section className="bg-white text-[#111111] py-14 lg:py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] mb-3">
            <Link to="/" className="hover:underline text-neutral-500">Home</Link>
            <span aria-hidden="true" className="text-neutral-400">/</span>
            <span className="font-bold">About BIET</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/40 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Higher Education Institution · Sri Lanka</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
              Advancing Engineering Excellence
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
              The British Institute of Engineering and Technology (BIET) delivers higher education across
              engineering, computing, and the built environment with British curricula in Sri Lanka.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#111111]">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-neutral-200 shadow-2xs font-semibold">
                <Building2 className="w-4 h-4 text-[#111111]" />
                <span>Colombo Campus, Sri Lanka</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-neutral-200 shadow-2xs font-semibold">
                <BookOpen className="w-4 h-4 text-[#111111]" />
                <span>British Curriculum Benchmarks</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Overview */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <span className="w-6 h-0.5 bg-[#FFCC00]" />
                <span>Our Heritage &amp; Purpose</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
                Theory and Laboratory Practice Combined
              </h2>

              <p className="text-base text-neutral-600 leading-relaxed">
                BIET was established to provide students in Sri Lanka with internationally benchmarked engineering
                and computing education. We integrate physical experimentation, workshops, and computer-aided engineering
                tools directly into our undergraduate curriculum.
              </p>

              <p className="text-base text-neutral-600 leading-relaxed">
                From our Colombo campus, students have regular access to materials testing bays, robotics suites, and
                computing laboratories, preparing them for technical leadership in Sri Lanka and abroad.
              </p>

              <div className="pt-3 flex flex-wrap gap-4">
                <button
                  onClick={onApplyClick}
                  className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Apply Now
                </button>
                <button
                  onClick={onProspectusClick}
                  className="px-6 py-3.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
                >
                  Download Prospectus
                </button>
              </div>
            </div>

            {/* Quick Stats / Institutional Profile */}
            <div className="lg:col-span-5 bg-[#111111] text-white rounded-3xl border border-neutral-800 p-8 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-white pb-3 border-b border-neutral-800 flex items-center justify-between">
                <span>Institutional Profile</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFCC00]" />
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-neutral-400 font-medium block">Institution</span>
                  <span className="text-white font-bold text-sm">{INSTITUTION_INFO.name}</span>
                </div>

                <div>
                  <span className="text-neutral-400 font-medium block">Location</span>
                  <span className="text-white font-bold text-sm">Colombo, Sri Lanka</span>
                </div>

                <div>
                  <span className="text-neutral-400 font-medium block">Academic Schools</span>
                  <span className="text-white font-bold text-sm">
                    School of Engineering · School of Computing &amp; IT · School of Built Environment
                  </span>
                </div>

                <div>
                  <span className="text-neutral-400 font-medium block">Award Pathways</span>
                  <span className="text-[#FFCC00] font-bold text-sm">
                    Higher National Diplomas (HND) · BEng (Hons) · BSc (Hons)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Institutional Direction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Vision &amp; Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 bg-white rounded-3xl border-2 border-neutral-200 hover:border-[#FFCC00] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-1 bg-[#FFCC00] mb-2" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <Target className="w-5 h-5 text-[#111111]" />
                <span>Our Vision</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">
                To be a leading institution for applied engineering rigor and technology education in South Asia.
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Developing graduates recognized for practical proficiency, problem-solving agility, and ethical stewardship.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 bg-white rounded-3xl border-2 border-neutral-200 hover:border-[#FFCC00] transition-all space-y-4 shadow-sm">
              <div className="w-12 h-1 bg-[#111111] mb-2" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <Compass className="w-5 h-5 text-[#111111]" />
                <span>Our Mission</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">
                Delivering high-caliber, British-benchmarked education through disciplined inquiry and laboratory immersion.
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Empowering students with hands-on skills, industry projects, and direct progression to recognized degrees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Institutional Values */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Core Values</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Our Guiding Principles
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              The principles guiding teaching, research ethics, and student development at BIET.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-[#FFCC00] transition-all space-y-3 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#111111]">0{idx + 1}.</span>
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                </div>
                <h3 className="text-base font-bold text-[#111111]">{val.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Leadership */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Faculty Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Deans &amp; Faculty Heads
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Academic leaders and chartered engineers dedicated to curriculum standards and student achievement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_DATA.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#FFCC00] transition-all group"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden border-b border-neutral-200 bg-neutral-100">
                    <ImageWithFallback
                      src={leader.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3">
                      <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#FFCC00] uppercase tracking-wider">
                        {leader.department.split('&')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 pb-2">
                    <h3 className="text-base font-bold text-[#111111]">{leader.name}</h3>
                    <div className="text-xs text-[#111111] font-semibold mt-0.5">{leader.role}</div>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-3 pt-3 border-t border-neutral-100">
                      {leader.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-2 text-[11px] text-neutral-400 border-t border-neutral-100">
                  BIET Colombo Campus
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            Explore Academic Opportunities
          </h2>
          <p className="text-sm text-neutral-600 max-w-xl mx-auto">
            Discover undergraduate degree programmes in Engineering, Computing, and Built Environment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/programmes"
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm"
            >
              Explore Programmes
            </Link>
            <button
              onClick={onApplyClick}
              className="px-6 py-3.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
