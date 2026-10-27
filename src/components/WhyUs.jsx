import React from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  ShieldCheck, 
  Clock, 
  Coins, 
  Percent, 
  Headphones, 
  FileCheck2,
  Lock,
  Award
} from 'lucide-react';

export default function WhyUs() {
  const { lang } = useLoan();

  const benefits = [
    {
      icon: Clock,
      titleMr: '24 तासांत जलद वितरण',
      titleEn: '24-Hour Express Disbursal',
      descMr: 'कागदपत्रे तपासणीनंतर थेट तुमच्या बँक खात्यात आरटीजीएस किंवा एनईएफटी द्वारे रक्कम जमा केली जाते.',
      descEn: 'Instant disbursal to your bank account via RTGS/NEFT right after verification.',
    },
    {
      icon: Percent,
      titleMr: 'सर्वात कमी पारदर्शक व्याजदर',
      titleEn: 'Lowest Transparent Rates',
      descMr: '8.4% पासून सुरू होणारे व्याजदर. कोणतेही छुपे शुल्क (Hidden Charges) किंवा अनपेक्षित फी नाही.',
      descEn: 'Interest rates starting from 8.4% p.a. Zero hidden processing traps or fine print.',
    },
    {
      icon: FileCheck2,
      titleMr: '100% डिजिटल व पेपरलेस',
      titleEn: '100% Digital & Paperless',
      descMr: 'कोणत्याही कागदपत्रांची झेरॉक्स जमा करण्याची गरज नाही. थेट मोबाईलवरून स्कॅन जोडा.',
      descEn: 'Completely online document uploading. No physical branch queues required.',
    },
    {
      icon: Coins,
      titleMr: 'शून्य प्री-पेमेंट दंड',
      titleEn: 'Zero Foreclosure Penalty',
      descMr: 'हातात पैसे आल्यावर कधीही कर्जाची वेळेपूर्वी परतफेड करा, कोणताही दंड आकारला जात नाही.',
      descEn: 'Prepay or foreclose your loan without exorbitant foreclosure penalty charges.',
    },
    {
      icon: Lock,
      titleMr: '256-Bit बँक-ग्रेड सुरक्षा',
      titleEn: '256-Bit Bank-Grade Security',
      descMr: 'तुमची वैयक्तिक माहिती आणि कागदपत्रे कडक डेटा गोपनीयता व आरबीआय नियमांनुसार सुरक्षित ठेवली जातात.',
      descEn: 'Your identity and KYC documents are protected with high-grade banking encryption.',
    },
    {
      icon: Headphones,
      titleMr: 'मराठी व इंग्रजीत 24x7 ग्राहक सेवा',
      titleEn: 'Dedicated Marathi & English Support',
      descMr: 'आमचे अनुभवी कर्ज अधिकारी तुम्हाला कर्जाच्या प्रत्येक टप्प्यावर फोन आणि व्हॉट्सॲपवर मार्गदर्शन करतात.',
      descEn: 'Friendly customer representatives assist you promptly in your preferred language.',
    },
  ];

  return (
    <section 
      className="py-20 text-white relative overflow-hidden bg-cover bg-center bg-no-repeat bg-slate-950"
      style={{ backgroundImage: `url('/bg-cyber.png')` }}
    >
      {/* Background dark overlay */}
      <div className="absolute inset-0 bg-slate-950/80 pointer-events-none" />
      {/* Background radial gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'विश्वासार्हता आणि गुणवत्ता' : 'Why Choose MahaLoan'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'mr' ? 'लाखो ग्राहकांचा विश्वास का आहे?' : 'Why Over 50,000+ Borrowers Trust Us'}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {lang === 'mr'
              ? 'आम्ही केवळ कर्ज देत नाही, तर तुमच्या प्रत्येक आर्थिक स्वप्नाला सुरक्षित आणि विश्वासू साथ देतो.'
              : 'More than just finance — we are your transparent, trusted partner in financial growth.'}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-700/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {lang === 'mr' ? b.titleMr : b.titleEn}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'mr' ? b.descMr : b.descEn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
