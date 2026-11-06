import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Clock, Calendar, Layers, ArrowRight, Download, SlidersHorizontal } from 'lucide-react';
import { PROGRAMMES_DATA } from '../data/mockData';
import { Programme, ProgrammeCategory } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface ProgrammesPageProps {
  onSelectProgramme?: (programme: Programme) => void;
  onApplyForProgramme: (programmeTitle: string) => void;
  onProspectusClick: () => void;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({
  onApplyForProgramme,
  onProspectusClick,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProgrammeCategory | null;

  const [activeCategory, setActiveCategory] = useState<ProgrammeCategory>(
    categoryParam && ['all', 'engineering', 'computing', 'built-environment'].includes(categoryParam)
      ? categoryParam
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Sync category state with URL search param
  useEffect(() => {
    if (categoryParam && ['all', 'engineering', 'computing', 'built-environment'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: ProgrammeCategory) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const categories: { label: string; value: ProgrammeCategory }[] = [
    { label: `All (${PROGRAMMES_DATA.length})`, value: 'all' },
    { label: `Engineering (${PROGRAMMES_DATA.filter((p) => p.category === 'engineering').length})`, value: 'engineering' },
    { label: `Computing & IT (${PROGRAMMES_DATA.filter((p) => p.category === 'computing').length})`, value: 'computing' },
    { label: `Built Environment (${PROGRAMMES_DATA.filter((p) => p.category === 'built-environment').length})`, value: 'built-environment' },
  ];

  const filteredProgrammes = useMemo(() => {
    return PROGRAMMES_DATA.filter((prog) => {
      const matchesCategory =
        activeCategory === 'all' || prog.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.coreModulesYear1.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prog.coreModulesYear2.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        prog.coreModulesYear3.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-white text-[#111111]">
      {/* Introduction & Header Section */}
      <section className="bg-white text-[#111111] py-14 lg:py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111]">
              <Link to="/" className="hover:underline text-neutral-500">Home</Link>
              <span aria-hidden="true" className="text-neutral-400">/</span>
              <span className="font-bold">Programmes</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/40 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Academic Catalogue</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
              Academic Programmes
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
              Undergraduate degree and diploma programmes combining British curricula with laboratory application
              in Colombo, Sri Lanka.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onProspectusClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#111111]" />
                <span>Prospectus</span>
              </button>

              <button
                onClick={() => onApplyForProgramme('General Engineering Admissions')}
                className="px-6 py-3.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalogue Section */}
      <section className="py-16 lg:py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls: Category Filter Tabs & Search Bar */}
          <div className="bg-[#111111] p-4 sm:p-5 rounded-2xl border border-neutral-800 shadow-xl mb-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 text-white">
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.value
                      ? 'bg-[#FFCC00] text-[#111111] font-bold shadow-xs'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Search Bar */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programmes..."
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-neutral-900 border border-neutral-700 focus:border-[#FFCC00] focus:ring-1 focus:ring-[#FFCC00] rounded-xl outline-none transition-colors text-white placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Count */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 px-1">
            <span>
              Showing <strong>{filteredProgrammes.length}</strong> programmes
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
          </div>

          {/* Programme Cards Grid */}
          {filteredProgrammes.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-neutral-200 shadow-sm">
              <SlidersHorizontal className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900">No matching programmes</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Try searching for other engineering or computing keywords.
              </p>
              <button
                onClick={() => {
                  handleCategoryChange('all');
                  setSearchQuery('');
                }}
                className="mt-5 px-5 py-2.5 text-xs font-semibold text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProgrammes.map((programme) => (
                <div
                  key={programme.id}
                  className="flex flex-col justify-between bg-white rounded-3xl border border-neutral-200 hover:border-[#FFCC00] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden group"
                >
                  {/* Card Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden border-b border-neutral-100 bg-neutral-100">
                    <ImageWithFallback
                      src={programme.imageUrl}
                      alt={programme.title}
                      imageSvgType={programme.imageSvgType}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[11px] font-bold text-[#FFCC00] uppercase tracking-wider">
                        {programme.school.replace('School of ', '')}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded">
                        {programme.qualification.split('/')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* School & Award Level */}
                      <div className="flex items-center justify-between text-xs text-neutral-500 flex-wrap gap-1">
                        <span className="font-semibold text-neutral-900">{programme.school}</span>
                        {programme.affiliatedInstitution && (
                          <span className="px-2 py-0.5 rounded bg-black text-[#FFCC00] text-[10px] font-bold uppercase tracking-wider">
                            {programme.affiliatedInstitution}
                          </span>
                        )}
                      </div>

                      {/* Programme Name */}
                      <h2 className="text-xl font-bold text-[#111111] group-hover:text-black transition-colors leading-snug">
                        <Link to={`/programmes/${programme.id}`} className="hover:underline">
                          {programme.title}
                        </Link>
                      </h2>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                        {programme.overview}
                      </p>

                      {/* Duration & Mode */}
                      <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                          <span>Duration: {programme.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                          <span>Mode: {programme.studyMode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                          <span>Intakes: {programme.intakes.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: View Details & Apply Now */}
                    <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <Link
                        to={`/programmes/${programme.id}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />
                      </Link>

                      <button
                        onClick={() => onApplyForProgramme(programme.title)}
                        className="inline-flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                      >
                        <span>Apply Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
