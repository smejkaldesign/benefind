import type { Locale } from './types';

export interface Dictionary {
  common: {
    appName: string;
    tagline: string;
    home: string;
    screening: string;
    dashboard: string;
    results: string;
    signIn: string;
    signOut: string;
    back: string;
    continue_: string;
    startOver: string;
    loading: string;
    learnMore: string;
    applyNow: string;
    free: string;
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    noAccount: string;
  };
  screening: {
    title: string;
    welcome: string;
    privacy: string;
    calculating: string;
    eligible: string;
    notEligible: string;
    perMonth: string;
    perYear: string;
    viewResults: string;
  };
  results: {
    youMayQualify: string;
    programs: string;
    documents: string;
    nextSteps: string;
    confidence: string;
    notCurrentlyEligible: string;
    disclaimer: string;
    totalEstimate: string;
    gathered: string;
  };
  auth: {
    signInTitle: string;
    noPassword: string;
    emailLabel: string;
    sendLink: string;
    checkEmail: string;
    magicLinkSent: string;
    differentEmail: string;
  };
  values: {
    languages: string;
    guidance: string;
    privacy_: string;
    languagesDesc: string;
    guidanceDesc: string;
    privacyDesc: string;
  };
}

const en: Dictionary = {
  common: {
    appName: 'Benefind',
    tagline: 'Find Every Benefit You Deserve',
    home: 'Home',
    screening: 'Screen',
    dashboard: 'Dashboard',
    results: 'Results',
    signIn: 'Sign In',
    signOut: 'Sign out',
    back: 'Back',
    continue_: 'Continue',
    startOver: 'Start Over',
    loading: 'Loading...',
    learnMore: 'Learn more',
    applyNow: 'Apply now',
    free: 'Free for everyone.',
  },
  hero: {
    title1: 'Find Every Benefit',
    title2: 'You Deserve',
    subtitle: 'Answer a few simple questions and discover government programs you qualify for — explained in plain language, in your language.',
    cta: 'Check My Eligibility',
    noAccount: '100% free. No account required to check eligibility.',
  },
  screening: {
    title: 'Eligibility Screening',
    welcome: "Hi! I'm here to help you find government benefits you may qualify for. This takes about 3 minutes.",
    privacy: "Your answers are private and won't be shared with anyone. Let's get started.",
    calculating: "Great, I have everything I need. Let me check which programs you qualify for...",
    eligible: 'You may qualify for {count} program{s} worth an estimated ${monthly}/month (${annual}/year). Scroll down to see your results.',
    notEligible: "Based on the information provided, you may not qualify for the programs we currently check. This doesn't mean there aren't other programs available — check with your local social services office.",
    perMonth: '/month',
    perYear: '/year',
    viewResults: 'View Full Results',
  },
  results: {
    youMayQualify: 'You may qualify for',
    programs: 'Programs',
    documents: 'Documents',
    nextSteps: 'Next Steps',
    confidence: 'confidence',
    notCurrentlyEligible: 'Not currently eligible',
    disclaimer: 'These results are estimates based on the information you provided. Actual eligibility is determined by each program\'s administering agency.',
    totalEstimate: 'Total estimated benefit',
    gathered: 'gathered',
  },
  auth: {
    signInTitle: 'Sign in to Benefind',
    noPassword: "No password needed — we'll email you a magic link.",
    emailLabel: 'Email address',
    sendLink: 'Send magic link',
    checkEmail: 'Check your email',
    magicLinkSent: 'We sent a magic link to',
    differentEmail: 'Use a different email',
  },
  values: {
    languages: '5 Languages',
    guidance: 'Step-by-Step Guidance',
    privacy_: 'Private & Secure',
    languagesDesc: 'English, Spanish, Mandarin, Vietnamese, and Arabic. More coming soon.',
    guidanceDesc: 'We explain every question on every form in plain language. No jargon.',
    privacyDesc: 'Your data is encrypted end-to-end. We never sell your information.',
  },
};

const es: Dictionary = {
  common: {
    appName: 'Benefind',
    tagline: 'Encuentra Todos los Beneficios que Mereces',
    home: 'Inicio',
    screening: 'Evaluar',
    dashboard: 'Panel',
    results: 'Resultados',
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    back: 'Volver',
    continue_: 'Continuar',
    startOver: 'Empezar de nuevo',
    loading: 'Cargando...',
    learnMore: 'Más información',
    applyNow: 'Solicitar ahora',
    free: 'Gratis para todos.',
  },
  hero: {
    title1: 'Encuentra Todos los Beneficios',
    title2: 'que Mereces',
    subtitle: 'Responde unas preguntas sencillas y descubre los programas del gobierno para los que calificas — explicados en lenguaje simple, en tu idioma.',
    cta: 'Verificar Mi Elegibilidad',
    noAccount: '100% gratis. No necesitas cuenta para verificar elegibilidad.',
  },
  screening: {
    title: 'Evaluación de Elegibilidad',
    welcome: '¡Hola! Estoy aquí para ayudarte a encontrar beneficios del gobierno para los que puedas calificar. Toma unos 3 minutos.',
    privacy: 'Tus respuestas son privadas y no se compartirán con nadie. ¡Comencemos!',
    calculating: 'Perfecto, tengo todo lo que necesito. Déjame verificar para qué programas calificas...',
    eligible: 'Puedes calificar para {count} programa{s} con un valor estimado de ${monthly}/mes (${annual}/año). Desplázate hacia abajo para ver tus resultados.',
    notEligible: 'Según la información proporcionada, es posible que no califiques para los programas que verificamos actualmente. Consulta con tu oficina local de servicios sociales.',
    perMonth: '/mes',
    perYear: '/año',
    viewResults: 'Ver Resultados Completos',
  },
  results: {
    youMayQualify: 'Puedes calificar para',
    programs: 'Programas',
    documents: 'Documentos',
    nextSteps: 'Próximos Pasos',
    confidence: 'confianza',
    notCurrentlyEligible: 'No elegible actualmente',
    disclaimer: 'Estos resultados son estimaciones basadas en la información que proporcionaste. La elegibilidad real es determinada por la agencia administradora de cada programa.',
    totalEstimate: 'Beneficio total estimado',
    gathered: 'reunidos',
  },
  auth: {
    signInTitle: 'Iniciar sesión en Benefind',
    noPassword: 'No necesitas contraseña — te enviaremos un enlace mágico por correo.',
    emailLabel: 'Correo electrónico',
    sendLink: 'Enviar enlace mágico',
    checkEmail: 'Revisa tu correo',
    magicLinkSent: 'Enviamos un enlace mágico a',
    differentEmail: 'Usar otro correo',
  },
  values: {
    languages: '5 Idiomas',
    guidance: 'Guía Paso a Paso',
    privacy_: 'Privado y Seguro',
    languagesDesc: 'Inglés, español, mandarín, vietnamita y árabe. Más próximamente.',
    guidanceDesc: 'Explicamos cada pregunta de cada formulario en lenguaje simple. Sin jerga.',
    privacyDesc: 'Tus datos están cifrados de extremo a extremo. Nunca vendemos tu información.',
  },
};

const zh: Dictionary = {
  common: {
    appName: 'Benefind',
    tagline: '找到您应得的每一项福利',
    home: '首页',
    screening: '筛查',
    dashboard: '控制面板',
    results: '结果',
    signIn: '登录',
    signOut: '退出',
    back: '返回',
    continue_: '继续',
    startOver: '重新开始',
    loading: '加载中...',
    learnMore: '了解更多',
    applyNow: '立即申请',
    free: '对所有人免费。',
  },
  hero: {
    title1: '找到您应得的',
    title2: '每一项福利',
    subtitle: '回答几个简单的问题，发现您有资格获得的政府项目——用简单的语言、用您的语言解释。',
    cta: '检查我的资格',
    noAccount: '100%免费。无需账户即可检查资格。',
  },
  screening: {
    title: '资格筛查',
    welcome: '您好！我在这里帮助您找到您可能有资格获得的政府福利。大约需要3分钟。',
    privacy: '您的回答是私密的，不会与任何人分享。让我们开始吧！',
    calculating: '好的，我已经有了所有需要的信息。让我查查您有资格获得哪些项目...',
    eligible: '您可能有资格获得{count}个项目，估计价值${monthly}/月（${annual}/年）。向下滚动查看您的结果。',
    notEligible: '根据您提供的信息，您可能不符合我们目前检查的项目资格。请咨询当地社会服务办公室。',
    perMonth: '/月',
    perYear: '/年',
    viewResults: '查看完整结果',
  },
  results: {
    youMayQualify: '您可能有资格获得',
    programs: '项目',
    documents: '文件',
    nextSteps: '下一步',
    confidence: '置信度',
    notCurrentlyEligible: '目前不符合资格',
    disclaimer: '这些结果是基于您提供的信息的估计。实际资格由每个项目的管理机构确定。',
    totalEstimate: '总估计福利',
    gathered: '已收集',
  },
  auth: {
    signInTitle: '登录Benefind',
    noPassword: '无需密码——我们会发送一个魔法链接到您的邮箱。',
    emailLabel: '电子邮箱',
    sendLink: '发送魔法链接',
    checkEmail: '请查看您的邮箱',
    magicLinkSent: '我们已发送魔法链接到',
    differentEmail: '使用其他邮箱',
  },
  values: {
    languages: '5种语言',
    guidance: '逐步指导',
    privacy_: '私密安全',
    languagesDesc: '英语、西班牙语、中文、越南语和阿拉伯语。更多即将推出。',
    guidanceDesc: '我们用简单的语言解释每个表格上的每个问题。没有专业术语。',
    privacyDesc: '您的数据端到端加密。我们从不出售您的信息。',
  },
};

const vi: Dictionary = {
  common: {
    appName: 'Benefind',
    tagline: 'Tìm Mọi Quyền Lợi Bạn Xứng Đáng',
    home: 'Trang chủ',
    screening: 'Kiểm tra',
    dashboard: 'Bảng điều khiển',
    results: 'Kết quả',
    signIn: 'Đăng nhập',
    signOut: 'Đăng xuất',
    back: 'Quay lại',
    continue_: 'Tiếp tục',
    startOver: 'Bắt đầu lại',
    loading: 'Đang tải...',
    learnMore: 'Tìm hiểu thêm',
    applyNow: 'Đăng ký ngay',
    free: 'Miễn phí cho tất cả mọi người.',
  },
  hero: {
    title1: 'Tìm Mọi Quyền Lợi',
    title2: 'Bạn Xứng Đáng',
    subtitle: 'Trả lời vài câu hỏi đơn giản và khám phá các chương trình chính phủ bạn đủ điều kiện — giải thích bằng ngôn ngữ đơn giản, bằng ngôn ngữ của bạn.',
    cta: 'Kiểm Tra Điều Kiện',
    noAccount: 'Miễn phí 100%. Không cần tài khoản để kiểm tra điều kiện.',
  },
  screening: {
    title: 'Kiểm Tra Điều Kiện',
    welcome: 'Xin chào! Tôi ở đây để giúp bạn tìm các quyền lợi chính phủ mà bạn có thể đủ điều kiện. Chỉ mất khoảng 3 phút.',
    privacy: 'Câu trả lời của bạn là riêng tư và sẽ không được chia sẻ với bất kỳ ai. Hãy bắt đầu!',
    calculating: 'Tuyệt vời, tôi đã có tất cả thông tin cần thiết. Để tôi kiểm tra bạn đủ điều kiện cho chương trình nào...',
    eligible: 'Bạn có thể đủ điều kiện cho {count} chương trình với giá trị ước tính ${monthly}/tháng (${annual}/năm).',
    notEligible: 'Dựa trên thông tin bạn cung cấp, bạn có thể không đủ điều kiện. Hãy liên hệ văn phòng dịch vụ xã hội địa phương.',
    perMonth: '/tháng',
    perYear: '/năm',
    viewResults: 'Xem Kết Quả Đầy Đủ',
  },
  results: {
    youMayQualify: 'Bạn có thể đủ điều kiện cho',
    programs: 'Chương trình',
    documents: 'Tài liệu',
    nextSteps: 'Bước Tiếp Theo',
    confidence: 'độ tin cậy',
    notCurrentlyEligible: 'Hiện không đủ điều kiện',
    disclaimer: 'Đây là ước tính dựa trên thông tin bạn cung cấp. Điều kiện thực tế do cơ quan quản lý chương trình xác định.',
    totalEstimate: 'Tổng quyền lợi ước tính',
    gathered: 'đã thu thập',
  },
  auth: {
    signInTitle: 'Đăng nhập Benefind',
    noPassword: 'Không cần mật khẩu — chúng tôi sẽ gửi liên kết đến email của bạn.',
    emailLabel: 'Địa chỉ email',
    sendLink: 'Gửi liên kết',
    checkEmail: 'Kiểm tra email của bạn',
    magicLinkSent: 'Chúng tôi đã gửi liên kết đến',
    differentEmail: 'Dùng email khác',
  },
  values: {
    languages: '5 Ngôn ngữ',
    guidance: 'Hướng Dẫn Từng Bước',
    privacy_: 'Riêng Tư & An Toàn',
    languagesDesc: 'Tiếng Anh, Tây Ban Nha, Trung Quốc, Việt Nam và Ả Rập.',
    guidanceDesc: 'Chúng tôi giải thích mọi câu hỏi bằng ngôn ngữ đơn giản.',
    privacyDesc: 'Dữ liệu của bạn được mã hóa. Chúng tôi không bao giờ bán thông tin của bạn.',
  },
};

const ar: Dictionary = {
  common: {
    appName: 'Benefind',
    tagline: 'اكتشف كل المزايا التي تستحقها',
    home: 'الرئيسية',
    screening: 'فحص',
    dashboard: 'لوحة التحكم',
    results: 'النتائج',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    back: 'رجوع',
    continue_: 'متابعة',
    startOver: 'البدء من جديد',
    loading: 'جاري التحميل...',
    learnMore: 'اعرف المزيد',
    applyNow: 'قدّم الآن',
    free: 'مجاني للجميع.',
  },
  hero: {
    title1: 'اكتشف كل المزايا',
    title2: 'التي تستحقها',
    subtitle: 'أجب عن بضعة أسئلة بسيطة واكتشف البرامج الحكومية التي تؤهل لها — موضحة بلغة بسيطة، بلغتك.',
    cta: 'تحقق من أهليتي',
    noAccount: 'مجاني 100%. لا حاجة لحساب للتحقق من الأهلية.',
  },
  screening: {
    title: 'فحص الأهلية',
    welcome: 'مرحباً! أنا هنا لمساعدتك في إيجاد المزايا الحكومية التي قد تكون مؤهلاً لها. يستغرق حوالي 3 دقائق.',
    privacy: 'إجاباتك خاصة ولن تتم مشاركتها مع أي شخص. لنبدأ!',
    calculating: 'ممتاز، لدي كل ما أحتاجه. دعني أتحقق من البرامج التي تؤهل لها...',
    eligible: 'قد تكون مؤهلاً لـ {count} برنامج بقيمة تقديرية ${monthly}/شهرياً (${annual}/سنوياً).',
    notEligible: 'بناءً على المعلومات المقدمة، قد لا تكون مؤهلاً. تحقق من مكتب الخدمات الاجتماعية المحلي.',
    perMonth: '/شهرياً',
    perYear: '/سنوياً',
    viewResults: 'عرض النتائج الكاملة',
  },
  results: {
    youMayQualify: 'قد تكون مؤهلاً لـ',
    programs: 'البرامج',
    documents: 'المستندات',
    nextSteps: 'الخطوات التالية',
    confidence: 'الثقة',
    notCurrentlyEligible: 'غير مؤهل حالياً',
    disclaimer: 'هذه النتائج تقديرات بناءً على المعلومات التي قدمتها. الأهلية الفعلية تحددها الجهة المسؤولة عن كل برنامج.',
    totalEstimate: 'إجمالي المزايا المقدرة',
    gathered: 'تم جمعها',
  },
  auth: {
    signInTitle: 'تسجيل الدخول إلى Benefind',
    noPassword: 'لا حاجة لكلمة مرور — سنرسل لك رابطاً سحرياً عبر البريد الإلكتروني.',
    emailLabel: 'البريد الإلكتروني',
    sendLink: 'إرسال الرابط السحري',
    checkEmail: 'تحقق من بريدك الإلكتروني',
    magicLinkSent: 'أرسلنا رابطاً سحرياً إلى',
    differentEmail: 'استخدام بريد آخر',
  },
  values: {
    languages: '5 لغات',
    guidance: 'إرشاد خطوة بخطوة',
    privacy_: 'خاص وآمن',
    languagesDesc: 'الإنجليزية والإسبانية والصينية والفيتنامية والعربية.',
    guidanceDesc: 'نشرح كل سؤال في كل نموذج بلغة بسيطة. بدون مصطلحات.',
    privacyDesc: 'بياناتك مشفرة من طرف إلى طرف. لا نبيع معلوماتك أبداً.',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es, zh, vi, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
