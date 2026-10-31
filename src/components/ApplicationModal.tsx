import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { PROGRAMMES_DATA } from '../data/mockData';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProgramme?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  preSelectedProgramme,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Colombo',
    programme: preSelectedProgramme || PROGRAMMES_DATA[0].title,
    qualification: 'G.C.E. Advanced Level (A/L) - Local',
    intake: 'September 2026 Intake',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [appRefNumber, setAppRefNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedProgramme) {
      setFormData((prev) => ({ ...prev, programme: preSelectedProgramme }));
    }
  }, [preSelectedProgramme]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please provide your full name, email, and contact phone number.');
      return;
    }
    setError(null);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setAppRefNumber(`BIET-2026-${randomNum}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-white text-[#111111] border-b border-neutral-200 p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close application form"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
            <span>Admissions · Colombo Campus</span>
          </div>

          <h2 id="app-modal-title" className="text-2xl font-extrabold text-[#111111]">
            Apply to BIET
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-neutral-600">
            Submit your application for the 2026/2027 intake. Our admissions team will contact you within 48 hours.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-[#FFCC00] text-[#111111] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Confirmed
                </span>
                <h3 className="text-2xl font-bold text-[#111111] mt-1">Application Received</h3>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-neutral-200 max-w-md mx-auto text-left space-y-2 shadow-xs">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Application Reference:</span>
                  <span className="font-mono font-bold text-[#111111]">{appRefNumber}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Candidate Name:</span>
                  <span className="font-semibold text-[#111111]">{formData.fullName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Selected Programme:</span>
                  <span className="font-semibold text-[#111111]">{formData.programme}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Intake:</span>
                  <span className="font-semibold text-[#111111]">{formData.intake}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                A confirmation email has been sent to <strong>{formData.email}</strong>.
                Please keep your reference number for future inquiries.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Programme & Intake Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Programme *
                  </label>
                  <select
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors cursor-pointer"
                  >
                    {PROGRAMMES_DATA.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.qualification})
                      </option>
                    ))}
                    <option value="General Engineering Admissions">General Engineering Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Intake *
                  </label>
                  <select
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors cursor-pointer"
                  >
                    <option value="September 2026 Intake">September 2026</option>
                    <option value="February 2027 Intake">February 2027</option>
                  </select>
                </div>
              </div>

              {/* Applicant Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Priyantha Silva"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. priyantha@example.lk"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+94 77 XXX XXXX"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    City / District
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Colombo, Kandy, Galle"
                    className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Educational Qualifications */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Highest Qualification
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors cursor-pointer"
                >
                  <option value="G.C.E. Advanced Level (A/L) - Local">
                    Sri Lankan G.C.E. A/L
                  </option>
                  <option value="Cambridge / Edexcel International A-Levels">
                    Cambridge / Edexcel International A-Levels
                  </option>
                  <option value="Engineering Foundation Diploma">
                    Engineering Foundation Diploma
                  </option>
                  <option value="NVQ Level 4/5 or Higher National Diploma">
                    NVQ Level 4 / 5 or Higher National Diploma
                  </option>
                  <option value="Awaiting A/L Exam Results">
                    Awaiting G.C.E. A/L Results
                  </option>
                </select>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Questions or qualifications notes..."
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors resize-none"
                />
              </div>

              {/* Notice */}
              <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-600 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#111111] shrink-0" />
                <span>Applications are handled securely by BIET Admissions.</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 text-[#111111]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
