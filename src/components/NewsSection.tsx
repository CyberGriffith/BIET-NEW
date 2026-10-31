import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { NEWS_DATA } from '../data/mockData';
import { NewsItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface NewsSectionProps {
  onSelectArticle: (article: NewsItem) => void;
  onApplyClick: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle }) => {
  // Maximum 3 cards as requested
  const latestNews = NEWS_DATA.slice(0, 3);

  return (
    <section id="news" className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>News &amp; Events</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
              Latest News &amp; Events
            </h2>
            <p className="text-base text-neutral-600">
              Campus updates, intake announcements, and upcoming events.
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#B38F00] transition-colors group shrink-0 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-[#FFCC00] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Exactly 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {latestNews.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#FFCC00] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Large Photographic Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#FFCC00] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] group-hover:text-black leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Action Strip */}
              <div className="px-6 sm:px-8 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100 text-xs">
                <span className="text-neutral-500 font-medium">{item.readTime}</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#111111] group-hover:text-black">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFCC00] group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
