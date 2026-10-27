// Loan Products Data & Translations for MahaLoan Finance

export const loanProducts = [
  {
    id: 'personal',
    nameMr: 'वैयक्तिक कर्ज',
    nameEn: 'Personal Loan',
    tagMr: 'झटपट मंजुरी • विनातारण',
    tagEn: 'Instant Approval • Collateral Free',
    rate: '10.5%',
    maxAmount: '₹25,00,000',
    tenure: '12 ते 60 महिने',
    tenureEn: '12 to 60 Months',
    processingFee: '0.5%',
    icon: 'UserCheck',
    color: 'from-blue-600 to-indigo-600',
    lightBg: 'bg-blue-50 text-blue-700 border-blue-200',
    descMr: 'वैद्यकीय आणीबाणी, लग्न, प्रवास किंवा घर नूतनीकरणासाठी त्वरित वैयक्तिक कर्ज.',
    descEn: 'Quick personal finance for medical emergency, wedding, travel, or home renovation.',
    featuresMr: [
      'कोणत्याही तारणाची गरज नाही',
      'केवळ 24 तासांत बँक खात्यात रक्कम जमा',
      'किमान कागदपत्रे (केवळ पॅन आणि आधार)',
      'लवचिक परतफेड कालावधी'
    ],
    featuresEn: [
      'No collateral required',
      'Disbursal in 24 hours directly to bank',
      'Minimal paperwork (PAN & Aadhaar)',
      'Flexible repayment tenure'
    ],
    eligibleMr: 'वेतनधारक (किमान मासिक वेतन ₹20,000) किंवा स्वयंरोजगार',
    eligibleEn: 'Salaried (Min monthly income ₹20,000) or Self-employed'
  },
  {
    id: 'home',
    nameMr: 'गृह कर्ज (Home Loan)',
    nameEn: 'Home Loan',
    tagMr: 'सर्वात कमी व्याजदर • 30 वर्षांपर्यंत',
    tagEn: 'Lowest Interest Rates • Up to 30 Years',
    rate: '8.4%',
    maxAmount: '₹1,50,00,000',
    tenure: '5 ते 30 वर्षे',
    tenureEn: '5 to 30 Years',
    processingFee: '0.25%',
    icon: 'Home',
    color: 'from-emerald-600 to-teal-600',
    lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    descMr: 'तुमच्या स्वप्नातील घरासाठी किंवा प्लॉट खरेदी आणि बांधकामासाठी परवडणारे गृह कर्ज.',
    descEn: 'Affordable home loan to buy flat, bungalow, construction or plot purchase.',
    featuresMr: [
      '8.4% पासून आकर्षक व्याजदर',
      'प्रॉपर्टी व्हॅल्यूच्या 90% पर्यंत कर्ज',
      'कमाल 30 वर्षांपर्यंत सुलभ हप्ते',
      'आयकर कलम 80C व 24(b) अंतर्गत कर सवलत'
    ],
    featuresEn: [
      'Attractive interest rate from 8.4%',
      'Up to 90% funding of property value',
      'Tenure up to 30 years with easy EMIs',
      'Tax benefits under Section 80C & 24(b)'
    ],
    eligibleMr: '21 ते 65 वयोगटातील नागरिक, स्थिर उत्पन्न स्रोत',
    eligibleEn: 'Aged 21 to 65 with stable verifiable income source'
  },
  {
    id: 'business',
    nameMr: 'व्यवसाय कर्ज (Business Loan)',
    nameEn: 'Business Loan',
    tagMr: 'व्यवसाय विस्तारासाठी • कॅश क्रेडिट',
    tagEn: 'For Business Expansion & Working Capital',
    rate: '11.2%',
    maxAmount: '₹75,00,000',
    tenure: '12 ते 84 महिने',
    tenureEn: '12 to 84 Months',
    processingFee: '1.0%',
    icon: 'Briefcase',
    color: 'from-amber-600 to-orange-600',
    lightBg: 'bg-amber-50 text-amber-700 border-amber-200',
    descMr: 'दुकानदार, व्यापारी, एमएसएमई आणि उद्योजकांसाठी खेळत्या भांडवलाकरिता विशेष कर्ज.',
    descEn: 'Collateral-free working capital and expansion loans for MSMEs and retailers.',
    featuresMr: [
      '₹75 लाखांपर्यंत विनातारण कर्ज उपलब्ध',
      'मशिनरी, स्टॉक खरेदी किंवा व्यवसायाची नवीन शाखा उघडण्यासाठी',
      'जीएसटी / आयटीआर आधारावर त्वरित मान्यता',
      'ओव्हरड्राफ्ट सुविधा उपलब्ध'
    ],
    featuresEn: [
      'Up to ₹75 Lakhs collateral-free options',
      'For machinery, stock purchase or new branch',
      'Fast sanction on GST/ITR basis',
      'Overdraft & OD facility available'
    ],
    eligibleMr: 'किमान 2 वर्षे चालणारा व्यवसाय व वार्षिक उलाढाल ₹15 लाख+',
    eligibleEn: 'Min 2 years business vintage with ₹15L+ annual turnover'
  },
  {
    id: 'kisan',
    nameMr: 'कृषी / शेती कर्ज (Kisan Loan)',
    nameEn: 'Agriculture / Kisan Loan',
    tagMr: 'विशेष सवलतीचे व्याज • शेतकरी बंधूंसाठी',
    tagEn: 'Subsidized Rates • For Farmers',
    rate: '7.0%',
    maxAmount: '₹15,00,000',
    tenure: '1 ते 7 वर्षे',
    tenureEn: '1 to 7 Years',
    processingFee: 'शून्य / Nil',
    icon: 'Wheat',
    color: 'from-green-600 to-lime-600',
    lightBg: 'bg-green-50 text-green-700 border-green-200',
    descMr: 'बियाणे, खते, ट्रॅक्टर, ठिबक सिंचन, शेडनेट किंवा शेती सुधारणेसाठी तात्काळ कर्ज.',
    descEn: 'Instant crop, tractor, solar pump and drip irrigation funding for farmers.',
    featuresMr: [
      'सरकारी अनुदानासह 7% नाममात्र व्याजदर',
      'हंगामी पीक कापणीनंतर परतफेडीची सोय',
      '7/12 उतारा व 8-अ कागदपत्रांवर सुलभ प्रक्रिया',
      'कोणतेही छुपे शुल्क नाही'
    ],
    featuresEn: [
      'Subsidized 7% p.a. interest rate',
      'Harvest-linked seasonal repayments',
      'Easy documentation via 7/12 & 8-A land records',
      'Zero processing fee for small farmers'
    ],
    eligibleMr: 'शेतजमीनधारक शेतकरी किंवा भाडेतत्त्वावरील शेतकरी',
    eligibleEn: 'Farmers having agricultural land ownership records'
  },
  {
    id: 'gold',
    nameMr: 'सुवर्ण कर्ज (Gold Loan)',
    nameEn: 'Gold Loan',
    tagMr: 'केवळ 30 मिनिटांत रोख रक्कम',
    tagEn: 'Cash in 30 Minutes • Low KYC',
    rate: '8.9%',
    maxAmount: '₹50,00,000',
    tenure: '3 ते 36 महिने',
    tenureEn: '3 to 36 Months',
    processingFee: '0.2%',
    icon: 'Coins',
    color: 'from-yellow-600 to-amber-500',
    lightBg: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    descMr: 'तुमच्याकडील सोन्यावर सर्वाधिक मूल्यांकन आणि सर्वात जलद रोख रक्कम.',
    descEn: 'Highest per-gram valuation and instant cash against your gold jewelry.',
    featuresMr: [
      'केवळ 30 मिनिटांत खात्यात रक्कम',
      'सोन्याची बँकेच्या सुरक्षित लॉकरमध्ये 100% सुरक्षा',
      'फक्त व्याज भरून मुद्दल नंतर देण्याची सुविधा (Bullet Repayment)',
      'कमी सिबिल स्कोअर असला तरीही कर्ज मंजूर'
    ],
    featuresEn: [
      'Disbursal in under 30 minutes',
      '100% insured bank vault gold storage',
      'Bullet repayment & monthly interest options',
      'Low CIBIL score accepted'
    ],
    eligibleMr: '18 वर्षांवरील कोणीही सोने बाळगणारे नागरिक',
    eligibleEn: 'Any Indian citizen above 18 owning gold ornaments'
  },
  {
    id: 'vehicle',
    nameMr: 'वाहन कर्ज (Vehicle Loan)',
    nameEn: 'Vehicle Loan',
    tagMr: 'नवीन व जुन्या वाहनांसाठी • 100% फायनान्स',
    tagEn: '100% On-Road Funding • Car & Bike',
    rate: '8.7%',
    maxAmount: '₹30,00,000',
    tenure: '12 ते 84 महिने',
    tenureEn: '12 to 84 Months',
    processingFee: '0.5%',
    icon: 'Car',
    color: 'from-cyan-600 to-blue-600',
    lightBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    descMr: 'नवीन किंवा जुनी कार, टू-व्हीलर, व्यावसायिक वाहनांसाठी 100% ऑन-रोड फायनान्स.',
    descEn: 'Up to 100% on-road financing for new and pre-owned cars and commercial vehicles.',
    featuresMr: [
      '100% ऑन-रोड फंडिंगची सुविधा',
      'कमीत कमी मासिक हप्ता (EMI)',
      'शोरूम कोटेशनवर एका दिवसात मंजुरी',
      'इलेक्ट्रिक वाहनांसाठी (EV) विशेष 0.5% अतिरिक्त सवलत'
    ],
    featuresEn: [
      'Up to 100% on-road price coverage',
      'Lowest monthly EMI schemes',
      'Same-day sanction on showroom quotation',
      'Special 0.5% discount for Electric Vehicles (EV)'
    ],
    eligibleMr: 'किमान मासिक उत्पन्न ₹18,000 असलेले पगारदार किंवा व्यावसायिक',
    eligibleEn: 'Salaried or self-employed with min monthly income ₹18,000'
  }
];

export const initialApplications = [
  {
    id: 'ML-2026-8012',
    name: 'सचिन रमेश कदम',
    mobile: '9822451029',
    email: 'sachin.kadam@gmail.com',
    city: 'पुणे (Pune)',
    state: 'Maharashtra',
    aadhaar: '4589-2140-9812',
    pan: 'ABCDE1234F',
    employment: 'Salaried',
    company: 'टाटा मोटर्स, पुणे',
    income: 48000,
    loanType: 'personal',
    loanName: 'वैयक्तिक कर्ज (Personal Loan)',
    amount: 350000,
    tenure: 36,
    purpose: 'घरातील नूतनीकरण व मुलांच्या शिक्षणासाठी',
    status: 'Approved',
    appliedDate: '2026-10-24',
    approvedAmount: 350000,
    approvedRate: 10.5,
    monthlyEmi: 11378,
    disbursedDate: '2026-10-25',
    remarks: 'सर्व कागदपत्रे व सिबिल स्कोअर 785 उत्कृष्ट आहे. कर्ज मंजूर करण्यात आले आहे.'
  },
  {
    id: 'ML-2026-8025',
    name: 'सुनील तानाजी पाटील',
    mobile: '9423187654',
    email: 'sunil.patil.farm@gmail.com',
    city: 'कोल्हापूर (Kolhapur)',
    state: 'Maharashtra',
    aadhaar: '8912-3401-7621',
    pan: 'BPKPK9821L',
    employment: 'Farmer',
    company: 'ऊस उत्पादक शेतकरी',
    income: 38000,
    loanType: 'kisan',
    loanName: 'कृषी कर्ज (Kisan Loan)',
    amount: 500000,
    tenure: 48,
    purpose: 'ठिबक सिंचन आणि ट्रॅक्टर अवजारे खरेदी',
    status: 'Disbursed',
    appliedDate: '2026-10-21',
    approvedAmount: 500000,
    approvedRate: 7.0,
    monthlyEmi: 11970,
    disbursedDate: '2026-10-23',
    remarks: '7/12 उतारा तपासला, रक्कम शेतकरी खात्यात वर्ग करण्यात आली आहे.'
  },
  {
    id: 'ML-2026-8038',
    name: 'प्रिया राहुल कुलकर्णी',
    mobile: '9970123456',
    email: 'priya.kulkarni@yahoo.com',
    city: 'नाशिक (Nashik)',
    state: 'Maharashtra',
    aadhaar: '6723-9012-3456',
    pan: 'CPQPK7712M',
    employment: 'Salaried',
    company: 'इन्फोसिस लि.',
    income: 75000,
    loanType: 'home',
    loanName: 'गृह कर्ज (Home Loan)',
    amount: 4200000,
    tenure: 240,
    purpose: 'गंगापूर रोड, नासिक येथे 2 BHK फ्लॅट खरेदी',
    status: 'Pending',
    appliedDate: '2026-10-26',
    approvedAmount: 0,
    approvedRate: 8.4,
    monthlyEmi: 36170,
    disbursedDate: null,
    remarks: 'बिल्डर अग्रीमेंट आणि सॅलरी स्लिप्स तपासणी सुरू आहे.'
  },
  {
    id: 'ML-2026-8049',
    name: 'महेश भगवान शिंदे',
    mobile: '9890887711',
    email: 'mahesh.shinde.trade@gmail.com',
    city: 'छत्रपती संभाजीनगर',
    state: 'Maharashtra',
    aadhaar: '3210-9874-1234',
    pan: 'DZXPS4512Q',
    employment: 'Self-Employed',
    company: 'शिंदे इलेक्ट्रॉनिक्स व हार्डवेअर',
    income: 92000,
    loanType: 'business',
    loanName: 'व्यवसाय कर्ज (Business Loan)',
    amount: 1500000,
    tenure: 60,
    purpose: 'सणासुदीच्या हंगामासाठी नवीन स्टॉक व दुकान विस्तार',
    status: 'Approved',
    appliedDate: '2026-10-25',
    approvedAmount: 1500000,
    approvedRate: 11.2,
    monthlyEmi: 32760,
    disbursedDate: null,
    remarks: 'जीएसटी रिटर्न्स पडताळले. बँक खात्याची मँडेट प्रक्रिया बाकी आहे.'
  },
  {
    id: 'ML-2026-8054',
    name: 'अविनाश विठ्ठल गायकवाड',
    mobile: '9765432109',
    email: 'avinash.g@gmail.com',
    city: 'ठाणे (Thane)',
    state: 'Maharashtra',
    aadhaar: '9081-2345-6712',
    pan: 'FGLPO6633K',
    employment: 'Salaried',
    company: 'रिलायन्स रिटेल',
    income: 18000,
    loanType: 'personal',
    loanName: 'वैयक्तिक कर्ज (Personal Loan)',
    amount: 800000,
    tenure: 36,
    purpose: 'इतर कर्जांची परतफेड',
    status: 'Rejected',
    appliedDate: '2026-10-22',
    approvedAmount: 0,
    approvedRate: 0,
    monthlyEmi: 0,
    disbursedDate: null,
    remarks: 'उत्पन्नाच्या तुलनेत कर्ज मागणी जास्त आहे आणि सिबिल स्कोअर 580 असल्याने अर्ज नामंजूर.'
  },
  {
    id: 'ML-2026-8061',
    name: 'दीपाली गणेश जोशी',
    mobile: '9860129034',
    email: 'deepali.joshi@gmail.com',
    city: 'नागपूर (Nagpur)',
    state: 'Maharashtra',
    aadhaar: '5412-8709-3211',
    pan: 'APQDJ9901Z',
    employment: 'Salaried',
    company: 'टीडीएस कन्सल्टन्सी',
    income: 55000,
    loanType: 'vehicle',
    loanName: 'वाहन कर्ज (Vehicle Loan)',
    amount: 850000,
    tenure: 60,
    purpose: 'नवीन टाटा नेक्सॉन ईव्ही कार खरेदी',
    status: 'Disbursed',
    appliedDate: '2026-10-20',
    approvedAmount: 850000,
    approvedRate: 8.7,
    monthlyEmi: 17530,
    disbursedDate: '2026-10-22',
    remarks: 'कार शोरूमला आरटीजीएस द्वारे पेमेंट करण्यात आले आहे.'
  }
];

export const faqList = [
  {
    qMr: 'कर्ज मिळवण्यासाठी किमान सिबिल (CIBIL) स्कोअर किती असावा लागतो?',
    qEn: 'What is the minimum CIBIL score required for a loan?',
    aMr: 'वैयक्तिक आणि व्यवसाय कर्जासाठी सामान्यतः 700 किंवा त्याहून अधिक सिबिल स्कोअर उत्तम मानला जातो. परंतु सुवर्ण कर्ज (Gold Loan) किंवा तारण कर्जासाठी कमी सिबिल स्कोअर असला तरीही कर्ज सहज मिळते.',
    aEn: 'A CIBIL score of 700+ is ideal for unsecured personal and business loans. However, for Gold Loans and secured loans, applications can still be approved with lower credit scores.'
  },
  {
    qMr: 'अर्ज केल्यानंतर कर्ज मंजूर होण्यास किती वेळ लागतो?',
    qEn: 'How long does loan approval and disbursal take?',
    aMr: 'कागदपत्रे योग्य असल्यास वैयक्तिक आणि सुवर्ण कर्ज केवळ 30 मिनिटे ते 24 तासांच्या आत मंजूर होऊन खात्यात जमा केले जाते. गृह कर्ज आणि व्यावसायिक कर्जासाठी 2 ते 4 कामकाजाचे दिवस लागतात.',
    aEn: 'Personal and Gold loans are sanctioned within 30 minutes to 24 hours upon document verification. Home and large Business loans typically take 2 to 4 working days.'
  },
  {
    qMr: 'कर्ज अर्जासाठी कोणती कागदपत्रे आवश्यक आहेत?',
    qEn: 'What documents are required to apply for a loan?',
    aMr: '1. पॅन कार्ड (PAN Card), 2. आधार कार्ड (Aadhaar Card), 3. मागील 3 ते 6 महिन्यांचे बँक स्टेटमेंट, 4. पगारदार असल्यास सॅलरी स्लिप्स किंवा व्यावसायिक असल्यास आयटीआर/जीएसटी, 5. पासपोर्ट साईज फोटो.',
    aEn: '1. PAN Card, 2. Aadhaar Card, 3. Last 3-6 months Bank Statements, 4. Salary slips (for salaried) or ITR/GST (for self-employed), 5. Passport photo.'
  },
  {
    qMr: 'वेळेपूर्वी कर्जाची परतफेड (Prepayment / Foreclosure) करता येते का?',
    qEn: 'Can I prepay or foreclose my loan before tenure ends?',
    aMr: 'होय, तुम्ही कधीही तुमच्या कर्जाची मुदतीपूर्वी परतफेड करू शकता. फ्लोटिंग रेटवरील गृहकर्जांवर कोणताही प्री-पेमेंट दंड आकारला जात नाही.',
    aEn: 'Yes, you can prepay or foreclose your loan anytime. Floating-rate home loans incur zero foreclosure penalties.'
  },
  {
    qMr: 'शेतकऱ्यांसाठी पीक किंवा शेती कर्ज कसे उपलब्ध होते?',
    qEn: 'How can farmers apply for Agriculture or Tractor Loans?',
    aMr: 'शेतकरी बंधू त्यांच्या 7/12 उतारा, 8-अ आणि आधार कार्डाच्या आधारे 7% सवलतीच्या व्याजदराने शेती, पाईपलाईन, ठिबक सिंचन व अवजारे खरेदीसाठी कर्ज मिळवू शकतात.',
    aEn: 'Farmers can apply using 7/12 and 8-A land extract documents at subsidized rates starting from 7% p.a. for seeds, irrigation, machinery, and equipment.'
  }
];

export const customerReviews = [
  {
    name: 'राजेश मोरे',
    city: 'पुणे',
    loan: 'व्यवसाय कर्ज • ₹10 लाख',
    rating: 5,
    commentMr: 'महालोन फायनान्समुळे माझ्या दुकानाचा विस्तार करणे अत्यंत सोपे झाले. केवळ 2 दिवसांत थेट खात्यात पैसे जमा झाले. कोणतीही लाच किंवा छुपे शुल्क नाही!',
    commentEn: 'MahaLoan made expanding my retail shop seamless. Money was in my account in just 2 days. Transparent and highly reliable service!'
  },
  {
    name: 'अनिता प्रभाकर देशमुख',
    city: 'छत्रपती संभाजीनगर',
    loan: 'गृह कर्ज • ₹35 लाख',
    rating: 5,
    commentMr: 'स्वतःच्या घराचे स्वप्न पूर्ण झाले. व्याजदर इतर बँकांपेक्षा कमी मिळाला आणि स्टाफने सर्व कागदपत्रांची प्रक्रिया घरी येऊन पूर्ण करून दिली.',
    commentEn: 'Dream home achieved! Interest rate was lower than traditional banks, and their team assisted at every step. Truly grateful.'
  },
  {
    name: 'गणपतराव पाटील',
    city: 'सांगली',
    loan: 'कृषी कर्ज • ₹4 लाख',
    rating: 5,
    commentMr: 'ठिबक सिंचनासाठी तातडीने पैशांची गरज होती. 7/12 उतारा दिल्यानंतर 24 तासांत मंजुरी मिळाली. शेतकरी बांधवांसाठी सर्वात विश्वासू सेवा आहे.',
    commentEn: 'Needed urgent funds for drip irrigation. Sanctioned within 24 hours of 7/12 submission. Best financial partner for farmers!'
  }
];

export const defaultSiteSettings = {
  companyNameMr: 'महालोन',
  companyNameEn: 'MahaLoan',
  taglineMr: 'महाराष्ट्र कर्ज व वित्त सेवा',
  taglineEn: 'Fast & Trusted Loan Solutions',
  topAnnouncementMr: 'गृह कर्ज आणि वैयक्तिक कर्जावर शून्य प्रक्रिया शुल्क (Zero Processing Fee)!',
  topAnnouncementEn: 'Zero Processing Fees on Home and Personal Loans this month!',
  heroHeadlineMr: 'तुमच्या स्वप्नांना द्या पंख, सुलभ आणि खात्रीशीर कर्ज सेवेसह.',
  heroHeadlineEn: 'Empower Your Dreams with Smart & Transparent Loans.',
  heroSubheadlineMr: 'वैयक्तिक, गृह, व्यवसाय आणि शेती कर्ज आता अत्यंत कमी व्याजदरात (8.4% पासून). 100% डिजिटल आणि पेपरलेस प्रक्रिया.',
  heroSubheadlineEn: 'Personal, Home, Business and Agriculture loans at competitive interest rates starting from 8.4% p.a. 100% digital, paperless process.',
  helplinePhone: '1800-200-8899',
  secondaryPhone: '+91 98220 12345',
  whatsappNumber: '919822012345',
  officialEmail: 'support@mahaloan.com',
  officeAddressMr: 'महालोन टॉवर, 4था मजला, शिवाजीनगर, एफसी रोड जवळ, पुणे - 411005',
  officeAddressEn: 'MahaLoan Tower, 4th Floor, Shivajinagar, Near FC Road, Pune - 411005',
  officeTimingsMr: 'सोमवार ते शनिवार: स. 9:30 ते सायं 7:00',
  officeTimingsEn: 'Monday to Saturday: 9:30 AM to 7:00 PM',
  statCustomers: '50,000+',
  statDisbursed: '₹250+ कोटी',
  statRating: '4.9 / 5'
};

