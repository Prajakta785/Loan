import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  PhoneCall, 
  Languages, 
  FileText, 
  Menu, 
  X, 
  Building2
} from 'lucide-react';

export default function Navbar() {
  const { 
    lang, 
    setLang, 
    openApplyModal, 
    openTrackModal,
    siteSettings 
  } = useLoan();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'mr' ? 'en' : 'mr');
  };

  const navLinks = [
    { href: '#loans', labelMr: 'कर्ज प्रकार', labelEn: 'Loan Products' },
    { href: '#calculator', labelMr: 'EMI कॅल्क्युलेटर', labelEn: 'EMI Calculator' },
    { href: '#eligibility', labelMr: 'पात्रता तपासा', labelEn: 'Eligibility' },
    { href: '#process', labelMr: 'अर्ज पद्धत', labelEn: 'How it Works' },
    { href: '#faqs', labelMr: 'प्रश्नोत्तरे', labelEn: 'FAQs' },
    { href: '#contact', labelMr: 'संपर्क', labelEn: 'Contact' },
  ];

  const topAnnouncement = lang === 'mr' 
    ? (siteSettings?.topAnnouncementMr || 'गृह कर्ज आणि वैयक्तिक कर्जावर शून्य प्रक्रिया शुल्क!')
    : (siteSettings?.topAnnouncementEn || 'Zero Processing Fees on Home and Personal Loans this month!');

  const phone = siteSettings?.helplinePhone || '+91 80100 61527';
  const brandName = lang === 'mr' ? (siteSettings?.companyNameMr || 'महालोन') : (siteSettings?.companyNameEn || 'MahaLoan');
  const tagline = lang === 'mr' ? (siteSettings?.taglineMr || 'महाराष्ट्र कर्ज व वित्त सेवा') : (siteSettings?.taglineEn || 'Fast & Trusted Loan Solutions');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Notification Bar - Sleek & Compact */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-[11px] py-1 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500 text-white animate-pulse">
              {lang === 'mr' ? 'ऑफर' : 'Offer'}
            </span>
            <span className="hidden sm:inline text-slate-300">
              {topAnnouncement}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-medium transition-all cursor-pointer text-[10px]"
            >
              <Languages className="w-3 h-3" />
              <span>{lang === 'mr' ? 'English' : 'मराठी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar - Compact Height (h-14 = 56px) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  {brandName}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  NBFC
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5 leading-none">
                {tagline}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
              >
                {lang === 'mr' ? link.labelMr : link.labelEn}
              </a>
            ))}
          </nav>

          {/* Action Buttons with 3D Animations - Compact Height */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Track Application Button */}
            <button
              onClick={() => openTrackModal()}
              className="btn-3d-slate inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>{lang === 'mr' ? 'स्थिती ट्रॅक करा' : 'Track Status'}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={toggleLang}
              className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'mr' ? 'English मध्ये' : 'मराठी आवृत्ती'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTrackModal();
              }}
              className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>{lang === 'mr' ? 'स्थिती ट्रॅक' : 'Track Status'}</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1.5 rounded-md text-sm font-medium text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {lang === 'mr' ? link.labelMr : link.labelEn}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openApplyModal();
              }}
              className="w-full py-2.5 text-center text-white bg-gradient-to-r from-emerald-600 to-teal-600 font-bold rounded-xl shadow-md text-xs cursor-pointer"
            >
              {lang === 'mr' ? 'ऑनलाइन अर्ज करा' : 'Apply Online Now'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
