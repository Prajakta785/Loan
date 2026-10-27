import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { Calculator, ArrowRight, PieChart, CheckCircle2, RefreshCw } from 'lucide-react';

export default function EmiCalculator() {
  const { lang, calculateEmi, openApplyModal } = useLoan();

  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(10);

  const tenureMonths = tenureYears * 12;
  const monthlyEmi = calculateEmi(amount, rate, tenureMonths);
  const totalAmount = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalAmount - amount);

  // Percentages for SVG donut chart
  const principalPercent = totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const amountPresets = [
    { labelMr: '₹5 लाख', labelEn: '₹5 Lakh', val: 500000 },
    { labelMr: '₹15 लाख', labelEn: '₹15 Lakh', val: 1500000 },
    { labelMr: '₹30 लाख', labelEn: '₹30 Lakh', val: 3000000 },
    { labelMr: '₹50 लाख', labelEn: '₹50 Lakh', val: 5000000 },
  ];

  const ratePresets = [
    { labelMr: '7.0% (कृषी)', labelEn: '7.0% (Kisan)', val: 7.0 },
    { labelMr: '8.4% (गृह)', labelEn: '8.4% (Home)', val: 8.4 },
    { labelMr: '10.5% (पर्सनल)', labelEn: '10.5% (Personal)', val: 10.5 },
    { labelMr: '11.2% (व्यवसाय)', labelEn: '11.2% (Business)', val: 11.2 },
  ];

  return (
    <section id="calculator" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'सुलभ आर्थिक नियोजन' : 'Smart Loan Planner'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'mr' ? 'स्मार्ट कर्ज EMI कॅल्क्युलेटर' : 'Interactive Loan EMI Calculator'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lang === 'mr'
              ? 'तुमच्या सोयीनुसार कर्ज रक्कम, व्याजदर आणि कालावधी निवडून मासिक हप्त्याचे (EMI) अचूक गणित करा.'
              : 'Estimate your monthly installment, total interest, and complete repayment breakdown in real time.'}
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl border border-slate-800">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Amount Slider */}
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-semibold text-slate-300">
                  {lang === 'mr' ? 'कर्ज रक्कम (Loan Amount)' : 'Loan Amount'}
                </label>
                <div className="text-2xl font-black text-emerald-400">
                  {formatCurrency(amount)}
                </div>
              </div>

              <input
                type="range"
                min="50000"
                max="15000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex justify-between text-xs text-slate-500">
                <span>{lang === 'mr' ? '₹५० हजार' : '₹50K'}</span>
                <span>{lang === 'mr' ? '₹७५ लाख' : '₹75 Lakh'}</span>
                <span>{lang === 'mr' ? '₹१.५ कोटी' : '₹1.5 Cr'}</span>
              </div>

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {amountPresets.map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setAmount(p.val)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      amount === p.val 
                        ? 'bg-emerald-500 text-slate-950 font-bold' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {lang === 'mr' ? p.labelMr : p.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-semibold text-slate-300">
                  {lang === 'mr' ? 'वार्षिक व्याजदर (Interest Rate % p.a.)' : 'Interest Rate (% p.a.)'}
                </label>
                <div className="text-2xl font-black text-teal-400">
                  {rate.toFixed(1)}%
                </div>
              </div>

              <input
                type="range"
                min="6.5"
                max="20.0"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />

              <div className="flex justify-between text-xs text-slate-500">
                <span>6.5%</span>
                <span>13.0%</span>
                <span>20.0%</span>
              </div>

              {/* Rate Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                {ratePresets.map((rp) => (
                  <button
                    key={rp.val}
                    onClick={() => setRate(rp.val)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      rate === rp.val 
                        ? 'bg-teal-400 text-slate-950 font-bold' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {lang === 'mr' ? rp.labelMr : rp.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-sm font-semibold text-slate-300">
                  {lang === 'mr' ? 'कर्ज कालावधी (Loan Tenure)' : 'Loan Tenure'}
                </label>
                <div className="text-xl font-black text-white bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                  {tenureYears} {lang === 'mr' ? 'वर्षे' : 'Years'} ({tenureMonths} {lang === 'mr' ? 'महिने' : 'Months'})
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex justify-between text-xs text-slate-500">
                <span>1 {lang === 'mr' ? 'वर्ष' : 'Yr'}</span>
                <span>15 {lang === 'mr' ? 'वर्षे' : 'Yrs'}</span>
                <span>30 {lang === 'mr' ? 'वर्षे' : 'Yrs'}</span>
              </div>
            </div>

          </div>

          {/* Result & Visual Breakdown Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/70 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
            
            <div className="space-y-6">
              
              {/* Primary EMI Display */}
              <div className="text-center pb-6 border-b border-slate-800">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  {lang === 'mr' ? 'तुमचा मासिक हप्ता (Monthly EMI)' : 'Your Monthly EMI'}
                </span>
                <div className="text-4xl font-black text-emerald-400 mt-2">
                  {formatCurrency(monthlyEmi)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'mr' ? `${tenureMonths} महिन्यांसाठी नियमित हप्ता` : `Fixed monthly for ${tenureMonths} months`}
                </p>
              </div>

              {/* Visual Donut representation */}
              <div className="flex items-center justify-center gap-6">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <path
                      className="text-slate-800"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Principal circle (Emerald) */}
                    <path
                      className="text-emerald-500"
                      strokeDasharray={`${principalPercent}, 100`}
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-white">{principalPercent}%</span>
                    <span className="text-[9px] text-slate-400">{lang === 'mr' ? 'मुद्दल' : 'Principal'}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <div className="text-slate-400">{lang === 'mr' ? 'मुद्दल रक्कम (Principal):' : 'Principal:'}</div>
                      <div className="font-bold text-white">{formatCurrency(amount)} ({principalPercent}%)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-700 shrink-0" />
                    <div>
                      <div className="text-slate-400">{lang === 'mr' ? 'एकूण व्याज (Interest):' : 'Total Interest:'}</div>
                      <div className="font-bold text-amber-400">{formatCurrency(totalInterest)} ({interestPercent}%)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Payment Breakdown */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>{lang === 'mr' ? 'एकूण परतफेड रक्कम:' : 'Total Repayment Amount:'}</span>
                  <span className="text-base font-bold text-white">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>{lang === 'mr' ? 'कालावधी:' : 'Tenure:'}</span>
                  <span>{tenureYears} {lang === 'mr' ? 'वर्षे' : 'Years'} ({tenureMonths} {lang === 'mr' ? 'हप्ते' : 'EMIs'})</span>
                </div>
              </div>

            </div>

            {/* Direct Apply CTA */}
            <div className="pt-6">
              <button
                onClick={() => openApplyModal('home')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'mr' ? 'या हप्त्यासह अर्ज सुरू करा' : 'Proceed with this Calculation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
