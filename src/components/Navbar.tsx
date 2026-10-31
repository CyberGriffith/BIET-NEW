import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';
import bietLogo from '../assets/biet-campus-logo-scaled.png';

interface NavbarProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onApplyClick,
  onProspectusClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About BIET', path: '/about' },
    { label: 'Programmes', path: '/programmes' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Student Life', path: '/student-life' },
    { label: 'News & Events', path: '/news' },
    { label: 'Contact', path: '/contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky z-40 w-full px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300 ease-out ${
        isScrolled ? 'top-1.5 sm:top-2.5' : 'top-3 sm:top-5'
      }`}
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Main Floating Smoky Graphite Liquid-Glass Navigation Island */}
        <div
          className={`liquid-glass-panel animate-nav-float rounded-full transition-all duration-300 ease-out relative flex items-center justify-between gap-3 sm:gap-6 overflow-hidden ${
            isScrolled
              ? 'liquid-glass-scrolled px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-2xl shadow-black/60'
              : 'px-4 sm:px-6 py-2.5 sm:py-3.5 shadow-xl shadow-black/40'
          }`}
        >
          {/* Subtle moving light reflection across the graphite glass background */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -inset-y-4 w-44 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent animate-glass-sweep pointer-events-none" />
          </div>

          {/* Subtle Silver Metallic Edge Glare on Rim */}
          <div
            className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none rounded-full"
            aria-hidden="true"
          />

          {/* Zone 1: Official BIET Logo (Crisp, Clean & Unobstructed with Original Proportions) */}
          <div className="flex items-center shrink-0 relative z-10">
            <Link
              to="/"
              className={`flex items-center justify-center shrink-0 bg-white rounded-full shadow-xs focus-visible:outline-2 focus-visible:outline-[#FFCC00] focus-visible:outline-offset-4 transition-all duration-300 hover:scale-[1.01] ${
                isScrolled
                  ? 'pl-3.5 pr-2.5 sm:pl-4 sm:pr-3 py-1 sm:py-1.5'
                  : 'pl-4 pr-3 sm:pl-5 sm:pr-3.5 py-1.5 sm:py-2'
              }`}
              aria-label="British Institute of Engineering and Technology (BIET) - Homepage"
            >
              <img
                src={bietLogo}
                alt="British Institute of Engineering and Technology (BIET) Official Logo"
                className={`w-auto object-contain transition-all duration-300 block shrink-0 ${
                  isScrolled
                    ? 'h-7 sm:h-8.5 max-w-[145px] sm:max-w-[190px]'
                    : 'h-8 sm:h-10 md:h-11 max-w-[165px] sm:max-w-[225px]'
                }`}
                style={{ objectFit: 'contain' }}
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Zone 2: Navigation Links (White text with BIET Yellow hover & active indicator) */}
          <nav
            className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-white/90 relative z-10"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-link-item relative px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'active-link text-[#FFCC00] font-bold bg-white/10 shadow-xs'
                      : 'text-white/90 hover:text-[#FFCC00] hover:bg-white/[0.08]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Tablet Nav (Medium Screens) */}
          <nav
            className="hidden lg:flex xl:hidden items-center gap-1 text-xs font-medium text-white/90 relative z-10"
            aria-label="Tablet navigation"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-link-item relative px-2.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'active-link text-[#FFCC00] font-bold bg-white/10 shadow-xs'
                      : 'text-white/90 hover:text-[#FFCC00] hover:bg-white/[0.08]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative z-10">
            {/* Download Prospectus Button: Smoky Glass with Silver Border */}
            <button
              onClick={onProspectusClick}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full backdrop-blur-md shadow-xs hover:shadow transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer ${
                isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-3.5 sm:px-4 py-2 text-xs'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-white/90" />
              <span>Prospectus</span>
            </button>

            {/* Glossy BIET Yellow Apply Now Button */}
            <button
              onClick={onApplyClick}
              className={`liquid-yellow-btn relative inline-flex items-center justify-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#111111] rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer group overflow-hidden ${
                isScrolled ? 'px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs' : 'px-4 sm:px-5 py-2 sm:py-2.5'
              }`}
            >
              <span
                className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-20 -translate-x-[200%] group-hover:translate-x-[260%] transition-transform duration-700 ease-out pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10">Apply Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Smoky Graphite Glass Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 liquid-glass-drawer rounded-3xl p-5 shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-sm transition-all duration-150 ${
                      active
                        ? 'bg-white/15 text-[#FFCC00] font-bold border-l-4 border-[#FFCC00] shadow-xs'
                        : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Drawer Actions */}
            <div className="pt-4 mt-3 border-t border-white/15 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onProspectusClick();
                }}
                className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Download Prospectus</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onApplyClick();
                }}
                className="liquid-yellow-btn w-full py-3 px-4 inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#111111] rounded-2xl transition-all shadow-md cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4 h-4 text-[#111111]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
