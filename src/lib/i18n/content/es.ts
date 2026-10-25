import type { ContentMessages } from "../localize-content";

export const es: ContentMessages = {
  comparisons: {
    "snap-vs-wic": {
      title: "SNAP o WIC: ¿qué beneficio de alimentos le conviene?",
      description:
        "SNAP y WIC son programas federales de ayuda con alimentos, pero funcionan de manera muy distinta. Conocer las diferencias principales le ayuda a solicitar el programa correcto, o los dos.",
      programA: {
        name: "SNAP",
        tagline:
          "Beneficios amplios para comprar alimentos, para hogares con ingresos limitados",
        dimensions: [
          {
            label: "Quién califica",
            a: "La mayoría de los hogares con ingresos menores al 130% del nivel federal de pobreza (FPL)",
            b: "",
          },
          {
            label: "Forma del beneficio",
            a: "Una cantidad de dinero mensual que se carga en una tarjeta EBT",
            b: "",
          },
          {
            label: "Qué puede comprar",
            a: "La mayoría de los alimentos en tiendas autorizadas",
            b: "",
          },
          {
            label: "Requisitos de edad",
            a: "No hay límite de edad. Cubre a todo el hogar",
            b: "",
          },
          {
            label: "Límite de ingresos (familia de 4)",
            a: "~$3,381 al mes, ingreso bruto (2026)",
            b: "",
          },
          {
            label: "Solicitud",
            a: "Solicite en la oficina de SNAP de su estado o en línea",
            b: "",
          },
        ],
      },
      programB: {
        name: "WIC",
        tagline: "Apoyo de nutrición para mujeres, bebés y niños",
        dimensions: [
          {
            label: "Quién califica",
            a: "",
            b: "Mujeres embarazadas o que dieron a luz recientemente, bebés y niños menores de 5 años",
          },
          {
            label: "Forma del beneficio",
            a: "",
            b: "Cupones o EBT para alimentos específicos aprobados",
          },
          {
            label: "Qué puede comprar",
            a: "",
            b: "Una lista fija: leche, huevos, cereal, frutas y verduras, fórmula infantil",
          },
          {
            label: "Requisitos de edad",
            a: "",
            b: "Los niños deben tener menos de 5 años; las mujeres durante o después del embarazo",
          },
          {
            label: "Límite de ingresos (familia de 4)",
            a: "",
            b: "~$3,868 al mes, ingreso bruto (185% del FPL)",
          },
          {
            label: "Solicitud",
            a: "",
            b: "Solicite en una clínica local de WIC o en el departamento de salud",
          },
        ],
      },
      verdict:
        "Si puede, solicite los dos. Cada uno cubre necesidades distintas.",
      verdictDetail:
        "SNAP le permite comprar casi cualquier alimento, pero le da menos dinero por persona. WIC da más valor por dólar en los alimentos específicos que cubre y tiene un límite de ingresos un poco más alto. Si tiene un hijo menor de 5 años o está embarazada, solicite WIC primero: su límite de ingresos es más alto y los beneficios empiezan de inmediato. Después solicite SNAP si los ingresos de su hogar están por debajo del límite de SNAP.",
      faqs: [
        {
          q: "¿Puedo usar SNAP y WIC al mismo tiempo?",
          a: "Sí. SNAP y WIC son programas totalmente separados, con solicitudes separadas. Muchas familias reciben los dos al mismo tiempo. Los beneficios de WIC son para alimentos específicos, mientras que SNAP cubre la compra general de alimentos.",
        },
        {
          q: "¿Qué programa da más dinero?",
          a: "Depende del tamaño y la composición del hogar. Los beneficios de SNAP son de unos $230 al mes por hogar en promedio, pero aumentan según el tamaño del hogar. WIC ofrece un paquete fijo de alimentos, con un valor aproximado de $50–100 al mes según lo que le corresponda.",
        },
        {
          q: "¿WIC tiene requisito de trabajo?",
          a: "No. WIC no tiene requisitos de trabajo. SNAP tiene requisitos de trabajo para adultos sin dependientes que pueden trabajar (ABAWD) de 18 a 54 años, aunque muchos estados tienen exenciones.",
        },
      ],
    },
    "medicaid-vs-marketplace": {
      title:
        "Medicaid o el Mercado de Seguros de la ACA: ¿qué cobertura médica debe elegir?",
      description:
        "Si no tiene seguro o perdió la cobertura de su empleador, tiene dos opciones principales para obtener un seguro médico a bajo costo. La opción correcta depende de sus ingresos y del lugar donde vive.",
      programA: {
        name: "Medicaid",
        tagline:
          "Cobertura gratis o casi gratis para personas con ingresos bajos",
        dimensions: [
          {
            label: "Rango de ingresos",
            a: "Hasta ~138% del FPL en los estados que ampliaron Medicaid",
            b: "",
          },
          { label: "Prima mensual", a: "$0 en la mayoría de los casos", b: "" },
          { label: "Deducibles", a: "Ninguno o muy bajos", b: "" },
          {
            label: "Período de inscripción",
            a: "Abierto todo el año. Puede solicitar en cualquier momento",
            b: "",
          },
          {
            label: "Dental y visión",
            a: "Con frecuencia incluidos para adultos en los estados que ampliaron Medicaid",
            b: "",
          },
          {
            label: "Red de proveedores",
            a: "Varía; puede ser más limitada",
            b: "",
          },
        ],
      },
      programB: {
        name: "Mercado de Seguros de la ACA",
        tagline: "Seguro privado con subsidio para ingresos moderados",
        dimensions: [
          {
            label: "Rango de ingresos",
            a: "",
            b: "100–400% del FPL (hay subsidios disponibles)",
          },
          {
            label: "Prima mensual",
            a: "",
            b: "Después de los subsidios: con frecuencia $0–$50 al mes",
          },
          {
            label: "Deducibles",
            a: "",
            b: "Por lo general $500–$3,000 según el nivel del plan",
          },
          {
            label: "Período de inscripción",
            a: "",
            b: "Del 1 de noviembre al 15 de enero, o después de un evento de vida que califica",
          },
          {
            label: "Dental y visión",
            a: "",
            b: "Planes separados; no se incluyen en la cobertura médica",
          },
          {
            label: "Red de proveedores",
            a: "",
            b: "Hay opciones con redes más grandes",
          },
        ],
      },
      verdict:
        "Si sus ingresos son menores al 138% del FPL, Medicaid casi siempre es la mejor opción.",
      verdictDetail:
        "Medicaid es gratis, cubre más servicios y puede inscribirse en cualquier momento del año. Si sus ingresos están por encima del límite de Medicaid (o vive en un estado que no amplió Medicaid), su mejor opción es el Mercado de Seguros de la ACA con créditos fiscales para la prima. Revise si su estado amplió Medicaid; 40 estados lo han hecho. Si sus ingresos están cerca del límite, compare el costo de las dos opciones en healthcare.gov.",
      faqs: [
        {
          q: "¿Qué pasa si mis ingresos son demasiado altos para Medicaid pero no puedo pagar un plan del Mercado de Seguros?",
          a: "Los créditos fiscales ampliados para la prima de la Ley de Reducción de la Inflación han bajado mucho las primas del Mercado de Seguros. Muchas personas con ingresos del 200–300% del FPL pagan $0 o muy poco al mes. Use la calculadora de Healthcare.gov para ver su costo real antes de decidir.",
        },
        {
          q: "¿Puedo cambiarme de Medicaid al Mercado de Seguros si cambian mis ingresos?",
          a: "Sí. Un cambio de ingresos es un evento de vida que califica para un período especial de inscripción. Si sus ingresos suben por encima del límite de Medicaid, tiene 60 días para inscribirse en un plan del Mercado de Seguros.",
        },
        {
          q: "¿Medicaid cubre medicamentos recetados?",
          a: "Sí. Todos los programas de Medicaid cubren medicamentos recetados, aunque la lista de medicamentos cubiertos varía según el estado. Los planes del Mercado de Seguros también cubren medicamentos recetados, pero lo que usted paga varía mucho según el nivel del plan.",
        },
      ],
    },
    "section-8-vs-public-housing": {
      title: "Section 8 o vivienda pública: ¿cuál es la diferencia?",
      description:
        "Los dos programas ayudan a familias de bajos ingresos a pagar su vivienda, pero funcionan de maneras muy distintas. Conocer la diferencia le ayuda a decidir dónde solicitar.",
      programA: {
        name: "Section 8 (Vales de Elección de Vivienda)",
        tagline: "Vales que puede llevar consigo y usar en viviendas privadas",
        dimensions: [
          {
            label: "Cómo funciona",
            a: "El vale se paga directamente al dueño privado de la vivienda",
            b: "",
          },
          {
            label: "Elección de vivienda",
            a: "Puede rentar cualquier vivienda privada que cumpla los requisitos",
            b: "",
          },
          {
            label: "Traslado",
            a: "Puede mudarse a otro estado con el vale",
            b: "",
          },
          {
            label: "Tiempo de espera",
            a: "De 1 a más de 10 años; muchas listas están cerradas",
            b: "",
          },
          {
            label: "Parte de la renta que paga",
            a: "Usted paga ~30% de su ingreso ajustado",
            b: "",
          },
          {
            label: "Lo administra",
            a: "La Autoridad de Vivienda Pública (PHA) local",
            b: "",
          },
        ],
      },
      programB: {
        name: "Vivienda pública",
        tagline:
          "Viviendas del gobierno administradas por las autoridades locales de vivienda",
        dimensions: [
          {
            label: "Cómo funciona",
            a: "",
            b: "Usted vive en una propiedad del gobierno",
          },
          {
            label: "Elección de vivienda",
            a: "",
            b: "Solo puede elegir entre las viviendas públicas disponibles",
          },
          {
            label: "Traslado",
            a: "",
            b: "No se puede trasladar. Está ligado a un complejo de viviendas específico",
          },
          {
            label: "Tiempo de espera",
            a: "",
            b: "De 1 a más de 5 años; la disponibilidad varía según la ciudad",
          },
          {
            label: "Parte de la renta que paga",
            a: "",
            b: "Usted paga ~30% de su ingreso ajustado",
          },
          {
            label: "Lo administra",
            a: "",
            b: "La Autoridad de Vivienda Pública (PHA) local",
          },
        ],
      },
      verdict:
        "Solicite los dos a través de su PHA local. En la mayoría de las áreas es la misma solicitud.",
      verdictDetail:
        "Los vales de Section 8 le dan más opciones: puede rentar la mayoría de los apartamentos privados y hasta mudarse a otra ciudad. La vivienda pública por lo general se consigue más rápido (donde hay disponibilidad), pero usted debe vivir en un complejo de viviendas específico. En la mayoría de las ciudades, usted solicita los dos al mismo tiempo en su Autoridad de Vivienda Pública local. Como los tiempos de espera son largos en los dos programas, es muy importante solicitar lo antes posible.",
      faqs: [
        {
          q: "¿Puedo usar un vale de Section 8 para comprar una casa?",
          a: "Sí. El programa de Vales para Ser Dueño de Vivienda (también llamado HCV Homeownership) permite a las familias que califican usar su vale para pagar la hipoteca en lugar de la renta. Debe cumplir requisitos de ingresos, de empleo y de ser comprador por primera vez.",
        },
        {
          q: "¿Qué ingresos califican para Section 8?",
          a: "Sus ingresos deben ser iguales o menores al 50% del Ingreso Medio del Área (AMI) donde vive. Al menos el 75% de los vales deben darse a familias con ingresos iguales o menores al 30% del AMI. Los límites de ingresos varían mucho según la ciudad.",
        },
        {
          q: "¿Cómo puedo salir más rápido de la lista de espera?",
          a: "Solicite en varias PHA al mismo tiempo, porque los tiempos de espera varían mucho según el lugar. Esté atento a los períodos de inscripción abierta. Las categorías de preferencia (veteranos, personas con discapacidades, familias sin hogar) pueden subirle en la lista.",
        },
      ],
    },
    "rd-credit-vs-sbir": {
      title:
        "Crédito fiscal por I+D o subvención SBIR: ¿cuál debe buscar su empresa?",
      description:
        "Las pequeñas empresas que invierten en investigación y desarrollo (I+D) tienen dos incentivos federales importantes. Tienen propósitos distintos y con frecuencia se pueden usar juntos.",
      programA: {
        name: "Crédito fiscal por I+D (Sección 41)",
        tagline:
          "Un crédito fiscal permanente para gastos calificados de investigación y experimentación",
        dimensions: [
          {
            label: "Tipo",
            a: "Crédito fiscal contra el impuesto sobre la renta o el impuesto sobre la nómina",
            b: "",
          },
          {
            label: "Cantidad",
            a: "14% de los gastos calificados de investigación (QRE) por encima de la base (método ASC); 20% con el método regular",
            b: "",
          },
          {
            label: "Quién califica",
            a: "Cualquier empresa con actividades de I+D que califican",
            b: "",
          },
          {
            label: "Proceso de solicitud",
            a: "Se reclama en la declaración de impuestos anual",
            b: "",
          },
          {
            label: "Dinero por adelantado",
            a: "No. Reduce sus impuestos, o se puede usar en años futuros",
            b: "",
          },
          {
            label: "Propiedad intelectual",
            a: "Sí. Usted es dueño de toda la propiedad intelectual que resulte",
            b: "",
          },
        ],
      },
      programB: {
        name: "Subvención SBIR",
        tagline:
          "Subvenciones federales competitivas para pequeñas empresas que hacen I+D innovadora",
        dimensions: [
          {
            label: "Tipo",
            a: "",
            b: "Subvención directa (Fase I: ~$275K; Fase II: ~$1.85M)",
          },
          {
            label: "Cantidad",
            a: "",
            b: "Fase I: hasta $275,000; Fase II: hasta $1.85M",
          },
          {
            label: "Quién califica",
            a: "",
            b: "Pequeñas empresas de EE. UU. con <500 empleados",
          },
          {
            label: "Proceso de solicitud",
            a: "",
            b: "Propuesta competitiva a agencias federales",
          },
          {
            label: "Dinero por adelantado",
            a: "",
            b: "Sí. Su empresa recibe un pago directo en efectivo",
          },
          {
            label: "Propiedad intelectual",
            a: "",
            b: "Sí. Usted sigue siendo dueño de la propiedad intelectual que resulte",
          },
        ],
      },
      verdict:
        "Busque los dos. Se pueden combinar y cubren necesidades de flujo de efectivo distintas.",
      verdictDetail:
        "El crédito fiscal por I+D está disponible para casi cualquier empresa que haga investigación que califica: software, manufactura, biotecnología y más. No le da dinero por adelantado, pero reduce sus impuestos de inmediato o crea un saldo que puede usar en años futuros. SBIR es competitivo y toma meses, pero le da dinero real para financiar investigación que de otra forma no podría pagar. Las empresas nuevas con frecuencia usan SBIR para financiar la I+D inicial y después reclaman el crédito por I+D para los demás gastos. Se pueden combinar en el mismo año.",
      faqs: [
        {
          q: "¿Una empresa nueva que no tiene ganancias puede usar el crédito fiscal por I+D?",
          a: "Sí. Las Pequeñas Empresas Calificadas (QSB), que son empresas con menos de $5M en ingresos brutos y no más de 5 años con ingresos brutos, pueden aplicar hasta $500,000 del crédito por I+D contra los impuestos sobre la nómina en lugar del impuesto sobre la renta.",
        },
        {
          q: "¿Qué tan competitivas son las subvenciones SBIR?",
          a: "Las tasas de aprobación varían según la agencia y el tema, pero por lo general son del 10–25% para la Fase I. Las tasas de aprobación de la Fase II para quienes recibieron la Fase I son más altas, con frecuencia del 40–60%. El potencial comercial es tan importante como el mérito técnico.",
        },
        {
          q: "¿Puedo reclamar el crédito por I+D por los mismos gastos que pagó SBIR?",
          a: "No. No puede reclamar el crédito fiscal por I+D por gastos pagados con fondos de SBIR. Sí puede reclamar el crédito por gastos de I+D pagados con sus propios fondos en el mismo año en que recibe una subvención SBIR.",
        },
      ],
    },
  },
  situations: {
    veterans: {
      title: "Beneficios para veteranos",
      hero: "Usted sirvió a su país. Puede tener derecho a más beneficios de los que cree.",
      description:
        "Los veteranos y sus familias con frecuencia califican para muchos beneficios federales y estatales, como atención médica, ayuda con la vivienda y fondos para estudios. Muchos beneficios no se reclaman porque el sistema es difícil de entender. Benefind le ayuda a encontrar todo lo que le corresponde.",
      programs: [
        {
          name: "Atención médica del VA",
          summary:
            "Atención médica gratis o de bajo costo en centros médicos y clínicas del VA.",
          eligibilityHint:
            "La mayoría de los veteranos con baja honorable califican.",
        },
        {
          name: "Compensación por discapacidad del VA",
          summary:
            "Pagos mensuales libres de impuestos por discapacidades relacionadas con el servicio militar.",
          eligibilityHint:
            "Requiere una calificación de discapacidad relacionada con el servicio otorgada por el VA.",
        },
        {
          name: "GI Bill (Post-9/11)",
          summary:
            "Pagos para matrícula, vivienda y libros para estudios superiores.",
          eligibilityHint:
            "90 días o más de servicio activo después del 10 de septiembre de 2001.",
        },
        {
          name: "Section 8 (HCV)",
          summary:
            "Vales de ayuda para la renta que cubren la diferencia entre la renta y sus ingresos.",
          eligibilityHint:
            "Ingresos iguales o menores al 50% del ingreso medio del área.",
        },
        {
          name: "SNAP",
          summary:
            "Beneficios mensuales para alimentos que se cargan en una tarjeta EBT.",
          eligibilityHint:
            "Ingreso bruto igual o menor al 130% del nivel federal de pobreza.",
        },
        {
          name: "Medicaid",
          summary:
            "Cobertura médica gratis o de bajo costo para personas y familias que califican.",
          eligibilityHint:
            "Los requisitos de ingresos y tamaño del hogar varían según el estado.",
        },
        {
          name: "SSI",
          summary:
            "Ayuda mensual en efectivo para veteranos con discapacidades o de edad avanzada que tienen ingresos limitados.",
          eligibilityHint:
            "Menos de $2,000 en recursos contables; ingresos limitados.",
        },
      ],
      faqs: [
        {
          q: "¿Los veteranos califican automáticamente para la atención médica del VA?",
          a: "No automáticamente. Debe solicitarla y cumplir los requisitos, que incluyen el tipo de baja y el tiempo de servicio. La mayoría de los veteranos con baja honorable califican, pero la prioridad se asigna por un sistema de grupos según la calificación de discapacidad y los ingresos.",
        },
        {
          q: "¿Los veteranos pueden usar beneficios del VA y Medicaid?",
          a: "Sí. La atención médica del VA y Medicaid son programas separados. Muchos veteranos usan el VA para la atención relacionada con el servicio militar y Medicaid para otras necesidades de salud. Cada programa decide por separado si usted califica.",
        },
        {
          q: "¿El GI Bill es solo para la universidad?",
          a: "No. Los beneficios del Post-9/11 GI Bill se pueden usar para programas universitarios y de posgrado, formación vocacional, capacitación en el trabajo, aprendizaje de oficios y entrenamiento de vuelo. En algunos casos, los beneficios también se pueden transferir a dependientes.",
        },
        {
          q: "¿Los pagos por discapacidad del VA pagan impuestos?",
          a: "No. La compensación por discapacidad del VA está libre de impuestos federales y estatales.",
        },
      ],
    },
    students: {
      title: "Beneficios para estudiantes",
      hero: "Ir a la universidad no debería costarle todo lo que tiene.",
      description:
        "Entre la matrícula, la vivienda y la comida, los estudiantes tienen muchos gastos. Muchos programas federales y estatales se crearon para ayudar con esos gastos. Usted puede calificar para más que la ayuda financiera.",
      programs: [
        {
          name: "Pell Grant",
          summary:
            "Subvención federal de hasta $7,395 al año que no se tiene que devolver.",
          eligibilityHint:
            "Se basa en la Contribución Familiar Esperada de la FAFSA.",
        },
        {
          name: "SNAP",
          summary:
            "Beneficios mensuales para alimentos. Algunos estudiantes califican si trabajan o tienen dependientes.",
          eligibilityHint:
            "Debe trabajar 20 horas o más por semana o cumplir una excepción.",
        },
        {
          name: "Medicaid / CHIP",
          summary:
            "Cobertura médica gratis o de bajo costo según sus ingresos.",
          eligibilityHint:
            "Muchos estudiantes de tiempo completo califican según sus propios ingresos.",
        },
        {
          name: "LIHEAP",
          summary:
            "Ayuda para pagar facturas de servicios, como calefacción, aire acondicionado y emergencias de energía.",
          eligibilityHint:
            "Ingresos iguales o menores al 150% del nivel federal de pobreza.",
        },
        {
          name: "Trabajo y Estudio (Work-Study)",
          summary:
            "Trabajos de medio tiempo pagados por el gobierno federal a través de su escuela.",
          eligibilityHint:
            "Se decide según su necesidad económica en la FAFSA.",
        },
        {
          name: "Subvenciones estatales para la matrícula",
          summary:
            "Subvenciones de cada estado que se suman a la ayuda federal.",
          eligibilityHint:
            "Varía según el estado. Consulte la oficina de educación superior de su estado.",
        },
      ],
      faqs: [
        {
          q: "¿Los estudiantes universitarios pueden recibir SNAP?",
          a: "La mayoría de los estudiantes de tiempo completo de 18 a 49 años no califican para SNAP, a menos que cumplan una excepción: trabajar 20 horas o más por semana, participar en Trabajo y Estudio, cuidar a un hijo dependiente o recibir TANF.",
        },
        {
          q: "¿La Pell Grant cubre el colegio comunitario?",
          a: "Sí. La Pell Grant se puede usar en colegios comunitarios acreditados, programas vocacionales y universidades de cuatro años. Se basa en la necesidad económica, no en las calificaciones.",
        },
        {
          q: "¿Los estudiantes internacionales pueden recibir beneficios federales?",
          a: "La mayoría de los beneficios federales requieren ciudadanía de EE. UU. o estatus de inmigrante calificado. Los estudiantes internacionales con visa F-1 o J-1 por lo general no califican para SNAP, Medicaid ni la Pell Grant.",
        },
      ],
    },
    seniors: {
      title: "Beneficios para personas mayores",
      hero: "Usted ha trabajado toda su vida. Estos beneficios le pertenecen.",
      description:
        "Las personas de 60 años o más están entre los grupos que menos reciben los beneficios a los que tienen derecho. Muchos programas tienen requisitos más amplios o protecciones adicionales para adultos mayores, como ayuda con medicamentos recetados y ayuda con alimentos.",
      programs: [
        {
          name: "Medicare",
          summary:
            "Seguro médico federal para adultos de 65 años o más que cubre costos de hospital, atención médica y medicamentos.",
          eligibilityHint:
            "Tener 65 años o más, o ser menor con ciertas discapacidades o con enfermedad renal en etapa terminal (ESRD).",
        },
        {
          name: "Medicaid",
          summary:
            "Puede complementar Medicare y cubrir cuidado a largo plazo y otros costos.",
          eligibilityHint:
            "Los límites de ingresos y bienes varían según el estado; muchas personas mayores califican para los dos.",
        },
        {
          name: "SSI",
          summary:
            "Dinero mensual para personas de 65 años o más con ingresos y recursos limitados.",
          eligibilityHint:
            "Tener 65 años o más, con ingresos y recursos por debajo de los límites de la SSA.",
        },
        {
          name: "SNAP",
          summary:
            "Beneficios para alimentos; las personas mayores pueden calificar con límites de ingresos más altos.",
          eligibilityHint:
            "Los hogares con personas mayores o con discapacidades no tienen que pasar la prueba de ingreso bruto.",
        },
        {
          name: "LIHEAP",
          summary:
            "Ayuda con las facturas de energía. Las personas mayores tienen prioridad.",
          eligibilityHint:
            "Ingresos iguales o menores al 150% del nivel federal de pobreza; las personas mayores tienen prioridad.",
        },
        {
          name: "Subsidio por Bajos Ingresos (LIS)",
          summary:
            "Ayuda Adicional (Extra Help) con los costos de medicamentos recetados de Medicare Parte D.",
          eligibilityHint:
            "Ingresos menores a ~150% del nivel de pobreza; recursos limitados.",
        },
        {
          name: "HECM (Hipoteca Revertida)",
          summary:
            "Programa asegurado por la FHA que permite a las personas mayores convertir el valor de su casa en dinero.",
          eligibilityHint:
            "Tener 62 años o más y ser dueño de su casa sin deuda o tener una parte importante de su valor ya pagada.",
        },
      ],
      faqs: [
        {
          q: "¿Puedo tener Medicare y Medicaid al mismo tiempo?",
          a: "Sí. Es común que las personas mayores de bajos ingresos califiquen para los dos (Medicare + Medicaid). Medicaid con frecuencia cubre lo que Medicare no cubre, como cuidado a largo plazo, atención dental y de la vista.",
        },
        {
          q: "¿Cuál es el límite de ingresos para SSI en 2026?",
          a: "Para 2026, el pago federal estándar de SSI es de $967 al mes para una persona y $1,450 para una pareja. Los límites de ingresos son menores que el monto del pago por la forma en que la SSA cuenta los ingresos. Muchos estados agregan un pago adicional.",
        },
        {
          q: "¿Las personas mayores están exentas de los requisitos de trabajo de SNAP?",
          a: "Sí. Las personas de 60 años o más están exentas de los requisitos de trabajo de SNAP. Los hogares con personas mayores o con discapacidades también tienen reglas de ingresos más favorables.",
        },
      ],
    },
    "single-parents": {
      title: "Beneficios para padres y madres solteros",
      hero: "Criar a una familia sin pareja es muy difícil. Usted no debería hacerlo sin apoyo.",
      description:
        "Los padres y madres solteros con frecuencia califican para la mayor variedad de beneficios: ayuda con alimentos, atención médica para los niños, ayuda para pagar el cuidado infantil, ayuda con la vivienda y más. Lo difícil es saber dónde buscar.",
      programs: [
        {
          name: "SNAP",
          summary:
            "Beneficios mensuales para alimentos para familias con ingresos limitados.",
          eligibilityHint:
            "Ingreso bruto igual o menor al 130% del FPL; las familias más grandes reciben más.",
        },
        {
          name: "CHIP",
          summary:
            "Cobertura médica de bajo costo para niños de familias que ganan demasiado para calificar para Medicaid.",
          eligibilityHint:
            "Niños menores de 19 años en familias con ingresos por encima de los límites de Medicaid.",
        },
        {
          name: "WIC",
          summary:
            "Beneficios de nutrición para mujeres embarazadas, madres que dieron a luz recientemente y niños menores de 5 años.",
          eligibilityHint:
            "Ingresos iguales o menores al 185% del FPL; debe tener un riesgo de nutrición.",
        },
        {
          name: "TANF",
          summary:
            "Ayuda en efectivo y servicios de apoyo para familias con hijos.",
          eligibilityHint:
            "Familias con hijos menores de 18 años; los requisitos de ingresos y de trabajo varían según el estado.",
        },
        {
          name: "CCDF (Ayuda para el cuidado infantil)",
          summary:
            "Ayuda federal para que las familias de bajos ingresos puedan pagar el cuidado infantil.",
          eligibilityHint:
            "Padres que trabajan o estudian; el límite de ingresos varía según el estado.",
        },
        {
          name: "EITC",
          summary:
            "Crédito fiscal reembolsable de hasta $7,830 para familias con tres hijos o más.",
          eligibilityHint:
            "Debe tener ingresos del trabajo y cumplir los límites de ingreso bruto ajustado (AGI); es mucho mayor si tiene hijos.",
        },
        {
          name: "Section 8 (HCV)",
          summary:
            "Vales para la renta que limitan su gasto de vivienda al 30% de sus ingresos.",
          eligibilityHint:
            "Ingresos iguales o menores al 50% del ingreso medio del área; las familias con hijos tienen prioridad.",
        },
      ],
      faqs: [
        {
          q: "¿Puedo recibir SNAP y TANF al mismo tiempo?",
          a: "Sí. SNAP y TANF son programas separados. Muchas familias con un solo padre o madre reciben los dos al mismo tiempo. En algunos estados, recibir TANF le hace calificar automáticamente para SNAP.",
        },
        {
          q: "¿WIC es solo para mujeres embarazadas?",
          a: "No. WIC atiende a mujeres embarazadas, madres que amamantan, mujeres hasta 6 meses después del parto y niños hasta los 5 años. Un niño de su hogar puede calificar aunque usted no califique.",
        },
        {
          q: "¿Cuál es el EITC máximo para un padre o madre soltero con un hijo?",
          a: "Para el año fiscal 2025, el EITC máximo para una persona que declara sola con un hijo que califica es de $4,328. Con dos hijos es de $7,152, y con tres o más es de $7,830.",
        },
      ],
    },
    "gig-workers": {
      title: "Beneficios para trabajadores independientes y de plataformas",
      hero: "Trabajar por cuenta propia no significa que tiene que arreglárselas sin ayuda.",
      description:
        "Los trabajadores independientes, los conductores de aplicaciones de transporte, los repartidores y los contratistas independientes con frecuencia no reciben los beneficios para los que califican. Pero muchos programas federales y estatales cuentan los ingresos de trabajo por cuenta propia y ofrecen apoyo real.",
      programs: [
        {
          name: "Seguro del Mercado (ACA)",
          summary:
            "Seguro médico con subsidios según sus ingresos para personas sin cobertura de un empleador.",
          eligibilityHint:
            "No tiene cobertura de un empleador; ingresos entre 100–400% del FPL.",
        },
        {
          name: "SNAP",
          summary:
            "Los ingresos por cuenta propia cuentan. Como se usan las ganancias netas, con frecuencia más personas califican.",
          eligibilityHint:
            "Se usan los ingresos netos por cuenta propia; las deducciones reducen los ingresos que cuentan.",
        },
        {
          name: "EITC",
          summary:
            "Crédito fiscal para trabajadores de bajos ingresos. Los ingresos de trabajos por plataformas cuentan como ingresos del trabajo.",
          eligibilityHint:
            "Los ingresos por cuenta propia cuentan; debe presentar el Anexo SE (Schedule SE).",
        },
        {
          name: "Medicaid",
          summary:
            "Cobertura gratis o de bajo costo si sus ingresos están por debajo de los límites de su estado.",
          eligibilityHint:
            "Ingresos anuales menores a ~138% del FPL en los estados que ampliaron Medicaid.",
        },
        {
          name: "LIHEAP",
          summary:
            "Ayuda para pagar las facturas de energía, sobre todo en las temporadas de más calor o más frío.",
          eligibilityHint:
            "Ingresos iguales o menores al 150% del FPL; los ingresos irregulares se promedian.",
        },
        {
          name: "SBIR / STTR",
          summary:
            "Subvenciones federales de I+D para pequeñas empresas que desarrollan tecnologías innovadoras.",
          eligibilityHint:
            "Pequeña empresa de propiedad estadounidense; debe tener menos de 500 empleados.",
        },
      ],
      faqs: [
        {
          q: "¿Los ingresos de trabajos por plataformas cuentan para SNAP?",
          a: "Sí. SNAP usa los ingresos netos por cuenta propia: sus ganancias brutas menos los gastos de negocio permitidos. Con frecuencia, esto da como resultado menos ingresos contables que los de un trabajador con formulario W-2 que gana lo mismo.",
        },
        {
          q: "¿Puedo recibir beneficios por desempleo si trabajo por plataformas?",
          a: "El seguro de desempleo (UI) normal no cubre a los contratistas independientes. Sin embargo, la Asistencia de Desempleo por la Pandemia (PUA) sí los cubrió durante el COVID-19. Algunos estados están estudiando programas de UI para trabajadores de plataformas. Consulte al departamento de trabajo de su estado para conocer las reglas actuales.",
        },
        {
          q: "¿Puedo deducir las primas del seguro médico si trabajo por cuenta propia?",
          a: "Sí. Las personas que trabajan por cuenta propia pueden deducir el 100% de las primas del seguro médico para sí mismas, su cónyuge y sus dependientes de sus ingresos sujetos a impuestos federales, aunque no detallen sus deducciones.",
        },
      ],
    },
    immigrants: {
      title: "Beneficios para inmigrantes",
      hero: "Adaptarse a un país nuevo es difícil. Conocer sus opciones no debería serlo.",
      description:
        "Calificar para beneficios federales depende de su estatus migratorio, del tiempo que lleva viviendo en el país y del programa específico. Muchos inmigrantes y sus hijos nacidos en EE. UU. califican para un apoyo importante.",
      programs: [
        {
          name: "SNAP",
          summary:
            "Los residentes permanentes legales pueden calificar después de 5 años; en algunos casos se puede calificar antes.",
          eligibilityHint:
            "Requiere estatus de inmigrante calificado; la espera de 5 años aplica a la mayoría de los adultos.",
        },
        {
          name: "Medicaid / CHIP",
          summary:
            "Medicaid de emergencia está disponible sin importar el estatus; CHIP varía según el estado.",
          eligibilityHint:
            "Los residentes permanentes legales (LPR) califican después de 5 años; en muchos estados los niños califican de inmediato.",
        },
        {
          name: "WIC",
          summary:
            "WIC no tiene un período de espera de 5 años para la mayoría de los estatus migratorios.",
          eligibilityHint:
            "Todos los inmigrantes con estatus legal califican, sin importar cuánto tiempo llevan viviendo en EE. UU.",
        },
        {
          name: "EITC",
          summary:
            "Disponible para residentes legales con número de Seguro Social que tuvieron ingresos del trabajo.",
          eligibilityHint:
            "Debe tener un número de Seguro Social (SSN) válido e ingresos del trabajo que califican.",
        },
        {
          name: "Mercado de Seguros de la ACA",
          summary:
            "Cobertura médica con subsidios; los beneficiarios de DACA califican en la mayoría de los estados.",
          eligibilityHint:
            "Requiere presencia legal; en la mayoría de los estados, el estatus de DACA cuenta como presencia legal.",
        },
        {
          name: "LIHEAP",
          summary:
            "Ayuda con la energía disponible para muchos inmigrantes con estatus legal.",
          eligibilityHint:
            "Estatus migratorio legal; hay límites de ingresos y recursos.",
        },
      ],
      faqs: [
        {
          q: "¿Solicitar beneficios afectará mi solicitud de green card?",
          a: 'La regla de "carga pública" aplica a ciertos beneficios federales. Desde 2023, SNAP, Medicaid, CHIP y los vales de vivienda NO se toman en cuenta en la mayoría de las decisiones migratorias. TANF y SSI todavía pueden tomarse en cuenta. Si está en el proceso de green card, consulte siempre a un abogado de inmigración antes de solicitar.',
        },
        {
          q: "¿Los inmigrantes indocumentados pueden recibir algún beneficio?",
          a: "Medicaid de emergencia está disponible para cualquier persona en una emergencia médica, sin importar su estatus. Los hijos nacidos en EE. UU. de padres indocumentados califican para todos los beneficios. Muchos programas estatales y locales no tienen requisitos de estatus migratorio.",
        },
        {
          q: '¿Qué es un "inmigrante calificado" para efectos de los beneficios?',
          a: "Los inmigrantes calificados incluyen a los residentes permanentes legales (personas con green card), refugiados, asilados, personas a quienes se les otorgó la suspensión de la deportación, personas que entraron como cubanos o haitianos y ciertas víctimas de violencia doméstica. La definición exacta varía según el programa.",
        },
      ],
    },
    "recently-unemployed": {
      title: "Beneficios para personas que perdieron su empleo recientemente",
      hero: "Perder un empleo es difícil. Encontrar apoyo no debería serlo.",
      description:
        "Perder su empleo puede hacerle calificar para programas para los que antes no calificaba. Es importante actuar rápido: muchos beneficios están disponibles desde el primer día y otros tienen plazos cortos para solicitar.",
      programs: [
        {
          name: "Seguro de desempleo",
          summary:
            "Pagos semanales en efectivo según su salario anterior mientras busca trabajo.",
          eligibilityHint:
            "Debe haber perdido su empleo sin tener la culpa; se requieren ingresos anteriores.",
        },
        {
          name: "Medicaid / Mercado de Seguros de la ACA",
          summary:
            "Perder su empleo es un evento de vida que califica. Tiene 60 días para inscribirse.",
          eligibilityHint:
            "Perder la cobertura de su empleo abre un período especial de inscripción.",
        },
        {
          name: "SNAP",
          summary:
            "La baja de ingresos por perder el empleo con frecuencia hace que el hogar califique de inmediato.",
          eligibilityHint:
            "Solicite en cuanto bajen sus ingresos; el trámite puede tardar hasta 30 días.",
        },
        {
          name: "LIHEAP",
          summary:
            "Ayuda con las facturas de energía para evitar cortes de servicio cuando sus ingresos se interrumpen.",
          eligibilityHint:
            "Una baja de ingresos con frecuencia permite calificar; hay ayuda de emergencia si el corte está cerca.",
        },
        {
          name: "COBRA",
          summary:
            "Continuación de la cobertura médica de su empleador hasta por 18 meses.",
          eligibilityHint:
            "Disponible si tenía cobertura de su empleador; por lo general es cara.",
        },
        {
          name: "EITC",
          summary:
            "Si trabajó parte del año, todavía puede calificar al declarar impuestos.",
          eligibilityHint:
            "Se basa en todo el año fiscal; los ingresos de parte del año todavía pueden calificar.",
        },
        {
          name: "Capacitación WIOA",
          summary:
            "Capacitación laboral, ayuda con su currículum y servicios de empleo pagados con fondos federales.",
          eligibilityHint:
            "Disponible en los American Job Centers; se requiere comprobar los ingresos.",
        },
      ],
      faqs: [
        {
          q: "¿Qué tan rápido puedo recibir SNAP después de perder mi empleo?",
          a: "Puede solicitar el mismo día en que pierde su empleo. El trámite normal tarda hasta 30 días, pero SNAP Acelerado está disponible en 7 días si sus ingresos y recursos son muy bajos.",
        },
        {
          q: "¿El seguro de desempleo paga impuestos?",
          a: "Sí, los beneficios de desempleo se consideran ingresos sujetos a impuestos federales. Puede pedir que se retengan los impuestos federales de sus pagos para no tener que pagar una cantidad inesperada al declarar impuestos.",
        },
        {
          q: "Si me despidieron, ¿todavía puedo recibir beneficios por desempleo?",
          a: "Depende del motivo. Si lo despidieron por mala conducta, puede quedar descalificado. Si fue un despido por recorte de personal o por su desempeño (sin mala conducta intencional), por lo general califica. Cada estado toma su propia decisión.",
        },
      ],
    },
    "people-with-disabilities": {
      title: "Beneficios para personas con discapacidades",
      hero: "Hay programas de apoyo. Encontrarlos no debería ser un trabajo de tiempo completo.",
      description:
        "Las personas que viven con discapacidades (físicas, cognitivas o de otro tipo) están entre los grupos que menos acceso tienen a los beneficios. Varios programas, que a veces se combinan, pueden darle ingresos, atención médica, vivienda y más.",
      programs: [
        {
          name: "SSI",
          summary:
            "Dinero mensual para personas con ingresos limitados que tienen una discapacidad que califica.",
          eligibilityHint:
            "Debe cumplir la definición de discapacidad de la SSA; hay límites de ingresos y recursos.",
        },
        {
          name: "SSDI",
          summary:
            "Ingresos por discapacidad según su historial de trabajo y sus créditos del Seguro Social.",
          eligibilityHint:
            "Debe haber trabajado suficientes trimestres; la discapacidad debe impedirle hacer un trabajo sustancial.",
        },
        {
          name: "Medicaid",
          summary:
            "Cobertura médica gratis que con frecuencia viene automáticamente con SSI.",
          eligibilityHint:
            "Las personas que reciben SSI con frecuencia se inscriben automáticamente; otras personas solicitan por separado.",
        },
        {
          name: "Medicare",
          summary:
            "Disponible después de 24 meses de recibir SSDI. Cubre hospital, atención médica y medicamentos recetados.",
          eligibilityHint:
            "Se inscribe automáticamente después de 24 meses de recibir SSDI.",
        },
        {
          name: "Section 8 (HCV)",
          summary:
            "Ayuda para la renta; las personas con discapacidades tienen preferencia en muchas listas de espera.",
          eligibilityHint:
            "Con frecuencia hay preferencia por discapacidad; ingresos iguales o menores al 50% del AMI.",
        },
        {
          name: "SNAP",
          summary:
            "Tener una discapacidad exime a los hogares de muchas reglas normales de SNAP y de los requisitos de trabajo.",
          eligibilityHint:
            "Los hogares con personas con discapacidades no pasan la prueba de ingreso bruto; se usa el ingreso neto.",
        },
        {
          name: "Cuentas ABLE",
          summary:
            "Cuentas de ahorro con ventajas fiscales que no afectan su elegibilidad para SSI o Medicaid.",
          eligibilityHint:
            "La discapacidad debe haber empezado antes de los 26 años; hay límites anuales de aportes.",
        },
      ],
      faqs: [
        {
          q: "¿Cuál es la diferencia entre SSI y SSDI?",
          a: "SSI (Seguridad de Ingreso Suplementario) se basa en la necesidad económica: es para personas con ingresos y recursos limitados, sin importar su historial de trabajo. SSDI (Seguro por Discapacidad del Seguro Social) se basa en su historial de trabajo y en los impuestos del Seguro Social que ha pagado. Puede recibir los dos si califica.",
        },
        {
          q: "¿Cuánto tiempo tarda la aprobación por discapacidad?",
          a: "Las decisiones iniciales por lo general tardan de 3 a 6 meses. Es común que nieguen la solicitud, y las apelaciones pueden tardar de 1 a 2 años. Con frecuencia vale la pena trabajar con un abogado de discapacidad (que por lo general solo cobra si usted gana el caso).",
        },
        {
          q: "¿Recibir beneficios por discapacidad afecta a mi familia?",
          a: "SSDI tiene beneficios adicionales para su cónyuge y sus hijos. SSI no se extiende a los familiares. Recibir beneficios por discapacidad no impide que su cónyuge o sus hijos reciban sus propios beneficios.",
        },
      ],
    },
  },
};
