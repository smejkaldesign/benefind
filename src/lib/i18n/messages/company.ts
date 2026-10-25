import type { Locale } from "../types";

/**
 * Engine output sentences, keyed by their exact English text. Strings built
 * from input values are matched by pattern in localize-company-program.ts.
 */
const PHRASES = [
  "Apply for STEP funding for export activities (shows, marketing, localization)",
  "Apply for training reimbursement grants",
  "Apply through the SBA 8(a) portal (certify.sba.gov)",
  "As a startup (< 5 years), you can offset up to $250K in payroll taxes",
  "As a women-owned small business, you can access set-aside federal contracts targeting 5% of contracting dollars.",
  "Available to any business or investor in designated zones",
  "Begin construction before June 30, 2026 deadline",
  "Budget for 1-3 year research timeline",
  "Capital gains invested in QOFs get tax deferral and potential exclusion after 10 years",
  "Check eligibility at rd.usda.gov/eligibility (address lookup)",
  "Check for domestic content bonus (10% additional credit)",
  "Check if your business is in an Opportunity Zone at opportunityzones.hud.gov",
  "Check if your location qualifies as an energy community (10% bonus)",
  "Companies investing in clean energy property qualify for a 30% investment tax credit, with additional bonuses possible.",
  "Companies spending on R&D, product development, or process improvement qualify for this permanent federal credit.",
  "Complete a SBIR Phase I award first",
  "Connect with a mentor through the SBA mentor-protege program",
  "Consult a tax advisor for optimal credit structure",
  "Contact your local Small Business Development Center (SBDC)",
  "Contact your local USDA Rural Development office",
  "Contact your state international trade office",
  "Contact your state workforce development agency",
  "Continue screening to protect future eligibility",
  "Document all qualifying R&D activities (four-part test)",
  "Document training costs for reimbursement",
  "Ensure 25% minimum energy savings threshold is met",
  "Ensure your products/services have 51%+ US content",
  "File Form 6765 with your annual tax return",
  "File Form 8974 to offset payroll taxes (startup benefit)",
  "Get energy modeling certification from qualified professional",
  "Identify employee training needs and programs",
  "Identify qualifying clean energy property investments",
  "Identify qualifying improvements (lighting, HVAC, building envelope)",
  "Identify specific grant programs (Enterprise or Opportunity)",
  "Identify upcoming international trade shows in your industry",
  "Identify which agency aligns with your research focus",
  "If yes, consult a tax advisor about Qualified Opportunity Fund structure",
  "If you own or improve commercial buildings with energy-efficient systems, you may qualify. Note: construction must begin by June 30, 2026.",
  "Monitor SBIR.gov for reauthorization and new solicitations",
  "Monitor for congressional reauthorization (may be retroactive)",
  "Most states offer workforce training grants to all employers",
  "Nearly every state offers workforce training grants. Contact your state workforce agency for specific programs.",
  "Once certified, access sole-source and set-aside federal contracts",
  "Opportunity Zone incentives may apply if your business is located in or you invest in a designated Opportunity Zone. Check the OZ map for your area.",
  "Owned by socially disadvantaged individual(s)",
  "Prepare a Phase I proposal (feasibility study, 6-18 months)",
  "Prepare a Phase II proposal with full R&D plan",
  "Prepare a training plan for new and existing employees",
  "Prepare a training plan with costs and timeline",
  "Prepare application with business plan and economic impact data",
  "Prepare financial documents, tax returns, and ownership documentation",
  "Register on SAM.gov for federal contracting",
  "Register on SBIR.gov and SAM.gov (required)",
  "Rural areas are more likely to contain Opportunity Zones",
  "SBIR Phase II requires fewer than 500 employees and active R&D.",
  "SBIR is for companies conducting research and development.",
  "SBIR requires fewer than 500 employees.",
  "STEP grants are for companies that export or plan to export products/services.",
  "STEP is limited to small businesses (fewer than 500 employees).",
  "Screen all new hires using IRS Form 8850 within 28 days of start",
  "Search for WOSB set-aside contracts on SAM.gov",
  "Search your state workforce agency website for training grants",
  "Self-certify as WOSB through certify.sba.gov",
  "Small business with fewer than 500 employees",
  "Submit to your state workforce agency for certification",
  "The 8(a) program is for small businesses only.",
  "The 8(a) program requires ownership by socially disadvantaged individuals (minority, veteran, or other qualifying groups).",
  "This credit requires R&D or product development spending.",
  "This credit requires clean energy investments or operations.",
  "This deduction applies to commercial building energy efficiency improvements.",
  "This program requires 51%+ woman-owned businesses.",
  "Track employee time spent on R&D projects",
  "USDA Rural Business grants are for businesses in rural areas (outside cities with 50,000+ population).",
  "WOSB contracting is for small businesses only.",
  "WOTC applies to employers who are actively hiring.",
  "Woman-owned business",
  "Workforce training grants are available even for training existing employees, but hiring companies get higher priority.",
  "You are a small business (<500 employees)",
  "You are a small business that exports or plans to export, making you eligible for STEP grants.",
  "You are a small or emerging business",
  "You are actively hiring",
  "You are actively hiring, which makes you eligible for WOTC if you hire from qualifying groups. Note: program expired Dec 2025, monitor for reauthorization.",
  "You conduct R&D activities",
  "You export or plan to export",
  "You have clean energy or sustainability initiatives",
  "You have fewer than 500 employees",
  "You meet the basic criteria for SBIR Phase II, but it requires a completed Phase I award.",
  "You operate in the clean energy industry",
  "You operate in the construction industry",
  "You spend on R&D or product development",
  "Your business is in a rural area",
  "Your business ownership profile qualifies for the 8(a) Business Development Program, providing federal contracting preferences.",
  "Your company profile matches SBIR eligibility criteria. Note: program is currently paused pending reauthorization.",
  "Your industry (agriculture) aligns with USDA priorities",
  "Your industry aligns with SBIR focus areas",
  "Your rural location makes you eligible for USDA business development grants for training, technical assistance, and feasibility studies.",
  "30% of clean energy investment",
  "Federal contracting preferences",
  "Tax deferral + potential exclusion",
] as const;

type PhraseKey = (typeof PHRASES)[number];
type Phrases = Record<PhraseKey, string>;

const enPhrases = Object.fromEntries(PHRASES.map((p) => [p, p])) as Phrases;

const en = {
  yes: "Yes",
  no: "No",
  industries: {
    technology: "Technology",
    healthcare: "Healthcare / Biotech",
    manufacturing: "Manufacturing",
    agriculture: "Agriculture / Food",
    "clean-energy": "Clean Energy",
    retail: "Retail / E-commerce",
    services: "Professional Services",
    construction: "Construction",
    other: "Other",
  },
  steps: {
    companyName: {
      question: "What's your company name?",
      helpText: "We'll use this to personalize your results.",
      tooLong: "Company name must be 100 characters or fewer",
    },
    state: {
      question: "Where is your company headquartered?",
      helpText:
        "Many programs are state-specific. We need this for accurate matching.",
    },
    industry: { question: "What industry are you in?" },
    companyAge: {
      question: "How old is your company?",
      helpText:
        "Some programs target startups, others require operational history.",
      lessThan1: "Less than 1 year",
      y1to5: "1-5 years",
      y5to10: "5-10 years",
      y10plus: "10+ years",
    },
    employeeCount: { question: "How many employees do you have?" },
    annualRevenue: {
      question: "What's your approximate annual revenue?",
      helpText:
        "This helps us estimate program values. Your answer stays private.",
      under250k: "Under $250K",
    },
    hasRnd: {
      question: "Do you spend on R&D or product development?",
      helpText:
        "This includes software development, engineering, product design, process improvement, and scientific research.",
    },
    rndPercentage: {
      question: "Roughly what percentage of revenue goes to R&D?",
      helpText:
        "Your best estimate is fine. This helps us calculate your R&D Tax Credit.",
      under5: "Under 5%",
    },
    ownership: {
      question:
        "Does your business have any of these ownership characteristics?",
      helpText:
        "Some federal programs provide contracting preferences. Select all that apply.",
      minority: "Minority-owned (51%+)",
      woman: "Woman-owned (51%+)",
      veteran: "Veteran-owned",
      none: "None of these / Prefer not to say",
    },
    isRural: {
      question: "Is your business in a rural area?",
      helpText:
        "Rural = outside cities with 50,000+ population. USDA has grants specifically for rural businesses.",
      notSure: "Not sure",
    },
    exports: {
      question:
        "Do you export or plan to export products/services internationally?",
      yesExport: "Yes, we export",
      planning: "Planning to",
    },
    hiring: {
      question: "Are you currently hiring?",
      helpText:
        "Several programs offer tax credits and training grants for employers who are hiring.",
      yesActive: "Yes, actively hiring",
      planning: "Planning to hire soon",
    },
    cleanEnergy: {
      question: "Any clean energy or sustainability initiatives?",
      helpText:
        "Solar panels, EV fleet, energy-efficient buildings, renewable energy projects, etc.",
      considering: "Considering",
    },
  },
  chat: {
    title: "Company Eligibility Check",
    restart: "Restart",
    progressLabel: "Screening progress",
    conversationLabel: "Conversation",
    welcome:
      "Hi! I'll help you find government grants, tax credits, and incentives for your business. This takes about 3 minutes.",
    privacy:
      "Your answers are private and won't be shared. Let's find what you qualify for.",
    calculating:
      "Great, I have your company profile. Let me scan for matching programs...",
    foundOne: "Great news! We found 1 program {company} may qualify for.",
    foundOther:
      "Great news! We found {count} programs {company} may qualify for.",
    signupPrompt:
      "Create a free account to save your results and get personalized next steps.",
    noMatches:
      "Based on the information provided, we didn't find strong matches right now. This may change as new programs are announced.",
    restartMessage: "Let's start fresh. I'll ask you the same questions again.",
    checkEmail: "Check your email for a magic link to access your results.",
    sentTo: "Sent to",
    sending: "Sending...",
    resendIn: "Resend link in {seconds}s",
    resendLink: "Resend link",
    emailPlaceholder: "you@example.com",
    emailLabel: "Email address",
    sendingLink: "Sending link...",
    createAccount: "Create Account",
    skipForNow: "Skip for now",
    valueNote:
      "Some programs pay once and others repeat each year. Percentage-based and per-unit credits are not included in this total.",
    estimatedAcrossOne: "Estimated value across 1 program",
    estimatedAcrossOther: "Estimated value across {count} programs",
    more: "+{count} more",
    preliminary:
      "These are preliminary matches. Verify eligibility with program administrators.",
  },
  panel: {
    tagline: "Grant navigator, built for your business",
    title: "Here's what's about to happen",
    intro:
      "A short conversation about your business. We scan 20+ federal and state programs to find your matches.",
    step: "Step {n}",
    step1Label: "Tell us about your company",
    step1Desc:
      "Industry, size, revenue, and what you do. Takes about 3 minutes.",
    step2Label: "We scan 20+ programs",
    step2Desc:
      "Federal grants, tax credits, state incentives, and contracting preferences matched to your profile.",
    step3Label: "See your matches",
    step3Desc:
      "View every program you qualify for, with estimated values and next steps.",
    privacyNote:
      "Your business information is stored locally on your device and never sent to a server. This is a screening tool, not a formal application.",
    scansPrefix: "Scans",
    scansHighlight: "20+ federal and state programs",
    scansSuffix:
      "including R&D Tax Credit, SBIR, WOTC, Workforce Training, and more.",
  },
  results: {
    programsMatched: "Programs matched",
    programOne: "program",
    programOther: "programs",
    across:
      "Across grants, tax credits, incentives, and contracting preferences",
    matchedAgainst: "Matched against your company profile",
    stickyOne: "1 program matched",
    stickyOther: "{count} programs matched",
    whyYouQualify: "Why you qualify",
    nextSteps: "Next Steps",
    notEligible: "Not currently eligible ({count} programs)",
    updateInfo: "Update Company Info",
    disclaimer:
      "These are preliminary matches based on the information you provided. Actual eligibility is determined by each program's administering agency. Benefind does not guarantee eligibility or award amounts. Consult a tax advisor for tax credit claims.",
    categories: {
      "tax-credit": "Tax Credits",
      grant: "Grants",
      incentive: "Incentives",
      contracting: "Contracting",
    },
    statuses: { active: "Active", paused: "Paused", expired: "Expired" },
  },
  templates: {
    estimatedHires: "Estimated {n} qualifying hires per year",
    industryAlignsSbir:
      "Your industry ({industry}) aligns with SBIR focus areas",
    stateHasProgram: "{state} has the {name}",
    stateOffers:
      "Your state ({state}) offers the {name} with up to {amount} per employee.",
    applyThrough: "Apply through the {name}",
    upTo: "Up to {amount}",
    perYear: "{amount}/year",
    perSqFt: "{amount}/sq ft",
  },
  programs: {
    "rnd-tax-credit": {
      name: "Research & Development Tax Credit (IRC Section 41)",
      shortName: "R&D Tax Credit",
      description:
        "Permanent federal tax credit for companies investing in research, product development, or process improvement. Up to 20% of qualifying R&D expenses.",
      agency: "IRS",
      deadlineInfo: "Filed with annual tax return",
    },
    "state-workforce-training": {
      name: "State Workforce Training Grants",
      shortName: "Workforce Training",
      description:
        "State-funded grants to help companies train current and new employees. Most states offer $3K-$10K per employee with company caps of $50K-$250K.",
      agency: "State Workforce Agency",
      deadlineInfo: "Varies by state. Most accept applications year-round.",
    },
    wotc: {
      name: "Work Opportunity Tax Credit (WOTC)",
      shortName: "WOTC",
      description:
        "Tax credit for hiring individuals from targeted groups (veterans, SNAP recipients, ex-felons, etc.). Up to $2,400-$9,600 per qualifying hire.",
      agency: "IRS / State Workforce Agency",
      deadlineInfo: "Expired Dec 31, 2025. Monitor for reauthorization.",
    },
    "sbir-phase-i": {
      name: "Small Business Innovation Research (SBIR) Phase I",
      shortName: "SBIR Phase I",
      description:
        "Federal grants for small businesses to conduct feasibility research on innovative ideas. $50K-$305K awards from 11 federal agencies.",
      agency: "Multiple (NSF, NIH, DOE, DOD, etc.)",
      deadlineInfo:
        "Currently paused pending congressional reauthorization. Monitor SBIR.gov for updates.",
    },
    "sbir-phase-ii": {
      name: "Small Business Innovation Research (SBIR) Phase II",
      shortName: "SBIR Phase II",
      description:
        "Full R&D funding for companies that completed Phase I. $500K-$2.1M awards over 1-3 years.",
      agency: "Multiple (NSF, NIH, DOE, DOD, etc.)",
      deadlineInfo: "Requires Phase I completion. Currently paused.",
    },
    "clean-energy-itc": {
      name: "Clean Energy Investment Tax Credit (Section 48)",
      shortName: "Clean Energy ITC",
      description:
        "30% federal tax credit for investments in solar, wind, geothermal, battery storage, and other clean energy property. Bonus credits for domestic content and energy community locations.",
      agency: "IRS",
    },
    "step-export": {
      name: "State Trade Expansion Program (STEP)",
      shortName: "STEP Export Grant",
      description:
        "SBA-funded grants through state governments to help small businesses enter or expand into export markets. Covers trade shows, marketing, and localization.",
      agency: "SBA (via state agencies)",
      deadlineInfo: "Varies by state. Typically annual application cycles.",
    },
    "opportunity-zones": {
      name: "Qualified Opportunity Zone Incentives",
      shortName: "Opportunity Zones",
      description:
        "Tax incentives for investing capital gains in designated low-income communities. Includes tax deferral and potential exclusion of gains on OZ investments held 10+ years.",
      agency: "IRS",
      deadlineInfo:
        "No deadline. Program extended indefinitely by the One Big Beautiful Bill Act.",
    },
    "sba-8a": {
      name: "8(a) Business Development Program",
      shortName: "SBA 8(a) Program",
      description:
        "Nine-year federal program providing contracting preferences, mentoring, and business development support for socially and economically disadvantaged small businesses.",
      agency: "SBA",
    },
    "wosb-contracting": {
      name: "Women-Owned Small Business Federal Contracting",
      shortName: "WOSB Contracting",
      description:
        "Federal contracting preferences for women-owned small businesses. The government targets 5% of federal contracting dollars to WOSBs.",
      agency: "SBA",
    },
    "section-179d": {
      name: "Energy-Efficient Commercial Buildings Deduction (Section 179D)",
      shortName: "Section 179D",
      description:
        "Federal tax deduction for energy-efficient improvements to commercial buildings. $0.59-$1.19 per square foot based on energy savings achieved.",
      agency: "IRS",
      deadlineInfo:
        "Construction must begin by June 30, 2026 (termination provision).",
    },
    "usda-rural-business": {
      name: "USDA Rural Business Development Grants",
      shortName: "USDA Rural Grants",
      description:
        "Grants supporting economic development and job creation in rural areas. Covers business training, technical assistance, feasibility studies, and incubators.",
      agency: "USDA Rural Development",
      deadlineInfo: "Typically May-June annually.",
    },
  },
  phrases: enPhrases,
};

export type CompanyMessages = typeof en;

const es: CompanyMessages = {
  yes: "Sí",
  no: "No",
  industries: {
    technology: "Tecnología",
    healthcare: "Salud / Biotecnología",
    manufacturing: "Manufactura",
    agriculture: "Agricultura / Alimentos",
    "clean-energy": "Energía limpia",
    retail: "Comercio minorista / Comercio electrónico",
    services: "Servicios profesionales",
    construction: "Construcción",
    other: "Otra",
  },
  steps: {
    companyName: {
      question: "¿Cómo se llama su empresa?",
      helpText: "Lo usaremos para personalizar sus resultados.",
      tooLong: "El nombre de la empresa debe tener 100 caracteres o menos",
    },
    state: {
      question: "¿Dónde está la sede de su empresa?",
      helpText:
        "Muchos programas dependen del estado. Lo necesitamos para encontrar coincidencias precisas.",
    },
    industry: { question: "¿En qué industria trabaja?" },
    companyAge: {
      question: "¿Cuántos años tiene su empresa?",
      helpText:
        "Algunos programas son para empresas nuevas y otros piden años de operación.",
      lessThan1: "Menos de 1 año",
      y1to5: "1-5 años",
      y5to10: "5-10 años",
      y10plus: "10 años o más",
    },
    employeeCount: { question: "¿Cuántos empleados tiene?" },
    annualRevenue: {
      question: "¿Cuáles son sus ingresos anuales aproximados?",
      helpText:
        "Esto nos ayuda a estimar el valor de los programas. Su respuesta es privada.",
      under250k: "Menos de $250K",
    },
    hasRnd: {
      question:
        "¿Invierte en investigación y desarrollo (I+D) o en desarrollo de productos?",
      helpText:
        "Incluye desarrollo de software, ingeniería, diseño de productos, mejora de procesos e investigación científica.",
    },
    rndPercentage: {
      question: "¿Qué porcentaje aproximado de sus ingresos destina a I+D?",
      helpText:
        "Un cálculo aproximado está bien. Esto nos ayuda a estimar su crédito fiscal por I+D.",
      under5: "Menos de 5%",
    },
    ownership: {
      question:
        "¿Su empresa tiene alguna de estas características de propiedad?",
      helpText:
        "Algunos programas federales dan preferencia en contratos. Seleccione todas las que apliquen.",
      minority: "Propiedad de minorías (51%+)",
      woman: "Propiedad de mujeres (51%+)",
      veteran: "Propiedad de veteranos",
      none: "Ninguna / Prefiero no decir",
    },
    isRural: {
      question: "¿Su empresa está en una zona rural?",
      helpText:
        "Rural significa fuera de ciudades con más de 50,000 habitantes. El USDA tiene subvenciones especiales para empresas rurales.",
      notSure: "No estoy seguro",
    },
    exports: {
      question:
        "¿Exporta o planea exportar productos o servicios a otros países?",
      yesExport: "Sí, exportamos",
      planning: "Lo estamos planeando",
    },
    hiring: {
      question: "¿Está contratando personal ahora?",
      helpText:
        "Varios programas ofrecen créditos fiscales y subvenciones de capacitación para empleadores que contratan.",
      yesActive: "Sí, estamos contratando",
      planning: "Planeamos contratar pronto",
    },
    cleanEnergy: {
      question: "¿Tiene iniciativas de energía limpia o sostenibilidad?",
      helpText:
        "Paneles solares, vehículos eléctricos, edificios eficientes, proyectos de energía renovable, etc.",
      considering: "Lo estamos considerando",
    },
  },
  chat: {
    title: "Verificación de elegibilidad para empresas",
    restart: "Reiniciar",
    progressLabel: "Progreso de la evaluación",
    conversationLabel: "Conversación",
    welcome:
      "¡Hola! Le ayudaré a encontrar subvenciones, créditos fiscales e incentivos del gobierno para su empresa. Toma unos 3 minutos.",
    privacy:
      "Sus respuestas son privadas y no se compartirán. Veamos para qué califica.",
    calculating:
      "Muy bien, ya tengo el perfil de su empresa. Voy a buscar programas que coincidan...",
    foundOne:
      "¡Buenas noticias! Encontramos 1 programa para el que {company} podría calificar.",
    foundOther:
      "¡Buenas noticias! Encontramos {count} programas para los que {company} podría calificar.",
    signupPrompt:
      "Cree una cuenta gratis para guardar sus resultados y recibir próximos pasos personalizados.",
    noMatches:
      "Con la información proporcionada, no encontramos coincidencias fuertes por ahora. Esto puede cambiar cuando se anuncien nuevos programas.",
    restartMessage:
      "Empecemos de nuevo. Le haré las mismas preguntas otra vez.",
    checkEmail:
      "Revise su correo. Le enviamos un enlace mágico para ver sus resultados.",
    sentTo: "Enviado a",
    sending: "Enviando...",
    resendIn: "Reenviar enlace en {seconds}s",
    resendLink: "Reenviar enlace",
    emailPlaceholder: "usted@ejemplo.com",
    emailLabel: "Correo electrónico",
    sendingLink: "Enviando enlace...",
    createAccount: "Crear cuenta",
    skipForNow: "Omitir por ahora",
    valueNote:
      "Algunos programas pagan una sola vez y otros se repiten cada año. Los créditos basados en un porcentaje o por unidad no están incluidos en este total.",
    estimatedAcrossOne: "Valor estimado en 1 programa",
    estimatedAcrossOther: "Valor estimado en {count} programas",
    more: "+{count} más",
    preliminary:
      "Estas coincidencias son preliminares. Confirme la elegibilidad con quienes administran cada programa.",
  },
  panel: {
    tagline: "Guía de subvenciones, hecha para su empresa",
    title: "Esto es lo que va a pasar",
    intro:
      "Una conversación corta sobre su empresa. Revisamos más de 20 programas federales y estatales para encontrar sus coincidencias.",
    step: "Paso {n}",
    step1Label: "Cuéntenos sobre su empresa",
    step1Desc:
      "Industria, tamaño, ingresos y a qué se dedica. Toma unos 3 minutos.",
    step2Label: "Revisamos más de 20 programas",
    step2Desc:
      "Subvenciones federales, créditos fiscales, incentivos estatales y preferencias en contratos según su perfil.",
    step3Label: "Vea sus coincidencias",
    step3Desc:
      "Vea cada programa para el que califica, con valores estimados y próximos pasos.",
    privacyNote:
      "La información de su empresa se guarda solo en su dispositivo y nunca se envía a un servidor. Esta es una herramienta de evaluación, no una solicitud oficial.",
    scansPrefix: "Revisa",
    scansHighlight: "más de 20 programas federales y estatales",
    scansSuffix:
      "como el crédito fiscal por I+D, SBIR, WOTC, capacitación laboral y más.",
  },
  results: {
    programsMatched: "Programas encontrados",
    programOne: "programa",
    programOther: "programas",
    across:
      "Entre subvenciones, créditos fiscales, incentivos y preferencias en contratos",
    matchedAgainst: "Comparados con el perfil de su empresa",
    stickyOne: "1 programa encontrado",
    stickyOther: "{count} programas encontrados",
    whyYouQualify: "Por qué califica",
    nextSteps: "Próximos pasos",
    notEligible: "No elegible por ahora ({count} programas)",
    updateInfo: "Actualizar datos de la empresa",
    disclaimer:
      "Estas coincidencias son preliminares y se basan en la información que usted proporcionó. La elegibilidad real la decide la agencia que administra cada programa. Benefind no garantiza la elegibilidad ni los montos. Consulte a un asesor fiscal antes de reclamar créditos fiscales.",
    categories: {
      "tax-credit": "Créditos fiscales",
      grant: "Subvenciones",
      incentive: "Incentivos",
      contracting: "Contratos",
    },
    statuses: { active: "Activo", paused: "En pausa", expired: "Vencido" },
  },
  templates: {
    estimatedHires: "Aproximadamente {n} contrataciones que califican por año",
    industryAlignsSbir:
      "Su industria ({industry}) coincide con las áreas de enfoque de SBIR",
    stateHasProgram: "{state} tiene el programa {name}",
    stateOffers:
      "Su estado ({state}) ofrece el programa {name} con hasta {amount} por empleado.",
    applyThrough: "Presente su solicitud en el programa {name}",
    upTo: "Hasta {amount}",
    perYear: "{amount}/año",
    perSqFt: "{amount}/pie cuadrado",
  },
  programs: {
    "rnd-tax-credit": {
      name: "Crédito fiscal por investigación y desarrollo (IRC Sección 41)",
      shortName: "Crédito fiscal por I+D",
      description:
        "Crédito fiscal federal permanente para empresas que invierten en investigación, desarrollo de productos o mejora de procesos. Hasta el 20% de los gastos de I+D que califican.",
      agency: "IRS",
      deadlineInfo: "Se presenta con la declaración de impuestos anual",
    },
    "state-workforce-training": {
      name: "Subvenciones estatales para capacitación laboral",
      shortName: "Capacitación laboral",
      description:
        "Subvenciones estatales para ayudar a las empresas a capacitar a empleados actuales y nuevos. La mayoría de los estados ofrecen $3K-$10K por empleado, con límites de $50K-$250K por empresa.",
      agency: "Agencia estatal de empleo",
      deadlineInfo:
        "Varía según el estado. La mayoría acepta solicitudes todo el año.",
    },
    wotc: {
      name: "Crédito fiscal por oportunidad de trabajo (WOTC)",
      shortName: "WOTC",
      description:
        "Crédito fiscal por contratar a personas de grupos específicos (veteranos, personas que reciben SNAP, personas con antecedentes penales, etc.). Hasta $2,400-$9,600 por cada contratación que califique.",
      agency: "IRS / Agencia estatal de empleo",
      deadlineInfo:
        "Venció el 31 de diciembre de 2025. Esté atento a una posible renovación.",
    },
    "sbir-phase-i": {
      name: "Investigación para la Innovación en Pequeñas Empresas (SBIR) Fase I",
      shortName: "SBIR Fase I",
      description:
        "Subvenciones federales para que pequeñas empresas investiguen la viabilidad de ideas innovadoras. Premios de $50K-$305K de 11 agencias federales.",
      agency: "Varias (NSF, NIH, DOE, DOD, etc.)",
      deadlineInfo:
        "En pausa mientras el Congreso lo renueva. Consulte SBIR.gov para ver novedades.",
    },
    "sbir-phase-ii": {
      name: "Investigación para la Innovación en Pequeñas Empresas (SBIR) Fase II",
      shortName: "SBIR Fase II",
      description:
        "Financiamiento completo de I+D para empresas que terminaron la Fase I. Premios de $500K-$2.1M durante 1-3 años.",
      agency: "Varias (NSF, NIH, DOE, DOD, etc.)",
      deadlineInfo: "Requiere haber terminado la Fase I. En pausa por ahora.",
    },
    "clean-energy-itc": {
      name: "Crédito fiscal por inversión en energía limpia (Sección 48)",
      shortName: "ITC de energía limpia",
      description:
        "Crédito fiscal federal del 30% por inversiones en energía solar, eólica, geotérmica, almacenamiento en baterías y otras propiedades de energía limpia. Créditos adicionales por contenido nacional y por ubicarse en comunidades energéticas.",
      agency: "IRS",
    },
    "step-export": {
      name: "Programa Estatal de Expansión Comercial (STEP)",
      shortName: "Subvención STEP para exportar",
      description:
        "Subvenciones financiadas por la SBA a través de los gobiernos estatales para ayudar a pequeñas empresas a empezar a exportar o crecer en mercados de exportación. Cubre ferias comerciales, mercadeo y localización.",
      agency: "SBA (a través de agencias estatales)",
      deadlineInfo:
        "Varía según el estado. Por lo general hay un ciclo de solicitud cada año.",
    },
    "opportunity-zones": {
      name: "Incentivos de Zonas de Oportunidad Calificadas",
      shortName: "Zonas de Oportunidad",
      description:
        "Incentivos fiscales por invertir ganancias de capital en comunidades designadas de bajos ingresos. Incluye aplazamiento de impuestos y posible exclusión de ganancias en inversiones OZ mantenidas 10 años o más.",
      agency: "IRS",
      deadlineInfo:
        "Sin fecha límite. El programa se extendió de forma indefinida por la ley One Big Beautiful Bill Act.",
    },
    "sba-8a": {
      name: "Programa de Desarrollo Empresarial 8(a)",
      shortName: "Programa 8(a) de la SBA",
      description:
        "Programa federal de nueve años que ofrece preferencias en contratos, mentoría y apoyo para el desarrollo de pequeñas empresas en desventaja social y económica.",
      agency: "SBA",
    },
    "wosb-contracting": {
      name: "Contratos federales para pequeñas empresas de mujeres (WOSB)",
      shortName: "Contratos WOSB",
      description:
        "Preferencias en contratos federales para pequeñas empresas propiedad de mujeres. El gobierno busca destinar el 5% del dinero de contratos federales a empresas WOSB.",
      agency: "SBA",
    },
    "section-179d": {
      name: "Deducción por edificios comerciales eficientes en energía (Sección 179D)",
      shortName: "Sección 179D",
      description:
        "Deducción fiscal federal por mejoras de eficiencia energética en edificios comerciales. $0.59-$1.19 por pie cuadrado según el ahorro de energía logrado.",
      agency: "IRS",
      deadlineInfo:
        "La construcción debe comenzar antes del 30 de junio de 2026 (fecha de terminación).",
    },
    "usda-rural-business": {
      name: "Subvenciones del USDA para el desarrollo de empresas rurales",
      shortName: "Subvenciones rurales del USDA",
      description:
        "Subvenciones que apoyan el desarrollo económico y la creación de empleos en zonas rurales. Cubren capacitación empresarial, asistencia técnica, estudios de viabilidad e incubadoras.",
      agency: "Desarrollo Rural del USDA",
      deadlineInfo: "Por lo general entre mayo y junio de cada año.",
    },
  },
  phrases: {
    "Apply for STEP funding for export activities (shows, marketing, localization)":
      "Solicite fondos STEP para actividades de exportación (ferias, mercadeo, localización)",
    "Apply for training reimbursement grants":
      "Solicite subvenciones de reembolso por capacitación",
    "Apply through the SBA 8(a) portal (certify.sba.gov)":
      "Presente su solicitud en el portal 8(a) de la SBA (certify.sba.gov)",
    "As a startup (< 5 years), you can offset up to $250K in payroll taxes":
      "Como empresa nueva (menos de 5 años), puede compensar hasta $250K en impuestos sobre la nómina",
    "As a women-owned small business, you can access set-aside federal contracts targeting 5% of contracting dollars.":
      "Como pequeña empresa propiedad de mujeres, puede acceder a contratos federales reservados, que buscan sumar el 5% del dinero de contratos.",
    "Available to any business or investor in designated zones":
      "Disponible para cualquier empresa o inversionista en zonas designadas",
    "Begin construction before June 30, 2026 deadline":
      "Comience la construcción antes de la fecha límite del 30 de junio de 2026",
    "Budget for 1-3 year research timeline":
      "Prepare un presupuesto para 1-3 años de investigación",
    "Capital gains invested in QOFs get tax deferral and potential exclusion after 10 years":
      "Las ganancias de capital invertidas en QOF aplazan impuestos y podrían quedar excluidas después de 10 años",
    "Check eligibility at rd.usda.gov/eligibility (address lookup)":
      "Verifique la elegibilidad en rd.usda.gov/eligibility (búsqueda por dirección)",
    "Check for domestic content bonus (10% additional credit)":
      "Verifique si aplica el bono por contenido nacional (10% de crédito adicional)",
    "Check if your business is in an Opportunity Zone at opportunityzones.hud.gov":
      "Verifique si su empresa está en una Zona de Oportunidad en opportunityzones.hud.gov",
    "Check if your location qualifies as an energy community (10% bonus)":
      "Verifique si su ubicación califica como comunidad energética (bono del 10%)",
    "Companies investing in clean energy property qualify for a 30% investment tax credit, with additional bonuses possible.":
      "Las empresas que invierten en propiedades de energía limpia califican para un crédito fiscal del 30% por la inversión, con posibles bonos adicionales.",
    "Companies spending on R&D, product development, or process improvement qualify for this permanent federal credit.":
      "Las empresas que invierten en I+D, desarrollo de productos o mejora de procesos califican para este crédito federal permanente.",
    "Complete a SBIR Phase I award first":
      "Primero complete un premio SBIR de Fase I",
    "Connect with a mentor through the SBA mentor-protege program":
      "Busque un mentor en el programa de mentoría de la SBA",
    "Consult a tax advisor for optimal credit structure":
      "Consulte a un asesor fiscal para aprovechar mejor el crédito",
    "Contact your local Small Business Development Center (SBDC)":
      "Comuníquese con su Centro de Desarrollo de Pequeñas Empresas (SBDC) local",
    "Contact your local USDA Rural Development office":
      "Comuníquese con su oficina local de Desarrollo Rural del USDA",
    "Contact your state international trade office":
      "Comuníquese con la oficina de comercio internacional de su estado",
    "Contact your state workforce development agency":
      "Comuníquese con la agencia de desarrollo laboral de su estado",
    "Continue screening to protect future eligibility":
      "Siga evaluando a los nuevos empleados para proteger su elegibilidad futura",
    "Document all qualifying R&D activities (four-part test)":
      "Documente todas las actividades de I+D que califican (prueba de cuatro partes)",
    "Document training costs for reimbursement":
      "Documente los costos de capacitación para el reembolso",
    "Ensure 25% minimum energy savings threshold is met":
      "Asegúrese de lograr un ahorro de energía mínimo del 25%",
    "Ensure your products/services have 51%+ US content":
      "Asegúrese de que sus productos o servicios tengan al menos 51% de contenido de EE. UU.",
    "File Form 6765 with your annual tax return":
      "Presente el Formulario 6765 con su declaración de impuestos anual",
    "File Form 8974 to offset payroll taxes (startup benefit)":
      "Presente el Formulario 8974 para compensar impuestos sobre la nómina (beneficio para empresas nuevas)",
    "Get energy modeling certification from qualified professional":
      "Obtenga una certificación de modelado energético de un profesional calificado",
    "Identify employee training needs and programs":
      "Identifique las necesidades y programas de capacitación de sus empleados",
    "Identify qualifying clean energy property investments":
      "Identifique las inversiones en propiedades de energía limpia que califican",
    "Identify qualifying improvements (lighting, HVAC, building envelope)":
      "Identifique las mejoras que califican (iluminación, climatización, envolvente del edificio)",
    "Identify specific grant programs (Enterprise or Opportunity)":
      "Identifique los programas de subvención específicos (Enterprise u Opportunity)",
    "Identify upcoming international trade shows in your industry":
      "Busque próximas ferias comerciales internacionales en su industria",
    "Identify which agency aligns with your research focus":
      "Identifique qué agencia coincide con el enfoque de su investigación",
    "If yes, consult a tax advisor about Qualified Opportunity Fund structure":
      "Si es así, consulte a un asesor fiscal sobre la estructura de un Fondo de Oportunidad Calificado",
    "If you own or improve commercial buildings with energy-efficient systems, you may qualify. Note: construction must begin by June 30, 2026.":
      "Si es dueño de edificios comerciales o los mejora con sistemas eficientes en energía, podría calificar. Nota: la construcción debe comenzar antes del 30 de junio de 2026.",
    "Monitor SBIR.gov for reauthorization and new solicitations":
      "Consulte SBIR.gov para ver si se renueva y si hay nuevas convocatorias",
    "Monitor for congressional reauthorization (may be retroactive)":
      "Esté atento a una renovación del Congreso (podría ser retroactiva)",
    "Most states offer workforce training grants to all employers":
      "La mayoría de los estados ofrecen subvenciones de capacitación laboral a todos los empleadores",
    "Nearly every state offers workforce training grants. Contact your state workforce agency for specific programs.":
      "Casi todos los estados ofrecen subvenciones de capacitación laboral. Comuníquese con la agencia de empleo de su estado para conocer los programas.",
    "Once certified, access sole-source and set-aside federal contracts":
      "Una vez certificado, acceda a contratos federales directos y reservados",
    "Opportunity Zone incentives may apply if your business is located in or you invest in a designated Opportunity Zone. Check the OZ map for your area.":
      "Los incentivos de Zonas de Oportunidad pueden aplicar si su empresa está en una Zona de Oportunidad designada o si invierte en una. Consulte el mapa de OZ de su área.",
    "Owned by socially disadvantaged individual(s)":
      "Propiedad de una o más personas en desventaja social",
    "Prepare a Phase I proposal (feasibility study, 6-18 months)":
      "Prepare una propuesta de Fase I (estudio de viabilidad, 6-18 meses)",
    "Prepare a Phase II proposal with full R&D plan":
      "Prepare una propuesta de Fase II con un plan completo de I+D",
    "Prepare a training plan for new and existing employees":
      "Prepare un plan de capacitación para empleados nuevos y actuales",
    "Prepare a training plan with costs and timeline":
      "Prepare un plan de capacitación con costos y calendario",
    "Prepare application with business plan and economic impact data":
      "Prepare la solicitud con un plan de negocios y datos de impacto económico",
    "Prepare financial documents, tax returns, and ownership documentation":
      "Prepare documentos financieros, declaraciones de impuestos y documentos de propiedad",
    "Register on SAM.gov for federal contracting":
      "Regístrese en SAM.gov para contratos federales",
    "Register on SBIR.gov and SAM.gov (required)":
      "Regístrese en SBIR.gov y SAM.gov (obligatorio)",
    "Rural areas are more likely to contain Opportunity Zones":
      "Es más probable que las zonas rurales tengan Zonas de Oportunidad",
    "SBIR Phase II requires fewer than 500 employees and active R&D.":
      "SBIR Fase II requiere menos de 500 empleados y actividades de I+D en curso.",
    "SBIR is for companies conducting research and development.":
      "SBIR es para empresas que hacen investigación y desarrollo.",
    "SBIR requires fewer than 500 employees.":
      "SBIR requiere menos de 500 empleados.",
    "STEP grants are for companies that export or plan to export products/services.":
      "Las subvenciones STEP son para empresas que exportan o planean exportar productos o servicios.",
    "STEP is limited to small businesses (fewer than 500 employees).":
      "STEP es solo para pequeñas empresas (menos de 500 empleados).",
    "Screen all new hires using IRS Form 8850 within 28 days of start":
      "Evalúe a cada nuevo empleado con el Formulario 8850 del IRS dentro de los 28 días después de su inicio",
    "Search for WOSB set-aside contracts on SAM.gov":
      "Busque contratos reservados para WOSB en SAM.gov",
    "Search your state workforce agency website for training grants":
      "Busque subvenciones de capacitación en el sitio web de la agencia de empleo de su estado",
    "Self-certify as WOSB through certify.sba.gov":
      "Certifíquese como WOSB en certify.sba.gov",
    "Small business with fewer than 500 employees":
      "Pequeña empresa con menos de 500 empleados",
    "Submit to your state workforce agency for certification":
      "Envíelo a la agencia de empleo de su estado para la certificación",
    "The 8(a) program is for small businesses only.":
      "El programa 8(a) es solo para pequeñas empresas.",
    "The 8(a) program requires ownership by socially disadvantaged individuals (minority, veteran, or other qualifying groups).":
      "El programa 8(a) requiere que la empresa sea propiedad de personas en desventaja social (minorías, veteranos u otros grupos que califican).",
    "This credit requires R&D or product development spending.":
      "Este crédito requiere gastos en I+D o desarrollo de productos.",
    "This credit requires clean energy investments or operations.":
      "Este crédito requiere inversiones u operaciones de energía limpia.",
    "This deduction applies to commercial building energy efficiency improvements.":
      "Esta deducción aplica a mejoras de eficiencia energética en edificios comerciales.",
    "This program requires 51%+ woman-owned businesses.":
      "Este programa requiere que al menos el 51% de la empresa sea propiedad de mujeres.",
    "Track employee time spent on R&D projects":
      "Registre el tiempo que los empleados dedican a proyectos de I+D",
    "USDA Rural Business grants are for businesses in rural areas (outside cities with 50,000+ population).":
      "Las subvenciones del USDA para empresas rurales son para negocios en zonas rurales (fuera de ciudades con más de 50,000 habitantes).",
    "WOSB contracting is for small businesses only.":
      "Los contratos WOSB son solo para pequeñas empresas.",
    "WOTC applies to employers who are actively hiring.":
      "WOTC aplica a empleadores que están contratando.",
    "Woman-owned business": "Empresa propiedad de mujeres",
    "Workforce training grants are available even for training existing employees, but hiring companies get higher priority.":
      "Las subvenciones de capacitación laboral también sirven para capacitar a empleados actuales, pero las empresas que contratan tienen más prioridad.",
    "You are a small business (<500 employees)":
      "Usted es una pequeña empresa (menos de 500 empleados)",
    "You are a small business that exports or plans to export, making you eligible for STEP grants.":
      "Usted es una pequeña empresa que exporta o planea exportar, por lo que es elegible para subvenciones STEP.",
    "You are a small or emerging business":
      "Usted es una empresa pequeña o en crecimiento",
    "You are actively hiring": "Usted está contratando",
    "You are actively hiring, which makes you eligible for WOTC if you hire from qualifying groups. Note: program expired Dec 2025, monitor for reauthorization.":
      "Usted está contratando, así que podría ser elegible para WOTC si contrata a personas de grupos que califican. Nota: el programa venció en diciembre de 2025; esté atento a su renovación.",
    "You conduct R&D activities": "Usted realiza actividades de I+D",
    "You export or plan to export": "Usted exporta o planea exportar",
    "You have clean energy or sustainability initiatives":
      "Usted tiene iniciativas de energía limpia o sostenibilidad",
    "You have fewer than 500 employees": "Usted tiene menos de 500 empleados",
    "You meet the basic criteria for SBIR Phase II, but it requires a completed Phase I award.":
      "Usted cumple los requisitos básicos de SBIR Fase II, pero necesita haber terminado un premio de Fase I.",
    "You operate in the clean energy industry":
      "Usted trabaja en la industria de energía limpia",
    "You operate in the construction industry":
      "Usted trabaja en la industria de la construcción",
    "You spend on R&D or product development":
      "Usted invierte en I+D o desarrollo de productos",
    "Your business is in a rural area": "Su empresa está en una zona rural",
    "Your business ownership profile qualifies for the 8(a) Business Development Program, providing federal contracting preferences.":
      "El perfil de propiedad de su empresa califica para el Programa de Desarrollo Empresarial 8(a), que da preferencias en contratos federales.",
    "Your company profile matches SBIR eligibility criteria. Note: program is currently paused pending reauthorization.":
      "El perfil de su empresa cumple los requisitos de SBIR. Nota: el programa está en pausa hasta que se renueve.",
    "Your industry (agriculture) aligns with USDA priorities":
      "Su industria (agricultura) coincide con las prioridades del USDA",
    "Your industry aligns with SBIR focus areas":
      "Su industria coincide con las áreas de enfoque de SBIR",
    "Your rural location makes you eligible for USDA business development grants for training, technical assistance, and feasibility studies.":
      "Por estar en una zona rural, usted es elegible para subvenciones del USDA para capacitación, asistencia técnica y estudios de viabilidad.",
    "30% of clean energy investment": "30% de la inversión en energía limpia",
    "Federal contracting preferences": "Preferencias en contratos federales",
    "Tax deferral + potential exclusion":
      "Aplazamiento de impuestos + posible exclusión",
  },
};

const zh: CompanyMessages = {
  yes: "是",
  no: "否",
  industries: {
    technology: "科技",
    healthcare: "医疗 / 生物科技",
    manufacturing: "制造业",
    agriculture: "农业 / 食品",
    "clean-energy": "清洁能源",
    retail: "零售 / 电子商务",
    services: "专业服务",
    construction: "建筑业",
    other: "其他",
  },
  steps: {
    companyName: {
      question: "您的公司叫什么名字？",
      helpText: "我们会用它来为您定制结果。",
      tooLong: "公司名称不能超过 100 个字符",
    },
    state: {
      question: "您的公司总部在哪个州？",
      helpText: "很多项目按州而定。我们需要这个信息来准确匹配。",
    },
    industry: { question: "您属于哪个行业？" },
    companyAge: {
      question: "您的公司成立多久了？",
      helpText: "有些项目面向初创企业，有些则要求有一定的经营年限。",
      lessThan1: "不到 1 年",
      y1to5: "1-5 年",
      y5to10: "5-10 年",
      y10plus: "10 年以上",
    },
    employeeCount: { question: "您有多少名员工？" },
    annualRevenue: {
      question: "您的年收入大约是多少？",
      helpText: "这能帮助我们估算项目价值。您的回答会保密。",
      under250k: "低于 $250K",
    },
    hasRnd: {
      question: "您是否在研发（R&D）或产品开发上有投入？",
      helpText: "包括软件开发、工程、产品设计、流程改进和科学研究。",
    },
    rndPercentage: {
      question: "大约有多少比例的收入用于研发？",
      helpText: "大概估计就可以。这能帮助我们计算您的研发税收抵免。",
      under5: "低于 5%",
    },
    ownership: {
      question: "您的企业是否符合以下任何所有权特征？",
      helpText: "一些联邦项目会提供合同优先权。请选择所有适用的选项。",
      minority: "少数族裔拥有（51% 以上）",
      woman: "女性拥有（51% 以上）",
      veteran: "退伍军人拥有",
      none: "都不是 / 不愿透露",
    },
    isRural: {
      question: "您的企业位于农村地区吗？",
      helpText:
        "农村是指人口 50,000 以上城市之外的地区。USDA 有专门针对农村企业的补助金。",
      notSure: "不确定",
    },
    exports: {
      question: "您是否向海外出口或计划出口产品或服务？",
      yesExport: "是，我们有出口",
      planning: "正在计划",
    },
    hiring: {
      question: "您目前在招聘吗？",
      helpText: "有几个项目为正在招聘的雇主提供税收抵免和培训补助金。",
      yesActive: "是，正在积极招聘",
      planning: "计划近期招聘",
    },
    cleanEnergy: {
      question: "您有清洁能源或可持续发展方面的举措吗？",
      helpText: "例如太阳能板、电动车队、节能建筑、可再生能源项目等。",
      considering: "正在考虑",
    },
  },
  chat: {
    title: "企业资格检查",
    restart: "重新开始",
    progressLabel: "筛查进度",
    conversationLabel: "对话",
    welcome:
      "您好！我会帮您为企业寻找政府补助金、税收抵免和激励措施。大约需要 3 分钟。",
    privacy: "您的回答是保密的，不会被分享。我们来看看您符合哪些项目。",
    calculating: "好的，我已经了解您的公司情况。正在查找匹配的项目...",
    foundOne: "好消息！我们找到 1 个 {company} 可能符合条件的项目。",
    foundOther: "好消息！我们找到 {count} 个 {company} 可能符合条件的项目。",
    signupPrompt: "创建免费账户，保存您的结果并获取个性化的后续步骤。",
    noMatches:
      "根据您提供的信息，我们目前没有找到很匹配的项目。随着新项目公布，情况可能会有变化。",
    restartMessage: "我们重新开始。我会再问您一遍同样的问题。",
    checkEmail: "请查看您的邮箱，我们发送了一个魔法链接，用来查看您的结果。",
    sentTo: "已发送至",
    sending: "正在发送...",
    resendIn: "{seconds} 秒后可重新发送",
    resendLink: "重新发送链接",
    emailPlaceholder: "you@example.com",
    emailLabel: "电子邮箱",
    sendingLink: "正在发送链接...",
    createAccount: "创建账户",
    skipForNow: "暂时跳过",
    valueNote:
      "有些项目只支付一次，有些每年重复支付。按百分比或按单位计算的抵免未计入此总额。",
    estimatedAcrossOne: "1 个项目的估计价值",
    estimatedAcrossOther: "{count} 个项目的估计价值",
    more: "另外 {count} 个",
    preliminary: "这些是初步匹配结果。请向项目管理机构确认资格。",
  },
  panel: {
    tagline: "为您的企业打造的补助金导航",
    title: "接下来会发生什么",
    intro:
      "关于您企业的一段简短对话。我们会查看 20 多个联邦和州项目，为您找到匹配结果。",
    step: "第 {n} 步",
    step1Label: "介绍一下您的公司",
    step1Desc: "行业、规模、收入和业务内容。大约需要 3 分钟。",
    step2Label: "我们查看 20 多个项目",
    step2Desc: "根据您的情况匹配联邦补助金、税收抵免、州激励措施和合同优先权。",
    step3Label: "查看匹配结果",
    step3Desc: "查看您符合条件的每个项目，以及估计价值和后续步骤。",
    privacyNote:
      "您的企业信息只保存在您的设备上，不会发送到服务器。这是一个筛查工具，不是正式申请。",
    scansPrefix: "查看",
    scansHighlight: "20 多个联邦和州项目",
    scansSuffix: "包括研发税收抵免、SBIR、WOTC、员工培训等。",
  },
  results: {
    programsMatched: "匹配的项目",
    programOne: "个项目",
    programOther: "个项目",
    across: "涵盖补助金、税收抵免、激励措施和合同优先权",
    matchedAgainst: "根据您的公司情况匹配",
    stickyOne: "匹配到 1 个项目",
    stickyOther: "匹配到 {count} 个项目",
    whyYouQualify: "您符合条件的原因",
    nextSteps: "后续步骤",
    notEligible: "目前不符合条件（{count} 个项目）",
    updateInfo: "更新公司信息",
    disclaimer:
      "这些是根据您提供的信息得出的初步匹配结果。实际资格由各项目的管理机构决定。Benefind 不保证资格或金额。申请税收抵免前请咨询税务顾问。",
    categories: {
      "tax-credit": "税收抵免",
      grant: "补助金",
      incentive: "激励措施",
      contracting: "政府合同",
    },
    statuses: { active: "进行中", paused: "已暂停", expired: "已过期" },
  },
  templates: {
    estimatedHires: "预计每年 {n} 名符合条件的新员工",
    industryAlignsSbir: "您的行业（{industry}）符合 SBIR 的重点领域",
    stateHasProgram: "{state} 有 {name} 项目",
    stateOffers: "您所在的州（{state}）提供 {name}，每名员工最高 {amount}。",
    applyThrough: "通过 {name} 申请",
    upTo: "最高 {amount}",
    perYear: "{amount}/年",
    perSqFt: "{amount}/平方英尺",
  },
  programs: {
    "rnd-tax-credit": {
      name: "研发税收抵免（IRC 第 41 条）",
      shortName: "研发税收抵免",
      description:
        "面向投资研究、产品开发或流程改进的公司的永久性联邦税收抵免。最高可抵免符合条件研发费用的 20%。",
      agency: "IRS",
      deadlineInfo: "随年度纳税申报一起提交",
    },
    "state-workforce-training": {
      name: "州员工培训补助金",
      shortName: "员工培训",
      description:
        "由州政府资助，帮助公司培训现有员工和新员工。大多数州每名员工提供 $3K-$10K，每家公司上限为 $50K-$250K。",
      agency: "州劳动力机构",
      deadlineInfo: "因州而异。大多数州全年接受申请。",
    },
    wotc: {
      name: "工作机会税收抵免（WOTC）",
      shortName: "WOTC",
      description:
        "雇用特定群体（退伍军人、SNAP 领取者、有犯罪记录者等）可获得的税收抵免。每名符合条件的员工最高 $2,400-$9,600。",
      agency: "IRS / 州劳动力机构",
      deadlineInfo: "已于 2025 年 12 月 31 日到期。请关注是否重新授权。",
    },
    "sbir-phase-i": {
      name: "小企业创新研究（SBIR）第一阶段",
      shortName: "SBIR 第一阶段",
      description:
        "联邦补助金，帮助小企业对创新想法进行可行性研究。由 11 个联邦机构提供 $50K-$305K 的资助。",
      agency: "多个机构（NSF、NIH、DOE、DOD 等）",
      deadlineInfo: "目前暂停，等待国会重新授权。请关注 SBIR.gov 的更新。",
    },
    "sbir-phase-ii": {
      name: "小企业创新研究（SBIR）第二阶段",
      shortName: "SBIR 第二阶段",
      description:
        "为已完成第一阶段的公司提供完整的研发资金。1-3 年内资助 $500K-$2.1M。",
      agency: "多个机构（NSF、NIH、DOE、DOD 等）",
      deadlineInfo: "需要先完成第一阶段。目前暂停。",
    },
    "clean-energy-itc": {
      name: "清洁能源投资税收抵免（第 48 条）",
      shortName: "清洁能源 ITC",
      description:
        "投资太阳能、风能、地热、电池储能及其他清洁能源设施可获得 30% 的联邦税收抵免。使用国产材料或位于能源社区还可获得额外抵免。",
      agency: "IRS",
    },
    "step-export": {
      name: "州贸易扩展项目（STEP）",
      shortName: "STEP 出口补助金",
      description:
        "由 SBA 出资、通过州政府发放的补助金，帮助小企业进入或扩大出口市场。可用于贸易展会、营销和本地化。",
      agency: "SBA（通过州机构）",
      deadlineInfo: "因州而异。通常每年有一个申请周期。",
    },
    "opportunity-zones": {
      name: "合格机会区激励措施",
      shortName: "机会区",
      description:
        "将资本收益投资于指定低收入社区可获得的税收激励。包括延期缴税，以及持有机会区投资 10 年以上可能免除收益税。",
      agency: "IRS",
      deadlineInfo:
        "没有截止日期。该项目已由 One Big Beautiful Bill Act 无限期延长。",
    },
    "sba-8a": {
      name: "8(a) 企业发展项目",
      shortName: "SBA 8(a) 项目",
      description:
        "为期九年的联邦项目，为社会和经济上处于不利地位的小企业提供合同优先权、指导和企业发展支持。",
      agency: "SBA",
    },
    "wosb-contracting": {
      name: "女性拥有小企业联邦合同项目",
      shortName: "WOSB 合同",
      description:
        "为女性拥有的小企业提供联邦合同优先权。政府的目标是将 5% 的联邦合同金额给予 WOSB。",
      agency: "SBA",
    },
    "section-179d": {
      name: "节能商业建筑扣除（第 179D 条）",
      shortName: "第 179D 条",
      description:
        "对商业建筑节能改造的联邦税收扣除。根据实现的节能效果，每平方英尺 $0.59-$1.19。",
      agency: "IRS",
      deadlineInfo: "必须在 2026 年 6 月 30 日前开工（终止条款）。",
    },
    "usda-rural-business": {
      name: "USDA 农村企业发展补助金",
      shortName: "USDA 农村补助金",
      description:
        "支持农村地区经济发展和创造就业的补助金。涵盖企业培训、技术援助、可行性研究和孵化器。",
      agency: "USDA 农村发展署",
      deadlineInfo: "通常在每年 5 月至 6 月。",
    },
  },
  phrases: {
    "Apply for STEP funding for export activities (shows, marketing, localization)":
      "为出口活动申请 STEP 资金（展会、营销、本地化）",
    "Apply for training reimbursement grants": "申请培训费用报销补助金",
    "Apply through the SBA 8(a) portal (certify.sba.gov)":
      "通过 SBA 8(a) 门户网站申请（certify.sba.gov）",
    "As a startup (< 5 years), you can offset up to $250K in payroll taxes":
      "作为初创企业（不到 5 年），您最多可抵扣 $250K 的工资税",
    "As a women-owned small business, you can access set-aside federal contracts targeting 5% of contracting dollars.":
      "作为女性拥有的小企业，您可以获得联邦预留合同，其目标是占合同金额的 5%。",
    "Available to any business or investor in designated zones":
      "适用于指定区域内的任何企业或投资者",
    "Begin construction before June 30, 2026 deadline":
      "在 2026 年 6 月 30 日截止日期前开工",
    "Budget for 1-3 year research timeline": "为 1-3 年的研究周期做好预算",
    "Capital gains invested in QOFs get tax deferral and potential exclusion after 10 years":
      "投资于 QOF 的资本收益可以延期缴税，10 年后可能免税",
    "Check eligibility at rd.usda.gov/eligibility (address lookup)":
      "在 rd.usda.gov/eligibility 查询资格（按地址查询）",
    "Check for domestic content bonus (10% additional credit)":
      "查看是否符合国产材料奖励（额外 10% 抵免）",
    "Check if your business is in an Opportunity Zone at opportunityzones.hud.gov":
      "在 opportunityzones.hud.gov 查看您的企业是否位于机会区",
    "Check if your location qualifies as an energy community (10% bonus)":
      "查看您的所在地是否属于能源社区（10% 奖励）",
    "Companies investing in clean energy property qualify for a 30% investment tax credit, with additional bonuses possible.":
      "投资清洁能源设施的公司可获得 30% 的投资税收抵免，还可能有额外奖励。",
    "Companies spending on R&D, product development, or process improvement qualify for this permanent federal credit.":
      "在研发、产品开发或流程改进上有支出的公司可获得这项永久性联邦抵免。",
    "Complete a SBIR Phase I award first": "先完成 SBIR 第一阶段资助",
    "Connect with a mentor through the SBA mentor-protege program":
      "通过 SBA 导师项目联系一位导师",
    "Consult a tax advisor for optimal credit structure":
      "咨询税务顾问，找到最合适的抵免方式",
    "Contact your local Small Business Development Center (SBDC)":
      "联系您当地的小企业发展中心（SBDC）",
    "Contact your local USDA Rural Development office":
      "联系您当地的 USDA 农村发展办公室",
    "Contact your state international trade office":
      "联系您所在州的国际贸易办公室",
    "Contact your state workforce development agency":
      "联系您所在州的劳动力发展机构",
    "Continue screening to protect future eligibility":
      "继续筛查新员工，以保留未来的资格",
    "Document all qualifying R&D activities (four-part test)":
      "记录所有符合条件的研发活动（四项测试）",
    "Document training costs for reimbursement": "记录培训费用以便报销",
    "Ensure 25% minimum energy savings threshold is met":
      "确保达到至少 25% 的节能标准",
    "Ensure your products/services have 51%+ US content":
      "确保您的产品或服务有 51% 以上的美国成分",
    "File Form 6765 with your annual tax return":
      "随年度纳税申报一起提交 6765 表",
    "File Form 8974 to offset payroll taxes (startup benefit)":
      "提交 8974 表以抵扣工资税（初创企业福利）",
    "Get energy modeling certification from qualified professional":
      "请合格的专业人员进行能源建模认证",
    "Identify employee training needs and programs":
      "确定员工培训需求和培训项目",
    "Identify qualifying clean energy property investments":
      "确定符合条件的清洁能源设施投资",
    "Identify qualifying improvements (lighting, HVAC, building envelope)":
      "确定符合条件的改造（照明、暖通空调、建筑外围护结构）",
    "Identify specific grant programs (Enterprise or Opportunity)":
      "确定具体的补助金项目（Enterprise 或 Opportunity）",
    "Identify upcoming international trade shows in your industry":
      "了解您所在行业即将举办的国际贸易展会",
    "Identify which agency aligns with your research focus":
      "确定哪个机构与您的研究方向相符",
    "If yes, consult a tax advisor about Qualified Opportunity Fund structure":
      "如果是，请咨询税务顾问，了解合格机会基金的结构",
    "If you own or improve commercial buildings with energy-efficient systems, you may qualify. Note: construction must begin by June 30, 2026.":
      "如果您拥有商业建筑或用节能系统改造商业建筑，您可能符合条件。注意：必须在 2026 年 6 月 30 日前开工。",
    "Monitor SBIR.gov for reauthorization and new solicitations":
      "关注 SBIR.gov 上的重新授权和新的征集公告",
    "Monitor for congressional reauthorization (may be retroactive)":
      "关注国会是否重新授权（可能追溯生效）",
    "Most states offer workforce training grants to all employers":
      "大多数州向所有雇主提供员工培训补助金",
    "Nearly every state offers workforce training grants. Contact your state workforce agency for specific programs.":
      "几乎每个州都提供员工培训补助金。请联系您所在州的劳动力机构了解具体项目。",
    "Once certified, access sole-source and set-aside federal contracts":
      "获得认证后，可参与单一来源和预留的联邦合同",
    "Opportunity Zone incentives may apply if your business is located in or you invest in a designated Opportunity Zone. Check the OZ map for your area.":
      "如果您的企业位于指定的机会区，或您在机会区投资，可能适用机会区激励措施。请查看您所在地区的机会区地图。",
    "Owned by socially disadvantaged individual(s)": "由社会弱势群体人士拥有",
    "Prepare a Phase I proposal (feasibility study, 6-18 months)":
      "准备第一阶段提案（可行性研究，6-18 个月）",
    "Prepare a Phase II proposal with full R&D plan":
      "准备包含完整研发计划的第二阶段提案",
    "Prepare a training plan for new and existing employees":
      "为新员工和现有员工准备培训计划",
    "Prepare a training plan with costs and timeline":
      "准备包含费用和时间安排的培训计划",
    "Prepare application with business plan and economic impact data":
      "准备申请材料，包括商业计划和经济影响数据",
    "Prepare financial documents, tax returns, and ownership documentation":
      "准备财务文件、纳税申报表和所有权证明",
    "Register on SAM.gov for federal contracting":
      "在 SAM.gov 注册以参与联邦合同",
    "Register on SBIR.gov and SAM.gov (required)":
      "在 SBIR.gov 和 SAM.gov 注册（必需）",
    "Rural areas are more likely to contain Opportunity Zones":
      "农村地区更有可能包含机会区",
    "SBIR Phase II requires fewer than 500 employees and active R&D.":
      "SBIR 第二阶段要求员工少于 500 人，并且正在进行研发。",
    "SBIR is for companies conducting research and development.":
      "SBIR 面向正在进行研发的公司。",
    "SBIR requires fewer than 500 employees.": "SBIR 要求员工少于 500 人。",
    "STEP grants are for companies that export or plan to export products/services.":
      "STEP 补助金面向出口或计划出口产品或服务的公司。",
    "STEP is limited to small businesses (fewer than 500 employees).":
      "STEP 仅限小企业（员工少于 500 人）。",
    "Screen all new hires using IRS Form 8850 within 28 days of start":
      "在新员工入职 28 天内，用 IRS 8850 表对其进行筛查",
    "Search for WOSB set-aside contracts on SAM.gov":
      "在 SAM.gov 上搜索 WOSB 预留合同",
    "Search your state workforce agency website for training grants":
      "在您所在州劳动力机构的网站上搜索培训补助金",
    "Self-certify as WOSB through certify.sba.gov":
      "通过 certify.sba.gov 自我认证为 WOSB",
    "Small business with fewer than 500 employees": "员工少于 500 人的小企业",
    "Submit to your state workforce agency for certification":
      "提交给您所在州的劳动力机构进行认证",
    "The 8(a) program is for small businesses only.": "8(a) 项目仅面向小企业。",
    "The 8(a) program requires ownership by socially disadvantaged individuals (minority, veteran, or other qualifying groups).":
      "8(a) 项目要求企业由社会弱势群体人士拥有（少数族裔、退伍军人或其他符合条件的群体）。",
    "This credit requires R&D or product development spending.":
      "这项抵免要求有研发或产品开发支出。",
    "This credit requires clean energy investments or operations.":
      "这项抵免要求有清洁能源投资或业务。",
    "This deduction applies to commercial building energy efficiency improvements.":
      "这项扣除适用于商业建筑的节能改造。",
    "This program requires 51%+ woman-owned businesses.":
      "该项目要求企业 51% 以上由女性拥有。",
    "Track employee time spent on R&D projects":
      "记录员工在研发项目上花费的时间",
    "USDA Rural Business grants are for businesses in rural areas (outside cities with 50,000+ population).":
      "USDA 农村企业补助金面向农村地区的企业（人口 50,000 以上城市之外）。",
    "WOSB contracting is for small businesses only.": "WOSB 合同仅面向小企业。",
    "WOTC applies to employers who are actively hiring.":
      "WOTC 适用于正在积极招聘的雇主。",
    "Woman-owned business": "女性拥有的企业",
    "Workforce training grants are available even for training existing employees, but hiring companies get higher priority.":
      "员工培训补助金也可用于培训现有员工，但正在招聘的公司会获得更高优先级。",
    "You are a small business (<500 employees)":
      "您是小企业（员工少于 500 人）",
    "You are a small business that exports or plans to export, making you eligible for STEP grants.":
      "您是出口或计划出口的小企业，因此符合 STEP 补助金的条件。",
    "You are a small or emerging business": "您是小型或新兴企业",
    "You are actively hiring": "您正在积极招聘",
    "You are actively hiring, which makes you eligible for WOTC if you hire from qualifying groups. Note: program expired Dec 2025, monitor for reauthorization.":
      "您正在积极招聘，如果您雇用符合条件群体的人员，就可能符合 WOTC 的条件。注意：该项目已于 2025 年 12 月到期，请关注是否重新授权。",
    "You conduct R&D activities": "您在进行研发活动",
    "You export or plan to export": "您有出口或计划出口",
    "You have clean energy or sustainability initiatives":
      "您有清洁能源或可持续发展举措",
    "You have fewer than 500 employees": "您的员工少于 500 人",
    "You meet the basic criteria for SBIR Phase II, but it requires a completed Phase I award.":
      "您符合 SBIR 第二阶段的基本条件，但需要先完成第一阶段资助。",
    "You operate in the clean energy industry": "您从事清洁能源行业",
    "You operate in the construction industry": "您从事建筑行业",
    "You spend on R&D or product development": "您在研发或产品开发上有支出",
    "Your business is in a rural area": "您的企业位于农村地区",
    "Your business ownership profile qualifies for the 8(a) Business Development Program, providing federal contracting preferences.":
      "您企业的所有权情况符合 8(a) 企业发展项目的条件，可获得联邦合同优先权。",
    "Your company profile matches SBIR eligibility criteria. Note: program is currently paused pending reauthorization.":
      "您的公司情况符合 SBIR 的资格标准。注意：该项目目前暂停，等待重新授权。",
    "Your industry (agriculture) aligns with USDA priorities":
      "您的行业（农业）符合 USDA 的优先方向",
    "Your industry aligns with SBIR focus areas":
      "您的行业符合 SBIR 的重点领域",
    "Your rural location makes you eligible for USDA business development grants for training, technical assistance, and feasibility studies.":
      "由于您位于农村地区，您符合 USDA 企业发展补助金的条件，可用于培训、技术援助和可行性研究。",
    "30% of clean energy investment": "清洁能源投资的 30%",
    "Federal contracting preferences": "联邦合同优先权",
    "Tax deferral + potential exclusion": "延期缴税 + 可能免税",
  },
};

const vi: CompanyMessages = {
  yes: "Có",
  no: "Không",
  industries: {
    technology: "Công nghệ",
    healthcare: "Y tế / Công nghệ sinh học",
    manufacturing: "Sản xuất",
    agriculture: "Nông nghiệp / Thực phẩm",
    "clean-energy": "Năng lượng sạch",
    retail: "Bán lẻ / Thương mại điện tử",
    services: "Dịch vụ chuyên nghiệp",
    construction: "Xây dựng",
    other: "Khác",
  },
  steps: {
    companyName: {
      question: "Công ty của bạn tên là gì?",
      helpText: "Chúng tôi sẽ dùng tên này để cá nhân hóa kết quả của bạn.",
      tooLong: "Tên công ty không được dài quá 100 ký tự",
    },
    state: {
      question: "Trụ sở công ty của bạn ở tiểu bang nào?",
      helpText:
        "Nhiều chương trình tùy theo tiểu bang. Chúng tôi cần thông tin này để tìm kết quả chính xác.",
    },
    industry: { question: "Bạn làm trong ngành nào?" },
    companyAge: {
      question: "Công ty của bạn đã hoạt động bao lâu?",
      helpText:
        "Một số chương trình dành cho công ty mới, số khác yêu cầu có thời gian hoạt động.",
      lessThan1: "Dưới 1 năm",
      y1to5: "1-5 năm",
      y5to10: "5-10 năm",
      y10plus: "Trên 10 năm",
    },
    employeeCount: { question: "Bạn có bao nhiêu nhân viên?" },
    annualRevenue: {
      question: "Doanh thu hằng năm của bạn khoảng bao nhiêu?",
      helpText:
        "Thông tin này giúp chúng tôi ước tính giá trị chương trình. Câu trả lời của bạn được giữ kín.",
      under250k: "Dưới $250K",
    },
    hasRnd: {
      question:
        "Bạn có chi tiêu cho nghiên cứu và phát triển (R&D) hoặc phát triển sản phẩm không?",
      helpText:
        "Bao gồm phát triển phần mềm, kỹ thuật, thiết kế sản phẩm, cải tiến quy trình và nghiên cứu khoa học.",
    },
    rndPercentage: {
      question: "Khoảng bao nhiêu phần trăm doanh thu được dùng cho R&D?",
      helpText:
        "Ước tính gần đúng là được. Thông tin này giúp chúng tôi tính tín thuế R&D của bạn.",
      under5: "Dưới 5%",
    },
    ownership: {
      question: "Doanh nghiệp của bạn có đặc điểm sở hữu nào sau đây không?",
      helpText:
        "Một số chương trình liên bang ưu tiên trong hợp đồng. Chọn tất cả các mục phù hợp.",
      minority: "Do người thiểu số sở hữu (51%+)",
      woman: "Do phụ nữ sở hữu (51%+)",
      veteran: "Do cựu chiến binh sở hữu",
      none: "Không có / Không muốn trả lời",
    },
    isRural: {
      question: "Doanh nghiệp của bạn có ở vùng nông thôn không?",
      helpText:
        "Nông thôn là khu vực bên ngoài các thành phố có trên 50.000 dân. USDA có khoản tài trợ riêng cho doanh nghiệp nông thôn.",
      notSure: "Không chắc",
    },
    exports: {
      question:
        "Bạn có xuất khẩu hoặc dự định xuất khẩu sản phẩm hay dịch vụ ra nước ngoài không?",
      yesExport: "Có, chúng tôi xuất khẩu",
      planning: "Đang dự định",
    },
    hiring: {
      question: "Hiện bạn có đang tuyển dụng không?",
      helpText:
        "Một số chương trình có tín thuế và tài trợ đào tạo cho chủ doanh nghiệp đang tuyển dụng.",
      yesActive: "Có, đang tuyển dụng",
      planning: "Dự định tuyển sớm",
    },
    cleanEnergy: {
      question:
        "Bạn có dự án năng lượng sạch hoặc phát triển bền vững nào không?",
      helpText:
        "Tấm pin mặt trời, đội xe điện, tòa nhà tiết kiệm năng lượng, dự án năng lượng tái tạo, v.v.",
      considering: "Đang cân nhắc",
    },
  },
  chat: {
    title: "Kiểm tra điều kiện cho doanh nghiệp",
    restart: "Bắt đầu lại",
    progressLabel: "Tiến độ sàng lọc",
    conversationLabel: "Cuộc trò chuyện",
    welcome:
      "Xin chào! Tôi sẽ giúp bạn tìm các khoản tài trợ, tín thuế và ưu đãi của chính phủ cho doanh nghiệp. Chỉ mất khoảng 3 phút.",
    privacy:
      "Câu trả lời của bạn được giữ kín và không chia sẻ với ai. Hãy cùng xem bạn đủ điều kiện cho những gì.",
    calculating:
      "Tốt lắm, tôi đã có thông tin công ty của bạn. Đang tìm các chương trình phù hợp...",
    foundOne:
      "Tin vui! Chúng tôi tìm thấy 1 chương trình mà {company} có thể đủ điều kiện.",
    foundOther:
      "Tin vui! Chúng tôi tìm thấy {count} chương trình mà {company} có thể đủ điều kiện.",
    signupPrompt:
      "Tạo tài khoản miễn phí để lưu kết quả và nhận các bước tiếp theo dành riêng cho bạn.",
    noMatches:
      "Dựa trên thông tin bạn cung cấp, hiện chúng tôi chưa tìm thấy chương trình nào thật sự phù hợp. Điều này có thể thay đổi khi có chương trình mới.",
    restartMessage: "Hãy bắt đầu lại. Tôi sẽ hỏi bạn các câu hỏi như trước.",
    checkEmail:
      "Hãy kiểm tra email của bạn. Chúng tôi đã gửi một liên kết đăng nhập để bạn xem kết quả.",
    sentTo: "Đã gửi đến",
    sending: "Đang gửi...",
    resendIn: "Gửi lại liên kết sau {seconds} giây",
    resendLink: "Gửi lại liên kết",
    emailPlaceholder: "ban@example.com",
    emailLabel: "Địa chỉ email",
    sendingLink: "Đang gửi liên kết...",
    createAccount: "Tạo tài khoản",
    skipForNow: "Bỏ qua lúc này",
    valueNote:
      "Một số chương trình chi trả một lần, một số khác lặp lại hằng năm. Các khoản tín dụng tính theo phần trăm hoặc theo đơn vị không được tính vào tổng này.",
    estimatedAcrossOne: "Giá trị ước tính của 1 chương trình",
    estimatedAcrossOther: "Giá trị ước tính của {count} chương trình",
    more: "+{count} chương trình khác",
    preliminary:
      "Đây là kết quả sơ bộ. Hãy xác nhận điều kiện với cơ quan quản lý chương trình.",
  },
  panel: {
    tagline: "Hướng dẫn tìm tài trợ, dành cho doanh nghiệp của bạn",
    title: "Đây là những gì sắp diễn ra",
    intro:
      "Một cuộc trò chuyện ngắn về doanh nghiệp của bạn. Chúng tôi xem xét hơn 20 chương trình liên bang và tiểu bang để tìm chương trình phù hợp.",
    step: "Bước {n}",
    step1Label: "Cho chúng tôi biết về công ty của bạn",
    step1Desc:
      "Ngành nghề, quy mô, doanh thu và công việc của bạn. Mất khoảng 3 phút.",
    step2Label: "Chúng tôi xem xét hơn 20 chương trình",
    step2Desc:
      "Tài trợ liên bang, tín thuế, ưu đãi tiểu bang và ưu tiên hợp đồng phù hợp với hồ sơ của bạn.",
    step3Label: "Xem kết quả phù hợp",
    step3Desc:
      "Xem mọi chương trình bạn đủ điều kiện, kèm giá trị ước tính và các bước tiếp theo.",
    privacyNote:
      "Thông tin doanh nghiệp của bạn chỉ được lưu trên thiết bị của bạn và không bao giờ gửi đến máy chủ. Đây là công cụ sàng lọc, không phải đơn đăng ký chính thức.",
    scansPrefix: "Xem xét",
    scansHighlight: "hơn 20 chương trình liên bang và tiểu bang",
    scansSuffix:
      "bao gồm tín thuế R&D, SBIR, WOTC, đào tạo nhân lực và nhiều chương trình khác.",
  },
  results: {
    programsMatched: "Chương trình phù hợp",
    programOne: "chương trình",
    programOther: "chương trình",
    across: "Gồm tài trợ, tín thuế, ưu đãi và ưu tiên hợp đồng",
    matchedAgainst: "Đối chiếu với hồ sơ công ty của bạn",
    stickyOne: "1 chương trình phù hợp",
    stickyOther: "{count} chương trình phù hợp",
    whyYouQualify: "Vì sao bạn đủ điều kiện",
    nextSteps: "Các bước tiếp theo",
    notEligible: "Hiện chưa đủ điều kiện ({count} chương trình)",
    updateInfo: "Cập nhật thông tin công ty",
    disclaimer:
      "Đây là kết quả sơ bộ dựa trên thông tin bạn cung cấp. Điều kiện thực tế do cơ quan quản lý từng chương trình quyết định. Benefind không bảo đảm điều kiện hay số tiền nhận được. Hãy hỏi ý kiến chuyên gia thuế trước khi khai tín thuế.",
    categories: {
      "tax-credit": "Tín thuế",
      grant: "Tài trợ",
      incentive: "Ưu đãi",
      contracting: "Hợp đồng",
    },
    statuses: {
      active: "Đang hoạt động",
      paused: "Tạm dừng",
      expired: "Đã hết hạn",
    },
  },
  templates: {
    estimatedHires: "Ước tính {n} nhân viên mới đủ điều kiện mỗi năm",
    industryAlignsSbir:
      "Ngành của bạn ({industry}) phù hợp với lĩnh vực trọng tâm của SBIR",
    stateHasProgram: "{state} có chương trình {name}",
    stateOffers:
      "Tiểu bang của bạn ({state}) có chương trình {name}, tối đa {amount} cho mỗi nhân viên.",
    applyThrough: "Nộp đơn qua chương trình {name}",
    upTo: "Tối đa {amount}",
    perYear: "{amount}/năm",
    perSqFt: "{amount}/foot vuông",
  },
  programs: {
    "rnd-tax-credit": {
      name: "Tín thuế nghiên cứu và phát triển (IRC Mục 41)",
      shortName: "Tín thuế R&D",
      description:
        "Tín thuế liên bang lâu dài cho công ty đầu tư vào nghiên cứu, phát triển sản phẩm hoặc cải tiến quy trình. Tối đa 20% chi phí R&D đủ điều kiện.",
      agency: "IRS",
      deadlineInfo: "Nộp cùng tờ khai thuế hằng năm",
    },
    "state-workforce-training": {
      name: "Tài trợ đào tạo nhân lực của tiểu bang",
      shortName: "Đào tạo nhân lực",
      description:
        "Khoản tài trợ của tiểu bang giúp công ty đào tạo nhân viên hiện tại và nhân viên mới. Hầu hết các tiểu bang hỗ trợ $3K-$10K mỗi nhân viên, tối đa $50K-$250K mỗi công ty.",
      agency: "Cơ quan lao động tiểu bang",
      deadlineInfo: "Tùy theo tiểu bang. Hầu hết nhận đơn quanh năm.",
    },
    wotc: {
      name: "Tín thuế cơ hội việc làm (WOTC)",
      shortName: "WOTC",
      description:
        "Tín thuế khi tuyển người thuộc các nhóm được ưu tiên (cựu chiến binh, người nhận SNAP, người có tiền án, v.v.). Tối đa $2,400-$9,600 cho mỗi nhân viên đủ điều kiện.",
      agency: "IRS / Cơ quan lao động tiểu bang",
      deadlineInfo:
        "Đã hết hạn ngày 31 tháng 12 năm 2025. Hãy theo dõi việc gia hạn.",
    },
    "sbir-phase-i": {
      name: "Nghiên cứu đổi mới cho doanh nghiệp nhỏ (SBIR) Giai đoạn I",
      shortName: "SBIR Giai đoạn I",
      description:
        "Tài trợ liên bang giúp doanh nghiệp nhỏ nghiên cứu tính khả thi của ý tưởng đổi mới. Khoản tài trợ $50K-$305K từ 11 cơ quan liên bang.",
      agency: "Nhiều cơ quan (NSF, NIH, DOE, DOD, v.v.)",
      deadlineInfo:
        "Đang tạm dừng chờ Quốc hội gia hạn. Hãy theo dõi SBIR.gov để biết thông tin mới.",
    },
    "sbir-phase-ii": {
      name: "Nghiên cứu đổi mới cho doanh nghiệp nhỏ (SBIR) Giai đoạn II",
      shortName: "SBIR Giai đoạn II",
      description:
        "Tài trợ R&D đầy đủ cho công ty đã hoàn thành Giai đoạn I. Khoản tài trợ $500K-$2.1M trong 1-3 năm.",
      agency: "Nhiều cơ quan (NSF, NIH, DOE, DOD, v.v.)",
      deadlineInfo: "Cần hoàn thành Giai đoạn I. Hiện đang tạm dừng.",
    },
    "clean-energy-itc": {
      name: "Tín thuế đầu tư năng lượng sạch (Mục 48)",
      shortName: "ITC năng lượng sạch",
      description:
        "Tín thuế liên bang 30% cho khoản đầu tư vào năng lượng mặt trời, gió, địa nhiệt, lưu trữ pin và tài sản năng lượng sạch khác. Có thêm tín thuế thưởng cho vật liệu sản xuất trong nước và địa điểm thuộc cộng đồng năng lượng.",
      agency: "IRS",
    },
    "step-export": {
      name: "Chương trình mở rộng thương mại tiểu bang (STEP)",
      shortName: "Tài trợ xuất khẩu STEP",
      description:
        "Khoản tài trợ do SBA cấp vốn qua chính quyền tiểu bang, giúp doanh nghiệp nhỏ bắt đầu hoặc mở rộng xuất khẩu. Dùng cho hội chợ thương mại, tiếp thị và bản địa hóa.",
      agency: "SBA (qua cơ quan tiểu bang)",
      deadlineInfo: "Tùy theo tiểu bang. Thường nhận đơn mỗi năm một lần.",
    },
    "opportunity-zones": {
      name: "Ưu đãi Khu vực Cơ hội Đủ điều kiện",
      shortName: "Khu vực Cơ hội",
      description:
        "Ưu đãi thuế khi đầu tư lãi vốn vào các cộng đồng thu nhập thấp được chỉ định. Gồm hoãn thuế và có thể miễn thuế trên lãi của khoản đầu tư OZ giữ từ 10 năm trở lên.",
      agency: "IRS",
      deadlineInfo:
        "Không có hạn chót. Chương trình được gia hạn vô thời hạn theo đạo luật One Big Beautiful Bill Act.",
    },
    "sba-8a": {
      name: "Chương trình phát triển doanh nghiệp 8(a)",
      shortName: "Chương trình 8(a) của SBA",
      description:
        "Chương trình liên bang kéo dài chín năm, ưu tiên trong hợp đồng, hướng dẫn và hỗ trợ phát triển cho doanh nghiệp nhỏ thiệt thòi về xã hội và kinh tế.",
      agency: "SBA",
    },
    "wosb-contracting": {
      name: "Hợp đồng liên bang cho doanh nghiệp nhỏ do phụ nữ sở hữu",
      shortName: "Hợp đồng WOSB",
      description:
        "Ưu tiên hợp đồng liên bang cho doanh nghiệp nhỏ do phụ nữ sở hữu. Chính phủ đặt mục tiêu dành 5% giá trị hợp đồng liên bang cho WOSB.",
      agency: "SBA",
    },
    "section-179d": {
      name: "Khấu trừ cho tòa nhà thương mại tiết kiệm năng lượng (Mục 179D)",
      shortName: "Mục 179D",
      description:
        "Khấu trừ thuế liên bang cho các cải tạo tiết kiệm năng lượng ở tòa nhà thương mại. $0.59-$1.19 mỗi foot vuông tùy theo mức tiết kiệm năng lượng đạt được.",
      agency: "IRS",
      deadlineInfo:
        "Phải khởi công trước ngày 30 tháng 6 năm 2026 (điều khoản chấm dứt).",
    },
    "usda-rural-business": {
      name: "Tài trợ phát triển doanh nghiệp nông thôn của USDA",
      shortName: "Tài trợ nông thôn USDA",
      description:
        "Khoản tài trợ hỗ trợ phát triển kinh tế và tạo việc làm ở vùng nông thôn. Dùng cho đào tạo kinh doanh, hỗ trợ kỹ thuật, nghiên cứu khả thi và vườn ươm doanh nghiệp.",
      agency: "Phát triển Nông thôn USDA",
      deadlineInfo: "Thường vào tháng 5 đến tháng 6 hằng năm.",
    },
  },
  phrases: {
    "Apply for STEP funding for export activities (shows, marketing, localization)":
      "Xin tài trợ STEP cho hoạt động xuất khẩu (hội chợ, tiếp thị, bản địa hóa)",
    "Apply for training reimbursement grants":
      "Xin tài trợ hoàn trả chi phí đào tạo",
    "Apply through the SBA 8(a) portal (certify.sba.gov)":
      "Nộp đơn qua cổng 8(a) của SBA (certify.sba.gov)",
    "As a startup (< 5 years), you can offset up to $250K in payroll taxes":
      "Là công ty mới (dưới 5 năm), bạn có thể bù trừ tối đa $250K thuế lương",
    "As a women-owned small business, you can access set-aside federal contracts targeting 5% of contracting dollars.":
      "Là doanh nghiệp nhỏ do phụ nữ sở hữu, bạn có thể nhận các hợp đồng liên bang dành riêng, với mục tiêu 5% giá trị hợp đồng.",
    "Available to any business or investor in designated zones":
      "Dành cho mọi doanh nghiệp hoặc nhà đầu tư trong khu vực được chỉ định",
    "Begin construction before June 30, 2026 deadline":
      "Khởi công trước hạn chót ngày 30 tháng 6 năm 2026",
    "Budget for 1-3 year research timeline":
      "Lập ngân sách cho thời gian nghiên cứu 1-3 năm",
    "Capital gains invested in QOFs get tax deferral and potential exclusion after 10 years":
      "Lãi vốn đầu tư vào QOF được hoãn thuế và có thể được miễn thuế sau 10 năm",
    "Check eligibility at rd.usda.gov/eligibility (address lookup)":
      "Kiểm tra điều kiện tại rd.usda.gov/eligibility (tra cứu theo địa chỉ)",
    "Check for domestic content bonus (10% additional credit)":
      "Kiểm tra khoản thưởng cho vật liệu trong nước (thêm 10% tín thuế)",
    "Check if your business is in an Opportunity Zone at opportunityzones.hud.gov":
      "Kiểm tra doanh nghiệp của bạn có nằm trong Khu vực Cơ hội không tại opportunityzones.hud.gov",
    "Check if your location qualifies as an energy community (10% bonus)":
      "Kiểm tra địa điểm của bạn có thuộc cộng đồng năng lượng không (thưởng 10%)",
    "Companies investing in clean energy property qualify for a 30% investment tax credit, with additional bonuses possible.":
      "Công ty đầu tư vào tài sản năng lượng sạch đủ điều kiện nhận tín thuế đầu tư 30%, và có thể nhận thêm tiền thưởng.",
    "Companies spending on R&D, product development, or process improvement qualify for this permanent federal credit.":
      "Công ty chi tiêu cho R&D, phát triển sản phẩm hoặc cải tiến quy trình đủ điều kiện nhận tín thuế liên bang lâu dài này.",
    "Complete a SBIR Phase I award first":
      "Trước hết hoàn thành khoản tài trợ SBIR Giai đoạn I",
    "Connect with a mentor through the SBA mentor-protege program":
      "Tìm người hướng dẫn qua chương trình cố vấn của SBA",
    "Consult a tax advisor for optimal credit structure":
      "Hỏi ý kiến chuyên gia thuế để tận dụng tín thuế tốt nhất",
    "Contact your local Small Business Development Center (SBDC)":
      "Liên hệ Trung tâm Phát triển Doanh nghiệp Nhỏ (SBDC) tại địa phương",
    "Contact your local USDA Rural Development office":
      "Liên hệ văn phòng Phát triển Nông thôn USDA tại địa phương",
    "Contact your state international trade office":
      "Liên hệ văn phòng thương mại quốc tế của tiểu bang",
    "Contact your state workforce development agency":
      "Liên hệ cơ quan phát triển lực lượng lao động của tiểu bang",
    "Continue screening to protect future eligibility":
      "Tiếp tục sàng lọc nhân viên mới để giữ điều kiện trong tương lai",
    "Document all qualifying R&D activities (four-part test)":
      "Ghi lại mọi hoạt động R&D đủ điều kiện (kiểm tra bốn phần)",
    "Document training costs for reimbursement":
      "Ghi lại chi phí đào tạo để được hoàn trả",
    "Ensure 25% minimum energy savings threshold is met":
      "Bảo đảm đạt mức tiết kiệm năng lượng tối thiểu 25%",
    "Ensure your products/services have 51%+ US content":
      "Bảo đảm sản phẩm hoặc dịch vụ của bạn có từ 51% thành phần Mỹ trở lên",
    "File Form 6765 with your annual tax return":
      "Nộp Mẫu 6765 cùng tờ khai thuế hằng năm",
    "File Form 8974 to offset payroll taxes (startup benefit)":
      "Nộp Mẫu 8974 để bù trừ thuế lương (quyền lợi cho công ty mới)",
    "Get energy modeling certification from qualified professional":
      "Nhờ chuyên gia có trình độ chứng nhận mô hình năng lượng",
    "Identify employee training needs and programs":
      "Xác định nhu cầu và chương trình đào tạo nhân viên",
    "Identify qualifying clean energy property investments":
      "Xác định các khoản đầu tư tài sản năng lượng sạch đủ điều kiện",
    "Identify qualifying improvements (lighting, HVAC, building envelope)":
      "Xác định các cải tạo đủ điều kiện (chiếu sáng, điều hòa không khí, vỏ tòa nhà)",
    "Identify specific grant programs (Enterprise or Opportunity)":
      "Xác định chương trình tài trợ cụ thể (Enterprise hoặc Opportunity)",
    "Identify upcoming international trade shows in your industry":
      "Tìm các hội chợ thương mại quốc tế sắp tới trong ngành của bạn",
    "Identify which agency aligns with your research focus":
      "Xác định cơ quan phù hợp với hướng nghiên cứu của bạn",
    "If yes, consult a tax advisor about Qualified Opportunity Fund structure":
      "Nếu có, hãy hỏi chuyên gia thuế về cấu trúc Quỹ Cơ hội Đủ điều kiện",
    "If you own or improve commercial buildings with energy-efficient systems, you may qualify. Note: construction must begin by June 30, 2026.":
      "Nếu bạn sở hữu hoặc cải tạo tòa nhà thương mại với hệ thống tiết kiệm năng lượng, bạn có thể đủ điều kiện. Lưu ý: phải khởi công trước ngày 30 tháng 6 năm 2026.",
    "Monitor SBIR.gov for reauthorization and new solicitations":
      "Theo dõi SBIR.gov để biết việc gia hạn và các đợt mời nộp đơn mới",
    "Monitor for congressional reauthorization (may be retroactive)":
      "Theo dõi việc Quốc hội gia hạn (có thể áp dụng hồi tố)",
    "Most states offer workforce training grants to all employers":
      "Hầu hết các tiểu bang có tài trợ đào tạo nhân lực cho mọi chủ doanh nghiệp",
    "Nearly every state offers workforce training grants. Contact your state workforce agency for specific programs.":
      "Gần như tiểu bang nào cũng có tài trợ đào tạo nhân lực. Hãy liên hệ cơ quan lao động tiểu bang để biết chương trình cụ thể.",
    "Once certified, access sole-source and set-aside federal contracts":
      "Sau khi được chứng nhận, bạn có thể nhận hợp đồng liên bang chỉ định và dành riêng",
    "Opportunity Zone incentives may apply if your business is located in or you invest in a designated Opportunity Zone. Check the OZ map for your area.":
      "Ưu đãi Khu vực Cơ hội có thể áp dụng nếu doanh nghiệp của bạn nằm trong hoặc bạn đầu tư vào Khu vực Cơ hội được chỉ định. Hãy xem bản đồ OZ cho khu vực của bạn.",
    "Owned by socially disadvantaged individual(s)":
      "Do người thiệt thòi về xã hội sở hữu",
    "Prepare a Phase I proposal (feasibility study, 6-18 months)":
      "Chuẩn bị đề xuất Giai đoạn I (nghiên cứu khả thi, 6-18 tháng)",
    "Prepare a Phase II proposal with full R&D plan":
      "Chuẩn bị đề xuất Giai đoạn II với kế hoạch R&D đầy đủ",
    "Prepare a training plan for new and existing employees":
      "Chuẩn bị kế hoạch đào tạo cho nhân viên mới và hiện tại",
    "Prepare a training plan with costs and timeline":
      "Chuẩn bị kế hoạch đào tạo kèm chi phí và thời gian",
    "Prepare application with business plan and economic impact data":
      "Chuẩn bị đơn với kế hoạch kinh doanh và số liệu tác động kinh tế",
    "Prepare financial documents, tax returns, and ownership documentation":
      "Chuẩn bị giấy tờ tài chính, tờ khai thuế và giấy tờ sở hữu",
    "Register on SAM.gov for federal contracting":
      "Đăng ký trên SAM.gov để nhận hợp đồng liên bang",
    "Register on SBIR.gov and SAM.gov (required)":
      "Đăng ký trên SBIR.gov và SAM.gov (bắt buộc)",
    "Rural areas are more likely to contain Opportunity Zones":
      "Vùng nông thôn có nhiều khả năng nằm trong Khu vực Cơ hội hơn",
    "SBIR Phase II requires fewer than 500 employees and active R&D.":
      "SBIR Giai đoạn II yêu cầu dưới 500 nhân viên và đang có hoạt động R&D.",
    "SBIR is for companies conducting research and development.":
      "SBIR dành cho công ty đang nghiên cứu và phát triển.",
    "SBIR requires fewer than 500 employees.":
      "SBIR yêu cầu dưới 500 nhân viên.",
    "STEP grants are for companies that export or plan to export products/services.":
      "Tài trợ STEP dành cho công ty đang xuất khẩu hoặc dự định xuất khẩu sản phẩm hay dịch vụ.",
    "STEP is limited to small businesses (fewer than 500 employees).":
      "STEP chỉ dành cho doanh nghiệp nhỏ (dưới 500 nhân viên).",
    "Screen all new hires using IRS Form 8850 within 28 days of start":
      "Sàng lọc mọi nhân viên mới bằng Mẫu 8850 của IRS trong vòng 28 ngày kể từ ngày bắt đầu làm",
    "Search for WOSB set-aside contracts on SAM.gov":
      "Tìm hợp đồng dành riêng cho WOSB trên SAM.gov",
    "Search your state workforce agency website for training grants":
      "Tìm tài trợ đào tạo trên trang web của cơ quan lao động tiểu bang",
    "Self-certify as WOSB through certify.sba.gov":
      "Tự chứng nhận là WOSB qua certify.sba.gov",
    "Small business with fewer than 500 employees":
      "Doanh nghiệp nhỏ có dưới 500 nhân viên",
    "Submit to your state workforce agency for certification":
      "Gửi cho cơ quan lao động tiểu bang để được chứng nhận",
    "The 8(a) program is for small businesses only.":
      "Chương trình 8(a) chỉ dành cho doanh nghiệp nhỏ.",
    "The 8(a) program requires ownership by socially disadvantaged individuals (minority, veteran, or other qualifying groups).":
      "Chương trình 8(a) yêu cầu doanh nghiệp do người thiệt thòi về xã hội sở hữu (người thiểu số, cựu chiến binh hoặc nhóm đủ điều kiện khác).",
    "This credit requires R&D or product development spending.":
      "Tín thuế này yêu cầu có chi tiêu cho R&D hoặc phát triển sản phẩm.",
    "This credit requires clean energy investments or operations.":
      "Tín thuế này yêu cầu có đầu tư hoặc hoạt động năng lượng sạch.",
    "This deduction applies to commercial building energy efficiency improvements.":
      "Khoản khấu trừ này áp dụng cho cải tạo tiết kiệm năng lượng ở tòa nhà thương mại.",
    "This program requires 51%+ woman-owned businesses.":
      "Chương trình này yêu cầu doanh nghiệp do phụ nữ sở hữu từ 51% trở lên.",
    "Track employee time spent on R&D projects":
      "Theo dõi thời gian nhân viên làm dự án R&D",
    "USDA Rural Business grants are for businesses in rural areas (outside cities with 50,000+ population).":
      "Tài trợ doanh nghiệp nông thôn của USDA dành cho doanh nghiệp ở vùng nông thôn (bên ngoài thành phố có trên 50.000 dân).",
    "WOSB contracting is for small businesses only.":
      "Hợp đồng WOSB chỉ dành cho doanh nghiệp nhỏ.",
    "WOTC applies to employers who are actively hiring.":
      "WOTC áp dụng cho chủ doanh nghiệp đang tuyển dụng.",
    "Woman-owned business": "Doanh nghiệp do phụ nữ sở hữu",
    "Workforce training grants are available even for training existing employees, but hiring companies get higher priority.":
      "Tài trợ đào tạo nhân lực cũng dùng được để đào tạo nhân viên hiện tại, nhưng công ty đang tuyển dụng được ưu tiên hơn.",
    "You are a small business (<500 employees)":
      "Bạn là doanh nghiệp nhỏ (dưới 500 nhân viên)",
    "You are a small business that exports or plans to export, making you eligible for STEP grants.":
      "Bạn là doanh nghiệp nhỏ đang xuất khẩu hoặc dự định xuất khẩu, nên đủ điều kiện nhận tài trợ STEP.",
    "You are a small or emerging business":
      "Bạn là doanh nghiệp nhỏ hoặc mới phát triển",
    "You are actively hiring": "Bạn đang tuyển dụng",
    "You are actively hiring, which makes you eligible for WOTC if you hire from qualifying groups. Note: program expired Dec 2025, monitor for reauthorization.":
      "Bạn đang tuyển dụng, nên có thể đủ điều kiện nhận WOTC nếu tuyển người thuộc các nhóm được ưu tiên. Lưu ý: chương trình đã hết hạn tháng 12 năm 2025, hãy theo dõi việc gia hạn.",
    "You conduct R&D activities": "Bạn có hoạt động R&D",
    "You export or plan to export": "Bạn xuất khẩu hoặc dự định xuất khẩu",
    "You have clean energy or sustainability initiatives":
      "Bạn có dự án năng lượng sạch hoặc phát triển bền vững",
    "You have fewer than 500 employees": "Bạn có dưới 500 nhân viên",
    "You meet the basic criteria for SBIR Phase II, but it requires a completed Phase I award.":
      "Bạn đáp ứng tiêu chí cơ bản của SBIR Giai đoạn II, nhưng cần hoàn thành khoản tài trợ Giai đoạn I trước.",
    "You operate in the clean energy industry":
      "Bạn hoạt động trong ngành năng lượng sạch",
    "You operate in the construction industry":
      "Bạn hoạt động trong ngành xây dựng",
    "You spend on R&D or product development":
      "Bạn chi tiêu cho R&D hoặc phát triển sản phẩm",
    "Your business is in a rural area": "Doanh nghiệp của bạn ở vùng nông thôn",
    "Your business ownership profile qualifies for the 8(a) Business Development Program, providing federal contracting preferences.":
      "Đặc điểm sở hữu của doanh nghiệp bạn đủ điều kiện cho Chương trình phát triển doanh nghiệp 8(a), được ưu tiên trong hợp đồng liên bang.",
    "Your company profile matches SBIR eligibility criteria. Note: program is currently paused pending reauthorization.":
      "Hồ sơ công ty của bạn đáp ứng tiêu chí SBIR. Lưu ý: chương trình đang tạm dừng chờ gia hạn.",
    "Your industry (agriculture) aligns with USDA priorities":
      "Ngành của bạn (nông nghiệp) phù hợp với ưu tiên của USDA",
    "Your industry aligns with SBIR focus areas":
      "Ngành của bạn phù hợp với lĩnh vực trọng tâm của SBIR",
    "Your rural location makes you eligible for USDA business development grants for training, technical assistance, and feasibility studies.":
      "Vì ở vùng nông thôn, bạn đủ điều kiện nhận tài trợ phát triển doanh nghiệp của USDA cho đào tạo, hỗ trợ kỹ thuật và nghiên cứu khả thi.",
    "30% of clean energy investment": "30% khoản đầu tư năng lượng sạch",
    "Federal contracting preferences": "Ưu tiên hợp đồng liên bang",
    "Tax deferral + potential exclusion": "Hoãn thuế + có thể được miễn thuế",
  },
};

const ar: CompanyMessages = {
  yes: "نعم",
  no: "لا",
  industries: {
    technology: "التكنولوجيا",
    healthcare: "الرعاية الصحية / التكنولوجيا الحيوية",
    manufacturing: "التصنيع",
    agriculture: "الزراعة / الأغذية",
    "clean-energy": "الطاقة النظيفة",
    retail: "التجزئة / التجارة الإلكترونية",
    services: "الخدمات المهنية",
    construction: "البناء",
    other: "أخرى",
  },
  steps: {
    companyName: {
      question: "ما اسم شركتك؟",
      helpText: "سنستخدمه لتخصيص نتائجك.",
      tooLong: "يجب ألا يزيد اسم الشركة عن 100 حرف",
    },
    state: {
      question: "في أي ولاية يقع المقر الرئيسي لشركتك؟",
      helpText:
        "كثير من البرامج تختلف حسب الولاية. نحتاج هذه المعلومة لنجد لك نتائج دقيقة.",
    },
    industry: { question: "في أي مجال تعمل شركتك؟" },
    companyAge: {
      question: "منذ متى تأسست شركتك؟",
      helpText:
        "بعض البرامج مخصصة للشركات الناشئة، وبعضها يتطلب سنوات من العمل.",
      lessThan1: "أقل من سنة",
      y1to5: "1-5 سنوات",
      y5to10: "5-10 سنوات",
      y10plus: "أكثر من 10 سنوات",
    },
    employeeCount: { question: "كم عدد موظفيك؟" },
    annualRevenue: {
      question: "ما إيراداتك السنوية تقريبًا؟",
      helpText: "يساعدنا هذا على تقدير قيمة البرامج. إجابتك تبقى خاصة.",
      under250k: "أقل من $250K",
    },
    hasRnd: {
      question: "هل تنفق على البحث والتطوير (R&D) أو تطوير المنتجات؟",
      helpText:
        "يشمل ذلك تطوير البرمجيات والهندسة وتصميم المنتجات وتحسين العمليات والبحث العلمي.",
    },
    rndPercentage: {
      question:
        "ما النسبة التقريبية من الإيرادات التي تذهب إلى البحث والتطوير؟",
      helpText:
        "يكفي تقدير تقريبي. يساعدنا هذا على حساب الإعفاء الضريبي للبحث والتطوير.",
      under5: "أقل من 5%",
    },
    ownership: {
      question: "هل تنطبق على ملكية شركتك أي من هذه الصفات؟",
      helpText:
        "بعض البرامج الفيدرالية تعطي أفضلية في العقود. اختر كل ما ينطبق.",
      minority: "مملوكة لأقلية (51% أو أكثر)",
      woman: "مملوكة لامرأة (51% أو أكثر)",
      veteran: "مملوكة لمحارب قديم",
      none: "لا شيء مما سبق / أفضل عدم الإجابة",
    },
    isRural: {
      question: "هل تقع شركتك في منطقة ريفية؟",
      helpText:
        "الريف يعني خارج المدن التي يزيد عدد سكانها عن 50,000 نسمة. لدى USDA منح مخصصة للشركات الريفية.",
      notSure: "لست متأكدًا",
    },
    exports: {
      question: "هل تصدّر أو تخطط لتصدير منتجات أو خدمات إلى الخارج؟",
      yesExport: "نعم، نحن نصدّر",
      planning: "نخطط لذلك",
    },
    hiring: {
      question: "هل توظف حاليًا؟",
      helpText:
        "هناك عدة برامج تقدم إعفاءات ضريبية ومنح تدريب لأصحاب العمل الذين يوظفون.",
      yesActive: "نعم، نوظف الآن",
      planning: "نخطط للتوظيف قريبًا",
    },
    cleanEnergy: {
      question: "هل لديك مبادرات في الطاقة النظيفة أو الاستدامة؟",
      helpText:
        "ألواح شمسية، أو سيارات كهربائية، أو مبانٍ موفرة للطاقة، أو مشاريع طاقة متجددة، وغير ذلك.",
      considering: "نفكر في ذلك",
    },
  },
  chat: {
    title: "فحص أهلية الشركات",
    restart: "البدء من جديد",
    progressLabel: "تقدم الفحص",
    conversationLabel: "المحادثة",
    welcome:
      "مرحبًا! سأساعدك في العثور على المنح الحكومية والإعفاءات الضريبية والحوافز لشركتك. يستغرق ذلك نحو 3 دقائق.",
    privacy: "إجاباتك خاصة ولن تتم مشاركتها. لنرَ ما يمكنك التأهل له.",
    calculating: "رائع، أصبح لدي ملف شركتك. سأبحث الآن عن البرامج المناسبة...",
    foundOne: "أخبار سارة! وجدنا برنامجًا واحدًا قد تكون {company} مؤهلة له.",
    foundOther: "أخبار سارة! وجدنا {count} برامج قد تكون {company} مؤهلة لها.",
    signupPrompt:
      "أنشئ حسابًا مجانيًا لحفظ نتائجك والحصول على خطوات تالية مخصصة لك.",
    noMatches:
      "بناءً على المعلومات المقدمة، لم نجد برامج مناسبة بشكل قوي الآن. قد يتغير هذا عند الإعلان عن برامج جديدة.",
    restartMessage: "لنبدأ من جديد. سأطرح عليك الأسئلة نفسها مرة أخرى.",
    checkEmail: "تحقق من بريدك الإلكتروني. أرسلنا لك رابط دخول لعرض نتائجك.",
    sentTo: "أُرسل إلى",
    sending: "جارٍ الإرسال...",
    resendIn: "إعادة إرسال الرابط بعد {seconds} ث",
    resendLink: "إعادة إرسال الرابط",
    emailPlaceholder: "you@example.com",
    emailLabel: "البريد الإلكتروني",
    sendingLink: "جارٍ إرسال الرابط...",
    createAccount: "إنشاء حساب",
    skipForNow: "تخطَّ الآن",
    valueNote:
      "بعض البرامج تدفع مرة واحدة وبعضها يتكرر كل عام. الإعفاءات المحسوبة كنسبة مئوية أو لكل وحدة غير مشمولة في هذا المجموع.",
    estimatedAcrossOne: "القيمة المقدرة لبرنامج واحد",
    estimatedAcrossOther: "القيمة المقدرة لـ {count} برامج",
    more: "+{count} أخرى",
    preliminary:
      "هذه نتائج أولية. تأكد من الأهلية لدى الجهات التي تدير البرامج.",
  },
  panel: {
    tagline: "دليل المنح، مصمم لشركتك",
    title: "إليك ما سيحدث الآن",
    intro:
      "محادثة قصيرة عن شركتك. نراجع أكثر من 20 برنامجًا فيدراليًا وعلى مستوى الولاية لنجد ما يناسبك.",
    step: "الخطوة {n}",
    step1Label: "أخبرنا عن شركتك",
    step1Desc: "المجال والحجم والإيرادات وطبيعة عملك. يستغرق نحو 3 دقائق.",
    step2Label: "نراجع أكثر من 20 برنامجًا",
    step2Desc:
      "منح فيدرالية وإعفاءات ضريبية وحوافز الولاية وأفضلية في العقود، كلها مطابقة لملفك.",
    step3Label: "اطّلع على النتائج",
    step3Desc: "اعرض كل برنامج تتأهل له، مع القيم المقدرة والخطوات التالية.",
    privacyNote:
      "تُحفظ معلومات شركتك على جهازك فقط ولا تُرسل أبدًا إلى أي خادم. هذه أداة فحص وليست طلبًا رسميًا.",
    scansPrefix: "يراجع",
    scansHighlight: "أكثر من 20 برنامجًا فيدراليًا وعلى مستوى الولاية",
    scansSuffix:
      "منها الإعفاء الضريبي للبحث والتطوير وSBIR وWOTC وتدريب القوى العاملة وغيرها.",
  },
  results: {
    programsMatched: "البرامج المطابقة",
    programOne: "برنامج",
    programOther: "برامج",
    across: "تشمل المنح والإعفاءات الضريبية والحوافز وأفضلية العقود",
    matchedAgainst: "تمت المطابقة مع ملف شركتك",
    stickyOne: "برنامج واحد مطابق",
    stickyOther: "{count} برامج مطابقة",
    whyYouQualify: "لماذا أنت مؤهل",
    nextSteps: "الخطوات التالية",
    notEligible: "غير مؤهل حاليًا ({count} برامج)",
    updateInfo: "تحديث معلومات الشركة",
    disclaimer:
      "هذه نتائج أولية مبنية على المعلومات التي قدمتها. الجهة التي تدير كل برنامج هي التي تحدد الأهلية الفعلية. لا تضمن Benefind الأهلية أو المبالغ. استشر مستشارًا ضريبيًا قبل المطالبة بالإعفاءات الضريبية.",
    categories: {
      "tax-credit": "الإعفاءات الضريبية",
      grant: "المنح",
      incentive: "الحوافز",
      contracting: "العقود الحكومية",
    },
    statuses: { active: "نشط", paused: "متوقف مؤقتًا", expired: "منتهي" },
  },
  templates: {
    estimatedHires: "يُقدّر {n} من الموظفين الجدد المؤهلين سنويًا",
    industryAlignsSbir: "مجالك ({industry}) يتوافق مع مجالات تركيز SBIR",
    stateHasProgram: "لدى {state} برنامج {name}",
    stateOffers:
      "ولايتك ({state}) تقدم برنامج {name} بما يصل إلى {amount} لكل موظف.",
    applyThrough: "قدّم طلبك عبر برنامج {name}",
    upTo: "حتى {amount}",
    perYear: "{amount}/سنة",
    perSqFt: "{amount}/قدم مربع",
  },
  programs: {
    "rnd-tax-credit": {
      name: "الإعفاء الضريبي للبحث والتطوير (IRC القسم 41)",
      shortName: "الإعفاء الضريبي للبحث والتطوير",
      description:
        "إعفاء ضريبي فيدرالي دائم للشركات التي تستثمر في البحث أو تطوير المنتجات أو تحسين العمليات. حتى 20% من نفقات البحث والتطوير المؤهلة.",
      agency: "IRS",
      deadlineInfo: "يُقدَّم مع الإقرار الضريبي السنوي",
    },
    "state-workforce-training": {
      name: "منح الولاية لتدريب القوى العاملة",
      shortName: "تدريب القوى العاملة",
      description:
        "منح تموّلها الولاية لمساعدة الشركات على تدريب الموظفين الحاليين والجدد. تقدم معظم الولايات $3K-$10K لكل موظف، بحد أقصى $50K-$250K لكل شركة.",
      agency: "وكالة القوى العاملة في الولاية",
      deadlineInfo: "يختلف حسب الولاية. معظمها يقبل الطلبات طوال العام.",
    },
    wotc: {
      name: "الإعفاء الضريبي لفرص العمل (WOTC)",
      shortName: "WOTC",
      description:
        "إعفاء ضريبي عند توظيف أشخاص من فئات محددة (المحاربون القدامى، ومستفيدو SNAP، وأصحاب السوابق، وغيرهم). حتى $2,400-$9,600 لكل موظف مؤهل.",
      agency: "IRS / وكالة القوى العاملة في الولاية",
      deadlineInfo: "انتهى في 31 ديسمبر 2025. تابع احتمال تجديده.",
    },
    "sbir-phase-i": {
      name: "أبحاث الابتكار للشركات الصغيرة (SBIR) المرحلة الأولى",
      shortName: "SBIR المرحلة الأولى",
      description:
        "منح فيدرالية للشركات الصغيرة لدراسة جدوى الأفكار المبتكرة. منح من $50K إلى $305K من 11 وكالة فيدرالية.",
      agency: "عدة جهات (NSF وNIH وDOE وDOD وغيرها)",
      deadlineInfo:
        "متوقف مؤقتًا حتى يجدده الكونغرس. تابع SBIR.gov لمعرفة المستجدات.",
    },
    "sbir-phase-ii": {
      name: "أبحاث الابتكار للشركات الصغيرة (SBIR) المرحلة الثانية",
      shortName: "SBIR المرحلة الثانية",
      description:
        "تمويل كامل للبحث والتطوير للشركات التي أكملت المرحلة الأولى. منح من $500K إلى $2.1M على مدى 1-3 سنوات.",
      agency: "عدة جهات (NSF وNIH وDOE وDOD وغيرها)",
      deadlineInfo: "يتطلب إكمال المرحلة الأولى. متوقف مؤقتًا حاليًا.",
    },
    "clean-energy-itc": {
      name: "الإعفاء الضريبي للاستثمار في الطاقة النظيفة (القسم 48)",
      shortName: "ITC للطاقة النظيفة",
      description:
        "إعفاء ضريبي فيدرالي بنسبة 30% على الاستثمار في الطاقة الشمسية وطاقة الرياح والطاقة الحرارية الأرضية وتخزين البطاريات وغيرها من أصول الطاقة النظيفة. إعفاءات إضافية للمكوّن المحلي ولمواقع مجتمعات الطاقة.",
      agency: "IRS",
    },
    "step-export": {
      name: "برنامج توسيع التجارة في الولايات (STEP)",
      shortName: "منحة STEP للتصدير",
      description:
        "منح تموّلها SBA عبر حكومات الولايات لمساعدة الشركات الصغيرة على دخول أسواق التصدير أو التوسع فيها. تغطي المعارض التجارية والتسويق والتوطين.",
      agency: "SBA (عبر وكالات الولايات)",
      deadlineInfo: "يختلف حسب الولاية. عادةً هناك دورة تقديم سنوية.",
    },
    "opportunity-zones": {
      name: "حوافز مناطق الفرص المؤهلة",
      shortName: "مناطق الفرص",
      description:
        "حوافز ضريبية لاستثمار الأرباح الرأسمالية في مجتمعات محددة منخفضة الدخل. تشمل تأجيل الضريبة واحتمال إعفاء الأرباح على استثمارات OZ المحتفظ بها 10 سنوات أو أكثر.",
      agency: "IRS",
      deadlineInfo:
        "لا يوجد موعد نهائي. مُدّد البرنامج إلى أجل غير مسمى بموجب قانون One Big Beautiful Bill Act.",
    },
    "sba-8a": {
      name: "برنامج تطوير الأعمال 8(a)",
      shortName: "برنامج 8(a) من SBA",
      description:
        "برنامج فيدرالي مدته تسع سنوات يقدم أفضلية في العقود وإرشادًا ودعمًا لتطوير الأعمال للشركات الصغيرة المحرومة اجتماعيًا واقتصاديًا.",
      agency: "SBA",
    },
    "wosb-contracting": {
      name: "العقود الفيدرالية للشركات الصغيرة المملوكة لنساء",
      shortName: "عقود WOSB",
      description:
        "أفضلية في العقود الفيدرالية للشركات الصغيرة المملوكة لنساء. تستهدف الحكومة توجيه 5% من قيمة العقود الفيدرالية إلى شركات WOSB.",
      agency: "SBA",
    },
    "section-179d": {
      name: "خصم المباني التجارية الموفرة للطاقة (القسم 179D)",
      shortName: "القسم 179D",
      description:
        "خصم ضريبي فيدرالي على تحسينات توفير الطاقة في المباني التجارية. من $0.59 إلى $1.19 لكل قدم مربع حسب مقدار توفير الطاقة.",
      agency: "IRS",
      deadlineInfo: "يجب أن يبدأ البناء قبل 30 يونيو 2026 (شرط الإنهاء).",
    },
    "usda-rural-business": {
      name: "منح USDA لتطوير الأعمال الريفية",
      shortName: "منح USDA الريفية",
      description:
        "منح تدعم التنمية الاقتصادية وخلق فرص العمل في المناطق الريفية. تغطي تدريب الأعمال والمساعدة الفنية ودراسات الجدوى وحاضنات الأعمال.",
      agency: "التنمية الريفية في USDA",
      deadlineInfo: "عادةً من مايو إلى يونيو كل عام.",
    },
  },
  phrases: {
    "Apply for STEP funding for export activities (shows, marketing, localization)":
      "قدّم طلبًا لتمويل STEP لأنشطة التصدير (المعارض والتسويق والتوطين)",
    "Apply for training reimbursement grants":
      "قدّم طلبًا لمنح استرداد تكاليف التدريب",
    "Apply through the SBA 8(a) portal (certify.sba.gov)":
      "قدّم طلبك عبر بوابة 8(a) التابعة لـ SBA (certify.sba.gov)",
    "As a startup (< 5 years), you can offset up to $250K in payroll taxes":
      "بصفتك شركة ناشئة (أقل من 5 سنوات)، يمكنك خصم ما يصل إلى $250K من ضرائب الرواتب",
    "As a women-owned small business, you can access set-aside federal contracts targeting 5% of contracting dollars.":
      "بصفتك شركة صغيرة مملوكة لامرأة، يمكنك الوصول إلى عقود فيدرالية مخصصة تستهدف 5% من قيمة العقود.",
    "Available to any business or investor in designated zones":
      "متاح لأي شركة أو مستثمر في المناطق المحددة",
    "Begin construction before June 30, 2026 deadline":
      "ابدأ البناء قبل الموعد النهائي في 30 يونيو 2026",
    "Budget for 1-3 year research timeline":
      "ضع ميزانية لفترة بحث من 1-3 سنوات",
    "Capital gains invested in QOFs get tax deferral and potential exclusion after 10 years":
      "الأرباح الرأسمالية المستثمرة في QOF تحصل على تأجيل ضريبي واحتمال إعفاء بعد 10 سنوات",
    "Check eligibility at rd.usda.gov/eligibility (address lookup)":
      "تحقق من الأهلية على rd.usda.gov/eligibility (البحث بالعنوان)",
    "Check for domestic content bonus (10% additional credit)":
      "تحقق من مكافأة المكوّن المحلي (إعفاء إضافي بنسبة 10%)",
    "Check if your business is in an Opportunity Zone at opportunityzones.hud.gov":
      "تحقق مما إذا كانت شركتك في منطقة فرص على opportunityzones.hud.gov",
    "Check if your location qualifies as an energy community (10% bonus)":
      "تحقق مما إذا كان موقعك يُعد من مجتمعات الطاقة (مكافأة 10%)",
    "Companies investing in clean energy property qualify for a 30% investment tax credit, with additional bonuses possible.":
      "الشركات التي تستثمر في أصول الطاقة النظيفة مؤهلة لإعفاء ضريبي على الاستثمار بنسبة 30%، مع احتمال الحصول على مكافآت إضافية.",
    "Companies spending on R&D, product development, or process improvement qualify for this permanent federal credit.":
      "الشركات التي تنفق على البحث والتطوير أو تطوير المنتجات أو تحسين العمليات مؤهلة لهذا الإعفاء الفيدرالي الدائم.",
    "Complete a SBIR Phase I award first":
      "أكمل أولًا منحة SBIR للمرحلة الأولى",
    "Connect with a mentor through the SBA mentor-protege program":
      "تواصل مع مرشد عبر برنامج الإرشاد التابع لـ SBA",
    "Consult a tax advisor for optimal credit structure":
      "استشر مستشارًا ضريبيًا للاستفادة من الإعفاء بأفضل طريقة",
    "Contact your local Small Business Development Center (SBDC)":
      "تواصل مع مركز تطوير الأعمال الصغيرة (SBDC) المحلي",
    "Contact your local USDA Rural Development office":
      "تواصل مع مكتب التنمية الريفية التابع لـ USDA في منطقتك",
    "Contact your state international trade office":
      "تواصل مع مكتب التجارة الدولية في ولايتك",
    "Contact your state workforce development agency":
      "تواصل مع وكالة تنمية القوى العاملة في ولايتك",
    "Continue screening to protect future eligibility":
      "استمر في فحص الموظفين الجدد للحفاظ على أهليتك مستقبلًا",
    "Document all qualifying R&D activities (four-part test)":
      "وثّق جميع أنشطة البحث والتطوير المؤهلة (اختبار الأجزاء الأربعة)",
    "Document training costs for reimbursement":
      "وثّق تكاليف التدريب لاستردادها",
    "Ensure 25% minimum energy savings threshold is met":
      "تأكد من تحقيق توفير في الطاقة لا يقل عن 25%",
    "Ensure your products/services have 51%+ US content":
      "تأكد من أن منتجاتك أو خدماتك تحتوي على 51% أو أكثر من مكوّن أمريكي",
    "File Form 6765 with your annual tax return":
      "قدّم النموذج 6765 مع إقرارك الضريبي السنوي",
    "File Form 8974 to offset payroll taxes (startup benefit)":
      "قدّم النموذج 8974 لخصم ضرائب الرواتب (ميزة للشركات الناشئة)",
    "Get energy modeling certification from qualified professional":
      "احصل على شهادة نمذجة الطاقة من مختص مؤهل",
    "Identify employee training needs and programs":
      "حدد احتياجات تدريب الموظفين والبرامج المناسبة",
    "Identify qualifying clean energy property investments":
      "حدد استثمارات أصول الطاقة النظيفة المؤهلة",
    "Identify qualifying improvements (lighting, HVAC, building envelope)":
      "حدد التحسينات المؤهلة (الإضاءة، والتدفئة والتكييف، وغلاف المبنى)",
    "Identify specific grant programs (Enterprise or Opportunity)":
      "حدد برامج المنح المناسبة (Enterprise أو Opportunity)",
    "Identify upcoming international trade shows in your industry":
      "ابحث عن المعارض التجارية الدولية القادمة في مجالك",
    "Identify which agency aligns with your research focus":
      "حدد الجهة التي تتوافق مع مجال بحثك",
    "If yes, consult a tax advisor about Qualified Opportunity Fund structure":
      "إذا كانت كذلك، استشر مستشارًا ضريبيًا بشأن هيكل صندوق الفرص المؤهل",
    "If you own or improve commercial buildings with energy-efficient systems, you may qualify. Note: construction must begin by June 30, 2026.":
      "إذا كنت تملك مباني تجارية أو تحسّنها بأنظمة موفرة للطاقة، فقد تكون مؤهلًا. ملاحظة: يجب أن يبدأ البناء قبل 30 يونيو 2026.",
    "Monitor SBIR.gov for reauthorization and new solicitations":
      "تابع SBIR.gov لمعرفة التجديد والإعلانات الجديدة",
    "Monitor for congressional reauthorization (may be retroactive)":
      "تابع تجديد الكونغرس للبرنامج (قد يكون بأثر رجعي)",
    "Most states offer workforce training grants to all employers":
      "تقدم معظم الولايات منحًا لتدريب القوى العاملة لجميع أصحاب العمل",
    "Nearly every state offers workforce training grants. Contact your state workforce agency for specific programs.":
      "تقدم كل الولايات تقريبًا منحًا لتدريب القوى العاملة. تواصل مع وكالة القوى العاملة في ولايتك لمعرفة البرامج المتاحة.",
    "Once certified, access sole-source and set-aside federal contracts":
      "بعد الحصول على الشهادة، يمكنك الوصول إلى العقود الفيدرالية المباشرة والمخصصة",
    "Opportunity Zone incentives may apply if your business is located in or you invest in a designated Opportunity Zone. Check the OZ map for your area.":
      "قد تنطبق حوافز مناطق الفرص إذا كانت شركتك تقع في منطقة فرص محددة أو كنت تستثمر فيها. راجع خريطة OZ لمنطقتك.",
    "Owned by socially disadvantaged individual(s)":
      "مملوكة لشخص أو أشخاص محرومين اجتماعيًا",
    "Prepare a Phase I proposal (feasibility study, 6-18 months)":
      "جهّز مقترح المرحلة الأولى (دراسة جدوى، 6-18 شهرًا)",
    "Prepare a Phase II proposal with full R&D plan":
      "جهّز مقترح المرحلة الثانية مع خطة بحث وتطوير كاملة",
    "Prepare a training plan for new and existing employees":
      "جهّز خطة تدريب للموظفين الجدد والحاليين",
    "Prepare a training plan with costs and timeline":
      "جهّز خطة تدريب تتضمن التكاليف والجدول الزمني",
    "Prepare application with business plan and economic impact data":
      "جهّز الطلب مع خطة عمل وبيانات عن الأثر الاقتصادي",
    "Prepare financial documents, tax returns, and ownership documentation":
      "جهّز المستندات المالية والإقرارات الضريبية ووثائق الملكية",
    "Register on SAM.gov for federal contracting":
      "سجّل في SAM.gov للتعاقد الفيدرالي",
    "Register on SBIR.gov and SAM.gov (required)":
      "سجّل في SBIR.gov وSAM.gov (إلزامي)",
    "Rural areas are more likely to contain Opportunity Zones":
      "المناطق الريفية أكثر احتمالًا لأن تضم مناطق فرص",
    "SBIR Phase II requires fewer than 500 employees and active R&D.":
      "تتطلب SBIR المرحلة الثانية أقل من 500 موظف ونشاطًا قائمًا في البحث والتطوير.",
    "SBIR is for companies conducting research and development.":
      "برنامج SBIR مخصص للشركات التي تجري أبحاثًا وتطويرًا.",
    "SBIR requires fewer than 500 employees.": "يتطلب SBIR أقل من 500 موظف.",
    "STEP grants are for companies that export or plan to export products/services.":
      "منح STEP مخصصة للشركات التي تصدّر أو تخطط لتصدير منتجات أو خدمات.",
    "STEP is limited to small businesses (fewer than 500 employees).":
      "برنامج STEP مقتصر على الشركات الصغيرة (أقل من 500 موظف).",
    "Screen all new hires using IRS Form 8850 within 28 days of start":
      "افحص كل موظف جديد باستخدام نموذج IRS رقم 8850 خلال 28 يومًا من بدء عمله",
    "Search for WOSB set-aside contracts on SAM.gov":
      "ابحث عن العقود المخصصة لـ WOSB على SAM.gov",
    "Search your state workforce agency website for training grants":
      "ابحث عن منح التدريب في موقع وكالة القوى العاملة في ولايتك",
    "Self-certify as WOSB through certify.sba.gov":
      "سجّل شركتك ذاتيًا كـ WOSB عبر certify.sba.gov",
    "Small business with fewer than 500 employees":
      "شركة صغيرة لديها أقل من 500 موظف",
    "Submit to your state workforce agency for certification":
      "أرسله إلى وكالة القوى العاملة في ولايتك للحصول على الشهادة",
    "The 8(a) program is for small businesses only.":
      "برنامج 8(a) مخصص للشركات الصغيرة فقط.",
    "The 8(a) program requires ownership by socially disadvantaged individuals (minority, veteran, or other qualifying groups).":
      "يتطلب برنامج 8(a) أن تكون الشركة مملوكة لأشخاص محرومين اجتماعيًا (أقليات أو محاربين قدامى أو فئات مؤهلة أخرى).",
    "This credit requires R&D or product development spending.":
      "يتطلب هذا الإعفاء إنفاقًا على البحث والتطوير أو تطوير المنتجات.",
    "This credit requires clean energy investments or operations.":
      "يتطلب هذا الإعفاء استثمارات أو أنشطة في الطاقة النظيفة.",
    "This deduction applies to commercial building energy efficiency improvements.":
      "ينطبق هذا الخصم على تحسينات كفاءة الطاقة في المباني التجارية.",
    "This program requires 51%+ woman-owned businesses.":
      "يتطلب هذا البرنامج أن تكون الشركة مملوكة لنساء بنسبة 51% أو أكثر.",
    "Track employee time spent on R&D projects":
      "سجّل الوقت الذي يقضيه الموظفون في مشاريع البحث والتطوير",
    "USDA Rural Business grants are for businesses in rural areas (outside cities with 50,000+ population).":
      "منح USDA للأعمال الريفية مخصصة للشركات في المناطق الريفية (خارج المدن التي يزيد سكانها عن 50,000 نسمة).",
    "WOSB contracting is for small businesses only.":
      "عقود WOSB مخصصة للشركات الصغيرة فقط.",
    "WOTC applies to employers who are actively hiring.":
      "ينطبق WOTC على أصحاب العمل الذين يوظفون حاليًا.",
    "Woman-owned business": "شركة مملوكة لامرأة",
    "Workforce training grants are available even for training existing employees, but hiring companies get higher priority.":
      "منح تدريب القوى العاملة متاحة حتى لتدريب الموظفين الحاليين، لكن الشركات التي توظف تحصل على أولوية أعلى.",
    "You are a small business (<500 employees)":
      "شركتك صغيرة (أقل من 500 موظف)",
    "You are a small business that exports or plans to export, making you eligible for STEP grants.":
      "شركتك صغيرة وتصدّر أو تخطط للتصدير، لذا فهي مؤهلة لمنح STEP.",
    "You are a small or emerging business": "شركتك صغيرة أو ناشئة",
    "You are actively hiring": "أنت توظف حاليًا",
    "You are actively hiring, which makes you eligible for WOTC if you hire from qualifying groups. Note: program expired Dec 2025, monitor for reauthorization.":
      "أنت توظف حاليًا، لذا قد تكون مؤهلًا لـ WOTC إذا وظفت أشخاصًا من الفئات المؤهلة. ملاحظة: انتهى البرنامج في ديسمبر 2025، تابع احتمال تجديده.",
    "You conduct R&D activities": "تقوم بأنشطة بحث وتطوير",
    "You export or plan to export": "تصدّر أو تخطط للتصدير",
    "You have clean energy or sustainability initiatives":
      "لديك مبادرات في الطاقة النظيفة أو الاستدامة",
    "You have fewer than 500 employees": "لديك أقل من 500 موظف",
    "You meet the basic criteria for SBIR Phase II, but it requires a completed Phase I award.":
      "تستوفي المعايير الأساسية لـ SBIR المرحلة الثانية، لكنها تتطلب إكمال منحة المرحلة الأولى.",
    "You operate in the clean energy industry": "تعمل في مجال الطاقة النظيفة",
    "You operate in the construction industry": "تعمل في مجال البناء",
    "You spend on R&D or product development":
      "تنفق على البحث والتطوير أو تطوير المنتجات",
    "Your business is in a rural area": "تقع شركتك في منطقة ريفية",
    "Your business ownership profile qualifies for the 8(a) Business Development Program, providing federal contracting preferences.":
      "ملكية شركتك تؤهلها لبرنامج تطوير الأعمال 8(a)، الذي يقدم أفضلية في العقود الفيدرالية.",
    "Your company profile matches SBIR eligibility criteria. Note: program is currently paused pending reauthorization.":
      "ملف شركتك يطابق معايير أهلية SBIR. ملاحظة: البرنامج متوقف مؤقتًا حتى يتم تجديده.",
    "Your industry (agriculture) aligns with USDA priorities":
      "مجالك (الزراعة) يتوافق مع أولويات USDA",
    "Your industry aligns with SBIR focus areas":
      "مجالك يتوافق مع مجالات تركيز SBIR",
    "Your rural location makes you eligible for USDA business development grants for training, technical assistance, and feasibility studies.":
      "موقعك الريفي يجعلك مؤهلًا لمنح USDA لتطوير الأعمال، للتدريب والمساعدة الفنية ودراسات الجدوى.",
    "30% of clean energy investment": "30% من الاستثمار في الطاقة النظيفة",
    "Federal contracting preferences": "أفضلية في العقود الفيدرالية",
    "Tax deferral + potential exclusion": "تأجيل ضريبي + احتمال إعفاء",
  },
};

export const company: Record<Locale, CompanyMessages> = { en, es, zh, vi, ar };
