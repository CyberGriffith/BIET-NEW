import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';
import { ImageWithFallback } from './ImageWithFallback';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    programme: 'General Engineering Admissions',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FFFFFF] text-[#111111] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
            <span className="w-6 h-0.5 bg-[#FFCC00]" />
            <span>Connect with BIET</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight text-balance">
            Contact Admissions &amp; Academic Inquiries
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Our admissions counselors, programme coordinators, and registrar staff are available to assist
            prospective students, parents, and industry partners in Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Institutional Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Photographic Card */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-sm aspect-video">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"
                alt="BIET Colombo Academic Campus Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="px-2 py-0.5 bg-[#FFCC00] text-[#111111] text-[10px] font-black uppercase tracking-wider rounded">
                  Colombo Campus
                </span>
                <p className="text-xs font-bold mt-1 text-white">Faculty of Engineering &amp; Technology</p>
              </div>
            </div>

            <div className="p-8 bg-white text-[#111111] rounded-2xl border border-neutral-200 space-y-6 shadow-sm">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Colombo Campus
                </span>
                <h3 className="text-xl font-bold text-[#111111] mt-1">British Institute of Engineering and Technology</h3>
              </div>

              {/* Contact Detail Blocks */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg text-[#111111] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase font-semibold block">Campus Address</span>
                    <span className="text-[#111111] font-medium">Colombo, Sri Lanka</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg text-[#111111] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase font-semibold block">Telephone</span>
                    <span className="text-[#111111] font-medium">+94 11 234 5678</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg text-[#111111] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase font-semibold block">Email</span>
                    <span className="text-[#111111] font-medium">info@biet.lk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neutral-100 rounded-lg text-[#111111] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase font-semibold block">Office Hours</span>
                    <span className="text-[#111111] font-medium">Monday – Saturday: 8:30 AM – 5:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-50 rounded-2xl border border-neutral-200 p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#FFCC00] text-[#111111] rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111]">Inquiry Received Successfully</h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting the British Institute of Engineering and Technology (BIET).
                  An admissions advisor will review your message and contact you via telephone or email within 1–2 business days.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        subject: 'General Inquiry',
                        programme: 'General Engineering Admissions',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 text-xs font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-[#111111]">Send an Admissions or Academic Message</h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fill out the inquiry form below to receive prospectus details, course syllabi, or fee breakdowns.
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
                      placeholder="e.g. kasun@example.com"
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Contact Telephone
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
                      Programme of Interest
                    </label>
                    <select
                      value={formData.programme}
                      onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors"
                    >
                      <option value="General Engineering Admissions">General Engineering Admissions</option>
                      <option value="Civil & Structural Engineering">Civil &amp; Structural Engineering</option>
                      <option value="Mechanical & Manufacturing Engineering">Mechanical &amp; Manufacturing Engineering</option>
                      <option value="Electrical & Electronic Systems">Electrical &amp; Electronic Systems</option>
                      <option value="Software Engineering & Cloud">Software Engineering &amp; Cloud</option>
                      <option value="Cyber Security & Networks">Cyber Security &amp; Networks</option>
                      <option value="Quantity Surveying & Commercial Management">Quantity Surveying &amp; Built Environment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Your Inquiry or Question *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify your inquiry regarding entry qualifications, intake dates, module credits or fee schedules..."
                    className="w-full px-4 py-2.5 bg-white border border-neutral-300 focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-xl text-xs text-neutral-900 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">
                    Fields marked with * are required.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
