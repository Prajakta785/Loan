import React, { useState } from 'react';
import { useLoan } from '../../context/LoanContext';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Banknote, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  RotateCcw, 
  Download, 
  Printer, 
  ShieldCheck, 
  ChevronRight, 
  X,
  CreditCard,
  Building,
  Check,
  AlertTriangle,
  TrendingUp,
  Percent,
  Calendar,
  LogOut,
  Sparkles,
  PlusCircle,
  Edit,
  Sliders,
  DollarSign,
  ArrowUpRight,
  UserPlus,
  RefreshCw,
  Bell,
  CheckCircle,
  Globe,
  HelpCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Send,
  Upload,
  FileCheck,
  User,
  Briefcase,
  Menu,
  Sun,
  Moon,
  Palette,
  Languages
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminDashboard() {
  const { 
    lang, 
    setCurrentView, 
    applications, 
    addApplicationByAdmin,
    updateApplication, 
    deleteApplication, 
    resetDemoData,
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
    siteSettings,
    updateSiteSettings,
    calculateEmi,
    adminLogout,
    showToast
  } = useLoan();

  // Navigation tab in Admin:
  // 'overview' | 'applications' | 'loan-form' | 'website-cms' | 'customers' | 'rates' | 'repayments'
  const [activeTab, setActiveTab] = useState('overview');

  // Responsive Sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Admin Theme: 'cyber' (Default Dark Cyber Theme)
  const [adminTheme, setAdminTheme] = useState(() => {
    localStorage.setItem('mahaloan_admin_theme', 'cyber');
    return 'cyber';
  });

  const handleThemeChange = (newTheme) => {
    setAdminTheme(newTheme);
    localStorage.setItem('mahaloan_admin_theme', newTheme);
  };

  // Website CMS Sub-tab: 'hero' | 'products' | 'faqs' | 'reviews' | 'contact'
  const [cmsTab, setCmsTab] = useState('hero');

  // Application Filter & Search
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loanTypeFilter, setLoanTypeFilter] = useState('All');
  const [chartTimeframe, setChartTimeframe] = useState('6M');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editAppModal, setEditAppModal] = useState(null);
  const [viewDetailModal, setViewDetailModal] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductModal, setNewProductModal] = useState(false);
  const [newFaqModal, setNewFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [newReviewModal, setNewReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // Settings Edit Form State
  const [cmsForm, setCmsForm] = useState({ ...siteSettings });

  // Embedded Loan Form State in Admin
  const [adminLoanForm, setAdminLoanForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: 'पुणे',
    state: 'Maharashtra',
    pan: '',
    aadhaar: '',
    employment: 'Salaried',
    company: '',
    income: 50000,
    loanType: 'personal',
    amount: 500000,
    tenure: 36,
    purpose: '',
    status: 'Pending',
    approvedAmount: 500000,
    approvedRate: 10.5,
    remarks: ''
  });
  const [adminFormSuccess, setAdminFormSuccess] = useState(null);

  // New Application Modal State
  const [newAppForm, setNewAppForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: 'Maharashtra',
    pan: '',
    aadhaar: '',
    employment: 'Salaried',
    company: '',
    income: '',
    loanType: 'personal',
    amount: '',
    tenure: 36,
    purpose: '',
    status: 'Pending',
    approvedAmount: '',
    approvedRate: 10.5,
    remarks: ''
  });

  // Edit Application Form State
  const [editForm, setEditForm] = useState({});

  // New Loan Product Form State
  const [newProdForm, setNewProdForm] = useState({
    id: '',
    nameMr: '',
    nameEn: '',
    rate: '9.5%',
    maxAmount: '₹50,00,000',
    tenure: '12 ते 84 महिने',
    tenureEn: '12 to 84 Months',
    tagMr: 'नवीन योजना',
    tagEn: 'New Scheme',
    descMr: 'विशेष सवलतीचे कर्ज योजना',
    descEn: 'Special customized loan scheme',
    color: 'from-blue-600 to-indigo-600',
    icon: 'UserCheck'
  });

  // FAQ Form State
  const [faqForm, setFaqForm] = useState({
    qMr: '',
    qEn: '',
    aMr: '',
    aEn: ''
  });

  // Review Form State
  const [reviewForm, setReviewForm] = useState({
    name: '',
    city: 'पुणे',
    loan: 'वैयक्तिक कर्ज • ₹5 लाख',
    rating: 5,
    commentMr: '',
    commentEn: ''
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // KPIs
  const totalApps = applications.length;
  const approvedApps = applications.filter(a => a.status === 'Approved' || a.status === 'Disbursed').length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const disbursedApps = applications.filter(a => a.status === 'Disbursed').length;
  const rejectedApps = applications.filter(a => a.status === 'Rejected').length;

  const totalSanctionedAmount = applications
    .filter(a => a.status === 'Approved' || a.status === 'Disbursed')
    .reduce((sum, a) => sum + (a.approvedAmount || a.amount), 0);

  const totalDisbursedAmount = applications
    .filter(a => a.status === 'Disbursed')
    .reduce((sum, a) => sum + (a.approvedAmount || a.amount), 0);

  // Filtered applications
  const filteredApps = applications.filter(a => {
    const matchesStatus = statusFilter === 'All' ? true : a.status === statusFilter;
    const matchesType = loanTypeFilter === 'All' ? true : a.loanType === loanTypeFilter;
    const q = (searchQuery || '').toLowerCase().trim();
    const matchesSearch = !q || 
      (a.id && a.id.toLowerCase().includes(q)) ||
      (a.name && a.name.toLowerCase().includes(q)) ||
      (a.mobile && a.mobile.includes(q)) ||
      (a.city && a.city.toLowerCase().includes(q)) ||
      (a.pan && a.pan.toLowerCase().includes(q));

    return matchesStatus && matchesType && matchesSearch;
  });

  // Unique customers list
  const customers = Array.from(
    applications.reduce((map, app) => {
      if (!map.has(app.mobile)) {
        map.set(app.mobile, {
          name: app.name,
          mobile: app.mobile,
          email: app.email,
          city: app.city,
          pan: app.pan,
          aadhaar: app.aadhaar,
          employment: app.employment,
          totalLoans: 1,
          totalAmount: app.amount,
          lastStatus: app.status
        });
      } else {
        const existing = map.get(app.mobile);
        existing.totalLoans += 1;
        existing.totalAmount += app.amount;
      }
      return map;
    }, new Map()).values()
  );

  // Open Edit Application Modal
  const handleOpenEdit = (app) => {
    setEditForm({ ...app });
    setEditAppModal(app);
  };

  // Save Edit Application
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editAppModal) return;
    updateApplication(editAppModal.id, {
      name: editForm.name,
      mobile: editForm.mobile,
      email: editForm.email,
      city: editForm.city,
      pan: editForm.pan.toUpperCase(),
      aadhaar: editForm.aadhaar,
      employment: editForm.employment,
      company: editForm.company,
      income: Number(editForm.income),
      loanType: editForm.loanType,
      amount: Number(editForm.amount),
      tenure: Number(editForm.tenure),
      purpose: editForm.purpose,
      status: editForm.status,
      approvedAmount: Number(editForm.approvedAmount),
      approvedRate: Number(editForm.approvedRate),
      remarks: editForm.remarks,
      disbursedDate: editForm.status === 'Disbursed' && !editForm.disbursedDate
        ? new Date().toISOString().split('T')[0]
        : editForm.disbursedDate
    });
    setEditAppModal(null);
  };

  // Handle Add Application Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAppForm.name || !newAppForm.mobile) {
      showToast(lang === 'mr' ? 'कृपया नाव व मोबाईल प्रविष्ट करा' : 'Please enter Name and Mobile', 'error');
      return;
    }
    addApplicationByAdmin(newAppForm);
    setIsAddModalOpen(false);
    setActiveTab('applications');
  };

  // Embedded Loan Form Submission in Admin Tab
  const handleAdminLoanFormSubmit = (e) => {
    e.preventDefault();
    if (!adminLoanForm.name || !adminLoanForm.mobile) {
      showToast(lang === 'mr' ? 'कृपया नाव आणि मोबाईल प्रविष्ट करा' : 'Name and Mobile are required', 'error');
      return;
    }
    const created = addApplicationByAdmin(adminLoanForm);
    setAdminFormSuccess(created);
    // Reset form fields
    setAdminLoanForm({
      name: '',
      mobile: '',
      email: '',
      city: 'पुणे',
      state: 'Maharashtra',
      pan: '',
      aadhaar: '',
      employment: 'Salaried',
      company: '',
      income: 50000,
      loanType: 'personal',
      amount: 500000,
      tenure: 36,
      purpose: '',
      status: 'Pending',
      approvedAmount: 500000,
      approvedRate: 10.5,
      remarks: ''
    });
    // Automatically switch to applications tab so newly added data is instantly visible
    setActiveTab('applications');
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
  };

  // Quick 1-click status actions
  const handleQuickStatusChange = (id, newStatus) => {
    const app = applications.find(a => a.id === id);
    const updates = { status: newStatus };
    if (newStatus === 'Approved') {
      updates.approvedAmount = app.approvedAmount || app.amount;
      updates.remarks = 'कर्ज प्राथमिक पडताळणीअंती मंजूर (Approved) करण्यात आले आहे.';
    } else if (newStatus === 'Disbursed') {
      updates.approvedAmount = app.approvedAmount || app.amount;
      updates.disbursedDate = new Date().toISOString().split('T')[0];
      updates.remarks = 'रक्कम बँक खात्यात आरटीजीएस द्वारे वर्ग करण्यात आली आहे.';
    } else if (newStatus === 'Rejected') {
      updates.remarks = 'सिबिल निकष किंवा कागदपत्रे अपूर्ण असल्याने अर्ज नामंजूर.';
    }
    updateApplication(id, updates);
  };

  // Save Settings Changes (CMS)
  const handleSaveCmsSettings = (e) => {
    e.preventDefault();
    updateSiteSettings(cmsForm);
  };

  // Handle Add Product Submit
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProdForm.nameMr || !newProdForm.rate) return;
    const pId = newProdForm.id || newProdForm.nameEn.toLowerCase().replace(/\s+/g, '-') || `loan-${Date.now()}`;
    addLoanProduct({
      ...newProdForm,
      id: pId,
      featuresMr: ['त्वरित मंजुरी', 'किमान कागदपत्रे', 'सुलभ हप्ते'],
      featuresEn: ['Fast approval', 'Minimal documents', 'Flexible EMIs'],
      eligibleMr: 'स्थिर उत्पन्न स्रोत असलेले नागरिक',
      eligibleEn: 'Citizens with steady verifiable income'
    });
    setNewProductModal(false);
    setNewProdForm({
      id: '',
      nameMr: '',
      nameEn: '',
      rate: '9.5%',
      maxAmount: '₹50,00,000',
      tenure: '12 ते 84 महिने',
      tenureEn: '12 to 84 Months',
      tagMr: 'नवीन योजना',
      tagEn: 'New Scheme',
      descMr: 'विशेष सवलतीचे कर्ज योजना',
      descEn: 'Special customized loan scheme',
      color: 'from-blue-600 to-indigo-600',
      icon: 'UserCheck'
    });
  };

  // Handle Add / Edit FAQ
  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!faqForm.qMr || !faqForm.aMr) return;
    if (editingFaq !== null) {
      updateFaq(editingFaq, faqForm);
      setEditingFaq(null);
    } else {
      addFaq(faqForm);
      setNewFaqModal(false);
    }
    setFaqForm({ qMr: '', qEn: '', aMr: '', aEn: '' });
  };

  // Handle Add / Edit Review
  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.commentMr) return;
    if (editingReview !== null) {
      updateTestimonial(editingReview, reviewForm);
      setEditingReview(null);
    } else {
      addTestimonial(reviewForm);
      setNewReviewModal(false);
    }
    setReviewForm({ name: '', city: 'पुणे', loan: 'वैयक्तिक कर्ज • ₹5 लाख', rating: 5, commentMr: '', commentEn: '' });
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Mobile', 'Email', 'City', 'PAN', 'Aadhaar', 'Loan Type', 'Amount', 'Status', 'Applied Date', 'Approved Amount', 'Monthly EMI'];
    const rows = applications.map(a => [
      a.id,
      `"${a.name}"`,
      a.mobile,
      a.email,
      `"${a.city}"`,
      a.pan,
      a.aadhaar,
      `"${a.loanName}"`,
      a.amount,
      a.status,
      a.appliedDate,
      a.approvedAmount,
      a.monthlyEmi
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mahaloan_applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(lang === 'mr' ? 'CSV फाईल डाऊनलोड झाली!' : 'CSV exported successfully!');
  };

  // Quick Stepper for Loan Scheme Rates
  const handleRateStep = (productId, delta) => {
    const product = loanProducts.find(p => p.id === productId);
    if (!product) return;
    const currentNum = parseFloat(product.rate) || 10.0;
    const newNum = Math.max(1.0, Math.min(36.0, currentNum + delta)).toFixed(1);
    updateLoanProduct(productId, { rate: `${newNum}%` });
    showToast(lang === 'mr' ? `${product.nameMr} चा व्याजदर ${newNum}% केला!` : `${product.nameEn} rate updated to ${newNum}%!`);
  };

  const navGroups = [
    {
      title: lang === 'mr' ? 'मुख्य मेनू' : 'MAIN MENU',
      items: [
        { id: 'overview', icon: LayoutDashboard, labelMr: 'डॅशबोर्ड सारांश', labelEn: 'Dashboard Overview' },
        { id: 'applications', icon: FileText, labelMr: 'कर्ज अर्ज व्यवस्थापन', labelEn: 'Applications', count: applications.length },
        { id: 'loan-form', icon: FileCheck, labelMr: 'कर्ज अर्ज फॉर्म', labelEn: 'Loan Application Form' },
      ]
    },
    {
      title: lang === 'mr' ? 'वेबसाईट व ग्राहक' : 'CMS & CUSTOMERS',
      items: [
        { id: 'website-cms', icon: Globe, labelMr: 'वेबसाईट CMS नियंत्रण', labelEn: 'Website Content CMS' },
        { id: 'customers', icon: Users, labelMr: 'ग्राहक निर्देशिका', labelEn: 'Customer Directory', count: customers.length },
      ]
    },
    {
      title: lang === 'mr' ? 'आर्थिक ऑपरेशन्स' : 'FINANCE & RATES',
      items: [
        { id: 'rates', icon: Sliders, labelMr: 'कर्ज योजना व्याजदर', labelEn: 'Loan Scheme Rates' },
        { id: 'repayments', icon: IndianRupee, labelMr: 'हप्ते व वाटप लेजर', labelEn: 'Repayments & EMIs' },
      ]
    }
  ];

  return (
    <div 
      className="h-screen overflow-hidden admin-theme-cyber text-slate-100 flex font-sans selection:bg-amber-400 selection:text-slate-950 transition-colors duration-200 relative"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(12, 22, 44, 0.45) 0%, rgba(15, 28, 56, 0.50) 50%, rgba(10, 18, 38, 0.55) 100%), url('/bg-cyber.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-xs md:hidden"
        />
      )}

      {/* ======================================================== */}
      {/* LEFT SIDEBAR (INDEPENDENT SCROLL PANEL)                  */}
      {/* ======================================================== */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-56 sm:w-60 h-[100dvh] bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-[100dvh] md:shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl md:shadow-none`}>
        
        {/* Sidebar Brand Header (Fixed at top of sidebar) */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="text-base font-black tracking-tight text-white">
                  महा<span className="text-amber-400">लोन</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold bg-amber-400 text-slate-950">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {lang === 'mr' ? 'कर्ज ऑपरेशन्स' : 'Operations Suite'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Links (Independent Scrollable Container) */}
        <nav className="flex-1 p-2.5 space-y-3 overflow-y-auto overscroll-contain">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 shadow-lg shadow-amber-400/20 ring-1 ring-amber-300/40 font-black'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : ''}`} />
                      <span className="truncate">{lang === 'mr' ? item.labelMr : item.labelEn}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono shrink-0 ml-1.5 ${
                        isActive
                          ? 'bg-slate-950 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer: Admin Profile & Switch to Customer Site */}
        <div className="p-3 border-t border-slate-800/80 space-y-2 shrink-0">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {lang === 'mr' ? 'महालोन संचालक' : 'Operations Manager'}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'mr' ? 'सक्रिय (Online)' : 'Online'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCurrentView('customer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-3d-emerald py-2 px-2.5 rounded-xl text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              title="View Customer Site"
            >
              <User className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'वेबसाईट' : 'Site'}</span>
            </button>

            <button
              onClick={adminLogout}
              className="py-2 px-2.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'mr' ? 'लॉगआउट' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN RIGHT COLUMN (INDEPENDENT SCROLL PANEL)             */}
      {/* ======================================================== */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        
        {/* TOP BAR (Fixed at top of right board) - High-end Executive Fintech Theme */}
        <header className="sticky top-0 z-30 px-3 sm:px-6 py-2.5 admin-top-header flex items-center justify-between gap-2 shadow-lg shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-xl bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/80 cursor-pointer shrink-0 transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Info with Live Indicator */}
            <div className="min-w-0 flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse shrink-0" />
              <div className="flex items-center gap-1.5 text-xs truncate">
                <span className="text-slate-400 hidden xs:inline font-medium">ॲडमिन /</span>
                <span className="font-extrabold text-white text-xs sm:text-sm capitalize truncate tracking-wide">
                  {activeTab === 'overview' && (lang === 'mr' ? 'डॅशबोर्ड' : 'Overview')}
                  {activeTab === 'applications' && (lang === 'mr' ? 'अर्ज व्यवस्थापन' : 'Applications')}
                  {activeTab === 'loan-form' && (lang === 'mr' ? 'नवीन अर्ज' : 'New Application')}
                  {activeTab === 'website-cms' && (lang === 'mr' ? 'वेबसाईट CMS' : 'Website CMS')}
                  {activeTab === 'customers' && (lang === 'mr' ? 'ग्राहक' : 'Customers')}
                  {activeTab === 'rates' && (lang === 'mr' ? 'व्याजदर' : 'Rates')}
                  {activeTab === 'repayments' && (lang === 'mr' ? 'हप्ते वाटप' : 'Repayments')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher in Admin Top Bar */}
            <button
              type="button"
              onClick={() => setLang(lang === 'mr' ? 'en' : 'mr')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-700/90 bg-slate-800/90 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-sm hover:border-emerald-500/40"
              title={lang === 'mr' ? 'Switch to English' : 'मराठीमध्ये बदला'}
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'mr' ? 'English' : 'मराठी'}</span>
            </button>

            {/* Quick Add Loan Button (Vibrant Golden Amber 3D) */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black cursor-pointer shadow-md shadow-amber-500/25 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 border border-amber-300/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
              <span className="hidden sm:inline">{lang === 'mr' ? '+ अर्ज' : '+ Add'}</span>
            </button>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-700/90 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white cursor-pointer shadow-sm transition-all hover:border-slate-600"
              title="Export CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV</span>
            </button>

            {/* Reset Data Button */}
            <button
              onClick={resetDemoData}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-700/90 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white cursor-pointer shadow-sm transition-all hover:border-slate-600"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline">{lang === 'mr' ? 'रीसेट' : 'Reset'}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={adminLogout}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 hover:border-rose-600 transition-all cursor-pointer shadow-sm"
              title="Logout from Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400 group-hover:text-white shrink-0" />
              <span className="hidden sm:inline">{lang === 'mr' ? 'लॉगआउट' : 'Logout'}</span>
            </button>
          </div>
        </header>

        {/* Main Body Content Area (Independent Scroll Container) */}
        <main className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5 lg:p-6 w-full space-y-5">
          
          {/* ======================================================== */}
          {/* TAB 1: OVERVIEW DASHBOARD                                */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6 relative">
              {/* Ambient Glowing Aurora Spots for High-End Visual Depth (Dark themes only) */}
              {adminTheme !== 'light' && (
                <>
                  <div className="absolute -top-12 -left-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />
                  <div className="absolute top-24 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />
                  <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
                </>
              )}
              
              {/* Sleek Page Header with Glass & Modern Fintech Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-400/20">
                        <LayoutDashboard className="w-4 h-4" />
                      </div>
                      <span>{lang === 'mr' ? 'कर्ज ऑपरेशन्स डॅशबोर्ड सारांश' : 'Operations Dashboard'}</span>
                    </h2>
                    <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {lang === 'mr' ? 'लाईव्ह सिंक' : 'Live Sync'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === 'mr' 
                      ? 'महालोन NBFC चे थेट अर्ज, भांडवल वाटप, मंजुरी दर आणि दैनंदिन व्यवस्थापन नियंत्रण कक्ष.' 
                      : 'Real-time pipeline, portfolio disbursals, approval metrics, and underwriting controls.'}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('loan-form')}
                    className="btn-3d-emerald px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'थेट अर्ज फॉर्म' : 'Open Loan Form'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('website-cms')}
                    className="btn-3d-admin px-3.5 py-2 rounded-xl text-amber-400 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'वेबसाईट CMS' : 'Edit Website CMS'}</span>
                  </button>
                </div>
              </div>

            {/* ======================================================== */}
            {/* 1. EXECUTIVE HERO METRICS (4 HIGH-IMPACT 3D CARDS)       */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Total Disbursed Capital */}
              <div className="relative overflow-hidden box-3d admin-card-emerald cursor-pointer rounded-2xl p-5 border border-emerald-500/30 hover:border-emerald-400/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-xl shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group flex flex-col justify-between">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {lang === 'mr' ? 'एकूण वितरित भांडवल' : 'Total Disbursed'}
                    </span>
                    <div className="admin-icon-emerald w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/25 to-teal-400/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {formatCurrency(totalDisbursedAmount)}
                  </div>
                  
                  {/* Visual upward sparkline */}
                  <div className="h-6 w-full my-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 160 28" preserveAspectRatio="none">
                      <path d="M0,24 Q30,18 60,20 T110,10 T160,4" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="160" cy="4" r="3.5" fill="#34d399" className="animate-ping" opacity="0.6" />
                      <circle cx="160" cy="4" r="3" fill="#34d399" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/90 text-xs">
                  <span className="text-slate-400">{lang === 'mr' ? 'सक्रिय पोर्टफोलिओ' : 'Active Funds'}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% MoM
                  </span>
                </div>
              </div>

              {/* Card 2: Total Applications Pipeline */}
              <div className="relative overflow-hidden box-3d admin-card-amber cursor-pointer rounded-2xl p-5 border border-amber-500/30 hover:border-amber-400/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-xl shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group flex flex-col justify-between">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {lang === 'mr' ? 'एकूण कर्ज अर्ज' : 'Applications Pipeline'}
                    </span>
                    <div className="admin-icon-amber w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/25 to-yellow-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
                    <span>{totalApps}</span>
                    <span className="text-sm font-semibold text-slate-400">
                      {lang === 'mr' ? 'अर्ज दाखल' : 'Received'}
                    </span>
                  </div>

                  {/* Progress breakdown bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full my-3 flex overflow-hidden">
                    <div style={{ width: `${(pendingApps / (totalApps || 1)) * 100}%` }} className="bg-amber-400 h-full" title="Pending" />
                    <div style={{ width: `${(approvedApps / (totalApps || 1)) * 100}%` }} className="bg-emerald-400 h-full" title="Approved" />
                    <div style={{ width: `${(rejectedApps / (totalApps || 1)) * 100}%` }} className="bg-red-400 h-full" title="Rejected" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/90 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    {pendingApps} {lang === 'mr' ? 'प्रलंबित' : 'Pending'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30">
                    {approvedApps} {lang === 'mr' ? 'मंजूर' : 'Approved'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-red-400/20 text-red-300 font-bold border border-red-400/30">
                    {rejectedApps} {lang === 'mr' ? 'नामंजूर' : 'Rejected'}
                  </span>
                </div>
              </div>

              {/* Card 3: Approval Rate */}
              <div className="relative overflow-hidden box-3d admin-card-cyan cursor-pointer rounded-2xl p-5 border border-cyan-500/30 hover:border-cyan-400/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group flex flex-col justify-between">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {lang === 'mr' ? 'कर्ज मंजुरी दर' : 'Sanction Rate'}
                    </span>
                    <div className="admin-icon-cyan w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/25 to-sky-400/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between my-1">
                    <div className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-tight">
                      {Math.round((approvedApps / (totalApps || 1)) * 100)}%
                    </div>
                    {/* Radial gauge mini visual */}
                    <div className="w-10 h-10 rounded-full border-2 border-slate-700 border-t-cyan-400 border-r-cyan-400 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                      CIBIL
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2 mb-1">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.round((approvedApps / (totalApps || 1)) * 100)}%` }} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/90 text-xs text-slate-400">
                  <span>{lang === 'mr' ? 'सिबिल निकष' : 'KYC Qualified'}</span>
                  <span className="text-cyan-300 font-bold">
                    {approvedApps} {lang === 'mr' ? 'यशस्वी अर्ज' : 'Approved'}
                  </span>
                </div>
              </div>

              {/* Card 4: Disbursed Accounts & Active Borrowers */}
              <div className="relative overflow-hidden box-3d admin-card-purple cursor-pointer rounded-2xl p-5 border border-purple-500/30 hover:border-purple-400/60 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 backdrop-blur-xl shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group flex flex-col justify-between">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {lang === 'mr' ? 'थेट बँक वाटप' : 'Disbursed Accounts'}
                    </span>
                    <div className="admin-icon-purple w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500/25 to-indigo-400/15 border border-purple-400/30 text-purple-300 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                      <Banknote className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="text-2xl sm:text-3xl font-black text-purple-200 tracking-tight flex items-baseline gap-2">
                    <span>{disbursedApps}</span>
                    <span className="text-sm font-semibold text-slate-400">
                      {lang === 'mr' ? 'खात्यात जमा' : 'Funded'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold my-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Instant RTGS Verified</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/90 text-xs text-slate-400">
                  <span>{lang === 'mr' ? 'थेट हस्तांतरण' : 'RTGS Funded'}</span>
                  <span className="text-purple-300 font-bold">
                    {disbursedApps} {lang === 'mr' ? 'सक्रिय कर्जे' : 'Active Loans'}
                  </span>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 2. ANALYTICS & SCHEME DISTRIBUTION GRID (8 + 4 COLS)     */}
            {/* ======================================================== */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Left (8 cols): Visual Monthly Growth & Disbursal Area Chart */}
              <div className="box-3d lg:col-span-8 bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-5 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <span>{lang === 'mr' ? 'मासिक कर्ज वितरण आणि मंजुरी वाढ आलेख' : 'Monthly Disbursal & Sanctions'}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === 'mr' ? 'भांडवल वाटप (Disbursed) आणि ग्राहक मागणी (Requested) ट्रेंड' : 'Financial portfolio growth metrics'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Timeframe filter pills */}
                    <div className="flex items-center p-0.5 rounded-lg bg-slate-800/90 border border-slate-700/80 text-[11px]">
                      {['3M', '6M', '1Y'].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setChartTimeframe(tf)}
                          className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                            chartTimeframe === tf
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {lang === 'mr' ? 'वितरण (Disbursed)' : 'Disbursed'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        {lang === 'mr' ? 'मागणी (Requested)' : 'Requested'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SVG Visual Area Chart with Glowing Gradients */}
                <div className="relative h-56 w-full pt-3">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
                    <defs>
                      <linearGradient id="adminEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="0.20" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="adminAmberGrad" x1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                      <filter id="neonGlowEmerald" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10b981" floodOpacity="0.7" />
                      </filter>
                      <filter id="neonGlowAmber" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.7" />
                      </filter>
                    </defs>

                    {/* Dotted Grid Lines */}
                    <line x1="0" y1="40" x2="700" y2="40" stroke="#334155" strokeDasharray="3 3" opacity="0.35" />
                    <line x1="0" y1="90" x2="700" y2="90" stroke="#334155" strokeDasharray="3 3" opacity="0.35" />
                    <line x1="0" y1="140" x2="700" y2="140" stroke="#334155" strokeDasharray="3 3" opacity="0.35" />
                    <line x1="0" y1="190" x2="700" y2="190" stroke="#334155" opacity="0.8" />

                    {/* Amber Area: Total Requested */}
                    <path
                      d="M 50 160 Q 150 110, 250 130 T 450 70 T 650 40 L 650 190 L 50 190 Z"
                      fill="url(#adminAmberGrad)"
                    />
                    <path
                      d="M 50 160 Q 150 110, 250 130 T 450 70 T 650 40"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#neonGlowAmber)"
                    />

                    {/* Emerald Area: Disbursed to Bank */}
                    <path
                      d="M 50 180 Q 150 140, 250 155 T 450 95 T 650 65 L 650 190 L 50 190 Z"
                      fill="url(#adminEmeraldGrad)"
                    />
                    <path
                      d="M 50 180 Q 150 140, 250 155 T 450 95 T 650 65"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#neonGlowEmerald)"
                    />

                    {/* Milestone Data Points with Glowing Rings */}
                    <circle cx="50" cy="180" r="4" fill="#10b981" />
                    <circle cx="250" cy="155" r="4" fill="#10b981" />
                    <circle cx="450" cy="95" r="4" fill="#10b981" />
                    <circle cx="650" cy="65" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

                    <circle cx="50" cy="160" r="4" fill="#f59e0b" />
                    <circle cx="250" cy="130" r="4" fill="#f59e0b" />
                    <circle cx="450" cy="70" r="4" fill="#f59e0b" />
                    <circle cx="650" cy="40" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />

                    {/* Month Labels */}
                    <text x="50" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle">{lang === 'mr' ? 'मे' : 'May'}</text>
                    <text x="170" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle">{lang === 'mr' ? 'जून' : 'Jun'}</text>
                    <text x="290" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle">{lang === 'mr' ? 'जुलै' : 'Jul'}</text>
                    <text x="410" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle">{lang === 'mr' ? 'ऑगस्ट' : 'Aug'}</text>
                    <text x="530" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle">{lang === 'mr' ? 'सप्टेंबर' : 'Sep'}</text>
                    <text x="650" y="200" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">{lang === 'mr' ? 'ऑक्टोबर (चालू)' : 'Oct (Active)'}</text>
                  </svg>
                </div>

                {/* 3 Quick KPI Stat Badges under chart */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                    <div className="text-[10px] text-slate-400">{lang === 'mr' ? 'सरासरी मासिक वाटप' : 'Avg. Monthly Disbursal'}</div>
                    <div className="font-black text-emerald-400 text-sm mt-0.5">{lang === 'mr' ? '₹२.२५ लाख' : '₹2.25 Lakh'}</div>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                    <div className="text-[10px] text-slate-400">{lang === 'mr' ? 'मागणी वाढ दर (MoM)' : 'Demand Growth (MoM)'}</div>
                    <div className="font-black text-amber-400 text-sm mt-0.5">+२२.४%</div>
                  </div>
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                    <div className="text-[10px] text-slate-400">{lang === 'mr' ? 'सर्वोच्च मागणी महिना' : 'Peak Month'}</div>
                    <div className="font-black text-white text-sm mt-0.5">{lang === 'mr' ? '₹१८ लाख (ऑक्टो)' : '₹18 Lakh (Oct)'}</div>
                  </div>
                </div>
              </div>

              {/* Right (4 cols): Scheme Portfolio Volume & Rates */}
              <div className="box-3d lg:col-span-4 bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/80 shadow-2xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <Percent className="w-3.5 h-3.5" />
                      </div>
                      <span>{lang === 'mr' ? 'योजना दर व व्हॉल्यूम' : 'Schemes & Rates'}</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('rates')}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{lang === 'mr' ? 'दर बदला' : 'Edit Rates'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3.5 pt-3">
                    {loanProducts.slice(0, 5).map((p) => {
                      const count = applications.filter(a => a.loanType === p.id).length;
                      const percent = Math.round((count / (totalApps || 1)) * 100);
                      return (
                        <div key={p.id} className="space-y-1.5 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              {lang === 'mr' ? p.nameMr : p.nameEn}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-black text-[10px] border border-amber-400/30">
                                {p.rate}
                              </span>
                              <span className="font-bold text-white text-xs">{count} ({percent}%)</span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${p.color || 'from-emerald-400 via-teal-400 to-cyan-400'} rounded-full transition-all duration-700`}
                              style={{ width: `${Math.max(percent, 10)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">{lang === 'mr' ? 'एकूण मंजूर भांडवल:' : 'Total Sanctioned:'}</span>
                    <span className="text-emerald-400 font-black text-sm">{formatCurrency(totalSanctionedAmount)}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setCurrentView('customer');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-105 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-950" />
                    <span>{lang === 'mr' ? 'ग्राहक वेबसाईट पहा' : 'View Customer Site'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* 3. LOAN UNDERWRITING & LIVE ACTION QUEUE TABLE           */}
            {/* ======================================================== */}
            <div className="box-3d bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 border border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'mr' ? 'थेट कर्ज अर्ज कृती व मंजुरी नियंत्रण (Live Underwriting Queue)' : 'Live Action Queue'}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'mr' ? 'येथून एका क्लिकवर थेट मंजुरी, बँक वितरण किंवा अर्जात बदल (Edit) करा.' : 'Review, approve, or edit applications with one click.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="btn-3d-slate px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>{lang === 'mr' ? 'सर्व अर्ज व्यवस्थापन पहा' : 'View Full Table'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
                <table className="w-full text-left text-xs min-w-[640px]">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                      <th className="py-3 px-3.5 font-bold">{lang === 'mr' ? 'अर्ज क्र.' : 'ID'}</th>
                      <th className="py-3 px-3.5 font-bold">{lang === 'mr' ? 'अर्जदार माहिती' : 'Applicant'}</th>
                      <th className="py-3 px-3.5 font-bold">{lang === 'mr' ? 'कर्ज योजना' : 'Scheme'}</th>
                      <th className="py-3 px-3.5 font-bold">{lang === 'mr' ? 'मागणी रक्कम' : 'Amount'}</th>
                      <th className="py-3 px-3.5 font-bold">{lang === 'mr' ? 'मंजूर रक्कम' : 'Sanctioned'}</th>
                      <th className="py-3 px-3.5 font-bold">{lang === 'mr' ? 'स्थिती' : 'Status'}</th>
                      <th className="py-3 px-3.5 text-right font-bold">{lang === 'mr' ? 'झटपट कृती व बदल' : 'Quick Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="py-12 text-center">
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                              <FileText className="w-6 h-6 opacity-60" />
                            </div>
                            <div className="text-sm font-bold text-slate-300">
                              {lang === 'mr' ? 'कोणताही अर्ज उपलब्ध नाही' : 'No applications available'}
                            </div>
                            <p className="text-xs text-slate-400 max-w-sm">
                              {lang === 'mr' ? 'ग्राहकांनी वेबसाईटवरून अर्ज केल्यास किंवा आपण नवीन अर्ज जोडल्यास येथे दिसतील.' : 'New applications will appear here as customers apply or when you add them.'}
                            </p>
                            <button
                              onClick={() => setActiveTab('loan-form')}
                              className="mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
                            >
                              <PlusCircle className="w-4 h-4" />
                              <span>{lang === 'mr' ? 'नवीन अर्ज प्रविष्ट करा' : 'Create New Application'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      applications.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3.5 font-mono text-emerald-400 font-bold">{app.id}</td>
                        <td className="py-3 px-3.5">
                          <div className="font-bold text-white">{app.name}</div>
                          <div className="text-[11px] text-slate-400">{app.city} • {app.mobile}</div>
                        </td>
                        <td className="py-3 px-3.5 text-slate-300 font-medium">{app.loanName}</td>
                        <td className="py-3 px-3.5 font-bold text-white">{formatCurrency(app.amount)}</td>
                        <td className="py-3 px-3.5 font-black text-emerald-400">{formatCurrency(app.approvedAmount || app.amount)}</td>
                        <td className="py-3 px-3.5">
                          {app.status === 'Approved' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Approved
                            </span>
                          )}
                          {app.status === 'Disbursed' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                              Disbursed
                            </span>
                          )}
                          {app.status === 'Pending' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                              Pending
                            </span>
                          )}
                          {app.status === 'Rejected' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                              Rejected
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {app.status === 'Pending' && (
                              <button
                                onClick={() => handleQuickStatusChange(app.id, 'Approved')}
                                className="btn-3d-emerald px-2.5 py-1 text-[10px] font-black rounded-lg cursor-pointer"
                                title="Approve"
                              >
                                ✓ मंजूर
                              </button>
                            )}
                            {app.status === 'Approved' && (
                              <button
                                onClick={() => handleQuickStatusChange(app.id, 'Disbursed')}
                                className="px-2.5 py-1 rounded-lg bg-teal-600/30 hover:bg-teal-600 text-teal-300 hover:text-white border border-teal-500/40 text-[10px] font-bold cursor-pointer"
                                title="Disburse"
                              >
                                💳 वितरण
                              </button>
                            )}
                            <button
                              onClick={() => handleOpenEdit(app)}
                              className="btn-3d-admin px-2 py-1 text-[10px] font-bold rounded-lg cursor-pointer flex items-center gap-1"
                              title="Edit"
                            >
                              <Edit className="w-3 h-3 text-amber-400" />
                              <span>{lang === 'mr' ? 'बदला' : 'Edit'}</span>
                            </button>
                            <button
                              onClick={() => setViewDetailModal(app)}
                              className="btn-3d-slate p-1 rounded-lg text-slate-700 cursor-pointer"
                              title="Inspect"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: FULL LOAN APPLICATION FORM DIRECTLY IN ADMIN */}
        {/* ======================================================== */}
        {activeTab === 'loan-form' && (
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'ॲडमिन कर्ज अर्ज कक्ष' : 'Admin Loan Application Station'}</span>
                </div>
                <h3 className="text-xl font-black text-white">
                  {lang === 'mr' ? 'थेट कर्ज अर्ज फॉर्म (Direct Loan Application Form)' : 'Direct Loan Application Form'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'mr' 
                    ? 'कार्यालयात आलेल्या किंवा फोनवरून आलेल्या ग्राहकाचा संपूर्ण अर्ज येथे थेट भरा आणि सबमिट करा.' 
                    : 'Fill and submit complete loan applications directly from the admin workspace.'}
                </p>
              </div>

              {adminFormSuccess && (
                <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-2xl flex items-center gap-3 text-xs text-emerald-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">
                      {lang === 'mr' ? 'अर्ज यशस्वीरीत्या जोडला:' : 'Application Added Successfully:'} {adminFormSuccess.id}
                    </span>
                    <button 
                      onClick={() => setActiveTab('applications')} 
                      className="block text-[11px] text-amber-400 hover:underline font-bold cursor-pointer"
                    >
                      {lang === 'mr' ? 'या अर्जाची संपूर्ण माहिती पहा ➔' : 'View full details of this application ➔'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleAdminLoanFormSubmit} className="space-y-6 text-xs text-slate-300">
              
              {/* Section 1: Customer Info */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{lang === 'mr' ? '1. ग्राहक वैयक्तिक व संपर्क माहिती' : '1. Customer Personal & Contact Info'}</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'ग्राहकाचे पूर्ण नाव *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={adminLoanForm.name}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, name: e.target.value })}
                      placeholder={lang === 'mr' ? 'उदा. संदीप वसंतराव गायकवाड' : 'e.g. Sandeep V. Gaikwad'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'मोबाईल नंबर (10 अंकी) *' : 'Mobile Number (10 digits) *'}
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={adminLoanForm.mobile}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, mobile: e.target.value })}
                      placeholder="98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={adminLoanForm.email}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, email: e.target.value })}
                      placeholder="sandeep@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'शहर / पत्ता *' : 'City / Address *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={adminLoanForm.city}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, city: e.target.value })}
                      placeholder={lang === 'mr' ? 'उदा. पुणे / सातारा / कोल्हापूर' : 'e.g. Pune / Satara / Kolhapur'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'पॅन क्रमांक (PAN Number)' : 'PAN Card Number'}
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={adminLoanForm.pan}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, pan: e.target.value.toUpperCase() })}
                      placeholder="ABCDE1234F"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'आधार क्रमांक (Aadhaar Number)' : 'Aadhaar Card Number'}
                    </label>
                    <input
                      type="text"
                      maxLength={14}
                      value={adminLoanForm.aadhaar}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, aadhaar: e.target.value })}
                      placeholder="1234-5678-9012"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Financials & Loan Requirements */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  <span>{lang === 'mr' ? '2. कर्ज योजना, रक्कम, उत्पन्न व कालावधी' : '2. Loan Scheme, Amount & Financial Details'}</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'रोजगार प्रकार' : 'Employment Type'}
                    </label>
                    <select
                      value={adminLoanForm.employment}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, employment: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-semibold"
                    >
                      <option value="Salaried">{lang === 'mr' ? 'Salaried (पगारदार)' : 'Salaried'}</option>
                      <option value="Self-Employed">{lang === 'mr' ? 'Self-Employed (व्यावसायिक)' : 'Self-Employed / Business'}</option>
                      <option value="Farmer">{lang === 'mr' ? 'Farmer (शेतकरी बंधू)' : 'Farmer / Agriculture'}</option>
                      <option value="Professional">{lang === 'mr' ? 'Professional (डॉक्टर/सीए)' : 'Professional (Doctor / CA)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'मासिक उत्पन्न (₹)' : 'Monthly Income (₹)'}
                    </label>
                    <input
                      type="number"
                      step="5000"
                      value={adminLoanForm.income}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, income: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'कंपनी / व्यवसाय नाव' : 'Company / Business Name'}
                    </label>
                    <input
                      type="text"
                      value={adminLoanForm.company}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, company: e.target.value })}
                      placeholder={lang === 'mr' ? 'उदा. महिंद्रा ॲण्ड महिंद्रा' : 'e.g. Mahindra & Mahindra'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'कर्ज योजना प्रकार *' : 'Loan Scheme Type *'}
                    </label>
                    <select
                      value={adminLoanForm.loanType}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, loanType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-400 font-bold"
                    >
                      {loanProducts.map(p => (
                        <option key={p.id} value={p.id}>{lang === 'mr' ? p.nameMr : p.nameEn} ({p.rate})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'कर्ज मागणी रक्कम (Amount ₹) *' : 'Loan Amount Requested (₹) *'}
                    </label>
                    <input
                      type="number"
                      step="10000"
                      required
                      value={adminLoanForm.amount}
                      onChange={(e) => setAdminLoanForm({ 
                        ...adminLoanForm, 
                        amount: e.target.value,
                        approvedAmount: e.target.value 
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-emerald-400 font-black"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'कालावधी (Tenure Months) *' : 'Tenure (Months) *'}
                    </label>
                    <select
                      value={adminLoanForm.tenure}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, tenure: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                    >
                      <option value={12}>{lang === 'mr' ? '12 महिने (1 वर्ष)' : '12 Months (1 Year)'}</option>
                      <option value={24}>{lang === 'mr' ? '24 महिने (2 वर्षे)' : '24 Months (2 Years)'}</option>
                      <option value={36}>{lang === 'mr' ? '36 महिने (3 वर्षे)' : '36 Months (3 Years)'}</option>
                      <option value={48}>{lang === 'mr' ? '48 महिने (4 वर्षे)' : '48 Months (4 Years)'}</option>
                      <option value={60}>{lang === 'mr' ? '60 महिने (5 वर्षे)' : '60 Months (5 Years)'}</option>
                      <option value={84}>{lang === 'mr' ? '84 महिने (7 वर्षे)' : '84 Months (7 Years)'}</option>
                      <option value={120}>{lang === 'mr' ? '120 महिने (10 वर्षे)' : '120 Months (10 Years)'}</option>
                      <option value={240}>{lang === 'mr' ? '240 महिने (20 वर्षे)' : '240 Months (20 Years)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'अंदाजित मासिक हप्ता (EMI)' : 'Estimated Monthly EMI'}
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-amber-400 font-black flex items-center justify-between">
                      <span>{formatCurrency(calculateEmi(adminLoanForm.amount, adminLoanForm.approvedRate, adminLoanForm.tenure))}</span>
                      <span className="text-[10px] text-slate-400 font-normal">/ {lang === 'mr' ? 'महिना' : 'Month'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कर्जाचा उद्देश (Loan Purpose)' : 'Loan Purpose'}
                  </label>
                  <input
                    type="text"
                    value={adminLoanForm.purpose}
                    onChange={(e) => setAdminLoanForm({ ...adminLoanForm, purpose: e.target.value })}
                    placeholder={lang === 'mr' ? 'उदा. दुकान नूतनीकरण, शेडनेट उभारणी, लग्न, घर खरेदी...' : 'e.g. Shop renovation, agriculture equipment, home purchase...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* Section 3: Status & Admin Sanctions */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-amber-500/40 space-y-4">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'mr' ? '3. ॲडमिन मंजुरी व स्थिती (Status & Sanctioning)' : '3. Admin Sanctions & Status'}</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">
                      {lang === 'mr' ? 'प्रारंभिक स्थिती (Initial Status):' : 'Initial Status:'}
                    </label>
                    <select
                      value={adminLoanForm.status}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-amber-400"
                    >
                      <option value="Pending">{lang === 'mr' ? 'प्रलंबित (Pending Review)' : 'Pending Review'}</option>
                      <option value="Approved">{lang === 'mr' ? 'थेट मंजूर (Direct Approved)' : 'Direct Approved'}</option>
                      <option value="Disbursed">{lang === 'mr' ? 'थेट वितरित (Direct Disbursed)' : 'Direct Disbursed'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">
                      {lang === 'mr' ? 'मंजूर रक्कम (Sanctioned ₹):' : 'Sanctioned Amount (₹):'}
                    </label>
                    <input
                      type="number"
                      step="10000"
                      value={adminLoanForm.approvedAmount}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, approvedAmount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">
                      {lang === 'mr' ? 'लागू व्याजदर (% p.a.):' : 'Approved Rate (% p.a.):'}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={adminLoanForm.approvedRate}
                      onChange={(e) => setAdminLoanForm({ ...adminLoanForm, approvedRate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">
                    {lang === 'mr' ? 'ॲडमिन शेरा (Admin Remarks):' : 'Admin Remarks:'}
                  </label>
                  <textarea
                    rows={2}
                    value={adminLoanForm.remarks}
                    onChange={(e) => setAdminLoanForm({ ...adminLoanForm, remarks: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>{lang === 'mr' ? 'हा कर्ज अर्ज सबमिट करा (Save & Register)' : 'Submit Loan Application'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: WEBSITE CONTENT & CMS CONTROLS (मजकूर व डिझाइन बदला) */}
        {/* ======================================================== */}
        {activeTab === 'website-cms' && (
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            
            <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <span>{lang === 'mr' ? 'वेबसाईट सामग्री व मजकूर नियंत्रण (Website CMS)' : 'Website Content Management'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'mr' 
                    ? 'येथे केलेले सर्व बदल मुख्य ग्राहक वेबसाईटवर तात्काळ रिअल-टाइम दिसतात!' 
                    : 'Changes saved here update immediately across the live customer website in real-time!'}
                </p>
              </div>

              {/* Sub-nav pills */}
              <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setCmsTab('hero')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cmsTab === 'hero' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'mr' ? 'हिरो व मुख्य (Hero)' : 'Hero & Headlines'}
                </button>
                <button
                  onClick={() => setCmsTab('products')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cmsTab === 'products' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'mr' ? `कर्ज योजना (${loanProducts.length})` : `Schemes (${loanProducts.length})`}
                </button>
                <button
                  onClick={() => setCmsTab('faqs')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cmsTab === 'faqs' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'mr' ? `प्रश्नोत्तरे FAQs (${faqs.length})` : `FAQs (${faqs.length})`}
                </button>
                <button
                  onClick={() => setCmsTab('reviews')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cmsTab === 'reviews' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'mr' ? `अभिप्राय (${testimonials.length})` : `Reviews (${testimonials.length})`}
                </button>
                <button
                  onClick={() => setCmsTab('contact')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${
                    cmsTab === 'contact' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'mr' ? 'संपर्क व पत्ते' : 'Contact & Branches'}
                </button>
              </div>
            </div>

            {/* CMS SUB-TAB 1: HERO & GENERAL SETTINGS */}
            {cmsTab === 'hero' && (
              <form onSubmit={handleSaveCmsSettings} className="space-y-5 text-xs text-slate-300">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {lang === 'mr' ? 'मुख्य मथळा व घोषणा (Hero Headlines & Announcement)' : 'Hero Headlines & Announcement'}
                  </h4>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'वरची विशेष ऑफर पट्टी (Top Notification Bar Mr):' : 'Top Notification Bar (Marathi):'}
                    </label>
                    <input
                      type="text"
                      value={cmsForm.topAnnouncementMr || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, topAnnouncementMr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'मुख्य मथळा (Main Hero Headline Mr):' : 'Main Hero Headline (Marathi):'}
                    </label>
                    <textarea
                      rows={2}
                      value={cmsForm.heroHeadlineMr || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, heroHeadlineMr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'उप-मथळा (Hero Subtitle Mr):' : 'Hero Subtitle (Marathi):'}
                    </label>
                    <textarea
                      rows={2}
                      value={cmsForm.heroSubheadlineMr || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, heroSubheadlineMr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">
                        {lang === 'mr' ? 'ग्राहक संख्या (Stat):' : 'Total Customers Stat:'}
                      </label>
                      <input
                        type="text"
                        value={cmsForm.statCustomers || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, statCustomers: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">
                        {lang === 'mr' ? 'वितरित रक्कम (Stat):' : 'Disbursed Amount Stat:'}
                      </label>
                      <input
                        type="text"
                        value={cmsForm.statDisbursed || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, statDisbursed: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">
                        {lang === 'mr' ? 'गुगल रेटिंग (Rating):' : 'Google Rating Stat:'}
                      </label>
                      <input
                        type="text"
                        value={cmsForm.statRating || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, statRating: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'वेबसाईटवर अपडेट करा (Save)' : 'Save to Live Site'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* CMS SUB-TAB 2: LOAN PRODUCTS MANAGEMENT (ADD, EDIT, DELETE) */}
            {cmsTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'mr' ? 'कर्ज योजना यादी व दर व्यवस्थापन' : 'Loan Schemes List'}
                  </h4>
                  <button
                    onClick={() => setNewProductModal(true)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{lang === 'mr' ? '+ नवीन योजना जोडा' : '+ Add Scheme'}</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {loanProducts.map((p) => (
                    <div key={p.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{p.id}</span>
                          <span className="text-emerald-400 font-black text-sm">{p.rate}</span>
                        </div>
                        <h5 className="font-bold text-white text-sm">{lang === 'mr' ? p.nameMr : p.nameEn}</h5>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{lang === 'mr' ? p.descMr : p.descEn}</p>
                        <div className="text-[11px] text-slate-500 mt-2">
                          {lang === 'mr' ? 'कमाल मर्यादा:' : 'Max Limit:'} <strong className="text-white">{p.maxAmount}</strong>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => setEditingProduct({ ...p })}
                          className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-xs font-bold transition-colors cursor-pointer"
                        >
                          {lang === 'mr' ? 'बदला (Edit)' : 'Edit Scheme'}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(lang === 'mr' ? `योजना "${p.nameMr}" हटवायची आहे का?` : `Delete product "${p.nameEn}"?`)) {
                              deleteLoanProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CMS SUB-TAB 3: FAQS (ADD, EDIT, DELETE) */}
            {cmsTab === 'faqs' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'mr' ? 'प्रश्नोत्तरे (FAQs) व्यवस्थापन' : 'FAQs Management'}
                  </h4>
                  <button
                    onClick={() => {
                      setFaqForm({ qMr: '', qEn: '', aMr: '', aEn: '' });
                      setEditingFaq(null);
                      setNewFaqModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{lang === 'mr' ? '+ नवीन FAQ जोडा' : '+ Add FAQ'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start justify-between gap-4">
                      <div className="space-y-1 text-xs">
                        <strong className="text-white text-sm block">{lang === 'mr' ? faq.qMr : faq.qEn}</strong>
                        <p className="text-slate-400">{lang === 'mr' ? faq.aMr : faq.aEn}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setFaqForm({ ...faq });
                            setEditingFaq(idx);
                            setNewFaqModal(true);
                          }}
                          className="p-1.5 rounded bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteFaq(idx)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-red-600 text-slate-300 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CMS SUB-TAB 4: TESTIMONIALS (ADD, EDIT, DELETE) */}
            {cmsTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'mr' ? 'ग्राहक अभिप्राय (Reviews) व्यवस्थापन' : 'Reviews Management'}
                  </h4>
                  <button
                    onClick={() => {
                      setReviewForm({ name: '', city: 'पुणे', loan: 'वैयक्तिक कर्ज • ₹5 लाख', rating: 5, commentMr: '', commentEn: '' });
                      setEditingReview(null);
                      setNewReviewModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{lang === 'mr' ? '+ नवीन अभिप्राय जोडा' : '+ Add Review'}</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testimonials.map((rev, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-white text-sm">{rev.name}</strong>
                          <span className="text-amber-400 text-xs">★ {rev.rating}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 block">{rev.city} • {rev.loan}</span>
                        <p className="text-xs text-slate-300 italic mt-2">"{lang === 'mr' ? rev.commentMr : rev.commentEn}"</p>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setReviewForm({ ...rev });
                            setEditingReview(idx);
                            setNewReviewModal(true);
                          }}
                          className="flex-1 py-1 rounded bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold text-amber-300 cursor-pointer"
                        >
                          {lang === 'mr' ? 'बदला' : 'Edit'}
                        </button>
                        <button
                          onClick={() => deleteTestimonial(idx)}
                          className="p-1 rounded bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CMS SUB-TAB 5: CONTACT & OFFICE INFO */}
            {cmsTab === 'contact' && (
              <form onSubmit={handleSaveCmsSettings} className="space-y-4 text-xs text-slate-300">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {lang === 'mr' ? 'संपर्क माहिती व पत्ता (Contact & Branch Address)' : 'Contact Information & Branch Addresses'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">
                        {lang === 'mr' ? 'टोल-फ्री हेल्पलाईन नंबर:' : 'Toll-Free Helpline Phone:'}
                      </label>
                      <input
                        type="text"
                        value={cmsForm.helplinePhone || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, helplinePhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">
                        {lang === 'mr' ? 'दुय्यम संपर्क नंबर (Mobile):' : 'Secondary Contact (Mobile):'}
                      </label>
                      <input
                        type="text"
                        value={cmsForm.secondaryPhone || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, secondaryPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold flex items-center gap-1.5">
                        <span className="text-[#25D366]">💬</span>
                        <span>{lang === 'mr' ? 'व्हॉट्सॲप नंबर (अर्जासाठी):' : 'WhatsApp Number (For Loans):'}</span>
                      </label>
                      <input
                        type="text"
                        value={cmsForm.whatsappNumber || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, whatsappNumber: e.target.value })}
                        placeholder="919822012345"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">
                        {lang === 'mr' ? 'अधिकृत ईमेल:' : 'Official Email Address:'}
                      </label>
                      <input
                        type="email"
                        value={cmsForm.officialEmail || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, officialEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">
                        {lang === 'mr' ? 'कार्यालयीन वेळ:' : 'Office Timings:'}
                      </label>
                      <input
                        type="text"
                        value={cmsForm.officeTimingsMr || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, officeTimingsMr: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">
                      {lang === 'mr' ? 'पुणे मुख्य कार्यालय पत्ता (Mr):' : 'Headquarters Address:'}
                    </label>
                    <textarea
                      rows={2}
                      value={cmsForm.officeAddressMr || ''}
                      onChange={(e) => setCmsForm({ ...cmsForm, officeAddressMr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'संपर्क माहिती अपडेट करा' : 'Update Contact Info'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: APPLICATIONS MANAGEMENT WITH ADD, EDIT & FILTERS */}
        {/* ======================================================== */}
        {activeTab === 'applications' && (
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>{lang === 'mr' ? 'कर्ज अर्ज व्यवस्थापन व बदल (Applications Manager)' : 'Applications Management'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'mr' 
                    ? 'नवीन अर्ज भरा, जुन्या अर्जात आवश्यक बदल करा, सिबिल स्कोअर तपासा आणि थेट निर्णय घ्या.' 
                    : 'Add new applications, edit existing borrower data, inspect KYC, and update statuses.'}
                </p>
              </div>

              {/* Action Buttons: Add & Status Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{lang === 'mr' ? '+ नवीन अर्ज जोडा' : '+ Add Loan'}</span>
                </button>

                <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  {['All', 'Pending', 'Approved', 'Disbursed', 'Rejected'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        statusFilter === st 
                          ? 'bg-amber-400 text-slate-950 font-black' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st === 'All' ? (lang === 'mr' ? 'सर्व' : 'All') : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'mr' ? 'नाव, मोबाईल, अर्ज क्र., शहर किंवा पॅनने शोधा...' : 'Search by name, mobile, app ID, city, or PAN...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={loanTypeFilter}
                  onChange={(e) => setLoanTypeFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                >
                  <option value="All">{lang === 'mr' ? 'सर्व कर्ज प्रकार (All Types)' : 'All Loan Types'}</option>
                  {loanProducts.map(p => (
                    <option key={p.id} value={p.id}>{lang === 'mr' ? p.nameMr : p.nameEn}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Applications Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'अर्ज क्र.' : 'ID'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'अर्जदार नाव' : 'Applicant'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'मोबाईल / पॅन' : 'Contact / PAN'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'कर्ज योजना' : 'Scheme'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'मागणी रक्कम' : 'Amount'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'मंजूर रक्कम' : 'Sanctioned'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'मासिक EMI' : 'EMI'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'स्थिती' : 'Status'}</th>
                    <th className="py-3 px-3 text-right font-semibold">{lang === 'mr' ? 'कृती / बदल' : 'Actions / Edit'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-emerald-400">{app.id}</td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white text-sm">{app.name}</div>
                        <div className="text-[11px] text-slate-400">{app.city} • {app.employment}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-slate-300 font-medium">{app.mobile}</div>
                        <div className="text-[11px] font-mono text-slate-500 uppercase">{app.pan}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-slate-300 block">{app.loanName}</span>
                        <span className="text-[10px] text-slate-500">{app.tenure} {lang === 'mr' ? 'महिने' : 'Mo'}</span>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-white">{formatCurrency(app.amount)}</td>
                      <td className="py-3.5 px-3 font-bold text-emerald-400">
                        {app.approvedAmount > 0 ? formatCurrency(app.approvedAmount) : '—'}
                      </td>
                      <td className="py-3.5 px-3 font-black text-amber-400">
                        {formatCurrency(app.monthlyEmi)}
                      </td>
                      <td className="py-3.5 px-3">
                        {app.status === 'Approved' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Approved
                          </span>
                        )}
                        {app.status === 'Disbursed' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                            Disbursed
                          </span>
                        )}
                        {app.status === 'Pending' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            Pending
                          </span>
                        )}
                        {app.status === 'Rejected' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* EDIT BUTTON (बदल करा) */}
                          <button
                            onClick={() => handleOpenEdit(app)}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            title="Edit / Change this application"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>{lang === 'mr' ? 'बदला' : 'Edit'}</span>
                          </button>

                          {/* Quick Inspect Drawer */}
                          <button
                            onClick={() => setViewDetailModal(app)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              if (confirm(lang === 'mr' ? `अर्ज ${app.id} कायमचा हटवायचा आहे का?` : `Permanently delete application ${app.id}?`)) {
                                deleteApplication(app.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                            <FileText className="w-6 h-6 opacity-60" />
                          </div>
                          <div className="text-sm font-bold text-slate-300">
                            {applications.length === 0 
                              ? (lang === 'mr' ? 'कोणताही कर्ज अर्ज उपलब्ध नाही' : 'No applications available')
                              : (lang === 'mr' ? 'फिल्टरनुसार कोणताही अर्ज सापडला नाही' : 'No matching applications found')}
                          </div>
                          <p className="text-xs text-slate-400 max-w-sm">
                            {applications.length === 0 
                              ? (lang === 'mr' ? 'नवीन कर्ज अर्ज भरण्यासाठी खालील बटणावर क्लिक करा.' : 'Click below to register your first loan application.')
                              : (lang === 'mr' ? 'कृपया शोध निकष किंवा स्थिती फिल्टर बदला.' : 'Try clearing your search query or status filter.')}
                          </p>
                          {applications.length === 0 ? (
                            <button
                              onClick={() => setIsAddModalOpen(true)}
                              className="mt-1 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-400/20 cursor-pointer transition-all"
                            >
                              <PlusCircle className="w-4 h-4" />
                              <span>{lang === 'mr' ? '+ नवीन अर्ज जोडा' : '+ Add Application'}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => { setSearchQuery(''); setStatusFilter('All'); setLoanTypeFilter('All'); }}
                              className="mt-1 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-all"
                            >
                              {lang === 'mr' ? 'फिल्टर रिसेट करा' : 'Clear Filters'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CUSTOMERS DIRECTORY */}
        {/* ======================================================== */}
        {activeTab === 'customers' && (
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>{lang === 'mr' ? 'नोंदणीकृत ग्राहक निर्देशिका (Customer Directory)' : 'Customer Directory'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'mr' ? 'सर्व ग्राहकांची वैयक्तिक प्रोफाइल, संपर्क, केवायसी व एकूण कर्ज इतिहास.' : 'Unique customer profiles, contact info, and loan histories.'}
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>{lang === 'mr' ? '+ नवीन ग्राहक/कर्ज नोंदवा' : '+ Add Customer'}</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'ग्राहक नाव' : 'Customer Name'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'मोबाईल' : 'Mobile'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'शहर' : 'City'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'पॅन नंबर' : 'PAN'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'आधार नंबर' : 'Aadhaar'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'रोजगार प्रकार' : 'Employment'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'कर्ज संख्या' : 'Loans'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'एकूण कर्ज मूल्य' : 'Total Amount'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                            <Users className="w-6 h-6 opacity-60" />
                          </div>
                          <div className="text-sm font-bold text-slate-300">
                            {lang === 'mr' ? 'कोणताही ग्राहक नोंदवलेला नाही' : 'No registered customers found'}
                          </div>
                          <p className="text-xs text-slate-400 max-w-sm">
                            {lang === 'mr' ? 'नवीन अर्ज आल्यानंतर ग्राहकांची निर्देशिका आपोआप येथे तयार होईल.' : 'Customer directory will be automatically populated as borrowers apply.'}
                          </p>
                          <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="mt-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>{lang === 'mr' ? '+ नवीन ग्राहक नोंदवा' : '+ Add Customer'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    customers.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-white text-sm">{c.name}</td>
                      <td className="py-3.5 px-3 text-slate-300 font-medium">{c.mobile}</td>
                      <td className="py-3.5 px-3 text-slate-300">{c.city}</td>
                      <td className="py-3.5 px-3 font-mono text-emerald-400 uppercase font-bold">{c.pan}</td>
                      <td className="py-3.5 px-3 font-mono text-slate-400">{c.aadhaar}</td>
                      <td className="py-3.5 px-3 text-slate-300">{c.employment}</td>
                      <td className="py-3.5 px-3 font-black text-amber-400">{c.totalLoans}</td>
                      <td className="py-3.5 px-3 font-bold text-white">{formatCurrency(c.totalAmount)}</td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: LOAN SCHEMES & INTEREST RATES (कर्ज योजना व व्याजदर) */}
        {/* ======================================================== */}
        {activeTab === 'rates' && (
          <div className="space-y-6">
            
            {/* Header with Title & Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'व्याजदर नियंत्रण केंद्र' : 'Interest Rate Control Suite'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>{lang === 'mr' ? 'कर्ज योजना आणि थेट व्याजदर व्यवस्थापन' : 'Loan Scheme Rates Master'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  {lang === 'mr' 
                    ? 'सर्व कर्ज योजनांचे थेट व्याजदर (Interest Rates), कमाल मर्यादा आणि प्रोसेसिंग फी येथे नियंत्रित करा. येथे केलेले बदल थेट मुख्य कॅल्क्युलेटर व ग्राहक वेबसाईटवर तात्काळ लागू होतात.' 
                    : 'Manage official interest rates, loan caps, tenures, and fees. Changes sync live across the customer site and EMI calculators in real-time.'}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setNewProductModal(true)}
                  className="btn-3d-admin inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-xl cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'mr' ? '+ नवीन योजना जोडा' : '+ Add Loan Scheme'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('website-cms');
                    setCmsTab('products');
                  }}
                  className="btn-3d-slate inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl cursor-pointer text-slate-300 hover:text-white"
                  title="Open in Website CMS"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'mr' ? 'CMS सूची' : 'CMS View'}</span>
                </button>
              </div>
            </div>

            {/* 4 Quick Stat KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-900/85 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'mr' ? 'सक्रिय योजना' : 'Active Schemes'}</div>
                <div className="text-2xl font-black text-white mt-1">{loanProducts.length} <span className="text-xs text-slate-400 font-normal">योजना</span></div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1">✓ 100% Live on Website</div>
              </div>

              <div className="bg-slate-900/85 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'mr' ? 'किमान व्याजदर' : 'Lowest Rate'}</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">8.4% <span className="text-xs text-slate-400 font-normal">p.a.</span></div>
                <div className="text-[10px] text-slate-400 mt-1">गृह कर्ज (Home Loan)</div>
              </div>

              <div className="bg-slate-900/85 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'mr' ? 'कमाल कर्ज मर्यादा' : 'Max Loan Cap'}</div>
                <div className="text-2xl font-black text-amber-400 mt-1">₹1.50 कोटी</div>
                <div className="text-[10px] text-slate-400 mt-1">विनाअडथळा वितरण</div>
              </div>

              <div className="bg-slate-900/85 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{lang === 'mr' ? 'प्रोसेसिंग फी' : 'Processing Fee'}</div>
                <div className="text-2xl font-black text-cyan-300 mt-1">0% - 0.5%</div>
                <div className="text-[10px] text-slate-400 mt-1">किमान कागदपत्र खर्च</div>
              </div>
            </div>

            {/* Interactive Loan Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {loanProducts.map((p) => {
                const numericRate = parseFloat(p.rate) || 10.0;
                // Quick EMI estimate for ₹5,00,000 over 36 months at this scheme's rate
                const sampleEmi = calculateEmi(500000, numericRate, 36);

                return (
                  <div 
                    key={p.id} 
                    className="relative overflow-hidden box-3d rounded-2xl p-5 bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 group hover:border-amber-400/50 transition-all"
                  >
                    {/* Top colored accent bar */}
                    <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${p.color || 'from-emerald-400 to-cyan-400'}`} />

                    <div>
                      {/* Scheme Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${p.color || 'from-emerald-500 to-teal-500'} text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 shrink-0`}>
                            <Building className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-mono text-[10px] text-amber-400 uppercase font-black tracking-wider">
                              ID: {p.id}
                            </div>
                            <h4 className="font-black text-white text-base leading-tight">
                              {lang === 'mr' ? p.nameMr : p.nameEn}
                            </h4>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                          {p.tagMr ? (lang === 'mr' ? p.tagMr.split('•')[0] : p.tagEn?.split('•')[0]) : 'सुलभ कर्ज'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 my-2">
                        {lang === 'mr' ? p.descMr : p.descEn}
                      </p>

                      {/* Interactive Rate Controller Box */}
                      <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 my-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-semibold flex items-center gap-1">
                            <Percent className="w-3.5 h-3.5 text-amber-400" />
                            {lang === 'mr' ? 'सध्याचा वार्षिक व्याजदर:' : 'Annual Interest Rate:'}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 font-bold">Live Rate</span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="text-2xl font-black text-emerald-400 tracking-tight">
                            {p.rate}
                          </div>

                          {/* Quick 1-Click Steppers */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleRateStep(p.id, -0.25)}
                              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-black text-sm flex items-center justify-center border border-slate-700 transition-all cursor-pointer"
                              title="व्याजदर 0.25% ने कमी करा"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRateStep(p.id, 0.25)}
                              className="w-8 h-8 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white active:scale-95 font-black text-sm flex items-center justify-center border border-emerald-500/40 transition-all cursor-pointer"
                              title="व्याजदर 0.25% ने वाढवा"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Sample EMI Calculation Preview */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>{lang === 'mr' ? 'नमुना EMI (₹5 लाखांवर / 3 वर्षे):' : 'Sample EMI (₹5 Lakhs / 3 Yrs):'}</span>
                          <strong className="text-amber-300 font-black">{formatCurrency(sampleEmi)}/{lang === 'mr' ? 'महिना' : 'Mo'}</strong>
                        </div>
                      </div>

                      {/* Terms Badges */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">{lang === 'mr' ? 'कमाल रक्कम' : 'Max Limit'}</div>
                          <div className="font-bold text-white text-xs mt-0.5 truncate">{p.maxAmount}</div>
                        </div>
                        <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">{lang === 'mr' ? 'कालावधी' : 'Tenure'}</div>
                          <div className="font-bold text-white text-xs mt-0.5 truncate">{p.tenure}</div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => setEditingProduct({ ...p })}
                        className="btn-3d-admin flex-1 py-1.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'mr' ? 'तपशील बदला (Edit)' : 'Edit Scheme'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(lang === 'mr' ? `योजना "${p.nameMr}" हटवायची आहे का?` : `Delete product "${p.nameEn}"?`)) {
                            deleteLoanProduct(p.id);
                          }
                        }}
                        className="btn-3d-slate p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/15 cursor-pointer"
                        title="Delete Scheme"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Market Benchmark Comparison Table */}
            <div className="bg-slate-900/85 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'mr' ? 'बाजारपेठ व्याजदर तुलना आणि महालोन फायदा' : 'Market Benchmark & Comparative Advantage'}</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    {lang === 'mr' ? 'राष्ट्रीयकृत आणि खाजगी बँकांच्या तुलनेत महालोनचे ग्राहक-केंद्रित व्याजदर.' : 'Comparative interest rates benchmarked against top banking institutions.'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 self-start sm:self-auto">
                  {lang === 'mr' ? '✓ सर्वात किफायतशीर दर' : '✓ Most Competitive Rates'}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <th className="py-3 px-4 font-bold">{lang === 'mr' ? 'कर्ज योजना' : 'Loan Scheme'}</th>
                      <th className="py-3 px-4 font-bold text-emerald-400">{lang === 'mr' ? 'महालोन दर (Our Rate)' : 'MahaLoan Rate'}</th>
                      <th className="py-3 px-4 font-bold">{lang === 'mr' ? 'SBI / सरकारी बँका' : 'SBI / Public Banks'}</th>
                      <th className="py-3 px-4 font-bold">{lang === 'mr' ? 'HDFC / खासगी बँका' : 'HDFC / Private Banks'}</th>
                      <th className="py-3 px-4 font-bold text-right">{lang === 'mr' ? 'ग्राहकांची बचत (प्रति लाख)' : 'Borrower Savings'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{lang === 'mr' ? 'गृह कर्ज (Home Loan)' : 'Home Loan'}</td>
                      <td className="py-3 px-4 font-black text-emerald-400 text-sm">8.4% p.a.</td>
                      <td className="py-3 px-4 text-slate-300">8.75% - 9.15%</td>
                      <td className="py-3 px-4 text-slate-300">8.90% - 9.40%</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400">
                        {lang === 'mr' ? '₹४,२०० / वर्ष बचत' : '₹4,200 / Year Savings'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{lang === 'mr' ? 'वैयक्तिक कर्ज (Personal Loan)' : 'Personal Loan'}</td>
                      <td className="py-3 px-4 font-black text-emerald-400 text-sm">10.5% p.a.</td>
                      <td className="py-3 px-4 text-slate-300">11.50% - 13.50%</td>
                      <td className="py-3 px-4 text-slate-300">12.00% - 15.00%</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400">
                        {lang === 'mr' ? '₹८,५०० / वर्ष बचत' : '₹8,500 / Year Savings'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{lang === 'mr' ? 'व्यवसाय कर्ज (Business Loan)' : 'Business Loan'}</td>
                      <td className="py-3 px-4 font-black text-emerald-400 text-sm">11.2% p.a.</td>
                      <td className="py-3 px-4 text-slate-300">12.50% - 14.50%</td>
                      <td className="py-3 px-4 text-slate-300">13.00% - 16.00%</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400">
                        {lang === 'mr' ? '₹१२,००० / वर्ष बचत' : '₹12,000 / Year Savings'}
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{lang === 'mr' ? 'कृषी / शेती कर्ज (Kisan Loan)' : 'Kisan Agri Loan'}</td>
                      <td className="py-3 px-4 font-black text-emerald-400 text-sm">7.0% p.a.</td>
                      <td className="py-3 px-4 text-slate-300">7.00% - 8.50%</td>
                      <td className="py-3 px-4 text-slate-300">8.50% - 10.50%</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-400">
                        {lang === 'mr' ? 'शून्य छुपे खर्च' : 'Zero Hidden Fees'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RBI Policy & Compliance Note */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-300 block mb-0.5">
                  {lang === 'mr' ? 'भारतीय रिझर्व्ह बँक (RBI) मार्गदर्शक तत्त्वे व पारदर्शकता नियम:' : 'Reserve Bank of India (RBI) Regulatory Directives & Fair Practices:'}
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  {lang === 'mr'
                    ? 'महालोन फायनान्सचे सर्व कर्ज व्याजदर फ्लोटिंग व फिक्स बेसिसवर RBI रेपो रेटशी सुसंगत आहेत. कोणताही छुपा खर्च, गुप्त व्याज आकारणी किंवा अनपेक्षित दंड आकारला जात नाही. येथे व्याजदर बदलताच ग्राहकांच्या पुढील EMI कॅल्क्युलेटरवर तो तात्काळ रिफ्लेक्ट होतो.'
                    : 'All MahaLoan Finance lending rates conform to official RBI benchmark standards on transparent floating and fixed rate regimens. No covert commissions or hidden charges apply.'}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: REPAYMENTS & EMIS */}
        {/* ======================================================== */}
        {activeTab === 'repayments' && (
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'mr' ? 'हप्ते (EMI) आणि वाटप ट्रॅकर' : 'EMI Schedules & Repayments'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'mr' 
                  ? 'वितरित केलेल्या कर्जांचे मासिक हप्ते, परतफेड स्थिती आणि बँक मँडेट ट्रॅकर.' 
                  : 'Track monthly repayments, collections, and active EMI schedules on all disbursed loans.'}
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'कर्ज क्र.' : 'Loan ID'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'ग्राहक नाव' : 'Borrower'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'कर्ज योजना' : 'Scheme'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'वितरित मुद्दल' : 'Disbursed Principal'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'व्याजदर' : 'Rate'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'मासिक EMI' : 'Monthly EMI'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'पुढील हप्ता तारीख' : 'Next Due Date'}</th>
                    <th className="py-3 px-3 font-semibold">{lang === 'mr' ? 'परतफेड स्थिती' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {applications.filter(a => a.status === 'Disbursed' || a.status === 'Approved').length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                            <IndianRupee className="w-6 h-6 opacity-60" />
                          </div>
                          <div className="text-sm font-bold text-slate-300">
                            {lang === 'mr' ? 'कोणतेही सक्रिय हप्ता किंवा वाटप लेजर उपलब्ध नाही' : 'No active repayment schedules'}
                          </div>
                          <p className="text-xs text-slate-400 max-w-sm">
                            {lang === 'mr' ? 'कर्ज मंजूर (Approved) किंवा खात्यात जमा (Disbursed) झाल्यानंतर त्याचे मासिक EMI व परतफेड वेळापत्रक येथे दिसेल.' : 'Once loans are approved or disbursed, their active EMI schedules will be tracked here.'}
                          </p>
                          <button
                            onClick={() => setActiveTab('applications')}
                            className="mt-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <span>{lang === 'mr' ? 'सर्व अर्ज तपासा' : 'Check Applications Queue'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    applications.filter(a => a.status === 'Disbursed' || a.status === 'Approved').map((app, idx) => (
                    <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-bold text-emerald-400">{app.id}</td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white">{app.name}</div>
                        <div className="text-[11px] text-slate-400">{app.mobile}</div>
                      </td>
                      <td className="py-3.5 px-3 text-slate-300">{app.loanName}</td>
                      <td className="py-3.5 px-3 font-bold text-white">{formatCurrency(app.approvedAmount || app.amount)}</td>
                      <td className="py-3.5 px-3 text-emerald-400 font-bold">{app.approvedRate}%</td>
                      <td className="py-3.5 px-3 font-black text-amber-400">{formatCurrency(app.monthlyEmi)}</td>
                      <td className="py-3.5 px-3 text-slate-300">
                        {new Date(Date.now() + (idx + 1) * 7 * 86400000).toISOString().split('T')[0]}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {lang === 'mr' ? 'नियमित (On-Time)' : 'Active (On-Time)'}
                        </span>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: ADD NEW APPLICATION MODAL */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-6">
            
            <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-amber-400" />
                  <span>{lang === 'mr' ? 'नवीन कर्ज अर्ज प्रविष्ट करा (Add New Loan)' : 'Add New Loan Application'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'mr' ? 'ॲडमिन किंवा स्टाफद्वारे ग्राहकाचा अर्ज थेट नोंदवणे' : 'Direct manual entry by admin/staff with custom initial status'}
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs text-slate-300 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'ग्राहकाचे पूर्ण नाव *' : 'Applicant Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newAppForm.name}
                    onChange={(e) => setNewAppForm({ ...newAppForm, name: e.target.value })}
                    placeholder={lang === 'mr' ? 'उदा. राहुल पांडुरंग माने' : 'e.g. Rahul Pandurang Mane'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'मोबाईल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={newAppForm.mobile}
                    onChange={(e) => setNewAppForm({ ...newAppForm, mobile: e.target.value })}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'शहर *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newAppForm.city}
                    onChange={(e) => setNewAppForm({ ...newAppForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'पॅन क्रमांक (PAN)' : 'PAN Number'}
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={newAppForm.pan}
                    onChange={(e) => setNewAppForm({ ...newAppForm, pan: e.target.value.toUpperCase() })}
                    placeholder="ABCDE1234F"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'आधार क्रमांक' : 'Aadhaar Number'}
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    value={newAppForm.aadhaar}
                    onChange={(e) => setNewAppForm({ ...newAppForm, aadhaar: e.target.value })}
                    placeholder="1234-5678-9012"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'रोजगार प्रकार' : 'Employment Type'}
                  </label>
                  <select
                    value={newAppForm.employment}
                    onChange={(e) => setNewAppForm({ ...newAppForm, employment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="Salaried">{lang === 'mr' ? 'Salaried (पगारदार)' : 'Salaried'}</option>
                    <option value="Self-Employed">{lang === 'mr' ? 'Self-Employed (व्यावसायिक)' : 'Self-Employed'}</option>
                    <option value="Farmer">{lang === 'mr' ? 'Farmer (शेतकरी)' : 'Farmer'}</option>
                    <option value="Professional">{lang === 'mr' ? 'Professional (डॉक्टर/सीए)' : 'Professional'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'मासिक उत्पन्न (₹)' : 'Monthly Income (₹)'}
                  </label>
                  <input
                    type="number"
                    value={newAppForm.income}
                    onChange={(e) => setNewAppForm({ ...newAppForm, income: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कंपनी / दुकान' : 'Company / Business'}
                  </label>
                  <input
                    type="text"
                    value={newAppForm.company}
                    onChange={(e) => setNewAppForm({ ...newAppForm, company: e.target.value })}
                    placeholder={lang === 'mr' ? 'उदा. इन्फोसिस' : 'e.g. Infosys'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कर्ज योजना निवडा' : 'Select Loan Scheme'}
                  </label>
                  <select
                    value={newAppForm.loanType}
                    onChange={(e) => setNewAppForm({ ...newAppForm, loanType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-semibold"
                  >
                    {loanProducts.map(p => (
                      <option key={p.id} value={p.id}>{lang === 'mr' ? p.nameMr : p.nameEn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कर्ज रक्कम (₹) *' : 'Loan Amount (₹) *'}
                  </label>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={newAppForm.amount}
                    onChange={(e) => setNewAppForm({ ...newAppForm, amount: e.target.value, approvedAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कालावधी (महिने) *' : 'Tenure (Months) *'}
                  </label>
                  <select
                    value={newAppForm.tenure}
                    onChange={(e) => setNewAppForm({ ...newAppForm, tenure: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value={12}>{lang === 'mr' ? '12 महिने (1 वर्ष)' : '12 Months (1 Year)'}</option>
                    <option value={24}>{lang === 'mr' ? '24 महिने (2 वर्षे)' : '24 Months (2 Years)'}</option>
                    <option value={36}>{lang === 'mr' ? '36 महिने (3 वर्षे)' : '36 Months (3 Years)'}</option>
                    <option value={60}>{lang === 'mr' ? '60 महिने (5 वर्षे)' : '60 Months (5 Years)'}</option>
                    <option value={120}>{lang === 'mr' ? '120 महिने (10 वर्षे)' : '120 Months (10 Years)'}</option>
                    <option value={240}>{lang === 'mr' ? '240 महिने (20 वर्षे)' : '240 Months (20 Years)'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'प्रारंभिक स्थिती (Status):' : 'Initial Status:'}
                  </label>
                  <select
                    value={newAppForm.status}
                    onChange={(e) => setNewAppForm({ ...newAppForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-amber-400"
                  >
                    <option value="Pending">{lang === 'mr' ? 'प्रलंबित (Pending Review)' : 'Pending Review'}</option>
                    <option value="Approved">{lang === 'mr' ? 'थेट मंजूर (Direct Approved)' : 'Direct Approved'}</option>
                    <option value="Disbursed">{lang === 'mr' ? 'थेट वितरित (Direct Disbursed)' : 'Direct Disbursed'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कर्ज उद्देश:' : 'Loan Purpose:'}
                  </label>
                  <input
                    type="text"
                    value={newAppForm.purpose}
                    onChange={(e) => setNewAppForm({ ...newAppForm, purpose: e.target.value })}
                    placeholder={lang === 'mr' ? 'उदा. व्यवसाय विस्तार' : 'e.g. Business Expansion'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  {lang === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'अर्ज जोडा (Save Loan)' : 'Save Application'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: FULL EDIT APPLICATION (अर्जात बदल करा) */}
      {/* ======================================================== */}
      {editAppModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden my-6">
            
            <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white font-mono">{editAppModal.id}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                    {lang === 'mr' ? 'बदल मोड (Edit Mode)' : 'Edit Mode'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'mr' ? 'अर्जदाराची माहिती, कर्ज रक्कम, स्थिती किंवा व्याजदर बदला.' : 'Modify applicant info, amount, tenure, or sanction details.'}
                </p>
              </div>

              <button
                onClick={() => setEditAppModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs text-slate-300 max-h-[75vh] overflow-y-auto">
              
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  {lang === 'mr' ? '1. अर्जदार संपर्क व माहिती' : '1. Applicant Personal & Contact Info'}
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'नाव (Name):' : 'Name:'}</label>
                    <input
                      type="text"
                      required
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'मोबाईल (Mobile):' : 'Mobile:'}</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={editForm.mobile || ''}
                      onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'शहर (City):' : 'City:'}</label>
                    <input
                      type="text"
                      value={editForm.city || ''}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'पॅन क्रमांक (PAN):' : 'PAN Number:'}</label>
                    <input
                      type="text"
                      maxLength={10}
                      value={editForm.pan || ''}
                      onChange={(e) => setEditForm({ ...editForm, pan: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'आधार क्रमांक (Aadhaar):' : 'Aadhaar Number:'}</label>
                    <input
                      type="text"
                      maxLength={14}
                      value={editForm.aadhaar || ''}
                      onChange={(e) => setEditForm({ ...editForm, aadhaar: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'मासिक उत्पन्न (Income ₹):' : 'Monthly Income (₹):'}</label>
                    <input
                      type="number"
                      value={editForm.income || 0}
                      onChange={(e) => setEditForm({ ...editForm, income: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  {lang === 'mr' ? '2. कर्ज योजना, रक्कम व कालावधी' : '2. Loan Scheme, Amount & Tenure'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'योजना प्रकार (Loan Scheme):' : 'Loan Scheme:'}</label>
                    <select
                      value={editForm.loanType || 'personal'}
                      onChange={(e) => setEditForm({ ...editForm, loanType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-semibold"
                    >
                      {loanProducts.map(p => (
                        <option key={p.id} value={p.id}>{lang === 'mr' ? p.nameMr : p.nameEn}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'मागणी रक्कम (Amount ₹):' : 'Loan Amount (₹):'}</label>
                    <input
                      type="number"
                      step="10000"
                      value={editForm.amount || 0}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'कालावधी (Tenure Months):' : 'Tenure (Months):'}</label>
                    <select
                      value={editForm.tenure || 36}
                      onChange={(e) => setEditForm({ ...editForm, tenure: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value={12}>{lang === 'mr' ? '12 महिने' : '12 Months'}</option>
                      <option value={24}>{lang === 'mr' ? '24 महिने' : '24 Months'}</option>
                      <option value={36}>{lang === 'mr' ? '36 महिने' : '36 Months'}</option>
                      <option value={48}>{lang === 'mr' ? '48 महिने' : '48 Months'}</option>
                      <option value={60}>{lang === 'mr' ? '60 महिने' : '60 Months'}</option>
                      <option value={120}>{lang === 'mr' ? '120 महिने' : '120 Months'}</option>
                      <option value={240}>{lang === 'mr' ? '240 महिने' : '240 Months'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">{lang === 'mr' ? 'कर्जाचा उद्देश (Purpose):' : 'Loan Purpose:'}</label>
                  <input
                    type="text"
                    value={editForm.purpose || ''}
                    onChange={(e) => setEditForm({ ...editForm, purpose: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-3 bg-slate-800/80 p-4 rounded-2xl border border-amber-500/40">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  {lang === 'mr' ? '3. ॲडमिन मंजुरी आणि स्थिती (Approval & Underwriting)' : '3. Admin Sanctions & Status'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">{lang === 'mr' ? 'स्थिती (Status):' : 'Status:'}</label>
                    <select
                      value={editForm.status || 'Pending'}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-amber-400"
                    >
                      <option value="Pending">{lang === 'mr' ? 'प्रलंबित (Pending Review)' : 'Pending Review'}</option>
                      <option value="Approved">{lang === 'mr' ? 'मंजूर (Approved)' : 'Approved'}</option>
                      <option value="Disbursed">{lang === 'mr' ? 'वितरित (Disbursed to Bank)' : 'Disbursed to Bank'}</option>
                      <option value="Rejected">{lang === 'mr' ? 'नामंजूर (Rejected)' : 'Rejected'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">{lang === 'mr' ? 'मंजूर रक्कम (Sanctioned ₹):' : 'Sanctioned (₹):'}</label>
                    <input
                      type="number"
                      step="10000"
                      value={editForm.approvedAmount || 0}
                      onChange={(e) => setEditForm({ ...editForm, approvedAmount: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">{lang === 'mr' ? 'लागू व्याजदर (% p.a.):' : 'Approved Rate (% p.a.):'}</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.approvedRate || 10.5}
                      onChange={(e) => setEditForm({ ...editForm, approvedRate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">{lang === 'mr' ? 'ग्राहकासाठी शेरा (Remarks):' : 'Admin Remarks:'}</label>
                  <textarea
                    rows={2}
                    value={editForm.remarks || ''}
                    onChange={(e) => setEditForm({ ...editForm, remarks: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditAppModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  {lang === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'बदल जतन करा (Save Changes)' : 'Save Changes'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: VIEW APPLICATION DETAILS */}
      {/* ======================================================== */}
      {viewDetailModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-6">
            
            <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xl font-black text-white font-mono">{viewDetailModal.id}</span>
                <p className="text-xs text-slate-400 mt-0.5">
                  {viewDetailModal.name} • {viewDetailModal.city} • {viewDetailModal.loanName}
                </p>
              </div>

              <button
                onClick={() => setViewDetailModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'मोबाईल:' : 'Mobile:'}</span>
                  <strong className="text-white">{viewDetailModal.mobile}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'पॅन क्रमांक:' : 'PAN:'}</span>
                  <strong className="text-emerald-400 font-mono">{viewDetailModal.pan}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'आधार:' : 'Aadhaar:'}</span>
                  <strong className="text-white font-mono">{viewDetailModal.aadhaar}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'मासिक उत्पन्न:' : 'Monthly Income:'}</span>
                  <strong className="text-emerald-400">{formatCurrency(viewDetailModal.income)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'मागणी रक्कम:' : 'Requested Amount:'}</span>
                  <strong className="text-white">{formatCurrency(viewDetailModal.amount)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'मंजूर रक्कम:' : 'Sanctioned Amount:'}</span>
                  <strong className="text-emerald-400">{formatCurrency(viewDetailModal.approvedAmount)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'मासिक EMI:' : 'Monthly EMI:'}</span>
                  <strong className="text-amber-400">{formatCurrency(viewDetailModal.monthlyEmi)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'mr' ? 'स्थिती:' : 'Status:'}</span>
                  <strong className="text-white">{viewDetailModal.status}</strong>
                </div>
              </div>

              {viewDetailModal.remarks && (
                <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-indigo-200">
                  <span className="font-bold text-[10px] uppercase text-indigo-400 block mb-1">
                    {lang === 'mr' ? 'शेरा (Remarks):' : 'Remarks:'}
                  </span>
                  <p>{viewDetailModal.remarks}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    const toEdit = viewDetailModal;
                    setViewDetailModal(null);
                    handleOpenEdit(toEdit);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'या अर्जात बदल करा' : 'Edit This Application'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: EDIT LOAN SCHEME RATE & LIMIT */}
      {/* ======================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-6">
            
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-white">
                  {lang === 'mr' ? `${editingProduct.nameMr} - बदल` : `Edit ${editingProduct.nameEn}`}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {lang === 'mr' ? 'व्याजदर, कमाल मर्यादा किंवा नाव बदला' : 'Set custom rate and maximum sanction cap'}
                </p>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              updateLoanProduct(editingProduct.id, editingProduct);
              setEditingProduct(null);
            }} className="p-6 space-y-4 text-xs text-slate-300">
              
              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'योजनेचे नाव (मराठी):' : 'Scheme Name (Marathi):'}
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.nameMr}
                  onChange={(e) => setEditingProduct({ ...editingProduct, nameMr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'नवीन व्याजदर (उदा. 8.4% किंवा 9.9%):' : 'Annual Rate (e.g. 8.4%):'}
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.rate}
                  onChange={(e) => setEditingProduct({ ...editingProduct, rate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-black"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'कमाल मर्यादा (उदा. ₹50,00,000):' : 'Max Loan Cap (e.g. ₹50 Lakhs):'}
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.maxAmount}
                  onChange={(e) => setEditingProduct({ ...editingProduct, maxAmount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'कालावधी (Tenure):' : 'Tenure Range:'}
                </label>
                <input
                  type="text"
                  value={editingProduct.tenure || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tenure: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  {lang === 'mr' ? 'रद्द' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'बदल सेव्ह करा' : 'Save Changes'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: ADD NEW LOAN SCHEME */}
      {/* ======================================================== */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-6">
            
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-white">
                  {lang === 'mr' ? '+ नवीन कर्ज योजना जोडा' : '+ Add New Loan Scheme'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {lang === 'mr' ? 'वेबसाईटवर नवीन लोन प्रॉडक्ट थेट दिसेल' : 'Will appear directly on customer site'}
                </p>
              </div>

              <button
                onClick={() => setNewProductModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="p-6 space-y-4 text-xs text-slate-300">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'योजनेचे नाव (मराठी) *:' : 'Scheme Name (Marathi) *:'}
                </label>
                <input
                  type="text"
                  required
                  value={newProdForm.nameMr}
                  onChange={(e) => setNewProdForm({ ...newProdForm, nameMr: e.target.value })}
                  placeholder={lang === 'mr' ? 'उदा. महिला सक्षमीकरण कर्ज' : 'e.g. Mahila Sashaktikaran Loan'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'Scheme Name (English) *:' : 'Scheme Name (English) *:'}
                </label>
                <input
                  type="text"
                  required
                  value={newProdForm.nameEn}
                  onChange={(e) => setNewProdForm({ ...newProdForm, nameEn: e.target.value })}
                  placeholder="e.g. Women Entrepreneur Loan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'व्याजदर *:' : 'Annual Rate *:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdForm.rate}
                    onChange={(e) => setNewProdForm({ ...newProdForm, rate: e.target.value })}
                    placeholder="8.5%"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कमाल मर्यादा *:' : 'Max Amount *:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newProdForm.maxAmount}
                    onChange={(e) => setNewProdForm({ ...newProdForm, maxAmount: e.target.value })}
                    placeholder="₹25,00,000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'वर्णन (Description Mr):' : 'Description:'}
                </label>
                <textarea
                  rows={2}
                  value={newProdForm.descMr}
                  onChange={(e) => setNewProdForm({ ...newProdForm, descMr: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  {lang === 'mr' ? 'रद्द' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'योजना जोडा' : 'Add Scheme'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: ADD / EDIT FAQ */}
      {/* ======================================================== */}
      {newFaqModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-6">
            
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-white">
                  {editingFaq !== null 
                    ? (lang === 'mr' ? 'FAQ बदला' : 'Edit FAQ') 
                    : (lang === 'mr' ? '+ नवीन FAQ जोडा' : '+ Add New FAQ')}
                </h4>
              </div>
              <button
                onClick={() => setNewFaqModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="p-6 space-y-4 text-xs text-slate-300">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'प्रश्न (Marathi) *:' : 'Question (Marathi) *:'}
                </label>
                <input
                  type="text"
                  required
                  value={faqForm.qMr}
                  onChange={(e) => setFaqForm({ ...faqForm, qMr: e.target.value })}
                  placeholder={lang === 'mr' ? 'उदा. कर्ज मिळण्यासाठी कोणती कागदपत्रे लागतात?' : 'e.g. Which documents are required?'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'उत्तर (Marathi) *:' : 'Answer (Marathi) *:'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={faqForm.aMr}
                  onChange={(e) => setFaqForm({ ...faqForm, aMr: e.target.value })}
                  placeholder={lang === 'mr' ? 'उदा. आधार कार्ड, पॅन कार्ड आणि 3 महिन्यांचे बँक स्टेटमेंट आवश्यक आहे.' : 'e.g. Aadhaar card, PAN card, and 3 months bank statement.'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewFaqModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  {lang === 'mr' ? 'रद्द' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer"
                >
                  {editingFaq !== null 
                    ? (lang === 'mr' ? 'अपडेट करा' : 'Update FAQ') 
                    : (lang === 'mr' ? 'FAQ सेव्ह करा' : 'Save FAQ')}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 7: ADD / EDIT REVIEW */}
      {/* ======================================================== */}
      {newReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden my-6">
            
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-white">
                  {editingReview !== null 
                    ? (lang === 'mr' ? 'अभिप्राय बदला' : 'Edit Review') 
                    : (lang === 'mr' ? '+ नवीन ग्राहक अभिप्राय जोडा' : '+ Add Customer Review')}
                </h4>
              </div>
              <button
                onClick={() => setNewReviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="p-6 space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'ग्राहकाचे नाव *:' : 'Customer Name *:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder={lang === 'mr' ? 'उदा. विठ्ठल जाधव' : 'e.g. Vitthal Jadhav'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'शहर *:' : 'City *:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.city}
                    onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                    placeholder={lang === 'mr' ? 'उदा. नाशिक' : 'e.g. Nashik'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'कर्ज योजना व रक्कम:' : 'Loan Scheme & Amount:'}
                  </label>
                  <input
                    type="text"
                    value={reviewForm.loan}
                    onChange={(e) => setReviewForm({ ...reviewForm, loan: e.target.value })}
                    placeholder={lang === 'mr' ? 'गृह कर्ज • ₹25 लाख' : 'Home Loan • ₹25 Lakhs'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">
                    {lang === 'mr' ? 'स्टार रेटिंग:' : 'Star Rating:'}
                  </label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-400 font-bold"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★ (4 Stars)</option>
                    <option value={3}>★★★ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">
                  {lang === 'mr' ? 'अभिप्राय / मनोगत *:' : 'Review / Comment *:'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.commentMr}
                  onChange={(e) => setReviewForm({ ...reviewForm, commentMr: e.target.value, commentEn: e.target.value })}
                  placeholder={lang === 'mr' ? 'उदा. अत्यंत जलद सेवा मिळाली आणि 24 तासांत रक्कम बँक खात्यात आली.' : 'e.g. Excellent and transparent service with funds credited in 24 hours.'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewReviewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  {lang === 'mr' ? 'रद्द' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer"
                >
                  {editingReview !== null 
                    ? (lang === 'mr' ? 'अपडेट करा' : 'Update Review') 
                    : (lang === 'mr' ? 'अभिप्राय जोडा' : 'Add Review')}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
