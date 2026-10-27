import React, { useState } from 'react';
import { useLoan } from '../../context/LoanContext';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminLogin() {
  const { lang, adminLogin, setCurrentView } = useLoan();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg(lang === 'mr' ? 'कृपया ईमेल आयडी प्रविष्ट करा.' : 'Please enter your email ID.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg(lang === 'mr' ? 'कृपया पासवर्ड प्रविष्ट करा.' : 'Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = adminLogin(email, password);
      setIsLoading(false);

      if (res.success) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@mahaloan.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div 
      className="min-h-screen text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(10, 18, 38, 0.72) 0%, rgba(13, 24, 48, 0.76) 50%, rgba(8, 14, 30, 0.82) 100%), url('/bg-cyber.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Ambient glowing aurora spheres */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-xl shadow-amber-500/25 ring-4 ring-amber-400/20 mb-2 transform hover:scale-105 transition-transform">
            <ShieldCheck className="w-8 h-8 text-slate-950" />
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              महा<span className="text-amber-400">लोन</span>
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-xs">
              ADMIN SECURE
            </span>
          </div>
          
          <p className="text-xs text-slate-300 max-w-xs mx-auto">
            {lang === 'mr' 
              ? 'सुरक्षित ॲडमिनिस्ट्रेशन आणि कर्ज अंडररायटिंग कक्ष.' 
              : 'Secure Underwriting & Executive Dashboard Portal.'}
          </p>
        </div>

        {/* Login Card */}
        <div className="relative rounded-3xl bg-slate-900/85 border border-slate-700/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-5">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 rounded-t-3xl" />

          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-black text-white">
                {lang === 'mr' ? 'ॲडमिन लॉगिन' : 'Admin Sign In'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'mr' ? 'तुमचा ईमेल व पासवर्ड टाकून प्रवेश करा' : 'Enter your credentials to manage operations'}
              </p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <KeyRound className="w-4 h-4" />
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div className="font-semibold leading-relaxed">{errorMsg}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                {lang === 'mr' ? 'ईमेल आयडी (Email ID)' : 'Email ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="admin@mahaloan.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  {lang === 'mr' ? 'गोपनीय पासवर्ड (Password)' : 'Password'}
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials Helper */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-amber-300 hover:text-amber-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'mr' ? '⚡ त्वरित चाचणी: डेमो क्रेडेंशियल्स भरा' : '⚡ 1-Click Fill Demo Credentials'}</span>
              </button>
              <div className="text-[10px] text-slate-500 text-center mt-1">
                (admin@mahaloan.com / admin123)
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:brightness-105 active:scale-[0.99] text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'mr' ? 'प्रमाणिकरण होत आहे...' : 'Authenticating...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'mr' ? 'ॲडमिन पॅनलमध्ये प्रवेश करा' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Features */}
          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              256-Bit SSL
            </span>
            <span>•</span>
            <span>RBI Compliant</span>
            <span>•</span>
            <span>Encrypted Session</span>
          </div>
        </div>

        {/* Back to Customer Website Button */}
        <div className="text-center">
          <button
            onClick={() => {
              setCurrentView('customer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer p-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'ग्राहक मुख्य वेबसाईटवर परत जा' : 'Back to Customer Website'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}