import React, { useState, useEffect } from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  FileCheck, 
  ShieldCheck, 
  User, 
  CreditCard, 
  Briefcase, 
  IndianRupee, 
  Copy,
  Printer,
  Sparkles,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoanApplicationModal() {
  const { 
    lang, 
    isApplyModalOpen, 
    closeApplyModal, 
    selectedLoanType, 
    loanProducts, 
    submitApplication,
    openTrackModal,
    siteSettings 
  } = useLoan();

  const [step, setStep] = useState(1);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: 'पुणे (Pune)',
    state: 'Maharashtra',
    aadhaar: '',
    pan: '',
    employment: 'Salaried',
    company: '',
    income: 45000,
    loanType: selectedLoanType || 'personal',
    amount: 500000,
    tenure: 36,
    purpose: '',
    aadhaarDoc: null,
    panDoc: null,
    incomeDoc: null,
  });

  const [errors, setErrors] = useState({});

  // Sync loan type when opened
  useEffect(() => {
    if (selectedLoanType) {
      setFormData(prev => ({ ...prev, loanType: selectedLoanType }));
    }
  }, [selectedLoanType]);

  // Reset modal when opened or closed
  useEffect(() => {
    if (isApplyModalOpen) {
      setStep(1);
      setSubmittedApp(null);
      setErrors({});
    }
  }, [isApplyModalOpen]);

  if (!isApplyModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Step Validation
  const validateStep = (currentStep) => {
    const err = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) err.name = lang === 'mr' ? 'नाव भरणे आवश्यक आहे' : 'Name is required';
      if (!formData.mobile || formData.mobile.replace(/\D/g, '').length !== 10) {
        err.mobile = lang === 'mr' ? '10 अंकी वैध मोबाईल नंबर टाका' : 'Valid 10-digit mobile is required';
      }
      if (!formData.city.trim()) err.city = lang === 'mr' ? 'शहर भरणे आवश्यक आहे' : 'City is required';
    } else if (currentStep === 2) {
      const cleanAadhaar = formData.aadhaar.replace(/\D/g, '');
      if (cleanAadhaar.length !== 12) {
        err.aadhaar = lang === 'mr' ? '12 अंकी वैध आधार क्रमांक टाका' : 'Valid 12-digit Aadhaar required';
      }
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      if (!formData.pan || !panRegex.test(formData.pan.trim())) {
        err.pan = lang === 'mr' ? 'वैध 10 अंकी पॅन क्रमांक टाका (उदा. ABCDE1234F)' : 'Valid 10-digit PAN format required (e.g. ABCDE1234F)';
      }
    } else if (currentStep === 3) {
      if (!formData.income || Number(formData.income) < 10000) {
        err.income = lang === 'mr' ? 'किमान मासिक उत्पन्न ₹10,000 असावे' : 'Min monthly income ₹10,000 required';
      }
    } else if (currentStep === 4) {
      if (!formData.amount || Number(formData.amount) < 25000) {
        err.amount = lang === 'mr' ? 'किमान कर्ज मर्यादा ₹25,000 आहे' : 'Min loan amount is ₹25,000';
      }
      if (!formData.purpose.trim()) {
        err.purpose = lang === 'mr' ? 'कर्जाचे कारण/उद्देश लिहा' : 'Loan purpose is required';
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const getWhatsAppUrl = (app) => {
    if (!app) return '#';
    const isMr = lang === 'mr';
    const amountFormatted = Number(app.amount || 0).toLocaleString('en-IN');
    const emiFormatted = Number(app.monthlyEmi || 0).toLocaleString('en-IN');
    const incomeFormatted = Number(app.monthlyIncome || app.income || 0).toLocaleString('en-IN');
    const dateFormatted = new Date().toLocaleDateString(isMr ? 'mr-IN' : 'en-IN');

    const msg = isMr
      ? `*नवीन कर्ज अर्ज - महालोन फायनान्स (MahaLoan)*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📌 *अर्ज क्रमांक (App ID):* ${app.id}\n` +
        `👤 *अर्जदार नाव:* ${app.name}\n` +
        `📱 *मोबाईल नंबर:* ${app.mobile}\n` +
        `📧 *ईमेल:* ${app.email || 'उपलब्ध नाही'}\n` +
        `💰 *कर्ज योजना:* ${app.loanName}\n` +
        `💵 *मागणी केलेली रक्कम:* ₹${amountFormatted}\n` +
        `⏳ *परतफेड कालावधी:* ${app.tenure} महिने\n` +
        `📊 *अंदाजित मासिक EMI:* ₹${emiFormatted}/महिना\n` +
        `💼 *रोजगार प्रकार:* ${app.employment === 'Salaried' || app.employmentType === 'salaried' ? 'वेतनधारक (Salaried)' : 'स्वयंरोजगार (Business)'}\n` +
        `💵 *मासिक उत्पन्न:* ₹${incomeFormatted}\n` +
        `📍 *शहर / पत्ता:* ${app.city || 'महाराष्ट्र'}\n` +
        `📅 *अर्ज तारीख:* ${dateFormatted}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `कृपया माझ्या अर्जाची पडताळणी करून पुढील कर्ज वाटप प्रक्रिया सुरू करावी. धन्यवाद!`
      : `*New Loan Application - MahaLoan Finance*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📌 *Application ID:* ${app.id}\n` +
        `👤 *Applicant Name:* ${app.name}\n` +
        `📱 *Mobile Number:* ${app.mobile}\n` +
        `📧 *Email:* ${app.email || 'N/A'}\n` +
        `💰 *Loan Scheme:* ${app.loanName}\n` +
        `💵 *Requested Amount:* ₹${amountFormatted}\n` +
        `⏳ *Repayment Tenure:* ${app.tenure} Months\n` +
        `📊 *Est. Monthly EMI:* ₹${emiFormatted}/month\n` +
        `💼 *Employment:* ${app.employment === 'Salaried' || app.employmentType === 'salaried' ? 'Salaried' : 'Self-Employed'}\n` +
        `💵 *Monthly Income:* ₹${incomeFormatted}\n` +
        `📍 *City / Address:* ${app.city || 'Maharashtra'}\n` +
        `📅 *Date:* ${dateFormatted}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Kindly review my loan application and initiate the verification process. Thank you!`;

    const targetPhone = (siteSettings?.whatsappNumber || '919822012345').replace(/\D/g, '');
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdApp = submitApplication(formData);
    setSubmittedApp(createdApp);
    
    // Automatically open application details directly in WhatsApp
    try {
      const waUrl = getWhatsAppUrl(createdApp);
      window.open(waUrl, '_blank');
    } catch (err) {
      console.log('WhatsApp auto open error:', err);
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti err', err);
    }
  };

  const handleCopyId = () => {
    if (submittedApp) {
      navigator.clipboard.writeText(submittedApp.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const stepsList = [
    { titleMr: 'वैयक्तिक माहिती', titleEn: 'Personal Info', icon: User },
    { titleMr: 'केवायसी (KYC)', titleEn: 'KYC Details', icon: CreditCard },
    { titleMr: 'रोजगार व उत्पन्न', titleEn: 'Employment', icon: Briefcase },
    { titleMr: 'कर्जाची मागणी', titleEn: 'Loan Details', icon: IndianRupee },
    { titleMr: 'कागदपत्रे अपलोड', titleEn: 'Documents', icon: Upload },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={closeApplyModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'mr' ? '100% सुरक्षित आणि जलद ऑनलाइन अर्ज' : '100% Secure & Fast Online Application'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {submittedApp 
              ? (lang === 'mr' ? 'अर्ज यशस्वीरीत्या सादर केला!' : 'Application Submitted Successfully!') 
              : (lang === 'mr' ? 'कर्ज अर्ज फॉर्म (Loan Application)' : 'Loan Application Form')}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {submittedApp
              ? (lang === 'mr' ? 'तुमची नोंदणी पूर्ण झाली आहे. आमचा प्रतिनिधी लवकरच संपर्क करेल.' : 'Your application is registered. We will review and reach out soon.')
              : (lang === 'mr' ? 'फक्त 5 सोप्या पायऱ्यांमध्ये अर्ज पूर्ण करा आणि 24 तासांत मंजुरी मिळवा.' : 'Complete in 5 quick steps for approval within 24 hours.')}
          </p>

          {/* Stepper (Only when not submitted) */}
          {!submittedApp && (
            <div className="mt-6 flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 z-0" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 transition-all duration-300 z-0"
                style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
              />

              {stepsList.map((st, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < step;
                const isCurrent = stepNum === step;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted 
                          ? 'bg-emerald-500 text-white' 
                          : isCurrent 
                            ? 'bg-white text-slate-900 ring-4 ring-emerald-500/30' 
                            : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          
          {/* SUCCESS SCREEN */}
          {submittedApp ? (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900">
                  {lang === 'mr' ? 'अभिनंदन! अर्ज प्राप्त झाला.' : 'Congratulations! Application Received.'}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {lang === 'mr'
                    ? 'तुमचा कर्ज अर्ज पडताळणी कक्षाकडे पाठवला गेला आहे.'
                    : 'Your loan application is now in the verification pipeline.'}
                </p>
              </div>

              {/* WhatsApp Auto-Share Alert Banner */}
              <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-900 max-w-lg mx-auto shadow-xs">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                      <span>{lang === 'mr' ? 'व्हॉट्सॲपवर अर्ज उघडला गेला आहे' : 'Application Shared to WhatsApp'}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">
                      {lang === 'mr' 
                        ? 'मेसेज आपोआप उघडला नसल्यास खालील बटणावर क्लिक करा.' 
                        : 'If WhatsApp window did not open, click the button below.'}
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppUrl(submittedApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shrink-0 flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{lang === 'mr' ? 'उघडा' : 'Open'}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Application Details Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold">{lang === 'mr' ? 'अर्ज क्रमांक (Application ID):' : 'Application ID:'}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-emerald-700 tracking-wider font-mono">
                      {submittedApp.id}
                    </span>
                    <button 
                      onClick={handleCopyId}
                      className="p-1 text-slate-500 hover:text-emerald-700 rounded bg-white border border-slate-200 text-xs flex items-center gap-1"
                      title="Copy ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? (lang === 'mr' ? 'कॉपी झाले!' : 'Copied!') : (lang === 'mr' ? 'कॉपी' : 'Copy')}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">{lang === 'mr' ? 'अर्जदार नाव:' : 'Applicant Name:'}</span>
                    <div className="font-bold text-slate-800">{submittedApp.name}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">{lang === 'mr' ? 'मोबाईल नंबर:' : 'Mobile Number:'}</span>
                    <div className="font-bold text-slate-800">{submittedApp.mobile}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">{lang === 'mr' ? 'कर्ज योजना:' : 'Loan Type:'}</span>
                    <div className="font-bold text-slate-800">{submittedApp.loanName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">{lang === 'mr' ? 'मागणी केलेली रक्कम:' : 'Requested Amount:'}</span>
                    <div className="font-bold text-emerald-700">{formatCurrency(submittedApp.amount)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">{lang === 'mr' ? 'कालावधी:' : 'Tenure:'}</span>
                    <div className="font-bold text-slate-800">{submittedApp.tenure} {lang === 'mr' ? 'महिने' : 'Months'}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">{lang === 'mr' ? 'मासिक अंदाजित EMI:' : 'Est. Monthly EMI:'}</span>
                    <div className="font-bold text-slate-800">{formatCurrency(submittedApp.monthlyEmi)}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'mr' 
                      ? 'पुढील माहिती एसएमएस व व्हॉट्सॲपवर पाठवली जाईल.' 
                      : 'Status updates will be notified via SMS and WhatsApp.'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={getWhatsAppUrl(submittedApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{lang === 'mr' ? 'व्हॉट्सॲपवर मेसेज पाठवा' : 'Send via WhatsApp'}</span>
                </a>

                <button
                  onClick={() => {
                    closeApplyModal();
                    openTrackModal(submittedApp.id);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{lang === 'mr' ? 'थेट स्थिती ट्रॅक करा' : 'Track Application Status'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrint}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'पावती प्रिंट करा' : 'Print Receipt'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* MULTI-STEP FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'mr' ? 'पायरी 1: वैयक्तिक व संपर्क माहिती' : 'Step 1: Personal & Contact Information'}</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'mr' ? 'पूर्ण नाव (आधार कार्डाप्रमाणे) *' : 'Full Name (as per Aadhaar) *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'mr' ? 'उदा. सचिन रमेश कदम' : 'e.g. Sachin Ramesh Kadam'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'mr' ? 'मोबाईल नंबर (10 अंकी) *' : 'Mobile Number (10 digits) *'}
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="98XXXXXXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 ${
                          errors.mobile ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sachin@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'mr' ? 'शहर / गाव *' : 'City / Village *'}
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder={lang === 'mr' ? 'उदा. पुणे, नाशिक, सातारा' : 'e.g. Pune, Nashik, Satara'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'mr' ? 'राज्य' : 'State'}
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-slate-50"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: KYC Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'mr' ? 'पायरी 2: केवायसी व ओळख पडताळणी' : 'Step 2: KYC & Identity Verification'}</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'mr' ? 'आधार कार्ड क्रमांक (12 अंकी) *' : 'Aadhaar Number (12 digits) *'}
                    </label>
                    <input
                      type="text"
                      name="aadhaar"
                      maxLength={14}
                      value={formData.aadhaar}
                      onChange={handleChange}
                      placeholder="1234-5678-9012"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 font-mono ${
                        errors.aadhaar ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.aadhaar && <p className="text-xs text-red-600 mt-1">{errors.aadhaar}</p>}
                    <span className="text-[11px] text-slate-500">
                      {lang === 'mr' ? 'तुमचा डेटा UIDAI आणि RBI नियमांनुसार एनक्रिप्टेड राहील.' : 'Encrypted per UIDAI standards.'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'mr' ? 'पॅन कार्ड क्रमांक (PAN Card) *' : 'PAN Card Number *'}
                    </label>
                    <input
                      type="text"
                      name="pan"
                      maxLength={10}
                      value={formData.pan}
                      onChange={(e) => setFormData(prev => ({ ...prev, pan: e.target.value.toUpperCase() }))}
                      placeholder="ABCDE1234F"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 uppercase font-mono ${
                        errors.pan ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.pan && <p className="text-xs text-red-600 mt-1">{errors.pan}</p>}
                  </div>

                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {lang === 'mr'
                        ? 'आधार व पॅन क्रमांकाच्या आधारे प्राथमिक पात्रता व सिबिल स्कोअर त्वरित तपासला जाईल.'
                        : 'Your PAN & Aadhaar details allow instant credit check without impacting your credit score negatively.'}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 3: Employment & Income */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'mr' ? 'पायरी 3: रोजगार आणि मासिक उत्पन्न' : 'Step 3: Employment & Income'}</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'mr' ? 'रोजगाराचा प्रकार (Employment Type) *' : 'Employment Type *'}
                    </label>
                    <select
                      name="employment"
                      value={formData.employment}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white"
                    >
                      <option value="Salaried">{lang === 'mr' ? 'वेतनधारक (Salaried / नोकरी)' : 'Salaried Employee'}</option>
                      <option value="Self-Employed">{lang === 'mr' ? 'व्यावसायिक / दुकानदार (Business)' : 'Self-Employed / Business'}</option>
                      <option value="Farmer">{lang === 'mr' ? 'शेतकरी बंधू (Farmer / Agriculture)' : 'Farmer / Agriculturalist'}</option>
                      <option value="Professional">{lang === 'mr' ? 'प्रोफेशनल (डॉक्टर / सीए / वकील)' : 'Doctor / CA / Lawyer'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'mr' ? 'कंपनी / व्यवसायाचे नाव किंवा शेती तपशील' : 'Company / Business / Farm details'}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={lang === 'mr' ? 'उदा. टाटा मोटर्स / किराणा स्टोअर्स / शेतकरी' : 'e.g. Tata Motors / Retail Shop'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        {lang === 'mr' ? 'मासिक निव्वळ उत्पन्न (Monthly In-hand Income) *' : 'Monthly Net Income *'}
                      </label>
                      <span className="text-sm font-black text-emerald-700">
                        {formatCurrency(formData.income)}
                      </span>
                    </div>
                    <input
                      type="number"
                      name="income"
                      step="1000"
                      value={formData.income}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800"
                    />
                    {errors.income && <p className="text-xs text-red-600 mt-1">{errors.income}</p>}
                  </div>
                </div>
              )}

              {/* STEP 4: Loan Requirement */}
              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'mr' ? 'पायरी 4: कर्जाची गरज आणि तपशील' : 'Step 4: Loan Requirement'}</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'mr' ? 'कर्ज योजना निवडा (Loan Type) *' : 'Select Loan Type *'}
                    </label>
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white"
                    >
                      {loanProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {lang === 'mr' ? `${p.nameMr} (@ ${p.rate})` : `${p.nameEn} (@ ${p.rate})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'mr' ? 'मागणी केलेली रक्कम (Amount in ₹) *' : 'Loan Amount Requested *'}
                      </label>
                      <input
                        type="number"
                        name="amount"
                        step="10000"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 font-semibold"
                      />
                      {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'mr' ? 'परतफेड कालावधी (Tenure in Months) *' : 'Tenure (Months) *'}
                      </label>
                      <select
                        name="tenure"
                        value={formData.tenure}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 bg-white"
                      >
                        <option value={12}>12 {lang === 'mr' ? 'महिने (1 वर्ष)' : 'Months (1 Yr)'}</option>
                        <option value={24}>24 {lang === 'mr' ? 'महिने (2 वर्षे)' : 'Months (2 Yrs)'}</option>
                        <option value={36}>36 {lang === 'mr' ? 'महिने (3 वर्षे)' : 'Months (3 Yrs)'}</option>
                        <option value={60}>60 {lang === 'mr' ? 'महिने (5 वर्षे)' : 'Months (5 Yrs)'}</option>
                        <option value={84}>84 {lang === 'mr' ? 'महिने (7 वर्षे)' : 'Months (7 Yrs)'}</option>
                        <option value={120}>120 {lang === 'mr' ? 'महिने (10 वर्षे)' : 'Months (10 Yrs)'}</option>
                        <option value={240}>240 {lang === 'mr' ? 'महिने (20 वर्षे)' : 'Months (20 Yrs)'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'mr' ? 'कर्जाचा उद्देश (Loan Purpose) *' : 'Purpose of Loan *'}
                    </label>
                    <textarea
                      name="purpose"
                      rows={2}
                      value={formData.purpose}
                      onChange={handleChange}
                      placeholder={lang === 'mr' ? 'उदा. घर दुरुस्ती, लग्न, नवीन यंत्रसामग्री, ठिबक सिंचन...' : 'e.g. Home Renovation, Business expansion, Medical...'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 ${
                        errors.purpose ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.purpose && <p className="text-xs text-red-600 mt-1">{errors.purpose}</p>}
                  </div>
                </div>
              )}

              {/* STEP 5: Document Upload */}
              {step === 5 && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'mr' ? 'पायरी 5: कागदपत्रे अपलोड (प्रत जोडा)' : 'Step 5: Document Upload'}</span>
                  </h4>

                  <p className="text-xs text-slate-500">
                    {lang === 'mr'
                      ? 'कागदपत्रे अपलोड केल्याने 24 तासांच्या आत जलद वितरण शक्य होते. (PDF / JPG / PNG स्वीकारले जातात).'
                      : 'Uploading clear copies expedites loan sanction within 24 hours (PDF / JPG supported).'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Aadhaar card dropzone */}
                    <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-all block">
                      <FileCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-700 block">
                        {lang === 'mr' ? 'आधार कार्ड प्रत (Aadhaar)' : 'Aadhaar Card Copy'}
                      </span>
                      <span className="text-[10px] text-slate-400">PDF / JPG (कमाल 5 MB)</span>
                      <input type="file" className="hidden" />
                      <span className="mt-2 inline-block text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                        {lang === 'mr' ? 'फाईल निवडा' : 'Choose File'}
                      </span>
                    </label>

                    {/* PAN Card */}
                    <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-all block">
                      <FileCheck className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-700 block">
                        {lang === 'mr' ? 'पॅन कार्ड प्रत (PAN Card)' : 'PAN Card Copy'}
                      </span>
                      <span className="text-[10px] text-slate-400">PDF / JPG (कमाल 5 MB)</span>
                      <input type="file" className="hidden" />
                      <span className="mt-2 inline-block text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                        {lang === 'mr' ? 'फाईल निवडा' : 'Choose File'}
                      </span>
                    </label>

                    {/* Income Proof */}
                    <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition-all block sm:col-span-2">
                      <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-700 block">
                        {lang === 'mr' ? 'बँक स्टेटमेंट / सॅलरी स्लिप / 7-12 उतारा' : 'Bank Statement / Salary Slip / 7-12 Extract'}
                      </span>
                      <span className="text-[10px] text-slate-400">मागील 3 महिन्यांचे स्टेटमेंट</span>
                      <input type="file" className="hidden" />
                      <span className="mt-2 inline-block text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                        {lang === 'mr' ? 'स्टेटमेंट जोडा' : 'Upload Statement'}
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="terms" defaultChecked className="rounded accent-emerald-600" />
                    <label htmlFor="terms" className="text-[11px] text-slate-600">
                      {lang === 'mr'
                        ? 'मी सर्व अटी व शर्ती मान्य करतो आणि दिलेली सर्व माहिती सत्य असल्याचे घोषित करतो.'
                        : 'I declare that the information provided is accurate and agree to terms & credit checks.'}
                    </label>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'मागे' : 'Back'}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{lang === 'mr' ? 'पुढील पायरी' : 'Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-black shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'अर्ज सबमिट करा (Submit)' : 'Submit Loan Application'}</span>
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
