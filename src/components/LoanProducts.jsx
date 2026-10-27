import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  UserCheck, 
  Home, 
  Briefcase, 
  Wheat, 
  Coins, 
  Car, 
  ArrowRight, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

export default function LoanProducts() {
  const { lang, loanProducts, openApplyModal } = useLoan();
  const [filter, setFilter] = useState('all');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Wheat': return <Wheat className="w-6 h-6" />;
      case 'Coins': return <Coins className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      default: return <UserCheck className="w-6 h-6" />;
    }
  };

  const filteredProducts = filter === 'all' 
    ? loanProducts 
    : loanProducts.filter(p => p.id === filter);

  return (
    <section id="loans" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'आमची कर्ज उत्पादने' : 'Tailored Loan Solutions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'mr' 
              ? 'तुमच्या प्रत्येक गरजेसाठी योग्य कर्ज योजना' 
              : 'Find the Right Loan for Every Financial Need'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lang === 'mr'
              ? 'पारदर्शक व्याजदर, कोणतेही छुपे शुल्क नाही आणि सुलभ मासिक हप्ते. तुमची योग्य योजना निवडा आणि आजच अर्ज करा.'
              : 'Transparent rates, no hidden charges, and flexible repayment terms. Choose your ideal plan and apply in minutes.'}
          </p>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === 'all' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {lang === 'mr' ? 'सर्व योजना' : 'All Loans'}
            </button>
            {loanProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === p.id 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lang === 'mr' ? p.nameMr : p.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isMarathi = lang === 'mr';
            return (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-emerald-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative transform hover:-translate-y-1"
              >
                {/* Top Badge Accent */}
                <div className={`h-2 bg-gradient-to-r ${product.color}`} />

                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Icon & Category Tag */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${product.color} text-white shadow-md shadow-slate-200`}>
                        {getIcon(product.icon)}
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${product.lightBg}`}>
                        {isMarathi ? product.tagMr : product.tagEn}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {isMarathi ? product.nameMr : product.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {isMarathi ? product.descMr : product.descEn}
                    </p>

                    {/* Rates & Limit Strip */}
                    <div className="grid grid-cols-2 gap-2 my-5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {isMarathi ? 'व्याजदर (Interest)' : 'Interest Rate'}
                        </div>
                        <div className="text-lg font-black text-emerald-600">
                          {product.rate} <span className="text-xs font-normal text-slate-500">p.a.</span>
                        </div>
                      </div>
                      <div className="border-l border-slate-200 pl-3">
                        <div className="text-[11px] text-slate-400 font-medium">
                          {isMarathi ? 'कमाल मर्यादा' : 'Max Amount'}
                        </div>
                        <div className="text-lg font-black text-slate-800">
                          {product.maxAmount}
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                        {isMarathi ? 'प्रमुख वैशिष्ट्ये:' : 'Key Features:'}
                      </div>
                      {(isMarathi ? product.featuresMr : product.featuresEn).map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tenure & Eligibility */}
                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600 space-y-1 mb-6">
                      <div>
                        <strong className="text-slate-800">{isMarathi ? 'कालावधी:' : 'Tenure:'}</strong>{' '}
                        {isMarathi ? product.tenure : product.tenureEn}
                      </div>
                      <div>
                        <strong className="text-slate-800">{isMarathi ? 'पात्रता:' : 'Eligibility:'}</strong>{' '}
                        {isMarathi ? product.eligibleMr : product.eligibleEn}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => openApplyModal(product.id)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-900 bg-slate-100 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs"
                  >
                    <span>{isMarathi ? 'या कर्जासाठी अर्ज करा' : 'Apply For This Loan'}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
