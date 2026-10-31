import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { NEWS_DATA, EVENTS_DATA } from '../data/mockData';
import { NewsItem } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface NewsEventsPageProps {
  onSelectArticle: (article: NewsItem) => void;
  onApplyClick: () => void;
}

export const NewsEventsPage: React.FC<NewsEventsPageProps> = ({
  onSelectArticle,
  onApplyClick,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'events'>('all');
  const [newsFilter, setNewsFilter] = useState<string>('all');
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Admissions', value: 'Admissions' },
    { label: 'Notices', value: 'Academic Notice' },
    { label: 'Lectures', value: 'Guest Lecture' },
    { label: 'Achievements', value: 'Student Achievement' },
  ];

  const filteredNews =
    newsFilter === 'all'
      ? NEWS_DATA
      : NEWS_DATA.filter((n) => n.category === newsFilter);

  const handleRegisterEvent = (eventId: string) => {
    setRegisteredEventId(eventId);
    setTimeout(() => {
      setRegisteredEventId(null);
    }, 4000);
  };

  return (
    <div className="bg-white text-[#111111]">
      {/* Page Header */}
      <section className="bg-white text-[#111111] py-14 lg:py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111]">
              <Link to="/" className="hover:underline text-neutral-500">Home</Link>
              <span aria-hidden="true" className="text-neutral-400">/</span>
              <span className="font-bold">News &amp; Events</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/40 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Campus Updates</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
              News &amp; Events
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
              Stay informed on intake dates, guest lectures, technical symposiums, and institutional announcements at BIET.
            </p>

            {/* Segmented Tab Filter */}
            <div className="mt-8 flex items-center gap-2 p-1.5 bg-white border border-neutral-200 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#FFCC00] text-[#111111] font-bold shadow-xs'
                    : 'text-neutral-600 hover:text-[#111111] hover:bg-neutral-50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'news'
                    ? 'bg-[#FFCC00] text-[#111111] font-bold shadow-xs'
                    : 'text-neutral-600 hover:text-[#111111] hover:bg-neutral-50'
                }`}
              >
                News
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'events'
                    ? 'bg-[#FFCC00] text-[#111111] font-bold shadow-xs'
                    : 'text-neutral-600 hover:text-[#111111] hover:bg-neutral-50'
                }`}
              >
                Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {(activeTab === 'all' || activeTab === 'events') && (
        <section className="py-20 bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                <span className="w-6 h-0.5 bg-[#FFCC00]" />
                <span>Calendar</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#111111]">
                Upcoming Events
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Technical lectures, open days, and student showcases in Colombo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EVENTS_DATA.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl border border-neutral-200 hover:border-[#FFCC00] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden border-b border-neutral-100 bg-neutral-100">
                      <ImageWithFallback
                        src={evt.imageUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="px-2.5 py-0.5 bg-black/80 text-[#FFCC00] font-bold rounded text-[10px] uppercase tracking-wider backdrop-blur-md">
                          {evt.category}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded">
                          Colombo Campus
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold text-[#111111] leading-snug group-hover:text-black">{evt.title}</h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{evt.description}</p>

                      <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#111111] shrink-0" />
                          <span className="font-semibold text-neutral-800">{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#111111] shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#111111] shrink-0" />
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      {evt.registrationRequired ? 'Registration required' : 'Open attendance'}
                    </span>

                    {registeredEventId === evt.id ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-[#FFCC00]/20 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />
                        <span>Registered</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRegisterEvent(evt.id)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg transition-colors cursor-pointer"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Articles Section */}
      {(activeTab === 'all' || activeTab === 'news') && (
        <section className="py-20 bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                  <span className="w-6 h-0.5 bg-[#FFCC00]" />
                  <span>Notices</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#111111]">
                  Official Notices &amp; News
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Read announcements, student achievements, and admissions notices.
                </p>
              </div>

              {/* News Category Filter */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-neutral-200 rounded-xl w-fit">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setNewsFilter(cat.value)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      newsFilter === cat.value
                        ? 'bg-[#FFCC00] text-[#111111] font-bold shadow-xs'
                        : 'text-neutral-600 hover:text-[#111111] hover:bg-neutral-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredNews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle(item)}
                  className="bg-white rounded-3xl border border-neutral-200 hover:border-[#FFCC00] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden border-b border-neutral-100 bg-neutral-100">
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3">
                        <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-[#FFCC00] uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                        <Calendar className="w-3 h-3 text-[#111111]" />
                        <span>{item.date}</span>
                      </div>

                      <h3 className="text-sm font-bold text-[#111111] group-hover:text-black transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between text-xs mt-3">
                    <span className="text-neutral-500">{item.readTime}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#111111] group-hover:text-black">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FFCC00] group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Media Inquiries Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
            Media Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto">
            For press releases and verification inquiries, please reach the Office of the Registrar.
          </p>
          <div className="pt-2">
            <button
              onClick={onApplyClick}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
