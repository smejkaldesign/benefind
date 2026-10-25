import type { Locale } from "../types";

const en = {
  shared: {
    breadcrumbTools: "Tools",
    personOne: "{n} person",
    personOther: "{n} people",
    perMonth: "/mo",
    perYear: "/yr",
    state: "State",
    selectState: "Select your state",
    householdSize: "Household size",
    eg: "e.g. {value}",
    faqTitle: "Frequently Asked Questions",
    startFullScreening: "Start full screening for exact results",
  },
  index: {
    eyebrow: "[Free Calculators]",
    title: "Know before you apply.",
    intro:
      "Instant estimates for the programs that matter most. No account required. Full screenings available when you're ready.",
    snap: {
      label: "[SNAP]",
      title: "SNAP Benefit Calculator",
      description:
        "Estimate your monthly food stamp benefit in under 60 seconds. Enter household size, income, and state to see how much you could receive.",
      badge: "Free food assistance",
      cta: "Calculate SNAP benefits",
    },
    medicaid: {
      label: "[Medicaid]",
      title: "Medicaid Eligibility Estimator",
      description:
        "Find out if your income qualifies for Medicaid in your state. Expansion and non-expansion states handled separately.",
      badge: "Free health coverage",
      cta: "Check Medicaid eligibility",
    },
    rd: {
      label: "[R&D Tax Credit]",
      title: "R&D Tax Credit Calculator",
      description:
        "Estimate your federal R&D tax credit using the ASC method. Startups may qualify for the payroll tax offset. Find out instantly.",
      badge: "Business tax savings",
      cta: "Calculate R&D credit",
    },
  },
  snap: {
    breadcrumb: "SNAP Calculator",
    eyebrow: "[SNAP]",
    title: "SNAP Benefit Calculator 2026",
    intro:
      "Estimate your monthly food stamp benefit in under 60 seconds. Enter your household details to see how much you could receive and whether you are likely to qualify.",
    howTitle: "How SNAP Benefits Are Calculated",
    howP1:
      "The Supplemental Nutrition Assistance Program (SNAP) uses a two-step formula to determine both eligibility and benefit amount. First, your household must pass the gross income test. Then, your actual benefit is calculated from your net income after allowable deductions.",
    howP2:
      "The core formula is straightforward: your estimated monthly benefit equals the maximum benefit for your household size minus 30% of your net income. The maximum benefit is set each fiscal year by the USDA and adjusts for cost of living. In 2026, a family of four can receive up to $975 per month.",
    howP3:
      "Net income is not the same as gross income. Several deductions are applied before the 30% calculation runs, which means your actual benefit is usually higher than you might expect if you calculate it from gross income alone. Understanding these deductions is the single most important thing you can do to maximize your benefit.",
    limitsTitle: "SNAP Income Limits by Household Size (2026)",
    limitsIntro:
      "The gross income limit is 130% of the federal poverty level. Households with an elderly (60+) or disabled member are exempt from the gross income test and only need to pass the net income test at 100% FPL.",
    colSize: "Size",
    colGross: "Gross Limit (130%)",
    colNet: "Net Limit (100%)",
    colMax: "Max Benefit",
    eachAdditional: "Each additional",
    limitsFootnote:
      "* Limits for 48 contiguous states and DC. Alaska and Hawaii have higher limits.",
    deductionsTitle: "SNAP Deductions Explained",
    deductionsIntro:
      "Deductions are subtracted from your gross income before the benefit formula runs. The more deductions you qualify for, the higher your estimated benefit. Many households miss out on money because they do not claim every deduction they are entitled to.",
    deductions: [
      {
        title: "Standard Deduction",
        desc: "All households receive a standard deduction based on household size. In 2026, it ranges from $204 for 1-4 person households up to $409 for 10-person households. This deduction is automatic and requires no documentation.",
      },
      {
        title: "Earned Income Deduction",
        desc: "If anyone in your household earns wages or self-employment income, 20% of that earned income is deducted. This rewards working households by reducing their countable income and increasing their benefit.",
      },
      {
        title: "Shelter Deduction",
        desc: "If your shelter costs (rent, mortgage, utilities) exceed 50% of your net income after other deductions, the excess counts as a shelter deduction. For most households this is capped at $672/month in 2026. There is no cap for elderly or disabled households.",
      },
      {
        title: "Dependent Care Deduction",
        desc: "If you pay for child care or adult dependent care in order to work, look for work, or attend training, those costs are fully deductible. Keep your receipts as the state agency will ask for documentation.",
      },
      {
        title: "Child Support Deduction",
        desc: "Legally obligated child support payments made to a non-household member can be deducted from gross income. This often helps single-parent households who are paying support for children who do not live with them.",
      },
      {
        title: "Medical Expense Deduction",
        desc: "Elderly or disabled household members can deduct medical expenses that exceed $35/month. This includes prescription costs, doctor visits, health insurance premiums, and transportation to medical appointments.",
      },
    ],
    faqs: [
      {
        q: "What is the income limit for SNAP in 2026?",
        a: "For most households, gross monthly income must be at or below 130% of the federal poverty level (FPL). For a household of 4, that is $3,381/month ($40,572/year) in 2026. Households with an elderly or disabled member only need to pass the net income test at 100% FPL.",
      },
      {
        q: "How is my SNAP benefit amount calculated?",
        a: "SNAP uses a formula: start with the maximum benefit for your household size, then subtract 30% of your net income. Net income is your gross income minus standard deductions, earned income deductions (20%), and excess shelter costs.",
      },
      {
        q: "What counts as income for SNAP?",
        a: "SNAP counts most types of income including wages, self-employment, Social Security, and disability payments. It does not count Supplemental Security Income (SSI), child tax credits, or most educational assistance.",
      },
      {
        q: "What deductions can reduce my SNAP countable income?",
        a: "Standard deductions apply to all households. You also get a 20% earned income deduction if you work, a dependent care deduction if you pay for child or adult care, and a shelter deduction for housing costs that exceed half your net income.",
      },
      {
        q: "How long does SNAP approval take?",
        a: "Most states process regular SNAP applications within 30 days. If your household has very little money, you may qualify for expedited SNAP, which can be approved within 7 days.",
      },
      {
        q: "Does SNAP vary by state?",
        a: "Federal rules set income and benefit levels, but each state administers its own program. Some states have higher shelter cost caps or additional deductions. Hawaii and Alaska have separate, higher benefit levels.",
      },
      {
        q: "Can I get SNAP if I am working?",
        a: "Yes. Working households benefit from the 20% earned income deduction, which lowers countable income. Many working families, especially those with children, receive SNAP benefits.",
      },
    ],
    deepDiveEyebrow: "[Deep dive]",
    deepDiveTitle: "Want the full picture?",
    deepDiveBody:
      "Our complete guide to SNAP eligibility covers every rule, every deduction, and every state variation in detail.",
    deepDiveLink: "Read: SNAP Eligibility 2026 Complete Guide",
    cardTitle: "SNAP Benefit Estimator",
    cardDescription:
      "Estimates based on 2026 federal SNAP rules. Results are approximate.",
    householdPlaceholder: "Select household size",
    incomeLabel: "Gross monthly income ($)",
    incomeHelp: "Before taxes; include wages, benefits, and other income",
    elderlyLabel: "Elderly or disabled member",
    elderlyHelp: "Age 60+ or receiving disability benefits",
    elderlyAria: "Elderly or disabled household member",
    shelterLabel: "Monthly shelter costs ($)",
    shelterHelp: "Rent or mortgage + utilities (heat, electric, water)",
    calculate: "Calculate my estimate",
    estimatedBenefit: "Estimated benefit",
    likelihoodHigh: "High likelihood",
    likelihoodMedium: "Medium likelihood",
    likelihoodLow: "Low likelihood",
    mayNotQualify: "May not qualify",
    overLimitReason:
      "Gross income (${income}/mo) exceeds the 130% FPL limit of ${limit}/mo for a household of {size}.",
    netReason: "Based on a net income of about ${net}/mo after deductions.",
    fullScreeningHint:
      "A full screening may uncover deductions that change your result.",
    disclaimer:
      "This calculator provides estimates only and does not constitute an eligibility determination. Results may differ from official state determinations.",
  },
  medicaid: {
    breadcrumb: "Medicaid Estimator",
    eyebrow: "[Medicaid]",
    title: "Medicaid Eligibility Estimator 2026",
    intro:
      "Find out if your income qualifies for Medicaid in your state. We handle expansion and non-expansion states separately so you get an accurate picture for where you live.",
    expansionTitle: "Medicaid Expansion: What It Means for You",
    expansionP1:
      "The Affordable Care Act (ACA) gave states the option to expand Medicaid to cover adults earning up to 138% of the federal poverty level. As of 2026, 41 states and Washington DC have expanded. In expansion states, a single adult earning up to about $20,783 per year qualifies regardless of family structure or disability status.",
    expansionP2:
      "In non-expansion states, coverage for adults without children is often extremely limited or nonexistent. Many non-expansion states require disability status, pregnancy, or very low income to qualify. This creates what policy experts call the coverage gap: too much income for traditional Medicaid, too little for marketplace subsidies.",
    expansionP3:
      "The federal government continues to incentivize expansion, and several additional states have passed expansion legislation that takes effect in 2025-2026. Your state's status can change, so always verify current rules through your state Medicaid agency or a full Benefind screening.",
    limitsTitle: "Medicaid Income Limits by State Type (2026)",
    limitsIntro:
      "Income limits vary by household size, state, and whether you fall into a specific category (pregnant, disabled, child, elderly). These are the general adult thresholds:",
    colHousehold: "Household Size",
    col100: "100% FPL",
    col138: "138% FPL (Expansion)",
    col185: "185% FPL (Pregnancy)",
    limitsFootnote:
      "* Annual income figures. Alaska and Hawaii have higher FPL baselines.",
    whoTitle: "Who Qualifies for Medicaid?",
    who: [
      {
        title: "Low-Income Adults (Expansion States)",
        desc: "Adults 19-64 with income at or below 138% FPL automatically qualify in expansion states. There are no asset tests or work requirements for this group.",
      },
      {
        title: "Children (CHIP or Medicaid)",
        desc: "Children qualify at much higher income thresholds, typically 200-300% FPL, through Medicaid or the Children's Health Insurance Program (CHIP). Many states cover children up to 400% FPL.",
      },
      {
        title: "Pregnant Individuals",
        desc: "Pregnancy Medicaid typically covers income up to 185-200% FPL, sometimes higher. Coverage includes prenatal care, delivery, and postpartum care, often extended to 12 months post-delivery.",
      },
      {
        title: "People with Disabilities",
        desc: "Individuals receiving SSI (Supplemental Security Income) are typically automatically eligible for Medicaid. Those receiving SSDI may qualify after a 24-month waiting period for Medicare, but Medicaid can fill the gap.",
      },
      {
        title: "Elderly Adults (65+)",
        desc: "Seniors with limited income and assets may qualify for full Medicaid in addition to Medicare. Medicaid covers services Medicare does not, including long-term care and nursing home costs.",
      },
      {
        title: "Non-Expansion State Adults",
        desc: "Without expansion, coverage depends heavily on your category. Parents with very low income, pregnant individuals, and people with disabilities may still qualify. Childless adults often have no pathway in non-expansion states.",
      },
    ],
    faqs: [
      {
        q: "What is the income limit for Medicaid in 2026?",
        a: "In states that expanded Medicaid, adults qualify with incomes up to 138% FPL, about $20,783 per year for a single person in 2026. Non-expansion states set their own thresholds, often much lower.",
      },
      {
        q: "Which states expanded Medicaid?",
        a: "As of 2026, 41 states and DC have expanded Medicaid. States that have not expanded include Alabama, Florida, Georgia, Mississippi, South Carolina, Tennessee, Texas, Wisconsin, and Wyoming.",
      },
      {
        q: "How do I apply for Medicaid?",
        a: "You can apply through your state Medicaid agency, Healthcare.gov during open enrollment, or year-round with a qualifying life event. A Benefind screening guides you directly to your state's application portal.",
      },
      {
        q: "Does pregnancy affect Medicaid eligibility?",
        a: "Yes. Pregnant individuals typically qualify at higher income thresholds, usually 185-250% FPL. In many states, pregnancy Medicaid is available regardless of immigration status.",
      },
      {
        q: "Can I get Medicaid if I have Medicare?",
        a: "Yes. Dual-eligible individuals qualify for both. Medicaid covers Medicare premiums, copays, and services Medicare excludes, such as long-term care and dental.",
      },
    ],
    ctaEyebrow: "[Full screening]",
    ctaTitle: "Get an exact determination",
    ctaBody:
      "This estimator covers the basics. A full Benefind screening checks every Medicaid pathway, CHIP, marketplace credits, and 40+ other programs in one pass.",
    ctaLink: "Start your free screening",
    cardTitle: "Medicaid Eligibility Estimator",
    cardDescription:
      "Based on 2026 federal and state Medicaid rules. Estimates only.",
    expansionHint: "Expansion state (138% FPL threshold)",
    nonExpansionHint: "Non-expansion state (thresholds vary)",
    incomeLabel: "Annual household income ($)",
    incomeHelp: "Gross income before taxes",
    ageLabel: "Age (primary applicant)",
    pregnantLabel: "Currently pregnant",
    pregnantHelp: "Higher income thresholds may apply",
    disabilityLabel: "Has disability or receives SSI/SSDI",
    disabilityHelp: "May qualify through disability pathway",
    check: "Check eligibility",
    resultLabel: "Result",
    status: {
      likely: "Likely eligible",
      notQualify: "May not qualify",
      checkState: "Check with your state",
    },
    results: {
      noState: {
        headline: "Select a state to continue",
        detail:
          "Medicaid rules vary significantly by state. Select your state above for a personalized estimate.",
      },
      disability: {
        headline: "Likely eligible through disability pathway",
        detailExpansion:
          "People receiving SSI or SSDI benefits typically qualify for Medicaid automatically in most states, regardless of income limits. {state} is an expansion state.",
        detailNonExpansion:
          "People receiving SSI or SSDI benefits typically qualify for Medicaid automatically in most states, regardless of income limits. {state} is a non-expansion state.",
        stateDetail:
          "In {state}, individuals with a qualifying disability are often auto-enrolled in Medicaid when they receive federal disability benefits. Verify your specific benefit type with your state agency.",
      },
      pregnancy: {
        headline: "Likely eligible through pregnancy Medicaid",
        detail:
          "{state} covers pregnant individuals with incomes up to approximately 185% FPL (${limit}/year for a household of {size}). Your income appears to be within this threshold.",
        stateDetail:
          "Pregnancy Medicaid in {state} covers prenatal care, labor and delivery, and postpartum care. Coverage often continues for 60 days postpartum, with some states extending to 12 months.",
      },
      eligible: {
        headline: "Likely eligible in {state}",
        detail:
          "Your income (${income}/year) appears to be within the {state} Medicaid limit of {pct} FPL (${limit}/year for a household of {size}).",
        stateDetailExpansion:
          "{state} expanded Medicaid under the ACA, covering adults with incomes up to 138% of the federal poverty level. Children, pregnant individuals, and people with disabilities may qualify at higher thresholds.",
        stateDetailNonExpansion:
          "{state} has not expanded Medicaid. Coverage is primarily available for adults with incomes up to 100% of the federal poverty level. Children, pregnant individuals, and people with disabilities may qualify at higher thresholds.",
      },
      gap: {
        headline: "Coverage gap in {state}",
        detail:
          "Your income (${income}/year) is above the Medicaid limit in {state} but below 138% FPL. Because {state} has not expanded Medicaid, you may fall in the coverage gap.",
        stateDetail:
          "In the coverage gap, income is too high for traditional Medicaid but too low to qualify for ACA marketplace subsidies (which start at 100% FPL). Check whether {state} has any limited expansion or special programs. You may also be eligible for marketplace coverage.",
      },
      marketplace: {
        headline: "Income above Medicaid limit; marketplace may help",
        detail:
          "Your income (${income}/year) is likely above the Medicaid threshold for {state}, but you may qualify for subsidized marketplace coverage through Healthcare.gov.",
        stateDetail:
          "In {state}, households earning between 100% and 400% FPL (${low} to ${high}/year) may qualify for premium tax credits. A full Benefind screening will check marketplace eligibility as well.",
      },
      over: {
        headline: "Income likely above eligibility thresholds",
        detail:
          "Your income (${income}/year) appears to exceed Medicaid and marketplace subsidy thresholds for {state}. However, other household factors may change this.",
        stateDetail:
          "A full Benefind screening will check for other programs, including CHIP for children in the household, state-specific programs, and employer coverage alternatives.",
      },
    },
    disclaimer:
      "Estimates only. Rules change frequently. Verify eligibility with your state Medicaid agency.",
  },
  rd: {
    breadcrumb: "R&D Tax Credit Calculator",
    eyebrow: "[R&D Tax Credit]",
    title: "R&D Tax Credit Calculator 2026",
    intro:
      "Estimate your federal research and development tax credit using the Alternative Simplified Credit (ASC) method. Startups under $5M in gross receipts may be able to offset payroll taxes directly.",
    whatTitle: "What Is the R&D Tax Credit?",
    whatP1:
      "The federal Research and Development tax credit (Section 41 of the Internal Revenue Code) allows businesses to receive a dollar-for-dollar reduction in federal tax liability for qualified research activities. Unlike a deduction, which reduces taxable income, a credit directly reduces what you owe.",
    whatP2:
      "The credit was made permanent by the PATH Act of 2015 and expanded in 2023 to allow qualifying small businesses to offset up to $500,000 per year in payroll taxes. This was a major change for pre-revenue startups that historically could not use the credit because they had no income tax liability.",
    whatP3:
      "The most common calculation method is the Alternative Simplified Credit (ASC), which equals 14% of qualified research expenses (QREs) that exceed 50% of the average QREs from the three preceding years. Companies without prior QRE history use a simplified 6% rate. Most companies prefer the ASC because the Regular Credit method requires detailed records going back to the mid-1980s.",
    offsetTitle: "The Payroll Tax Offset for Startups",
    offsetP1:
      "Pre-revenue and early-stage companies often have no income tax liability, which historically made the R&D credit useless for them. The startup payroll offset changes this. If your company has less than $5 million in gross receipts and fewer than 5 years of gross receipts, you can elect to apply your R&D credit (up to $500,000) against the employer share of Social Security payroll taxes.",
    offsetP2:
      "This means every qualifying dollar of R&D spending can generate real cash savings, even if your company has never turned a profit. For a startup spending $2 million on qualifying engineering salaries, this could mean $140,000+ in annual payroll tax savings.",
    exampleEyebrow: "[Example]",
    exampleBody:
      "A 3-year-old SaaS company with $800K in engineering salaries (75% R&D), $150K in R&D cloud costs, and $1.2M in gross receipts calculates QREs of $750K. With no prior QRE history, the ASC credit is 6% of $750K = $45,000. As a qualifying startup, they apply the full $45,000 against payroll taxes, reducing their quarterly 941 payments by $45,000.",
    qreTitle: "What Counts as a Qualified Research Expense?",
    qreIntro:
      "Not all R&D spending qualifies. The IRS uses a four-part test to determine whether an activity is qualified research: it must be undertaken for a permitted purpose (developing or improving a business component), be technological in nature, eliminate uncertainty, and involve a process of experimentation.",
    qualifiesTitle: "What Qualifies",
    qualifies: [
      "Wages for engineers, scientists, and software developers engaged in qualified activities",
      "Costs of supplies and materials consumed in research",
      "65% of payments to third-party contractors for qualified research",
      "Cloud computing costs used in development and testing (may qualify)",
      "Software development for new or improved products or processes",
    ],
    notQualifiesTitle: "What Does Not Qualify",
    notQualifies: [
      "Management, marketing, and business development activities",
      "Funded research (if another party pays for it and bears the risk)",
      "Research after commercial production begins",
      "Market research, surveys, or social science research",
      "Research conducted outside the United States",
    ],
    faqs: [
      {
        q: "What is the R&D tax credit?",
        a: "The federal R&D tax credit (Section 41) lets businesses reduce their tax bill for qualified research expenses. The Alternative Simplified Credit (ASC) equals 14% of QREs above 50% of average prior-year QREs, or 6% if there is no prior history.",
      },
      {
        q: "Who qualifies for the R&D tax credit?",
        a: "Any US company with qualified research expenses may be eligible. Activities must meet the four-part test: permitted purpose, technological in nature, eliminates uncertainty, and involves experimentation. Software development and engineering commonly qualify.",
      },
      {
        q: "What is the payroll tax offset for startups?",
        a: "Qualified small businesses with less than $5M in gross receipts and no more than 5 years of gross receipts can apply up to $500,000 of their R&D credit against payroll taxes. This helps pre-revenue companies that have no income tax liability to offset.",
      },
      {
        q: "What counts as a qualified research expense (QRE)?",
        a: "QREs include wages for employees doing qualified research, supplies consumed in research, and 65% of payments to third-party contractors. Cloud costs may qualify. Management, marketing, and funded research do not qualify.",
      },
      {
        q: "What is the ASC method?",
        a: "The Alternative Simplified Credit calculates the credit as 14% of QREs above 50% of the average QREs for the prior three years. Companies with no prior QREs use a 6% rate. Most companies prefer ASC because it requires less historical documentation.",
      },
    ],
    ctaEyebrow: "[Full screening]",
    ctaTitle: "Ready for a detailed R&D analysis?",
    ctaBody:
      "This calculator gives you a rough estimate. A full Benefind company screening checks R&D credit eligibility alongside 20+ other business tax programs.",
    ctaLink: "Start company screening",
    cardTitle: "R&D Tax Credit Estimator",
    cardDescription:
      "ASC method estimate. Consult a tax professional for official calculations.",
    spendingLabel: "Annual R&D spending ($)",
    spendingHelp:
      "Total R&D budget including salaries, contractors, and supplies",
    qresLabel: "Total QREs, Qualified Research Expenses ($)",
    qresHelp:
      "Qualifying wages + supplies + 65% of contractor costs. Leave blank to estimate from spending above.",
    priorLabel: "Average QREs, prior 3 years ($)",
    priorPlaceholder: "e.g. 200000 (or 0 if startup)",
    priorHelp: "Leave blank or 0 if you have no prior QRE history",
    receiptsLabel: "Gross receipts, current year ($)",
    receiptsHelp: "Total revenue. Must be under $5M for payroll offset.",
    yearsLabel: "Years with gross receipts",
    yearsHelp: "Must be 5 or fewer years for payroll offset eligibility",
    calculate: "Calculate my credit",
    resultLabel: "Estimated R&D credit ({method})",
    methodAsc: "ASC 14%",
    methodNoHistory: "ASC 6%, no prior history",
    creditSuffix: "credit",
    offsetEligible: "Payroll offset eligible",
    offsetEligibleBody:
      "You may apply up to {amount} against payroll taxes instead of income tax.",
    offsetNotEligible: "Payroll offset: not eligible",
    offsetNotEligibleBody:
      "Credit applies against income tax liability. Unused credits carry forward 20 years.",
    notes: {
      base: "Base amount: 50% of avg prior QREs = ${amount}",
      excess: "Excess QREs above base: ${amount}",
      rate: "Credit rate: 14% of excess QREs (ASC method)",
      noHistory:
        "No prior QRE history, so the 6% rate for startups with no prior-year QREs applies",
      offset:
        "Qualifies for payroll tax offset (under $5M gross receipts, 5 years or fewer)",
      cap: "Payroll offset capped at $500,000; remainder offsets income tax",
    },
    disclaimer:
      "Estimates only. R&D credit calculations require detailed activity analysis. Consult a qualified tax professional before filing.",
  },
};

export type ToolsMessages = typeof en;

const es: ToolsMessages = {
  shared: {
    breadcrumbTools: "Herramientas",
    personOne: "{n} persona",
    personOther: "{n} personas",
    perMonth: "/mes",
    perYear: "/año",
    state: "Estado",
    selectState: "Elija su estado",
    householdSize: "Tamaño del hogar",
    eg: "p. ej., {value}",
    faqTitle: "Preguntas frecuentes",
    startFullScreening: "Haga la evaluación completa para resultados exactos",
  },
  index: {
    eyebrow: "[Calculadoras gratuitas]",
    title: "Infórmese antes de solicitar.",
    intro:
      "Cálculos al instante para los programas más importantes. No necesita crear una cuenta. Cuando esté listo, puede hacer una evaluación completa.",
    snap: {
      label: "[SNAP]",
      title: "Calculadora de beneficios de SNAP",
      description:
        "Calcule su beneficio mensual de SNAP (cupones de alimentos) en menos de 60 segundos. Ingrese el tamaño de su hogar, sus ingresos y su estado para ver cuánto podría recibir.",
      badge: "Ayuda gratuita para alimentos",
      cta: "Calcular beneficios de SNAP",
    },
    medicaid: {
      label: "[Medicaid]",
      title: "Estimador de elegibilidad para Medicaid",
      description:
        "Averigüe si sus ingresos califican para Medicaid en su estado. Tomamos en cuenta por separado los estados que ampliaron Medicaid y los que no.",
      badge: "Cobertura médica gratuita",
      cta: "Verificar elegibilidad para Medicaid",
    },
    rd: {
      label: "[Crédito fiscal por I+D]",
      title: "Calculadora del crédito fiscal por I+D",
      description:
        "Calcule su crédito fiscal federal por investigación y desarrollo (I+D) con el método ASC. Las empresas emergentes pueden calificar para aplicarlo a los impuestos sobre la nómina. Averígüelo al instante.",
      badge: "Ahorro de impuestos para empresas",
      cta: "Calcular crédito por I+D",
    },
  },
  snap: {
    breadcrumb: "Calculadora de SNAP",
    eyebrow: "[SNAP]",
    title: "Calculadora de beneficios de SNAP 2026",
    intro:
      "Calcule su beneficio mensual de SNAP (cupones de alimentos) en menos de 60 segundos. Ingrese los datos de su hogar para ver cuánto podría recibir y si es probable que califique.",
    howTitle: "Cómo se calculan los beneficios de SNAP",
    howP1:
      "El Programa de Asistencia Nutricional Suplementaria (SNAP) usa una fórmula de dos pasos para decidir si usted califica y cuánto recibe. Primero, su hogar debe pasar la prueba de ingresos brutos. Luego, su beneficio se calcula a partir de sus ingresos netos después de las deducciones permitidas.",
    howP2:
      "La fórmula básica es sencilla: su beneficio mensual estimado es el beneficio máximo para el tamaño de su hogar menos el 30% de sus ingresos netos. El USDA fija el beneficio máximo cada año fiscal y lo ajusta según el costo de vida. En 2026, una familia de cuatro puede recibir hasta $975 al mes.",
    howP3:
      "Los ingresos netos no son lo mismo que los ingresos brutos. Se aplican varias deducciones antes de calcular el 30%, por lo que su beneficio real suele ser más alto de lo que esperaría si lo calcula solo con sus ingresos brutos. Entender estas deducciones es lo más importante que puede hacer para recibir el mayor beneficio posible.",
    limitsTitle: "Límites de ingresos de SNAP según el tamaño del hogar (2026)",
    limitsIntro:
      "El límite de ingresos brutos es el 130% del nivel federal de pobreza (FPL). Los hogares con un miembro de 60 años o más o con una discapacidad no tienen que pasar la prueba de ingresos brutos; solo deben pasar la prueba de ingresos netos al 100% del FPL.",
    colSize: "Tamaño",
    colGross: "Límite bruto (130%)",
    colNet: "Límite neto (100%)",
    colMax: "Beneficio máximo",
    eachAdditional: "Cada persona adicional",
    limitsFootnote:
      "* Límites para los 48 estados contiguos y DC. Alaska y Hawái tienen límites más altos.",
    deductionsTitle: "Las deducciones de SNAP, explicadas",
    deductionsIntro:
      "Las deducciones se restan de sus ingresos brutos antes de aplicar la fórmula del beneficio. Cuantas más deducciones le correspondan, mayor será su beneficio estimado. Muchos hogares reciben menos dinero del que podrían porque no piden todas las deducciones a las que tienen derecho.",
    deductions: [
      {
        title: "Deducción estándar",
        desc: "Todos los hogares reciben una deducción estándar según su tamaño. En 2026 va desde $204 para hogares de 1 a 4 personas hasta $409 para hogares de 10 personas. Esta deducción es automática y no requiere documentos.",
      },
      {
        title: "Deducción por ingresos del trabajo",
        desc: "Si alguien en su hogar gana un sueldo o tiene ingresos por trabajo propio, se descuenta el 20% de esos ingresos. Esto ayuda a los hogares que trabajan porque baja sus ingresos contables y aumenta su beneficio.",
      },
      {
        title: "Deducción por vivienda",
        desc: "Si sus gastos de vivienda (alquiler, hipoteca, servicios) son más del 50% de sus ingresos netos después de las otras deducciones, la diferencia cuenta como deducción por vivienda. Para la mayoría de los hogares, el máximo es $672 al mes en 2026. No hay límite para hogares con personas mayores o con discapacidad.",
      },
      {
        title: "Deducción por cuidado de dependientes",
        desc: "Si paga por el cuidado de niños o de un adulto dependiente para poder trabajar, buscar trabajo o ir a una capacitación, esos gastos se pueden deducir por completo. Guarde sus recibos, porque la agencia estatal le pedirá comprobantes.",
      },
      {
        title: "Deducción por manutención de hijos",
        desc: "Los pagos de manutención de hijos que usted está obligado por ley a hacer a alguien fuera de su hogar se pueden restar de sus ingresos brutos. Esto suele ayudar a padres o madres que pagan manutención de hijos que no viven con ellos.",
      },
      {
        title: "Deducción por gastos médicos",
        desc: "Los miembros del hogar mayores o con discapacidad pueden deducir los gastos médicos que pasen de $35 al mes. Esto incluye medicinas recetadas, consultas médicas, primas de seguro médico y transporte a citas médicas.",
      },
    ],
    faqs: [
      {
        q: "¿Cuál es el límite de ingresos para SNAP en 2026?",
        a: "Para la mayoría de los hogares, los ingresos brutos mensuales deben ser iguales o menores al 130% del nivel federal de pobreza (FPL). Para un hogar de 4 personas, eso es $3,381 al mes ($40,572 al año) en 2026. Los hogares con un miembro mayor o con discapacidad solo deben pasar la prueba de ingresos netos al 100% del FPL.",
      },
      {
        q: "¿Cómo se calcula el monto de mi beneficio de SNAP?",
        a: "SNAP usa una fórmula: se empieza con el beneficio máximo para el tamaño de su hogar y se resta el 30% de sus ingresos netos. Los ingresos netos son sus ingresos brutos menos la deducción estándar, la deducción por ingresos del trabajo (20%) y los gastos de vivienda que pasen del límite.",
      },
      {
        q: "¿Qué cuenta como ingreso para SNAP?",
        a: "SNAP cuenta la mayoría de los ingresos, como sueldos, trabajo por cuenta propia, Seguro Social y pagos por discapacidad. No cuenta el Ingreso de Seguridad Suplementario (SSI), los créditos fiscales por hijos ni la mayoría de las ayudas para estudios.",
      },
      {
        q: "¿Qué deducciones pueden bajar mis ingresos contables para SNAP?",
        a: "La deducción estándar se aplica a todos los hogares. También recibe una deducción del 20% por ingresos del trabajo si trabaja, una deducción si paga por el cuidado de niños o adultos dependientes, y una deducción por gastos de vivienda que pasen de la mitad de sus ingresos netos.",
      },
      {
        q: "¿Cuánto tarda la aprobación de SNAP?",
        a: "La mayoría de los estados procesan las solicitudes regulares de SNAP en 30 días. Si su hogar tiene muy poco dinero, podría calificar para SNAP acelerado, que se puede aprobar en 7 días.",
      },
      {
        q: "¿SNAP cambia según el estado?",
        a: "Las reglas federales fijan los límites de ingresos y los montos de los beneficios, pero cada estado administra su propio programa. Algunos estados tienen límites más altos para gastos de vivienda o deducciones adicionales. Hawái y Alaska tienen montos de beneficios propios y más altos.",
      },
      {
        q: "¿Puedo recibir SNAP si trabajo?",
        a: "Sí. Los hogares que trabajan reciben la deducción del 20% por ingresos del trabajo, que baja sus ingresos contables. Muchas familias que trabajan, sobre todo las que tienen hijos, reciben SNAP.",
      },
    ],
    deepDiveEyebrow: "[Más información]",
    deepDiveTitle: "¿Quiere conocer todos los detalles?",
    deepDiveBody:
      "Nuestra guía completa sobre la elegibilidad para SNAP explica cada regla, cada deducción y cada diferencia entre estados.",
    deepDiveLink: "Lea: Guía completa de elegibilidad para SNAP 2026",
    cardTitle: "Estimador de beneficios de SNAP",
    cardDescription:
      "Cálculo basado en las reglas federales de SNAP de 2026. Los resultados son aproximados.",
    householdPlaceholder: "Elija el tamaño del hogar",
    incomeLabel: "Ingresos brutos mensuales ($)",
    incomeHelp:
      "Antes de impuestos; incluya sueldos, beneficios y otros ingresos",
    elderlyLabel: "Miembro mayor o con discapacidad",
    elderlyHelp: "De 60 años o más, o recibe beneficios por discapacidad",
    elderlyAria: "Miembro del hogar mayor o con discapacidad",
    shelterLabel: "Gastos mensuales de vivienda ($)",
    shelterHelp:
      "Alquiler o hipoteca + servicios (calefacción, electricidad, agua)",
    calculate: "Calcular mi estimado",
    estimatedBenefit: "Beneficio estimado",
    likelihoodHigh: "Probabilidad alta",
    likelihoodMedium: "Probabilidad media",
    likelihoodLow: "Probabilidad baja",
    mayNotQualify: "Es posible que no califique",
    overLimitReason:
      "Sus ingresos brutos (${income}/mes) son mayores que el límite del 130% del FPL, que es de ${limit}/mes para un hogar de {size}.",
    netReason:
      "Basado en ingresos netos de aproximadamente ${net}/mes después de las deducciones.",
    fullScreeningHint:
      "Una evaluación completa podría encontrar deducciones que cambien su resultado.",
    disclaimer:
      "Esta calculadora solo da estimados y no es una decisión oficial de elegibilidad. Los resultados pueden ser distintos de la decisión oficial de su estado.",
  },
  medicaid: {
    breadcrumb: "Estimador de Medicaid",
    eyebrow: "[Medicaid]",
    title: "Estimador de elegibilidad para Medicaid 2026",
    intro:
      "Averigüe si sus ingresos califican para Medicaid en su estado. Tomamos en cuenta por separado los estados que ampliaron Medicaid y los que no, para darle un resultado preciso según donde vive.",
    expansionTitle: "La ampliación de Medicaid: qué significa para usted",
    expansionP1:
      "La Ley de Cuidado de Salud a Bajo Precio (ACA) dio a los estados la opción de ampliar Medicaid para cubrir a adultos con ingresos de hasta el 138% del nivel federal de pobreza. En 2026, 41 estados y Washington DC lo han ampliado. En esos estados, un adulto soltero con ingresos de hasta unos $20,783 al año califica, sin importar cómo esté formada su familia ni si tiene una discapacidad.",
    expansionP2:
      "En los estados que no ampliaron Medicaid, la cobertura para adultos sin hijos suele ser muy limitada o no existe. Muchos de esos estados piden tener una discapacidad, estar embarazada o tener ingresos muy bajos para calificar. Esto crea lo que los expertos llaman la brecha de cobertura: ingresos demasiado altos para Medicaid tradicional, pero demasiado bajos para recibir subsidios del mercado de seguros.",
    expansionP3:
      "El gobierno federal sigue ofreciendo incentivos para ampliar Medicaid, y varios estados más han aprobado leyes de ampliación que entran en vigor en 2025-2026. La situación de su estado puede cambiar, así que confirme siempre las reglas actuales con la agencia de Medicaid de su estado o con una evaluación completa de Benefind.",
    limitsTitle:
      "Límites de ingresos de Medicaid según el tipo de estado (2026)",
    limitsIntro:
      "Los límites de ingresos cambian según el tamaño del hogar, el estado y si usted pertenece a un grupo específico (embarazada, con discapacidad, niño, persona mayor). Estos son los límites generales para adultos:",
    colHousehold: "Tamaño del hogar",
    col100: "100% del FPL",
    col138: "138% del FPL (ampliación)",
    col185: "185% del FPL (embarazo)",
    limitsFootnote:
      "* Cifras de ingresos anuales. Alaska y Hawái tienen niveles de pobreza (FPL) más altos.",
    whoTitle: "¿Quién califica para Medicaid?",
    who: [
      {
        title: "Adultos de bajos ingresos (estados con ampliación)",
        desc: "Los adultos de 19 a 64 años con ingresos iguales o menores al 138% del FPL califican automáticamente en los estados con ampliación. Para este grupo no hay prueba de bienes ni requisito de trabajo.",
      },
      {
        title: "Niños (CHIP o Medicaid)",
        desc: "Los niños califican con límites de ingresos mucho más altos, por lo general del 200% al 300% del FPL, mediante Medicaid o el Programa de Seguro Médico para Niños (CHIP). Muchos estados cubren a niños hasta el 400% del FPL.",
      },
      {
        title: "Personas embarazadas",
        desc: "Medicaid para embarazadas suele cubrir ingresos de hasta el 185% al 200% del FPL, a veces más. La cobertura incluye atención prenatal, el parto y la atención después del parto, muchas veces por hasta 12 meses después del nacimiento.",
      },
      {
        title: "Personas con discapacidad",
        desc: "Las personas que reciben SSI (Ingreso de Seguridad Suplementario) por lo general califican automáticamente para Medicaid. Quienes reciben SSDI pueden calificar para Medicare después de una espera de 24 meses, y Medicaid puede cubrirles mientras tanto.",
      },
      {
        title: "Personas mayores (65+)",
        desc: "Las personas mayores con ingresos y bienes limitados pueden calificar para Medicaid completo además de Medicare. Medicaid cubre servicios que Medicare no cubre, como el cuidado a largo plazo y los hogares de ancianos.",
      },
      {
        title: "Adultos en estados sin ampliación",
        desc: "Sin la ampliación, la cobertura depende mucho de su situación. Los padres con ingresos muy bajos, las personas embarazadas y las personas con discapacidad aún pueden calificar. Los adultos sin hijos muchas veces no tienen forma de calificar en estos estados.",
      },
    ],
    faqs: [
      {
        q: "¿Cuál es el límite de ingresos para Medicaid en 2026?",
        a: "En los estados que ampliaron Medicaid, los adultos califican con ingresos de hasta el 138% del FPL, unos $20,783 al año para una persona sola en 2026. Los estados sin ampliación fijan sus propios límites, muchas veces mucho más bajos.",
      },
      {
        q: "¿Qué estados ampliaron Medicaid?",
        a: "En 2026, 41 estados y DC han ampliado Medicaid. Entre los estados que no lo han ampliado están Alabama, Florida, Georgia, Misisipi, Carolina del Sur, Tennessee, Texas, Wisconsin y Wyoming.",
      },
      {
        q: "¿Cómo solicito Medicaid?",
        a: "Puede solicitarlo con la agencia de Medicaid de su estado, en Healthcare.gov durante el período de inscripción abierta, o en cualquier momento del año si tiene un cambio de vida que califica. Una evaluación de Benefind le lleva directamente al sitio de solicitud de su estado.",
      },
      {
        q: "¿El embarazo cambia la elegibilidad para Medicaid?",
        a: "Sí. Las personas embarazadas suelen calificar con límites de ingresos más altos, por lo general del 185% al 250% del FPL. En muchos estados, Medicaid para embarazadas está disponible sin importar la situación migratoria.",
      },
      {
        q: "¿Puedo tener Medicaid si tengo Medicare?",
        a: "Sí. Las personas con doble elegibilidad califican para ambos. Medicaid paga las primas y copagos de Medicare, y servicios que Medicare no cubre, como el cuidado a largo plazo y el dental.",
      },
    ],
    ctaEyebrow: "[Evaluación completa]",
    ctaTitle: "Obtenga un resultado exacto",
    ctaBody:
      "Este estimador cubre lo básico. Una evaluación completa de Benefind revisa todas las formas de calificar para Medicaid, CHIP, los créditos del mercado de seguros y más de 40 programas adicionales, todo de una vez.",
    ctaLink: "Comience su evaluación gratuita",
    cardTitle: "Estimador de elegibilidad para Medicaid",
    cardDescription:
      "Basado en las reglas federales y estatales de Medicaid de 2026. Solo es un estimado.",
    expansionHint: "Estado con ampliación (límite del 138% del FPL)",
    nonExpansionHint: "Estado sin ampliación (los límites varían)",
    incomeLabel: "Ingresos anuales del hogar ($)",
    incomeHelp: "Ingresos brutos antes de impuestos",
    ageLabel: "Edad (solicitante principal)",
    pregnantLabel: "Embarazada actualmente",
    pregnantHelp: "Pueden aplicar límites de ingresos más altos",
    disabilityLabel: "Tiene una discapacidad o recibe SSI/SSDI",
    disabilityHelp: "Podría calificar por discapacidad",
    check: "Verificar elegibilidad",
    resultLabel: "Resultado",
    status: {
      likely: "Probablemente califica",
      notQualify: "Es posible que no califique",
      checkState: "Consulte con su estado",
    },
    results: {
      noState: {
        headline: "Elija un estado para continuar",
        detail:
          "Las reglas de Medicaid cambian mucho de un estado a otro. Elija su estado arriba para recibir un estimado personalizado.",
      },
      disability: {
        headline: "Probablemente califica por discapacidad",
        detailExpansion:
          "Las personas que reciben SSI o SSDI por lo general califican automáticamente para Medicaid en la mayoría de los estados, sin importar los límites de ingresos. {state} es un estado que amplió Medicaid.",
        detailNonExpansion:
          "Las personas que reciben SSI o SSDI por lo general califican automáticamente para Medicaid en la mayoría de los estados, sin importar los límites de ingresos. {state} es un estado que no amplió Medicaid.",
        stateDetail:
          "En {state}, las personas con una discapacidad que califica muchas veces quedan inscritas automáticamente en Medicaid cuando reciben beneficios federales por discapacidad. Confirme su tipo de beneficio con la agencia de su estado.",
      },
      pregnancy: {
        headline: "Probablemente califica para Medicaid por embarazo",
        detail:
          "{state} cubre a personas embarazadas con ingresos de hasta aproximadamente el 185% del FPL (${limit}/año para un hogar de {size}). Sus ingresos parecen estar dentro de este límite.",
        stateDetail:
          "Medicaid para embarazadas en {state} cubre la atención prenatal, el parto y la atención después del parto. La cobertura suele seguir por 60 días después del parto, y algunos estados la extienden hasta 12 meses.",
      },
      eligible: {
        headline: "Probablemente califica en {state}",
        detail:
          "Sus ingresos (${income}/año) parecen estar dentro del límite de Medicaid de {state}, que es el {pct} del FPL (${limit}/año para un hogar de {size}).",
        stateDetailExpansion:
          "{state} amplió Medicaid bajo la ACA y cubre a adultos con ingresos de hasta el 138% del nivel federal de pobreza. Los niños, las personas embarazadas y las personas con discapacidad pueden calificar con límites más altos.",
        stateDetailNonExpansion:
          "{state} no ha ampliado Medicaid. La cobertura es principalmente para adultos con ingresos de hasta el 100% del nivel federal de pobreza. Los niños, las personas embarazadas y las personas con discapacidad pueden calificar con límites más altos.",
      },
      gap: {
        headline: "Brecha de cobertura en {state}",
        detail:
          "Sus ingresos (${income}/año) están por encima del límite de Medicaid en {state}, pero por debajo del 138% del FPL. Como {state} no ha ampliado Medicaid, usted podría quedar en la brecha de cobertura.",
        stateDetail:
          "En la brecha de cobertura, los ingresos son demasiado altos para Medicaid tradicional, pero demasiado bajos para los subsidios del mercado de seguros de la ACA (que empiezan en el 100% del FPL). Averigüe si {state} tiene alguna ampliación limitada o programas especiales. También podría calificar para un seguro del mercado.",
      },
      marketplace: {
        headline:
          "Ingresos por encima del límite de Medicaid; el mercado de seguros podría ayudarle",
        detail:
          "Sus ingresos (${income}/año) probablemente están por encima del límite de Medicaid en {state}, pero podría calificar para un seguro con subsidio del mercado de seguros en Healthcare.gov.",
        stateDetail:
          "En {state}, los hogares con ingresos entre el 100% y el 400% del FPL (${low} a ${high}/año) pueden calificar para créditos fiscales que bajan el costo del seguro. Una evaluación completa de Benefind también revisa si califica en el mercado de seguros.",
      },
      over: {
        headline: "Sus ingresos probablemente pasan los límites",
        detail:
          "Sus ingresos (${income}/año) parecen ser mayores que los límites de Medicaid y de los subsidios del mercado de seguros en {state}. Sin embargo, otros datos de su hogar podrían cambiar esto.",
        stateDetail:
          "Una evaluación completa de Benefind revisa otros programas, como CHIP para los niños del hogar, programas propios de su estado y opciones de seguro por medio del empleador.",
      },
    },
    disclaimer:
      "Solo es un estimado. Las reglas cambian con frecuencia. Confirme su elegibilidad con la agencia de Medicaid de su estado.",
  },
  rd: {
    breadcrumb: "Calculadora del crédito fiscal por I+D",
    eyebrow: "[Crédito fiscal por I+D]",
    title: "Calculadora del crédito fiscal por I+D 2026",
    intro:
      "Calcule su crédito fiscal federal por investigación y desarrollo (I+D) con el método de Crédito Simplificado Alternativo (ASC). Las empresas emergentes con menos de $5M en ingresos brutos podrían aplicarlo directamente a sus impuestos sobre la nómina.",
    whatTitle: "¿Qué es el crédito fiscal por I+D?",
    whatP1:
      "El crédito fiscal federal por investigación y desarrollo (Sección 41 del Código de Rentas Internas) permite a las empresas reducir dólar por dólar sus impuestos federales por actividades de investigación que califican. A diferencia de una deducción, que reduce el ingreso sujeto a impuestos, un crédito reduce directamente lo que usted debe.",
    whatP2:
      "La Ley PATH de 2015 hizo permanente este crédito, y en 2023 se amplió para que las pequeñas empresas que califican puedan aplicar hasta $500,000 al año a sus impuestos sobre la nómina. Fue un cambio importante para las empresas emergentes sin ingresos, que antes no podían usar el crédito porque no debían impuesto sobre la renta.",
    whatP3:
      "El método de cálculo más común es el Crédito Simplificado Alternativo (ASC), que es el 14% de los gastos de investigación que califican (QRE) por encima del 50% del promedio de QRE de los tres años anteriores. Las empresas sin historial de QRE usan una tasa simplificada del 6%. La mayoría de las empresas prefieren el ASC porque el método de Crédito Regular pide registros detallados desde mediados de los años 80.",
    offsetTitle: "Aplicar el crédito a los impuestos sobre la nómina",
    offsetP1:
      "Las empresas sin ingresos o en etapa inicial muchas veces no deben impuesto sobre la renta, así que antes el crédito por I+D no les servía. Esta opción para empresas emergentes cambia eso. Si su empresa tiene menos de $5 millones en ingresos brutos y menos de 5 años con ingresos brutos, puede elegir aplicar su crédito por I+D (hasta $500,000) a la parte del empleador de los impuestos del Seguro Social sobre la nómina.",
    offsetP2:
      "Esto significa que cada dólar de gasto en I+D que califica puede generar un ahorro real en efectivo, aunque su empresa nunca haya tenido ganancias. Para una empresa emergente que gasta $2 millones en sueldos de ingeniería que califican, esto podría significar más de $140,000 al año en ahorros de impuestos sobre la nómina.",
    exampleEyebrow: "[Ejemplo]",
    exampleBody:
      "Una empresa SaaS de 3 años con $800K en sueldos de ingeniería (75% en I+D), $150K en costos de nube para I+D y $1.2M en ingresos brutos calcula QRE de $750K. Sin historial de QRE, el crédito ASC es el 6% de $750K = $45,000. Como empresa emergente que califica, aplica los $45,000 completos a sus impuestos sobre la nómina y reduce en $45,000 sus pagos trimestrales del formulario 941.",
    qreTitle: "¿Qué cuenta como gasto de investigación que califica?",
    qreIntro:
      "No todo gasto en I+D califica. El IRS usa una prueba de cuatro partes para decidir si una actividad es investigación que califica: debe tener un propósito permitido (crear o mejorar un componente del negocio), ser de naturaleza tecnológica, resolver una incertidumbre e incluir un proceso de experimentación.",
    qualifiesTitle: "Lo que califica",
    qualifies: [
      "Sueldos de ingenieros, científicos y desarrolladores de software que hacen actividades que califican",
      "Costos de suministros y materiales usados en la investigación",
      "El 65% de los pagos a contratistas externos por investigación que califica",
      "Costos de computación en la nube usados en desarrollo y pruebas (pueden calificar)",
      "Desarrollo de software para productos o procesos nuevos o mejorados",
    ],
    notQualifiesTitle: "Lo que no califica",
    notQualifies: [
      "Actividades de administración, mercadeo y desarrollo de negocios",
      "Investigación financiada (si otra parte la paga y asume el riesgo)",
      "Investigación después de que empieza la producción comercial",
      "Estudios de mercado, encuestas o investigación en ciencias sociales",
      "Investigación hecha fuera de los Estados Unidos",
    ],
    faqs: [
      {
        q: "¿Qué es el crédito fiscal por I+D?",
        a: "El crédito fiscal federal por I+D (Sección 41) permite a las empresas reducir sus impuestos por los gastos de investigación que califican. El Crédito Simplificado Alternativo (ASC) es el 14% de los QRE por encima del 50% del promedio de QRE de años anteriores, o el 6% si no hay historial.",
      },
      {
        q: "¿Quién califica para el crédito fiscal por I+D?",
        a: "Cualquier empresa de EE. UU. con gastos de investigación que califican podría ser elegible. Las actividades deben pasar la prueba de cuatro partes: propósito permitido, naturaleza tecnológica, resolver una incertidumbre e incluir experimentación. El desarrollo de software y la ingeniería suelen calificar.",
      },
      {
        q: "¿Cómo pueden las empresas emergentes aplicar el crédito a los impuestos sobre la nómina?",
        a: "Las pequeñas empresas que califican, con menos de $5M en ingresos brutos y no más de 5 años con ingresos brutos, pueden aplicar hasta $500,000 de su crédito por I+D a los impuestos sobre la nómina. Esto ayuda a las empresas sin ingresos que no deben impuesto sobre la renta.",
      },
      {
        q: "¿Qué cuenta como gasto de investigación que califica (QRE)?",
        a: "Los QRE incluyen sueldos de empleados que hacen investigación que califica, suministros usados en la investigación y el 65% de los pagos a contratistas externos. Los costos de la nube pueden calificar. La administración, el mercadeo y la investigación financiada no califican.",
      },
      {
        q: "¿Qué es el método ASC?",
        a: "El Crédito Simplificado Alternativo calcula el crédito como el 14% de los QRE por encima del 50% del promedio de QRE de los tres años anteriores. Las empresas sin QRE anteriores usan una tasa del 6%. La mayoría de las empresas prefieren el ASC porque pide menos documentos históricos.",
      },
    ],
    ctaEyebrow: "[Evaluación completa]",
    ctaTitle: "¿Quiere un análisis detallado de I+D?",
    ctaBody:
      "Esta calculadora le da un estimado aproximado. Una evaluación completa de empresas de Benefind revisa si califica para el crédito por I+D y para más de 20 programas fiscales para negocios.",
    ctaLink: "Comenzar evaluación de empresa",
    cardTitle: "Estimador del crédito fiscal por I+D",
    cardDescription:
      "Estimado con el método ASC. Consulte a un profesional de impuestos para un cálculo oficial.",
    spendingLabel: "Gasto anual en I+D ($)",
    spendingHelp:
      "Presupuesto total de I+D, incluidos sueldos, contratistas y suministros",
    qresLabel: "Total de QRE, gastos de investigación que califican ($)",
    qresHelp:
      "Sueldos que califican + suministros + 65% de los costos de contratistas. Déjelo en blanco para calcularlo con el gasto de arriba.",
    priorLabel: "Promedio de QRE, últimos 3 años ($)",
    priorPlaceholder: "p. ej., 200000 (o 0 si es empresa nueva)",
    priorHelp: "Déjelo en blanco o ponga 0 si no tiene historial de QRE",
    receiptsLabel: "Ingresos brutos, año actual ($)",
    receiptsHelp:
      "Ingresos totales. Deben ser menos de $5M para aplicar el crédito a la nómina.",
    yearsLabel: "Años con ingresos brutos",
    yearsHelp:
      "Deben ser 5 años o menos para poder aplicar el crédito a la nómina",
    calculate: "Calcular mi crédito",
    resultLabel: "Crédito por I+D estimado ({method})",
    methodAsc: "ASC 14%",
    methodNoHistory: "ASC 6%, sin historial",
    creditSuffix: "de crédito",
    offsetEligible: "Puede aplicarlo a la nómina",
    offsetEligibleBody:
      "Puede aplicar hasta {amount} a los impuestos sobre la nómina en lugar del impuesto sobre la renta.",
    offsetNotEligible: "Aplicación a la nómina: no califica",
    offsetNotEligibleBody:
      "El crédito se aplica al impuesto sobre la renta. Los créditos que no use se pueden pasar a los próximos 20 años.",
    notes: {
      base: "Monto base: 50% del promedio de QRE anteriores = ${amount}",
      excess: "QRE por encima del monto base: ${amount}",
      rate: "Tasa del crédito: 14% de los QRE por encima de la base (método ASC)",
      noHistory:
        "Sin historial de QRE, por eso se usa la tasa del 6% para empresas emergentes sin QRE de años anteriores",
      offset:
        "Califica para aplicar el crédito a la nómina (menos de $5M en ingresos brutos, 5 años o menos)",
      cap: "Lo que se aplica a la nómina tiene un máximo de $500,000; el resto se aplica al impuesto sobre la renta",
    },
    disclaimer:
      "Solo es un estimado. El cálculo del crédito por I+D requiere un análisis detallado de las actividades. Consulte a un profesional de impuestos calificado antes de presentar su declaración.",
  },
};

const zh: ToolsMessages = {
  shared: {
    breadcrumbTools: "工具",
    personOne: "{n} 人",
    personOther: "{n} 人",
    perMonth: "/月",
    perYear: "/年",
    state: "州",
    selectState: "选择您所在的州",
    householdSize: "家庭人数",
    eg: "例如 {value}",
    faqTitle: "常见问题",
    startFullScreening: "开始完整筛查，获取准确结果",
  },
  index: {
    eyebrow: "[免费计算器]",
    title: "申请前，先心中有数。",
    intro:
      "为最重要的福利项目提供即时估算。无需注册账户。准备好后，可以进行完整筛查。",
    snap: {
      label: "[SNAP]",
      title: "SNAP 福利计算器",
      description:
        "不到 60 秒即可估算您每月的 SNAP（食品券）福利。输入家庭人数、收入和所在州，看看您可能获得多少。",
      badge: "免费食品援助",
      cta: "计算 SNAP 福利",
    },
    medicaid: {
      label: "[Medicaid]",
      title: "Medicaid 资格估算器",
      description:
        "了解您的收入是否符合您所在州的 Medicaid（医疗补助）资格。扩大和未扩大 Medicaid 的州分开计算。",
      badge: "免费医疗保险",
      cta: "查看 Medicaid 资格",
    },
    rd: {
      label: "[研发税收抵免]",
      title: "研发税收抵免计算器",
      description:
        "用 ASC 方法估算您的联邦研发（R&D）税收抵免。初创公司可能可以用抵免额抵扣工资税。立即了解。",
      badge: "企业节税",
      cta: "计算研发抵免",
    },
  },
  snap: {
    breadcrumb: "SNAP 计算器",
    eyebrow: "[SNAP]",
    title: "2026 年 SNAP 福利计算器",
    intro:
      "不到 60 秒即可估算您每月的 SNAP（食品券）福利。输入您的家庭信息，看看您可能获得多少，以及您是否可能符合资格。",
    howTitle: "SNAP 福利如何计算",
    howP1:
      "补充营养援助计划（SNAP）用两步公式来决定您是否符合资格以及能领多少。首先，您的家庭必须通过总收入审查。然后，根据扣除允许项目后的净收入计算您的实际福利。",
    howP2:
      "基本公式很简单：您每月的估算福利 = 您家庭人数对应的最高福利 − 您净收入的 30%。最高福利由美国农业部（USDA）每个财政年度确定，并根据生活成本调整。2026 年，四口之家每月最多可领 $975。",
    howP3:
      "净收入和总收入不同。在计算 30% 之前，会先减去几项扣除额，所以您的实际福利通常比只用总收入计算的要高。了解这些扣除项目，是让您领到最多福利的最重要一步。",
    limitsTitle: "按家庭人数划分的 SNAP 收入上限（2026 年）",
    limitsIntro:
      "总收入上限为联邦贫困线（FPL）的 130%。家中有 60 岁及以上老人或残障成员的家庭不需要通过总收入审查，只需通过 100% FPL 的净收入审查。",
    colSize: "人数",
    colGross: "总收入上限（130%）",
    colNet: "净收入上限（100%）",
    colMax: "最高福利",
    eachAdditional: "每增加一人",
    limitsFootnote:
      "* 适用于本土 48 州和华盛顿特区。阿拉斯加和夏威夷的上限更高。",
    deductionsTitle: "SNAP 扣除项目说明",
    deductionsIntro:
      "扣除额会在套用福利公式之前从您的总收入中减去。您符合的扣除项目越多，估算福利就越高。很多家庭因为没有申报所有应得的扣除项目而少领了钱。",
    deductions: [
      {
        title: "标准扣除",
        desc: "所有家庭都可根据家庭人数获得标准扣除。2026 年，1 至 4 人家庭为 $204，10 人家庭最高为 $409。此项扣除自动适用，无需提供证明文件。",
      },
      {
        title: "工作收入扣除",
        desc: "如果家中有人有工资或自雇收入，这部分工作收入的 20% 会被扣除。这样可以降低工作家庭的计算收入，提高他们的福利。",
      },
      {
        title: "住房扣除",
        desc: "如果您的住房费用（房租、房贷、水电煤）超过其他扣除后净收入的 50%，超出部分可作为住房扣除。2026 年大多数家庭的上限为每月 $672。有老人或残障成员的家庭没有上限。",
      },
      {
        title: "受抚养人照护扣除",
        desc: "如果您为了工作、找工作或参加培训而支付儿童照护或成年受抚养人照护费用，这些费用可以全额扣除。请保留收据，州政府机构会要求您提供证明。",
      },
      {
        title: "子女抚养费扣除",
        desc: "依法须支付给不同住家庭成员的子女抚养费，可以从总收入中扣除。这通常对为不同住子女支付抚养费的单亲家庭有帮助。",
      },
      {
        title: "医疗费用扣除",
        desc: "老人或残障家庭成员每月超过 $35 的医疗费用可以扣除，包括处方药费、看诊费、医疗保险费，以及前往就医的交通费。",
      },
    ],
    faqs: [
      {
        q: "2026 年 SNAP 的收入上限是多少？",
        a: "大多数家庭的每月总收入必须等于或低于联邦贫困线（FPL）的 130%。2026 年，4 口之家的上限为每月 $3,381（每年 $40,572）。家中有老人或残障成员的家庭只需通过 100% FPL 的净收入审查。",
      },
      {
        q: "我的 SNAP 福利金额如何计算？",
        a: "SNAP 使用一个公式：从您家庭人数对应的最高福利开始，减去您净收入的 30%。净收入 = 总收入减去标准扣除、工作收入扣除（20%）以及超出部分的住房费用。",
      },
      {
        q: "哪些收入会被 SNAP 计算在内？",
        a: "SNAP 会计算大多数收入，包括工资、自雇收入、社会安全金（Social Security）和残障补助。补充保障收入（SSI）、儿童税收抵免和大多数教育补助不计算在内。",
      },
      {
        q: "哪些扣除项目可以降低我的 SNAP 计算收入？",
        a: "所有家庭都适用标准扣除。如果您有工作，还可获得 20% 的工作收入扣除；如果您支付儿童或成人照护费用，可获得受抚养人照护扣除；住房费用超过净收入一半的部分，可获得住房扣除。",
      },
      {
        q: "SNAP 审批需要多长时间？",
        a: "大多数州会在 30 天内处理一般的 SNAP 申请。如果您的家庭几乎没有钱，可能符合加急 SNAP 的条件，最快 7 天内批准。",
      },
      {
        q: "各州的 SNAP 规定一样吗？",
        a: "联邦规定确定收入和福利标准，但每个州自行管理本州的项目。有些州的住房费用上限更高，或有额外的扣除项目。夏威夷和阿拉斯加有单独且更高的福利标准。",
      },
      {
        q: "我有工作还能领 SNAP 吗？",
        a: "可以。有工作的家庭可获得 20% 的工作收入扣除，从而降低计算收入。许多有工作的家庭，尤其是有孩子的家庭，都在领取 SNAP 福利。",
      },
    ],
    deepDiveEyebrow: "[深入了解]",
    deepDiveTitle: "想了解全部细节？",
    deepDiveBody:
      "我们的 SNAP 资格完整指南详细介绍了每条规定、每项扣除以及各州的不同之处。",
    deepDiveLink: "阅读：2026 年 SNAP 资格完整指南",
    cardTitle: "SNAP 福利估算器",
    cardDescription: "根据 2026 年联邦 SNAP 规定估算。结果仅供参考。",
    householdPlaceholder: "选择家庭人数",
    incomeLabel: "每月总收入（$）",
    incomeHelp: "税前收入；包括工资、福利和其他收入",
    elderlyLabel: "家中有老人或残障成员",
    elderlyHelp: "60 岁及以上，或正在领取残障福利",
    elderlyAria: "家中有老人或残障成员",
    shelterLabel: "每月住房费用（$）",
    shelterHelp: "房租或房贷 + 水电煤（暖气、电、水）",
    calculate: "计算我的估算结果",
    estimatedBenefit: "估算福利",
    likelihoodHigh: "可能性高",
    likelihoodMedium: "可能性中等",
    likelihoodLow: "可能性低",
    mayNotQualify: "可能不符合资格",
    overLimitReason:
      "您的总收入（${income}/月）超过了 {size} 人家庭 130% FPL 的上限 ${limit}/月。",
    netReason: "根据扣除后约 ${net}/月的净收入计算。",
    fullScreeningHint: "完整筛查可能会发现能改变结果的扣除项目。",
    disclaimer:
      "本计算器仅提供估算，不代表资格审定结果。结果可能与州政府的正式审定不同。",
  },
  medicaid: {
    breadcrumb: "Medicaid 估算器",
    eyebrow: "[Medicaid]",
    title: "2026 年 Medicaid 资格估算器",
    intro:
      "了解您的收入是否符合您所在州的 Medicaid（医疗补助）资格。我们将扩大和未扩大 Medicaid 的州分开计算，让您得到符合您所在地的准确结果。",
    expansionTitle: "Medicaid 扩大计划：对您意味着什么",
    expansionP1:
      "《平价医疗法案》（ACA）允许各州扩大 Medicaid，覆盖收入不超过联邦贫困线 138% 的成年人。截至 2026 年，已有 41 个州和华盛顿特区扩大了 Medicaid。在这些州，年收入约 $20,783 以内的单身成年人即可符合资格，无论家庭结构或是否有残障。",
    expansionP2:
      "在未扩大 Medicaid 的州，没有子女的成年人通常很难获得保险，甚至完全没有。许多这样的州要求有残障、怀孕或收入非常低才能符合资格。这就形成了政策专家所说的“保险缺口”：收入对传统 Medicaid 来说太高，但又太低，无法获得保险市场补贴。",
    expansionP3:
      "联邦政府持续鼓励各州扩大 Medicaid，另有几个州已通过扩大法案，将于 2025-2026 年生效。您所在州的情况可能会变化，请务必通过州 Medicaid 机构或 Benefind 完整筛查确认最新规定。",
    limitsTitle: "按州类型划分的 Medicaid 收入上限（2026 年）",
    limitsIntro:
      "收入上限因家庭人数、所在州以及您是否属于特定类别（怀孕、残障、儿童、老人）而不同。以下是一般成年人的标准：",
    colHousehold: "家庭人数",
    col100: "100% FPL",
    col138: "138% FPL（扩大州）",
    col185: "185% FPL（孕期）",
    limitsFootnote: "* 以上为年收入数字。阿拉斯加和夏威夷的 FPL 标准更高。",
    whoTitle: "谁符合 Medicaid 资格？",
    who: [
      {
        title: "低收入成年人（扩大州）",
        desc: "在扩大州，19 至 64 岁、收入等于或低于 138% FPL 的成年人自动符合资格。这一群体没有资产审查，也没有工作要求。",
      },
      {
        title: "儿童（CHIP 或 Medicaid）",
        desc: "儿童的收入上限高得多，通常为 200% 至 300% FPL，可通过 Medicaid 或儿童健康保险计划（CHIP）获得保险。许多州为收入在 400% FPL 以内家庭的儿童提供保险。",
      },
      {
        title: "孕妇",
        desc: "孕期 Medicaid 通常覆盖收入在 185% 至 200% FPL 以内的人，有时更高。保险包括产前护理、分娩和产后护理，产后保险通常延长至 12 个月。",
      },
      {
        title: "残障人士",
        desc: "领取 SSI（补充保障收入）的人通常自动符合 Medicaid 资格。领取 SSDI 的人需等待 24 个月才能获得 Medicare，在此期间 Medicaid 可以提供保障。",
      },
      {
        title: "老年人（65 岁及以上）",
        desc: "收入和资产有限的老年人，除了 Medicare 之外，还可能符合完整 Medicaid 资格。Medicaid 涵盖 Medicare 不涵盖的服务，包括长期护理和养老院费用。",
      },
      {
        title: "未扩大州的成年人",
        desc: "在未扩大的州，能否获得保险在很大程度上取决于您的类别。收入很低的父母、孕妇和残障人士仍可能符合资格。没有子女的成年人在这些州通常没有途径获得保险。",
      },
    ],
    faqs: [
      {
        q: "2026 年 Medicaid 的收入上限是多少？",
        a: "在扩大了 Medicaid 的州，收入不超过 138% FPL 的成年人符合资格，2026 年单身人士约为每年 $20,783。未扩大的州自行设定标准，通常低得多。",
      },
      {
        q: "哪些州扩大了 Medicaid？",
        a: "截至 2026 年，41 个州和华盛顿特区已扩大 Medicaid。尚未扩大的州包括阿拉巴马、佛罗里达、佐治亚、密西西比、南卡罗来纳、田纳西、德克萨斯、威斯康星和怀俄明。",
      },
      {
        q: "如何申请 Medicaid？",
        a: "您可以通过所在州的 Medicaid 机构申请，也可以在开放投保期间通过 Healthcare.gov 申请；如果遇到符合条件的生活变化，全年都可以申请。Benefind 筛查会直接引导您前往所在州的申请网站。",
      },
      {
        q: "怀孕会影响 Medicaid 资格吗？",
        a: "会。孕妇的收入上限通常更高，一般为 185% 至 250% FPL。在许多州，无论移民身份如何，都可以获得孕期 Medicaid。",
      },
      {
        q: "我有 Medicare，还能申请 Medicaid 吗？",
        a: "可以。双重资格者可以同时享有两者。Medicaid 可支付 Medicare 的保费、自付额，以及 Medicare 不涵盖的服务，例如长期护理和牙科。",
      },
    ],
    ctaEyebrow: "[完整筛查]",
    ctaTitle: "获得准确的资格结果",
    ctaBody:
      "本估算器只涵盖基本情况。Benefind 完整筛查会一次性检查所有 Medicaid 资格途径、CHIP、保险市场补贴以及另外 40 多个项目。",
    ctaLink: "开始免费筛查",
    cardTitle: "Medicaid 资格估算器",
    cardDescription: "根据 2026 年联邦和各州 Medicaid 规定。仅供估算。",
    expansionHint: "扩大州（138% FPL 标准）",
    nonExpansionHint: "未扩大州（标准各不相同）",
    incomeLabel: "家庭年收入（$）",
    incomeHelp: "税前总收入",
    ageLabel: "年龄（主要申请人）",
    pregnantLabel: "目前怀孕",
    pregnantHelp: "可能适用更高的收入上限",
    disabilityLabel: "有残障或领取 SSI/SSDI",
    disabilityHelp: "可能通过残障途径符合资格",
    check: "查看资格",
    resultLabel: "结果",
    status: {
      likely: "可能符合资格",
      notQualify: "可能不符合资格",
      checkState: "请向您所在州确认",
    },
    results: {
      noState: {
        headline: "请选择州以继续",
        detail:
          "各州的 Medicaid 规定差别很大。请在上方选择您所在的州，获取个性化估算。",
      },
      disability: {
        headline: "可能通过残障途径符合资格",
        detailExpansion:
          "在大多数州，领取 SSI 或 SSDI 福利的人通常会自动符合 Medicaid 资格，不受收入上限限制。{state} 是扩大了 Medicaid 的州。",
        detailNonExpansion:
          "在大多数州，领取 SSI 或 SSDI 福利的人通常会自动符合 Medicaid 资格，不受收入上限限制。{state} 是未扩大 Medicaid 的州。",
        stateDetail:
          "在 {state}，有符合条件残障的人在领取联邦残障福利后，通常会被自动纳入 Medicaid。请向州政府机构确认您的具体福利类型。",
      },
      pregnancy: {
        headline: "可能通过孕期 Medicaid 符合资格",
        detail:
          "{state} 为收入约在 185% FPL 以内的孕妇提供保险（{size} 人家庭为 ${limit}/年）。您的收入似乎在此范围内。",
        stateDetail:
          "{state} 的孕期 Medicaid 涵盖产前护理、分娩和产后护理。产后保险通常持续 60 天，有些州延长至 12 个月。",
      },
      eligible: {
        headline: "在 {state} 可能符合资格",
        detail:
          "您的收入（${income}/年）似乎在 {state} 的 Medicaid 上限 {pct} FPL 以内（{size} 人家庭为 ${limit}/年）。",
        stateDetailExpansion:
          "{state} 已根据 ACA 扩大 Medicaid，覆盖收入不超过联邦贫困线 138% 的成年人。儿童、孕妇和残障人士可能适用更高的标准。",
        stateDetailNonExpansion:
          "{state} 尚未扩大 Medicaid。保险主要提供给收入不超过联邦贫困线 100% 的成年人。儿童、孕妇和残障人士可能适用更高的标准。",
      },
      gap: {
        headline: "{state} 的保险缺口",
        detail:
          "您的收入（${income}/年）高于 {state} 的 Medicaid 上限，但低于 138% FPL。由于 {state} 尚未扩大 Medicaid，您可能处于保险缺口中。",
        stateDetail:
          "处于保险缺口时，收入对传统 Medicaid 来说太高，但又太低，无法获得 ACA 保险市场补贴（补贴从 100% FPL 开始）。请查看 {state} 是否有有限扩大或特别项目。您也可能符合保险市场投保资格。",
      },
      marketplace: {
        headline: "收入高于 Medicaid 上限；保险市场可能有帮助",
        detail:
          "您的收入（${income}/年）可能高于 {state} 的 Medicaid 标准，但您可能符合通过 Healthcare.gov 购买补贴保险的资格。",
        stateDetail:
          "在 {state}，收入在 100% 至 400% FPL 之间（每年 ${low} 至 ${high}）的家庭可能符合保费税收抵免资格。Benefind 完整筛查也会检查您的保险市场资格。",
      },
      over: {
        headline: "收入可能高于资格标准",
        detail:
          "您的收入（${income}/年）似乎超过了 {state} 的 Medicaid 和保险市场补贴标准。不过，其他家庭因素可能会改变这个结果。",
        stateDetail:
          "Benefind 完整筛查会检查其他项目，包括为家中儿童提供的 CHIP、本州特有的项目，以及雇主提供的保险选择。",
      },
    },
    disclaimer:
      "仅供估算。规定经常变化。请向您所在州的 Medicaid 机构确认资格。",
  },
  rd: {
    breadcrumb: "研发税收抵免计算器",
    eyebrow: "[研发税收抵免]",
    title: "2026 年研发税收抵免计算器",
    intro:
      "使用替代简化抵免法（ASC）估算您的联邦研究与开发（R&D）税收抵免。总收入低于 $5M 的初创公司可能可以直接用来抵扣工资税。",
    whatTitle: "什么是研发税收抵免？",
    whatP1:
      "联邦研究与开发税收抵免（《国内税收法》第 41 条）让企业可以就符合条件的研究活动，按一美元对一美元的方式减少联邦应缴税款。扣除额减少的是应税收入，而抵免额直接减少您应缴的税。",
    whatP2:
      "2015 年的 PATH 法案使这项抵免成为永久性政策，2023 年又扩大范围，允许符合条件的小企业每年最多用 $500,000 抵扣工资税。对还没有收入的初创公司来说，这是一个重大变化，因为它们过去没有所得税要缴，无法使用这项抵免。",
    whatP3:
      "最常用的计算方法是替代简化抵免法（ASC）：抵免额等于合格研究支出（QRE）中超过前三年平均 QRE 50% 部分的 14%。没有往年 QRE 记录的公司使用简化的 6% 税率。大多数公司偏好 ASC，因为常规抵免法需要追溯到 1980 年代中期的详细记录。",
    offsetTitle: "初创公司的工资税抵扣",
    offsetP1:
      "还没有收入或处于早期阶段的公司通常没有所得税要缴，所以过去研发抵免对它们没有用。初创公司工资税抵扣改变了这一点。如果您的公司总收入少于 $500 万，且有总收入的年份少于 5 年，您可以选择将研发抵免（最多 $500,000）用于抵扣雇主应缴的社会安全工资税。",
    offsetP2:
      "这意味着即使您的公司从未盈利，每一美元合格研发支出都能带来实际的现金节省。一家在合格工程师薪资上花费 $200 万的初创公司，每年可能节省 $140,000 以上的工资税。",
    exampleEyebrow: "[示例]",
    exampleBody:
      "一家成立 3 年的 SaaS 公司，工程师薪资 $800K（75% 用于研发），研发云服务费用 $150K，总收入 $1.2M，算出 QRE 为 $750K。由于没有往年 QRE 记录，ASC 抵免额为 $750K 的 6% = $45,000。作为符合条件的初创公司，他们将全部 $45,000 用于抵扣工资税，每季度 941 表的缴款共减少 $45,000。",
    qreTitle: "哪些属于合格研究支出？",
    qreIntro:
      "并非所有研发支出都符合条件。美国国税局（IRS）用四项标准判断一项活动是否属于合格研究：必须出于允许的目的（开发或改进业务组成部分）、属于技术性质、旨在消除不确定性，并包含实验过程。",
    qualifiesTitle: "符合条件的项目",
    qualifies: [
      "从事合格活动的工程师、科学家和软件开发人员的工资",
      "研究中消耗的用品和材料费用",
      "支付给第三方承包商进行合格研究费用的 65%",
      "用于开发和测试的云计算费用（可能符合条件）",
      "为新产品、新流程或改进的产品、流程进行的软件开发",
    ],
    notQualifiesTitle: "不符合条件的项目",
    notQualifies: [
      "管理、营销和业务拓展活动",
      "受资助的研究（由他人付费并承担风险）",
      "开始商业化生产后进行的研究",
      "市场调研、问卷调查或社会科学研究",
      "在美国境外进行的研究",
    ],
    faqs: [
      {
        q: "什么是研发税收抵免？",
        a: "联邦研发税收抵免（第 41 条）让企业可以就合格研究支出减少应缴税款。替代简化抵免法（ASC）的抵免额为超过往年平均 QRE 50% 部分的 14%；如果没有往年记录，则为 6%。",
      },
      {
        q: "谁符合研发税收抵免资格？",
        a: "任何有合格研究支出的美国公司都可能符合资格。活动必须符合四项标准：目的允许、属于技术性质、消除不确定性、包含实验。软件开发和工程通常符合条件。",
      },
      {
        q: "初创公司的工资税抵扣是什么？",
        a: "总收入少于 $5M、且有总收入年份不超过 5 年的合格小企业，可以将最多 $500,000 的研发抵免用于抵扣工资税。这对没有所得税可抵扣、尚无收入的公司很有帮助。",
      },
      {
        q: "什么属于合格研究支出（QRE）？",
        a: "QRE 包括从事合格研究员工的工资、研究中消耗的用品，以及支付给第三方承包商费用的 65%。云服务费用可能符合条件。管理、营销和受资助的研究不符合条件。",
      },
      {
        q: "什么是 ASC 方法？",
        a: "替代简化抵免法的抵免额为 QRE 中超过前三年平均 QRE 50% 部分的 14%。没有往年 QRE 的公司使用 6% 税率。大多数公司偏好 ASC，因为它需要的历史资料较少。",
      },
    ],
    ctaEyebrow: "[完整筛查]",
    ctaTitle: "需要详细的研发分析吗？",
    ctaBody:
      "本计算器只提供大致估算。Benefind 完整企业筛查会检查研发抵免资格，以及另外 20 多个企业税务项目。",
    ctaLink: "开始企业筛查",
    cardTitle: "研发税收抵免估算器",
    cardDescription: "按 ASC 方法估算。正式计算请咨询税务专业人士。",
    spendingLabel: "年度研发支出（$）",
    spendingHelp: "研发总预算，包括薪资、承包商和用品",
    qresLabel: "合格研究支出（QRE）总额（$）",
    qresHelp: "合格工资 + 用品 + 承包商费用的 65%。留空则根据上方的支出估算。",
    priorLabel: "前 3 年平均 QRE（$）",
    priorPlaceholder: "例如 200000（初创公司填 0）",
    priorHelp: "如果没有往年 QRE 记录，请留空或填 0",
    receiptsLabel: "本年度总收入（$）",
    receiptsHelp: "营业总收入。须低于 $5M 才能抵扣工资税。",
    yearsLabel: "有总收入的年数",
    yearsHelp: "须为 5 年或以下才能抵扣工资税",
    calculate: "计算我的抵免额",
    resultLabel: "估算研发抵免（{method}）",
    methodAsc: "ASC 14%",
    methodNoHistory: "ASC 6%，无往年记录",
    creditSuffix: "抵免",
    offsetEligible: "可抵扣工资税",
    offsetEligibleBody: "您最多可将 {amount} 用于抵扣工资税，而不是所得税。",
    offsetNotEligible: "工资税抵扣：不符合条件",
    offsetNotEligibleBody:
      "抵免额用于抵扣所得税。未使用的抵免额可向后结转 20 年。",
    notes: {
      base: "基数：往年平均 QRE 的 50% = ${amount}",
      excess: "超过基数的 QRE：${amount}",
      rate: "抵免率：超出部分 QRE 的 14%（ASC 方法）",
      noHistory: "没有往年 QRE 记录，因此适用初创公司 6% 税率",
      offset: "符合工资税抵扣条件（总收入低于 $5M，5 年或以下）",
      cap: "工资税抵扣上限为 $500,000；剩余部分抵扣所得税",
    },
    disclaimer:
      "仅供估算。研发抵免的计算需要对活动进行详细分析。报税前请咨询合格的税务专业人士。",
  },
};

const vi: ToolsMessages = {
  shared: {
    breadcrumbTools: "Công cụ",
    personOne: "{n} người",
    personOther: "{n} người",
    perMonth: "/tháng",
    perYear: "/năm",
    state: "Tiểu bang",
    selectState: "Chọn tiểu bang của bạn",
    householdSize: "Số người trong hộ",
    eg: "ví dụ: {value}",
    faqTitle: "Câu hỏi thường gặp",
    startFullScreening: "Làm đánh giá đầy đủ để có kết quả chính xác",
  },
  index: {
    eyebrow: "[Công cụ tính miễn phí]",
    title: "Biết trước khi nộp đơn.",
    intro:
      "Ước tính ngay cho các chương trình quan trọng nhất. Không cần tạo tài khoản. Khi sẵn sàng, bạn có thể làm đánh giá đầy đủ.",
    snap: {
      label: "[SNAP]",
      title: "Công cụ tính trợ cấp SNAP",
      description:
        "Ước tính trợ cấp SNAP (phiếu thực phẩm) hằng tháng của bạn trong chưa đầy 60 giây. Nhập số người trong hộ, thu nhập và tiểu bang để xem bạn có thể nhận bao nhiêu.",
      badge: "Hỗ trợ thực phẩm miễn phí",
      cta: "Tính trợ cấp SNAP",
    },
    medicaid: {
      label: "[Medicaid]",
      title: "Công cụ ước tính điều kiện Medicaid",
      description:
        "Xem thu nhập của bạn có đủ điều kiện nhận Medicaid ở tiểu bang của bạn không. Các tiểu bang có mở rộng và không mở rộng Medicaid được tính riêng.",
      badge: "Bảo hiểm y tế miễn phí",
      cta: "Kiểm tra điều kiện Medicaid",
    },
    rd: {
      label: "[Tín thuế R&D]",
      title: "Công cụ tính tín thuế R&D",
      description:
        "Ước tính tín thuế liên bang cho nghiên cứu và phát triển (R&D) bằng phương pháp ASC. Công ty khởi nghiệp có thể đủ điều kiện dùng tín thuế để trừ vào thuế lương. Xem ngay.",
      badge: "Tiết kiệm thuế cho doanh nghiệp",
      cta: "Tính tín thuế R&D",
    },
  },
  snap: {
    breadcrumb: "Công cụ tính SNAP",
    eyebrow: "[SNAP]",
    title: "Công cụ tính trợ cấp SNAP 2026",
    intro:
      "Ước tính trợ cấp SNAP (phiếu thực phẩm) hằng tháng trong chưa đầy 60 giây. Nhập thông tin hộ gia đình để xem bạn có thể nhận bao nhiêu và có khả năng đủ điều kiện hay không.",
    howTitle: "Cách tính trợ cấp SNAP",
    howP1:
      "Chương trình Hỗ trợ Dinh dưỡng Bổ sung (SNAP) dùng công thức hai bước để quyết định bạn có đủ điều kiện không và nhận bao nhiêu. Trước tiên, hộ của bạn phải đạt mức kiểm tra tổng thu nhập. Sau đó, trợ cấp thực tế được tính từ thu nhập ròng sau các khoản khấu trừ được phép.",
    howP2:
      "Công thức cơ bản rất đơn giản: trợ cấp ước tính hằng tháng bằng mức trợ cấp tối đa theo số người trong hộ trừ đi 30% thu nhập ròng. Mức tối đa do Bộ Nông nghiệp Hoa Kỳ (USDA) đặt ra mỗi năm tài chính và điều chỉnh theo chi phí sinh hoạt. Năm 2026, gia đình bốn người có thể nhận tới $975 mỗi tháng.",
    howP3:
      "Thu nhập ròng khác với tổng thu nhập. Một số khoản khấu trừ được áp dụng trước khi tính 30%, vì vậy trợ cấp thực tế thường cao hơn so với khi bạn chỉ tính theo tổng thu nhập. Hiểu rõ các khoản khấu trừ này là việc quan trọng nhất bạn có thể làm để nhận được nhiều trợ cấp nhất.",
    limitsTitle: "Giới hạn thu nhập SNAP theo số người trong hộ (2026)",
    limitsIntro:
      "Giới hạn tổng thu nhập là 130% mức nghèo liên bang (FPL). Hộ có thành viên từ 60 tuổi trở lên hoặc bị khuyết tật không cần qua kiểm tra tổng thu nhập, chỉ cần đạt kiểm tra thu nhập ròng ở mức 100% FPL.",
    colSize: "Số người",
    colGross: "Giới hạn tổng (130%)",
    colNet: "Giới hạn ròng (100%)",
    colMax: "Trợ cấp tối đa",
    eachAdditional: "Mỗi người thêm",
    limitsFootnote:
      "* Giới hạn cho 48 tiểu bang liền kề và DC. Alaska và Hawaii có giới hạn cao hơn.",
    deductionsTitle: "Giải thích các khoản khấu trừ SNAP",
    deductionsIntro:
      "Các khoản khấu trừ được trừ khỏi tổng thu nhập trước khi áp dụng công thức tính trợ cấp. Bạn đủ điều kiện cho càng nhiều khoản khấu trừ thì trợ cấp ước tính càng cao. Nhiều hộ nhận ít tiền hơn mức có thể vì không khai đủ các khoản khấu trừ mà họ được hưởng.",
    deductions: [
      {
        title: "Khấu trừ tiêu chuẩn",
        desc: "Mọi hộ đều được khấu trừ tiêu chuẩn theo số người trong hộ. Năm 2026, mức này từ $204 cho hộ 1-4 người đến $409 cho hộ 10 người. Khoản này được áp dụng tự động, không cần giấy tờ.",
      },
      {
        title: "Khấu trừ thu nhập từ việc làm",
        desc: "Nếu có người trong hộ có tiền lương hoặc thu nhập tự làm chủ, 20% thu nhập đó sẽ được trừ. Điều này giúp các hộ đi làm giảm thu nhập tính toán và tăng trợ cấp.",
      },
      {
        title: "Khấu trừ chi phí nhà ở",
        desc: "Nếu chi phí nhà ở (tiền thuê, tiền vay mua nhà, điện nước) cao hơn 50% thu nhập ròng sau các khoản khấu trừ khác, phần vượt được tính là khấu trừ nhà ở. Với hầu hết các hộ, mức tối đa là $672/tháng trong năm 2026. Hộ có người cao tuổi hoặc khuyết tật không bị giới hạn.",
      },
      {
        title: "Khấu trừ chi phí chăm sóc người phụ thuộc",
        desc: "Nếu bạn trả tiền chăm sóc trẻ em hoặc người lớn phụ thuộc để đi làm, tìm việc hoặc đi học nghề, toàn bộ chi phí đó được khấu trừ. Hãy giữ biên lai vì cơ quan tiểu bang sẽ yêu cầu giấy tờ chứng minh.",
      },
      {
        title: "Khấu trừ tiền cấp dưỡng con",
        desc: "Tiền cấp dưỡng con mà bạn có nghĩa vụ pháp lý phải trả cho người không sống trong hộ có thể được trừ khỏi tổng thu nhập. Điều này thường giúp cha mẹ đơn thân đang trả cấp dưỡng cho con không sống cùng mình.",
      },
      {
        title: "Khấu trừ chi phí y tế",
        desc: "Thành viên cao tuổi hoặc khuyết tật có thể khấu trừ chi phí y tế vượt quá $35/tháng. Bao gồm tiền thuốc theo toa, khám bác sĩ, phí bảo hiểm y tế và chi phí đi lại đến các buổi hẹn khám.",
      },
    ],
    faqs: [
      {
        q: "Giới hạn thu nhập SNAP năm 2026 là bao nhiêu?",
        a: "Với hầu hết các hộ, tổng thu nhập hằng tháng phải bằng hoặc thấp hơn 130% mức nghèo liên bang (FPL). Với hộ 4 người, mức này là $3,381/tháng ($40,572/năm) trong năm 2026. Hộ có thành viên cao tuổi hoặc khuyết tật chỉ cần đạt kiểm tra thu nhập ròng ở mức 100% FPL.",
      },
      {
        q: "Số tiền trợ cấp SNAP của tôi được tính thế nào?",
        a: "SNAP dùng một công thức: bắt đầu từ mức trợ cấp tối đa theo số người trong hộ, rồi trừ đi 30% thu nhập ròng. Thu nhập ròng là tổng thu nhập trừ khấu trừ tiêu chuẩn, khấu trừ thu nhập từ việc làm (20%) và phần chi phí nhà ở vượt mức.",
      },
      {
        q: "Những gì được tính là thu nhập cho SNAP?",
        a: "SNAP tính hầu hết các loại thu nhập, gồm tiền lương, thu nhập tự làm chủ, An sinh Xã hội và tiền trợ cấp khuyết tật. SNAP không tính Thu nhập An sinh Bổ sung (SSI), tín thuế trẻ em hoặc hầu hết các khoản hỗ trợ học tập.",
      },
      {
        q: "Những khoản khấu trừ nào có thể giảm thu nhập tính SNAP của tôi?",
        a: "Khấu trừ tiêu chuẩn áp dụng cho mọi hộ. Bạn cũng được khấu trừ 20% thu nhập từ việc làm nếu đi làm, khấu trừ chi phí chăm sóc nếu bạn trả tiền chăm sóc trẻ em hoặc người lớn, và khấu trừ nhà ở cho chi phí nhà vượt quá một nửa thu nhập ròng.",
      },
      {
        q: "Duyệt đơn SNAP mất bao lâu?",
        a: "Hầu hết các tiểu bang xử lý đơn SNAP thông thường trong vòng 30 ngày. Nếu hộ của bạn có rất ít tiền, bạn có thể đủ điều kiện nhận SNAP khẩn cấp, có thể được duyệt trong vòng 7 ngày.",
      },
      {
        q: "SNAP có khác nhau giữa các tiểu bang không?",
        a: "Quy định liên bang đặt ra mức thu nhập và mức trợ cấp, nhưng mỗi tiểu bang tự quản lý chương trình của mình. Một số tiểu bang có giới hạn chi phí nhà ở cao hơn hoặc thêm khoản khấu trừ. Hawaii và Alaska có mức trợ cấp riêng, cao hơn.",
      },
      {
        q: "Tôi đang đi làm thì có được nhận SNAP không?",
        a: "Có. Hộ đi làm được khấu trừ 20% thu nhập từ việc làm, giúp giảm thu nhập tính toán. Nhiều gia đình đi làm, nhất là gia đình có con, đang nhận SNAP.",
      },
    ],
    deepDiveEyebrow: "[Tìm hiểu thêm]",
    deepDiveTitle: "Muốn biết đầy đủ chi tiết?",
    deepDiveBody:
      "Hướng dẫn đầy đủ của chúng tôi về điều kiện SNAP giải thích chi tiết mọi quy định, mọi khoản khấu trừ và sự khác biệt giữa các tiểu bang.",
    deepDiveLink: "Đọc: Hướng dẫn đầy đủ về điều kiện SNAP 2026",
    cardTitle: "Công cụ ước tính trợ cấp SNAP",
    cardDescription:
      "Ước tính dựa trên quy định SNAP liên bang năm 2026. Kết quả chỉ mang tính gần đúng.",
    householdPlaceholder: "Chọn số người trong hộ",
    incomeLabel: "Tổng thu nhập hằng tháng ($)",
    incomeHelp: "Trước thuế; gồm tiền lương, trợ cấp và thu nhập khác",
    elderlyLabel: "Có thành viên cao tuổi hoặc khuyết tật",
    elderlyHelp: "Từ 60 tuổi trở lên hoặc đang nhận trợ cấp khuyết tật",
    elderlyAria: "Thành viên trong hộ cao tuổi hoặc khuyết tật",
    shelterLabel: "Chi phí nhà ở hằng tháng ($)",
    shelterHelp:
      "Tiền thuê hoặc tiền vay mua nhà + điện nước (sưởi, điện, nước)",
    calculate: "Tính ước tính của tôi",
    estimatedBenefit: "Trợ cấp ước tính",
    likelihoodHigh: "Khả năng cao",
    likelihoodMedium: "Khả năng trung bình",
    likelihoodLow: "Khả năng thấp",
    mayNotQualify: "Có thể không đủ điều kiện",
    overLimitReason:
      "Tổng thu nhập (${income}/tháng) vượt giới hạn 130% FPL là ${limit}/tháng cho hộ {size} người.",
    netReason:
      "Dựa trên thu nhập ròng khoảng ${net}/tháng sau các khoản khấu trừ.",
    fullScreeningHint:
      "Đánh giá đầy đủ có thể tìm ra các khoản khấu trừ làm thay đổi kết quả của bạn.",
    disclaimer:
      "Công cụ này chỉ đưa ra ước tính và không phải là quyết định chính thức về điều kiện. Kết quả có thể khác với quyết định chính thức của tiểu bang.",
  },
  medicaid: {
    breadcrumb: "Ước tính Medicaid",
    eyebrow: "[Medicaid]",
    title: "Công cụ ước tính điều kiện Medicaid 2026",
    intro:
      "Xem thu nhập của bạn có đủ điều kiện nhận Medicaid ở tiểu bang của bạn không. Chúng tôi tính riêng các tiểu bang có mở rộng và không mở rộng Medicaid để bạn có kết quả chính xác cho nơi mình sống.",
    expansionTitle: "Mở rộng Medicaid: Điều này có ý nghĩa gì với bạn",
    expansionP1:
      "Đạo luật Chăm sóc Sức khỏe Hợp túi tiền (ACA) cho các tiểu bang lựa chọn mở rộng Medicaid để bảo hiểm cho người lớn có thu nhập tới 138% mức nghèo liên bang. Tính đến năm 2026, 41 tiểu bang và Washington DC đã mở rộng. Ở các tiểu bang này, một người lớn độc thân có thu nhập tới khoảng $20,783 mỗi năm đủ điều kiện, bất kể hoàn cảnh gia đình hay tình trạng khuyết tật.",
    expansionP2:
      "Ở các tiểu bang không mở rộng, bảo hiểm cho người lớn không có con thường rất hạn chế hoặc không có. Nhiều tiểu bang này yêu cầu bị khuyết tật, đang mang thai hoặc có thu nhập rất thấp mới đủ điều kiện. Điều này tạo ra cái mà các chuyên gia chính sách gọi là khoảng trống bảo hiểm: thu nhập quá cao để nhận Medicaid truyền thống, nhưng quá thấp để nhận trợ giá trên thị trường bảo hiểm.",
    expansionP3:
      "Chính phủ liên bang tiếp tục khuyến khích mở rộng, và một số tiểu bang khác đã thông qua luật mở rộng có hiệu lực trong năm 2025-2026. Tình trạng của tiểu bang bạn có thể thay đổi, vì vậy hãy luôn kiểm tra quy định hiện hành với cơ quan Medicaid tiểu bang hoặc qua đánh giá đầy đủ của Benefind.",
    limitsTitle: "Giới hạn thu nhập Medicaid theo loại tiểu bang (2026)",
    limitsIntro:
      "Giới hạn thu nhập thay đổi theo số người trong hộ, tiểu bang, và việc bạn có thuộc nhóm đặc biệt hay không (mang thai, khuyết tật, trẻ em, người cao tuổi). Đây là các mức chung cho người lớn:",
    colHousehold: "Số người trong hộ",
    col100: "100% FPL",
    col138: "138% FPL (mở rộng)",
    col185: "185% FPL (mang thai)",
    limitsFootnote:
      "* Số liệu thu nhập hằng năm. Alaska và Hawaii có mức FPL cơ sở cao hơn.",
    whoTitle: "Ai đủ điều kiện nhận Medicaid?",
    who: [
      {
        title: "Người lớn thu nhập thấp (tiểu bang mở rộng)",
        desc: "Người lớn từ 19-64 tuổi có thu nhập bằng hoặc thấp hơn 138% FPL tự động đủ điều kiện ở các tiểu bang mở rộng. Nhóm này không bị kiểm tra tài sản và không có yêu cầu làm việc.",
      },
      {
        title: "Trẻ em (CHIP hoặc Medicaid)",
        desc: "Trẻ em đủ điều kiện ở mức thu nhập cao hơn nhiều, thường là 200-300% FPL, qua Medicaid hoặc Chương trình Bảo hiểm Y tế Trẻ em (CHIP). Nhiều tiểu bang bảo hiểm cho trẻ em tới 400% FPL.",
      },
      {
        title: "Người mang thai",
        desc: "Medicaid cho người mang thai thường áp dụng cho thu nhập tới 185-200% FPL, đôi khi cao hơn. Bảo hiểm gồm chăm sóc trước sinh, sinh con và chăm sóc sau sinh, thường kéo dài tới 12 tháng sau sinh.",
      },
      {
        title: "Người khuyết tật",
        desc: "Người nhận SSI (Thu nhập An sinh Bổ sung) thường tự động đủ điều kiện nhận Medicaid. Người nhận SSDI có thể đủ điều kiện nhận Medicare sau thời gian chờ 24 tháng, và Medicaid có thể bảo hiểm cho họ trong thời gian đó.",
      },
      {
        title: "Người cao tuổi (65+)",
        desc: "Người cao tuổi có thu nhập và tài sản hạn chế có thể đủ điều kiện nhận Medicaid đầy đủ ngoài Medicare. Medicaid chi trả những dịch vụ Medicare không chi trả, gồm chăm sóc dài hạn và chi phí viện dưỡng lão.",
      },
      {
        title: "Người lớn ở tiểu bang không mở rộng",
        desc: "Nếu không mở rộng, việc được bảo hiểm phụ thuộc nhiều vào nhóm của bạn. Cha mẹ có thu nhập rất thấp, người mang thai và người khuyết tật vẫn có thể đủ điều kiện. Người lớn không có con thường không có cách nào để đủ điều kiện ở các tiểu bang này.",
      },
    ],
    faqs: [
      {
        q: "Giới hạn thu nhập Medicaid năm 2026 là bao nhiêu?",
        a: "Ở các tiểu bang đã mở rộng Medicaid, người lớn đủ điều kiện nếu thu nhập tới 138% FPL, khoảng $20,783 mỗi năm cho một người trong năm 2026. Các tiểu bang không mở rộng tự đặt mức của mình, thường thấp hơn nhiều.",
      },
      {
        q: "Những tiểu bang nào đã mở rộng Medicaid?",
        a: "Tính đến năm 2026, 41 tiểu bang và DC đã mở rộng Medicaid. Các tiểu bang chưa mở rộng gồm Alabama, Florida, Georgia, Mississippi, South Carolina, Tennessee, Texas, Wisconsin và Wyoming.",
      },
      {
        q: "Làm sao để nộp đơn xin Medicaid?",
        a: "Bạn có thể nộp đơn qua cơ quan Medicaid tiểu bang, qua Healthcare.gov trong thời gian ghi danh mở, hoặc bất cứ lúc nào trong năm nếu có sự kiện thay đổi cuộc sống đủ điều kiện. Đánh giá của Benefind sẽ dẫn bạn thẳng đến trang nộp đơn của tiểu bang.",
      },
      {
        q: "Mang thai có ảnh hưởng đến điều kiện Medicaid không?",
        a: "Có. Người mang thai thường đủ điều kiện ở mức thu nhập cao hơn, thường là 185-250% FPL. Ở nhiều tiểu bang, Medicaid cho người mang thai được cấp bất kể tình trạng di trú.",
      },
      {
        q: "Tôi có Medicare thì có được nhận Medicaid không?",
        a: "Có. Người đủ điều kiện kép được nhận cả hai. Medicaid trả phí bảo hiểm, tiền đồng chi trả của Medicare và các dịch vụ Medicare không chi trả, như chăm sóc dài hạn và nha khoa.",
      },
    ],
    ctaEyebrow: "[Đánh giá đầy đủ]",
    ctaTitle: "Nhận kết quả chính xác",
    ctaBody:
      "Công cụ ước tính này chỉ bao gồm những điều cơ bản. Đánh giá đầy đủ của Benefind kiểm tra mọi con đường nhận Medicaid, CHIP, tín thuế trên thị trường bảo hiểm và hơn 40 chương trình khác trong một lần.",
    ctaLink: "Bắt đầu đánh giá miễn phí",
    cardTitle: "Công cụ ước tính điều kiện Medicaid",
    cardDescription:
      "Dựa trên quy định Medicaid liên bang và tiểu bang năm 2026. Chỉ là ước tính.",
    expansionHint: "Tiểu bang mở rộng (mức 138% FPL)",
    nonExpansionHint: "Tiểu bang không mở rộng (mức khác nhau)",
    incomeLabel: "Thu nhập hằng năm của hộ ($)",
    incomeHelp: "Tổng thu nhập trước thuế",
    ageLabel: "Tuổi (người nộp đơn chính)",
    pregnantLabel: "Đang mang thai",
    pregnantHelp: "Có thể áp dụng mức thu nhập cao hơn",
    disabilityLabel: "Bị khuyết tật hoặc nhận SSI/SSDI",
    disabilityHelp: "Có thể đủ điều kiện qua diện khuyết tật",
    check: "Kiểm tra điều kiện",
    resultLabel: "Kết quả",
    status: {
      likely: "Có khả năng đủ điều kiện",
      notQualify: "Có thể không đủ điều kiện",
      checkState: "Hỏi tiểu bang của bạn",
    },
    results: {
      noState: {
        headline: "Chọn tiểu bang để tiếp tục",
        detail:
          "Quy định Medicaid khác nhau nhiều giữa các tiểu bang. Hãy chọn tiểu bang ở trên để nhận ước tính riêng cho bạn.",
      },
      disability: {
        headline: "Có khả năng đủ điều kiện qua diện khuyết tật",
        detailExpansion:
          "Người nhận SSI hoặc SSDI thường tự động đủ điều kiện nhận Medicaid ở hầu hết các tiểu bang, bất kể giới hạn thu nhập. {state} là tiểu bang có mở rộng Medicaid.",
        detailNonExpansion:
          "Người nhận SSI hoặc SSDI thường tự động đủ điều kiện nhận Medicaid ở hầu hết các tiểu bang, bất kể giới hạn thu nhập. {state} là tiểu bang không mở rộng Medicaid.",
        stateDetail:
          "Ở {state}, người có khuyết tật đủ điều kiện thường được tự động ghi danh vào Medicaid khi nhận trợ cấp khuyết tật liên bang. Hãy xác nhận loại trợ cấp của bạn với cơ quan tiểu bang.",
      },
      pregnancy: {
        headline: "Có khả năng đủ điều kiện nhận Medicaid cho người mang thai",
        detail:
          "{state} bảo hiểm cho người mang thai có thu nhập tới khoảng 185% FPL (${limit}/năm cho hộ {size} người). Thu nhập của bạn có vẻ nằm trong mức này.",
        stateDetail:
          "Medicaid cho người mang thai ở {state} chi trả chăm sóc trước sinh, chuyển dạ và sinh con, và chăm sóc sau sinh. Bảo hiểm thường kéo dài 60 ngày sau sinh, một số tiểu bang kéo dài tới 12 tháng.",
      },
      eligible: {
        headline: "Có khả năng đủ điều kiện ở {state}",
        detail:
          "Thu nhập của bạn (${income}/năm) có vẻ nằm trong giới hạn Medicaid của {state} là {pct} FPL (${limit}/năm cho hộ {size} người).",
        stateDetailExpansion:
          "{state} đã mở rộng Medicaid theo ACA, bảo hiểm cho người lớn có thu nhập tới 138% mức nghèo liên bang. Trẻ em, người mang thai và người khuyết tật có thể đủ điều kiện ở mức cao hơn.",
        stateDetailNonExpansion:
          "{state} chưa mở rộng Medicaid. Bảo hiểm chủ yếu dành cho người lớn có thu nhập tới 100% mức nghèo liên bang. Trẻ em, người mang thai và người khuyết tật có thể đủ điều kiện ở mức cao hơn.",
      },
      gap: {
        headline: "Khoảng trống bảo hiểm ở {state}",
        detail:
          "Thu nhập của bạn (${income}/năm) cao hơn giới hạn Medicaid ở {state} nhưng thấp hơn 138% FPL. Vì {state} chưa mở rộng Medicaid, bạn có thể rơi vào khoảng trống bảo hiểm.",
        stateDetail:
          "Trong khoảng trống bảo hiểm, thu nhập quá cao để nhận Medicaid truyền thống nhưng quá thấp để nhận trợ giá trên thị trường bảo hiểm ACA (bắt đầu từ 100% FPL). Hãy xem {state} có chương trình mở rộng hạn chế hoặc chương trình đặc biệt nào không. Bạn cũng có thể đủ điều kiện mua bảo hiểm trên thị trường.",
      },
      marketplace: {
        headline:
          "Thu nhập cao hơn giới hạn Medicaid; thị trường bảo hiểm có thể giúp bạn",
        detail:
          "Thu nhập của bạn (${income}/năm) có thể cao hơn mức Medicaid của {state}, nhưng bạn có thể đủ điều kiện mua bảo hiểm có trợ giá qua Healthcare.gov.",
        stateDetail:
          "Ở {state}, hộ có thu nhập từ 100% đến 400% FPL (${low} đến ${high}/năm) có thể đủ điều kiện nhận tín thuế phí bảo hiểm. Đánh giá đầy đủ của Benefind cũng sẽ kiểm tra điều kiện trên thị trường bảo hiểm.",
      },
      over: {
        headline: "Thu nhập có thể cao hơn các mức điều kiện",
        detail:
          "Thu nhập của bạn (${income}/năm) có vẻ vượt mức Medicaid và mức trợ giá thị trường bảo hiểm ở {state}. Tuy nhiên, các yếu tố khác trong hộ có thể thay đổi kết quả này.",
        stateDetail:
          "Đánh giá đầy đủ của Benefind sẽ kiểm tra các chương trình khác, gồm CHIP cho trẻ em trong hộ, các chương trình riêng của tiểu bang và các lựa chọn bảo hiểm qua chủ lao động.",
      },
    },
    disclaimer:
      "Chỉ là ước tính. Quy định thay đổi thường xuyên. Hãy xác nhận điều kiện với cơ quan Medicaid tiểu bang của bạn.",
  },
  rd: {
    breadcrumb: "Công cụ tính tín thuế R&D",
    eyebrow: "[Tín thuế R&D]",
    title: "Công cụ tính tín thuế R&D 2026",
    intro:
      "Ước tính tín thuế liên bang cho nghiên cứu và phát triển (R&D) bằng phương pháp Tín thuế Đơn giản Thay thế (ASC). Công ty khởi nghiệp có tổng doanh thu dưới $5M có thể dùng tín thuế để trừ trực tiếp vào thuế lương.",
    whatTitle: "Tín thuế R&D là gì?",
    whatP1:
      "Tín thuế liên bang cho Nghiên cứu và Phát triển (Mục 41 của Bộ luật Thuế vụ) cho phép doanh nghiệp giảm thuế liên bang phải nộp theo tỷ lệ một đô la đổi một đô la cho các hoạt động nghiên cứu đủ điều kiện. Khác với khoản khấu trừ (làm giảm thu nhập chịu thuế), tín thuế trực tiếp làm giảm số thuế bạn phải nộp.",
    whatP2:
      "Đạo luật PATH năm 2015 đã biến tín thuế này thành vĩnh viễn, và năm 2023 được mở rộng để các doanh nghiệp nhỏ đủ điều kiện có thể trừ tới $500,000 mỗi năm vào thuế lương. Đây là thay đổi lớn cho các công ty khởi nghiệp chưa có doanh thu, vốn trước đây không dùng được tín thuế vì không có thuế thu nhập phải nộp.",
    whatP3:
      "Phương pháp tính phổ biến nhất là Tín thuế Đơn giản Thay thế (ASC), bằng 14% chi phí nghiên cứu đủ điều kiện (QRE) vượt quá 50% QRE trung bình của ba năm trước. Công ty chưa có QRE các năm trước dùng mức đơn giản 6%. Hầu hết các công ty chọn ASC vì phương pháp Tín thuế Thông thường đòi hỏi hồ sơ chi tiết từ giữa thập niên 1980.",
    offsetTitle: "Trừ vào thuế lương cho công ty khởi nghiệp",
    offsetP1:
      "Các công ty chưa có doanh thu hoặc ở giai đoạn đầu thường không có thuế thu nhập phải nộp, nên trước đây tín thuế R&D không giúp được họ. Lựa chọn trừ vào thuế lương cho công ty khởi nghiệp thay đổi điều này. Nếu công ty bạn có tổng doanh thu dưới $5 triệu và có doanh thu chưa đầy 5 năm, bạn có thể chọn dùng tín thuế R&D (tới $500,000) để trừ vào phần thuế An sinh Xã hội mà chủ lao động phải đóng trên tiền lương.",
    offsetP2:
      "Điều này có nghĩa là mỗi đô la chi cho R&D đủ điều kiện có thể tạo ra khoản tiết kiệm tiền mặt thật, ngay cả khi công ty bạn chưa từng có lãi. Với một công ty khởi nghiệp chi $2 triệu cho lương kỹ sư đủ điều kiện, khoản này có thể là hơn $140,000 tiết kiệm thuế lương mỗi năm.",
    exampleEyebrow: "[Ví dụ]",
    exampleBody:
      "Một công ty SaaS 3 năm tuổi có $800K lương kỹ sư (75% cho R&D), $150K chi phí điện toán đám mây cho R&D và $1.2M tổng doanh thu, tính được QRE là $750K. Không có QRE các năm trước, tín thuế ASC là 6% của $750K = $45,000. Là công ty khởi nghiệp đủ điều kiện, họ dùng toàn bộ $45,000 để trừ vào thuế lương, giảm $45,000 trong các khoản nộp mẫu 941 hằng quý.",
    qreTitle: "Những gì được tính là chi phí nghiên cứu đủ điều kiện?",
    qreIntro:
      "Không phải mọi chi phí R&D đều đủ điều kiện. IRS dùng bài kiểm tra bốn phần để xác định một hoạt động có phải là nghiên cứu đủ điều kiện hay không: phải có mục đích được phép (phát triển hoặc cải tiến một thành phần kinh doanh), mang tính công nghệ, nhằm loại bỏ sự không chắc chắn, và có quá trình thử nghiệm.",
    qualifiesTitle: "Những gì đủ điều kiện",
    qualifies: [
      "Lương của kỹ sư, nhà khoa học và lập trình viên làm các hoạt động đủ điều kiện",
      "Chi phí vật tư và vật liệu dùng trong nghiên cứu",
      "65% khoản trả cho nhà thầu bên ngoài làm nghiên cứu đủ điều kiện",
      "Chi phí điện toán đám mây dùng cho phát triển và thử nghiệm (có thể đủ điều kiện)",
      "Phát triển phần mềm cho sản phẩm hoặc quy trình mới hay được cải tiến",
    ],
    notQualifiesTitle: "Những gì không đủ điều kiện",
    notQualifies: [
      "Hoạt động quản lý, tiếp thị và phát triển kinh doanh",
      "Nghiên cứu được tài trợ (nếu bên khác trả tiền và chịu rủi ro)",
      "Nghiên cứu sau khi đã bắt đầu sản xuất thương mại",
      "Nghiên cứu thị trường, khảo sát hoặc nghiên cứu khoa học xã hội",
      "Nghiên cứu thực hiện ngoài Hoa Kỳ",
    ],
    faqs: [
      {
        q: "Tín thuế R&D là gì?",
        a: "Tín thuế R&D liên bang (Mục 41) cho phép doanh nghiệp giảm thuế cho các chi phí nghiên cứu đủ điều kiện. Tín thuế Đơn giản Thay thế (ASC) bằng 14% QRE vượt quá 50% QRE trung bình các năm trước, hoặc 6% nếu chưa có dữ liệu các năm trước.",
      },
      {
        q: "Ai đủ điều kiện nhận tín thuế R&D?",
        a: "Bất kỳ công ty Hoa Kỳ nào có chi phí nghiên cứu đủ điều kiện đều có thể được hưởng. Các hoạt động phải đạt bài kiểm tra bốn phần: mục đích được phép, mang tính công nghệ, loại bỏ sự không chắc chắn và có thử nghiệm. Phát triển phần mềm và kỹ thuật thường đủ điều kiện.",
      },
      {
        q: "Trừ vào thuế lương cho công ty khởi nghiệp là gì?",
        a: "Doanh nghiệp nhỏ đủ điều kiện có tổng doanh thu dưới $5M và có doanh thu không quá 5 năm có thể dùng tới $500,000 tín thuế R&D để trừ vào thuế lương. Điều này giúp các công ty chưa có doanh thu, không có thuế thu nhập để trừ.",
      },
      {
        q: "Những gì được tính là chi phí nghiên cứu đủ điều kiện (QRE)?",
        a: "QRE gồm lương nhân viên làm nghiên cứu đủ điều kiện, vật tư dùng trong nghiên cứu và 65% khoản trả cho nhà thầu bên ngoài. Chi phí điện toán đám mây có thể đủ điều kiện. Quản lý, tiếp thị và nghiên cứu được tài trợ không đủ điều kiện.",
      },
      {
        q: "Phương pháp ASC là gì?",
        a: "Tín thuế Đơn giản Thay thế tính tín thuế bằng 14% QRE vượt quá 50% QRE trung bình của ba năm trước. Công ty chưa có QRE các năm trước dùng mức 6%. Hầu hết các công ty chọn ASC vì cần ít hồ sơ lịch sử hơn.",
      },
    ],
    ctaEyebrow: "[Đánh giá đầy đủ]",
    ctaTitle: "Sẵn sàng phân tích R&D chi tiết?",
    ctaBody:
      "Công cụ này chỉ cho bạn con số ước tính sơ bộ. Đánh giá đầy đủ cho công ty của Benefind kiểm tra điều kiện tín thuế R&D cùng với hơn 20 chương trình thuế doanh nghiệp khác.",
    ctaLink: "Bắt đầu đánh giá cho công ty",
    cardTitle: "Công cụ ước tính tín thuế R&D",
    cardDescription:
      "Ước tính theo phương pháp ASC. Hãy hỏi chuyên gia thuế để có con số chính thức.",
    spendingLabel: "Chi phí R&D hằng năm ($)",
    spendingHelp: "Tổng ngân sách R&D gồm lương, nhà thầu và vật tư",
    qresLabel: "Tổng QRE, chi phí nghiên cứu đủ điều kiện ($)",
    qresHelp:
      "Lương đủ điều kiện + vật tư + 65% chi phí nhà thầu. Để trống để ước tính từ chi phí ở trên.",
    priorLabel: "QRE trung bình, 3 năm trước ($)",
    priorPlaceholder: "ví dụ: 200000 (hoặc 0 nếu là công ty mới)",
    priorHelp: "Để trống hoặc nhập 0 nếu bạn chưa có QRE các năm trước",
    receiptsLabel: "Tổng doanh thu, năm hiện tại ($)",
    receiptsHelp: "Tổng doanh thu. Phải dưới $5M để trừ vào thuế lương.",
    yearsLabel: "Số năm có doanh thu",
    yearsHelp: "Phải từ 5 năm trở xuống để đủ điều kiện trừ vào thuế lương",
    calculate: "Tính tín thuế của tôi",
    resultLabel: "Tín thuế R&D ước tính ({method})",
    methodAsc: "ASC 14%",
    methodNoHistory: "ASC 6%, chưa có dữ liệu trước",
    creditSuffix: "tín thuế",
    offsetEligible: "Đủ điều kiện trừ vào thuế lương",
    offsetEligibleBody:
      "Bạn có thể dùng tới {amount} để trừ vào thuế lương thay vì thuế thu nhập.",
    offsetNotEligible: "Trừ vào thuế lương: không đủ điều kiện",
    offsetNotEligibleBody:
      "Tín thuế được trừ vào thuế thu nhập. Tín thuế chưa dùng có thể chuyển sang tối đa 20 năm sau.",
    notes: {
      base: "Mức cơ sở: 50% QRE trung bình các năm trước = ${amount}",
      excess: "QRE vượt mức cơ sở: ${amount}",
      rate: "Tỷ lệ tín thuế: 14% QRE vượt mức (phương pháp ASC)",
      noHistory:
        "Chưa có QRE các năm trước, nên áp dụng mức 6% cho công ty khởi nghiệp",
      offset:
        "Đủ điều kiện trừ vào thuế lương (doanh thu dưới $5M, từ 5 năm trở xuống)",
      cap: "Phần trừ vào thuế lương tối đa $500,000; phần còn lại trừ vào thuế thu nhập",
    },
    disclaimer:
      "Chỉ là ước tính. Tính tín thuế R&D cần phân tích chi tiết các hoạt động. Hãy hỏi chuyên gia thuế có chuyên môn trước khi khai thuế.",
  },
};

const ar: ToolsMessages = {
  shared: {
    breadcrumbTools: "الأدوات",
    personOne: "شخص واحد",
    personOther: "{n} أشخاص",
    perMonth: "/شهر",
    perYear: "/سنة",
    state: "الولاية",
    selectState: "اختر ولايتك",
    householdSize: "عدد أفراد الأسرة",
    eg: "مثال: {value}",
    faqTitle: "الأسئلة الشائعة",
    startFullScreening: "ابدأ الفحص الكامل للحصول على نتائج دقيقة",
  },
  index: {
    eyebrow: "[حاسبات مجانية]",
    title: "اعرف قبل أن تتقدم بطلب.",
    intro:
      "تقديرات فورية لأهم البرامج. لا تحتاج إلى حساب. يمكنك إجراء فحص كامل عندما تكون مستعدًا.",
    snap: {
      label: "[SNAP]",
      title: "حاسبة إعانة SNAP",
      description:
        "احسب إعانة SNAP (قسائم الطعام) الشهرية في أقل من 60 ثانية. أدخل عدد أفراد أسرتك ودخلك وولايتك لترى المبلغ الذي قد تحصل عليه.",
      badge: "مساعدة غذائية مجانية",
      cta: "احسب إعانة SNAP",
    },
    medicaid: {
      label: "[Medicaid]",
      title: "أداة تقدير الأهلية لبرنامج Medicaid",
      description:
        "اعرف إن كان دخلك يؤهلك لبرنامج Medicaid (الرعاية الصحية) في ولايتك. نحسب الولايات التي وسّعت البرنامج والتي لم توسّعه كلًّا على حدة.",
      badge: "تغطية صحية مجانية",
      cta: "تحقق من أهلية Medicaid",
    },
    rd: {
      label: "[الائتمان الضريبي للبحث والتطوير]",
      title: "حاسبة الائتمان الضريبي للبحث والتطوير",
      description:
        "احسب الائتمان الضريبي الفيدرالي للبحث والتطوير (R&D) بطريقة ASC. قد تتأهل الشركات الناشئة لخصمه من ضرائب الرواتب. اعرف ذلك فورًا.",
      badge: "توفير ضريبي للشركات",
      cta: "احسب ائتمان البحث والتطوير",
    },
  },
  snap: {
    breadcrumb: "حاسبة SNAP",
    eyebrow: "[SNAP]",
    title: "حاسبة إعانة SNAP لعام 2026",
    intro:
      "احسب إعانة SNAP (قسائم الطعام) الشهرية في أقل من 60 ثانية. أدخل بيانات أسرتك لترى المبلغ الذي قد تحصل عليه، وهل من المرجح أن تكون مؤهلًا.",
    howTitle: "كيف تُحسب إعانات SNAP",
    howP1:
      "يستخدم برنامج المساعدة الغذائية التكميلية (SNAP) طريقة من خطوتين لتحديد الأهلية ومبلغ الإعانة. أولًا، يجب أن تجتاز أسرتك اختبار الدخل الإجمالي. ثم تُحسب إعانتك الفعلية من صافي دخلك بعد الخصومات المسموح بها.",
    howP2:
      "المعادلة الأساسية بسيطة: إعانتك الشهرية المقدّرة تساوي الحد الأقصى للإعانة حسب عدد أفراد أسرتك ناقص 30% من صافي دخلك. تحدد وزارة الزراعة الأمريكية (USDA) الحد الأقصى كل سنة مالية وتعدّله حسب تكلفة المعيشة. في عام 2026، يمكن لأسرة من أربعة أفراد الحصول على ما يصل إلى $975 شهريًا.",
    howP3:
      "صافي الدخل ليس مثل الدخل الإجمالي. تُطبَّق عدة خصومات قبل حساب نسبة 30%، ولذلك تكون إعانتك الفعلية عادةً أعلى مما تتوقع لو حسبتها من الدخل الإجمالي فقط. فهم هذه الخصومات هو أهم ما يمكنك فعله للحصول على أكبر إعانة ممكنة.",
    limitsTitle: "حدود الدخل في SNAP حسب عدد أفراد الأسرة (2026)",
    limitsIntro:
      "حد الدخل الإجمالي هو 130% من خط الفقر الفيدرالي (FPL). الأسر التي فيها فرد مسن (60 عامًا أو أكثر) أو من ذوي الإعاقة معفاة من اختبار الدخل الإجمالي، وتحتاج فقط إلى اجتياز اختبار صافي الدخل عند 100% من FPL.",
    colSize: "العدد",
    colGross: "الحد الإجمالي (130%)",
    colNet: "الحد الصافي (100%)",
    colMax: "الحد الأقصى للإعانة",
    eachAdditional: "لكل فرد إضافي",
    limitsFootnote:
      "* الحدود للولايات الـ48 المتجاورة ومقاطعة كولومبيا. حدود ألاسكا وهاواي أعلى.",
    deductionsTitle: "شرح خصومات SNAP",
    deductionsIntro:
      "تُطرح الخصومات من دخلك الإجمالي قبل حساب الإعانة. كلما زادت الخصومات التي تتأهل لها، ارتفعت إعانتك المقدّرة. كثير من الأسر تحصل على مال أقل لأنها لا تطلب كل الخصومات التي يحق لها.",
    deductions: [
      {
        title: "الخصم القياسي",
        desc: "تحصل كل الأسر على خصم قياسي حسب عدد أفرادها. في عام 2026، يتراوح من $204 للأسر من 1-4 أفراد إلى $409 للأسر من 10 أفراد. هذا الخصم تلقائي ولا يحتاج إلى مستندات.",
      },
      {
        title: "خصم دخل العمل",
        desc: "إذا كان أحد أفراد أسرتك يحصل على أجر أو دخل من عمل حر، يُخصم 20% من هذا الدخل. هذا يساعد الأسر العاملة لأنه يخفض دخلها المحسوب ويزيد إعانتها.",
      },
      {
        title: "خصم السكن",
        desc: "إذا كانت تكاليف السكن (الإيجار، قرض المنزل، الخدمات) أكثر من 50% من صافي دخلك بعد الخصومات الأخرى، يُحسب الفرق خصمًا للسكن. لمعظم الأسر، الحد الأقصى هو $672 شهريًا في عام 2026. لا يوجد حد أقصى للأسر التي فيها مسنون أو ذوو إعاقة.",
      },
      {
        title: "خصم رعاية المُعالين",
        desc: "إذا كنت تدفع مقابل رعاية الأطفال أو رعاية شخص بالغ تعوله لكي تعمل أو تبحث عن عمل أو تحضر تدريبًا، فهذه التكاليف تُخصم بالكامل. احتفظ بالإيصالات لأن الجهة الحكومية في الولاية ستطلب إثباتًا.",
      },
      {
        title: "خصم نفقة الأطفال",
        desc: "يمكن خصم نفقة الأطفال التي يلزمك القانون بدفعها لشخص لا يعيش معك من دخلك الإجمالي. هذا يساعد غالبًا الآباء أو الأمهات الذين يدفعون نفقة لأطفال لا يعيشون معهم.",
      },
      {
        title: "خصم المصاريف الطبية",
        desc: "يمكن لأفراد الأسرة المسنين أو ذوي الإعاقة خصم المصاريف الطبية التي تزيد على $35 شهريًا. يشمل ذلك الأدوية الموصوفة وزيارات الطبيب وأقساط التأمين الصحي والمواصلات إلى المواعيد الطبية.",
      },
    ],
    faqs: [
      {
        q: "ما حد الدخل لبرنامج SNAP في عام 2026؟",
        a: "لمعظم الأسر، يجب أن يكون الدخل الإجمالي الشهري مساويًا أو أقل من 130% من خط الفقر الفيدرالي (FPL). لأسرة من 4 أفراد، هذا يعني $3,381 شهريًا ($40,572 سنويًا) في عام 2026. الأسر التي فيها فرد مسن أو من ذوي الإعاقة تحتاج فقط إلى اجتياز اختبار صافي الدخل عند 100% من FPL.",
      },
      {
        q: "كيف يُحسب مبلغ إعانة SNAP الخاص بي؟",
        a: "يستخدم SNAP معادلة: ابدأ بالحد الأقصى للإعانة حسب عدد أفراد أسرتك، ثم اطرح 30% من صافي دخلك. صافي الدخل هو دخلك الإجمالي ناقص الخصم القياسي وخصم دخل العمل (20%) وتكاليف السكن الزائدة.",
      },
      {
        q: "ما الذي يُحسب دخلًا في SNAP؟",
        a: "يحسب SNAP معظم أنواع الدخل، مثل الأجور والعمل الحر والضمان الاجتماعي ومدفوعات الإعاقة. ولا يحسب دخل الضمان التكميلي (SSI) أو الائتمانات الضريبية للأطفال أو معظم المساعدات التعليمية.",
      },
      {
        q: "ما الخصومات التي يمكن أن تخفض دخلي المحسوب في SNAP؟",
        a: "يُطبَّق الخصم القياسي على كل الأسر. وتحصل أيضًا على خصم 20% من دخل العمل إذا كنت تعمل، وخصم لرعاية المُعالين إذا كنت تدفع مقابل رعاية طفل أو بالغ، وخصم للسكن لتكاليف السكن التي تزيد على نصف صافي دخلك.",
      },
      {
        q: "كم تستغرق الموافقة على SNAP؟",
        a: "تعالج معظم الولايات طلبات SNAP العادية خلال 30 يومًا. إذا كان لدى أسرتك مال قليل جدًا، فقد تتأهل لبرنامج SNAP العاجل، الذي يمكن الموافقة عليه خلال 7 أيام.",
      },
      {
        q: "هل يختلف SNAP من ولاية لأخرى؟",
        a: "تحدد القواعد الفيدرالية مستويات الدخل والإعانات، لكن كل ولاية تدير برنامجها الخاص. بعض الولايات لديها حدود أعلى لتكاليف السكن أو خصومات إضافية. ولهاواي وألاسكا مستويات إعانة خاصة بهما وأعلى.",
      },
      {
        q: "هل يمكنني الحصول على SNAP إذا كنت أعمل؟",
        a: "نعم. تستفيد الأسر العاملة من خصم 20% من دخل العمل، وهذا يخفض الدخل المحسوب. كثير من الأسر العاملة، خاصة التي لديها أطفال، تحصل على إعانات SNAP.",
      },
    ],
    deepDiveEyebrow: "[معلومات أكثر]",
    deepDiveTitle: "هل تريد معرفة كل التفاصيل؟",
    deepDiveBody:
      "دليلنا الكامل لأهلية SNAP يشرح بالتفصيل كل قاعدة وكل خصم وكل اختلاف بين الولايات.",
    deepDiveLink: "اقرأ: الدليل الكامل لأهلية SNAP لعام 2026",
    cardTitle: "أداة تقدير إعانة SNAP",
    cardDescription:
      "تقديرات مبنية على قواعد SNAP الفيدرالية لعام 2026. النتائج تقريبية.",
    householdPlaceholder: "اختر عدد أفراد الأسرة",
    incomeLabel: "الدخل الإجمالي الشهري ($)",
    incomeHelp: "قبل الضرائب؛ يشمل الأجور والإعانات والدخل الآخر",
    elderlyLabel: "فرد مسن أو من ذوي الإعاقة",
    elderlyHelp: "عمره 60 عامًا أو أكثر أو يتلقى إعانات إعاقة",
    elderlyAria: "فرد في الأسرة مسن أو من ذوي الإعاقة",
    shelterLabel: "تكاليف السكن الشهرية ($)",
    shelterHelp: "الإيجار أو قرض المنزل + الخدمات (تدفئة، كهرباء، ماء)",
    calculate: "احسب التقدير الخاص بي",
    estimatedBenefit: "الإعانة المقدّرة",
    likelihoodHigh: "احتمال مرتفع",
    likelihoodMedium: "احتمال متوسط",
    likelihoodLow: "احتمال منخفض",
    mayNotQualify: "قد لا تكون مؤهلًا",
    overLimitReason:
      "الدخل الإجمالي (${income}/شهر) أعلى من حد 130% من FPL، وهو ${limit}/شهر لأسرة من {size} أفراد.",
    netReason: "بناءً على صافي دخل يقارب ${net}/شهر بعد الخصومات.",
    fullScreeningHint: "قد يكشف الفحص الكامل عن خصومات تغيّر نتيجتك.",
    disclaimer:
      "هذه الحاسبة تقدم تقديرات فقط ولا تُعد قرارًا رسميًا بالأهلية. قد تختلف النتائج عن القرارات الرسمية للولاية.",
  },
  medicaid: {
    breadcrumb: "أداة تقدير Medicaid",
    eyebrow: "[Medicaid]",
    title: "أداة تقدير الأهلية لبرنامج Medicaid لعام 2026",
    intro:
      "اعرف إن كان دخلك يؤهلك لبرنامج Medicaid (الرعاية الصحية) في ولايتك. نحسب الولايات التي وسّعت البرنامج والتي لم توسّعه كلًّا على حدة، لتحصل على نتيجة دقيقة للمكان الذي تعيش فيه.",
    expansionTitle: "توسيع Medicaid: ماذا يعني لك",
    expansionP1:
      "أعطى قانون الرعاية الميسرة (ACA) الولايات خيار توسيع Medicaid ليشمل البالغين الذين يصل دخلهم إلى 138% من خط الفقر الفيدرالي. حتى عام 2026، وسّعت 41 ولاية وواشنطن العاصمة البرنامج. في هذه الولايات، يتأهل البالغ الذي يعيش وحده ويصل دخله إلى نحو $20,783 سنويًا، بغض النظر عن تكوين أسرته أو وضع الإعاقة.",
    expansionP2:
      "في الولايات التي لم توسّع البرنامج، غالبًا ما تكون التغطية للبالغين بلا أطفال محدودة جدًا أو غير موجودة. كثير من هذه الولايات تشترط وجود إعاقة أو حمل أو دخل منخفض جدًا للتأهل. وهذا يخلق ما يسميه خبراء السياسات «فجوة التغطية»: دخل أعلى من حد Medicaid التقليدي، وأقل من أن يؤهل لدعم سوق التأمين.",
    expansionP3:
      "تواصل الحكومة الفيدرالية تشجيع التوسيع، وأقرّت عدة ولايات أخرى قوانين توسيع تدخل حيز التنفيذ في 2025-2026. قد يتغير وضع ولايتك، لذا تحقق دائمًا من القواعد الحالية مع جهة Medicaid في ولايتك أو من خلال فحص Benefind الكامل.",
    limitsTitle: "حدود الدخل في Medicaid حسب نوع الولاية (2026)",
    limitsIntro:
      "تختلف حدود الدخل حسب عدد أفراد الأسرة والولاية، وهل تنتمي إلى فئة معينة (حامل، من ذوي الإعاقة، طفل، مسن). هذه هي الحدود العامة للبالغين:",
    colHousehold: "عدد أفراد الأسرة",
    col100: "100% من FPL",
    col138: "138% من FPL (التوسيع)",
    col185: "185% من FPL (الحمل)",
    limitsFootnote:
      "* أرقام الدخل السنوي. خط الفقر (FPL) في ألاسكا وهاواي أعلى.",
    whoTitle: "من يتأهل لبرنامج Medicaid؟",
    who: [
      {
        title: "البالغون ذوو الدخل المنخفض (ولايات التوسيع)",
        desc: "البالغون من 19-64 عامًا الذين يساوي دخلهم 138% من FPL أو أقل يتأهلون تلقائيًا في ولايات التوسيع. لا يوجد اختبار للأصول ولا شرط للعمل لهذه الفئة.",
      },
      {
        title: "الأطفال (CHIP أو Medicaid)",
        desc: "يتأهل الأطفال عند حدود دخل أعلى بكثير، عادةً 200-300% من FPL، من خلال Medicaid أو برنامج التأمين الصحي للأطفال (CHIP). كثير من الولايات تغطي الأطفال حتى 400% من FPL.",
      },
      {
        title: "الحوامل",
        desc: "يغطي Medicaid للحوامل عادةً الدخل حتى 185-200% من FPL، وأحيانًا أكثر. تشمل التغطية رعاية ما قبل الولادة والولادة ورعاية ما بعد الولادة، وغالبًا تمتد إلى 12 شهرًا بعد الولادة.",
      },
      {
        title: "ذوو الإعاقة",
        desc: "الأشخاص الذين يتلقون SSI (دخل الضمان التكميلي) يكونون عادةً مؤهلين تلقائيًا لبرنامج Medicaid. ومن يتلقون SSDI قد يتأهلون لبرنامج Medicare بعد فترة انتظار مدتها 24 شهرًا، ويمكن أن يغطيهم Medicaid خلال هذه الفترة.",
      },
      {
        title: "كبار السن (65 عامًا فأكثر)",
        desc: "قد يتأهل كبار السن ذوو الدخل والأصول المحدودة لبرنامج Medicaid الكامل إلى جانب Medicare. يغطي Medicaid خدمات لا يغطيها Medicare، مثل الرعاية طويلة الأمد وتكاليف دور رعاية المسنين.",
      },
      {
        title: "البالغون في ولايات بلا توسيع",
        desc: "بدون التوسيع، تعتمد التغطية كثيرًا على فئتك. قد يظل الآباء ذوو الدخل المنخفض جدًا والحوامل وذوو الإعاقة مؤهلين. أما البالغون بلا أطفال فغالبًا لا توجد لهم طريقة للتأهل في هذه الولايات.",
      },
    ],
    faqs: [
      {
        q: "ما حد الدخل لبرنامج Medicaid في عام 2026؟",
        a: "في الولايات التي وسّعت Medicaid، يتأهل البالغون إذا كان دخلهم حتى 138% من FPL، أي نحو $20,783 سنويًا لشخص يعيش وحده في عام 2026. الولايات التي لم توسّع البرنامج تضع حدودها الخاصة، وغالبًا تكون أقل بكثير.",
      },
      {
        q: "ما الولايات التي وسّعت Medicaid؟",
        a: "حتى عام 2026، وسّعت 41 ولاية ومقاطعة كولومبيا برنامج Medicaid. ومن الولايات التي لم توسّعه: ألاباما وفلوريدا وجورجيا والميسيسيبي وكارولاينا الجنوبية وتينيسي وتكساس وويسكونسن ووايومنغ.",
      },
      {
        q: "كيف أتقدم بطلب للحصول على Medicaid؟",
        a: "يمكنك التقدم من خلال جهة Medicaid في ولايتك، أو عبر Healthcare.gov خلال فترة التسجيل المفتوح، أو في أي وقت من السنة إذا حدث تغيير مؤهل في حياتك. يرشدك فحص Benefind مباشرة إلى موقع تقديم الطلبات في ولايتك.",
      },
      {
        q: "هل يؤثر الحمل على الأهلية لبرنامج Medicaid؟",
        a: "نعم. تتأهل الحوامل عادةً عند حدود دخل أعلى، غالبًا 185-250% من FPL. في كثير من الولايات، يتوفر Medicaid للحوامل بغض النظر عن وضع الهجرة.",
      },
      {
        q: "هل يمكنني الحصول على Medicaid إذا كان لدي Medicare؟",
        a: "نعم. الأشخاص المؤهلون للبرنامجين يحصلون على الاثنين. يدفع Medicaid أقساط Medicare ومبالغ المشاركة في الدفع، ويغطي خدمات لا يغطيها Medicare، مثل الرعاية طويلة الأمد وعلاج الأسنان.",
      },
    ],
    ctaEyebrow: "[الفحص الكامل]",
    ctaTitle: "احصل على نتيجة دقيقة",
    ctaBody:
      "تغطي هذه الأداة الأساسيات فقط. يفحص فحص Benefind الكامل كل طرق التأهل لبرنامج Medicaid وCHIP وائتمانات سوق التأمين وأكثر من 40 برنامجًا آخر في مرة واحدة.",
    ctaLink: "ابدأ الفحص المجاني",
    cardTitle: "أداة تقدير الأهلية لبرنامج Medicaid",
    cardDescription:
      "مبنية على قواعد Medicaid الفيدرالية وقواعد الولايات لعام 2026. تقديرات فقط.",
    expansionHint: "ولاية وسّعت البرنامج (حد 138% من FPL)",
    nonExpansionHint: "ولاية لم توسّع البرنامج (الحدود تختلف)",
    incomeLabel: "الدخل السنوي للأسرة ($)",
    incomeHelp: "الدخل الإجمالي قبل الضرائب",
    ageLabel: "العمر (مقدم الطلب الرئيسي)",
    pregnantLabel: "حامل حاليًا",
    pregnantHelp: "قد تنطبق حدود دخل أعلى",
    disabilityLabel: "لديه إعاقة أو يتلقى SSI/SSDI",
    disabilityHelp: "قد يتأهل عن طريق الإعاقة",
    check: "تحقق من الأهلية",
    resultLabel: "النتيجة",
    status: {
      likely: "مؤهل على الأرجح",
      notQualify: "قد لا تكون مؤهلًا",
      checkState: "استفسر من ولايتك",
    },
    results: {
      noState: {
        headline: "اختر ولاية للمتابعة",
        detail:
          "تختلف قواعد Medicaid كثيرًا من ولاية لأخرى. اختر ولايتك في الأعلى لتحصل على تقدير خاص بك.",
      },
      disability: {
        headline: "مؤهل على الأرجح عن طريق الإعاقة",
        detailExpansion:
          "الأشخاص الذين يتلقون إعانات SSI أو SSDI يتأهلون عادةً لبرنامج Medicaid تلقائيًا في معظم الولايات، بغض النظر عن حدود الدخل. {state} ولاية وسّعت البرنامج.",
        detailNonExpansion:
          "الأشخاص الذين يتلقون إعانات SSI أو SSDI يتأهلون عادةً لبرنامج Medicaid تلقائيًا في معظم الولايات، بغض النظر عن حدود الدخل. {state} ولاية لم توسّع البرنامج.",
        stateDetail:
          "في {state}، غالبًا ما يُسجَّل الأشخاص ذوو الإعاقة المؤهلة في Medicaid تلقائيًا عندما يتلقون إعانات الإعاقة الفيدرالية. تحقق من نوع إعانتك مع الجهة المختصة في ولايتك.",
      },
      pregnancy: {
        headline: "مؤهلة على الأرجح عن طريق Medicaid للحوامل",
        detail:
          "تغطي {state} الحوامل اللواتي يصل دخلهن إلى نحو 185% من FPL (${limit}/سنة لأسرة من {size} أفراد). يبدو أن دخلك ضمن هذا الحد.",
        stateDetail:
          "يغطي Medicaid للحوامل في {state} رعاية ما قبل الولادة والولادة ورعاية ما بعد الولادة. غالبًا تستمر التغطية 60 يومًا بعد الولادة، وتمدّها بعض الولايات إلى 12 شهرًا.",
      },
      eligible: {
        headline: "مؤهل على الأرجح في {state}",
        detail:
          "يبدو أن دخلك (${income}/سنة) ضمن حد Medicaid في {state}، وهو {pct} من FPL (${limit}/سنة لأسرة من {size} أفراد).",
        stateDetailExpansion:
          "وسّعت {state} برنامج Medicaid بموجب ACA، فأصبح يغطي البالغين الذين يصل دخلهم إلى 138% من خط الفقر الفيدرالي. قد يتأهل الأطفال والحوامل وذوو الإعاقة عند حدود أعلى.",
        stateDetailNonExpansion:
          "لم توسّع {state} برنامج Medicaid. التغطية متاحة أساسًا للبالغين الذين يصل دخلهم إلى 100% من خط الفقر الفيدرالي. قد يتأهل الأطفال والحوامل وذوو الإعاقة عند حدود أعلى.",
      },
      gap: {
        headline: "فجوة التغطية في {state}",
        detail:
          "دخلك (${income}/سنة) أعلى من حد Medicaid في {state} لكنه أقل من 138% من FPL. لأن {state} لم توسّع Medicaid، قد تكون ضمن فجوة التغطية.",
        stateDetail:
          "في فجوة التغطية، يكون الدخل أعلى من حد Medicaid التقليدي لكنه أقل من أن يؤهل لدعم سوق التأمين ضمن ACA (الذي يبدأ عند 100% من FPL). تحقق مما إذا كان لدى {state} توسيع محدود أو برامج خاصة. قد تكون مؤهلًا أيضًا للتغطية من سوق التأمين.",
      },
      marketplace: {
        headline: "الدخل أعلى من حد Medicaid؛ قد يساعدك سوق التأمين",
        detail:
          "دخلك (${income}/سنة) على الأرجح أعلى من حد Medicaid في {state}، لكنك قد تتأهل لتغطية مدعومة من سوق التأمين عبر Healthcare.gov.",
        stateDetail:
          "في {state}، قد تتأهل الأسر التي يتراوح دخلها بين 100% و400% من FPL (من ${low} إلى ${high}/سنة) لائتمانات ضريبية تخفض أقساط التأمين. سيفحص فحص Benefind الكامل أهليتك في سوق التأمين أيضًا.",
      },
      over: {
        headline: "الدخل على الأرجح أعلى من حدود الأهلية",
        detail:
          "يبدو أن دخلك (${income}/سنة) أعلى من حدود Medicaid ودعم سوق التأمين في {state}. لكن عوامل أخرى في أسرتك قد تغيّر هذا.",
        stateDetail:
          "سيفحص فحص Benefind الكامل برامج أخرى، منها CHIP للأطفال في الأسرة، وبرامج خاصة بالولاية، وخيارات التغطية من خلال صاحب العمل.",
      },
    },
    disclaimer:
      "تقديرات فقط. القواعد تتغير كثيرًا. تحقق من أهليتك مع جهة Medicaid في ولايتك.",
  },
  rd: {
    breadcrumb: "حاسبة الائتمان الضريبي للبحث والتطوير",
    eyebrow: "[الائتمان الضريبي للبحث والتطوير]",
    title: "حاسبة الائتمان الضريبي للبحث والتطوير لعام 2026",
    intro:
      "احسب الائتمان الضريبي الفيدرالي للبحث والتطوير (R&D) بطريقة الائتمان المبسّط البديل (ASC). قد تتمكن الشركات الناشئة التي تقل إيراداتها الإجمالية عن $5M من خصمه مباشرة من ضرائب الرواتب.",
    whatTitle: "ما هو الائتمان الضريبي للبحث والتطوير؟",
    whatP1:
      "يسمح الائتمان الضريبي الفيدرالي للبحث والتطوير (المادة 41 من قانون الإيرادات الداخلية) للشركات بتخفيض ضرائبها الفيدرالية دولارًا مقابل دولار عن أنشطة البحث المؤهلة. الخصم الضريبي يخفض الدخل الخاضع للضريبة، أما الائتمان فيخفض المبلغ المستحق عليك مباشرة.",
    whatP2:
      "جعل قانون PATH لعام 2015 هذا الائتمان دائمًا، ثم توسّع في عام 2023 ليسمح للشركات الصغيرة المؤهلة بخصم ما يصل إلى $500,000 سنويًا من ضرائب الرواتب. كان هذا تغييرًا كبيرًا للشركات الناشئة التي لم تحقق إيرادات بعد، والتي لم تكن تستطيع استخدام الائتمان سابقًا لأنها لم تكن عليها ضريبة دخل.",
    whatP3:
      "أكثر طرق الحساب شيوعًا هي الائتمان المبسّط البديل (ASC)، ويساوي 14% من نفقات البحث المؤهلة (QRE) التي تزيد على 50% من متوسط QRE للسنوات الثلاث السابقة. الشركات التي ليس لها سجل QRE سابق تستخدم نسبة مبسّطة قدرها 6%. تفضّل معظم الشركات ASC لأن طريقة الائتمان العادي تتطلب سجلات مفصلة تعود إلى منتصف الثمانينيات.",
    offsetTitle: "خصم الائتمان من ضرائب الرواتب للشركات الناشئة",
    offsetP1:
      "الشركات التي لم تحقق إيرادات أو التي في مراحلها الأولى غالبًا لا تكون عليها ضريبة دخل، ولذلك لم يكن ائتمان البحث والتطوير مفيدًا لها سابقًا. خيار الخصم من ضرائب الرواتب للشركات الناشئة يغيّر ذلك. إذا كانت إيرادات شركتك الإجمالية أقل من 5 ملايين دولار ولديها إيرادات منذ أقل من 5 سنوات، يمكنك اختيار خصم ائتمان البحث والتطوير (حتى $500,000) من حصة صاحب العمل في ضرائب الضمان الاجتماعي على الرواتب.",
    offsetP2:
      "هذا يعني أن كل دولار مؤهل يُنفق على البحث والتطوير يمكن أن يحقق توفيرًا نقديًا حقيقيًا، حتى لو لم تحقق شركتك أي ربح. لشركة ناشئة تنفق مليوني دولار على رواتب مهندسين مؤهلة، قد يعني هذا توفير أكثر من $140,000 سنويًا من ضرائب الرواتب.",
    exampleEyebrow: "[مثال]",
    exampleBody:
      "شركة SaaS عمرها 3 سنوات لديها $800K رواتب مهندسين (75% منها للبحث والتطوير)، و$150K تكاليف حوسبة سحابية للبحث والتطوير، و$1.2M إيرادات إجمالية، فتحسب QRE بقيمة $750K. بما أنه لا يوجد سجل QRE سابق، يكون ائتمان ASC هو 6% من $750K = $45,000. وبصفتها شركة ناشئة مؤهلة، تخصم كامل مبلغ $45,000 من ضرائب الرواتب، فتنخفض دفعاتها الفصلية على نموذج 941 بمقدار $45,000.",
    qreTitle: "ما الذي يُحسب من نفقات البحث المؤهلة؟",
    qreIntro:
      "ليست كل نفقات البحث والتطوير مؤهلة. تستخدم مصلحة الضرائب (IRS) اختبارًا من أربعة أجزاء لتحديد ما إذا كان النشاط بحثًا مؤهلًا: يجب أن يكون لغرض مسموح به (تطوير أو تحسين جزء من العمل)، وأن يكون ذا طبيعة تقنية، وأن يزيل عدم اليقين، وأن يتضمن عملية تجريب.",
    qualifiesTitle: "ما هو مؤهل",
    qualifies: [
      "رواتب المهندسين والعلماء ومطوري البرمجيات الذين يعملون في أنشطة مؤهلة",
      "تكاليف المستلزمات والمواد المستهلكة في البحث",
      "65% من المدفوعات للمقاولين الخارجيين مقابل البحث المؤهل",
      "تكاليف الحوسبة السحابية المستخدمة في التطوير والاختبار (قد تكون مؤهلة)",
      "تطوير البرمجيات لمنتجات أو عمليات جديدة أو محسّنة",
    ],
    notQualifiesTitle: "ما هو غير مؤهل",
    notQualifies: [
      "أنشطة الإدارة والتسويق وتطوير الأعمال",
      "البحث الممول (إذا دفع طرف آخر تكلفته وتحمّل المخاطرة)",
      "البحث بعد بدء الإنتاج التجاري",
      "أبحاث السوق أو الاستطلاعات أو أبحاث العلوم الاجتماعية",
      "البحث الذي يُجرى خارج الولايات المتحدة",
    ],
    faqs: [
      {
        q: "ما هو الائتمان الضريبي للبحث والتطوير؟",
        a: "يسمح الائتمان الضريبي الفيدرالي للبحث والتطوير (المادة 41) للشركات بتخفيض ضرائبها مقابل نفقات البحث المؤهلة. الائتمان المبسّط البديل (ASC) يساوي 14% من QRE التي تزيد على 50% من متوسط QRE للسنوات السابقة، أو 6% إذا لم يكن هناك سجل سابق.",
      },
      {
        q: "من يتأهل للائتمان الضريبي للبحث والتطوير؟",
        a: "أي شركة أمريكية لديها نفقات بحث مؤهلة قد تكون مؤهلة. يجب أن تجتاز الأنشطة الاختبار المكوّن من أربعة أجزاء: غرض مسموح به، وطبيعة تقنية، وإزالة عدم اليقين، والتجريب. تطوير البرمجيات والهندسة مؤهلان في الغالب.",
      },
      {
        q: "ما هو خصم الائتمان من ضرائب الرواتب للشركات الناشئة؟",
        a: "الشركات الصغيرة المؤهلة التي تقل إيراداتها الإجمالية عن $5M ولديها إيرادات منذ 5 سنوات أو أقل يمكنها خصم ما يصل إلى $500,000 من ائتمان البحث والتطوير من ضرائب الرواتب. هذا يساعد الشركات التي لم تحقق إيرادات وليس عليها ضريبة دخل تخصم منها.",
      },
      {
        q: "ما الذي يُحسب من نفقات البحث المؤهلة (QRE)؟",
        a: "تشمل QRE رواتب الموظفين الذين يجرون بحثًا مؤهلًا، والمستلزمات المستهلكة في البحث، و65% من المدفوعات للمقاولين الخارجيين. قد تكون تكاليف الحوسبة السحابية مؤهلة. الإدارة والتسويق والبحث الممول غير مؤهلة.",
      },
      {
        q: "ما هي طريقة ASC؟",
        a: "يحسب الائتمان المبسّط البديل الائتمانَ بنسبة 14% من QRE التي تزيد على 50% من متوسط QRE للسنوات الثلاث السابقة. الشركات التي ليس لها QRE سابقة تستخدم نسبة 6%. تفضّل معظم الشركات ASC لأنها تحتاج إلى مستندات تاريخية أقل.",
      },
    ],
    ctaEyebrow: "[الفحص الكامل]",
    ctaTitle: "هل تريد تحليلًا مفصلًا للبحث والتطوير؟",
    ctaBody:
      "تعطيك هذه الحاسبة تقديرًا تقريبيًا. يفحص فحص Benefind الكامل للشركات أهلية ائتمان البحث والتطوير إلى جانب أكثر من 20 برنامجًا ضريبيًا آخر للأعمال.",
    ctaLink: "ابدأ فحص الشركة",
    cardTitle: "أداة تقدير الائتمان الضريبي للبحث والتطوير",
    cardDescription:
      "تقدير بطريقة ASC. استشر مختصًا في الضرائب للحصول على حسابات رسمية.",
    spendingLabel: "الإنفاق السنوي على البحث والتطوير ($)",
    spendingHelp:
      "إجمالي ميزانية البحث والتطوير بما فيها الرواتب والمقاولون والمستلزمات",
    qresLabel: "إجمالي QRE، نفقات البحث المؤهلة ($)",
    qresHelp:
      "الرواتب المؤهلة + المستلزمات + 65% من تكاليف المقاولين. اتركه فارغًا لتقديره من الإنفاق أعلاه.",
    priorLabel: "متوسط QRE، آخر 3 سنوات ($)",
    priorPlaceholder: "مثال: 200000 (أو 0 لشركة ناشئة)",
    priorHelp: "اتركه فارغًا أو أدخل 0 إذا لم يكن لديك سجل QRE سابق",
    receiptsLabel: "الإيرادات الإجمالية، السنة الحالية ($)",
    receiptsHelp:
      "إجمالي الإيرادات. يجب أن تكون أقل من $5M للخصم من ضرائب الرواتب.",
    yearsLabel: "عدد السنوات التي فيها إيرادات",
    yearsHelp: "يجب أن تكون 5 سنوات أو أقل للتأهل للخصم من ضرائب الرواتب",
    calculate: "احسب الائتمان الخاص بي",
    resultLabel: "ائتمان البحث والتطوير المقدّر ({method})",
    methodAsc: "ASC 14%",
    methodNoHistory: "ASC 6%، بلا سجل سابق",
    creditSuffix: "ائتمان",
    offsetEligible: "مؤهل للخصم من ضرائب الرواتب",
    offsetEligibleBody:
      "يمكنك خصم ما يصل إلى {amount} من ضرائب الرواتب بدلًا من ضريبة الدخل.",
    offsetNotEligible: "الخصم من ضرائب الرواتب: غير مؤهل",
    offsetNotEligibleBody:
      "يُخصم الائتمان من ضريبة الدخل. يمكن ترحيل الائتمانات غير المستخدمة لمدة 20 سنة.",
    notes: {
      base: "المبلغ الأساسي: 50% من متوسط QRE السابقة = ${amount}",
      excess: "QRE الزائدة على المبلغ الأساسي: ${amount}",
      rate: "نسبة الائتمان: 14% من QRE الزائدة (طريقة ASC)",
      noHistory: "لا يوجد سجل QRE سابق، لذا تُطبَّق نسبة 6% للشركات الناشئة",
      offset:
        "مؤهل للخصم من ضرائب الرواتب (إيرادات أقل من $5M، و5 سنوات أو أقل)",
      cap: "الحد الأقصى للخصم من ضرائب الرواتب $500,000؛ ويُخصم الباقي من ضريبة الدخل",
    },
    disclaimer:
      "تقديرات فقط. حساب ائتمان البحث والتطوير يتطلب تحليلًا مفصلًا للأنشطة. استشر مختصًا مؤهلًا في الضرائب قبل تقديم الإقرار.",
  },
};

export const tools: Record<Locale, ToolsMessages> = { en, es, zh, vi, ar };
