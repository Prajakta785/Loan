import React from 'react';
import { useLoan } from '../context/LoanContext';
import { Building2, Heart } from 'lucide-react';

export default function Footer() {
  const { lang, openApplyModal } = useLoan();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                महा<span className="text-emerald-500">लोन</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              {lang === 'mr'
                ? 'महालोन फायनान्स ही महाराष्ट्रातील नागरिकांना पारदर्शक, जलद आणि विश्वासू कर्ज पुरवठा करणारी अग्रगण्य वित्तीय संस्था आहे. आम्ही आरबीआय नोंदणीकृत एनबीएफसी आणि बँकांसोबत भागीदारीत काम करतो.'
                : 'MahaLoan Finance is a premier financial platform offering instant, transparent loans across Maharashtra in partnership with RBI-regulated NBFCs and banking institutions.'}
            </p>

            <div className="flex items-center gap-2 text-slate-300 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === 'mr' ? 'आरबीआय नियमांनुसार 100% सुरक्षित वित्तीय सेवा' : '100% Compliant with RBI Consumer Lending Guidelines'}</span>
            </div>
          </div>

          {/* Col: Loan Products */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              {lang === 'mr' ? 'कर्ज योजना' : 'Loan Schemes'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#loans" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'वैयक्तिक कर्ज (Personal Loan)' : 'Personal Loan'}</a></li>
              <li><a href="#loans" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'गृह कर्ज (Home Loan)' : 'Home Loan'}</a></li>
              <li><a href="#loans" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'व्यवसाय कर्ज (Business Loan)' : 'Business Loan'}</a></li>
              <li><a href="#loans" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'कृषी कर्ज (Kisan Loan)' : 'Agriculture / Kisan Loan'}</a></li>
              <li><a href="#loans" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'सुवर्ण कर्ज (Gold Loan)' : 'Gold Loan'}</a></li>
              <li><a href="#loans" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'वाहन कर्ज (Vehicle Loan)' : 'Vehicle Loan'}</a></li>
            </ul>
          </div>

          {/* Col: Calculators & Tools */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              {lang === 'mr' ? 'कॅल्क्युलेटर आणि टूल्स' : 'Calculators & Tools'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'EMI कॅल्क्युलेटर' : 'EMI Calculator'}</a></li>
              <li><a href="#eligibility" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'कर्ज पात्रता तपासणी' : 'Eligibility Checker'}</a></li>
              <li><a href="#process" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'कर्ज प्रक्रिया मार्गदर्शक' : 'Loan Process Guide'}</a></li>
              <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'सिबिल स्कोअर माहिती' : 'CIBIL Information'}</a></li>
              <li>
                <button 
                  onClick={() => openApplyModal('personal')} 
                  className="text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  {lang === 'mr' ? 'ऑनलाइन अर्ज करा' : 'Apply Online'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col: Policies & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              {lang === 'mr' ? 'धोरणे आणि अटी' : 'Policies & Terms'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'गोपनीयता धोरण (Privacy)' : 'Privacy Policy'}</a></li>
              <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'अटी व शर्ती (Terms)' : 'Terms & Conditions'}</a></li>
              <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'व्याजदर धोरण' : 'Interest Policy'}</a></li>
              <li><a href="#faqs" className="hover:text-emerald-400 transition-colors">{lang === 'mr' ? 'आरबीआय मार्गदर्शक तत्त्वे' : 'RBI Guidelines'}</a></li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-500 space-y-2">
          <p>
            {lang === 'mr'
              ? '*अस्वीकरण: महालोन फायनान्स ही ग्राहकांना मान्यताप्राप्त बँका आणि आरबीआय नोंदणीकृत एनबीएफसीशी जोडणारी सुविधा पुरवते. अंतिम कर्ज मंजुरी, व्याजदर आणि अटी अर्जदाराच्या सिबिल स्कोअर, उत्पन्न आणि कागदपत्रांच्या पडताळणीवर अवलंबून असतात.'
              : '*Disclaimer: MahaLoan Finance connects borrowers with RBI-regulated NBFCs and lending banking institutions. Final sanction, interest rates, and loan terms depend on applicant credit score, income verification, and partner lender policy.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-slate-400">
            <span>
              © {new Date().getFullYear()} MahaLoan Finance Private Limited. All Rights Reserved.
            </span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>in Maharashtra, India</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
