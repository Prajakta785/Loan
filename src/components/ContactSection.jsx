import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2 
} from 'lucide-react';

export default function ContactSection() {
  const { lang, showToast, siteSettings } = useLoan();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    loanType: 'personal',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    showToast(
      lang === 'mr' 
        ? 'धन्यवाद! आमचे प्रतिनिधी लवकरच आपल्याशी संपर्क साधतील.' 
        : 'Thank you! Our loan representative will reach out shortly.'
    );
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', loanType: 'personal', message: '' });
    }, 4000);
  };

  const address = lang === 'mr' 
    ? (siteSettings?.officeAddressMr || 'महालोन टॉवर, 4था मजला, शिवाजीनगर, एफसी रोड जवळ, पुणे - 411005')
    : (siteSettings?.officeAddressEn || 'MahaLoan Tower, 4th Floor, Shivajinagar, Near FC Road, Pune - 411005');

  const timings = lang === 'mr'
    ? (siteSettings?.officeTimingsMr || 'सोमवार ते शनिवार: स. 9:30 ते सायं 7:00')
    : (siteSettings?.officeTimingsEn || 'Monday to Saturday: 9:30 AM to 7:00 PM');

  const phone = siteSettings?.helplinePhone || '+91 80100 61527';
  const phoneSec = siteSettings?.secondaryPhone || '+91 80100 61527';
  const email = siteSettings?.officialEmail || 'support@mahaloan.com';

  return (
    <section id="contact" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'मदत व संपर्क' : 'Contact Us'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'mr' ? 'आमच्याशी संपर्क साधा' : 'Get in Touch with Our Loan Specialists'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lang === 'mr'
              ? 'कर्ज सल्लागार विनामूल्य मार्गदर्शन करण्यासाठी नेहमी उपलब्ध आहेत. खालील फॉर्म भरा किंवा थेट कॉल करा.'
              : 'Our loan experts are ready to assist you. Fill out the inquiry form or call our helpline.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="box-3d relative grid lg:grid-cols-12 gap-6 sm:gap-10 bg-slate-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-slate-800/90 hover:border-emerald-500/50 shadow-2xl shadow-slate-950/80 overflow-hidden p-4 sm:p-10 text-white">
          
          {/* Left Column: Contact Info & Branches (5 cols) */}
          <div className="lg:col-span-5 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800 pb-8 lg:pb-0 lg:pr-8">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'mr' ? 'मुख्यालय आणि शाखा कार्यालय' : 'Headquarters & Branch Network'}
            </h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white font-bold">
                    {lang === 'mr' ? 'पुणे मुख्य कार्यालय:' : 'Pune Main Office:'}
                  </strong>
                  <span className="text-slate-300 leading-relaxed block mt-0.5">{address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white font-bold">
                    {lang === 'mr' ? 'हेल्पलाईन व व्हॉट्सॲप नंबर:' : 'Helpline & WhatsApp Number:'}
                  </strong>
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-emerald-400 font-extrabold text-base block hover:text-emerald-300 transition-colors">
                    {phone}
                  </a>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {lang === 'mr' ? '24/7 ग्राहक सेवा व थेट कर्ज चौकशी' : '24/7 Customer Support & Loan Inquiries'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white font-bold">
                    {lang === 'mr' ? 'ईमेल संपर्क:' : 'Official Email:'}
                  </strong>
                  <a href={`mailto:${email}`} className="text-slate-300 hover:text-emerald-400 transition-colors block mt-0.5">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white font-bold">
                    {lang === 'mr' ? 'कार्यालयीन वेळ:' : 'Working Hours:'}
                  </strong>
                  <span className="text-slate-300 block mt-0.5">{timings}</span>
                </div>
              </div>
            </div>

            {/* Other cities tags */}
            <div className="pt-5 border-t border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2.5">
                {lang === 'mr' ? 'महाराष्ट्रभरातील इतर प्रमुख केंद्रे:' : 'Other Key Regional Centers:'}
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-lg hover:border-emerald-500/50 hover:bg-slate-800 transition-all">{lang === 'mr' ? 'मुंबई (BKC)' : 'Mumbai (BKC)'}</span>
                <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-lg hover:border-emerald-500/50 hover:bg-slate-800 transition-all">{lang === 'mr' ? 'छत्रपती संभाजीनगर' : 'Chhatrapati Sambhajinagar'}</span>
                <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-lg hover:border-emerald-500/50 hover:bg-slate-800 transition-all">{lang === 'mr' ? 'नाशिक' : 'Nashik'}</span>
                <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-lg hover:border-emerald-500/50 hover:bg-slate-800 transition-all">{lang === 'mr' ? 'नागपूर' : 'Nagpur'}</span>
                <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-lg hover:border-emerald-500/50 hover:bg-slate-800 transition-all">{lang === 'mr' ? 'कोल्हापूर' : 'Kolhapur'}</span>
                <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/80 text-slate-200 rounded-lg hover:border-emerald-500/50 hover:bg-slate-800 transition-all">{lang === 'mr' ? 'सोलापूर' : 'Solapur'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {lang === 'mr' ? 'त्वरित संदेश पाठवा' : 'Send an Instant Inquiry'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {lang === 'mr'
                ? 'तुमची प्राथमिक माहिती भरा, आमचा कर्ज तज्ञ 30 मिनिटांच्या आत कॉल करेल.'
                : 'Share your details and an advisor will contact you within 30 minutes.'}
            </p>

            {submitted ? (
              <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3 backdrop-blur-md">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  {lang === 'mr' ? 'संदेश यशस्वीरीत्या पाठवला!' : 'Inquiry Submitted!'}
                </h4>
                <p className="text-xs text-emerald-300">
                  {lang === 'mr'
                    ? 'आमचे तज्ञ लवकरच तुमच्या मोबाईलवर संपर्क साधून कर्ज प्रक्रियेची माहिती देतील.'
                    : 'Our specialist will connect with you via mobile shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {lang === 'mr' ? 'तुमचे नाव *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'mr' ? 'उदा. सचिन कदम' : 'e.g. Sachin Kadam'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {lang === 'mr' ? 'मोबाईल नंबर *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {lang === 'mr' ? 'कोणत्या कर्जात रस आहे?' : 'Loan Product Interested In'}
                  </label>
                  <select
                    value={formData.loanType}
                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-sm font-semibold text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                  >
                    <option value="personal" className="bg-slate-900 text-white">{lang === 'mr' ? 'वैयक्तिक कर्ज (Personal Loan)' : 'Personal Loan'}</option>
                    <option value="home" className="bg-slate-900 text-white">{lang === 'mr' ? 'गृह कर्ज (Home Loan)' : 'Home Loan'}</option>
                    <option value="business" className="bg-slate-900 text-white">{lang === 'mr' ? 'व्यवसाय कर्ज (Business Loan)' : 'Business Loan'}</option>
                    <option value="kisan" className="bg-slate-900 text-white">{lang === 'mr' ? 'कृषी / शेती कर्ज (Kisan Loan)' : 'Agriculture / Kisan Loan'}</option>
                    <option value="gold" className="bg-slate-900 text-white">{lang === 'mr' ? 'सुवर्ण कर्ज (Gold Loan)' : 'Gold Loan'}</option>
                    <option value="vehicle" className="bg-slate-900 text-white">{lang === 'mr' ? 'वाहन कर्ज (Vehicle Loan)' : 'Vehicle Loan'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {lang === 'mr' ? 'संदेश किंवा विचारणा' : 'Your Message'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={lang === 'mr' ? 'तुमची कर्जाची गरज किंवा शंका येथे लिहा...' : 'Specify requirements or questions...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'संदेश पाठवा (Submit Inquiry)' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
