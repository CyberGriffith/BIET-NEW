import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyClick: () => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({
  isOpen,
  onClose,
  onApplyClick,
}) => {
  const [email, setEmail] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDownloading(true);

    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);

      // Create a clean simulated prospectus text download file for the user
      const prospectusContent = `BRITISH INSTITUTE OF ENGINEERING AND TECHNOLOGY (BIET)
COLOMBO CAMPUS, SRI LANKA
OFFICIAL PROSPECTUS & ACADEMIC GUIDE 2026/2027

=======================================================
INSTITUTIONAL INFORMATION
Institution: British Institute of Engineering and Technology (BIET)
Location: Colombo, Sri Lanka
Disciplines: School of Engineering | School of Computing & IT | School of Built Environment
Curricular Benchmark: British Engineering Framework
Statutory Note: Academic partnerships and awarding bodies are subject to formal confirmation.

=======================================================
FEATURED PROGRAMMES:
1. BEng (Hons) Civil & Structural Engineering
2. BEng (Hons) Mechanical & Manufacturing Engineering
3. BEng (Hons) Electrical & Electronic Systems Engineering
4. BSc (Hons) Software Engineering & Cloud Computing
5. BSc (Hons) Cyber Security & Network Engineering
6. BSc (Hons) Quantity Surveying & Commercial Management

=======================================================
ADMISSIONS CONTACT:
Email: info@biet.lk / admissions@biet.lk [Placeholder]
Telephone: +94 (0) 11 [Telephone Placeholder]
Campus Address: Colombo, Sri Lanka [Detailed Campus Address Placeholder]
Office Hours: Monday - Saturday (8:30 AM - 5:30 PM IST)
=======================================================
`;
      const blob = new Blob([prospectusContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BIET-Prospectus-2026-2027.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prospectus-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-white text-[#111111] border-b border-neutral-200 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
            <span>Academic Guide 2026/2027</span>
          </div>

          <h2 id="prospectus-modal-title" className="text-xl font-bold text-[#111111]">
            Download Prospectus
          </h2>

          <p className="mt-1 text-xs text-neutral-600">
            Get details on faculties, modules, laboratory facilities, and admissions.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {downloadComplete ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 bg-[#FFCC00] text-[#111111] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Prospectus Dispatched</h3>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
                Your prospectus download has started. A copy has also been sent to{' '}
                <strong>{email}</strong>.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onApplyClick();
                  }}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg cursor-pointer shadow-xs"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-neutral-200 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                  <BookOpen className="w-4 h-4 text-[#111111]" />
                  <span>Curriculum Breakdown Inside:</span>
                </div>
                <ul className="text-xs text-neutral-600 space-y-1 pl-6 list-disc">
                  <li>Civil, Mechanical &amp; Electrical Engineering syllabi</li>
                  <li>Software &amp; Cyber Security module breakdowns</li>
                  <li>Laboratory apparatus &amp; testing rig specifications</li>
                  <li>G.C.E. A/L &amp; Cambridge minimum grade requirements</li>
                </ul>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.lk"
                  className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">PDF Document · Free</span>
                <button
                  type="submit"
                  disabled={downloading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Preparing...' : 'Download Prospectus'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
