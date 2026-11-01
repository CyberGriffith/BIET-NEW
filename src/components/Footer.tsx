import React from 'react';
import { Link } from 'react-router-dom';
import { INSTITUTION_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import bietLogo from '../assets/biet-campus-logo-scaled.png';

interface FooterProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onApplyClick,
  onProspectusClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white border-t border-neutral-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-neutral-800">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block bg-white px-3 py-1.5 rounded-full shadow-xs focus:outline-none focus:ring-2 focus:ring-[#FFCC00] hover:scale-[1.01] transition-transform duration-200">
              <img
                src={bietLogo}
                alt="British Institute of Engineering and Technology (BIET) Official Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
              The British Institute of Engineering and Technology (BIET) delivers higher education in Engineering,
              Computing, and Built Environment modeled on British curricula in Sri Lanka.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={INSTITUTION_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="BIET on LinkedIn"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#FFCC00] hover:text-[#111111] text-neutral-300 border border-neutral-800 flex items-center justify-center transition-colors text-xs font-bold"
              >
                in
              </a>
              <a
                href={INSTITUTION_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="BIET on Facebook"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#FFCC00] hover:text-[#111111] text-neutral-300 border border-neutral-800 flex items-center justify-center transition-colors text-xs font-bold"
              >
                fb
              </a>
              <a
                href={INSTITUTION_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="BIET on Instagram"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#FFCC00] hover:text-[#111111] text-neutral-300 border border-neutral-800 flex items-center justify-center transition-colors text-xs font-bold"
              >
                ig
              </a>
              <a
                href={INSTITUTION_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="BIET on YouTube"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#FFCC00] hover:text-[#111111] text-neutral-300 border border-neutral-800 flex items-center justify-center transition-colors text-xs font-bold"
              >
                yt
              </a>
            </div>
          </div>

          {/* Academic Schools */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Disciplines</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/programmes?category=engineering" className="hover:text-[#FFCC00] transition-colors">
                  Civil &amp; Structural Engineering
                </Link>
              </li>
              <li>
                <Link to="/programmes?category=engineering" className="hover:text-[#FFCC00] transition-colors">
                  Mechanical &amp; Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/programmes?category=engineering" className="hover:text-[#FFCC00] transition-colors">
                  Electrical &amp; Electronic Systems
                </Link>
              </li>
              <li>
                <Link to="/programmes?category=computing" className="hover:text-[#FFCC00] transition-colors">
                  Software Engineering &amp; Cloud
                </Link>
              </li>
              <li>
                <Link to="/programmes?category=computing" className="hover:text-[#FFCC00] transition-colors">
                  Cyber Security &amp; Networks
                </Link>
              </li>
              <li>
                <Link to="/programmes?category=built-environment" className="hover:text-[#FFCC00] transition-colors">
                  Quantity Surveying &amp; Built Assets
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Institutional Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/" className="hover:text-[#FFCC00] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find-my-path" className="hover:text-[#FFCC00] text-[#FFCC00] font-semibold transition-colors flex items-center gap-1">
                  <span>Find My Path Tool</span>
                  <span className="text-[10px] bg-[#FFCC00]/20 text-[#FFCC00] px-1.5 py-0.2 rounded font-extrabold">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFCC00] transition-colors">
                  About BIET
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="hover:text-[#FFCC00] transition-colors">
                  Programmes
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#FFCC00] transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/student-life" className="hover:text-[#FFCC00] transition-colors">
                  Student Life
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-[#FFCC00] transition-colors">
                  News &amp; Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFCC00] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  onClick={onProspectusClick}
                  className="hover:text-[#FFCC00] transition-colors text-left cursor-pointer"
                >
                  Prospectus
                </button>
              </li>
              <li>
                <button
                  onClick={onApplyClick}
                  className="text-[#FFCC00] hover:underline transition-colors text-left font-bold cursor-pointer"
                >
                  Apply Now
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Campus Office</span>
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFCC00] mt-0.5 shrink-0" />
                <span>{INSTITUTION_INFO.campusAddressPlaceholder}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFCC00] mt-0.5 shrink-0" />
                <span>{INSTITUTION_INFO.telephonePlaceholder}</span>
              </div>
              <div className="flex items-start gap-2">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25D366] mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.835 11.835 0 005.712 1.461h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a
                  href={`https://wa.me/${(INSTITUTION_INFO.whatsappNumber || '94112345678').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello BIET, I would like to know more about your programmes.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp Admissions
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFCC00] mt-0.5 shrink-0" />
                <span>{INSTITUTION_INFO.emailPlaceholder}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onApplyClick}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-colors cursor-pointer text-center shadow-xs"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory Governance Statement (clean and brief) */}
        <div className="py-5 border-b border-neutral-800 text-xs text-neutral-400 leading-relaxed">
          <p>
            <span className="text-white font-semibold">Institutional Notice: </span>
            British Institute of Engineering and Technology (BIET) · Colombo Campus, Sri Lanka. Partner details and formal accreditations subject to official publication.
          </p>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {currentYear} British Institute of Engineering and Technology (BIET). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Enrollment
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white hover:text-[#FFCC00] transition-colors cursor-pointer font-bold"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FFCC00]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
