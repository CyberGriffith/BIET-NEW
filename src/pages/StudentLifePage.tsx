import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, HeartHandshake, Compass, CheckCircle2, MapPin, Sparkles, BookOpen, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';
import { CAMPUS_FACILITIES, STUDENT_ACTIVITIES_DATA } from '../data/mockData';
import { CampusFacility } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface StudentLifePageProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const StudentLifePage: React.FC<StudentLifePageProps> = ({
  onApplyClick,
  onProspectusClick,
}) => {
  const [activeFacility, setActiveFacility] = useState<CampusFacility>(CAMPUS_FACILITIES[0]);

  return (
    <div className="bg-white text-[#111111]">
      {/* Header Banner */}
      <section className="bg-white text-[#111111] py-14 lg:py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111]">
              <Link to="/" className="hover:underline text-neutral-500">Home</Link>
              <span aria-hidden="true" className="text-neutral-400">/</span>
              <span className="font-bold">Student Life</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/40 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Campus Experience</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
              Student Life &amp; Facilities
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
              Experience purpose-built engineering facilities, innovation societies, and a supportive community
              at BIET Colombo Campus.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
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
                Download Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Facilities Showcase */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Facilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Engineering &amp; Computing Facilities
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Explore specialized technical spaces for undergraduate experimentation and projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Facility Navigation List with Thumbnails */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Select Facility:
              </div>
              {CAMPUS_FACILITIES.map((facility) => {
                const isSelected = activeFacility.id === facility.id;
                return (
                  <button
                    key={facility.id}
                    onClick={() => setActiveFacility(facility)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center gap-3.5 ${
                      isSelected
                        ? 'bg-[#FFCC00] text-[#111111] border-[#FFCC00] shadow-sm font-bold'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-[#111111] hover:bg-neutral-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-neutral-300 bg-neutral-100">
                      <ImageWithFallback
                        src={facility.imageUrl}
                        alt={facility.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-85 truncate">
                          {facility.category}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#111111] shrink-0" />}
                      </div>
                      <div className="text-sm font-bold truncate mt-0.5">{facility.name}</div>
                      {facility.locationInCampus && (
                        <div className="text-[11px] text-neutral-600 mt-0.5 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-[#111111] shrink-0" />
                          <span className="truncate">{facility.locationInCampus}</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Facility Detailed View with Photo Banner */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm space-y-6">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-100">
                <ImageWithFallback
                  src={activeFacility.imageUrl}
                  alt={activeFacility.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-[#FFCC00] text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                      {activeFacility.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1.5">{activeFacility.name}</h3>
                  </div>
                  <div className="p-3 bg-[#FFCC00] rounded-xl text-[#111111] shrink-0 shadow-2xs">
                    <Building className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 space-y-6">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {activeFacility.description}
                </p>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                    Features &amp; Equipment
                  </div>
                  <ul className="space-y-2.5">
                    {activeFacility.features.map((feat: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-[#111111] mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Societies & Activities */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Activities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
              Clubs &amp; Societies
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Build leadership, teamwork, and industry networks through student-led societies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STUDENT_ACTIVITIES_DATA.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl border border-neutral-200 hover:border-[#FFCC00] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden border-b border-neutral-100 bg-neutral-100">
                    <ImageWithFallback
                      src={act.imageUrl}
                      alt={act.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4">
                      <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#FFCC00] uppercase tracking-wider">
                        {act.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#111111]">{act.name}</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {act.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs text-neutral-700">
                      {act.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-[#111111] font-bold">·</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-100 text-xs text-neutral-500 mt-4">
                  Open to all BIET students
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Support Services */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                <HeartHandshake className="w-4 h-4 text-[#111111]" />
                <span>Support Services</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                Student Advisory &amp; Career Mentorship
              </h2>
              <p className="text-base text-neutral-600 leading-relaxed">
                Dedicated support services to help students succeed academically and professionally.
              </p>

              <div className="space-y-3 text-sm text-neutral-700">
                <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
                  <h4 className="font-bold text-[#111111] mb-1">Academic Peer Tutoring</h4>
                  <p className="text-xs text-neutral-600">
                    Weekly tutorials in mathematics, thermodynamics, and programming.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
                  <h4 className="font-bold text-[#111111] mb-1">Career &amp; Internship Desk</h4>
                  <p className="text-xs text-neutral-600">
                    CV preparation, mock interviews, and industry placements in Sri Lanka.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
                  <h4 className="font-bold text-[#111111] mb-1">Student Welfare Advisory</h4>
                  <p className="text-xs text-neutral-600">
                    Personal and academic support to ensure student well-being.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 bg-white text-[#111111] rounded-3xl border-2 border-neutral-200 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-[#111111]">Colombo Campus Life</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Located in Colombo with easy transport access and urban conveniences.
              </p>

              <div className="space-y-3 pt-2 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                  <span>Public transit access and student parking options.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                  <span>On-campus cafeteria with meal options.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                  <span>24/7 security and campus safety protocols.</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onApplyClick}
                  className="w-full py-3.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
