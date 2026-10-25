import type { Locale } from "../types";

// Prices are passed in with fmt() from PLAN_PRICES so copy never drifts from
// what Stripe charges. Plan names "Premium" and "Business" are not translated.

const en = {
  billing: {
    title: "Billing",
    description: "Manage your plan and payments.",
    free: "Free",
    premium: "Premium",
    business: "Business",
    perMonth: "/month",
    annualOption: "or ${price}/year, 2 months free",
    currentPlan: "Your current plan",
    recommended: "Recommended",
    subscribeMonthly: "Subscribe monthly (${price}/month)",
    subscribeAnnually: "Subscribe yearly (${price}/year)",
    manageSubscription: "Manage Subscription",
    renewsOn: "Renews on {date}",
    cancelsOn: "Cancels on {date}. You keep paid features until then.",
    compedNote: "Paid features are turned on for this workspace.",
    pastDueNote:
      "Your last payment did not go through. Update your card in Manage Subscription to keep paid features.",
    plansForPersonal: "Plans for personal workspaces",
    plansForBusiness: "Plans for business workspaces",
    statuses: {
      active: "Active",
      trialing: "Trial",
      past_due: "Payment past due",
      canceled: "Canceled",
      incomplete: "Payment incomplete",
      incomplete_expired: "Expired",
      unpaid: "Unpaid",
    },
    features: {
      personalFree: [
        "Run screenings any time",
        "See your results",
        "Keep your latest screening",
      ],
      personalPremium: [
        "Full screening history",
        "Re-screen with your previous answers filled in",
        "Document storage",
        "Email alerts when you may qualify for new benefits",
        "Priority support",
      ],
      businessFree: [
        "Run the company screening",
        "See which programs match and how many",
      ],
      business: [
        "Full details for every matched program",
        "Estimated value of each program",
        "Why your company qualifies",
        "Next steps to apply",
        "Document storage",
        "Priority support",
      ],
    },
    notices: {
      success:
        "Thank you. Your payment went through. Paid features turn on within a minute; refresh this page if they do not show yet.",
      canceled: "Checkout was canceled. You were not charged.",
    },
    errors: {
      already_subscribed:
        "This account already has a paid plan. Use Manage Subscription to change it.",
      plan_mismatch:
        "That plan does not match this workspace. Choose a plan on this page.",
      invalid_price: "That plan is not valid. Choose a plan on this page.",
      unavailable:
        "Checkout is not available right now. Please try again later.",
      no_workspace: "Select a workspace before you subscribe.",
      no_subscription: "We could not find a subscription for this account.",
    },
  },
  gate: {
    premiumTitle: "Available on Premium",
    businessTitle: "Available on the Business plan",
    premiumBody:
      "{feature} is part of Premium, ${monthly}/month or ${annual}/year.",
    businessBody:
      "{feature} is part of the Business plan, ${monthly}/month or ${annual}/year.",
    viewPlans: "View Plans",
    signedOutCta: "Create an account to subscribe",
    features: {
      history: "Screening history",
      documents: "Document storage",
      alerts: "Email alerts for new benefits",
      programDetails: "Program details",
      prefill: "Re-screening with your previous answers",
    },
  },
  dashboard: {
    newScreening: "New screening",
    companyMatchesTitle: "Matched programs",
    companyNoProfile: "Run the company screening to see which programs match.",
    companyStart: "Start company screening",
  },
  companyLock: {
    title: "Program details are on the Business plan",
    bodyOne:
      "Your company matched {count} program. Its details, estimated value, reasons you qualify, and next steps are part of the Business plan, ${monthly}/month or ${annual}/year.",
    bodyOther:
      "Your company matched {count} programs. Each program's details, estimated value, reasons you qualify, and next steps are part of the Business plan, ${monthly}/month or ${annual}/year.",
    locked: "Details locked",
  },
};

export type PlansMessages = typeof en;

const es: PlansMessages = {
  billing: {
    title: "Facturación",
    description: "Administre su plan y sus pagos.",
    free: "Gratis",
    premium: "Premium",
    business: "Business",
    perMonth: "/mes",
    annualOption: "o ${price}/año, 2 meses gratis",
    currentPlan: "Su plan actual",
    recommended: "Recomendado",
    subscribeMonthly: "Suscribirse mensualmente (${price}/mes)",
    subscribeAnnually: "Suscribirse anualmente (${price}/año)",
    manageSubscription: "Administrar suscripción",
    renewsOn: "Se renueva el {date}",
    cancelsOn:
      "Se cancela el {date}. Conserva las funciones pagadas hasta esa fecha.",
    compedNote:
      "Las funciones pagadas están activadas para este espacio de trabajo.",
    pastDueNote:
      "Su último pago no se procesó. Actualice su tarjeta en Administrar suscripción para conservar las funciones pagadas.",
    plansForPersonal: "Planes para espacios de trabajo personales",
    plansForBusiness: "Planes para espacios de trabajo de empresa",
    statuses: {
      active: "Activa",
      trialing: "Prueba",
      past_due: "Pago vencido",
      canceled: "Cancelada",
      incomplete: "Pago incompleto",
      incomplete_expired: "Vencida",
      unpaid: "Sin pagar",
    },
    features: {
      personalFree: [
        "Haga evaluaciones cuando quiera",
        "Vea sus resultados",
        "Conserve su evaluación más reciente",
      ],
      personalPremium: [
        "Historial completo de evaluaciones",
        "Vuelva a evaluar con sus respuestas anteriores ya completadas",
        "Almacenamiento de documentos",
        "Alertas por correo cuando pueda calificar para nuevos beneficios",
        "Soporte prioritario",
      ],
      businessFree: [
        "Haga la evaluación de empresa",
        "Vea qué programas coinciden y cuántos son",
      ],
      business: [
        "Detalles completos de cada programa coincidente",
        "Valor estimado de cada programa",
        "Por qué su empresa califica",
        "Próximos pasos para solicitar",
        "Almacenamiento de documentos",
        "Soporte prioritario",
      ],
    },
    notices: {
      success:
        "Gracias. Su pago se procesó. Las funciones pagadas se activan en un minuto; actualice esta página si aún no aparecen.",
      canceled: "Se canceló el pago. No se le hizo ningún cargo.",
    },
    errors: {
      already_subscribed:
        "Esta cuenta ya tiene un plan pagado. Use Administrar suscripción para cambiarlo.",
      plan_mismatch:
        "Ese plan no corresponde a este espacio de trabajo. Elija un plan en esta página.",
      invalid_price: "Ese plan no es válido. Elija un plan en esta página.",
      unavailable:
        "El pago no está disponible en este momento. Inténtelo de nuevo más tarde.",
      no_workspace: "Seleccione un espacio de trabajo antes de suscribirse.",
      no_subscription: "No encontramos una suscripción para esta cuenta.",
    },
  },
  gate: {
    premiumTitle: "Disponible en Premium",
    businessTitle: "Disponible en el plan Business",
    premiumBody:
      "{feature} forma parte de Premium, ${monthly}/mes o ${annual}/año.",
    businessBody:
      "{feature} forma parte del plan Business, ${monthly}/mes o ${annual}/año.",
    viewPlans: "Ver planes",
    signedOutCta: "Cree una cuenta para suscribirse",
    features: {
      history: "El historial de evaluaciones",
      documents: "El almacenamiento de documentos",
      alerts: "Las alertas por correo de nuevos beneficios",
      programDetails: "El detalle de los programas",
      prefill: "Volver a evaluar con sus respuestas anteriores",
    },
  },
  dashboard: {
    newScreening: "Nueva evaluación",
    companyMatchesTitle: "Programas coincidentes",
    companyNoProfile:
      "Haga la evaluación de empresa para ver qué programas coinciden.",
    companyStart: "Iniciar evaluación de empresa",
  },
  companyLock: {
    title: "El detalle de los programas está en el plan Business",
    bodyOne:
      "Su empresa coincide con {count} programa. Su detalle, valor estimado, los motivos por los que califica y los próximos pasos forman parte del plan Business, ${monthly}/mes o ${annual}/año.",
    bodyOther:
      "Su empresa coincide con {count} programas. El detalle, valor estimado, los motivos por los que califica y los próximos pasos de cada programa forman parte del plan Business, ${monthly}/mes o ${annual}/año.",
    locked: "Detalles bloqueados",
  },
};

const zh: PlansMessages = {
  billing: {
    title: "账单",
    description: "管理您的方案和付款。",
    free: "免费",
    premium: "Premium",
    business: "Business",
    perMonth: "/月",
    annualOption: "或 ${price}/年，相当于免费 2 个月",
    currentPlan: "您当前的方案",
    recommended: "推荐",
    subscribeMonthly: "按月订阅（${price}/月）",
    subscribeAnnually: "按年订阅（${price}/年）",
    manageSubscription: "管理订阅",
    renewsOn: "将于 {date} 续订",
    cancelsOn: "将于 {date} 取消。在此之前您仍可使用付费功能。",
    compedNote: "此工作区已开通付费功能。",
    pastDueNote:
      "您上一次付款未成功。请在“管理订阅”中更新银行卡，以继续使用付费功能。",
    plansForPersonal: "个人工作区方案",
    plansForBusiness: "企业工作区方案",
    statuses: {
      active: "有效",
      trialing: "试用中",
      past_due: "付款逾期",
      canceled: "已取消",
      incomplete: "付款未完成",
      incomplete_expired: "已过期",
      unpaid: "未付款",
    },
    features: {
      personalFree: ["随时进行筛查", "查看您的结果", "保存最近一次筛查"],
      personalPremium: [
        "完整的筛查历史",
        "自动填入之前的答案重新筛查",
        "文件存储",
        "当您可能符合新福利条件时发送邮件提醒",
        "优先支持",
      ],
      businessFree: ["进行企业筛查", "查看匹配的项目及数量"],
      business: [
        "每个匹配项目的完整详情",
        "每个项目的预估价值",
        "贵公司符合条件的原因",
        "申请的后续步骤",
        "文件存储",
        "优先支持",
      ],
    },
    notices: {
      success:
        "谢谢。您的付款已完成。付费功能将在一分钟内开通；如果尚未显示，请刷新此页面。",
      canceled: "结账已取消。您没有被收费。",
    },
    errors: {
      already_subscribed: "此账户已有付费方案。请使用“管理订阅”进行更改。",
      plan_mismatch: "该方案与此工作区不匹配。请在此页面选择方案。",
      invalid_price: "该方案无效。请在此页面选择方案。",
      unavailable: "目前无法结账。请稍后再试。",
      no_workspace: "订阅前请先选择一个工作区。",
      no_subscription: "未找到此账户的订阅。",
    },
  },
  gate: {
    premiumTitle: "Premium 方案功能",
    businessTitle: "Business 方案功能",
    premiumBody:
      "{feature}包含在 Premium 方案中，${monthly}/月或 ${annual}/年。",
    businessBody:
      "{feature}包含在 Business 方案中，${monthly}/月或 ${annual}/年。",
    viewPlans: "查看方案",
    signedOutCta: "创建账户以订阅",
    features: {
      history: "筛查历史",
      documents: "文件存储",
      alerts: "新福利邮件提醒",
      programDetails: "项目详情",
      prefill: "使用之前的答案重新筛查",
    },
  },
  dashboard: {
    newScreening: "新筛查",
    companyMatchesTitle: "匹配的项目",
    companyNoProfile: "进行企业筛查，查看哪些项目匹配。",
    companyStart: "开始企业筛查",
  },
  companyLock: {
    title: "项目详情包含在 Business 方案中",
    bodyOne:
      "贵公司匹配了 {count} 个项目。该项目的详情、预估价值、符合条件的原因和后续步骤包含在 Business 方案中，${monthly}/月或 ${annual}/年。",
    bodyOther:
      "贵公司匹配了 {count} 个项目。每个项目的详情、预估价值、符合条件的原因和后续步骤包含在 Business 方案中，${monthly}/月或 ${annual}/年。",
    locked: "详情已锁定",
  },
};

const vi: PlansMessages = {
  billing: {
    title: "Thanh toán",
    description: "Quản lý gói và các khoản thanh toán của bạn.",
    free: "Miễn phí",
    premium: "Premium",
    business: "Business",
    perMonth: "/tháng",
    annualOption: "hoặc ${price}/năm, miễn phí 2 tháng",
    currentPlan: "Gói hiện tại của bạn",
    recommended: "Đề xuất",
    subscribeMonthly: "Đăng ký theo tháng (${price}/tháng)",
    subscribeAnnually: "Đăng ký theo năm (${price}/năm)",
    manageSubscription: "Quản lý gói đăng ký",
    renewsOn: "Gia hạn vào {date}",
    cancelsOn:
      "Hủy vào {date}. Bạn vẫn dùng được các tính năng trả phí đến ngày đó.",
    compedNote: "Không gian làm việc này đã được bật các tính năng trả phí.",
    pastDueNote:
      "Khoản thanh toán gần nhất của bạn không thành công. Hãy cập nhật thẻ trong Quản lý gói đăng ký để giữ các tính năng trả phí.",
    plansForPersonal: "Các gói cho không gian làm việc cá nhân",
    plansForBusiness: "Các gói cho không gian làm việc doanh nghiệp",
    statuses: {
      active: "Đang hoạt động",
      trialing: "Dùng thử",
      past_due: "Quá hạn thanh toán",
      canceled: "Đã hủy",
      incomplete: "Thanh toán chưa hoàn tất",
      incomplete_expired: "Đã hết hạn",
      unpaid: "Chưa thanh toán",
    },
    features: {
      personalFree: [
        "Kiểm tra bất cứ lúc nào",
        "Xem kết quả của bạn",
        "Lưu lần kiểm tra gần nhất",
      ],
      personalPremium: [
        "Toàn bộ lịch sử kiểm tra",
        "Kiểm tra lại với câu trả lời trước đó được điền sẵn",
        "Lưu trữ giấy tờ",
        "Email thông báo khi bạn có thể đủ điều kiện nhận phúc lợi mới",
        "Hỗ trợ ưu tiên",
      ],
      businessFree: [
        "Thực hiện kiểm tra doanh nghiệp",
        "Xem các chương trình phù hợp và số lượng",
      ],
      business: [
        "Chi tiết đầy đủ cho mỗi chương trình phù hợp",
        "Giá trị ước tính của mỗi chương trình",
        "Lý do doanh nghiệp của bạn đủ điều kiện",
        "Các bước tiếp theo để nộp đơn",
        "Lưu trữ giấy tờ",
        "Hỗ trợ ưu tiên",
      ],
    },
    notices: {
      success:
        "Cảm ơn bạn. Thanh toán đã thành công. Các tính năng trả phí sẽ được bật trong vòng một phút; hãy tải lại trang nếu chưa thấy.",
      canceled: "Đã hủy thanh toán. Bạn không bị tính phí.",
    },
    errors: {
      already_subscribed:
        "Tài khoản này đã có gói trả phí. Hãy dùng Quản lý gói đăng ký để thay đổi.",
      plan_mismatch:
        "Gói này không phù hợp với không gian làm việc này. Hãy chọn một gói trên trang này.",
      invalid_price: "Gói này không hợp lệ. Hãy chọn một gói trên trang này.",
      unavailable: "Hiện không thể thanh toán. Vui lòng thử lại sau.",
      no_workspace: "Hãy chọn một không gian làm việc trước khi đăng ký.",
      no_subscription: "Không tìm thấy gói đăng ký nào cho tài khoản này.",
    },
  },
  gate: {
    premiumTitle: "Có trong gói Premium",
    businessTitle: "Có trong gói Business",
    premiumBody:
      "{feature} thuộc gói Premium, ${monthly}/tháng hoặc ${annual}/năm.",
    businessBody:
      "{feature} thuộc gói Business, ${monthly}/tháng hoặc ${annual}/năm.",
    viewPlans: "Xem các gói",
    signedOutCta: "Tạo tài khoản để đăng ký",
    features: {
      history: "Lịch sử kiểm tra",
      documents: "Lưu trữ giấy tờ",
      alerts: "Email thông báo phúc lợi mới",
      programDetails: "Chi tiết chương trình",
      prefill: "Kiểm tra lại với câu trả lời trước đó",
    },
  },
  dashboard: {
    newScreening: "Kiểm tra mới",
    companyMatchesTitle: "Chương trình phù hợp",
    companyNoProfile:
      "Thực hiện kiểm tra doanh nghiệp để xem chương trình nào phù hợp.",
    companyStart: "Bắt đầu kiểm tra doanh nghiệp",
  },
  companyLock: {
    title: "Chi tiết chương trình có trong gói Business",
    bodyOne:
      "Doanh nghiệp của bạn phù hợp với {count} chương trình. Chi tiết, giá trị ước tính, lý do đủ điều kiện và các bước tiếp theo của chương trình này thuộc gói Business, ${monthly}/tháng hoặc ${annual}/năm.",
    bodyOther:
      "Doanh nghiệp của bạn phù hợp với {count} chương trình. Chi tiết, giá trị ước tính, lý do đủ điều kiện và các bước tiếp theo của mỗi chương trình thuộc gói Business, ${monthly}/tháng hoặc ${annual}/năm.",
    locked: "Chi tiết bị khóa",
  },
};

const ar: PlansMessages = {
  billing: {
    title: "الفوترة",
    description: "أدِر خطتك ومدفوعاتك.",
    free: "مجاني",
    premium: "Premium",
    business: "Business",
    perMonth: "/شهريًا",
    annualOption: "أو ${price}/سنويًا، أي شهران مجانًا",
    currentPlan: "خطتك الحالية",
    recommended: "موصى بها",
    subscribeMonthly: "اشترك شهريًا (${price}/شهريًا)",
    subscribeAnnually: "اشترك سنويًا (${price}/سنويًا)",
    manageSubscription: "إدارة الاشتراك",
    renewsOn: "يتجدد في {date}",
    cancelsOn:
      "يُلغى في {date}. تبقى الميزات المدفوعة متاحة لك حتى ذلك التاريخ.",
    compedNote: "الميزات المدفوعة مفعّلة لمساحة العمل هذه.",
    pastDueNote:
      "لم تتم عملية الدفع الأخيرة. حدّث بطاقتك من إدارة الاشتراك للاحتفاظ بالميزات المدفوعة.",
    plansForPersonal: "خطط مساحات العمل الشخصية",
    plansForBusiness: "خطط مساحات عمل الشركات",
    statuses: {
      active: "نشط",
      trialing: "تجريبي",
      past_due: "الدفع متأخر",
      canceled: "ملغى",
      incomplete: "الدفع غير مكتمل",
      incomplete_expired: "منتهي",
      unpaid: "غير مدفوع",
    },
    features: {
      personalFree: [
        "أجرِ الفحص في أي وقت",
        "اطّلع على نتائجك",
        "احتفظ بأحدث فحص",
      ],
      personalPremium: [
        "سجل الفحوصات الكامل",
        "أعد الفحص مع تعبئة إجاباتك السابقة",
        "تخزين المستندات",
        "تنبيهات بالبريد الإلكتروني عندما قد تكون مؤهلًا لمزايا جديدة",
        "دعم ذو أولوية",
      ],
      businessFree: ["أجرِ فحص الشركة", "اعرف البرامج المطابقة وعددها"],
      business: [
        "تفاصيل كاملة لكل برنامج مطابق",
        "القيمة التقديرية لكل برنامج",
        "أسباب تأهل شركتك",
        "الخطوات التالية للتقديم",
        "تخزين المستندات",
        "دعم ذو أولوية",
      ],
    },
    notices: {
      success:
        "شكرًا لك. تمت عملية الدفع. تُفعَّل الميزات المدفوعة خلال دقيقة؛ حدّث هذه الصفحة إذا لم تظهر بعد.",
      canceled: "تم إلغاء الدفع. لم يتم خصم أي مبلغ منك.",
    },
    errors: {
      already_subscribed:
        "لدى هذا الحساب خطة مدفوعة بالفعل. استخدم إدارة الاشتراك لتغييرها.",
      plan_mismatch:
        "هذه الخطة لا تناسب مساحة العمل هذه. اختر خطة من هذه الصفحة.",
      invalid_price: "هذه الخطة غير صالحة. اختر خطة من هذه الصفحة.",
      unavailable: "الدفع غير متاح الآن. يرجى المحاولة لاحقًا.",
      no_workspace: "اختر مساحة عمل قبل الاشتراك.",
      no_subscription: "لم يتم العثور على اشتراك لهذا الحساب.",
    },
  },
  gate: {
    premiumTitle: "متاح في Premium",
    businessTitle: "متاح في خطة Business",
    premiumBody:
      "{feature} ضمن خطة Premium، ${monthly}/شهريًا أو ${annual}/سنويًا.",
    businessBody:
      "{feature} ضمن خطة Business، ${monthly}/شهريًا أو ${annual}/سنويًا.",
    viewPlans: "عرض الخطط",
    signedOutCta: "أنشئ حسابًا للاشتراك",
    features: {
      history: "سجل الفحوصات",
      documents: "تخزين المستندات",
      alerts: "تنبيهات المزايا الجديدة بالبريد الإلكتروني",
      programDetails: "تفاصيل البرامج",
      prefill: "إعادة الفحص بإجاباتك السابقة",
    },
  },
  dashboard: {
    newScreening: "فحص جديد",
    companyMatchesTitle: "البرامج المطابقة",
    companyNoProfile: "أجرِ فحص الشركة لمعرفة البرامج المطابقة.",
    companyStart: "ابدأ فحص الشركة",
  },
  companyLock: {
    title: "تفاصيل البرامج متاحة في خطة Business",
    bodyOne:
      "تطابقت شركتك مع برنامج واحد ({count}). تفاصيله وقيمته التقديرية وأسباب التأهل والخطوات التالية ضمن خطة Business، ${monthly}/شهريًا أو ${annual}/سنويًا.",
    bodyOther:
      "تطابقت شركتك مع {count} من البرامج. تفاصيل كل برنامج وقيمته التقديرية وأسباب التأهل والخطوات التالية ضمن خطة Business، ${monthly}/شهريًا أو ${annual}/سنويًا.",
    locked: "التفاصيل مقفلة",
  },
};

export const plans: Record<Locale, PlansMessages> = { en, es, zh, vi, ar };
