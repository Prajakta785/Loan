import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const { lang, faqs } = useLoan();
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'नेहमी विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'mr' ? 'काही शंका आहेत? उत्तरे येथे मिळतील' : 'Got Questions? We Have Got Answers'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lang === 'mr'
              ? 'कर्ज प्रक्रिया, पात्रता आणि व्याजदराबाबत सामान्य प्रश्नांची स्पष्ट उत्तरे.'
              : 'Clear and transparent answers to questions regarding sanctioning and eligibility.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-base font-bold text-slate-800">
                    {lang === 'mr' ? faq.qMr : faq.qEn}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {lang === 'mr' ? faq.aMr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
