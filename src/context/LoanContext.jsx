import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initialApplications, 
  loanProducts as defaultLoanProducts,
  faqList as defaultFaqList,
  customerReviews as defaultCustomerReviews,
  defaultSiteSettings 
} from '../data/loansData';

const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  // Language state: 'mr' (default Marathi) or 'en'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mahaloan_lang') || 'mr';
  });

  // Current View: always 'customer' (Admin panel removed)
  const [currentView, setCurrentView] = useState('customer');

  // 1. Site Settings (Hero, Contact, Announcements, Stats)
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('mahaloan_settings');
      if (saved) {
        return {
          ...JSON.parse(saved),
          helplinePhone: '+91 80100 61527',
          secondaryPhone: '+91 80100 61527',
          whatsappNumber: '918010061527'
        };
      }
    } catch (e) {
      console.error(e);
    }
    return defaultSiteSettings;
  });

  useEffect(() => {
    localStorage.setItem('mahaloan_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  const updateSiteSettings = (updates) => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
    showToast(lang === 'mr' ? 'वेबसाईट सेटिंग्ज अपडेट केल्या!' : 'Website settings updated successfully!');
  };

  // 2. Dynamic Loan Products (Add, Edit, Delete)
  const [loanProducts, setLoanProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('mahaloan_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultLoanProducts;
  });

  useEffect(() => {
    localStorage.setItem('mahaloan_products', JSON.stringify(loanProducts));
  }, [loanProducts]);

  const addLoanProduct = (product) => {
    setLoanProducts(prev => [...prev, product]);
    showToast(lang === 'mr' ? 'नवीन कर्ज योजना जोडली गेली!' : 'New loan product added successfully!');
  };

  const updateLoanProduct = (productId, updates) => {
    setLoanProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, ...updates };
      }
      return p;
    }));
    showToast(lang === 'mr' ? 'कर्ज योजना अपडेट केली!' : 'Loan scheme updated successfully!');
  };

  const deleteLoanProduct = (productId) => {
    setLoanProducts(prev => prev.filter(p => p.id !== productId));
    showToast(lang === 'mr' ? 'कर्ज योजना हटवली गेली!' : 'Loan scheme deleted!');
  };

  // 3. Dynamic FAQs (Add, Edit, Delete)
  const [faqs, setFaqs] = useState(() => {
    try {
      const saved = localStorage.getItem('mahaloan_faqs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultFaqList;
  });

  useEffect(() => {
    localStorage.setItem('mahaloan_faqs', JSON.stringify(faqs));
  }, [faqs]);

  const addFaq = (faq) => {
    setFaqs(prev => [...prev, faq]);
    showToast(lang === 'mr' ? 'नवीन प्रश्नोत्तर जोडले गेले!' : 'New FAQ added successfully!');
  };

  const updateFaq = (index, updates) => {
    setFaqs(prev => prev.map((f, i) => i === index ? { ...f, ...updates } : f));
    showToast(lang === 'mr' ? 'प्रश्नोत्तर अपडेट केले!' : 'FAQ updated successfully!');
  };

  const deleteFaq = (index) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
    showToast(lang === 'mr' ? 'प्रश्नोत्तर हटवले गेले!' : 'FAQ deleted!');
  };

  // 4. Dynamic Testimonials (Add, Edit, Delete)
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem('mahaloan_testimonials');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultCustomerReviews;
  });

  useEffect(() => {
    localStorage.setItem('mahaloan_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const addTestimonial = (review) => {
    setTestimonials(prev => [review, ...prev]);
    showToast(lang === 'mr' ? 'ग्राहकाचा अभिप्राय जोडला गेला!' : 'Customer review added successfully!');
  };

  const updateTestimonial = (index, updates) => {
    setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, ...updates } : t));
    showToast(lang === 'mr' ? 'अभिप्राय अपडेट केला!' : 'Review updated successfully!');
  };

  const deleteTestimonial = (index) => {
    setTestimonials(prev => prev.filter((_, i) => i !== index));
    showToast(lang === 'mr' ? 'अभिप्राय हटवला गेला!' : 'Review deleted!');
  };

  // 5. Applications list in state + localStorage persistence
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('mahaloan_applications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load applications from localStorage', e);
    }
    return initialApplications;
  });

  useEffect(() => {
    localStorage.setItem('mahaloan_applications', JSON.stringify(applications));
  }, [applications]);

  // Real-time multi-tab & cross-window sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'mahaloan_applications' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setApplications(parsed);
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('mahaloan_lang', lang);
  }, [lang]);

  // Modal controls
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState('personal');
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackSearchQuery, setTrackSearchQuery] = useState('');

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const openApplyModal = (loanTypeId = 'personal') => {
    setSelectedLoanType(loanTypeId);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  const openTrackModal = (initialQuery = '') => {
    setTrackSearchQuery(initialQuery);
    setIsTrackModalOpen(true);
  };

  const closeTrackModal = () => {
    setIsTrackModalOpen(false);
  };

  // Helper EMI formula
  const calculateEmi = (principal, annualRate, tenureMonths) => {
    if (!principal || !annualRate || !tenureMonths) return 0;
    const monthlyRate = annualRate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi);
  };

  // Submit new application (Customer site)
  const submitApplication = (formData) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `ML-2026-${randomDigits}`;
    
    const matchedProduct = loanProducts.find(p => p.id === formData.loanType);
    const rateNum = matchedProduct ? parseFloat(matchedProduct.rate) : 10.5;
    const computedEmi = calculateEmi(formData.amount, rateNum, formData.tenure);

    const newApp = {
      id: newId,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      city: formData.city,
      state: formData.state || 'Maharashtra',
      aadhaar: formData.aadhaar,
      pan: (formData.pan || 'ABCDE1234F').toUpperCase(),
      employment: formData.employment,
      company: formData.company || 'स्वयंरोजगार / Self-employed',
      income: Number(formData.income),
      loanType: formData.loanType,
      loanName: matchedProduct ? (lang === 'mr' ? matchedProduct.nameMr : matchedProduct.nameEn) : 'वैयक्तिक कर्ज',
      amount: Number(formData.amount),
      tenure: Number(formData.tenure),
      purpose: formData.purpose,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedAmount: 0,
      approvedRate: rateNum,
      monthlyEmi: computedEmi,
      disbursedDate: null,
      remarks: lang === 'mr' 
        ? 'तुमचा अर्ज यशस्वीरीत्या नोंदवला गेला आहे. कागदपत्रे प्राथमिक तपासणीसाठी पाठवली आहेत.'
        : 'Application received successfully. Documents are under initial verification.'
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(
      lang === 'mr' 
        ? `अभिनंदन! अर्ज क्र. ${newId} यशस्वीरीत्या सादर केला गेला.`
        : `Congratulations! Application ${newId} submitted successfully.`
    );
    return newApp;
  };

  // Admin: Add Application Directly
  const addApplicationByAdmin = (data) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = data.id || `ML-2026-${randomDigits}`;
    const matchedProduct = loanProducts.find(p => p.id === data.loanType);
    const rateNum = Number(data.approvedRate || (matchedProduct ? parseFloat(matchedProduct.rate) : 10.5));
    const principal = Number(data.status === 'Approved' || data.status === 'Disbursed' ? (data.approvedAmount || data.amount) : data.amount);
    const emi = calculateEmi(principal, rateNum, Number(data.tenure));

    const newEntry = {
      id: newId,
      name: data.name,
      mobile: data.mobile,
      email: data.email || 'customer@example.com',
      city: data.city || 'पुणे',
      state: data.state || 'Maharashtra',
      aadhaar: data.aadhaar || '1234-5678-9012',
      pan: (data.pan || 'ABCDE1234F').toUpperCase(),
      employment: data.employment || 'Salaried',
      company: data.company || 'स्वयंरोजगार',
      income: Number(data.income || 40000),
      loanType: data.loanType || 'personal',
      loanName: matchedProduct ? (lang === 'mr' ? matchedProduct.nameMr : matchedProduct.nameEn) : 'वैयक्तिक कर्ज',
      amount: Number(data.amount),
      tenure: Number(data.tenure || 36),
      purpose: data.purpose || 'सामान्य गरज',
      status: data.status || 'Pending',
      appliedDate: data.appliedDate || new Date().toISOString().split('T')[0],
      approvedAmount: data.status === 'Approved' || data.status === 'Disbursed' ? Number(data.approvedAmount || data.amount) : 0,
      approvedRate: rateNum,
      monthlyEmi: emi,
      disbursedDate: data.status === 'Disbursed' ? (data.disbursedDate || new Date().toISOString().split('T')[0]) : null,
      remarks: data.remarks || 'ॲडमिनद्वारे नवीन अर्ज प्रविष्ट करण्यात आला.'
    };

    setApplications(prev => [newEntry, ...prev]);
    showToast(lang === 'mr' ? `नवीन अर्ज ${newId} यशस्वीरीत्या जोडला गेला!` : `New Application ${newId} added successfully!`);
    return newEntry;
  };

  // Admin: Update / Edit application details
  const updateApplication = (id, updates) => {
    setApplications(prev => prev.map(app => {
      if (app.id === id) {
        const updated = { ...app, ...updates };
        const p = updated.status === 'Approved' || updated.status === 'Disbursed'
          ? (updated.approvedAmount || updated.amount)
          : updated.amount;
        const r = updated.approvedRate || 10.5;
        updated.monthlyEmi = calculateEmi(p, r, updated.tenure);

        if (updates.loanType) {
          const matched = loanProducts.find(x => x.id === updates.loanType);
          if (matched) {
            updated.loanName = lang === 'mr' ? matched.nameMr : matched.nameEn;
          }
        }
        return updated;
      }
      return app;
    }));
    showToast(lang === 'mr' ? 'अर्ज यशस्वीरीत्या बदलला/अपडेट केला!' : 'Application updated successfully!');
  };

  // Delete application
  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    showToast(lang === 'mr' ? 'अर्ज हटवला गेला.' : 'Application deleted.');
  };

  // Clear all applications (Purge dummy data)
  const clearAllApplications = () => {
    setApplications([]);
    localStorage.setItem('mahaloan_applications', JSON.stringify([]));
    showToast(lang === 'mr' ? 'सर्व डमी अर्ज यशस्वीरीत्या हटवले!' : 'All dummy applications removed!');
  };

  // Reset all to clean fresh state
  const resetDemoData = () => {
    setApplications([]);
    setLoanProducts(defaultLoanProducts);
    setFaqs(defaultFaqList);
    setTestimonials(defaultCustomerReviews);
    setSiteSettings(defaultSiteSettings);
    localStorage.setItem('mahaloan_applications', JSON.stringify([]));
    localStorage.removeItem('mahaloan_products');
    localStorage.removeItem('mahaloan_faqs');
    localStorage.removeItem('mahaloan_testimonials');
    localStorage.removeItem('mahaloan_settings');
    showToast(lang === 'mr' ? 'सर्व डमी डेटा काढून सिस्टीम स्वच्छ केली!' : 'All dummy data removed cleanly!');
  };

  // Search application by ID or Mobile
  const findApplication = (query) => {
    if (!query) return null;
    const cleanQ = query.trim().toLowerCase();
    return applications.find(a => 
      a.id.toLowerCase() === cleanQ || 
      a.mobile.replace(/\D/g, '') === cleanQ.replace(/\D/g, '') ||
      a.pan.toLowerCase() === cleanQ
    );
  };

  // Admin Authentication State: false by default unless already logged in
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('mahaloan_admin_auth') === 'true';
  });

  const adminLogin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const validEmails = ['admin@mahaloan.com', 'admin@loan.com', 'admin'];
    const validPasswords = ['admin', 'admin123', 'mahaloan', 'mahaloan123', '123456'];

    if (validEmails.includes(cleanEmail) && validPasswords.includes(cleanPass)) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('mahaloan_admin_auth', 'true');
      showToast(lang === 'mr' ? 'ॲडमिन लॉगिन यशस्वी! डॅशबोर्ड उघडत आहे...' : 'Admin login successful! Welcome to Dashboard.');
      return { success: true };
    } else {
      return { 
        success: false, 
        message: lang === 'mr' 
          ? 'अवैध ईमेल आयडी किंवा पासवर्ड! कृपया योग्य माहिती टाका.' 
          : 'Invalid Email ID or Password! Please check your credentials.' 
      };
    }
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('mahaloan_admin_auth');
    showToast(lang === 'mr' ? 'ॲडमिन लॉगआउट यशस्वी झाले!' : 'Admin logged out successfully!');
  };

  return (
    <LoanContext.Provider value={{
      lang,
      setLang,
      currentView,
      setCurrentView,
      isAdminAuthenticated,
      adminLogin,
      adminLogout,
      siteSettings,
      updateSiteSettings,
      loanProducts,
      addLoanProduct,
      updateLoanProduct,
      deleteLoanProduct,
      faqs,
      addFaq,
      updateFaq,
      deleteFaq,
      testimonials,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      applications,
      isApplyModalOpen,
      openApplyModal,
      closeApplyModal,
      selectedLoanType,
      isTrackModalOpen,
      openTrackModal,
      closeTrackModal,
      trackSearchQuery,
      setTrackSearchQuery,
      submitApplication,
      addApplicationByAdmin,
      updateApplication,
      deleteApplication,
      clearAllApplications,
      resetDemoData,
      findApplication,
      calculateEmi,
      toast,
      showToast
    }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => useContext(LoanContext);
