import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { CheckCircle2, TrendingUp, Sparkles, ArrowRight, ShieldAlert, Award } from 'lucide-react';

export default function EligibilityChecker() {
  const { lang, openApplyModal } = useLoan();

  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEmi, setExistingEmi] = useState(10000);
  const [tenureYears, setTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(10.5);

  // FOIR standard: Max 50% of monthly income can go towards total EMIs
  const maxAllowableEmi = Math.max(0, (monthlyIncome * 0.50) - existingEmi);

  // Inverted EMI calculation to find max eligible loan amount:
  // EMI = P * r * (1+r)^n / ((1+r)^n - 1)  ==> P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
  const tenureMonths = tenureYears * 12;
  const monthlyRate = interestRate / 12 / 100;
  
  let maxLoanAmount = 0;
  if (maxAllowableEmi > 0 && monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    maxLoanAmount = Math.round((maxAllowableEmi * (factor - 1)) / (monthlyRate * factor));
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getEligibilityStatus = () => {
    if (maxLoanAmount > 1500000) {
      return {
        badge: lang === 'mr' ? 'उत्कृष्ट पात्रता (Excellent)' : 'Excellent Eligibility',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        message: lang === 'mr' ? 'तुम्ही कमाल कर्ज रकमेसाठी पूर्णपणे पात्र आहात.' : 'You qualify for premium rates and maximum loan amounts.'
      };
    } else if (maxLoanAmount > 500000) {
      return {
        badge: lang === 'mr' ? 'चांगली पात्रता (Good)' : 'Good Eligibility',
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        message: lang === 'mr' ? 'तुमचा अर्ज विनातारण जलद मंजूर होऊ शकतो.' : 'Your application can be swiftly approved without collateral.'
      };
    } else if (maxLoanAmount > 100000) {
      return {
        badge: lang === 'mr' ? 'मध्यम पात्रता (Fair)' : 'Moderate Eligibility',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        message: lang === 'mr' ? 'सह-अर्जदार (Co-borrower) जोडल्यास जास्त कर्ज मिळेल.' : 'Adding a co-applicant can boost your borrowing power.'
      };
    } else {
      return {
        badge: lang === 'mr' ? 'कमी पात्रता (Low)' : 'Low Capacity',
        color: 'text-red-600 bg-red-50 border-red-200',
        message: lang === 'mr' ? 'चालू कर्ज कमी करा किंवा सुवर्ण कर्ज निवडा.' : 'Consider reducing existing debts or applying for a Gold Loan.'
      };
    }
  };

  const status = getEligibilityStatus();

  return (
    <section id="eligibility" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200 mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'झटपट पात्रता मोजणी' : 'Instant Eligibility Check'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'mr' ? 'तुम्हाला किती कर्ज मिळू शकते?' : 'How Much Loan Can You Get?'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lang === 'mr'
              ? 'तुमचे मासिक उत्पन्न आणि चालू हप्ते टाका, आमची स्मार्ट सिस्टीम तुमची कमाल कर्ज मर्यादा त्वरित दाखवेल.'
              : 'Enter your monthly earnings and current EMIs to instantly discover your maximum eligible loan limit.'}
          </p>
        </div>

        {/* Checker Grid */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid lg:grid-cols-12">
          
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-10 space-y-6">
            
            {/* Monthly Income */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800">
                  {lang === 'mr' ? 'मासिक निव्वळ उत्पन्न (Net Monthly Income)' : 'Net Monthly Income'}
                </label>
                <span className="text-lg font-black text-emerald-600">
                  {formatCurrency(monthlyIncome)}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="300000"
                step="5000"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹15,000</span>
                <span>₹1,50,000</span>
                <span>₹3,00,000+</span>
              </div>
            </div>

            {/* Existing EMIs */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-800">
                  {lang === 'mr' ? 'सध्याचे इतर चालू हप्ते (Existing Monthly EMIs)' : 'Existing Monthly EMIs'}
                </label>
                <span className="text-lg font-black text-slate-700">
                  {formatCurrency(existingEmi)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="2000"
                value={existingEmi}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹0 (काहीही नाही)</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Desired Tenure & Interest Rate */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {lang === 'mr' ? 'कर्ज कालावधी' : 'Tenure'}
                </label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={1}>1 {lang === 'mr' ? 'वर्ष' : 'Year'}</option>
                  <option value={3}>3 {lang === 'mr' ? 'वर्षे' : 'Years'}</option>
                  <option value={5}>5 {lang === 'mr' ? 'वर्षे' : 'Years'}</option>
                  <option value={7}>7 {lang === 'mr' ? 'वर्षे' : 'Years'}</option>
                  <option value={10}>10 {lang === 'mr' ? 'वर्षे' : 'Years'}</option>
                  <option value={20}>20 {lang === 'mr' ? 'वर्षे' : 'Years'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {lang === 'mr' ? 'अपेक्षित व्याजदर' : 'Expected Rate'}
                </label>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={7.0}>{lang === 'mr' ? '7.0% (कृषी कर्ज)' : '7.0% (Kisan Loan)'}</option>
                  <option value={8.4}>{lang === 'mr' ? '8.4% (गृह कर्ज)' : '8.4% (Home Loan)'}</option>
                  <option value={8.7}>{lang === 'mr' ? '8.7% (वाहन कर्ज)' : '8.7% (Vehicle Loan)'}</option>
                  <option value={10.5}>{lang === 'mr' ? '10.5% (वैयक्तिक कर्ज)' : '10.5% (Personal Loan)'}</option>
                  <option value={11.2}>{lang === 'mr' ? '11.2% (व्यवसाय कर्ज)' : '11.2% (Business Loan)'}</option>
                </select>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>
                {lang === 'mr' 
                  ? 'पात्रता मानक: उत्पन्नाच्या 50% कमाल EMI मर्यादा नियमानुसार.' 
                  : 'Calculation adheres to RBI standard 50% Fixed Obligation to Income Ratio.'}
              </span>
            </div>

          </div>

          {/* Results (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-4 sm:p-10 text-white flex flex-col justify-between">
            <div className="space-y-6">
              
              <div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${status.color}`}>
                  {status.badge}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  {lang === 'mr' ? 'कमाल पात्र कर्ज रक्कम (Max Eligible Loan)' : 'Max Eligible Loan Amount'}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-2">
                  {formatCurrency(maxLoanAmount)}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {status.message}
                </p>
              </div>

              <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{lang === 'mr' ? 'कमाल मासिक EMI क्षमता:' : 'Max Allowable EMI:'}</span>
                  <span className="font-bold text-white">{formatCurrency(maxAllowableEmi)} / {lang === 'mr' ? 'महिना' : 'mo'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{lang === 'mr' ? 'कालावधी:' : 'Selected Tenure:'}</span>
                  <span className="font-bold text-white">{tenureYears} {lang === 'mr' ? 'वर्षे' : 'Years'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{lang === 'mr' ? 'लागू व्याजदर:' : 'Applied Rate:'}</span>
                  <span className="font-bold text-emerald-400">{interestRate}% p.a.</span>
                </div>
              </div>

            </div>

            <div className="pt-6">
              <button
                onClick={() => openApplyModal('personal')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'mr' ? 'या रकमेसाठी थेट अर्ज करा' : 'Apply for this Amount'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
