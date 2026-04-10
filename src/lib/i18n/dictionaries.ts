import type { Locale } from "./types";

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
  landing: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    heroCta: string;
    heroSecondaryCta: string;
    statPrograms: string;
    statLanguages: string;
    statMinutes: string;
    programsLabel: string;
    howTitle: string;
    howSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    featuresTitle: string;
    featuresSubtitle: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    feat4Title: string;
    feat4Desc: string;
    feat5Title: string;
    feat5Desc: string;
    feat6Title: string;
    feat6Desc: string;
    impactTitle: string;
    impactSubtitle: string;
    impact1Value: string;
    impact1Label: string;
    impact2Value: string;
    impact2Label: string;
    impact3Value: string;
    impact3Label: string;
    impact4Value: string;
    impact4Label: string;
    faqTitle: string;
    faqSubtitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    faq4Q: string;
    faq4A: string;
    faq5Q: string;
    faq5A: string;
    faq6Q: string;
    faq6A: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    ctaNote: string;
    footerTagline: string;
    footerProduct: string;
    footerLegal: string;
    footerLanguages: string;
    footerAbout: string;
    footerPrivacy: string;
    footerTerms: string;
    footerScreening: string;
    footerCompanyGrants: string;
    footerHowItWorks: string;
    // Problem section
    problemTitle: string;
    problemSubtitle: string;
    pain1Stat: string;
    pain1Label: string;
    pain1Desc: string;
    pain2Stat: string;
    pain2Label: string;
    pain2Desc: string;
    pain3Stat: string;
    pain3Label: string;
    pain3Desc: string;
    // Trust section
    trustTitle: string;
    trustSubtitle: string;
    trust1Title: string;
    trust1Desc: string;
    trust2Title: string;
    trust2Desc: string;
    trust3Title: string;
    trust3Desc: string;
    // Testimonials section
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonials: {
      quote: string;
      name: string;
      location: string;
      initials: string;
    }[];
    // Final CTA
    ctaHeadline: string;
    ctaDesc: string;
    ctaFree: string;
  };
}

const en: Dictionary = {
  common: {
    appName: "Benefind",
    tagline: "Find Every Benefit You Deserve",
    home: "Home",
    screening: "Screen",
    dashboard: "Dashboard",
    results: "Results",
    signIn: "Sign In",
    signOut: "Sign out",
    back: "Back",
    continue_: "Continue",
    startOver: "Start Over",
    loading: "Loading...",
    learnMore: "Learn more",
    applyNow: "Apply now",
    free: "Free for everyone.",
  },
  hero: {
    title1: "Find Every Benefit",
    title2: "You Deserve",
    subtitle:
      "Answer a few simple questions and discover government programs you qualify for — explained in plain language, in your language.",
    cta: "Check My Eligibility",
    noAccount: "100% free. No account required to check eligibility.",
  },
  screening: {
    title: "Eligibility Screening",
    welcome:
      "Hi! I'm here to help you find government benefits you may qualify for. This takes about 3 minutes.",
    privacy:
      "Your answers are private and won't be shared with anyone. Let's get started.",
    calculating:
      "Great, I have everything I need. Let me check which programs you qualify for...",
    eligible:
      "You may qualify for {count} program{s} worth an estimated ${monthly}/month (${annual}/year). Scroll down to see your results.",
    notEligible:
      "Based on the information provided, you may not qualify for the programs we currently check. This doesn't mean there aren't other programs available — check with your local social services office.",
    perMonth: "/month",
    perYear: "/year",
    viewResults: "View Full Results",
  },
  results: {
    youMayQualify: "You may qualify for",
    programs: "Programs",
    documents: "Documents",
    nextSteps: "Next Steps",
    confidence: "confidence",
    notCurrentlyEligible: "Not currently eligible",
    disclaimer:
      "These results are estimates based on the information you provided. Actual eligibility is determined by each program's administering agency.",
    totalEstimate: "Total estimated benefit",
    gathered: "gathered",
  },
  auth: {
    signInTitle: "Sign in to Benefind",
    noPassword: "No password needed — we'll email you a magic link.",
    emailLabel: "Email address",
    sendLink: "Send magic link",
    checkEmail: "Check your email",
    magicLinkSent: "We sent a magic link to",
    differentEmail: "Use a different email",
  },
  values: {
    languages: "5 Languages",
    guidance: "Step-by-Step Guidance",
    privacy_: "Private & Secure",
    languagesDesc:
      "English, Spanish, Mandarin, Vietnamese, and Arabic. More coming soon.",
    guidanceDesc:
      "We explain every question on every form in plain language. No jargon.",
    privacyDesc:
      "Your data stays on your device and is never sent to our servers. We never sell your information.",
  },
  landing: {
    badge: "Free to Check Your Eligibility",
    heroTitle1: "Claim Your Benefits.",
    heroTitle2: "",
    heroSubtitle:
      "$80 billion in benefits, grants, and credits go unclaimed every year in America. We match people & companies with government programs you qualify for.",
    heroCta: "Check My Eligibility",
    heroSecondaryCta: "See How It Works",
    statPrograms: "Programs",
    statLanguages: "Languages",
    statMinutes: "Average Time",
    programsLabel: "Programs we help you find",
    howTitle: "How It Works",
    howSubtitle: "Three steps to find what you're owed",
    step1Title: "Tell us about yourself",
    step1Desc:
      "Answer simple questions about your household. No personal ID required. Takes about 3 minutes.",
    step2Title: "Get matched instantly",
    step2Desc:
      "Our AI checks your eligibility across 50+ federal and state programs and shows you what you qualify for.",
    step3Title: "Apply with confidence",
    step3Desc:
      "Get step-by-step guidance for every form, explained in plain language, in the language you're most comfortable with.",
    featuresTitle: "Built for the people who need it most",
    featuresSubtitle:
      "Every feature exists because someone was left behind by the system.",
    feat1Title: "5 Languages",
    feat1Desc:
      "English, Spanish, Mandarin, Vietnamese, and Arabic. Every question, every answer, fully translated.",
    feat2Title: "Plain Language",
    feat2Desc:
      "Government forms are confusing. We rewrite every question so anyone can understand it.",
    feat3Title: "Private & Secure",
    feat3Desc:
      "Your data stays on your device and is never sent to our servers. We never sell your information. Period.",
    feat4Title: "AI-Powered Matching",
    feat4Desc:
      "Smart screening that cross-references your situation against dozens of programs simultaneously.",
    feat5Title: "Step-by-Step Guidance",
    feat5Desc:
      "We don't just tell you what you qualify for. We walk you through how to actually get it.",
    feat6Title: "Free to Start",
    feat6Desc:
      "Check your eligibility at no cost. Upgrade for guided application help, document tracking, and deadline reminders.",
    impactTitle: "The problem is bigger than you think",
    impactSubtitle:
      "Every year, billions of dollars in government benefits go to no one.",
    impact1Value: "$80B+",
    impact1Label: "In benefits go unclaimed annually",
    impact2Value: "1 in 4",
    impact2Label: "Eligible Americans miss benefits they qualify for",
    impact3Value: "50+",
    impact3Label: "Federal and state programs checked",
    impact4Value: "~3 min",
    impact4Label: "To check your eligibility",
    faqTitle: "Questions? We've got answers.",
    faqSubtitle: "Everything you need to know about Benefind.",
    faq1Q: "What is Benefind?",
    faq1A:
      "Benefind is a free tool that helps you find government benefits you may qualify for. Answer a few questions about your household, and we'll match you with relevant programs like SNAP, Medicaid, WIC, and more.",
    faq2Q: "Is Benefind free?",
    faq2A:
      "Checking your eligibility is 100% free, no account required. For guided application help, document tracking, and deadline reminders, plans start at $4.99/month or $99 for lifetime access.",
    faq3Q: "What programs does Benefind check?",
    faq3A:
      "We check eligibility for over 50 federal and state programs including SNAP (food stamps), Medicaid, WIC, CHIP, SSI, SSDI, TANF, Section 8, LIHEAP, Pell Grants, EITC, and many more.",
    faq4Q: "Do I need to create an account?",
    faq4A:
      "No. You can check your eligibility without creating an account. If you want to save your results and track your applications, you can optionally create a free account.",
    faq5Q: "Is my information private?",
    faq5A:
      "Absolutely. Your screening answers stay on your device and are never sent to our servers. We never sell your data to third parties. We only use your answers to determine eligibility.",
    faq6Q: "How accurate are the results?",
    faq6A:
      "Our AI-powered screening provides estimated eligibility based on the information you provide. Final eligibility is always determined by the program's administering agency. We aim to help you identify programs worth applying to.",
    ctaTitle: "Ready to find what you're owed?",
    ctaSubtitle:
      "It takes about 3 minutes. No account needed. Completely free.",
    ctaButton: "Check My Eligibility",
    ctaNote: "Join thousands already finding their benefits.",
    footerTagline: "Find Every Benefit You Deserve",
    footerProduct: "Product",
    footerLegal: "Legal",
    footerLanguages: "Languages",
    footerAbout: "About",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerScreening: "Eligibility Screening",
    footerCompanyGrants: "Company Grants",
    footerHowItWorks: "How It Works",
    // Problem section
    problemTitle: "Billions in Benefits Go Unclaimed Every Year",
    problemSubtitle: "The system is confusing. We made it simple.",
    pain1Stat: "$80B+",
    pain1Label: "Unclaimed Every Year",
    pain1Desc:
      "Millions of eligible Americans miss out simply because they don't know what's available.",
    pain2Stat: "45+ min",
    pain2Label: "Per Application",
    pain2Desc:
      "Long forms, confusing questions, and government jargon stop people before they even start.",
    pain3Stat: "1 in 3",
    pain3Label: "Never Apply",
    pain3Desc:
      "Not because they don't need help, but because the process feels impossible.",
    // Trust section
    trustTitle: "Your Data Stays Yours",
    trustSubtitle:
      "Private by design. We built Benefind to protect you, not profit from you.",
    trust1Title: "Stored on Your Device",
    trust1Desc:
      "Your screening answers stay on your device and are never sent to our servers. We can't see them, even if we wanted to.",
    trust2Title: "We Never Sell Your Data",
    trust2Desc:
      "Not to advertisers. Not to data brokers. Not to anyone, ever. That's a promise.",
    trust3Title: "Open Source and Transparent",
    trust3Desc:
      "Our code is public. Anyone can inspect how Benefind works. No black boxes, no hidden tricks.",
    // Testimonials section
    testimonialsTitle: "Real Stories, Real Impact",
    testimonialsSubtitle:
      "People and businesses are finding benefits they never knew they had.",
    testimonials: [
      {
        quote:
          "I had no idea I qualified for SNAP and LIHEAP. That's an extra $400 a month I was leaving on the table.",
        name: "Maria G.",
        location: "Houston, TX",
        initials: "MG",
      },
      {
        quote:
          "I'm a single dad and the forms always overwhelmed me. Benefind walked me through it like a friend would. My kids are on CHIP now.",
        name: "James R.",
        location: "Atlanta, GA",
        initials: "JR",
      },
      {
        quote:
          "We're a 12-person startup and had no idea we qualified for the R&D Tax Credit. Benefind found us $47K in annual savings in under 5 minutes.",
        name: "Priya K.",
        location: "Austin, TX",
        initials: "PK",
      },
      {
        quote:
          "My mom only speaks Vietnamese. She was able to use Benefind in her language and found out she qualifies for Medicaid.",
        name: "Linh T.",
        location: "San Jose, CA",
        initials: "LT",
      },
      {
        quote:
          "We run a small manufacturing shop in a rural county. Benefind matched us with USDA grants and state workforce training we never would have found on our own.",
        name: "Tom & Linda B.",
        location: "Asheville, NC",
        initials: "TB",
      },
      {
        quote:
          "As a woman-owned business, I didn't know about the WOSB contracting program. Benefind showed me how to access federal contracts set aside for businesses like mine.",
        name: "Rachel M.",
        location: "Denver, CO",
        initials: "RM",
      },
    ],
    // Final CTA
    ctaHeadline: "You Could Be Leaving Thousands on the Table",
    ctaDesc:
      "Individuals and companies alike qualify for programs they never claim. Whether it's personal benefits or business grants, there's only one way to find out.",
    ctaFree: "Free. 5 minutes. No signup required. 100% private.",
  },
};

const es: Dictionary = {
  common: {
    appName: "Benefind",
    tagline: "Encuentra Todos los Beneficios que Mereces",
    home: "Inicio",
    screening: "Evaluar",
    dashboard: "Panel",
    results: "Resultados",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    back: "Volver",
    continue_: "Continuar",
    startOver: "Empezar de nuevo",
    loading: "Cargando...",
    learnMore: "Más información",
    applyNow: "Solicitar ahora",
    free: "Gratis para todos.",
  },
  hero: {
    title1: "Encuentra Todos los Beneficios",
    title2: "que Mereces",
    subtitle:
      "Responde unas preguntas sencillas y descubre los programas del gobierno para los que calificas — explicados en lenguaje simple, en tu idioma.",
    cta: "Verificar Mi Elegibilidad",
    noAccount: "100% gratis. No necesitas cuenta para verificar elegibilidad.",
  },
  screening: {
    title: "Evaluación de Elegibilidad",
    welcome:
      "¡Hola! Estoy aquí para ayudarte a encontrar beneficios del gobierno para los que puedas calificar. Toma unos 3 minutos.",
    privacy:
      "Tus respuestas son privadas y no se compartirán con nadie. ¡Comencemos!",
    calculating:
      "Perfecto, tengo todo lo que necesito. Déjame verificar para qué programas calificas...",
    eligible:
      "Puedes calificar para {count} programa{s} con un valor estimado de ${monthly}/mes (${annual}/año). Desplázate hacia abajo para ver tus resultados.",
    notEligible:
      "Según la información proporcionada, es posible que no califiques para los programas que verificamos actualmente. Consulta con tu oficina local de servicios sociales.",
    perMonth: "/mes",
    perYear: "/año",
    viewResults: "Ver Resultados Completos",
  },
  results: {
    youMayQualify: "Puedes calificar para",
    programs: "Programas",
    documents: "Documentos",
    nextSteps: "Próximos Pasos",
    confidence: "confianza",
    notCurrentlyEligible: "No elegible actualmente",
    disclaimer:
      "Estos resultados son estimaciones basadas en la información que proporcionaste. La elegibilidad real es determinada por la agencia administradora de cada programa.",
    totalEstimate: "Beneficio total estimado",
    gathered: "reunidos",
  },
  auth: {
    signInTitle: "Iniciar sesión en Benefind",
    noPassword:
      "No necesitas contraseña — te enviaremos un enlace mágico por correo.",
    emailLabel: "Correo electrónico",
    sendLink: "Enviar enlace mágico",
    checkEmail: "Revisa tu correo",
    magicLinkSent: "Enviamos un enlace mágico a",
    differentEmail: "Usar otro correo",
  },
  values: {
    languages: "5 Idiomas",
    guidance: "Guía Paso a Paso",
    privacy_: "Privado y Seguro",
    languagesDesc:
      "Inglés, español, mandarín, vietnamita y árabe. Más próximamente.",
    guidanceDesc:
      "Explicamos cada pregunta de cada formulario en lenguaje simple. Sin jerga.",
    privacyDesc:
      "Tus datos permanecen en tu dispositivo y nunca se envían a nuestros servidores. Nunca vendemos tu información.",
  },
  landing: {
    badge: "Verificar elegibilidad gratis",
    heroTitle1: "Miles de millones en beneficios no se reclaman.",
    heroTitle2: "Los tuyos podrían ser los próximos.",
    heroSubtitle:
      "Responde unas preguntas simples y te conectaremos con los programas gubernamentales para los que calificas. Guía paso a paso, en tu idioma.",
    heroCta: "Verificar Mi Elegibilidad",
    heroSecondaryCta: "Cómo Funciona",
    statPrograms: "Programas",
    statLanguages: "Idiomas",
    statMinutes: "Tiempo Promedio",
    programsLabel: "Programas que te ayudamos a encontrar",
    howTitle: "Cómo Funciona",
    howSubtitle: "Tres pasos para encontrar lo que te corresponde",
    step1Title: "Cuéntanos sobre ti",
    step1Desc:
      "Responde preguntas sencillas sobre tu hogar. No se requiere identificación personal. Toma unos 3 minutos.",
    step2Title: "Obtén resultados al instante",
    step2Desc:
      "Nuestra IA verifica tu elegibilidad en más de 50 programas federales y estatales y te muestra para cuáles calificas.",
    step3Title: "Aplica con confianza",
    step3Desc:
      "Recibe guía paso a paso para cada formulario, explicado en lenguaje simple, en el idioma que prefieras.",
    featuresTitle: "Diseñado para quienes más lo necesitan",
    featuresSubtitle:
      "Cada función existe porque alguien fue dejado atrás por el sistema.",
    feat1Title: "5 Idiomas",
    feat1Desc:
      "Inglés, español, mandarín, vietnamita y árabe. Cada pregunta, cada respuesta, completamente traducida.",
    feat2Title: "Lenguaje Simple",
    feat2Desc:
      "Los formularios gubernamentales son confusos. Reescribimos cada pregunta para que cualquiera pueda entenderla.",
    feat3Title: "Privado y Seguro",
    feat3Desc:
      "Tus datos permanecen en tu dispositivo y nunca se envían a nuestros servidores. Nunca vendemos tu información. Punto.",
    feat4Title: "Matching con IA",
    feat4Desc:
      "Evaluación inteligente que cruza tu situación con docenas de programas simultáneamente.",
    feat5Title: "Guía Paso a Paso",
    feat5Desc:
      "No solo te decimos para qué calificas. Te guiamos en cómo obtenerlo.",
    feat6Title: "Gratis para empezar",
    feat6Desc:
      "Verifica tu elegibilidad sin costo. Mejora para obtener ayuda guiada, seguimiento de documentos y recordatorios.",
    impactTitle: "El problema es mayor de lo que piensas",
    impactSubtitle:
      "Cada año, miles de millones en beneficios gubernamentales no llegan a nadie.",
    impact1Value: "$80B+",
    impact1Label: "En beneficios no reclamados anualmente",
    impact2Value: "1 de 4",
    impact2Label: "Estadounidenses elegibles pierden beneficios",
    impact3Value: "50+",
    impact3Label: "Programas federales y estatales verificados",
    impact4Value: "~3 min",
    impact4Label: "Para verificar tu elegibilidad",
    faqTitle: "¿Preguntas? Tenemos respuestas.",
    faqSubtitle: "Todo lo que necesitas saber sobre Benefind.",
    faq1Q: "¿Qué es Benefind?",
    faq1A:
      "Benefind es una herramienta gratuita que te ayuda a encontrar beneficios gubernamentales para los que podrías calificar. Responde algunas preguntas y te conectaremos con programas como SNAP, Medicaid, WIC y más.",
    faq2Q: "¿Benefind es gratis?",
    faq2A:
      "Verificar tu elegibilidad es 100% gratis, sin cuenta necesaria. Para ayuda guiada, seguimiento de documentos y recordatorios, los planes comienzan en $4.99/mes o $99 acceso de por vida.",
    faq3Q: "¿Qué programas verifica Benefind?",
    faq3A:
      "Verificamos elegibilidad para más de 50 programas federales y estatales incluyendo SNAP, Medicaid, WIC, CHIP, SSI, SSDI, TANF, Sección 8, LIHEAP, Becas Pell, EITC y muchos más.",
    faq4Q: "¿Necesito crear una cuenta?",
    faq4A:
      "No. Puedes verificar tu elegibilidad sin crear una cuenta. Si quieres guardar tus resultados, puedes crear una cuenta gratuita opcionalmente.",
    faq5Q: "¿Mi información es privada?",
    faq5A:
      "Absolutamente. Tus datos de evaluación permanecen en tu dispositivo y nunca se envían a nuestros servidores. Nunca vendemos tus datos a terceros.",
    faq6Q: "¿Qué tan precisos son los resultados?",
    faq6A:
      "Nuestra evaluación con IA proporciona elegibilidad estimada basada en la información que proporcionas. La elegibilidad final la determina la agencia administradora del programa.",
    ctaTitle: "¿Listo para encontrar lo que te corresponde?",
    ctaSubtitle:
      "Toma unos 3 minutos. Sin cuenta necesaria. Completamente gratis.",
    ctaButton: "Verificar Mi Elegibilidad",
    ctaNote: "Únete a miles que ya encuentran sus beneficios.",
    footerTagline: "Encuentra Todos los Beneficios que Mereces",
    footerProduct: "Producto",
    footerLegal: "Legal",
    footerLanguages: "Idiomas",
    footerAbout: "Acerca de",
    footerPrivacy: "Política de Privacidad",
    footerTerms: "Términos de Servicio",
    footerScreening: "Evaluación de Elegibilidad",
    footerCompanyGrants: "Subvenciones Empresariales",
    footerHowItWorks: "Cómo Funciona",
    // Problem section
    problemTitle: "Miles de Millones en Beneficios No Se Reclaman Cada Año",
    problemSubtitle: "El sistema es confuso. Lo hicimos simple.",
    pain1Stat: "$80B+",
    pain1Label: "No Reclamados Cada Año",
    pain1Desc:
      "Millones de estadounidenses elegibles se lo pierden simplemente porque no saben lo que hay disponible.",
    pain2Stat: "45+ min",
    pain2Label: "Por Solicitud",
    pain2Desc:
      "Formularios largos, preguntas confusas y jerga gubernamental detienen a la gente antes de empezar.",
    pain3Stat: "1 de 3",
    pain3Label: "Nunca Solicitan",
    pain3Desc:
      "No porque no necesiten ayuda, sino porque el proceso se siente imposible.",
    // Trust section
    trustTitle: "Tus Datos Son Tuyos",
    trustSubtitle:
      "Privacidad por diseño. Construimos Benefind para protegerte, no para lucrar contigo.",
    trust1Title: "Almacenado en Tu Dispositivo",
    trust1Desc:
      "Tus respuestas de evaluación permanecen en tu dispositivo y nunca se envían a nuestros servidores. No podemos verlas, aunque quisiéramos.",
    trust2Title: "Nunca Vendemos Tus Datos",
    trust2Desc:
      "Ni a anunciantes. Ni a corredores de datos. Ni a nadie, nunca. Eso es una promesa.",
    trust3Title: "Código Abierto y Transparente",
    trust3Desc:
      "Nuestro código es público. Cualquiera puede inspeccionar cómo funciona Benefind. Sin cajas negras, sin trucos ocultos.",
    // Testimonials section
    testimonialsTitle: "Historias Reales, Impacto Real",
    testimonialsSubtitle:
      "Personas y empresas están encontrando beneficios que nunca supieron que tenían.",
    testimonials: [
      {
        quote:
          "No tenía idea de que calificaba para SNAP y LIHEAP. Son $400 extra al mes que estaba dejando sobre la mesa.",
        name: "Maria G.",
        location: "Houston, TX",
        initials: "MG",
      },
      {
        quote:
          "Soy padre soltero y los formularios siempre me abrumaban. Benefind me guió como lo haría un amigo. Mis hijos ahora tienen CHIP.",
        name: "James R.",
        location: "Atlanta, GA",
        initials: "JR",
      },
      {
        quote:
          "Somos una startup de 12 personas y no sabíamos que calificábamos para el Crédito Fiscal de I+D. Benefind nos encontró $47K en ahorros anuales en menos de 5 minutos.",
        name: "Priya K.",
        location: "Austin, TX",
        initials: "PK",
      },
      {
        quote:
          "Mi mamá solo habla vietnamita. Pudo usar Benefind en su idioma y descubrió que califica para Medicaid.",
        name: "Linh T.",
        location: "San Jose, CA",
        initials: "LT",
      },
      {
        quote:
          "Tenemos un pequeño taller de manufactura en un condado rural. Benefind nos conectó con subvenciones del USDA y capacitación laboral estatal que nunca hubiéramos encontrado solos.",
        name: "Tom y Linda B.",
        location: "Asheville, NC",
        initials: "TB",
      },
      {
        quote:
          "Como negocio de propiedad femenina, no conocía el programa de contratación WOSB. Benefind me mostró cómo acceder a contratos federales reservados para negocios como el mío.",
        name: "Rachel M.",
        location: "Denver, CO",
        initials: "RM",
      },
    ],
    // Final CTA
    ctaHeadline: "Podrías Estar Dejando Miles de Dólares Sobre la Mesa",
    ctaDesc:
      "Tanto individuos como empresas califican para programas que nunca reclaman. Ya sean beneficios personales o subvenciones empresariales, solo hay una forma de averiguarlo.",
    ctaFree: "Gratis. 5 minutos. Sin registro. 100% privado.",
  },
};

const zh: Dictionary = {
  common: {
    appName: "Benefind",
    tagline: "找到您应得的每一项福利",
    home: "首页",
    screening: "筛查",
    dashboard: "控制面板",
    results: "结果",
    signIn: "登录",
    signOut: "退出",
    back: "返回",
    continue_: "继续",
    startOver: "重新开始",
    loading: "加载中...",
    learnMore: "了解更多",
    applyNow: "立即申请",
    free: "对所有人免费。",
  },
  hero: {
    title1: "找到您应得的",
    title2: "每一项福利",
    subtitle:
      "回答几个简单的问题，发现您有资格获得的政府项目——用简单的语言、用您的语言解释。",
    cta: "检查我的资格",
    noAccount: "100%免费。无需账户即可检查资格。",
  },
  screening: {
    title: "资格筛查",
    welcome:
      "您好！我在这里帮助您找到您可能有资格获得的政府福利。大约需要3分钟。",
    privacy: "您的回答是私密的，不会与任何人分享。让我们开始吧！",
    calculating:
      "好的，我已经有了所有需要的信息。让我查查您有资格获得哪些项目...",
    eligible:
      "您可能有资格获得{count}个项目，估计价值${monthly}/月（${annual}/年）。向下滚动查看您的结果。",
    notEligible:
      "根据您提供的信息，您可能不符合我们目前检查的项目资格。请咨询当地社会服务办公室。",
    perMonth: "/月",
    perYear: "/年",
    viewResults: "查看完整结果",
  },
  results: {
    youMayQualify: "您可能有资格获得",
    programs: "项目",
    documents: "文件",
    nextSteps: "下一步",
    confidence: "置信度",
    notCurrentlyEligible: "目前不符合资格",
    disclaimer:
      "这些结果是基于您提供的信息的估计。实际资格由每个项目的管理机构确定。",
    totalEstimate: "总估计福利",
    gathered: "已收集",
  },
  auth: {
    signInTitle: "登录Benefind",
    noPassword: "无需密码——我们会发送一个魔法链接到您的邮箱。",
    emailLabel: "电子邮箱",
    sendLink: "发送魔法链接",
    checkEmail: "请查看您的邮箱",
    magicLinkSent: "我们已发送魔法链接到",
    differentEmail: "使用其他邮箱",
  },
  values: {
    languages: "5种语言",
    guidance: "逐步指导",
    privacy_: "私密安全",
    languagesDesc: "英语、西班牙语、中文、越南语和阿拉伯语。更多即将推出。",
    guidanceDesc: "我们用简单的语言解释每个表格上的每个问题。没有专业术语。",
    privacyDesc: "您的数据端到端加密。我们从不出售您的信息。",
  },
  landing: {
    badge: "免费检查您的资格",
    heroTitle1: "数十亿福利无人认领。",
    heroTitle2: "您的福利可能就在其中。",
    heroSubtitle:
      "回答几个简单的问题，我们会为您匹配符合资格的政府项目。逐步指导，使用您的语言。",
    heroCta: "检查我的资格",
    heroSecondaryCta: "了解运作方式",
    statPrograms: "项目",
    statLanguages: "种语言",
    statMinutes: "平均用时",
    programsLabel: "我们帮您找到的项目",
    howTitle: "如何运作",
    howSubtitle: "三步找到您应得的福利",
    step1Title: "告诉我们您的情况",
    step1Desc: "回答关于您家庭的简单问题。无需个人证件。大约需要3分钟。",
    step2Title: "即时匹配结果",
    step2Desc:
      "我们的AI会在50多个联邦和州项目中检查您的资格，并显示您符合条件的项目。",
    step3Title: "自信地申请",
    step3Desc: "获取每份表格的逐步指导，用简单的语言解释，使用您最熟悉的语言。",
    featuresTitle: "为最需要的人而建",
    featuresSubtitle: "每个功能的存在，都是因为有人被体制遗忘了。",
    feat1Title: "5种语言",
    feat1Desc:
      "英语、西班牙语、中文、越南语和阿拉伯语。每个问题、每个答案，完整翻译。",
    feat2Title: "通俗语言",
    feat2Desc: "政府表格令人困惑。我们重写每个问题，让任何人都能理解。",
    feat3Title: "私密加密",
    feat3Desc: "您的数据端到端加密。我们绝不出售您的信息。",
    feat4Title: "AI智能匹配",
    feat4Desc: "智能筛查同时将您的情况与数十个项目进行交叉比对。",
    feat5Title: "逐步指导",
    feat5Desc: "我们不仅告诉您符合什么条件，还指导您如何实际获得。",
    feat6Title: "免费开始",
    feat6Desc: "免费检查您的资格。升级获取申请指导、文件跟踪和截止日期提醒。",
    impactTitle: "问题比您想象的更大",
    impactSubtitle: "每年，数十亿美元的政府福利无人领取。",
    impact1Value: "$800亿+",
    impact1Label: "每年未被认领的福利",
    impact2Value: "四分之一",
    impact2Label: "符合条件的美国人错过了应得的福利",
    impact3Value: "50+",
    impact3Label: "已检查的联邦和州项目",
    impact4Value: "约3分钟",
    impact4Label: "检查您的资格",
    faqTitle: "有问题？我们有答案。",
    faqSubtitle: "关于Benefind您需要知道的一切。",
    faq1Q: "什么是Benefind？",
    faq1A:
      "Benefind是一个免费工具，帮助您找到可能有资格获得的政府福利。回答几个关于家庭的问题，我们会为您匹配相关项目，如SNAP、Medicaid、WIC等。",
    faq2Q: "Benefind是免费的吗？",
    faq2A:
      "检查资格100%免费，无需账户。申请指导、文件跟踪和截止提醒的方案从每月$4.99或$99终身使用开始。",
    faq3Q: "Benefind检查哪些项目？",
    faq3A:
      "我们检查50多个联邦和州项目的资格，包括SNAP（食品券）、Medicaid、WIC、CHIP、SSI、SSDI、TANF、Section 8、LIHEAP、Pell Grant、EITC等。",
    faq4Q: "我需要创建账户吗？",
    faq4A:
      "不需要。您可以在不创建账户的情况下检查资格。如果您想保存结果和跟踪申请，可以选择创建免费账户。",
    faq5Q: "我的信息是私密的吗？",
    faq5A:
      "绝对是。您的数据端到端加密，绝不出售给第三方。我们只使用您的回答来确定资格。您可以随时删除数据。",
    faq6Q: "结果有多准确？",
    faq6A:
      "我们的AI筛查根据您提供的信息提供估计资格。最终资格始终由项目管理机构确定。我们旨在帮助您发现值得申请的项目。",
    ctaTitle: "准备好找到您应得的福利了吗？",
    ctaSubtitle: "大约需要3分钟。无需账户。完全免费。",
    ctaButton: "检查我的资格",
    ctaNote: "加入已经找到福利的数千人。",
    footerTagline: "找到您应得的每一项福利",
    footerProduct: "产品",
    footerLegal: "法律",
    footerLanguages: "语言",
    footerAbout: "关于",
    footerPrivacy: "隐私政策",
    footerTerms: "服务条款",
    footerScreening: "资格筛查",
    footerCompanyGrants: "企业补助",
    footerHowItWorks: "如何运作",
    problemTitle: "每年数十亿福利无人认领",
    problemSubtitle: "系统太复杂了。我们让它变得简单。",
    pain1Stat: "$800亿+",
    pain1Label: "每年无人认领",
    pain1Desc: "数百万符合条件的美国人错失机会，只因为他们不知道有什么可用。",
    pain2Stat: "45+分钟",
    pain2Label: "每份申请",
    pain2Desc: "冗长的表格、令人困惑的问题和政府术语让人们在开始之前就放弃了。",
    pain3Stat: "三分之一",
    pain3Label: "从不申请",
    pain3Desc: "不是因为他们不需要帮助，而是因为这个过程感觉不可能。",
    trustTitle: "您的数据归您所有",
    trustSubtitle:
      "隐私设计。我们建立Benefind是为了保护您，而不是从您身上获利。",
    trust1Title: "存储在您的设备上",
    trust1Desc:
      "您的筛查答案保留在您的设备上，从不发送到我们的服务器。即使我们想看也看不到。",
    trust2Title: "我们绝不出售您的数据",
    trust2Desc:
      "不卖给广告商。不卖给数据经纪商。不卖给任何人，永远不会。这是承诺。",
    trust3Title: "开源透明",
    trust3Desc:
      "我们的代码是公开的。任何人都可以查看Benefind如何运作。没有黑箱，没有隐藏的把戏。",
    testimonialsTitle: "真实故事，真实影响",
    testimonialsSubtitle: "个人和企业正在发现他们从未知道的福利。",
    testimonials: en.landing.testimonials,
    ctaHeadline: "您可能正在错失数千美元",
    ctaDesc:
      "个人和企业都有资格获得他们从未申请的项目。无论是个人福利还是企业补助，只有一种方式可以知道。",
    ctaFree: "免费。5分钟。无需注册。100%私密。",
  },
};

const vi: Dictionary = {
  common: {
    appName: "Benefind",
    tagline: "Tìm Mọi Quyền Lợi Bạn Xứng Đáng",
    home: "Trang chủ",
    screening: "Kiểm tra",
    dashboard: "Bảng điều khiển",
    results: "Kết quả",
    signIn: "Đăng nhập",
    signOut: "Đăng xuất",
    back: "Quay lại",
    continue_: "Tiếp tục",
    startOver: "Bắt đầu lại",
    loading: "Đang tải...",
    learnMore: "Tìm hiểu thêm",
    applyNow: "Đăng ký ngay",
    free: "Miễn phí cho tất cả mọi người.",
  },
  hero: {
    title1: "Tìm Mọi Quyền Lợi",
    title2: "Bạn Xứng Đáng",
    subtitle:
      "Trả lời vài câu hỏi đơn giản và khám phá các chương trình chính phủ bạn đủ điều kiện — giải thích bằng ngôn ngữ đơn giản, bằng ngôn ngữ của bạn.",
    cta: "Kiểm Tra Điều Kiện",
    noAccount: "Miễn phí 100%. Không cần tài khoản để kiểm tra điều kiện.",
  },
  screening: {
    title: "Kiểm Tra Điều Kiện",
    welcome:
      "Xin chào! Tôi ở đây để giúp bạn tìm các quyền lợi chính phủ mà bạn có thể đủ điều kiện. Chỉ mất khoảng 3 phút.",
    privacy:
      "Câu trả lời của bạn là riêng tư và sẽ không được chia sẻ với bất kỳ ai. Hãy bắt đầu!",
    calculating:
      "Tuyệt vời, tôi đã có tất cả thông tin cần thiết. Để tôi kiểm tra bạn đủ điều kiện cho chương trình nào...",
    eligible:
      "Bạn có thể đủ điều kiện cho {count} chương trình với giá trị ước tính ${monthly}/tháng (${annual}/năm).",
    notEligible:
      "Dựa trên thông tin bạn cung cấp, bạn có thể không đủ điều kiện. Hãy liên hệ văn phòng dịch vụ xã hội địa phương.",
    perMonth: "/tháng",
    perYear: "/năm",
    viewResults: "Xem Kết Quả Đầy Đủ",
  },
  results: {
    youMayQualify: "Bạn có thể đủ điều kiện cho",
    programs: "Chương trình",
    documents: "Tài liệu",
    nextSteps: "Bước Tiếp Theo",
    confidence: "độ tin cậy",
    notCurrentlyEligible: "Hiện không đủ điều kiện",
    disclaimer:
      "Đây là ước tính dựa trên thông tin bạn cung cấp. Điều kiện thực tế do cơ quan quản lý chương trình xác định.",
    totalEstimate: "Tổng quyền lợi ước tính",
    gathered: "đã thu thập",
  },
  auth: {
    signInTitle: "Đăng nhập Benefind",
    noPassword:
      "Không cần mật khẩu — chúng tôi sẽ gửi liên kết đến email của bạn.",
    emailLabel: "Địa chỉ email",
    sendLink: "Gửi liên kết",
    checkEmail: "Kiểm tra email của bạn",
    magicLinkSent: "Chúng tôi đã gửi liên kết đến",
    differentEmail: "Dùng email khác",
  },
  values: {
    languages: "5 Ngôn ngữ",
    guidance: "Hướng Dẫn Từng Bước",
    privacy_: "Riêng Tư & An Toàn",
    languagesDesc: "Tiếng Anh, Tây Ban Nha, Trung Quốc, Việt Nam và Ả Rập.",
    guidanceDesc: "Chúng tôi giải thích mọi câu hỏi bằng ngôn ngữ đơn giản.",
    privacyDesc:
      "Dữ liệu của bạn được mã hóa. Chúng tôi không bao giờ bán thông tin của bạn.",
  },
  landing: {
    badge: "Kiểm tra điều kiện miễn phí",
    heroTitle1: "Hàng tỷ đô la phúc lợi không được nhận.",
    heroTitle2: "Phần của bạn có thể nằm trong đó.",
    heroSubtitle:
      "Trả lời vài câu hỏi đơn giản và chúng tôi sẽ kết nối bạn với các chương trình chính phủ bạn đủ điều kiện. Hướng dẫn từng bước, bằng ngôn ngữ của bạn.",
    heroCta: "Kiểm Tra Điều Kiện",
    heroSecondaryCta: "Xem Cách Hoạt Động",
    statPrograms: "Chương trình",
    statLanguages: "Ngôn ngữ",
    statMinutes: "Thời gian trung bình",
    programsLabel: "Các chương trình chúng tôi giúp bạn tìm",
    howTitle: "Cách Hoạt Động",
    howSubtitle: "Ba bước để tìm những gì bạn xứng đáng",
    step1Title: "Cho chúng tôi biết về bạn",
    step1Desc:
      "Trả lời các câu hỏi đơn giản về hộ gia đình. Không cần giấy tờ tùy thân. Mất khoảng 3 phút.",
    step2Title: "Nhận kết quả ngay lập tức",
    step2Desc:
      "AI của chúng tôi kiểm tra điều kiện của bạn trên hơn 50 chương trình liên bang và tiểu bang.",
    step3Title: "Đăng ký với sự tự tin",
    step3Desc:
      "Nhận hướng dẫn từng bước cho mọi biểu mẫu, giải thích bằng ngôn ngữ đơn giản, bằng ngôn ngữ bạn thoải mái nhất.",
    featuresTitle: "Được xây dựng cho những người cần nhất",
    featuresSubtitle: "Mỗi tính năng tồn tại vì ai đó đã bị hệ thống bỏ lại.",
    feat1Title: "5 Ngôn ngữ",
    feat1Desc:
      "Tiếng Anh, Tây Ban Nha, Trung Quốc, Việt Nam và Ả Rập. Mọi câu hỏi, mọi câu trả lời, được dịch đầy đủ.",
    feat2Title: "Ngôn ngữ đơn giản",
    feat2Desc:
      "Biểu mẫu chính phủ rất khó hiểu. Chúng tôi viết lại mọi câu hỏi để ai cũng hiểu được.",
    feat3Title: "Riêng tư & Mã hóa",
    feat3Desc:
      "Dữ liệu của bạn được mã hóa đầu cuối. Chúng tôi không bao giờ bán thông tin của bạn.",
    feat4Title: "Matching bằng AI",
    feat4Desc:
      "Sàng lọc thông minh so sánh tình trạng của bạn với hàng chục chương trình cùng lúc.",
    feat5Title: "Hướng dẫn từng bước",
    feat5Desc:
      "Chúng tôi không chỉ cho bạn biết bạn đủ điều kiện gì. Chúng tôi hướng dẫn bạn cách nhận được.",
    feat6Title: "Miễn phí để bắt đầu",
    feat6Desc:
      "Kiểm tra điều kiện miễn phí. Nâng cấp để nhận hướng dẫn đăng ký, theo dõi tài liệu và nhắc nhở hạn chót.",
    impactTitle: "Vấn đề lớn hơn bạn nghĩ",
    impactSubtitle:
      "Mỗi năm, hàng tỷ đô la phúc lợi chính phủ không đến tay ai.",
    impact1Value: "$80B+",
    impact1Label: "Phúc lợi không được nhận hàng năm",
    impact2Value: "1/4",
    impact2Label: "Người Mỹ đủ điều kiện bỏ lỡ phúc lợi",
    impact3Value: "50+",
    impact3Label: "Chương trình liên bang và tiểu bang đã kiểm tra",
    impact4Value: "~3 phút",
    impact4Label: "Để kiểm tra điều kiện của bạn",
    faqTitle: "Câu hỏi? Chúng tôi có câu trả lời.",
    faqSubtitle: "Mọi thứ bạn cần biết về Benefind.",
    faq1Q: "Benefind là gì?",
    faq1A:
      "Benefind là công cụ miễn phí giúp bạn tìm phúc lợi chính phủ bạn có thể đủ điều kiện. Trả lời vài câu hỏi và chúng tôi sẽ kết nối bạn với các chương trình như SNAP, Medicaid, WIC và nhiều hơn nữa.",
    faq2Q: "Benefind có miễn phí không?",
    faq2A:
      "Kiểm tra điều kiện 100% miễn phí, không cần tài khoản. Hướng dẫn đăng ký và theo dõi tài liệu từ $4.99/tháng hoặc $99 trọn đời.",
    faq3Q: "Benefind kiểm tra những chương trình nào?",
    faq3A:
      "Chúng tôi kiểm tra điều kiện cho hơn 50 chương trình liên bang và tiểu bang bao gồm SNAP, Medicaid, WIC, CHIP, SSI, SSDI, TANF, Section 8, LIHEAP, Pell Grant, EITC và nhiều hơn nữa.",
    faq4Q: "Tôi có cần tạo tài khoản không?",
    faq4A:
      "Không. Bạn có thể kiểm tra điều kiện mà không cần tạo tài khoản. Nếu muốn lưu kết quả, bạn có thể tạo tài khoản miễn phí.",
    faq5Q: "Thông tin của tôi có riêng tư không?",
    faq5A:
      "Hoàn toàn. Dữ liệu của bạn được mã hóa đầu cuối và không bao giờ bán cho bên thứ ba. Bạn có thể xóa dữ liệu bất cứ lúc nào.",
    faq6Q: "Kết quả chính xác đến mức nào?",
    faq6A:
      "Sàng lọc AI của chúng tôi cung cấp ước tính điều kiện dựa trên thông tin bạn cung cấp. Điều kiện cuối cùng do cơ quan quản lý chương trình xác định.",
    ctaTitle: "Sẵn sàng tìm những gì bạn xứng đáng?",
    ctaSubtitle: "Mất khoảng 3 phút. Không cần tài khoản. Hoàn toàn miễn phí.",
    ctaButton: "Kiểm Tra Điều Kiện",
    ctaNote: "Tham gia cùng hàng nghìn người đã tìm được phúc lợi.",
    footerTagline: "Tìm Mọi Quyền Lợi Bạn Xứng Đáng",
    footerProduct: "Sản phẩm",
    footerLegal: "Pháp lý",
    footerLanguages: "Ngôn ngữ",
    footerAbout: "Giới thiệu",
    footerPrivacy: "Chính sách bảo mật",
    footerTerms: "Điều khoản dịch vụ",
    footerScreening: "Kiểm tra điều kiện",
    footerCompanyGrants: "Trợ cấp doanh nghiệp",
    footerHowItWorks: "Cách hoạt động",
    problemTitle: "Hàng tỷ đô la trợ cấp không được nhận mỗi năm",
    problemSubtitle: "Hệ thống quá phức tạp. Chúng tôi đã đơn giản hóa nó.",
    pain1Stat: "$80T+",
    pain1Label: "Không được nhận mỗi năm",
    pain1Desc:
      "Hàng triệu người Mỹ đủ điều kiện bỏ lỡ cơ hội chỉ vì họ không biết có gì.",
    pain2Stat: "45+ phút",
    pain2Label: "Mỗi đơn xin",
    pain2Desc:
      "Biểu mẫu dài, câu hỏi khó hiểu và thuật ngữ chính phủ khiến mọi người bỏ cuộc trước khi bắt đầu.",
    pain3Stat: "1/3",
    pain3Label: "Không bao giờ nộp đơn",
    pain3Desc:
      "Không phải vì họ không cần giúp đỡ, mà vì quy trình có vẻ không thể.",
    trustTitle: "Dữ liệu của bạn thuộc về bạn",
    trustSubtitle:
      "Bảo mật theo thiết kế. Chúng tôi xây dựng Benefind để bảo vệ bạn, không phải để kiếm lợi từ bạn.",
    trust1Title: "Lưu trữ trên thiết bị của bạn",
    trust1Desc:
      "Câu trả lời sàng lọc của bạn được lưu trên thiết bị và không bao giờ được gửi đến máy chủ của chúng tôi.",
    trust2Title: "Chúng tôi không bao giờ bán dữ liệu của bạn",
    trust2Desc:
      "Không cho nhà quảng cáo. Không cho môi giới dữ liệu. Không cho bất kỳ ai, mãi mãi.",
    trust3Title: "Mã nguồn mở và minh bạch",
    trust3Desc:
      "Mã của chúng tôi là công khai. Bất kỳ ai cũng có thể kiểm tra cách Benefind hoạt động.",
    testimonialsTitle: "Câu chuyện thực, tác động thực",
    testimonialsSubtitle:
      "Cá nhân và doanh nghiệp đang tìm thấy các trợ cấp mà họ không bao giờ biết.",
    testimonials: en.landing.testimonials,
    ctaHeadline: "Bạn có thể đang bỏ lỡ hàng ngàn đô la",
    ctaDesc:
      "Cả cá nhân và doanh nghiệp đều đủ điều kiện cho các chương trình mà họ không bao giờ yêu cầu. Chỉ có một cách để biết.",
    ctaFree: "Miễn phí. 5 phút. Không cần đăng ký. 100% riêng tư.",
  },
};

const ar: Dictionary = {
  common: {
    appName: "Benefind",
    tagline: "اكتشف كل المزايا التي تستحقها",
    home: "الرئيسية",
    screening: "فحص",
    dashboard: "لوحة التحكم",
    results: "النتائج",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    back: "رجوع",
    continue_: "متابعة",
    startOver: "البدء من جديد",
    loading: "جاري التحميل...",
    learnMore: "اعرف المزيد",
    applyNow: "قدّم الآن",
    free: "مجاني للجميع.",
  },
  hero: {
    title1: "اكتشف كل المزايا",
    title2: "التي تستحقها",
    subtitle:
      "أجب عن بضعة أسئلة بسيطة واكتشف البرامج الحكومية التي تؤهل لها — موضحة بلغة بسيطة، بلغتك.",
    cta: "تحقق من أهليتي",
    noAccount: "مجاني 100%. لا حاجة لحساب للتحقق من الأهلية.",
  },
  screening: {
    title: "فحص الأهلية",
    welcome:
      "مرحباً! أنا هنا لمساعدتك في إيجاد المزايا الحكومية التي قد تكون مؤهلاً لها. يستغرق حوالي 3 دقائق.",
    privacy: "إجاباتك خاصة ولن تتم مشاركتها مع أي شخص. لنبدأ!",
    calculating:
      "ممتاز، لدي كل ما أحتاجه. دعني أتحقق من البرامج التي تؤهل لها...",
    eligible:
      "قد تكون مؤهلاً لـ {count} برنامج بقيمة تقديرية ${monthly}/شهرياً (${annual}/سنوياً).",
    notEligible:
      "بناءً على المعلومات المقدمة، قد لا تكون مؤهلاً. تحقق من مكتب الخدمات الاجتماعية المحلي.",
    perMonth: "/شهرياً",
    perYear: "/سنوياً",
    viewResults: "عرض النتائج الكاملة",
  },
  results: {
    youMayQualify: "قد تكون مؤهلاً لـ",
    programs: "البرامج",
    documents: "المستندات",
    nextSteps: "الخطوات التالية",
    confidence: "الثقة",
    notCurrentlyEligible: "غير مؤهل حالياً",
    disclaimer:
      "هذه النتائج تقديرات بناءً على المعلومات التي قدمتها. الأهلية الفعلية تحددها الجهة المسؤولة عن كل برنامج.",
    totalEstimate: "إجمالي المزايا المقدرة",
    gathered: "تم جمعها",
  },
  auth: {
    signInTitle: "تسجيل الدخول إلى Benefind",
    noPassword:
      "لا حاجة لكلمة مرور — سنرسل لك رابطاً سحرياً عبر البريد الإلكتروني.",
    emailLabel: "البريد الإلكتروني",
    sendLink: "إرسال الرابط السحري",
    checkEmail: "تحقق من بريدك الإلكتروني",
    magicLinkSent: "أرسلنا رابطاً سحرياً إلى",
    differentEmail: "استخدام بريد آخر",
  },
  values: {
    languages: "5 لغات",
    guidance: "إرشاد خطوة بخطوة",
    privacy_: "خاص وآمن",
    languagesDesc: "الإنجليزية والإسبانية والصينية والفيتنامية والعربية.",
    guidanceDesc: "نشرح كل سؤال في كل نموذج بلغة بسيطة. بدون مصطلحات.",
    privacyDesc: "بياناتك مشفرة من طرف إلى طرف. لا نبيع معلوماتك أبداً.",
  },
  landing: {
    badge: "تحقق من أهليتك مجاناً",
    heroTitle1: "مليارات الدولارات من المزايا لا يُطالب بها.",
    heroTitle2: "قد تكون مستحقاتك من بينها.",
    heroSubtitle:
      "أجب عن بضعة أسئلة بسيطة وسنطابقك مع البرامج الحكومية التي تستحقها. إرشاد خطوة بخطوة، بلغتك.",
    heroCta: "تحقق من أهليتي",
    heroSecondaryCta: "شاهد كيف يعمل",
    statPrograms: "برنامج",
    statLanguages: "لغات",
    statMinutes: "متوسط الوقت",
    programsLabel: "البرامج التي نساعدك في إيجادها",
    howTitle: "كيف يعمل",
    howSubtitle: "ثلاث خطوات لإيجاد ما تستحقه",
    step1Title: "أخبرنا عن نفسك",
    step1Desc:
      "أجب عن أسئلة بسيطة حول أسرتك. لا حاجة لهوية شخصية. يستغرق حوالي 3 دقائق.",
    step2Title: "احصل على النتائج فوراً",
    step2Desc:
      "يتحقق الذكاء الاصطناعي من أهليتك عبر أكثر من 50 برنامجاً فيدرالياً وحكومياً.",
    step3Title: "قدّم بثقة",
    step3Desc:
      "احصل على إرشاد خطوة بخطوة لكل نموذج، موضح بلغة بسيطة، باللغة التي تفضلها.",
    featuresTitle: "مصمم لمن هم في أمس الحاجة",
    featuresSubtitle: "كل ميزة موجودة لأن شخصاً ما تُرك خلف النظام.",
    feat1Title: "5 لغات",
    feat1Desc:
      "الإنجليزية والإسبانية والصينية والفيتنامية والعربية. كل سؤال وكل إجابة مترجمة بالكامل.",
    feat2Title: "لغة بسيطة",
    feat2Desc: "النماذج الحكومية محيرة. نعيد كتابة كل سؤال ليفهمه أي شخص.",
    feat3Title: "خاص ومشفر",
    feat3Desc: "بياناتك مشفرة من طرف إلى طرف. لا نبيع معلوماتك أبداً.",
    feat4Title: "مطابقة بالذكاء الاصطناعي",
    feat4Desc: "فحص ذكي يقارن وضعك مع عشرات البرامج في وقت واحد.",
    feat5Title: "إرشاد خطوة بخطوة",
    feat5Desc: "لا نخبرك فقط بما تستحقه. نرشدك لكيفية الحصول عليه.",
    feat6Title: "مجاني للبدء",
    feat6Desc:
      "تحقق من أهليتك بدون تكلفة. قم بالترقية للحصول على إرشاد التقديم وتتبع المستندات وتذكير المواعيد.",
    impactTitle: "المشكلة أكبر مما تتصور",
    impactSubtitle:
      "كل عام، مليارات الدولارات من المزايا الحكومية لا تصل لأحد.",
    impact1Value: "+$80B",
    impact1Label: "مزايا غير مطالب بها سنوياً",
    impact2Value: "1 من 4",
    impact2Label: "أمريكيين مؤهلين يفوتون مزاياهم",
    impact3Value: "+50",
    impact3Label: "برنامج فيدرالي وحكومي تم فحصه",
    impact4Value: "~3 دقائق",
    impact4Label: "للتحقق من أهليتك",
    faqTitle: "أسئلة؟ لدينا إجابات.",
    faqSubtitle: "كل ما تحتاج معرفته عن Benefind.",
    faq1Q: "ما هو Benefind؟",
    faq1A:
      "Benefind أداة مجانية تساعدك في إيجاد المزايا الحكومية التي قد تكون مؤهلاً لها. أجب عن بضعة أسئلة وسنطابقك مع برامج مثل SNAP وMedicaid وWIC وغيرها.",
    faq2Q: "هل Benefind مجاني؟",
    faq2A:
      "التحقق من الأهلية مجاني 100%، بدون حساب. إرشاد التقديم وتتبع المستندات يبدأ من $4.99/شهرياً أو $99 مدى الحياة.",
    faq3Q: "ما البرامج التي يفحصها Benefind؟",
    faq3A:
      "نفحص الأهلية لأكثر من 50 برنامجاً فيدرالياً وحكومياً بما في ذلك SNAP وMedicaid وWIC وCHIP وSSI وSSDI وTANF وSection 8 وLIHEAP وPell Grant وEITC وغيرها.",
    faq4Q: "هل أحتاج لإنشاء حساب؟",
    faq4A:
      "لا. يمكنك التحقق من أهليتك بدون إنشاء حساب. إذا أردت حفظ نتائجك، يمكنك إنشاء حساب مجاني اختيارياً.",
    faq5Q: "هل معلوماتي خاصة؟",
    faq5A:
      "بالتأكيد. بياناتك مشفرة من طرف إلى طرف ولا تُباع أبداً لأطراف ثالثة. يمكنك حذف بياناتك في أي وقت.",
    faq6Q: "ما مدى دقة النتائج؟",
    faq6A:
      "يوفر فحص الذكاء الاصطناعي أهلية تقديرية بناءً على المعلومات التي تقدمها. الأهلية النهائية تحددها الجهة المسؤولة عن البرنامج.",
    ctaTitle: "مستعد لإيجاد ما تستحقه؟",
    ctaSubtitle: "يستغرق حوالي 3 دقائق. لا حاجة لحساب. مجاني تماماً.",
    ctaButton: "تحقق من أهليتي",
    ctaNote: "انضم لآلاف الأشخاص الذين وجدوا مزاياهم.",
    footerTagline: "اكتشف كل المزايا التي تستحقها",
    footerProduct: "المنتج",
    footerLegal: "قانوني",
    footerLanguages: "اللغات",
    footerAbout: "حول",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "شروط الخدمة",
    footerScreening: "فحص الأهلية",
    footerCompanyGrants: "منح الشركات",
    footerHowItWorks: "كيف يعمل",
    problemTitle: "مليارات من المزايا لا يتم المطالبة بها كل عام",
    problemSubtitle: "النظام معقد. جعلناه بسيطاً.",
    pain1Stat: "+$80 مليار",
    pain1Label: "غير مطالب بها سنوياً",
    pain1Desc:
      "ملايين الأمريكيين المؤهلين يفوتهم الفرص لمجرد أنهم لا يعرفون ما هو متاح.",
    pain2Stat: "+45 دقيقة",
    pain2Label: "لكل طلب",
    pain2Desc:
      "نماذج طويلة وأسئلة محيرة ومصطلحات حكومية توقف الناس قبل أن يبدأوا.",
    pain3Stat: "1 من 3",
    pain3Label: "لا يتقدمون أبداً",
    pain3Desc: "ليس لأنهم لا يحتاجون المساعدة، بل لأن العملية تبدو مستحيلة.",
    trustTitle: "بياناتك ملكك",
    trustSubtitle: "خصوصية بالتصميم. بنينا Benefind لحمايتك، لا للربح منك.",
    trust1Title: "مخزنة على جهازك",
    trust1Desc:
      "إجاباتك تبقى على جهازك ولا يتم إرسالها أبداً إلى خوادمنا. لا يمكننا رؤيتها حتى لو أردنا.",
    trust2Title: "لا نبيع بياناتك أبداً",
    trust2Desc: "لا للمعلنين. لا لوسطاء البيانات. لا لأي شخص، أبداً. هذا وعد.",
    trust3Title: "مفتوح المصدر وشفاف",
    trust3Desc:
      "شفرتنا عامة. يمكن لأي شخص فحص كيف يعمل Benefind. لا صناديق سوداء، لا حيل مخفية.",
    testimonialsTitle: "قصص حقيقية، تأثير حقيقي",
    testimonialsSubtitle: "الأفراد والشركات يجدون مزايا لم يعرفوا بوجودها.",
    testimonials: en.landing.testimonials,
    ctaHeadline: "قد تكون تترك آلاف الدولارات على الطاولة",
    ctaDesc:
      "الأفراد والشركات على حد سواء مؤهلون لبرامج لا يطالبون بها أبداً. سواء كانت مزايا شخصية أو منح تجارية، هناك طريقة واحدة فقط لمعرفة ذلك.",
    ctaFree: "مجاني. 5 دقائق. بدون تسجيل. خاص 100%.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es, zh, vi, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
