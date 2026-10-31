import React from 'react';
import { X, Calendar, Clock, User, Share2 } from 'lucide-react';
import { NewsItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface NewsArticleModalProps {
  article: NewsItem | null;
  onClose: () => void;
  onApplyClick: () => void;
}

export const NewsArticleModal: React.FC<NewsArticleModalProps> = ({
  article,
  onClose,
  onApplyClick,
}) => {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Article Featured Photographic Banner */}
        {article.imageUrl && (
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-100">
            <ImageWithFallback
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-neutral-700 hover:text-black bg-white/90 hover:bg-white backdrop-blur-md rounded-full transition-colors cursor-pointer z-10 shadow-sm"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-2.5 py-1 rounded bg-[#FFCC00] text-[10px] font-bold text-[#111111] uppercase tracking-wider">
                {article.category}
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white text-[#111111] p-6 sm:p-8 relative border-b border-neutral-200">
          {!article.imageUrl && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black bg-neutral-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {!article.imageUrl && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>{article.category} · Official Institutional Release</span>
            </div>
          )}

          <h2 id="news-modal-title" className="text-xl sm:text-2xl font-bold text-[#111111] pr-8 leading-snug">
            {article.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mt-4 pt-4 border-t border-neutral-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#111111]" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#111111]" />
              <span>{article.readTime}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-[#111111]" />
              <span>{article.author}</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[55vh] overflow-y-auto text-sm text-neutral-700 leading-relaxed bg-white">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-neutral-200 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">BIET News</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApplyClick();
              }}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
