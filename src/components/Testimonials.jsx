import React from 'react';
import { useLoan } from '../context/LoanContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const { lang, testimonials } = useLoan();

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{lang === 'mr' ? 'ग्राहकांचे अनुभव' : 'Customer Stories'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'mr' ? 'आमच्या समाधानी ग्राहकांचे मनोगत' : 'Hear From Our Valued Customers'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {lang === 'mr'
              ? 'महाराष्ट्रातील हजारो व्यापारी, शेतकरी आणि नोकरदारांनी महालोनवर दाखवला विश्वास.'
              : 'Discover how MahaLoan has empowered families, farmers, and entrepreneurs across Maharashtra.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 relative"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-200 group-hover:text-emerald-200 transition-colors" />
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{lang === 'mr' ? rev.commentMr : rev.commentEn}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                  </h4>
                  <p className="text-xs text-slate-400">{rev.city}</p>
                </div>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {rev.loan}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
