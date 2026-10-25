import type { Locale } from "../types";

const en = {
  steps: {
    yes: "Yes",
    no: "No",
    invalidAmount: "Enter a valid dollar amount",
    state: {
      question: "What state do you live in?",
      helpText:
        "Benefits vary by state. We need this to give you accurate results.",
    },
    householdSize: {
      question: "How many people live in your household?",
      helpText:
        "Include yourself, your spouse/partner, and all dependents who live with you.",
      error: "Enter a number between 1 and 20",
    },
    hasChildren: {
      question: "Do you have children under 19 in your household?",
    },
    childrenAges: {
      question: "What are the ages of your children?",
      helpText: "Separate ages with commas (e.g., 2, 5, 12)",
    },
    annualIncome: {
      question: "What's your household's total yearly income before taxes?",
      helpText:
        "Include all sources: wages, salary, tips, Social Security, disability, and child support. Use your best estimate.",
    },
    isEmployed: {
      question: "Is anyone in your household currently employed?",
    },
    hasHealthInsurance: {
      question: "Does your household currently have health insurance?",
      all: "Yes, for everyone",
      some: "Yes, for some members",
    },
    monthlyRent: {
      question: "How much do you pay for rent or mortgage each month?",
      helpText: "Enter 0 if you don't pay rent.",
    },
    specialCircumstances: {
      question: "Do any of these apply to your household?",
      helpText:
        "Select all that apply. These can qualify you for more benefits.",
      pregnant: "Someone is pregnant",
      elderly: "Someone is 60 or older",
      disabled: "Someone has a disability",
      veteran: "Someone is a veteran",
      student: "Someone is a student",
      none: "None of these",
    },
  },
  chat: {
    welcome:
      "Hi! I'm here to help you find government benefits you may qualify for. This takes about 3 minutes.",
    privacy:
      "Your answers are private and won't be shared with anyone. Let's get started.",
    welcomeBack:
      "Welcome back! I've loaded your previous answers. You can update anything that's changed, or just re-submit to get fresh results.",
    prefilled:
      "Let's go through the questions. Your previous answers are pre-filled.",
    calculating:
      "Great, I have everything I need. Let me check which programs you qualify for...",
    saved: "Saved to your account ({email}).",
    saveFailed:
      "We couldn't save these results to your account, but you can still see them below.",
    savedRescreen:
      "Saved to your account ({email}). You can re-screen anytime from your dashboard.",
    signupEligible:
      "Create a free account or sign in to save your results and get personalized next steps.",
    notEligible:
      "Based on the information provided, you may not qualify for the programs we currently check. This doesn't mean there aren't other programs available.",
    signupNotEligible:
      "Create a free account or sign in to save your answers, so you can re-screen anytime without starting over.",
    restart: "Let's start fresh. I'll ask you the same questions again.",
  },
  summary: {
    programsOne: "{count} program",
    programsOther: "{count} programs",
    withValue:
      "Great news! We found {programs} you may qualify for, worth up to ${amount}/year.",
    single: "Great news! You may qualify for {name}. {sentence}",
    several: "Great news! We found {programs} you may qualify for: {names}.",
    listSeparator: ", ",
    sentenceEnd: ".",
  },
  header: {
    backHome: "Back to home",
    title: "Eligibility Check",
    restart: "Restart",
    restartAria: "Restart screening",
    progressAria: "Screening progress",
    conversationAria: "Conversation",
  },
  messages: {
    assistant: "Assistant message",
    user: "Your message",
    typing: "Assistant is typing",
  },
  input: {
    placeholder: "Type your answer...",
    placeholderSecondary: "Or type your answer...",
    send: "Send",
    selectState: "Select your state...",
    continue: "Continue",
  },
  signup: {
    checkEmail: "Check your email for a magic link to access your results.",
    sentTo: "Sent to {email}",
    sending: "Sending...",
    resendIn: "Resend link in {seconds}s",
    resend: "Resend link",
    sendingLink: "Sending link...",
    sendSignin: "Send sign-in link",
    createAccount: "Create Account",
    newHere: "New to Benefind?",
    haveAccount: "Already have an account?",
    createLink: "Create an account",
    signIn: "Sign in",
    skip: "Skip for now",
    emailPlaceholder: "you@example.com",
  },
  results: {
    perMonth: "${amount}/month",
    annualOne: "Estimated ${amount}/year across {count} program",
    annualOther: "Estimated ${amount}/year across {count} programs",
    disclaimer:
      "These are estimates. Actual amounts depend on your situation and state.",
    viewFull: "View Full Results",
    startOver: "Start Over",
  },
  panel: {
    signedInAs: "Signed in as {email}",
    signOut: "Sign out",
    tagline: "Benefits navigator, built for you",
    headline: "Here's what's about to happen",
    intro:
      "A short conversation is all it takes. No account needed. No paperwork. Just answers.",
    stepLabel: "Step {n}",
    step1Label: "Answer a few questions",
    step1Desc:
      "Household size, income, and where you live. Takes about 3 minutes.",
    step2Label: "We match you instantly",
    step2Desc:
      "Our engine checks eligibility across 12+ federal programs in real time.",
    step3Label: "See your results",
    step3Desc:
      "View every program you qualify for, with estimated amounts and next steps.",
    privacy:
      "Your answers are stored locally on your device and never sent to a server. This is a screening tool, not a formal application.",
    programsCount:
      "Checks eligibility across {highlight} including SNAP, Medicaid, WIC, SSI, and more.",
    programsHighlight: "12+ federal and state programs",
  },
  errors: {
    sendFailed: "Failed to send message",
    noStream: "No response stream",
    generic: "Something went wrong",
  },
};

export type ScreeningFlowMessages = typeof en;

const es: ScreeningFlowMessages = {
  steps: {
    yes: "Sí",
    no: "No",
    invalidAmount: "Escriba una cantidad válida en dólares",
    state: {
      question: "¿En qué estado vive?",
      helpText:
        "Los beneficios cambian según el estado. Lo necesitamos para darle resultados correctos.",
    },
    householdSize: {
      question: "¿Cuántas personas viven en su hogar?",
      helpText:
        "Cuéntese a usted, a su esposo/a o pareja y a todas las personas a su cargo que viven con usted.",
      error: "Escriba un número entre 1 y 20",
    },
    hasChildren: {
      question: "¿Hay niños menores de 19 años en su hogar?",
    },
    childrenAges: {
      question: "¿Qué edades tienen sus hijos?",
      helpText: "Separe las edades con comas (por ejemplo: 2, 5, 12)",
    },
    annualIncome: {
      question: "¿Cuánto gana su hogar en total al año, antes de impuestos?",
      helpText:
        "Incluya todo: sueldos, salario, propinas, Seguro Social, discapacidad y manutención de hijos. Un cálculo aproximado está bien.",
    },
    isEmployed: {
      question: "¿Alguien en su hogar tiene trabajo ahora?",
    },
    hasHealthInsurance: {
      question: "¿Su hogar tiene seguro médico ahora?",
      all: "Sí, todos",
      some: "Sí, algunas personas",
    },
    monthlyRent: {
      question: "¿Cuánto paga de renta o hipoteca cada mes?",
      helpText: "Escriba 0 si no paga renta.",
    },
    specialCircumstances: {
      question: "¿Alguna de estas situaciones aplica a su hogar?",
      helpText:
        "Elija todas las que apliquen. Pueden ayudarle a calificar para más beneficios.",
      pregnant: "Alguien está embarazada",
      elderly: "Alguien tiene 60 años o más",
      disabled: "Alguien tiene una discapacidad",
      veteran: "Alguien es veterano/a",
      student: "Alguien es estudiante",
      none: "Ninguna de estas",
    },
  },
  chat: {
    welcome:
      "¡Hola! Estoy aquí para ayudarle a encontrar beneficios del gobierno para los que podría calificar. Toma unos 3 minutos.",
    privacy:
      "Sus respuestas son privadas y no se comparten con nadie. Empecemos.",
    welcomeBack:
      "¡Bienvenido/a de nuevo! Cargué sus respuestas anteriores. Puede cambiar lo que sea diferente ahora, o enviarlas otra vez para ver resultados nuevos.",
    prefilled:
      "Vamos a repasar las preguntas. Sus respuestas anteriores ya están escritas.",
    calculating:
      "Perfecto, ya tengo todo lo necesario. Voy a revisar para qué programas califica...",
    saved: "Guardado en su cuenta ({email}).",
    saveFailed:
      "No pudimos guardar estos resultados en su cuenta, pero puede verlos abajo.",
    savedRescreen:
      "Guardado en su cuenta ({email}). Puede volver a hacer la evaluación cuando quiera desde su panel.",
    signupEligible:
      "Cree una cuenta gratis o inicie sesión para guardar sus resultados y recibir los próximos pasos para su caso.",
    notEligible:
      "Según la información que nos dio, es posible que no califique para los programas que revisamos por ahora. Esto no significa que no haya otros programas disponibles.",
    signupNotEligible:
      "Cree una cuenta gratis o inicie sesión para guardar sus respuestas y volver a hacer la evaluación sin empezar de cero.",
    restart: "Empecemos de nuevo. Le haré las mismas preguntas otra vez.",
  },
  summary: {
    programsOne: "{count} programa",
    programsOther: "{count} programas",
    withValue:
      "¡Buenas noticias! Encontramos {programs} para los que podría calificar, con un valor de hasta ${amount} al año.",
    single: "¡Buenas noticias! Podría calificar para {name}. {sentence}",
    several:
      "¡Buenas noticias! Encontramos {programs} para los que podría calificar: {names}.",
    listSeparator: ", ",
    sentenceEnd: ".",
  },
  header: {
    backHome: "Volver al inicio",
    title: "Revisión de elegibilidad",
    restart: "Reiniciar",
    restartAria: "Reiniciar la evaluación",
    progressAria: "Progreso de la evaluación",
    conversationAria: "Conversación",
  },
  messages: {
    assistant: "Mensaje del asistente",
    user: "Su mensaje",
    typing: "El asistente está escribiendo",
  },
  input: {
    placeholder: "Escriba su respuesta...",
    placeholderSecondary: "O escriba su respuesta...",
    send: "Enviar",
    selectState: "Elija su estado...",
    continue: "Continuar",
  },
  signup: {
    checkEmail:
      "Revise su correo. Le enviamos un enlace mágico para ver sus resultados.",
    sentTo: "Enviado a {email}",
    sending: "Enviando...",
    resendIn: "Reenviar enlace en {seconds} s",
    resend: "Reenviar enlace",
    sendingLink: "Enviando enlace...",
    sendSignin: "Enviar enlace para iniciar sesión",
    createAccount: "Crear cuenta",
    newHere: "¿Es nuevo/a en Benefind?",
    haveAccount: "¿Ya tiene una cuenta?",
    createLink: "Crear una cuenta",
    signIn: "Iniciar sesión",
    skip: "Omitir por ahora",
    emailPlaceholder: "usted@ejemplo.com",
  },
  results: {
    perMonth: "${amount}/mes",
    annualOne: "Unos ${amount} al año en {count} programa",
    annualOther: "Unos ${amount} al año en {count} programas",
    disclaimer:
      "Son cálculos aproximados. Las cantidades reales dependen de su situación y de su estado.",
    viewFull: "Ver todos los resultados",
    startOver: "Empezar de nuevo",
  },
  panel: {
    signedInAs: "Sesión iniciada como {email}",
    signOut: "Cerrar sesión",
    tagline: "Su guía de beneficios, hecha para usted",
    headline: "Esto es lo que va a pasar",
    intro:
      "Solo hace falta una conversación corta. No necesita cuenta. Sin papeleo. Solo respuestas.",
    stepLabel: "Paso {n}",
    step1Label: "Responda unas preguntas",
    step1Desc:
      "Cuántas personas viven en su hogar, sus ingresos y dónde vive. Toma unos 3 minutos.",
    step2Label: "Le encontramos programas al instante",
    step2Desc:
      "Nuestro sistema revisa su elegibilidad en más de 12 programas federales en tiempo real.",
    step3Label: "Vea sus resultados",
    step3Desc:
      "Vea cada programa para el que califica, con cantidades aproximadas y los próximos pasos.",
    privacy:
      "Sus respuestas se guardan solo en su dispositivo y nunca se envían a un servidor. Esta es una herramienta de evaluación, no una solicitud oficial.",
    programsCount:
      "Revisa su elegibilidad en {highlight}, como SNAP (cupones de alimentos), Medicaid, WIC, SSI y más.",
    programsHighlight: "más de 12 programas federales y estatales",
  },
  errors: {
    sendFailed: "No se pudo enviar el mensaje",
    noStream: "No hubo respuesta",
    generic: "Algo salió mal",
  },
};

const zh: ScreeningFlowMessages = {
  steps: {
    yes: "是",
    no: "否",
    invalidAmount: "请输入有效的金额（美元）",
    state: {
      question: "您住在哪个州？",
      helpText: "各州的福利不同。我们需要知道您的州，才能给您准确的结果。",
    },
    householdSize: {
      question: "您家里一共住几个人？",
      helpText: "包括您自己、您的配偶或伴侣，以及和您同住的所有受抚养人。",
      error: "请输入 1 到 20 之间的数字",
    },
    hasChildren: {
      question: "您家里有 19 岁以下的孩子吗？",
    },
    childrenAges: {
      question: "您的孩子分别几岁？",
      helpText: "用逗号分隔年龄（例如：2, 5, 12）",
    },
    annualIncome: {
      question: "您家庭一年的税前总收入是多少？",
      helpText:
        "包括所有来源：工资、薪水、小费、社会安全金、残障补助和子女抚养费。估算即可。",
    },
    isEmployed: {
      question: "您家里现在有人在工作吗？",
    },
    hasHealthInsurance: {
      question: "您家里现在有医疗保险吗？",
      all: "有，每个人都有",
      some: "有，部分成员有",
    },
    monthlyRent: {
      question: "您每个月付多少房租或房贷？",
      helpText: "如果您不付房租，请输入 0。",
    },
    specialCircumstances: {
      question: "以下情况是否适用于您的家庭？",
      helpText: "请选择所有适用的选项。这些情况可能让您符合更多福利的资格。",
      pregnant: "有人怀孕",
      elderly: "有人 60 岁或以上",
      disabled: "有人有残障",
      veteran: "有人是退伍军人",
      student: "有人是学生",
      none: "以上都不是",
    },
  },
  chat: {
    welcome: "您好！我来帮您查找您可能符合资格的政府福利。大约需要 3 分钟。",
    privacy: "您的回答是保密的，不会与任何人分享。我们开始吧。",
    welcomeBack:
      "欢迎回来！我已经载入您之前的回答。您可以修改有变化的地方，或直接重新提交，查看最新结果。",
    prefilled: "我们来逐一看看这些问题。您之前的回答已经填好了。",
    calculating: "好的，信息都齐了。我来看看您符合哪些项目的资格...",
    saved: "已保存到您的账户（{email}）。",
    saveFailed: "我们没能把结果保存到您的账户，但您仍然可以在下方查看。",
    savedRescreen:
      "已保存到您的账户（{email}）。您随时可以从控制面板重新筛查。",
    signupEligible: "创建免费账户或登录，即可保存结果并获得适合您的后续步骤。",
    notEligible:
      "根据您提供的信息，您可能不符合我们目前所查项目的资格。但这并不代表没有其他可用的项目。",
    signupNotEligible:
      "创建免费账户或登录，即可保存您的回答，以后随时重新筛查，不用从头开始。",
    restart: "我们重新开始。我会再问您一遍同样的问题。",
  },
  summary: {
    programsOne: "{count} 个项目",
    programsOther: "{count} 个项目",
    withValue:
      "好消息！我们找到 {programs}，您可能符合资格，每年价值最高可达 ${amount}。",
    single: "好消息！您可能符合 {name} 的资格。{sentence}",
    several: "好消息！我们找到 {programs}，您可能符合资格：{names}。",
    listSeparator: "、",
    sentenceEnd: "。",
  },
  header: {
    backHome: "返回首页",
    title: "资格检查",
    restart: "重新开始",
    restartAria: "重新开始筛查",
    progressAria: "筛查进度",
    conversationAria: "对话",
  },
  messages: {
    assistant: "助手消息",
    user: "您的消息",
    typing: "助手正在输入",
  },
  input: {
    placeholder: "输入您的回答...",
    placeholderSecondary: "或输入您的回答...",
    send: "发送",
    selectState: "选择您的州...",
    continue: "继续",
  },
  signup: {
    checkEmail: "请查看您的邮箱，点击我们发送的登录链接来查看结果。",
    sentTo: "已发送至 {email}",
    sending: "正在发送...",
    resendIn: "{seconds} 秒后可重新发送",
    resend: "重新发送链接",
    sendingLink: "正在发送链接...",
    sendSignin: "发送登录链接",
    createAccount: "创建账户",
    newHere: "第一次使用 Benefind？",
    haveAccount: "已经有账户了？",
    createLink: "创建账户",
    signIn: "登录",
    skip: "暂时跳过",
    emailPlaceholder: "you@example.com",
  },
  results: {
    perMonth: "${amount}/月",
    annualOne: "{count} 个项目，估计每年 ${amount}",
    annualOther: "{count} 个项目，估计每年 ${amount}",
    disclaimer: "以上为估算。实际金额取决于您的情况和所在州。",
    viewFull: "查看完整结果",
    startOver: "重新开始",
  },
  panel: {
    signedInAs: "已登录：{email}",
    signOut: "退出登录",
    tagline: "为您打造的福利向导",
    headline: "接下来会发生什么",
    intro: "只需简短对话。无需账户。无需填表。直接得到答案。",
    stepLabel: "第 {n} 步",
    step1Label: "回答几个问题",
    step1Desc: "家庭人数、收入和居住地。大约需要 3 分钟。",
    step2Label: "立即为您匹配",
    step2Desc: "我们的系统会实时检查您在 12 个以上联邦项目中的资格。",
    step3Label: "查看结果",
    step3Desc: "查看您符合资格的每个项目，包括估计金额和后续步骤。",
    privacy:
      "您的回答只保存在您的设备上，绝不会发送到服务器。这是一个筛查工具，不是正式申请。",
    programsCount:
      "检查 {highlight} 的资格，包括 SNAP（食品券）、Medicaid、WIC、SSI 等。",
    programsHighlight: "12 个以上联邦和州项目",
  },
  errors: {
    sendFailed: "消息发送失败",
    noStream: "没有收到回复",
    generic: "出了点问题",
  },
};

const vi: ScreeningFlowMessages = {
  steps: {
    yes: "Có",
    no: "Không",
    invalidAmount: "Nhập số tiền hợp lệ (đô la)",
    state: {
      question: "Quý vị sống ở tiểu bang nào?",
      helpText:
        "Phúc lợi khác nhau tùy theo tiểu bang. Chúng tôi cần biết để cho quý vị kết quả chính xác.",
    },
    householdSize: {
      question: "Có bao nhiêu người sống trong hộ gia đình của quý vị?",
      helpText:
        "Tính cả quý vị, vợ/chồng hoặc bạn đời, và tất cả người phụ thuộc sống cùng quý vị.",
      error: "Nhập một số từ 1 đến 20",
    },
    hasChildren: {
      question: "Trong nhà quý vị có trẻ em dưới 19 tuổi không?",
    },
    childrenAges: {
      question: "Các con của quý vị bao nhiêu tuổi?",
      helpText: "Ngăn cách các độ tuổi bằng dấu phẩy (ví dụ: 2, 5, 12)",
    },
    annualIncome: {
      question:
        "Tổng thu nhập một năm của hộ gia đình quý vị trước thuế là bao nhiêu?",
      helpText:
        "Tính tất cả các nguồn: tiền công, lương, tiền tip, An Sinh Xã Hội, trợ cấp khuyết tật và tiền cấp dưỡng con. Ước tính gần đúng là được.",
    },
    isEmployed: {
      question: "Hiện có ai trong hộ gia đình quý vị đang đi làm không?",
    },
    hasHealthInsurance: {
      question: "Hộ gia đình quý vị hiện có bảo hiểm y tế không?",
      all: "Có, cho tất cả mọi người",
      some: "Có, cho một số người",
    },
    monthlyRent: {
      question: "Mỗi tháng quý vị trả bao nhiêu tiền thuê nhà hoặc tiền nhà?",
      helpText: "Nhập 0 nếu quý vị không trả tiền thuê nhà.",
    },
    specialCircumstances: {
      question: "Hộ gia đình quý vị có trường hợp nào dưới đây không?",
      helpText:
        "Chọn tất cả các mục đúng. Những mục này có thể giúp quý vị đủ điều kiện nhận thêm phúc lợi.",
      pregnant: "Có người đang mang thai",
      elderly: "Có người từ 60 tuổi trở lên",
      disabled: "Có người bị khuyết tật",
      veteran: "Có người là cựu chiến binh",
      student: "Có người là sinh viên",
      none: "Không có mục nào",
    },
  },
  chat: {
    welcome:
      "Xin chào! Tôi ở đây để giúp quý vị tìm các phúc lợi của chính phủ mà quý vị có thể đủ điều kiện nhận. Mất khoảng 3 phút.",
    privacy:
      "Câu trả lời của quý vị được giữ kín và không chia sẻ với ai. Chúng ta bắt đầu nhé.",
    welcomeBack:
      "Chào mừng quý vị quay lại! Tôi đã tải các câu trả lời trước của quý vị. Quý vị có thể sửa những gì đã thay đổi, hoặc gửi lại để xem kết quả mới.",
    prefilled:
      "Chúng ta cùng xem lại các câu hỏi. Câu trả lời trước của quý vị đã được điền sẵn.",
    calculating:
      "Tốt lắm, tôi đã có đủ thông tin. Để tôi xem quý vị đủ điều kiện cho những chương trình nào...",
    saved: "Đã lưu vào tài khoản của quý vị ({email}).",
    saveFailed:
      "Chúng tôi không lưu được kết quả vào tài khoản của quý vị, nhưng quý vị vẫn có thể xem ở bên dưới.",
    savedRescreen:
      "Đã lưu vào tài khoản của quý vị ({email}). Quý vị có thể kiểm tra lại bất cứ lúc nào từ trang tổng quan.",
    signupEligible:
      "Tạo tài khoản miễn phí hoặc đăng nhập để lưu kết quả và nhận các bước tiếp theo dành riêng cho quý vị.",
    notEligible:
      "Dựa trên thông tin quý vị cung cấp, có thể quý vị chưa đủ điều kiện cho các chương trình chúng tôi đang kiểm tra. Điều này không có nghĩa là không có chương trình nào khác.",
    signupNotEligible:
      "Tạo tài khoản miễn phí hoặc đăng nhập để lưu câu trả lời, để quý vị có thể kiểm tra lại bất cứ lúc nào mà không phải làm lại từ đầu.",
    restart:
      "Chúng ta bắt đầu lại nhé. Tôi sẽ hỏi lại quý vị những câu hỏi như trước.",
  },
  summary: {
    programsOne: "{count} chương trình",
    programsOther: "{count} chương trình",
    withValue:
      "Tin vui! Chúng tôi tìm thấy {programs} mà quý vị có thể đủ điều kiện, trị giá tới ${amount} mỗi năm.",
    single: "Tin vui! Quý vị có thể đủ điều kiện nhận {name}. {sentence}",
    several:
      "Tin vui! Chúng tôi tìm thấy {programs} mà quý vị có thể đủ điều kiện: {names}.",
    listSeparator: ", ",
    sentenceEnd: ".",
  },
  header: {
    backHome: "Về trang chủ",
    title: "Kiểm tra điều kiện",
    restart: "Làm lại",
    restartAria: "Làm lại bài kiểm tra",
    progressAria: "Tiến độ kiểm tra",
    conversationAria: "Cuộc trò chuyện",
  },
  messages: {
    assistant: "Tin nhắn của trợ lý",
    user: "Tin nhắn của quý vị",
    typing: "Trợ lý đang nhập",
  },
  input: {
    placeholder: "Nhập câu trả lời...",
    placeholderSecondary: "Hoặc nhập câu trả lời...",
    send: "Gửi",
    selectState: "Chọn tiểu bang...",
    continue: "Tiếp tục",
  },
  signup: {
    checkEmail:
      "Hãy kiểm tra email. Chúng tôi đã gửi một đường liên kết đăng nhập để quý vị xem kết quả.",
    sentTo: "Đã gửi đến {email}",
    sending: "Đang gửi...",
    resendIn: "Gửi lại sau {seconds} giây",
    resend: "Gửi lại liên kết",
    sendingLink: "Đang gửi liên kết...",
    sendSignin: "Gửi liên kết đăng nhập",
    createAccount: "Tạo tài khoản",
    newHere: "Lần đầu dùng Benefind?",
    haveAccount: "Đã có tài khoản?",
    createLink: "Tạo tài khoản",
    signIn: "Đăng nhập",
    skip: "Để sau",
    emailPlaceholder: "ban@example.com",
  },
  results: {
    perMonth: "${amount}/tháng",
    annualOne: "Ước tính ${amount}/năm từ {count} chương trình",
    annualOther: "Ước tính ${amount}/năm từ {count} chương trình",
    disclaimer:
      "Đây là số ước tính. Số tiền thực tế tùy vào hoàn cảnh và tiểu bang của quý vị.",
    viewFull: "Xem toàn bộ kết quả",
    startOver: "Làm lại từ đầu",
  },
  panel: {
    signedInAs: "Đã đăng nhập: {email}",
    signOut: "Đăng xuất",
    tagline: "Hướng dẫn phúc lợi, làm cho quý vị",
    headline: "Đây là những gì sắp diễn ra",
    intro:
      "Chỉ cần một cuộc trò chuyện ngắn. Không cần tài khoản. Không giấy tờ. Chỉ có câu trả lời.",
    stepLabel: "Bước {n}",
    step1Label: "Trả lời vài câu hỏi",
    step1Desc:
      "Số người trong nhà, thu nhập và nơi quý vị sống. Mất khoảng 3 phút.",
    step2Label: "Chúng tôi tìm chương trình phù hợp ngay",
    step2Desc:
      "Hệ thống của chúng tôi kiểm tra điều kiện của quý vị với hơn 12 chương trình liên bang ngay lập tức.",
    step3Label: "Xem kết quả",
    step3Desc:
      "Xem mọi chương trình quý vị đủ điều kiện, kèm số tiền ước tính và các bước tiếp theo.",
    privacy:
      "Câu trả lời của quý vị chỉ được lưu trên thiết bị của quý vị và không bao giờ gửi lên máy chủ. Đây là công cụ kiểm tra, không phải đơn đăng ký chính thức.",
    programsCount:
      "Kiểm tra điều kiện với {highlight}, gồm SNAP (phiếu thực phẩm), Medicaid, WIC, SSI và nhiều chương trình khác.",
    programsHighlight: "hơn 12 chương trình liên bang và tiểu bang",
  },
  errors: {
    sendFailed: "Không gửi được tin nhắn",
    noStream: "Không nhận được phản hồi",
    generic: "Đã có lỗi xảy ra",
  },
};

const ar: ScreeningFlowMessages = {
  steps: {
    yes: "نعم",
    no: "لا",
    invalidAmount: "أدخل مبلغًا صحيحًا بالدولار",
    state: {
      question: "في أي ولاية تعيش؟",
      helpText:
        "تختلف المساعدات من ولاية إلى أخرى. نحتاج إلى هذه المعلومة لنعطيك نتائج دقيقة.",
    },
    householdSize: {
      question: "كم عدد الأشخاص الذين يعيشون في أسرتك؟",
      helpText: "احسب نفسك وزوجك أو شريكك وكل من تعولهم ويعيشون معك.",
      error: "أدخل رقمًا من 1 إلى 20",
    },
    hasChildren: {
      question: "هل لديك أطفال تحت سن 19 في أسرتك؟",
    },
    childrenAges: {
      question: "كم أعمار أطفالك؟",
      helpText: "افصل بين الأعمار بفواصل (مثال: 2, 5, 12)",
    },
    annualIncome: {
      question: "ما إجمالي دخل أسرتك السنوي قبل الضرائب؟",
      helpText:
        "احسب كل المصادر: الأجور والراتب والإكراميات والضمان الاجتماعي ومعاش الإعاقة ونفقة الأطفال. يكفي تقدير تقريبي.",
    },
    isEmployed: {
      question: "هل يعمل أحد في أسرتك حاليًا؟",
    },
    hasHealthInsurance: {
      question: "هل لدى أسرتك تأمين صحي حاليًا؟",
      all: "نعم، للجميع",
      some: "نعم، لبعض الأفراد",
    },
    monthlyRent: {
      question: "كم تدفع شهريًا للإيجار أو الرهن العقاري؟",
      helpText: "أدخل 0 إذا كنت لا تدفع إيجارًا.",
    },
    specialCircumstances: {
      question: "هل ينطبق أي مما يلي على أسرتك؟",
      helpText:
        "اختر كل ما ينطبق. قد تجعلك هذه الحالات مؤهلًا لمساعدات إضافية.",
      pregnant: "يوجد شخص حامل",
      elderly: "يوجد شخص عمره 60 عامًا أو أكثر",
      disabled: "يوجد شخص من ذوي الإعاقة",
      veteran: "يوجد شخص من المحاربين القدامى",
      student: "يوجد شخص طالب",
      none: "لا شيء مما سبق",
    },
  },
  chat: {
    welcome:
      "مرحبًا! أنا هنا لمساعدتك في العثور على المساعدات الحكومية التي قد تكون مؤهلًا لها. يستغرق ذلك حوالي 3 دقائق.",
    privacy: "إجاباتك خاصة ولن تتم مشاركتها مع أي أحد. لنبدأ.",
    welcomeBack:
      "مرحبًا بعودتك! حمّلت إجاباتك السابقة. يمكنك تعديل ما تغيّر، أو إرسالها مرة أخرى للحصول على نتائج جديدة.",
    prefilled: "لنراجع الأسئلة. إجاباتك السابقة مكتوبة مسبقًا.",
    calculating:
      "ممتاز، لدي كل ما أحتاجه. دعني أتحقق من البرامج التي قد تكون مؤهلًا لها...",
    saved: "تم الحفظ في حسابك ({email}).",
    saveFailed:
      "لم نتمكن من حفظ هذه النتائج في حسابك، لكن يمكنك رؤيتها في الأسفل.",
    savedRescreen:
      "تم الحفظ في حسابك ({email}). يمكنك إعادة الفحص في أي وقت من لوحة التحكم.",
    signupEligible:
      "أنشئ حسابًا مجانيًا أو سجّل الدخول لحفظ نتائجك والحصول على خطوات تالية تناسب حالتك.",
    notEligible:
      "بناءً على المعلومات التي قدمتها، قد لا تكون مؤهلًا للبرامج التي نفحصها حاليًا. هذا لا يعني عدم وجود برامج أخرى متاحة.",
    signupNotEligible:
      "أنشئ حسابًا مجانيًا أو سجّل الدخول لحفظ إجاباتك، حتى تتمكن من إعادة الفحص في أي وقت دون البدء من جديد.",
    restart: "لنبدأ من جديد. سأطرح عليك الأسئلة نفسها مرة أخرى.",
  },
  summary: {
    programsOne: "برنامج واحد",
    programsOther: "{count} برامج",
    withValue:
      "أخبار سارة! وجدنا {programs} قد تكون مؤهلًا لها، بقيمة تصل إلى ${amount} سنويًا.",
    single: "أخبار سارة! قد تكون مؤهلًا لبرنامج {name}. {sentence}",
    several: "أخبار سارة! وجدنا {programs} قد تكون مؤهلًا لها: {names}.",
    listSeparator: "، ",
    sentenceEnd: ".",
  },
  header: {
    backHome: "العودة إلى الصفحة الرئيسية",
    title: "فحص الأهلية",
    restart: "إعادة البدء",
    restartAria: "إعادة بدء الفحص",
    progressAria: "تقدم الفحص",
    conversationAria: "المحادثة",
  },
  messages: {
    assistant: "رسالة المساعد",
    user: "رسالتك",
    typing: "المساعد يكتب",
  },
  input: {
    placeholder: "اكتب إجابتك...",
    placeholderSecondary: "أو اكتب إجابتك...",
    send: "إرسال",
    selectState: "اختر ولايتك...",
    continue: "متابعة",
  },
  signup: {
    checkEmail: "تفقّد بريدك الإلكتروني، أرسلنا لك رابط دخول لعرض نتائجك.",
    sentTo: "تم الإرسال إلى {email}",
    sending: "جارٍ الإرسال...",
    resendIn: "إعادة إرسال الرابط بعد {seconds} ث",
    resend: "إعادة إرسال الرابط",
    sendingLink: "جارٍ إرسال الرابط...",
    sendSignin: "أرسل رابط تسجيل الدخول",
    createAccount: "إنشاء حساب",
    newHere: "جديد في Benefind؟",
    haveAccount: "لديك حساب بالفعل؟",
    createLink: "أنشئ حسابًا",
    signIn: "تسجيل الدخول",
    skip: "تخطَّ الآن",
    emailPlaceholder: "you@example.com",
  },
  results: {
    perMonth: "${amount} شهريًا",
    annualOne: "حوالي ${amount} سنويًا من برنامج واحد",
    annualOther: "حوالي ${amount} سنويًا من {count} برامج",
    disclaimer: "هذه تقديرات. تعتمد المبالغ الفعلية على وضعك وولايتك.",
    viewFull: "عرض النتائج كاملة",
    startOver: "البدء من جديد",
  },
  panel: {
    signedInAs: "مسجّل الدخول باسم {email}",
    signOut: "تسجيل الخروج",
    tagline: "دليل المساعدات، مصمم لك",
    headline: "إليك ما سيحدث الآن",
    intro: "كل ما يلزم محادثة قصيرة. لا حاجة إلى حساب. لا أوراق. فقط إجابات.",
    stepLabel: "الخطوة {n}",
    step1Label: "أجب عن بعض الأسئلة",
    step1Desc: "عدد أفراد الأسرة والدخل ومكان السكن. يستغرق حوالي 3 دقائق.",
    step2Label: "نجد لك البرامج المناسبة فورًا",
    step2Desc:
      "يفحص نظامنا أهليتك لأكثر من 12 برنامجًا فيدراليًا في الوقت نفسه.",
    step3Label: "اطّلع على نتائجك",
    step3Desc:
      "اعرض كل برنامج أنت مؤهل له، مع المبالغ التقديرية والخطوات التالية.",
    privacy:
      "تُحفظ إجاباتك على جهازك فقط ولا تُرسل أبدًا إلى أي خادم. هذه أداة فحص وليست طلبًا رسميًا.",
    programsCount:
      "يفحص الأهلية لـ {highlight}، ومنها SNAP (قسائم الطعام) وMedicaid وWIC وSSI وغيرها.",
    programsHighlight: "أكثر من 12 برنامجًا فيدراليًا وولائيًا",
  },
  errors: {
    sendFailed: "تعذّر إرسال الرسالة",
    noStream: "لم يصل أي رد",
    generic: "حدث خطأ ما",
  },
};

export const screeningFlow: Record<Locale, ScreeningFlowMessages> = {
  en,
  es,
  zh,
  vi,
  ar,
};
