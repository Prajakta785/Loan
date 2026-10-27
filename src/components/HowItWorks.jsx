import React from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  FileEdit, 
  CheckCircle, 
  Banknote, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HowItWorks() {
  const { lang, openApplyModal } = useLoan();

  const steps = [
    {
      num: '01',
      titleMr: 'ऑनलाइन अर्ज भरा',
      titleEn: 'Fill Online Application',
      descMr: 'केवळ 2 मिनिटांत तुमची प्राथमिक माहिती, पॅन, आधार आणि आवश्यक रक्कम प्रविष्ट करा.',
      descEn: 'Enter your basic contact details, PAN, Aadhaar and required loan amount in 2 mins.',
      icon: FileEdit,
      color: 'from-blue-500 to-indigo-600',
      badge: lang === 'mr' ? '2 मिनिटे' : '2 Minutes'
    },
    {
      num: '02',
      titleMr: 'डिजिटल दस्तऐवज पडताळणी',
      titleEn: 'Digital KYC Verification',
      descMr: 'कागदपत्रे अपलोड करा. आमची आधुनिक सुरक्षित सिस्टीम त्वरित सिबिल आणि उत्पन्न तपासणी करते.',
      descEn: 'Upload clear scans. Our automated secure system validates credit and documents.',
      icon: ShieldCheck,
      color: 'from-teal-500 to-emerald-600',
      badge: lang === 'mr' ? '100% पेपरलेस' : '100% Digital'
    },
    {
      num: '03',
      titleMr: 'त्वरित कर्ज मंजुरी',
      titleEn: 'Instant Loan Sanction',
      descMr: 'पात्रतेनुसार सर्वोत्तम व्याजदराचे मंजुरी पत्र (Sanction Letter) आणि हप्त्याचे वेळापत्रक जारी होते.',
      descEn: 'Sanction letter issued with lowest interest rate and optimal EMI plan.',
      icon: CheckCircle,
      color: 'from-amber-500 to-orange-600',
      badge: lang === 'mr' ? 'झटपट मंजुरी' : 'Quick Sanction'
    },
    {
      num: '04',
      titleMr: 'थेट बँक खात्यात रक्कम',
      titleEn: 'Disbursal to Bank',
      descMr: 'मंजूर रक्कम अवघ्या 24 तासांच्या आत थेट तुमच्या बँक खात्यात सुरक्षितपणे वर्ग केली जाते.',
      descEn: 'Approved loan funds credited directly into your verified bank account in 24 hours.',
      icon: Banknote,
      color: 'from-emerald-500 to-teal-500',
      badge: lang === 'mr' ? '24 तासांत' : 'In 24 Hours'
    }
  ];

  return (
    <section id="process" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'सुलभ 4-पायरी प्रक्रिया' : 'Easy 4-Step Process'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'mr' ? 'कर्ज मिळवण्याची अत्यंत सोपी पद्धत' : 'How It Works - Simple, Fast & Transparent'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lang === 'mr'
              ? 'बँकांच्या पायऱ्या झिजवण्याची गरज नाही. घरात बसून मोबाईलवरून अर्ज करा आणि थेट खात्यात पैसे मिळवा.'
              : 'No lengthy bank queues or bureaucratic hassles. Apply from home and get money in your account.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx} 
                className="relative bg-slate-50 hover:bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-200 font-mono transition-colors">
                      {s.num}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs">
                      {s.badge}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {lang === 'mr' ? s.titleMr : s.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'mr' ? s.descMr : s.descEn}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/70 flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <span>{lang === 'mr' ? 'पायरी ' + s.num : 'Step ' + s.num}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'mr' ? 'आजच अर्ज करा आणि विशेष सवलत मिळवा!' : 'Ready to Get Started with Low Interest?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === 'mr' 
                ? 'केवळ आधार आणि पॅन कार्डावर झटपट कर्ज मंजुरी मिळवण्यासाठी आत्ताच फॉर्म भरा.' 
                : 'Apply now with your basic KYC documents and receive approval in 24 hours.'}
            </p>
          </div>

          <button
            onClick={() => openApplyModal('personal')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-sm hover:brightness-105 shadow-lg shadow-emerald-500/25 transition-all shrink-0 cursor-pointer"
          >
            {lang === 'mr' ? 'ऑनलाइन अर्ज सुरू करा' : 'Start Application Now'}
          </button>
        </div>

      </div>
    </section>
  );
}
