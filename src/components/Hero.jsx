import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Percent, 
  Award,
  Users,
  ChevronRight,
  Calculator
} from 'lucide-react';

export default function Hero() {
  const { lang, openApplyModal, calculateEmi, siteSettings, loanProducts } = useLoan();

  // Quick hero calculator preview
  const [heroAmount, setHeroAmount] = useState(500000);
  const [heroTenure, setHeroTenure] = useState(36);
  
  // Use first product rate or 10.5
  const heroRate = loanProducts.length > 0 ? parseFloat(loanProducts[0].rate) : 10.5;

  const estimatedEmi = calculateEmi(heroAmount, heroRate, heroTenure);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const headline = lang === 'mr' 
    ? (siteSettings?.heroHeadlineMr || 'तुमच्या स्वप्नांना द्या पंख, सुलभ आणि खात्रीशीर कर्ज सेवेसह.')
    : (siteSettings?.heroHeadlineEn || 'Empower Your Dreams with Smart & Transparent Loans.');

  const subheadline = lang === 'mr'
    ? (siteSettings?.heroSubheadlineMr || 'वैयक्तिक, गृह, व्यवसाय आणि शेती कर्ज आता अत्यंत कमी व्याजदरात (8.4% पासून). 100% डिजिटल आणि पेपरलेस प्रक्रिया.')
    : (siteSettings?.heroSubheadlineEn || 'Personal, Home, Business and Agriculture loans at competitive interest rates starting from 8.4% p.a. 100% digital, paperless process.');

  const statCustomers = siteSettings?.statCustomers || '50,000+';
  const statDisbursed = siteSettings?.statDisbursed || '₹250+ कोटी';
  const statRating = siteSettings?.statRating || '4.9 / 5';

  return (
    <section 
      className="relative overflow-hidden text-white pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-28 bg-slate-950 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/bg-cyber.png')` }}
    >
      {/* Subtle overlay with light blue undertones */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-sky-950/20 to-slate-950/50 pointer-events-none" />

      {/* Decorative gradient glow blobs - Light Blue & Sky Cyan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-sky-500/20 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[280px] bg-cyan-400/20 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-blue-500/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Value Propositions */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
              <span>
                {lang === 'mr' 
                  ? 'सर्वात जलद मंजुरी • केवळ 24 तासांत खात्यात रक्कम' 
                  : 'Fastest Loan Approval • Disbursal in 24 Hours'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.18] text-white">
              {headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {subheadline}
            </p>

            {/* Key feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Percent className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 leading-none">{lang === 'mr' ? 'व्याजदर' : 'Rates'}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{loanProducts[0]?.rate || '8.4%'} p.a.</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 leading-none">{lang === 'mr' ? 'वितरण' : 'Disbursal'}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{lang === 'mr' ? '24 तासांत' : 'In 24 Hours'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 leading-none">{lang === 'mr' ? 'कागदपत्रे' : 'Process'}</div>
                  <div className="text-xs font-bold text-white mt-0.5">100% Paperless</div>
                </div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => openApplyModal('personal')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-105 shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{lang === 'mr' ? 'झटपट कर्ज अर्ज करा' : 'Apply For Loan Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-slate-200 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 transition-all cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'mr' ? 'हप्ता (EMI) मोजा' : 'Calculate EMI'}</span>
              </a>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 border border-slate-900 flex items-center justify-center text-[9px] font-bold">स्</div>
                  <div className="w-6 h-6 rounded-full bg-blue-600 border border-slate-900 flex items-center justify-center text-[9px] font-bold">म</div>
                  <div className="w-6 h-6 rounded-full bg-amber-600 border border-slate-900 flex items-center justify-center text-[9px] font-bold">र</div>
                </div>
                <span className="font-medium text-slate-300 text-xs">
                  <strong className="text-white">{statCustomers}</strong> {lang === 'mr' ? 'ग्राहक' : 'Borrowers'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                <span>★★★★★</span>
                <span className="text-white font-bold">{statRating}</span>
                <span className="text-slate-400">({lang === 'mr' ? 'गुगल रेटिंग' : 'Rating'})</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Loan Estimate Card - Light Blue Theme */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Vibrant Light Blue & Cyan Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/95 via-sky-950/80 to-slate-900/95 border border-sky-400/40 p-4 sm:p-5 lg:p-6 backdrop-blur-xl shadow-2xl shadow-sky-500/15 space-y-3 sm:space-y-3.5">
                
                {/* Card Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-sky-900/60">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                      <span>{lang === 'mr' ? 'झटपट EMI अंदाज' : 'Quick Loan Estimator'}</span>
                    </h2>
                    <p className="text-[11px] text-sky-200/80">
                      {lang === 'mr' ? 'तुमचा हप्ता तपासा आणि थेट अर्ज करा' : 'Preview installment & apply directly'}
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30 shadow-xs">
                    @ {heroRate}% p.a.
                  </span>
                </div>

                {/* Amount Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-sky-100 font-semibold">
                      {lang === 'mr' ? 'कर्ज रक्कम (Amount)' : 'Loan Amount'}
                    </span>
                    <span className="text-base font-black text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
                      {formatCurrency(heroAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="50000"
                    value={heroAmount}
                    onChange={(e) => setHeroAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 border border-sky-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                  <div className="flex justify-between text-[10px] text-sky-400/70 font-medium">
                    <span>₹50,000</span>
                    <span>₹25,00,000</span>
                    <span>₹50,00,000</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-sky-100 font-semibold">
                      {lang === 'mr' ? 'कालावधी (Tenure)' : 'Tenure'}
                    </span>
                    <span className="text-xs font-bold text-sky-200 bg-sky-950/90 px-2 py-0.5 rounded-md border border-sky-400/40 shadow-xs">
                      {heroTenure} {lang === 'mr' ? 'महिने' : 'Months'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="84"
                    step="6"
                    value={heroTenure}
                    onChange={(e) => setHeroTenure(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 border border-sky-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                  <div className="flex justify-between text-[10px] text-sky-400/70 font-medium">
                    <span>1 {lang === 'mr' ? 'वर्ष' : 'Yr'}</span>
                    <span>3 {lang === 'mr' ? 'वर्षे' : 'Yrs'}</span>
                    <span>7 {lang === 'mr' ? 'वर्षे' : 'Yrs'}</span>
                  </div>
                </div>

                {/* Calculated Result Box - Luminous Light Blue / Azure Theme */}
                <div className="bg-gradient-to-br from-sky-950/90 via-blue-900/60 to-cyan-950/80 p-3 sm:p-3.5 rounded-2xl border-2 border-sky-400/50 shadow-inner text-center space-y-0.5">
                  <div className="text-[10px] sm:text-[11px] text-sky-200 uppercase tracking-wider font-bold">
                    {lang === 'mr' ? 'अपेक्षित मासिक हप्ता (MONTHLY EMI)' : 'ESTIMATED MONTHLY EMI'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-sky-300 drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)]">
                    {formatCurrency(estimatedEmi)}
                    <span className="text-xs text-sky-200/80 font-normal ml-1">/ {lang === 'mr' ? 'महिना' : 'month'}</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-sky-200/80 pt-0.5">
                    {lang === 'mr' ? 'एकूण परतफेड:' : 'Total Repayment:'}{' '}
                    <strong className="text-white font-black">{formatCurrency(estimatedEmi * heroTenure)}</strong>
                  </div>
                </div>

                {/* Direct Action Button - Light Blue to Cyan Gradient */}
                <button
                  onClick={() => openApplyModal('personal')}
                  className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-300 hover:from-sky-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-sky-500/30 transition-all text-center flex items-center justify-center gap-1.5 group cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{lang === 'mr' ? 'हा हप्ता निवडून अर्ज करा' : 'Apply with this EMI'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Trust Footer Badges */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-sky-300 pt-0.5 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-sky-400" />
                    {lang === 'mr' ? 'शून्य छुपे खर्च' : 'Zero Hidden Fees'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-sky-400" />
                    {lang === 'mr' ? 'सुरक्षित प्रक्रिया' : '100% Encrypted'}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Organic Sea Waves Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg 
          className="relative block w-full h-12 sm:h-16 lg:h-24" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="seaWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="seaWaveGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="seaWaveGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d1b33" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#0a162b" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#060e1d" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="crestGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          {/* Deep back wave layer */}
          <path 
            d="M0,32 C240,95 480,10 720,55 C960,100 1200,25 1440,65 L1440,120 L0,120 Z" 
            fill="url(#seaWaveGrad1)" 
          />

          {/* Mid rolling sea wave layer */}
          <path 
            d="M0,60 C180,15 360,85 540,50 C720,15 900,90 1080,45 C1260,5 1380,65 1440,55 L1440,120 L0,120 Z" 
            fill="url(#seaWaveGrad2)" 
          />

          {/* Foreground wave with glowing neon sea crest */}
          <path 
            d="M0,78 C320,120 480,48 800,85 C1120,122 1280,62 1440,75 L1440,120 L0,120 Z" 
            fill="url(#seaWaveGrad3)" 
            stroke="url(#crestGlow)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </section>
  );
}
