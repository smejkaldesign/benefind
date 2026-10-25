import type { Locale } from "../types";

const en = {
  forIndividuals: "For Individuals",
  forBusinesses: "For Businesses",
  nav: {
    mainLabel: "Main",
    docsTabsLabel: "Docs tabs",
    tools: "Tools",
    about: "About",
    docs: "Docs",
    design: "Design",
  },
  faq: {
    expand: "{question}: expand answer",
    collapse: "{question}: collapse answer",
  },
  chips: {
    row1: [
      "Maria saved $340/mo on groceries",
      "TechStart Inc. received $150K SBIR grant",
      "GreenBuild Co. saved $45K in energy credits",
      "Lin received a $6,500 Pell Grant",
      "Sarah qualified for free healthcare",
    ],
    row2: [
      "James got $2,400 in heating assistance",
      "Acme Logistics got $12K workforce grant",
      "David found $8,200 in annual benefits",
      "Rosa found Section 8 housing assistance",
    ],
  },
  stats: [
    { value: "80+", label: "Government programs scanned" },
    { value: "5 min", label: "Average screening time" },
    { value: "$4,200", label: "Benefits Claimed" },
  ],
  trustBar: [
    { value: "80+ Programs", label: "Federal and state" },
    { value: "50 States", label: "All US coverage" },
    { value: "100% Free", label: "No fees, ever" },
    { value: "Private by Design", label: "No tracking" },
  ],
  bento: {
    title: "How Benefind Works",
    subtitle: "A smarter way to find every benefit you qualify for",
    playDemo: "Play demo video",
    posterAlt: "Benefind demo walkthrough",
    walkthrough: "90-second walkthrough",
    seeInAction: "See it in action",
    seeInActionDesc:
      "From first question to qualified programs in under five minutes.",
    videoPlayer: "Video player",
    closeVideo: "Close video",
    features: [
      {
        title: "AI-Powered Screening",
        description:
          "Answer a few simple questions about your household. Our AI matches you against 80+ federal and state programs in about five minutes.",
      },
      {
        title: "Plain Language",
        description:
          "No government jargon. Every program is explained in words you actually understand, with the next step spelled out.",
      },
      {
        title: "People & Companies",
        description:
          "Individuals find SNAP, Medicaid, WIC, and housing assistance. Companies find R&D Tax Credits, SBIR grants, and WOTC incentives.",
      },
      {
        title: "Privacy by Design",
        description:
          "Your data stays on your device. Nothing is sent to a server. No signup, no email, no tracking. Free, always.",
      },
    ],
  },
  video: {
    title: "See It In Action",
    subtitle: "Watch how Benefind finds benefits in minutes, not hours",
    comingSoon: "Demo coming soon",
    individuals: {
      label: "Individuals",
      description:
        "Answer a few simple questions about your household, income, and needs. Benefind instantly matches you with programs like SNAP, Medicaid, housing assistance, and more.",
    },
    companies: {
      label: "Companies",
      description:
        "Tell us about your business, industry, and goals. We scan 20+ federal and state programs for grants, tax credits, incentives, and contracting preferences.",
    },
    multilingual: {
      label: "Multilingual",
      description:
        "Complete the entire screening in your preferred language. Every program explanation, every result, every next step, all translated.",
    },
  },
  getStartedCta: {
    title: "Get Started",
    subtitle: "Choose the path that fits you",
    individuals: {
      bullets: [
        "Answer simple questions about your household",
        "Get matched with 80+ federal and state programs",
        "See estimated amounts and how to apply",
      ],
      cta: "Start Screening",
    },
    businesses: {
      bullets: [
        "3-minute company profile",
        "Scan grants, tax credits, and incentives",
        "Get match scores and application links",
      ],
      cta: "Company Screening",
    },
    help: {
      headline: "Need Help?",
      bullets: [
        "Not sure which path is right?",
        "Have questions about a specific program?",
        "Want to integrate Benefind for your community?",
      ],
      cta: "Contact Us",
    },
  },
  testimonials: {
    badge: "Success Stories",
    title: "Real money. Real people. Real businesses.",
    subtitle:
      "From single parents to startups to family farms, Benefind finds the benefits, grants, and credits people miss.",
    row1: [
      "I had no idea I qualified for SNAP and LIHEAP. Benefind found $340 a month in benefits I was missing.",
      "The whole process took 5 minutes. I applied for heating assistance the same day.",
      "As a single mom, navigating government programs felt impossible. Benefind made it simple.",
      "We discovered $150K in SBIR funding we didn't know we were eligible for.",
      "The clean energy credits alone saved us $45K. Worth every minute of the screening.",
      "I was skeptical about a free tool, but it found $8,200 in annual benefits. Incredible.",
    ],
    row2: [
      "The Arabic translation made all the difference for my mother. She finally got the WIC support she qualified for.",
      "The R&D Tax Credit walkthrough alone paid for our entire next hire. We had no idea we qualified.",
      "After my husband passed, I felt lost. Benefind found three programs I qualified for in one sitting.",
      "USDA Rural grants. WOTC. Workforce training credits. All in one screening, all in plain English.",
      "I usually distrust anything government-adjacent. The on-device privacy made me trust the screening.",
      "Lo hice todo en español. Encontré CHIP para mis hijos y SNAP para nuestra familia. Gracias.",
    ],
  },
  about: {
    heroTitle: "Making Benefits Accessible to Everyone",
    heroBody:
      "Every year, billions of dollars in benefits go unclaimed because the system is too complicated to navigate, even for people who qualify. Benefind exists to fix that.",
    whyTitle: "Why we built this",
    whyP1:
      "The federal benefits system was designed agency by agency, not person by person. SNAP, Medicaid, Section 8, the EITC, WIC: each program has its own application, its own office, its own language. You have to know they exist before you can access them.",
    whyP2:
      "An estimated 20% of SNAP-eligible households never claim benefits. About $60 billion in tax credits go unclaimed each year. Families cycle through emergency rooms because they never discovered they qualify for Medicaid.",
    whyP3:
      "Benefind is a free screening tool that asks a few simple questions and tells you every program you may qualify for. It works in plain English, Spanish, and three other languages, with no account required and nothing to sell you.",
    scaleTitle: "Built to scale",
    impactStats: [
      { value: "80+", label: "Federal and state programs" },
      { value: "50", label: "States covered" },
      { value: "5", label: "Languages" },
      { value: "$0", label: "Cost to use, forever" },
    ],
    howTitle: "How it works",
    steps: [
      {
        title: "Answer a few questions",
        description:
          "We ask about your household size, income, and situation. No account required. Takes about 5 minutes.",
      },
      {
        title: "AI matches your profile",
        description:
          "Our system checks your answers against eligibility rules for 80+ programs across every state.",
      },
      {
        title: "See your results",
        description:
          "You get a personalized list of programs you likely qualify for, with instructions on how to apply.",
      },
    ],
    startScreening: "Start My Free Screening",
    whoTitle: "Who built this",
    founderRole: "Product Designer",
    founderLocation: "United States",
    founderCompany: "Notable Health (healthcare)",
    founderP1:
      "Eric is a product designer with a background in healthcare software. Working in the healthcare industry showed him how complex the benefits system is. Seeing people miss help because they did not know how to navigate the system was the motivation for building Benefind.",
    founderP2:
      "Benefind is an independent project built with a belief that access to public programs should not require a social worker, an attorney, or a lot of free time.",
    trustTitle: "Free. Private. No Tracking.",
    trustBadges: [
      {
        title: "Free",
        description:
          "Benefind will always be free to use. No subscriptions, no paywalls.",
      },
      {
        title: "Private",
        description:
          "We don't sell your data or track you across the web. Your answers are yours.",
      },
      {
        title: "No Tracking",
        description:
          "No advertising. No data brokers. No hidden costs. Just answers.",
      },
    ],
    ctaTitle: "Ready to see what you qualify for?",
    ctaSubtitle: "It takes 5 minutes. No account required. Completely free.",
    ctaButton: "Start Free Screening",
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have questions about Benefind? We'd love to hear from you.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    selectTopic: "Select a topic",
    topics: {
      general: "General Inquiry",
      individual: "Individual Benefits",
      company: "Company Programs",
      partnership: "Partnership",
      bug: "Bug Report",
    },
    message: "Message",
    messagePlaceholder: "How can we help?",
    send: "Send Message",
    sent: "Message sent! We'll get back to you soon.",
    emailDirect: "Or email us directly at",
    responseTime: "We typically respond within 24 hours",
    privacy:
      "Your information is only used to respond to your inquiry. We never share your data.",
  },
  getStarted: {
    title: "What are you looking for?",
    subtitle: "Choose your path. Both take about 3 minutes.",
    cta: "Get started",
    individual: {
      title: "Individual",
      description: "Personal benefits, tax credits, and assistance programs",
      examples: "SNAP, Medicaid, EITC, WIC, Section 8, Pell Grant",
    },
    company: {
      title: "Company",
      description: "Grants, tax credits, and incentives for your business",
      examples: "R&D Credit, SBIR, WOTC, Workforce Training, Export Grants",
    },
    privacy:
      "Your answers are stored locally on your device and never sent to a server. No account required.",
  },
};

export type MarketingMessages = typeof en;

const es: MarketingMessages = {
  forIndividuals: "Para personas",
  forBusinesses: "Para empresas",
  nav: {
    mainLabel: "Principal",
    docsTabsLabel: "Pestañas de documentación",
    tools: "Herramientas",
    about: "Nosotros",
    docs: "Documentación",
    design: "Diseño",
  },
  faq: {
    expand: "{question}: mostrar respuesta",
    collapse: "{question}: ocultar respuesta",
  },
  chips: {
    row1: [
      "Maria ahorró $340 al mes en comida",
      "TechStart Inc. recibió una subvención SBIR de $150K",
      "GreenBuild Co. ahorró $45K en créditos de energía",
      "Lin recibió una Beca Pell de $6,500",
      "Sarah calificó para atención médica gratis",
    ],
    row2: [
      "James recibió $2,400 en ayuda para calefacción",
      "Acme Logistics recibió $12K para capacitar a su personal",
      "David encontró $8,200 en beneficios al año",
      "Rosa encontró ayuda de vivienda de la Sección 8",
    ],
  },
  stats: [
    { value: "80+", label: "Programas del gobierno revisados" },
    { value: "5 min", label: "Tiempo promedio de evaluación" },
    { value: "$4,200", label: "Beneficios obtenidos" },
  ],
  trustBar: [
    { value: "80+ programas", label: "Federales y estatales" },
    { value: "50 estados", label: "Todo EE. UU." },
    { value: "100% gratis", label: "Sin cargos, nunca" },
    { value: "Privado por diseño", label: "Sin rastreo" },
  ],
  bento: {
    title: "Cómo funciona Benefind",
    subtitle:
      "Una forma más fácil de encontrar todos los beneficios para los que califica",
    playDemo: "Ver video de demostración",
    posterAlt: "Demostración de Benefind",
    walkthrough: "Recorrido de 90 segundos",
    seeInAction: "Véalo en acción",
    seeInActionDesc:
      "De la primera pregunta a sus programas en menos de cinco minutos.",
    videoPlayer: "Reproductor de video",
    closeVideo: "Cerrar video",
    features: [
      {
        title: "Evaluación con IA",
        description:
          "Responda unas preguntas sencillas sobre su hogar. Nuestra IA compara su información con más de 80 programas federales y estatales en unos cinco minutos.",
      },
      {
        title: "Lenguaje sencillo",
        description:
          "Sin palabras complicadas del gobierno. Cada programa se explica con palabras claras y le decimos cuál es el siguiente paso.",
      },
      {
        title: "Personas y empresas",
        description:
          "Las personas encuentran SNAP (cupones de alimentos), Medicaid, WIC y ayuda de vivienda. Las empresas encuentran créditos fiscales de I+D, subvenciones SBIR e incentivos WOTC.",
      },
      {
        title: "Privacidad desde el diseño",
        description:
          "Sus datos se quedan en su dispositivo. No se envía nada a ningún servidor. Sin registro, sin correo, sin rastreo. Gratis, siempre.",
      },
    ],
  },
  video: {
    title: "Véalo en acción",
    subtitle: "Vea cómo Benefind encuentra beneficios en minutos, no en horas",
    comingSoon: "Demostración próximamente",
    individuals: {
      label: "Personas",
      description:
        "Responda unas preguntas sencillas sobre su hogar, sus ingresos y sus necesidades. Benefind le conecta al instante con programas como SNAP, Medicaid, ayuda de vivienda y más.",
    },
    companies: {
      label: "Empresas",
      description:
        "Cuéntenos sobre su negocio, su industria y sus metas. Revisamos más de 20 programas federales y estatales de subvenciones, créditos fiscales, incentivos y preferencias en contratos.",
    },
    multilingual: {
      label: "Multilingüe",
      description:
        "Haga toda la evaluación en el idioma que prefiera. Cada explicación, cada resultado y cada paso siguiente, todo traducido.",
    },
  },
  getStartedCta: {
    title: "Empiece ahora",
    subtitle: "Elija el camino que mejor le convenga",
    individuals: {
      bullets: [
        "Responda preguntas sencillas sobre su hogar",
        "Le conectamos con más de 80 programas federales y estatales",
        "Vea los montos estimados y cómo solicitar",
      ],
      cta: "Comenzar evaluación",
    },
    businesses: {
      bullets: [
        "Perfil de empresa en 3 minutos",
        "Revise subvenciones, créditos fiscales e incentivos",
        "Reciba puntajes de coincidencia y enlaces para solicitar",
      ],
      cta: "Evaluación para empresas",
    },
    help: {
      headline: "¿Necesita ayuda?",
      bullets: [
        "¿No sabe qué camino elegir?",
        "¿Tiene preguntas sobre un programa?",
        "¿Quiere ofrecer Benefind en su comunidad?",
      ],
      cta: "Contáctenos",
    },
  },
  testimonials: {
    badge: "Historias de éxito",
    title: "Dinero real. Personas reales. Negocios reales.",
    subtitle:
      "Desde padres solteros hasta startups y granjas familiares, Benefind encuentra los beneficios, subvenciones y créditos que la gente no reclama.",
    row1: [
      "No sabía que calificaba para SNAP y LIHEAP. Benefind encontró $340 al mes en beneficios que no estaba recibiendo.",
      "Todo tomó 5 minutos. Solicité ayuda para la calefacción ese mismo día.",
      "Como mamá soltera, entender los programas del gobierno parecía imposible. Benefind lo hizo fácil.",
      "Descubrimos $150K en fondos SBIR para los que no sabíamos que calificábamos.",
      "Solo los créditos de energía limpia nos ahorraron $45K. Valió la pena cada minuto.",
      "Dudaba de una herramienta gratis, pero encontró $8,200 en beneficios al año. Increíble.",
    ],
    row2: [
      "La traducción al árabe hizo toda la diferencia para mi madre. Por fin recibió el apoyo de WIC para el que calificaba.",
      "Solo la guía del crédito fiscal de I+D pagó nuestra siguiente contratación. No sabíamos que calificábamos.",
      "Cuando falleció mi esposo, me sentí perdida. Benefind encontró tres programas para mí en una sola sesión.",
      "Subvenciones rurales del USDA. WOTC. Créditos para capacitación laboral. Todo en una evaluación y en lenguaje sencillo.",
      "Normalmente desconfío de todo lo relacionado con el gobierno. La privacidad en mi propio dispositivo me dio confianza.",
      "Lo hice todo en español. Encontré CHIP para mis hijos y SNAP para nuestra familia. Gracias.",
    ],
  },
  about: {
    heroTitle: "Beneficios al alcance de todos",
    heroBody:
      "Cada año, miles de millones de dólares en beneficios quedan sin reclamar porque el sistema es demasiado complicado, incluso para quienes califican. Benefind existe para cambiar eso.",
    whyTitle: "Por qué lo creamos",
    whyP1:
      "El sistema federal de beneficios se creó agencia por agencia, no pensando en cada persona. SNAP, Medicaid, la Sección 8, el EITC, WIC: cada programa tiene su propia solicitud, su propia oficina y su propio lenguaje. Tiene que saber que existen antes de poder usarlos.",
    whyP2:
      "Se estima que el 20% de los hogares que califican para SNAP nunca reclaman sus beneficios. Cerca de $60 mil millones en créditos fiscales quedan sin reclamar cada año. Hay familias que terminan en salas de emergencia porque nunca supieron que calificaban para Medicaid.",
    whyP3:
      "Benefind es una herramienta de evaluación gratuita que hace unas preguntas sencillas y le muestra cada programa para el que podrías calificar. Funciona en español, inglés y otros tres idiomas, con lenguaje sencillo, sin cuenta y sin intentar venderle nada.",
    scaleTitle: "Hecho para crecer",
    impactStats: [
      { value: "80+", label: "Programas federales y estatales" },
      { value: "50", label: "Estados cubiertos" },
      { value: "5", label: "Idiomas" },
      { value: "$0", label: "Costo de uso, para siempre" },
    ],
    howTitle: "Cómo funciona",
    steps: [
      {
        title: "Responda unas preguntas",
        description:
          "Le preguntamos sobre el tamaño de su hogar, sus ingresos y su situación. No necesita cuenta. Toma unos 5 minutos.",
      },
      {
        title: "La IA revisa su perfil",
        description:
          "Nuestro sistema compara sus respuestas con las reglas de más de 80 programas en todos los estados.",
      },
      {
        title: "Vea sus resultados",
        description:
          "Recibe una lista personalizada de programas para los que probablemente califica, con instrucciones para solicitar.",
      },
    ],
    startScreening: "Comenzar mi evaluación gratis",
    whoTitle: "Quién lo creó",
    founderRole: "Diseñador de productos",
    founderLocation: "Estados Unidos",
    founderCompany: "Notable Health (salud)",
    founderP1:
      "Eric es diseñador de productos con experiencia en software de salud. Trabajar en esa industria le mostró lo complicado que es el sistema de beneficios. Ver a personas quedarse sin ayuda porque no sabían cómo navegar el sistema lo motivó a crear Benefind.",
    founderP2:
      "Benefind es un proyecto independiente creado con la idea de que acceder a los programas públicos no debería requerir un trabajador social, un abogado ni mucho tiempo libre.",
    trustTitle: "Gratis. Privado. Sin rastreo.",
    trustBadges: [
      {
        title: "Gratis",
        description:
          "Benefind siempre será gratis. Sin suscripciones, sin pagos ocultos.",
      },
      {
        title: "Privado",
        description:
          "No vendemos sus datos ni le rastreamos en internet. Sus respuestas son suyas.",
      },
      {
        title: "Sin rastreo",
        description:
          "Sin publicidad. Sin vendedores de datos. Sin costos ocultos. Solo respuestas.",
      },
    ],
    ctaTitle: "¿Está listo para ver para qué califica?",
    ctaSubtitle: "Toma 5 minutos. No necesita cuenta. Totalmente gratis.",
    ctaButton: "Comenzar evaluación gratis",
  },
  contact: {
    title: "Contáctenos",
    subtitle: "¿Tiene preguntas sobre Benefind? Nos encantaría saber de usted.",
    name: "Nombre",
    namePlaceholder: "Su nombre",
    email: "Correo electrónico",
    emailPlaceholder: "correo@ejemplo.com",
    subject: "Asunto",
    selectTopic: "Elija un tema",
    topics: {
      general: "Consulta general",
      individual: "Beneficios personales",
      company: "Programas para empresas",
      partnership: "Alianzas",
      bug: "Reportar un error",
    },
    message: "Mensaje",
    messagePlaceholder: "¿Cómo podemos ayudarle?",
    send: "Enviar mensaje",
    sent: "¡Mensaje enviado! Le responderemos pronto.",
    emailDirect: "O escríbanos directamente a",
    responseTime: "Normalmente respondemos en menos de 24 horas",
    privacy:
      "Solo usamos su información para responder a su mensaje. Nunca compartimos sus datos.",
  },
  getStarted: {
    title: "¿Qué está buscando?",
    subtitle: "Elija su camino. Ambos toman unos 3 minutos.",
    cta: "Comenzar",
    individual: {
      title: "Personas",
      description:
        "Beneficios personales, créditos fiscales y programas de ayuda",
      examples: "SNAP, Medicaid, EITC, WIC, Sección 8, Beca Pell",
    },
    company: {
      title: "Empresas",
      description:
        "Subvenciones, créditos fiscales e incentivos para su negocio",
      examples:
        "Crédito de I+D, SBIR, WOTC, capacitación laboral, subvenciones para exportar",
    },
    privacy:
      "Sus respuestas se guardan en su dispositivo y nunca se envían a un servidor. No necesita cuenta.",
  },
};

const zh: MarketingMessages = {
  forIndividuals: "个人",
  forBusinesses: "企业",
  nav: {
    mainLabel: "主导航",
    docsTabsLabel: "文档标签",
    tools: "工具",
    about: "关于我们",
    docs: "文档",
    design: "设计",
  },
  faq: {
    expand: "{question}：展开答案",
    collapse: "{question}：收起答案",
  },
  chips: {
    row1: [
      "Maria 每月节省 340 美元伙食费",
      "TechStart Inc. 获得 15 万美元 SBIR 补助金",
      "GreenBuild Co. 获得 4.5 万美元能源抵免",
      "Lin 获得 6,500 美元 Pell 助学金",
      "Sarah 获得免费医疗保险资格",
    ],
    row2: [
      "James 获得 2,400 美元取暖补助",
      "Acme Logistics 获得 1.2 万美元员工培训补助",
      "David 找到每年 8,200 美元的福利",
      "Rosa 找到 Section 8 住房援助",
    ],
  },
  stats: [
    { value: "80+", label: "已检查的政府项目" },
    { value: "5 分钟", label: "平均筛查时间" },
    { value: "$4,200", label: "已领取的福利" },
  ],
  trustBar: [
    { value: "80+ 个项目", label: "联邦和州" },
    { value: "50 个州", label: "覆盖全美" },
    { value: "100% 免费", label: "永不收费" },
    { value: "隐私优先", label: "不追踪" },
  ],
  bento: {
    title: "Benefind 如何运作",
    subtitle: "更轻松地找到您有资格获得的每一项福利",
    playDemo: "播放演示视频",
    posterAlt: "Benefind 演示",
    walkthrough: "90 秒演示",
    seeInAction: "看看实际效果",
    seeInActionDesc: "从第一个问题到找到合适的项目，不到五分钟。",
    videoPlayer: "视频播放器",
    closeVideo: "关闭视频",
    features: [
      {
        title: "AI 智能筛查",
        description:
          "回答几个关于您家庭的简单问题。我们的 AI 会在大约五分钟内将您与 80 多个联邦和州项目进行匹配。",
      },
      {
        title: "简单易懂",
        description:
          "没有政府术语。每个项目都用您能看懂的话来解释，并清楚说明下一步该做什么。",
      },
      {
        title: "个人和企业",
        description:
          "个人可以找到 SNAP（食品券）、Medicaid、WIC 和住房援助。企业可以找到研发税收抵免、SBIR 补助金和 WOTC 激励。",
      },
      {
        title: "隐私优先",
        description:
          "您的数据保存在您的设备上，不会发送到任何服务器。无需注册，无需邮箱，不追踪。永远免费。",
      },
    ],
  },
  video: {
    title: "看看实际效果",
    subtitle: "看看 Benefind 如何在几分钟内找到福利",
    comingSoon: "演示即将推出",
    individuals: {
      label: "个人",
      description:
        "回答几个关于您的家庭、收入和需求的简单问题。Benefind 会立即为您匹配 SNAP、Medicaid、住房援助等项目。",
    },
    companies: {
      label: "企业",
      description:
        "告诉我们您的业务、行业和目标。我们会检查 20 多个联邦和州项目，寻找补助金、税收抵免、激励措施和政府合同优惠。",
    },
    multilingual: {
      label: "多语言",
      description:
        "用您喜欢的语言完成整个筛查。每个项目说明、每个结果、每个下一步，全部翻译。",
    },
  },
  getStartedCta: {
    title: "立即开始",
    subtitle: "选择适合您的方式",
    individuals: {
      bullets: [
        "回答关于您家庭的简单问题",
        "与 80 多个联邦和州项目进行匹配",
        "查看预估金额和申请方法",
      ],
      cta: "开始筛查",
    },
    businesses: {
      bullets: [
        "3 分钟填写公司资料",
        "查找补助金、税收抵免和激励措施",
        "获得匹配分数和申请链接",
      ],
      cta: "企业筛查",
    },
    help: {
      headline: "需要帮助？",
      bullets: [
        "不确定该选哪条路？",
        "对某个项目有疑问？",
        "想在您的社区推广 Benefind？",
      ],
      cta: "联系我们",
    },
  },
  testimonials: {
    badge: "成功故事",
    title: "真实的钱。真实的人。真实的企业。",
    subtitle:
      "从单亲父母到初创公司，再到家庭农场，Benefind 帮大家找到容易错过的福利、补助金和税收抵免。",
    row1: [
      "我完全不知道自己符合 SNAP 和 LIHEAP 的资格。Benefind 帮我找到了每月 340 美元的福利。",
      "整个过程只用了 5 分钟。我当天就申请了取暖补助。",
      "作为单亲妈妈，政府项目让我觉得无从下手。Benefind 让一切变得简单。",
      "我们发现了 15 万美元的 SBIR 资金，之前根本不知道自己符合资格。",
      "光是清洁能源抵免就为我们节省了 4.5 万美元。筛查的每一分钟都很值得。",
      "我本来不太相信免费工具，但它帮我找到了每年 8,200 美元的福利。太棒了。",
    ],
    row2: [
      "阿拉伯语翻译对我母亲帮助很大。她终于拿到了自己有资格获得的 WIC 支持。",
      "光是研发税收抵免的指导，就够支付我们下一位员工的费用。我们之前完全不知道自己符合资格。",
      "丈夫去世后，我很迷茫。Benefind 一次就帮我找到了三个符合资格的项目。",
      "USDA 农村补助金。WOTC。员工培训抵免。一次筛查全部找到，而且说明简单易懂。",
      "我通常不太信任和政府有关的东西。数据只保存在我的设备上，这让我愿意相信这个筛查。",
      "我全程用西班牙语完成。为孩子们找到了 CHIP，为全家找到了 SNAP。谢谢。",
    ],
  },
  about: {
    heroTitle: "让每个人都能获得福利",
    heroBody:
      "每年有数十亿美元的福利无人领取，因为整个系统太复杂了，就连符合资格的人也很难弄明白。Benefind 就是为了解决这个问题。",
    whyTitle: "我们为什么做这个",
    whyP1:
      "联邦福利系统是按机构一个个设立的，并没有从个人的角度来设计。SNAP、Medicaid、Section 8、EITC、WIC：每个项目都有自己的申请表、自己的办公室和自己的说法。您必须先知道它们存在，才能去申请。",
    whyP2:
      "估计有 20% 符合 SNAP 资格的家庭从未领取福利。每年约有 600 亿美元的税收抵免无人领取。有些家庭反复去急诊室，只因为他们从不知道自己符合 Medicaid 的资格。",
    whyP3:
      "Benefind 是一个免费的筛查工具。它会问您几个简单的问题，然后告诉您可能符合资格的每一个项目。它支持中文、英语和其他三种语言，说明简单易懂，无需注册，也不会向您推销任何东西。",
    scaleTitle: "为更多人而建",
    impactStats: [
      { value: "80+", label: "联邦和州项目" },
      { value: "50", label: "覆盖的州" },
      { value: "5", label: "种语言" },
      { value: "$0", label: "永久免费使用" },
    ],
    howTitle: "如何运作",
    steps: [
      {
        title: "回答几个问题",
        description:
          "我们会询问您的家庭人数、收入和情况。无需注册。大约需要 5 分钟。",
      },
      {
        title: "AI 匹配您的情况",
        description: "我们的系统会根据各州 80 多个项目的资格规则核对您的回答。",
      },
      {
        title: "查看结果",
        description: "您会得到一份可能符合资格的项目清单，并附有申请说明。",
      },
    ],
    startScreening: "开始免费筛查",
    whoTitle: "谁创建了 Benefind",
    founderRole: "产品设计师",
    founderLocation: "美国",
    founderCompany: "Notable Health（医疗行业）",
    founderP1:
      "Eric 是一名产品设计师，有医疗软件背景。在医疗行业的工作让他看到福利系统有多复杂。看到很多人因为不知道如何办理而得不到帮助，他决定创建 Benefind。",
    founderP2:
      "Benefind 是一个独立项目。我们相信，获得公共项目的帮助不应该需要社工、律师或大量空闲时间。",
    trustTitle: "免费。私密。不追踪。",
    trustBadges: [
      {
        title: "免费",
        description: "Benefind 将永远免费使用。没有订阅，没有付费墙。",
      },
      {
        title: "私密",
        description: "我们不出售您的数据，也不在网上追踪您。您的回答只属于您。",
      },
      {
        title: "不追踪",
        description: "没有广告。没有数据中间商。没有隐藏费用。只有答案。",
      },
    ],
    ctaTitle: "想知道您符合哪些资格吗？",
    ctaSubtitle: "只需 5 分钟。无需注册。完全免费。",
    ctaButton: "开始免费筛查",
  },
  contact: {
    title: "联系我们",
    subtitle: "对 Benefind 有疑问吗？我们很乐意听取您的意见。",
    name: "姓名",
    namePlaceholder: "您的姓名",
    email: "电子邮箱",
    emailPlaceholder: "you@example.com",
    subject: "主题",
    selectTopic: "选择一个主题",
    topics: {
      general: "一般咨询",
      individual: "个人福利",
      company: "企业项目",
      partnership: "合作",
      bug: "报告问题",
    },
    message: "留言",
    messagePlaceholder: "我们能帮您什么？",
    send: "发送留言",
    sent: "留言已发送！我们会尽快回复您。",
    emailDirect: "您也可以直接发邮件至",
    responseTime: "我们通常在 24 小时内回复",
    privacy: "您的信息仅用于回复您的咨询。我们绝不分享您的数据。",
  },
  getStarted: {
    title: "您在寻找什么？",
    subtitle: "选择您的方式。两种都只需大约 3 分钟。",
    cta: "开始",
    individual: {
      title: "个人",
      description: "个人福利、税收抵免和援助项目",
      examples: "SNAP、Medicaid、EITC、WIC、Section 8、Pell 助学金",
    },
    company: {
      title: "企业",
      description: "适合您企业的补助金、税收抵免和激励措施",
      examples: "研发抵免、SBIR、WOTC、员工培训、出口补助金",
    },
    privacy: "您的回答只保存在您的设备上，不会发送到服务器。无需注册。",
  },
};

const vi: MarketingMessages = {
  forIndividuals: "Cho cá nhân",
  forBusinesses: "Cho doanh nghiệp",
  nav: {
    mainLabel: "Chính",
    docsTabsLabel: "Thẻ tài liệu",
    tools: "Công cụ",
    about: "Giới thiệu",
    docs: "Tài liệu",
    design: "Thiết kế",
  },
  faq: {
    expand: "{question}: mở câu trả lời",
    collapse: "{question}: đóng câu trả lời",
  },
  chips: {
    row1: [
      "Maria tiết kiệm $340/tháng tiền ăn",
      "TechStart Inc. nhận tài trợ SBIR $150K",
      "GreenBuild Co. tiết kiệm $45K nhờ tín dụng năng lượng",
      "Lin nhận Học bổng Pell $6,500",
      "Sarah đủ điều kiện nhận bảo hiểm y tế miễn phí",
    ],
    row2: [
      "James nhận $2,400 hỗ trợ tiền sưởi",
      "Acme Logistics nhận $12K tài trợ đào tạo nhân viên",
      "David tìm được $8,200 phúc lợi mỗi năm",
      "Rosa tìm được hỗ trợ nhà ở Section 8",
    ],
  },
  stats: [
    { value: "80+", label: "Chương trình chính phủ được kiểm tra" },
    { value: "5 phút", label: "Thời gian kiểm tra trung bình" },
    { value: "$4,200", label: "Phúc lợi đã nhận" },
  ],
  trustBar: [
    { value: "80+ chương trình", label: "Liên bang và tiểu bang" },
    { value: "50 tiểu bang", label: "Toàn nước Mỹ" },
    { value: "Miễn phí 100%", label: "Không bao giờ tính phí" },
    { value: "Bảo mật từ đầu", label: "Không theo dõi" },
  ],
  bento: {
    title: "Benefind hoạt động như thế nào",
    subtitle: "Cách dễ hơn để tìm mọi phúc lợi bạn đủ điều kiện",
    playDemo: "Phát video giới thiệu",
    posterAlt: "Video giới thiệu Benefind",
    walkthrough: "Hướng dẫn 90 giây",
    seeInAction: "Xem cách hoạt động",
    seeInActionDesc:
      "Từ câu hỏi đầu tiên đến danh sách chương trình phù hợp trong chưa đầy năm phút.",
    videoPlayer: "Trình phát video",
    closeVideo: "Đóng video",
    features: [
      {
        title: "Kiểm tra bằng AI",
        description:
          "Trả lời vài câu hỏi đơn giản về gia đình bạn. AI của chúng tôi so sánh với hơn 80 chương trình liên bang và tiểu bang trong khoảng năm phút.",
      },
      {
        title: "Ngôn ngữ đơn giản",
        description:
          "Không có thuật ngữ khó hiểu của chính phủ. Mỗi chương trình được giải thích bằng lời dễ hiểu, kèm theo bước tiếp theo rõ ràng.",
      },
      {
        title: "Cá nhân và doanh nghiệp",
        description:
          "Cá nhân tìm được SNAP (phiếu thực phẩm), Medicaid, WIC và hỗ trợ nhà ở. Doanh nghiệp tìm được Tín dụng Thuế R&D, tài trợ SBIR và ưu đãi WOTC.",
      },
      {
        title: "Bảo mật từ đầu",
        description:
          "Dữ liệu của bạn ở trên thiết bị của bạn. Không gửi gì lên máy chủ. Không cần đăng ký, không cần email, không theo dõi. Luôn miễn phí.",
      },
    ],
  },
  video: {
    title: "Xem cách hoạt động",
    subtitle: "Xem Benefind tìm phúc lợi chỉ trong vài phút",
    comingSoon: "Video giới thiệu sắp ra mắt",
    individuals: {
      label: "Cá nhân",
      description:
        "Trả lời vài câu hỏi đơn giản về gia đình, thu nhập và nhu cầu của bạn. Benefind sẽ ngay lập tức tìm các chương trình như SNAP, Medicaid, hỗ trợ nhà ở và nhiều hơn nữa.",
    },
    companies: {
      label: "Doanh nghiệp",
      description:
        "Cho chúng tôi biết về doanh nghiệp, ngành nghề và mục tiêu của bạn. Chúng tôi kiểm tra hơn 20 chương trình liên bang và tiểu bang về tài trợ, tín dụng thuế, ưu đãi và ưu tiên hợp đồng.",
    },
    multilingual: {
      label: "Đa ngôn ngữ",
      description:
        "Hoàn thành toàn bộ bài kiểm tra bằng ngôn ngữ bạn muốn. Mọi giải thích, mọi kết quả, mọi bước tiếp theo đều được dịch.",
    },
  },
  getStartedCta: {
    title: "Bắt đầu",
    subtitle: "Chọn hướng phù hợp với bạn",
    individuals: {
      bullets: [
        "Trả lời câu hỏi đơn giản về gia đình bạn",
        "So sánh với hơn 80 chương trình liên bang và tiểu bang",
        "Xem số tiền ước tính và cách nộp đơn",
      ],
      cta: "Bắt đầu kiểm tra",
    },
    businesses: {
      bullets: [
        "Hồ sơ công ty trong 3 phút",
        "Tìm tài trợ, tín dụng thuế và ưu đãi",
        "Nhận điểm phù hợp và đường dẫn nộp đơn",
      ],
      cta: "Kiểm tra cho doanh nghiệp",
    },
    help: {
      headline: "Cần giúp đỡ?",
      bullets: [
        "Không chắc nên chọn hướng nào?",
        "Có câu hỏi về một chương trình cụ thể?",
        "Muốn đưa Benefind đến cộng đồng của bạn?",
      ],
      cta: "Liên hệ",
    },
  },
  testimonials: {
    badge: "Câu chuyện thành công",
    title: "Tiền thật. Người thật. Doanh nghiệp thật.",
    subtitle:
      "Từ cha mẹ đơn thân đến công ty khởi nghiệp và trang trại gia đình, Benefind tìm ra những phúc lợi, tài trợ và tín dụng mà mọi người thường bỏ lỡ.",
    row1: [
      "Tôi không biết mình đủ điều kiện nhận SNAP và LIHEAP. Benefind tìm được $340 mỗi tháng tiền phúc lợi tôi đang bỏ lỡ.",
      "Cả quá trình chỉ mất 5 phút. Tôi nộp đơn xin hỗ trợ tiền sưởi ngay trong ngày.",
      "Là mẹ đơn thân, tìm hiểu các chương trình chính phủ tưởng như không thể. Benefind làm mọi thứ trở nên đơn giản.",
      "Chúng tôi phát hiện $150K tiền tài trợ SBIR mà trước đó không biết mình đủ điều kiện.",
      "Chỉ riêng tín dụng năng lượng sạch đã giúp chúng tôi tiết kiệm $45K. Rất đáng thời gian bỏ ra.",
      "Tôi từng nghi ngờ một công cụ miễn phí, nhưng nó tìm được $8,200 phúc lợi mỗi năm. Thật tuyệt vời.",
    ],
    row2: [
      "Bản dịch tiếng Ả Rập đã giúp mẹ tôi rất nhiều. Cuối cùng bà đã nhận được hỗ trợ WIC mà bà đủ điều kiện.",
      "Chỉ riêng phần hướng dẫn Tín dụng Thuế R&D đã đủ trả lương cho nhân viên tiếp theo của chúng tôi. Chúng tôi không hề biết mình đủ điều kiện.",
      "Sau khi chồng tôi qua đời, tôi cảm thấy lạc lõng. Benefind tìm được ba chương trình cho tôi chỉ trong một lần.",
      "Tài trợ nông thôn của USDA. WOTC. Tín dụng đào tạo nhân viên. Tất cả trong một lần kiểm tra, bằng ngôn ngữ dễ hiểu.",
      "Tôi thường không tin những gì liên quan đến chính phủ. Việc dữ liệu chỉ nằm trên thiết bị của tôi khiến tôi tin tưởng.",
      "Tôi làm tất cả bằng tiếng Tây Ban Nha. Tôi tìm được CHIP cho các con và SNAP cho gia đình. Cảm ơn.",
    ],
  },
  about: {
    heroTitle: "Giúp mọi người dễ dàng nhận phúc lợi",
    heroBody:
      "Mỗi năm, hàng tỷ đô la phúc lợi không có người nhận vì hệ thống quá phức tạp, ngay cả với những người đủ điều kiện. Benefind ra đời để thay đổi điều đó.",
    whyTitle: "Vì sao chúng tôi tạo ra Benefind",
    whyP1:
      "Hệ thống phúc lợi liên bang được xây dựng theo từng cơ quan, chưa được thiết kế theo nhu cầu của từng người. SNAP, Medicaid, Section 8, EITC, WIC: mỗi chương trình có đơn riêng, văn phòng riêng và cách nói riêng. Bạn phải biết chúng tồn tại thì mới có thể nộp đơn.",
    whyP2:
      "Ước tính 20% hộ gia đình đủ điều kiện nhận SNAP chưa bao giờ nhận phúc lợi. Khoảng $60 tỷ tín dụng thuế không có người nhận mỗi năm. Có những gia đình phải vào phòng cấp cứu nhiều lần vì không biết mình đủ điều kiện nhận Medicaid.",
    whyP3:
      "Benefind là công cụ kiểm tra miễn phí. Bạn trả lời vài câu hỏi đơn giản và chúng tôi cho bạn biết mọi chương trình bạn có thể đủ điều kiện. Công cụ có bằng tiếng Việt, tiếng Anh và ba ngôn ngữ khác, giải thích dễ hiểu, không cần tài khoản và không bán gì cho bạn.",
    scaleTitle: "Xây dựng để phục vụ nhiều người",
    impactStats: [
      { value: "80+", label: "Chương trình liên bang và tiểu bang" },
      { value: "50", label: "Tiểu bang" },
      { value: "5", label: "Ngôn ngữ" },
      { value: "$0", label: "Chi phí sử dụng, mãi mãi" },
    ],
    howTitle: "Cách hoạt động",
    steps: [
      {
        title: "Trả lời vài câu hỏi",
        description:
          "Chúng tôi hỏi về số người trong gia đình, thu nhập và hoàn cảnh của bạn. Không cần tài khoản. Mất khoảng 5 phút.",
      },
      {
        title: "AI đối chiếu hồ sơ của bạn",
        description:
          "Hệ thống của chúng tôi so sánh câu trả lời của bạn với quy định của hơn 80 chương trình ở mọi tiểu bang.",
      },
      {
        title: "Xem kết quả",
        description:
          "Bạn nhận được danh sách các chương trình bạn có thể đủ điều kiện, kèm hướng dẫn cách nộp đơn.",
      },
    ],
    startScreening: "Bắt đầu kiểm tra miễn phí",
    whoTitle: "Ai tạo ra Benefind",
    founderRole: "Nhà thiết kế sản phẩm",
    founderLocation: "Hoa Kỳ",
    founderCompany: "Notable Health (y tế)",
    founderP1:
      "Eric là nhà thiết kế sản phẩm có kinh nghiệm về phần mềm y tế. Làm việc trong ngành y tế cho anh thấy hệ thống phúc lợi phức tạp đến mức nào. Thấy nhiều người không nhận được giúp đỡ vì không biết cách làm thủ tục, anh quyết định tạo ra Benefind.",
    founderP2:
      "Benefind là một dự án độc lập, được xây dựng với niềm tin rằng việc tiếp cận các chương trình công không nên cần đến nhân viên xã hội, luật sư hay nhiều thời gian rảnh.",
    trustTitle: "Miễn phí. Riêng tư. Không theo dõi.",
    trustBadges: [
      {
        title: "Miễn phí",
        description:
          "Benefind sẽ luôn miễn phí. Không đăng ký trả phí, không có nội dung khóa.",
      },
      {
        title: "Riêng tư",
        description:
          "Chúng tôi không bán dữ liệu của bạn hay theo dõi bạn trên mạng. Câu trả lời là của bạn.",
      },
      {
        title: "Không theo dõi",
        description:
          "Không quảng cáo. Không môi giới dữ liệu. Không chi phí ẩn. Chỉ có câu trả lời.",
      },
    ],
    ctaTitle: "Sẵn sàng xem bạn đủ điều kiện nhận gì?",
    ctaSubtitle: "Chỉ mất 5 phút. Không cần tài khoản. Hoàn toàn miễn phí.",
    ctaButton: "Bắt đầu kiểm tra miễn phí",
  },
  contact: {
    title: "Liên hệ với chúng tôi",
    subtitle: "Bạn có câu hỏi về Benefind? Chúng tôi rất muốn nghe từ bạn.",
    name: "Họ tên",
    namePlaceholder: "Tên của bạn",
    email: "Email",
    emailPlaceholder: "ban@example.com",
    subject: "Chủ đề",
    selectTopic: "Chọn một chủ đề",
    topics: {
      general: "Câu hỏi chung",
      individual: "Phúc lợi cá nhân",
      company: "Chương trình cho doanh nghiệp",
      partnership: "Hợp tác",
      bug: "Báo lỗi",
    },
    message: "Tin nhắn",
    messagePlaceholder: "Chúng tôi có thể giúp gì cho bạn?",
    send: "Gửi tin nhắn",
    sent: "Đã gửi tin nhắn! Chúng tôi sẽ sớm trả lời bạn.",
    emailDirect: "Hoặc gửi email trực tiếp cho chúng tôi tại",
    responseTime: "Chúng tôi thường trả lời trong vòng 24 giờ",
    privacy:
      "Thông tin của bạn chỉ được dùng để trả lời câu hỏi của bạn. Chúng tôi không bao giờ chia sẻ dữ liệu của bạn.",
  },
  getStarted: {
    title: "Bạn đang tìm gì?",
    subtitle: "Chọn hướng của bạn. Cả hai đều mất khoảng 3 phút.",
    cta: "Bắt đầu",
    individual: {
      title: "Cá nhân",
      description: "Phúc lợi cá nhân, tín dụng thuế và chương trình hỗ trợ",
      examples: "SNAP, Medicaid, EITC, WIC, Section 8, Học bổng Pell",
    },
    company: {
      title: "Doanh nghiệp",
      description: "Tài trợ, tín dụng thuế và ưu đãi cho doanh nghiệp của bạn",
      examples:
        "Tín dụng R&D, SBIR, WOTC, đào tạo nhân viên, tài trợ xuất khẩu",
    },
    privacy:
      "Câu trả lời của bạn được lưu trên thiết bị của bạn và không bao giờ gửi lên máy chủ. Không cần tài khoản.",
  },
};

const ar: MarketingMessages = {
  forIndividuals: "للأفراد",
  forBusinesses: "للشركات",
  nav: {
    mainLabel: "الرئيسية",
    docsTabsLabel: "علامات تبويب الوثائق",
    tools: "الأدوات",
    about: "من نحن",
    docs: "الوثائق",
    design: "التصميم",
  },
  faq: {
    expand: "{question}: إظهار الإجابة",
    collapse: "{question}: إخفاء الإجابة",
  },
  chips: {
    row1: [
      "وفّرت Maria مبلغ 340$ شهرياً على البقالة",
      "حصلت TechStart Inc. على منحة SBIR بقيمة 150 ألف دولار",
      "وفّرت GreenBuild Co. مبلغ 45 ألف دولار من ائتمانات الطاقة",
      "حصل Lin على منحة Pell بقيمة 6,500$",
      "أصبحت Sarah مؤهلة لرعاية صحية مجانية",
    ],
    row2: [
      "حصل James على 2,400$ مساعدة للتدفئة",
      "حصلت Acme Logistics على منحة 12 ألف دولار لتدريب العاملين",
      "وجد David مزايا بقيمة 8,200$ سنوياً",
      "وجدت Rosa مساعدة سكن من برنامج Section 8",
    ],
  },
  stats: [
    { value: "80+", label: "برنامج حكومي يتم فحصه" },
    { value: "5 دقائق", label: "متوسط وقت الفحص" },
    { value: "$4,200", label: "مزايا تم الحصول عليها" },
  ],
  trustBar: [
    { value: "أكثر من 80 برنامجاً", label: "فيدرالية وعلى مستوى الولايات" },
    { value: "50 ولاية", label: "تغطية كل الولايات المتحدة" },
    { value: "مجاني 100%", label: "بلا رسوم أبداً" },
    { value: "الخصوصية أولاً", label: "بلا تتبع" },
  ],
  bento: {
    title: "كيف يعمل Benefind",
    subtitle: "طريقة أسهل لإيجاد كل ميزة أنت مؤهل لها",
    playDemo: "تشغيل الفيديو التوضيحي",
    posterAlt: "عرض توضيحي لـ Benefind",
    walkthrough: "جولة في 90 ثانية",
    seeInAction: "شاهده أثناء العمل",
    seeInActionDesc:
      "من السؤال الأول إلى البرامج المناسبة لك في أقل من خمس دقائق.",
    videoPlayer: "مشغل الفيديو",
    closeVideo: "إغلاق الفيديو",
    features: [
      {
        title: "فحص بالذكاء الاصطناعي",
        description:
          "أجب عن بضعة أسئلة بسيطة عن أسرتك. يطابقك الذكاء الاصطناعي مع أكثر من 80 برنامجاً فيدرالياً وعلى مستوى الولايات في حوالي خمس دقائق.",
      },
      {
        title: "لغة بسيطة",
        description:
          "بلا مصطلحات حكومية معقدة. نشرح كل برنامج بكلمات واضحة ونوضح لك الخطوة التالية.",
      },
      {
        title: "أفراد وشركات",
        description:
          "يجد الأفراد برامج SNAP (قسائم الطعام) وMedicaid وWIC ومساعدات السكن. وتجد الشركات ائتمانات ضريبة البحث والتطوير ومنح SBIR وحوافز WOTC.",
      },
      {
        title: "الخصوصية أولاً",
        description:
          "تبقى بياناتك على جهازك. لا يُرسل أي شيء إلى خادم. بلا تسجيل، بلا بريد إلكتروني، بلا تتبع. مجاني دائماً.",
      },
    ],
  },
  video: {
    title: "شاهده أثناء العمل",
    subtitle: "شاهد كيف يجد Benefind المزايا في دقائق قليلة",
    comingSoon: "العرض التوضيحي قريباً",
    individuals: {
      label: "الأفراد",
      description:
        "أجب عن بضعة أسئلة بسيطة عن أسرتك ودخلك واحتياجاتك. يطابقك Benefind فوراً مع برامج مثل SNAP وMedicaid ومساعدات السكن وغيرها.",
    },
    companies: {
      label: "الشركات",
      description:
        "أخبرنا عن نشاطك التجاري ومجالك وأهدافك. نفحص أكثر من 20 برنامجاً فيدرالياً وعلى مستوى الولايات بحثاً عن المنح والائتمانات الضريبية والحوافز وأفضليات التعاقد.",
    },
    multilingual: {
      label: "متعدد اللغات",
      description:
        "أكمل الفحص بالكامل باللغة التي تفضلها. كل شرح وكل نتيجة وكل خطوة تالية، كلها مترجمة.",
    },
  },
  getStartedCta: {
    title: "ابدأ الآن",
    subtitle: "اختر الطريق المناسب لك",
    individuals: {
      bullets: [
        "أجب عن أسئلة بسيطة عن أسرتك",
        "نطابقك مع أكثر من 80 برنامجاً فيدرالياً وعلى مستوى الولايات",
        "اطّلع على المبالغ التقديرية وطريقة التقديم",
      ],
      cta: "ابدأ الفحص",
    },
    businesses: {
      bullets: [
        "ملف الشركة في 3 دقائق",
        "ابحث عن المنح والائتمانات الضريبية والحوافز",
        "احصل على درجات التطابق وروابط التقديم",
      ],
      cta: "فحص الشركات",
    },
    help: {
      headline: "هل تحتاج إلى مساعدة؟",
      bullets: [
        "لست متأكداً أي طريق يناسبك؟",
        "لديك أسئلة عن برنامج معين؟",
        "تريد تقديم Benefind لمجتمعك؟",
      ],
      cta: "تواصل معنا",
    },
  },
  testimonials: {
    badge: "قصص نجاح",
    title: "أموال حقيقية. أشخاص حقيقيون. شركات حقيقية.",
    subtitle:
      "من الآباء والأمهات العازبين إلى الشركات الناشئة والمزارع العائلية، يجد Benefind المزايا والمنح والائتمانات التي يفوّتها الناس.",
    row1: [
      "لم أكن أعرف أنني مؤهلة لبرنامجي SNAP وLIHEAP. وجد لي Benefind مزايا بقيمة 340$ شهرياً كنت أفوّتها.",
      "استغرقت العملية كلها 5 دقائق. قدّمت طلب مساعدة التدفئة في اليوم نفسه.",
      "كأم عزباء، كان فهم البرامج الحكومية يبدو مستحيلاً. جعل Benefind الأمر بسيطاً.",
      "اكتشفنا تمويلاً من SBIR بقيمة 150 ألف دولار لم نكن نعرف أننا مؤهلون له.",
      "ائتمانات الطاقة النظيفة وحدها وفّرت لنا 45 ألف دولار. كل دقيقة في الفحص كانت تستحق.",
      "كنت أشك في أداة مجانية، لكنها وجدت لي مزايا بقيمة 8,200$ سنوياً. أمر رائع.",
    ],
    row2: [
      "الترجمة العربية صنعت فرقاً كبيراً لأمي. حصلت أخيراً على دعم WIC الذي كانت مؤهلة له.",
      "إرشادات ائتمان ضريبة البحث والتطوير وحدها غطّت تكلفة موظفنا التالي. لم نكن نعرف أننا مؤهلون.",
      "بعد وفاة زوجي شعرت بالضياع. وجد لي Benefind ثلاثة برامج مؤهلة لها في جلسة واحدة.",
      "منح USDA الريفية. WOTC. ائتمانات تدريب العاملين. كلها في فحص واحد وبلغة بسيطة.",
      "عادةً لا أثق بأي شيء له علاقة بالحكومة. بقاء بياناتي على جهازي جعلني أثق بالفحص.",
      "أكملت كل شيء بالإسبانية. وجدت CHIP لأطفالي وSNAP لعائلتنا. شكراً.",
    ],
  },
  about: {
    heroTitle: "نجعل المزايا في متناول الجميع",
    heroBody:
      "كل عام تبقى مليارات الدولارات من المزايا دون مطالبة لأن النظام معقد جداً، حتى بالنسبة لمن هم مؤهلون. وُجد Benefind لحل هذه المشكلة.",
    whyTitle: "لماذا أنشأنا Benefind",
    whyP1:
      "بُني نظام المزايا الفيدرالي وكالةً تلو الأخرى، ولم يُصمم حول احتياجات كل شخص. SNAP وMedicaid وSection 8 وEITC وWIC: لكل برنامج طلبه ومكتبه ولغته الخاصة. يجب أن تعرف بوجودها قبل أن تتمكن من الوصول إليها.",
    whyP2:
      "يُقدّر أن 20% من الأسر المؤهلة لبرنامج SNAP لا تطالب بمزاياها أبداً. ونحو 60 مليار دولار من الائتمانات الضريبية تبقى دون مطالبة كل عام. وتتردد بعض الأسر على غرف الطوارئ لأنها لم تعرف أبداً أنها مؤهلة لبرنامج Medicaid.",
    whyP3:
      "Benefind أداة فحص مجانية تطرح عليك بضعة أسئلة بسيطة وتخبرك بكل برنامج قد تكون مؤهلاً له. تعمل بالعربية والإنجليزية وثلاث لغات أخرى، بلغة بسيطة، دون الحاجة إلى حساب، ودون أن نبيعك أي شيء.",
    scaleTitle: "مصمم ليخدم الجميع",
    impactStats: [
      { value: "80+", label: "برنامج فيدرالي وعلى مستوى الولايات" },
      { value: "50", label: "ولاية مشمولة" },
      { value: "5", label: "لغات" },
      { value: "$0", label: "تكلفة الاستخدام، دائماً" },
    ],
    howTitle: "كيف يعمل",
    steps: [
      {
        title: "أجب عن بضعة أسئلة",
        description:
          "نسألك عن حجم أسرتك ودخلك وظروفك. لا حاجة إلى حساب. يستغرق حوالي 5 دقائق.",
      },
      {
        title: "يطابق الذكاء الاصطناعي ملفك",
        description:
          "يقارن نظامنا إجاباتك بقواعد الأهلية لأكثر من 80 برنامجاً في جميع الولايات.",
      },
      {
        title: "اطّلع على نتائجك",
        description:
          "تحصل على قائمة مخصصة بالبرامج التي يُرجح أنك مؤهل لها، مع تعليمات التقديم.",
      },
    ],
    startScreening: "ابدأ فحصي المجاني",
    whoTitle: "من أنشأ Benefind",
    founderRole: "مصمم منتجات",
    founderLocation: "الولايات المتحدة",
    founderCompany: "Notable Health (الرعاية الصحية)",
    founderP1:
      "Eric مصمم منتجات لديه خبرة في برمجيات الرعاية الصحية. أظهر له العمل في هذا المجال مدى تعقيد نظام المزايا. رؤية أشخاص يفوتهم الدعم لأنهم لم يعرفوا كيف يتعاملون مع النظام كانت الدافع لإنشاء Benefind.",
    founderP2:
      "Benefind مشروع مستقل قائم على قناعة بأن الوصول إلى البرامج العامة لا ينبغي أن يتطلب أخصائياً اجتماعياً أو محامياً أو الكثير من الوقت.",
    trustTitle: "مجاني. خاص. بلا تتبع.",
    trustBadges: [
      {
        title: "مجاني",
        description:
          "سيبقى Benefind مجانياً دائماً. بلا اشتراكات، بلا محتوى مدفوع.",
      },
      {
        title: "خاص",
        description: "لا نبيع بياناتك ولا نتتبعك على الإنترنت. إجاباتك ملك لك.",
      },
      {
        title: "بلا تتبع",
        description:
          "بلا إعلانات. بلا وسطاء بيانات. بلا تكاليف خفية. إجابات فقط.",
      },
    ],
    ctaTitle: "هل أنت مستعد لمعرفة ما أنت مؤهل له؟",
    ctaSubtitle: "يستغرق 5 دقائق. لا حاجة إلى حساب. مجاني تماماً.",
    ctaButton: "ابدأ الفحص المجاني",
  },
  contact: {
    title: "تواصل معنا",
    subtitle: "هل لديك أسئلة عن Benefind؟ يسعدنا أن نسمع منك.",
    name: "الاسم",
    namePlaceholder: "اسمك",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    subject: "الموضوع",
    selectTopic: "اختر موضوعاً",
    topics: {
      general: "استفسار عام",
      individual: "مزايا الأفراد",
      company: "برامج الشركات",
      partnership: "شراكة",
      bug: "الإبلاغ عن خطأ",
    },
    message: "الرسالة",
    messagePlaceholder: "كيف يمكننا مساعدتك؟",
    send: "إرسال الرسالة",
    sent: "تم إرسال الرسالة! سنرد عليك قريباً.",
    emailDirect: "أو راسلنا مباشرة على",
    responseTime: "نرد عادةً خلال 24 ساعة",
    privacy: "نستخدم معلوماتك فقط للرد على استفسارك. لا نشارك بياناتك أبداً.",
  },
  getStarted: {
    title: "عمّ تبحث؟",
    subtitle: "اختر طريقك. كلاهما يستغرق حوالي 3 دقائق.",
    cta: "ابدأ",
    individual: {
      title: "فرد",
      description: "مزايا شخصية وائتمانات ضريبية وبرامج مساعدة",
      examples: "SNAP وMedicaid وEITC وWIC وSection 8 ومنحة Pell",
    },
    company: {
      title: "شركة",
      description: "منح وائتمانات ضريبية وحوافز لنشاطك التجاري",
      examples:
        "ائتمان البحث والتطوير، SBIR، WOTC، تدريب العاملين، منح التصدير",
    },
    privacy:
      "تُحفظ إجاباتك على جهازك ولا تُرسل أبداً إلى خادم. لا حاجة إلى حساب.",
  },
};

export const marketing: Record<Locale, MarketingMessages> = {
  en,
  es,
  zh,
  vi,
  ar,
};
