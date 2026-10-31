import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Admissions & Course Inquiries',
    department: 'School of Engineering',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email, and message inquiry.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Where is the BIET Campus located in Sri Lanka?',
      a: 'The BIET Campus is located in Colombo, Sri Lanka, accessible via main arterial bus and train routes.',
    },
    {
      q: 'Can students and parents tour the laboratories before enrolling?',
      a: 'Yes. Guided laboratory tours are available Monday through Saturday (8:30 AM to 5:30 PM).',
    },
    {
      q: 'What is the response time for admissions inquiries?',
      a: 'Our admissions desk reviews inquiries within 24 to 48 hours.',
    },
    {
      q: 'Are weekend or part-time study schedules available?',
      a: 'Yes. Selected engineering and built environment programmes offer weekend schedules for working professionals.',
    },
  ];

  return (
    <div className="bg-white text-[#111111]">
      {/* Header Banner */}
      <section className="bg-white text-[#111111] py-14 lg:py-20 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111]">
              <Link to="/" className="hover:underline text-neutral-500">Home</Link>
              <span aria-hidden="true" className="text-neutral-400">/</span>
              <span className="font-bold">Contact</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/40 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
              <span>Colombo Campus</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
              Contact Us
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
              Reach out to our admissions advisors or schedule a campus visit in Colombo, Sri Lanka.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#111111]">
              <span className="flex items-center gap-2 font-semibold">
                <Phone className="w-4 h-4 text-[#111111]" />
                <span>{INSTITUTION_INFO.telephonePlaceholder}</span>
              </span>
              <span className="flex items-center gap-2 font-semibold">
                <Mail className="w-4 h-4 text-[#111111]" />
                <span>{INSTITUTION_INFO.emailPlaceholder}</span>
              </span>
              <span className="flex items-center gap-2 font-semibold">
                <Clock className="w-4 h-4 text-[#111111]" />
                <span>{INSTITUTION_INFO.hours}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Campus Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 bg-[#111111] text-white rounded-3xl border border-neutral-800 space-y-6 shadow-xl">
                <div className="border-b border-neutral-800 pb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#FFCC00] mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                    <span>Campus Office</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">BIET Colombo Campus</h2>
                  <p className="text-xs text-neutral-400 mt-1">British Institute of Engineering and Technology</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[#FFCC00] rounded-xl text-[#111111] shrink-0 mt-0.5 shadow-2xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-semibold block">Location</span>
                      <span className="text-white font-bold">Colombo, Sri Lanka</span>
                      <p className="text-xs text-neutral-300 mt-0.5">{INSTITUTION_INFO.campusAddressPlaceholder}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[#FFCC00] rounded-xl text-[#111111] shrink-0 mt-0.5 shadow-2xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-semibold block">Telephone</span>
                      <span className="text-white font-bold">{INSTITUTION_INFO.telephonePlaceholder}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[#FFCC00] rounded-xl text-[#111111] shrink-0 mt-0.5 shadow-2xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-semibold block">Email</span>
                      <span className="text-white font-bold">{INSTITUTION_INFO.emailPlaceholder}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[#FFCC00] rounded-xl text-[#111111] shrink-0 mt-0.5 shadow-2xs">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase font-semibold block">Office Hours</span>
                      <span className="text-white font-bold">{INSTITUTION_INFO.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Location Photo Card */}
              <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                    alt="BIET Colombo campus facility entrance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#111111]/90 backdrop-blur-md text-[10px] font-bold text-[#FFCC00] uppercase tracking-wider">
                      <MapPin className="w-3 h-3 text-[#FFCC00]" />
                      <span>Colombo Campus</span>
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Centrally situated with convenient access to transit networks and visitor parking in Colombo.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#FFCC00] text-[#111111] rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111]">Message Sent</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting BIET. Our admissions desk will follow up within 24 to 48 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          inquiryType: 'Admissions & Course Inquiries',
                          department: 'School of Engineering',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 text-xs font-bold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111111]">Send a Message</h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Submit an inquiry regarding programmes, admission criteria, or campus visits.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

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
                        placeholder="e.g. Kasun Perera"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
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
                        placeholder="e.g. kasun@example.lk"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Telephone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+94 7X XXX XXXX"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors cursor-pointer"
                      >
                        <option value="Admissions & Course Inquiries">Admissions &amp; Courses</option>
                        <option value="Laboratory Tour Request">Campus Visit / Lab Tour</option>
                        <option value="Transfer / Direct Entry Credit Mapping">Direct Entry / Top-up</option>
                        <option value="Tuition Fee & Installment Structure">Tuition &amp; Fees</option>
                        <option value="General Administration">General Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors cursor-pointer"
                    >
                      <option value="School of Engineering">School of Engineering</option>
                      <option value="School of Computing & IT">School of Computing &amp; IT</option>
                      <option value="School of Built Environment">School of Built Environment</option>
                      <option value="Office of the Registrar">Admissions Office</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your question or message..."
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">
                      * Required
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
              <HelpCircle className="w-4 h-4 text-[#111111]" />
              <span>Advisory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-[#111111]">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#111111] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
