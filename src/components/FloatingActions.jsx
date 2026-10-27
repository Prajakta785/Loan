import React, { useState, useEffect } from 'react';
import { useLoan } from '../context/LoanContext';
import { ArrowUp } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingActions() {
  const { lang, siteSettings, currentView } = useLoan();
  const [showTopBtn, setShowTopBtn] = useState(false);

  const waNumber = siteSettings?.whatsappNumber || '918010061527';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = lang === 'mr'
    ? encodeURIComponent('नमस्कार, मला महालोन फायनान्स कर्जाबाबत माहिती हवी आहे.')
    : encodeURIComponent('Hello, I would like to inquire about loan options with MahaLoan.');

  // If in admin view, hide floating actions
  if (currentView === 'admin') return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-none">
      
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${waNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        title="WhatsApp Support"
      >
        <WhatsAppIcon className="w-8 h-8 drop-shadow-sm" />
        <span className="sr-only">WhatsApp</span>
      </a>

      {/* Back to top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 flex items-center justify-center shadow-md transition-all cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
