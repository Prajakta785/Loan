import React, { useState, useEffect } from 'react';
import { useLoan } from '../context/LoanContext';
import { 
  X, 
  Search, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  PhoneCall, 
  ShieldCheck, 
  Calendar,
  Building,
  User,
  IndianRupee,
  HelpCircle
} from 'lucide-react';

export default function StatusTracker() {
  const { 
    lang, 
    isTrackModalOpen, 
    closeTrackModal, 
    trackSearchQuery, 
    findApplication,
    applications 
  } = useLoan();

  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (trackSearchQuery) {
      setQuery(trackSearchQuery);
      const app = findApplication(trackSearchQuery);
      setResult(app);
      setHasSearched(true);
    } else {
      setQuery('');
      setResult(null);
      setHasSearched(false);
    }
  }, [trackSearchQuery, isTrackModalOpen]);

  if (!isTrackModalOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = findApplication(query);
    setResult(found);
    setHasSearched(true);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // 5 Stages Timeline mapping
  const stages = [
    { key: 'submitted', labelMr: 'अर्ज सादर', labelEn: 'Submitted', descMr: 'अर्ज प्राप्त झाला' },
    { key: 'review', labelMr: 'प्राथमिक तपासणी', labelEn: 'Under Review', descMr: 'सिबिल व पात्रता पडताळणी' },
    { key: 'kyc', labelMr: 'दस्तऐवज तपासणी', labelEn: 'Doc Verification', descMr: 'केवायसी व बँक तपासणी' },
    { key: 'approved', labelMr: 'कर्ज मंजूर', labelEn: 'Sanctioned', descMr: 'कर्ज पत्र जारी' },
    { key: 'disbursed', labelMr: 'खात्यात जमा', labelEn: 'Disbursed', descMr: 'रक्कम खात्यात वर्ग' },
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Rejected': return -1;
      case 'Pending': return 1; // Under review / verification
      case 'Approved': return 3; // Sanctioned
      case 'Disbursed': return 4; // Complete
      default: return 0;
    }
  };

  const currentStageIndex = result ? getStageIndex(result.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 sm:p-6 relative">
          <button
            onClick={closeTrackModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>{lang === 'mr' ? 'रिअल-टाइम अर्ज स्थिती' : 'Real-time Application Status'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {lang === 'mr' ? 'कर्ज अर्ज स्थिती ट्रॅक करा' : 'Track Your Loan Application'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {lang === 'mr' 
              ? 'तुमचा अर्ज क्रमांक (उदा. ML-2026-8012) किंवा नोंदणीकृत मोबाईल नंबर टाका.' 
              : 'Enter Application ID (e.g. ML-2026-8012) or Registered Mobile Number.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'mr' ? 'अर्ज क्र. (उदा. ML-2026-8012) किंवा मोबाईल...' : 'Application ID or Mobile...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              {lang === 'mr' ? 'शोधा' : 'Search'}
            </button>
          </form>

          {/* Quick Demo Search Chips */}
          {!hasSearched && applications.length > 0 && (
            <div className="text-xs text-slate-500 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-semibold block text-slate-700">
                {lang === 'mr' ? 'चाचणीसाठी उपलब्ध अर्ज (क्लिक करा):' : 'Try sample applications (click to view):'}
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {applications.slice(0, 3).map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      setQuery(a.id);
                      setResult(a);
                      setHasSearched(true);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-[11px] font-mono text-slate-700 cursor-pointer"
                  >
                    {a.id} ({a.name.split(' ')[0]} - {a.status})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Result Display */}
          {hasSearched && (
            result ? (
              <div className="space-y-6">
                
                {/* Status Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">{lang === 'mr' ? 'अर्ज क्रमांक' : 'Application ID'}</span>
                    <div className="text-lg font-black text-slate-900 font-mono">{result.id}</div>
                  </div>

                  {/* Status Pills */}
                  {result.status === 'Approved' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {lang === 'mr' ? 'मंजूर (Approved)' : 'Approved'}
                    </span>
                  )}
                  {result.status === 'Disbursed' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      {lang === 'mr' ? 'रक्कम वितरित (Disbursed)' : 'Disbursed'}
                    </span>
                  )}
                  {result.status === 'Pending' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      <Clock className="w-4 h-4 text-amber-600" />
                      {lang === 'mr' ? 'प्रलंबित (Under Review)' : 'Under Review'}
                    </span>
                  )}
                  {result.status === 'Rejected' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
                      <XCircle className="w-4 h-4 text-red-600" />
                      {lang === 'mr' ? 'नामंजूर (Rejected)' : 'Rejected'}
                    </span>
                  )}
                </div>

                {/* 5-Step Visual Timeline (If not rejected) */}
                {result.status !== 'Rejected' ? (
                  <div className="py-2">
                    <div className="flex items-center justify-between relative mb-2">
                      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0" />
                      <div 
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-500 z-0"
                        style={{ width: `${Math.min(100, Math.max(0, (currentStageIndex / (stages.length - 1)) * 100))}%` }}
                      />

                      {stages.map((st, idx) => {
                        const isDone = idx <= currentStageIndex;
                        const isCurrent = idx === currentStageIndex;
                        return (
                          <div key={st.key} className="relative z-10 flex flex-col items-center">
                            <div 
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDone 
                                  ? 'bg-emerald-600 text-white shadow-xs' 
                                  : 'bg-slate-200 text-slate-500'
                              }`}
                            >
                              {isDone ? <CheckCircle2 className="w-4 h-4" /> : (idx + 1)}
                            </div>
                            <span className="text-[10px] font-bold text-slate-700 mt-2 text-center hidden sm:block max-w-[70px]">
                              {lang === 'mr' ? st.labelMr : st.labelEn}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-xs">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-sm block mb-1">
                        {lang === 'mr' ? 'अर्ज नामंजूर करण्यात आला आहे' : 'Application Not Approved'}
                      </strong>
                      <span>
                        {result.remarks || (lang === 'mr' 
                          ? 'सिबिल निकष किंवा उत्पन्नाची मर्यादा पूर्ण न झाल्यामुळे अर्ज नामंजूर झाला आहे.' 
                          : 'Application could not be approved due to credit score or income criteria.')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Details Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block">{lang === 'mr' ? 'अर्जदार:' : 'Applicant:'}</span>
                    <strong className="text-slate-800">{result.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{lang === 'mr' ? 'योजना प्रकार:' : 'Loan Type:'}</span>
                    <strong className="text-slate-800">{result.loanName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{lang === 'mr' ? 'अर्ज दिनांक:' : 'Date Applied:'}</span>
                    <strong className="text-slate-800">{result.appliedDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{lang === 'mr' ? 'मागणी केलेली रक्कम:' : 'Requested Amount:'}</span>
                    <strong className="text-slate-800">{formatCurrency(result.amount)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{lang === 'mr' ? 'मंजूर रक्कम:' : 'Sanctioned Amount:'}</span>
                    <strong className="text-emerald-700 font-bold">
                      {result.approvedAmount > 0 ? formatCurrency(result.approvedAmount) : (lang === 'mr' ? 'प्रक्रिया सुरू' : 'In Review')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{lang === 'mr' ? 'मासिक हप्ता (EMI):' : 'Monthly EMI:'}</span>
                    <strong className="text-slate-800 font-bold">{formatCurrency(result.monthlyEmi)}</strong>
                  </div>
                </div>

                {/* Admin Remarks */}
                {result.remarks && (
                  <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-900">
                    <span className="font-bold text-[11px] uppercase tracking-wider block text-indigo-600 mb-1">
                      {lang === 'mr' ? 'कर्ज अधिकाऱ्यांची टिप्पणी (Admin Remarks):' : 'Loan Officer Remarks:'}
                    </span>
                    <p className="leading-relaxed">{result.remarks}</p>
                  </div>
                )}

                {/* Contact Help desk */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    {lang === 'mr' ? 'काही शंका असल्यास मदत कक्षाशी बोला:' : 'Need assistance with this application?'}
                  </span>
                  <a 
                    href="tel:18002008899" 
                    className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>1800-200-8899</span>
                  </a>
                </div>

              </div>
            ) : (
              /* Not Found */
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  {lang === 'mr' ? 'अर्ज सापडला नाही' : 'No Application Found'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {lang === 'mr'
                    ? 'दिलेला अर्ज क्रमांक किंवा मोबाईल नंबर तपासणी करून पुन्हा प्रयत्न करा.'
                    : 'Please check your application ID or mobile number and try again.'}
                </p>
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}
