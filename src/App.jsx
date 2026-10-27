import React from 'react';
import { LoanProvider, useLoan } from './context/LoanContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoanProducts from './components/LoanProducts';
import EmiCalculator from './components/EmiCalculator';
import EligibilityChecker from './components/EligibilityChecker';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoanApplicationModal from './components/LoanApplicationModal';
import StatusTracker from './components/StatusTracker';
import FloatingActions from './components/FloatingActions';
import { CheckCircle2 } from 'lucide-react';

function MainContent() {
  const { toast } = useLoan();

  return (
    <div 
      className="min-h-screen bg-slate-950 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white"
      style={{
        backgroundImage: `url('/bg-cyber.png')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-24 right-5 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-950 text-white shadow-2xl border border-emerald-500/50 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Website View */}
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LoanProducts />
        <EmiCalculator />
        <EligibilityChecker />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Persistent Interactive Modals */}
      <LoanApplicationModal />
      <StatusTracker />
      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <LoanProvider>
      <MainContent />
    </LoanProvider>
  );
}
