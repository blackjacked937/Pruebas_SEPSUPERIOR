// Support lines customized per project type
export const getSupportLine = (typeLogin) => {
  const type = Number(typeLogin);
  if (type === 1) {
    // ISEM
    return `
### Líneas de Apoyo y Contactos ISEM 📞
- **Línea de la Vida**: **800 911 2000** (Atención gratuita 24/7).
- **Servicios de Salud del EDOMex (ISEM)**: Llama al **722 235 8690** para ubicar tu clínica u hospital más cercano.
- **Emergencias**: Si es una urgencia médica o psiquiátrica inmediata, llama al **911**.
`;
  }
  if (type === 3) {
    // Adicciones
    return `
### Directorio de Apoyo y Rehabilitación 📞
- **Línea de la Vida (Conasama)**: **800 911 2000** (Atención gratuita y confidencial 24/7).
- **Alcohólicos Anónimos (AA)**: **55 5264 2466** (Directorio nacional de grupos).
- **Emergencias**: Ante sobredosis o crisis severa, llama al **911** o acude al centro psiquiátrico u hospitalario más cercano.
`;
  }
  if (type === 4) {
    // SEP (Secundaria)
    return `
### Números de Ayuda para Estudiantes 📞
- **Línea de la Vida**: **800 911 2000** (Apoyo gratuito las 24 horas).
- **Orientación SEP**: Platica con tu tutor de grupo o el orientador escolar de tu secundaria.
- **Emergencias**: Ante cualquier peligro o emergencia en casa o la escuela, llama al **911**.
`;
  }
  if (type === 5) {
    // SESyN (Preparatoria / Universidad)
    return `
### Red de Apoyo Estudiantil y Crisis 📞
- **Línea de la Vida**: **800 911 2000** (Atención especializada en crisis emocional 24/7).
- **Apoyo Psicopedagógico**: Acude al área de salud o orientación de tu campus (Preparatoria o Universidad).
- **Emergencias**: Llama al **911** si tú o un compañero se encuentra en riesgo inminente.
`;
  }
  // Mente Conecta (General)
  return `
### Líneas de Apoyo y Contactos 📞
- **Línea de la Vida**: **800 911 2000** (Atención 24/7 en México).
- **Emergencias**: Si es una emergencia inmediata, debes llamar al **911**.
- **Mente Conecta**: Ofrecemos recursos adicionales en nuestra plataforma para acompañarte.
`;
};

// Generates the personalized knowledge base for each project
export const getKnowledgeBase = (typeLogin) => {
  const type = Number(typeLogin);
  const supportLine = getSupportLine(type);

  // Common/Standard topics adapted per project
  if (type === 1) {
    // ----------------------------------------------------
    // 1. MENTE CONECTA - ISEM (Clínicas del EDOMex)
    // ----------------------------------------------------
    return {
      alcohol: {
        title: "Alcohol 🍺",
        description: "El abuso del **alcohol** afecta gravemente la salud física y las relaciones familiares. Conocer sus riesgos ayuda a prevenir adicciones crónicas.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué es el Alcohol? 🍺",
            content: "El **alcohol** es una sustancia depresora del sistema nervioso central que altera el juicio y la coordinación.\n- **Abuso de alcohol**: Consumo excesivo que daña órganos vitales como el hígado y el corazón.\n- **Impacto social/familiar**: Deterioro en la convivencia familiar, abandono de obligaciones y propensión a la violencia.\n- **Efectos físicos**: Intoxicación, hipertensión y riesgo de accidentes bajo el influjo de la sustancia."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Guía de Prevención en la Comunidad 🍺",
            content: "1. **Conoce tus límites**: La decisión de no consumir o hacerlo de forma moderada protege tu salud.\n2. **Alimentación y agua**: Si consumes alcohol, hazlo siempre acompañado de comida y alterna con vasos de agua.\n3. **Evita la conducción bajo efectos**: Nunca conduzcas o subas al vehículo de alguien que haya bebido.\n4. **Canaliza el estrés**: Si experimentas problemas emocionales, busca terapia en lugar de recurrir al alcohol."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo en Clínicas del EDOMex 🩺",
            content: "Si tú o un familiar requiere apoyo para moderar o dejar el consumo de alcohol:\n- **Consulta en tu Clínica ISEM**: Acude al área de medicina preventiva o psicología para recibir valoración.\n- **UNEME-CAPA**: Centros estatales especializados en el tratamiento ambulatorio de adicciones.\n- **Grupos de Apoyo**: Participa en sesiones grupales de ayuda mutua avaladas por profesionales."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Protocolo ante Intoxicación Etílica 🚨",
            content: "Si encuentras a una persona con signos de intoxicación severa:\n1. **Colócala de lado**: La posición de seguridad evita la asfixia por broncoaspiración.\n2. **Mantén la vigilancia**: No la dejes sola ni permitas que duerma sin supervisión.\n3. **Llama a emergencias**: Si pierde el conocimiento o tiene dificultad para respirar, contacta al **911** o acude a urgencias del ISEM."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo ISEM 📞",
            content: supportLine
          }
        ]
      },
      ansiedad: {
        title: "Ansiedad 🧘",
        description: "El estrés cotidiano y las dificultades personales pueden detonar crisis de **ansiedad**. Su manejo oportuno es clave para la salud integral.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Entendiendo la Ansiedad 🧘",
            content: "La ansiedad es una reacción emocional normal ante el peligro, pero se vuelve patológica cuando es desproporcionada y persistente.\n- **Trastornos de Ansiedad**: Sentimiento constante de miedo o preocupación que interfiere en la vida diaria.\n- **Síntomas comunes**: Palpitaciones, sudoración, sensación de ahogo, tensión muscular y pensamientos catastróficos.\n- **Causas**: Factores genéticos, biológicos, ambientales y situaciones de estrés crónico."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Técnicas de Relajación y Control 🧘",
            content: "1. **Respiración Diafragmática**: Inhala profundamente por la nariz expandiendo el abdomen, retén y exhala lentamente.\n2. **Establece límites**: Divide tus tareas diarias para evitar la sobrecarga emocional y física.\n3. **Hábitos de sueño**: Duerme entre 7 y 8 horas diarias; el descanso repara el sistema nervioso.\n4. **Evita estimulantes**: Reduce al mínimo el consumo de cafeína, refrescos de cola y nicotina."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Atención en Salud Mental ISEM 🩺",
            content: "La ansiedad cuenta con tratamientos efectivos y profesionales a tu disposición:\n- **Servicio de Psicología**: Solicita cita en tu clínica de adscripción del ISEM.\n- **Terapia Cognitivo-Conductual**: Técnica clínica recomendada para identificar y cambiar pensamientos que generan temor.\n- **Seguimiento Psiquiátrico**: En casos necesarios, apoyo farmacológico prescrito y monitoreado por especialistas."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Actuación ante Ataques de Pánico 🚨",
            content: "Si una persona a tu alrededor sufre una crisis de pánico:\n1. **Acompaña con calma**: Háblale suavemente y recuérdale que la crisis pasará y que está a salvo.\n2. **Control de respiración**: Invítala a sincronizar su respiración con la tuya de manera lenta.\n3. **Distracción cognitiva**: Pídele que mencione objetos en la habitación para regresar su atención al entorno actual."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo ISEM 📞",
            content: supportLine
          }
        ]
      },
      alimentaria: {
        title: "Conducta Alimentaria 🥗",
        description: "Los trastornos alimenticios dañan severamente la salud física y psicológica de los pacientes. La detección temprana en clínicas es crucial.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Trastornos de la Conducta Alimentaria 🥗",
            content: "Son condiciones graves de salud mental caracterizadas por conductas alimentarias anormales y preocupación extrema por el peso corporal.\n- **Anorexia**: Restricción extrema de alimentos motivada por un miedo intenso a subir de peso.\n- **Bulimia**: Episodios de atracones seguidos de métodos compensatorios como el vómito autoinducido.\n- **Trastorno por Atracón**: Consumo descontrolado de comida sin conductas compensatorias, asociado a culpa y angustia."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Hábitos Saludables y Autoaceptación 🥗",
            content: "1. **Nutrición consciente**: Consume alimentos variados para aportar la energía necesaria a tu organismo.\n2. **Evita dietas milagro**: No sigas regímenes restrictivos sin la asesoría de un profesional de la salud.\n3. **Cuestiona los estándares**: Evita comparar tu cuerpo con imágenes retocadas en medios de comunicación.\n4. **Expresa tus emociones**: Habla de tus inseguridades corporales con tu médico de confianza."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Tratamiento Multidisciplinario 🩺",
            content: "La recuperación de un trastorno alimentario requiere un equipo especializado en el ISEM:\n- **Nutrición Clínica**: Planes de alimentación adaptados para restaurar la salud física.\n- **Apoyo Psicológico**: Terapia individual y familiar para tratar las causas emocionales subyacentes.\n- **Seguimiento Médico**: Monitoreo de signos vitales y análisis clínicos para evitar complicaciones orgánicas."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Señales de Alerta Médica 🚨",
            content: "Acude de inmediato a valoración si se presentan:\n1. Pérdida extrema de peso o desnutrición visible.\n2. Desmayos constantes, hipotensión o fatiga extrema.\n3. Aislamiento social severo y rechazo a comer en familia.\n4. **Apoyo empático**: Habla con el paciente sin juzgarlo y guíalo hacia la consulta médica."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo ISEM 📞",
            content: supportLine
          }
        ]
      },
      depresion: {
        title: "Depresión 😔",
        description: "La tristeza constante y el desinterés prolongado no son debilidad, sino síntomas de **depresión**. Conoce cómo recibir ayuda clínica.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué es la Depresión Clínica? 😔",
            content: "Es un trastorno del estado de ánimo que interfiere de forma persistente con la capacidad de trabajar, dormir, estudiar y comer.\n- **Síntomas clave**: Tristeza persistente, pérdida de interés en actividades placenteras (anhedonia) y falta de energía.\n- **Alteraciones físicas**: Problemas del sueño (insomnio/hipersomnia), cambios en el apetito y dolores corporales sin causa médica.\n- **Importancia**: Afecta a personas de cualquier edad y requiere un diagnóstico clínico formal."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pasos hacia el Bienestar Emocional 😔",
            content: "1. **Divide tus objetivos**: Realiza actividades sencillas divididas en pasos pequeños para no abrumarte.\n2. **Mantén contacto social**: Conversa con familiares o amigos cercanos sobre cómo te sientes.\n3. **Camina al aire libre**: La exposición moderada a la luz solar y el movimiento ayudan a liberar endorfinas.\n4. **No te automediques**: Evita el consumo de alcohol u otras sustancias para mitigar el malestar."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Ruta de Atención en el ISEM 🩺",
            content: "La depresión tiene tratamiento y recuperación viable:\n- **Consulta Psicológica**: Disponible en la red de clínicas de primer nivel del ISEM.\n- **Terapia Psicológica y Grupal**: Acompañamiento profesional para reestructurar pensamientos y emociones.\n- **Tratamiento Psiquiátrico**: Evaluación de la necesidad de medicamentos antidepresivos con supervisión médica continua."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Apoyar a un Familiar Deprimido 🚨",
            content: "Si detectas que un ser querido está pasando por un cuadro depresivo severo:\n1. **Escucha con empatía**: Evita dar consejos simplistas como 'échale ganas'. Valida su dolor.\n2. **Facilita la ayuda**: Ofrece acompañarlo a su cita en la clínica del ISEM.\n3. **Monitorea alertas**: Pon atención a comentarios relacionados con la desesperanza o el fin de la vida."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo ISEM 📞",
            content: supportLine
          }
        ]
      },
      drogas: {
        title: "Drogas 🚫",
        description: "El abuso de sustancias adictivas deteriora el bienestar familiar y la salud. La red de salud de EDOMex ofrece alternativas de tratamiento.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Sustancias Psicoactivas y Dependencia 🚫",
            content: "Son sustancias que al introducirse al organismo alteran el funcionamiento del sistema nervioso y generan dependencia física o psicológica.\n- **Adicción**: Enfermedad crónica caracterizada por la búsqueda y el consumo compulsivo de la sustancia.\n- **Tipos comunes**: Marihuana, inhalables, metanfetaminas, cocaína y fármacos de prescripción médica sin control.\n- **Consecuencias**: Daños cerebrales irreversibles, disfunción familiar y complicaciones cardiovasculares."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Estilo de Vida Saludable y Prevención 🚫",
            content: "1. **Fomenta la comunicación**: Hablar abiertamente sobre adicciones en el hogar disminuye el riesgo de consumo.\n2. **Desarrolla habilidades**: La asertividad y saber decir 'no' ante la presión social son factores protectores.\n3. **Actividades recreativas**: Involúcrate en deportes, talleres comunitarios y esparcimiento saludable.\n4. **Busca información formal**: Consulta a profesionales de salud para aclarar dudas sobre sustancias."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Tratamiento de Adicciones en ISEM 🩺",
            content: "La recuperación de adicciones es posible mediante un tratamiento estructurado:\n- **UNEME-CAPA**: Atención ambulatoria especializada con psicólogos y trabajadores sociales.\n- **Centros de Integración Juvenil (CIJ)**: Red aliada para el tratamiento y la rehabilitación.\n- **Atención Hospitalaria**: Desintoxicación médica segura en hospitales generales en casos de crisis de abstinencia."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Protocolo ante Crisis por Consumo 🚨",
            content: "En caso de sobredosis o reacciones psicóticas por sustancias:\n1. **Solicita apoyo médico inmediato**: Llama al **911** o acude a urgencias del ISEM.\n2. **Seguridad física**: Retira objetos peligrosos del entorno y mantén a la persona en un lugar ventilado.\n3. **Proporciona datos**: Informa al personal médico la sustancia y cantidad consumida, de ser posible."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo ISEM 📞",
            content: supportLine
          }
        ]
      },
      suicidio: {
        title: "Riesgo de Suicidio 🆘",
        description: "El dolor emocional puede llegar a sentirse intolerable. No pases este momento a solas, la intervención médica oportuna salva vidas.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Prevención del Suicidio y Alertas 🆘",
            content: "El comportamiento suicida es una respuesta compleja a un sufrimiento emocional intolerable, asociado a crisis personales o trastornos de salud mental.\n- **Ideación Suicida**: Pensamientos de muerte o deseos de no seguir viviendo.\n- **Señales de advertencia**: Despedidas verbales o escritas, regalar bienes queridos, aislamiento social abrupto o cambios drásticos de conducta.\n- **Mito**: 'Falar de suicidio promueve la idea'. **Realidad**: Hablar de forma comprensiva permite desahogar la presión y buscar ayuda profesional."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Acciones Inmediatas de Contención 🆘",
            content: "1. **Pide ayuda de inmediato**: No guardes el secreto; contacta a un profesional o familiar.\n2. **Mantén a la mano contactos de crisis**: Guarda el número de la Línea de la Vida.\n3. **Reduce el acceso a riesgos**: Mantén alejados medicamentos, armas u objetos cortantes de tu entorno.\n4. **Evita el aislamiento**: Quédate en compañía de personas de confianza en los momentos más difíciles."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Red de Urgencias y Salud Mental ISEM 🩺",
            content: "El ISEM cuenta con protocolos activos de atención inmediata:\n- **Urgencias en Clínicas y Hospitales**: Evaluación inmediata en crisis por médicos y psicólogos de guardia.\n- **Seguimiento Psicoterapéutico**: Sesiones enfocadas en dotar de herramientas cognitivas y afectivas para la vida.\n- **Acompañamiento Familiar**: Terapia de contención para el círculo de apoyo del paciente."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Intervención ante Crisis Suicida Inminente 🚨",
            content: "Si detectas que una persona está a punto de atentar contra su vida:\n1. **No la dejes sola**: Mantente a su lado en todo momento hasta que llegue ayuda.\n2. **Escucha sin juzgar**: No minimices su dolor ni discutas sobre la moralidad del acto.\n3. **Llama al 911**: O traslada al paciente de inmediato al área de urgencias de la clínica u hospital más cercano."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo ISEM 📞",
            content: supportLine
          }
        ]
      },
      tabaco: {
        title: "Tabaco 🚬",
        description: "El tabaquismo daña de forma crónica las vías respiratorias y el sistema circulatorio. Dejarlo restablece tu salud pulmonar notablemente.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Tabaquismo y Nicotina 🚬",
            content: "El **tabaquismo** es una adicción crónica a la nicotina contenida en el tabaco, causante de graves daños sistémicos.\n- **Nicotina**: Sustancia altamente adictiva que estimula temporalmente el estado de ánimo, generando fuerte dependencia.\n- **Cigarrillos electrónicos (vapeadores)**: Dispositivos que suministran aerosoles con nicotina y metales pesados altamente nocivos.\n- **Consecuencias**: EPOC, cardiopatías, diversos tipos de cáncer y envejecimiento prematuro del tejido pulmonar."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Estrategias de Cesación Tabáquica 🚬",
            content: "1. **Define tu Día D**: Elige una fecha en el calendario cercano para dejar de fumar por completo.\n2. **Limpia tu espacio**: Deshazte de ceniceros, cajetillas y encendedores de tu casa y trabajo.\n3. **Controla el síndrome de abstinencia**: Toma agua fría, realiza respiraciones lentas y haz ejercicio cardiovascular ligero.\n4. **Cambia tus rutinas**: Identifica los momentos del día en que solías fumar y realiza actividades distintas."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Clínicas de Tabaquismo ISEM 🩺",
            content: "Dejar de fumar es más fácil si cuentas con apoyo clínico:\n- **Clínicas Especializadas en Tabaquismo**: Programas integrales del ISEM que combinan apoyo médico y psicológico.\n- **Terapia Cognitivo-Conductual**: Sesiones para romper la dependencia psicológica y los hábitos de consumo.\n- **Apoyo Farmacológico**: Uso de sustitutos de nicotina o medicamentos específicos bajo receta médica de la clínica."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Manejo de Deseos de Fumar y Recaídas 🚨",
            content: "Si te encuentras en proceso de abstinencia y sientes antojo de fumar:\n1. **Aplaza la decisión**: Espera 10 minutos antes de encender un cigarrillo; por lo general, la intensidad del deseo disminuirá.\n2. **Evita la exposición de segunda mano**: Pide a tus conocidos que no fumen cerca de ti.\n3. **Aprende de los deslices**: Si tienes una recaída, no te castigues. Analiza qué la provocó y retoma tu plan de abstinencia."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo ISEM 📞",
            content: supportLine
          }
        ]
      },
      proyecto: {
        title: "Sobre el Proyecto ℹ️",
        description: "**Mente Conecta - ISEM** es un programa enfocado en la prevención y atención oportuna de la salud mental en las Clínicas del Estado de México.",
        sections: [
          {
            id: "def",
            label: "¿Qué es Mente Conecta - ISEM? 📖",
            title: "Sobre Mente Conecta - ISEM ℹ️",
            content: "**Mente Conecta - ISEM** es una iniciativa de salud digital diseñada para acercar herramientas de salud mental, orientación preventiva y protocolos de emergencia a toda la comunidad usuaria de las Clínicas del Estado de México (EDOMex)."
          },
          {
            id: "mision",
            label: "Nuestra Misión 🎯",
            title: "Misión del Proyecto 🎯",
            content: "Promover el bienestar emocional de la población mexiquense, facilitando el acceso a información confiable y desmitificando los trastornos mentales mediante la red de salud del ISEM."
          },
          {
            id: "ayuda",
            label: "¿Cómo te ayudamos? ✨",
            title: "Herramientas de Salud Mental ✨",
            content: "Te ofrecemos:\n- **Guías de Autocuidado** y manejo del estrés.\n- **Protocolos de Emergencia** ante crisis emocionales.\n- **Información Preventiva** sobre adicciones y depresión.\n- **Vinculación con Clínicas** y personal médico del ISEM."
          },
          {
            id: "valores",
            label: "Nuestros Valores ❤️",
            title: "Compromiso Social y Médico ❤️",
            content: "1. **Compromiso Social**: Brindar atención y orientación a todos.\n2. **Confidencialidad**: Tu privacidad y bienestar son primordiales.\n3. **Calidad Médica**: Contenido validado por profesionales de la salud del ISEM."
          }
        ]
      }
    };
  }

  if (type === 2) {
    // ----------------------------------------------------
    // 2. MENTE CONECTA (General / Completo + COVID)
    // ----------------------------------------------------
    return {
      alcohol: {
        title: "Alcohol 🍺",
        description: "El abuso del **alcohol** afecta tu rendimiento y salud. Aprender a tomar decisiones responsables es el primer paso.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué es el Alcohol? 🍺",
            content: "El **alcohol** es una sustancia depresora que altera el funcionamiento físico y la toma de decisiones.\n- **Consumo excesivo**: Beber grandes cantidades de alcohol en cortos periodos de tiempo.\n- **Impacto social**: Genera problemas de comunicación, conflictos familiares y baja productividad.\n- **Efectos físicos**: Resaca, deshidratación, alteraciones en el hígado y riesgo de accidentes de tránsito."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Guía de Autocuidado y Consumo Responsable 🍺",
            content: "1. **Aprende a decir que no**: La presión social no debe definir tus decisiones de consumo.\n2. **Alterna con agua**: Si vas a consumir, bebe agua constantemente para hidratarte.\n3. **Nunca conduzcas**: Ten un conductor designado o utiliza un servicio de transporte seguro.\n4. **Evita detonantes**: Si te sientes triste o ansioso, busca hablar con un ser querido en lugar de consumir alcohol."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Opciones de Apoyo 🩺",
            content: "Si consideras que el alcohol interfiere en tu vida diaria:\n- **Consulta de Bienestar**: Acude con un psicólogo o médico general para recibir asesoría inicial.\n- **Grupos de Apoyo**: Participa en reuniones comunitarias de sobriedad y recuperación.\n- **Terapia de Prevención**: Espacios especializados para personas que quieren reducir o eliminar su consumo."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Protocolo ante Intoxicación 🚨",
            content: "Si una persona de tu entorno está excesivamente ebria:\n1. **Posición de seguridad**: Ponla de lado para evitar riesgo de asfixia por vómito.\n2. **No la dejes sola**: Mantente a su lado vigilando que respire con regularidad.\n3. **Llama al 911**: Si pierde la conciencia o su respiración es lenta o inconstante."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      ansiedad: {
        title: "Ansiedad 🧘",
        description: "El ritmo de vida y las preocupaciones pueden detonar **ansiedad**. Conocer herramientas sencillas te ayudará a calmar tu mente.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Entendiendo la Ansiedad 🧘",
            content: "La ansiedad es una respuesta natural de alerta ante situaciones estresantes o de incertidumbre.\n- **Ansiedad Generalizada**: Preocupación constante sobre diversas actividades cotidianas.\n- **Ataque de Pánico**: Episodio repentino de miedo intenso acompañado de síntomas físicos.\n- **Síntomas físicos**: Taquicardia, sudoración, temblores e hiperventilación."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Técnicas de Calma y Estabilidad 🧘",
            content: "1. **Respiración 4-7-8**: Inhala por la nariz en 4 segundos, retén 7 segundos y exhala lentamente en 8 segundos.\n2. **Organiza tu agenda**: Planifica tus pendientes para evitar el estrés acumulativo.\n3. **Pausas activas**: Realiza caminatas cortas o estiramientos para liberar la tensión muscular.\n4. **Disminuye cafeína**: Evita bebidas energéticas y café que sobreestimulan el sistema nervioso."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Ruta de Bienestar Emocional 🩺",
            content: "Si sientes que la ansiedad controla tu rutina:\n- **Terapia Cognitivo-Conductual (TCC)**: Enfoque clínico recomendado para reestructurar pensamientos ansiosos.\n- **Orientación psicológica**: Asesoría y sesiones individuales con profesionales de la salud mental.\n- **Terapia en línea**: Plataformas y recursos virtuales de apoyo psicoterapéutico."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Auxilio ante Crisis de Pánico 🚨",
            content: "Si alguien cercano sufre una crisis de ansiedad aguda:\n1. **Brinda tranquilidad**: Usa un tono de voz suave y di 'estás a salvo, respira a mi ritmo'.\n2. **Llévalo a un lugar tranquilo**: Aléjalo del ruido excesivo o de multitudes.\n3. **Técnica 5-4-3-2-1**: Pídele que nombre 5 objetos a la vista, 4 sonidos, 3 texturas, 2 olores y 1 sabor."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      alimentaria: {
        title: "Conducta Alimentaria 🥗",
        description: "La relación con la comida y la imagen corporal impacta tu salud física y mental. El bienestar va más allá del peso.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Trastornos Alimenticios 🥗",
            content: "- **Anorexia y Bulimia**: Conductas de restricción extrema o atracones y purgas para modificar la figura corporal.\n- **Atracones por Ansiedad**: Ingesta compulsiva de comida para calmar el malestar emocional.\n- **Señales de alerta**: Saltarse comidas recurrentemente, pesarse de forma obsesiva o mostrar culpa excesiva al comer."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Hábitos Saludables y Amor Propio 🥗",
            content: "1. **Alimentación balanceada**: Enfócate en nutrir tu cuerpo en lugar de dietas extremas o restrictivas.\n2. **Redes sociales saludables**: Deja de seguir cuentas que promuevan ideales estéticos irreales.\n3. **Expresa tus sentimientos**: Platica con amigos o familiares si sientes incomodidad con tu cuerpo.\n4. **Cuidado integral**: Recuerda que tu salud mental es tan importante como tu salud física."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo para la Salud Alimenticia 🩺",
            content: "Superar un trastorno alimenticio requiere el apoyo de profesionales:\n- **Equipo Integral**: Terapia conjunta con psicólogos, nutriólogos y médicos generales.\n- **Grupos de Apoyo Mutuo**: Compartir experiencias en entornos seguros y libres de juicios.\n- **Asesoramiento Nutricional**: Rediseñar hábitos de alimentación saludables sin culpabilidad."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Atención ante Señales Críticas 🚨",
            content: "Busca ayuda especializada si notas:\n1. Mareos, debilidad física extrema o desmayos recurrentes.\n2. Vómitos provocados o uso de laxantes recurrentemente.\n3. **Actitud empática**: Ofrece tu apoyo incondicional sin criticar los hábitos ni la figura de la persona."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      depresion: {
        title: "Depresión 😔",
        description: "Sentirse constantemente triste y sin motivación puede ser señal de **depresión**. Conoce cómo recuperar el bienestar.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué es la Depresión? 😔",
            content: "- **Depresión**: Trastorno de salud mental persistente que afecta el estado de ánimo y la energía.\n- **Síntomas**: Desinterés por actividades placenteras, tristeza persistente y deseos de aislamiento.\n- **Consecuencias**: Afecta las relaciones interpersonales, el desempeño laboral y el cuidado personal."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pasos Pequeños en el Día a Día 😔",
            content: "1. **Objetivos pequeños**: Haz una sola tarea sencilla a la vez, celebra tus pequeños logros cotidianos.\n2. **Sal al sol**: Pasa unos minutos al día al aire libre; la luz solar estimula la producción de vitamina D.\n3. **Comunícate**: Platica con alguien de confianza, no te aísles por completo.\n4. **Sé compasivo**: Acepta tus días difíciles y date tiempo para sanar paso a paso."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Tratamiento y Acompañamiento 🩺",
            content: "La depresión tiene tratamiento efectivo y no estás solo:\n- **Psicoterapia**: Espacio seguro para comprender el origen de tus sentimientos y desarrollar herramientas de afrontamiento.\n- **Psiquiatría**: Enfoque clínico especializado en regular la bioquímica cerebral cuando es necesario.\n- **Redes comunitarias**: Talleres y grupos terapéuticos locales."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Apoyar a un Ser Querido 🚨",
            content: "Si sospechas que alguien a tu alrededor tiene depresión:\n1. **Escucha sin aconsejar**: A veces, estar presente y escuchar es más valioso que dar soluciones rápidas.\n2. **Acompáñalo**: Invítalo a realizar actividades sencillas y tranquilas sin forzarlo.\n3. **Facilita la ayuda**: Aliéntalo de forma empática a acudir con un profesional de la salud mental."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      drogas: {
        title: "Drogas 🚫",
        description: "El consumo de sustancias altera tu bienestar y tu futuro. La información científica es tu mejor herramienta preventiva.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Uso de Sustancias y Adicciones 🚫",
            content: "El consumo de drogas afecta el cerebro y altera la capacidad de decidir libremente.\n- **Adicción**: Dependencia compulsiva a una sustancia a pesar de sus daños físicos o emocionales.\n- **Sustancias comunes**: Inhalables, marihuana, estimulantes sintéticos y automedicación sin supervisión.\n- **Impacto**: Pérdida de metas personales, conflictos sociales y problemas graves de salud física."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Prevención y Toma de Decisiones 🚫",
            content: "1. **Busca pasatiempos**: Actividades como el ejercicio, el arte o talleres de aprendizaje liberan dopamina de forma saludable.\n2. **Infórmate bien**: No te dejes llevar por mitos urbanos sobre el consumo seguro.\n3. **Círculo social sano**: Elige rodearte de personas que valoren tu vida y tus proyectos.\n4. **Establece límites**: Di que no con asertividad; defender tus ideales es tu derecho."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Servicios de Tratamiento y Apoyo 🩺",
            content: "Existen opciones profesionales para superar el consumo:\n- **Centros CAPA**: Atención y diagnóstico primario preventivo en adicciones.\n- **Terapia Psicológica**: Aprende técnicas conductuales para manejar el deseo de consumo.\n- **Apoyo Familiar**: Terapia grupal para fortalecer la comunicación y la empatía en el hogar."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Atención ante Crisis por Sustancias 🚨",
            content: "Si presencias una sobredosis o una crisis por consumo:\n1. **Llama al 911**: No esperes, la atención médica inmediata es prioritaria.\n2. **Seguridad física**: Coloca al afectado sobre su costado y asegúrate de que sus vías respiratorias estén despejadas.\n3. **Mantén la calma**: Habla con voz baja y no confrontes a la persona si está alterada."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      suicidio: {
        title: "Riesgo de Suicidio 🆘",
        description: "El dolor y la desesperanza pueden sentirse abrumadores, pero la ayuda está a tu alcance. Siempre hay una alternativa.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Ideación Suicida y Realidad 🆘",
            content: "- **Ideación Suicida**: Pensamientos persistentes relacionados con la muerte como salida a un malestar profundo.\n- **Señales críticas**: Hablar sobre no querer vivir, regalar pertenencias queridas, despedidas inusuales o aislamiento extremo.\n- **Mito común**: 'Quien lo dice no lo hace'. **Realidad**: Toda señal de alerta debe tomarse con absoluta seriedad."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pasos para Proteger tu Vida 🆘",
            content: "1. **Pide ayuda hoy**: Comparte lo que sientes con un familiar, amigo o profesional de confianza.\n2. **Evita el aislamiento**: Mantente en contacto con personas queridas en los momentos de crisis.\n3. **Números a la mano**: Ten registrado en tu teléfono los datos de la Línea de la Vida.\n4. **Limita riesgos**: Deshazte de elementos peligrosos en tu hogar."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Servicios de Intervención en Crisis 🩺",
            content: "Cuentas con redes profesionales para acompañarte:\n- **Intervención Telefónica en Crisis**: Psicólogos disponibles 24/7 de forma gratuita.\n- **Seguimiento Psicológico**: Sesiones continuas para reconstruir tu bienestar emocional.\n- **Atención de Urgencia**: Evaluación prioritaria en hospitales generales y clínicas de salud."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Actuación ante Crisis Inminente 🚨",
            content: "Si alguien te confiesa intenciones de atentar contra su vida:\n1. **No le dejes solo**: Permanece con él o ella en todo momento.\n2. **Escucha con empatía**: Evita sermones o juicios morales sobre su sentir.\n3. **Llama al 911**: O acompáñalo al centro de salud u hospital más cercano de inmediato."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      tabaco: {
        title: "Tabaco 🚬",
        description: "El consumo de **tabaco** daña tus pulmones y sistema cardiovascular. Dejar de fumar reduce significativamente los riesgos de salud.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "El Tabaquismo y sus Riesgos 🚬",
            content: "El **tabaco** es una planta que contiene nicotina, un compuesto altamente adictivo.\n- **Riesgo asociado**: Los fumadores tienen mayor probabilidad de desarrollar síntomas graves en infecciones respiratorias como el COVID-19.\n- **Vapeadores**: El uso de cigarrillos electrónicos daña el tejido pulmonar y contiene sustancias químicas tóxicas.\n- **Impacto**: Disminuye la capacidad pulmonar, afecta la condición física y deteriora la salud bucal."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Consejos para Dejar el Tabaco 🚬",
            content: "1. **Planifica tu salida**: Elige un día para dejar de fumar y deshazte de encendedores, cajetillas y ceniceros.\n2. **Cambia tus hábitos**: Sustituye el cigarro por actividades saludables como caminar, beber agua o practicar pasatiempos.\n3. **Maneja el antojo**: Espera 10 minutos cuando sientas el impulso; la intensidad de la ansiedad suele disminuir.\n4. **Apóyate en otros**: Comparte tu decisión con amigos y familiares para recibir aliento."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo para la Cesación 🩺",
            content: "Existen recursos y profesionales listos para acompañarte en este proceso:\n- **Líneas de ayuda**: Llama a la Línea de la Vida para recibir orientación especializada en adicciones.\n- **Tratamiento conductual**: Terapia para romper la dependencia psicológica al cigarrillo.\n- **Apoyo médico**: Consulta alternativas médicas seguras y sustitutos de nicotina bajo supervisión profesional."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Prevención de Recaídas 🚨",
            content: "Ante la tentación de volver a fumar:\n1. **Identifica disparadores**: Mantente alerta ante situaciones de estrés o reuniones sociales donde acostumbrabas fumar.\n2. **Busca alternativas inmediatas**: Respira profundo y recuerda tus motivos de salud para dejarlo.\n3. **No te rindas**: Si tienes un desliz, no te desanimes y retoma el control de tu abstinencia de inmediato."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      covid: {
        title: "COVID-19 🦠",
        description: "La pandemia de **COVID-19** cambió nuestras vidas y puede haber afectado tu **salud mental**. Conocer sus efectos y formas de cuidado te ayudará a sentirte más seguro.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Entendiendo el COVID-19 🦠",
            content: "El **COVID-19** es una enfermedad respiratoria causada por el virus SARS-CoV-2.\n- **Efecto en salud mental**: El aislamiento prolongado, el miedo al contagio y las pérdidas de seres queridos han incrementado casos de ansiedad y depresión.\n- **Síntomas comunes**: Fiebre, tos seca, cansancio extremo, dolor de garganta y pérdida de gusto u olfato.\n- **Prevención**: Lavado frecuente de manos, ventilación de espacios y mantener el esquema de vacunación al día."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Recomendaciones de Cuidado Físico y Mental 🦠",
            content: "1. **Mantente informado de forma sana**: Consume noticias de fuentes oficiales y evita el exceso de contenidos alarmistas.\n2. **Establece rutinas estables**: Mantener horarios de sueño, comida y esparcimiento favorece la salud emocional.\n3. **Mantén contacto social**: Utiliza llamadas o videollamadas con tus seres queridos para mitigar los sentimientos de soledad.\n4. **Práctica la meditación**: Dedica unos minutos al día a ejercicios de relajación o yoga."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Asistencia Médica y Emocional 🩺",
            content: "Si experimentas síntomas físicos o emocionales relacionados con el COVID-19:\n- **Atención Médica**: Acude a tu centro de salud o llama a las líneas epidemiológicas ante sospecha de contagio.\n- **Apoyo Psicológico**: Busca terapia para procesar duelos, pérdidas y el impacto emocional del confinamiento.\n- **Seguimiento**: Monitorea de cerca la fatiga o secuelas de salud que persistan después de la infección."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Protocolo ante Sospecha de Contagio 🚨",
            content: "Si presentas síntomas de contagio o tuviste contacto estrecho con un caso confirmado:\n1. **Aíslese**: Mantente en una habitación ventilada y evita el contacto con las personas en tu hogar.\n2. **Vigila la oxigenación**: Mide la saturación de oxígeno con un oxímetro de forma regular.\n3. **Busca atención médica inmediata**: Si presentas dificultad respiratoria, dolor persistente en el pecho o fiebre incontrolable."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Contacto de Emergencia 📞",
            content: supportLine
          }
        ]
      },
      proyecto: {
        title: "Sobre el Proyecto ℹ️",
        description: "**Mente Conecta** es una iniciativa diseñada para proteger el bienestar emocional de toda la comunidad, brindando herramientas de apoyo.",
        sections: [
          {
            id: "def",
            label: "¿Qué es Mente Conecta? 📖",
            title: "Sobre Mente Conecta ℹ️",
            content: "**Mente Conecta** es tu aliado digital en salud mental. Ofrecemos información clara y con validez científica sobre los principales retos emocionales en el día a día."
          },
          {
            id: "mision",
            label: "Nuestra Misión 🎯",
            title: "Misión del Proyecto 🎯",
            content: "Promover el bienestar emocional eliminando estigmas en salud mental y facilitando herramientas y recursos prácticos de apoyo."
          },
          {
            id: "ayuda",
            label: "¿Cómo te ayudamos? ✨",
            title: "Recursos para Ti ✨",
            content: "Te facilitamos:\n- **Guías de Autocuidado** y manejo del estrés.\n- **Protocolos de Emergencia** ante crisis emocionales.\n- **Directorio de Apoyo** con líneas gratuitas 24/7."
          },
          {
            id: "valores",
            label: "Nuestros Valores ❤️",
            title: "Compromiso y Confidencialidad ❤️",
            content: "1. **Empatía**: Entendemos las dificultades emocionales.\n2. **Privacidad**: Tu búsqueda de información es segura y confidencial.\n3. **Cientificidad**: Información sustentada y validada por profesionales."
          }
        ]
      }
    };
  }

  if (type === 3) {
    // ----------------------------------------------------
    // 3. MENTE CONECTA - ADICCIONES (Centros / Grupos AA)
    // ----------------------------------------------------
    return {
      alcohol: {
        title: "Alcohol 🍺",
        description: "El abuso del **alcohol** es una enfermedad crónica que afecta el cerebro. La recuperación integral en grupo es un camino de sanación.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Alcoholismo y Dependencia 🍺",
            content: "El alcoholismo es una dependencia física y psicológica de las bebidas con alcohol, clasificada como una enfermedad del sistema nervioso.\n- **Pérdida de control**: Dificultad para detener el consumo una vez iniciado.\n- **Síndrome de abstinencia**: Malestar físico y temblores al suspender el consumo de alcohol repentinamente.\n- **Impacto social**: Pérdida de relaciones de confianza, problemas laborales y conflictos con la ley."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pautas para el Proceso de Sobriedad 🍺",
            content: "1. **Evita la primera copa**: La abstinencia total es la base de la recuperación en personas con dependencia.\n2. **Identifica detonantes**: Mantente alerta ante emociones intensas como ira, soledad, cansancio o tristeza.\n3. **Asiste a tus grupos**: La constancia en tus reuniones grupales refuerza tu compromiso de sobriedad.\n4. **Rediseña tu red de apoyo**: Comparte tu proceso con personas que no consuman alcohol."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Atención Especializada y Grupos 🩺",
            content: "Cuentas con una amplia red de apoyo para consolidar tu recuperación:\n- **Grupos de Alcohólicos Anónimos (AA)**: Sesiones diarias basadas en el programa de los 12 pasos.\n- **Centros Psiquiátricos y Clínicas**: Tratamientos médicos para tratar la adicción y trastornos asociados (patología dual).\n- **Terapia de Reinserción**: Sesiones destinadas a reintegrarte a tu entorno familiar y productivo."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Protocolo ante Crisis de Abstinencia o Recaída 🚨",
            content: "Si tú o un compañero de grupo sufre una crisis de abstinencia severa (delirium tremens):\n1. **Busca atención médica de urgencia**: Esta condición médica requiere hospitalización inmediata.\n2. **Mantén la seguridad**: Protege al paciente de posibles caídas o golpes.\n3. **Acompañamiento sin juzgar**: Ante un desliz o recaída, alienta a la persona a retomar sus terapias y grupos de inmediato."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo y Contacto 📞",
            content: supportLine
          }
        ]
      },
      ansiedad: {
        title: "Ansiedad 🧘",
        description: "En la desintoxicación y recuperación, la **ansiedad** es un síntoma frecuente. Conoce técnicas para manejarla de forma saludable.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Ansiedad en el Proceso de Recuperación 🧘",
            content: "La ansiedad suele presentarse con fuerza al abandonar el consumo de sustancias, como respuesta adaptativa de la bioquímica del cerebro.\n- **Ansiedad por consumo (Craving)**: Deseo imperioso de consumir para calmar el malestar.\n- **Síntomas físicos**: Taquicardia, sudoración fría, insomnio de conciliación e irritabilidad severa.\n- **Relación con adicciones**: Un manejo inadecuado de la ansiedad incrementa significativamente el riesgo de recaídas."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Manejo Clínico de la Ansiedad y Craving 🧘",
            content: "1. **Técnica de Aceptación**: Reconoce el deseo de consumo sin pelear con él; recuerda que es temporal y pasará.\n2. **Respiración consciente**: Realiza inhalaciones y exhalaciones lentas para disminuir el pulso cardíaco.\n3. **Actividad física estructurada**: Realiza ejercicio diario para liberar energía y mejorar el estado anímico.\n4. **Evita la automedicación**: No consumas tranquilizantes sin prescripción estricta de tu psiquiatra."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo en Salud Mental 🩺",
            content: "Para canalizar la ansiedad del proceso de recuperación:\n- **Terapia Cognitivo-Conductual**: Fundamental para aprender a afrontar situaciones estresantes sin consumir.\n- **Atención Psiquiátrica Especializada**: Tratamiento médico para regular los neurotransmisores de forma segura.\n- **Meditación y Mindfulness**: Talleres y prácticas orientadas a regular el sistema nervioso."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Protocolo de Contención de Ansiedad Aguda 🚨",
            content: "Si experimentas un nivel extremo de ansiedad que pone en riesgo tu sobriedad:\n1. **Llama a tu padrino o terapeuta**: Habla de inmediato sobre lo que sientes.\n2. **Cambia de ambiente**: Retírate del lugar o situación estresante de forma inmediata.\n3. **Acude a tu grupo u hospital**: Busca refugio en tu centro de rehabilitación o grupo de ayuda."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo y Contacto 📞",
            content: supportLine
          }
        ]
      },
      alimentaria: {
        title: "Conducta Alimentaria 🥗",
        description: "En los procesos de rehabilitación, recuperar hábitos alimenticios saludables es clave para restaurar el daño orgánico provocado por las adicciones.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Alimentación y Recuperación Orgánica 🥗",
            content: "Las adicciones a menudo conducen a la desnutrición, deshidratación y alteraciones del apetito.\n- **Malnutrición**: Carencia de nutrientes esenciales debido a la prioridad que tenía el consumo.\n- **Ansiedad por la comida**: Sustituir la adicción química por una conducta de atracones alimenticios.\n- **Importancia**: Una dieta equilibrada repara el daño en órganos y mejora el estado de ánimo."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Establecimiento de Hábitos Nutricionales 🥗",
            content: "1. **Horarios fijos**: Establece rutinas para tus tres comidas principales y colaciones para estabilizar la glucosa en sangre.\n2. **Nutrientes esenciales**: Consume proteínas, frutas y vegetales que apoyen la reconstrucción del tejido celular.\n3. **Hidratación constante**: Bebe agua natural a lo largo del día para desintoxicar los riñones.\n4. **Evita el azúcar refinado en exceso**: Su abuso genera picos de energía que pueden emular el deseo de sustancias estimulantes."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Nutrición en Centros de Rehabilitación 🩺",
            content: "El cuidado alimentario en la recuperación cuenta con las siguientes guías:\n- **Consulta de Nutrición**: Asesoría personalizada por un nutriólogo especializado en recuperación de adicciones.\n- **Suplementación médica**: De ser requerida, bajo supervisión para subsanar deficiencias vitamínicas.\n- **Talleres de Cocina Saludable**: Espacios para aprender a preparar alimentos benéficos."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Señales de Alerta de Desequilibrio 🚨",
            content: "Solicita apoyo de tu médico o terapeuta si detectas:\n1. Rechazo constante a ingerir alimentos o dolor abdominal agudo persistente.\n2. Conductas de ingesta descontrolada y culpa posterior extrema.\n3. **Ambiente positivo**: Fomenta que las comidas del grupo sean tranquilas, amenas y de sana convivencia."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo y Contacto 📞",
            content: supportLine
          }
        ]
      },
      depresion: {
        title: "Depresión 😔",
        description: "La **depresión** y las adicciones están estrechamente vinculadas (trastorno dual). La rehabilitación integral trata ambos aspectos.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Depresión y Patología Dual 😔",
            content: "La patología dual es la coexistencia de una adicción con otro trastorno mental, frecuentemente la depresión.\n- **Círculo vicioso**: Consumir sustancias para 'aliviar' la depresión agrava los síntomas a mediano plazo.\n- **Síntomas**: Sentimientos severos de culpa, desesperanza, falta de energía y pensamientos recurrentes de muerte.\n- **Desafío**: Tratar únicamente la adicción sin abordar la depresión incrementa la posibilidad de una recaída."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Estrategias de Afrontamiento en la Depresión 😔",
            content: "1. **Asiste a tus terapias**: No faltes a tus citas psicológicas aunque sientas desinterés o falta de energía.\n2. **Expresa tu sentir en grupo**: Hablar de tu tristeza con compañeros de recuperación te ayuda a liberar la carga.\n3. **Rutinas mínimas**: Mantén el autocuidado básico (bañarse, comer, ordenar tu espacio) como metas diarias.\n4. **Valora tu esfuerzo**: Reconoce cada día de sobriedad como un logro inmenso en tu vida."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Tratamiento Integral Psiquiátrico 🩺",
            content: "El abordaje de la depresión dual requiere atención médica formal:\n- **Terapia Psicológica Especializada**: Enfoques dirigidos al tratamiento simultáneo de adicciones y depresión.\n- **Evaluación Farmacológica**: Medicación antidepresiva no adictiva recetada y controlada por un psiquiatra.\n- **Grupos de Apoyo Dual**: Comunidades específicas para personas que manejan un diagnóstico dual."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Contención ante Crisis Depresivas 🚨",
            content: "Si experimentas un decaimiento emocional extremo con pensamientos de tirar la toalla:\n1. **Comunícalo de inmediato**: Llama a tu terapeuta, padrino o línea de crisis.\n2. **Acompañamiento cercano**: Pide a un compañero o familiar que te acompañe durante las próximas horas.\n3. **Acude a Urgencias**: En caso de ideación suicida activa, dirígete de inmediato al hospital psiquiátrico u hospital general."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo y Contacto 📞",
            content: supportLine
          }
        ]
      },
      drogas: {
        title: "Drogas 🚫",
        description: "La adicción a **drogas** es una afección médica tratable. Los centros de rehabilitación y grupos ofrecen las herramientas para reconstruir tu vida.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Trastornos por Consumo de Sustancias 🚫",
            content: "Enfermedades cerebrales caracterizadas por la necesidad irrefrenable de consumir sustancias, deteriorando el autocontrol y la salud.\n- **Neuroadaptación**: Modificación en los circuitos de recompensa del cerebro por exposición a drogas.\n- **Sustancias comunes**: Inhalantes, estimulantes (metanfetamina), opiáceos, marihuana y fármacos controlados.\n- **Recuperación**: Proceso continuo de cambio orientado a recuperar el bienestar integral."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pilares para la Prevención de Recaídas 🚫",
            content: "1. **Plan de Acción diario**: Diseña un día estructurado con actividades específicas para evitar el ocio prolongado.\n2. **Evita personas y lugares de riesgo**: Mantente alejado de círculos y entornos vinculados al consumo anterior.\n3. **Aprende del Craving**: Comprende que los deseos de consumir son picos de ansiedad pasajeros y no durarán siempre.\n4. **Asertividad en crisis**: Utiliza técnicas de distracción y llama de inmediato a tu red de apoyo."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Recursos de Rehabilitación 🩺",
            content: "Apoyos para fortalecer tu camino libre de drogas:\n- **Centros de Tratamiento Residencial**: Internamiento voluntario en clínicas autorizadas para desintoxicación y terapia.\n- **Consulta Externa Especializada**: Terapias individuales y familiares en UNEME-CAPA.\n- **Grupos de Apoyo de 12 Pasos**: Comunidades de ayuda mutua como Neuróticos Anónimos o Narcóticos Anónimos."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Actuación ante Deslices o Sobredosis 🚨",
            content: "Si se presenta un caso de sobredosis en tu entorno:\n1. **Llama al 911 de inmediato**: La intervención médica rápida es crítica para salvar vidas.\n2. **Acompañamiento seguro**: Coloca a la persona de lado y mantén libres sus vías respiratorias; no le des comida ni bebidas.\n3. **Reinserción empática**: Si tuviste un desliz, regresa de inmediato con tu terapeuta o grupo; un error no anula tus esfuerzos previos."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo y Contacto 📞",
            content: supportLine
          }
        ]
      },
      suicidio: {
        title: "Riesgo de Suicidio 🆘",
        description: "El dolor severo puede nublar el panorama. En los grupos y centros psiquiátricos entendemos tu dolor y queremos acompañarte.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Conducta Suicida y Factores de Riesgo 🆘",
            content: "El suicidio es un problema de salud pública prevenible que suele estar asociado a trastornos afectivos, dolores profundos o adicciones graves.\n- **Ideación y Planificación**: Pensamientos constantes sobre acabar con la vida o estructurar un método para hacerlo.\n- **Consumo de sustancias como detonante**: El abuso de alcohol o drogas disminuye el autocontrol, incrementando la impulsividad y el riesgo suicida.\n- **Importancia**: La detección de estas ideas en el tratamiento residencial es prioritaria."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Acciones de Seguridad Personal 🆘",
            content: "1. **Comunica tus ideas hoy**: Si tienes pensamientos de muerte, exprésalos de inmediato a tu terapeuta u orientador de tu centro.\n2. **Contrato de seguridad**: Firma un compromiso verbal o escrito con tu terapeuta de no dañarte y pedir ayuda ante la crisis.\n3. **Círculo seguro**: No pases momentos de desesperanza a solas; mantente en las áreas comunes del centro o con familiares.\n4. **Sigue las indicaciones**: Toma tus tratamientos recomendados al pie de la letra."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo en Crisis y Psiquiatría 🩺",
            content: "Recursos clínicos especializados listos para brindarte ayuda:\n- **Urgencias Psiquiátricas**: Centros hospitalarios con guardias activas para contención de crisis.\n- **Terapia Dialéctica Conductual (DBT)**: Enfoque clínico de alta efectividad para regular emociones intensas.\n- **Monitoreo de Seguridad**: Seguimiento estrecho en centros residenciales para resguardar la vida del paciente."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Intervención de Emergencia en el Centro/Grupo 🚨",
            content: "Si detectas que un compañero del grupo o paciente tiene intenciones inminentes de dañarse:\n1. **Avisa de inmediato al personal**: Reporta la situación a los terapeutas, médicos o encargados de guardia.\n2. **Acompañamiento sin juicios**: Quédate con la persona y demuéstrale empatía y preocupación genuina por su vida.\n3. **Emergencias**: Llama de inmediato al **911** si la persona cuenta con un método activo para dañarse."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo y Contacto 📞",
            content: supportLine
          }
        ]
      },
      tabaco: {
        title: "Tabaco 🚬",
        description: "La nicotina es una sustancia altamente adictiva que suele ser la puerta de entrada a otros consumos. Abordar el tabaquismo consolida tu sobriedad.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Tabaquismo y Adicción a la Nicotina 🚬",
            content: "El **tabaquismo** es la adicción crónica a la nicotina, caracterizada por un fuerte deseo de consumir y dificultades para dejarlo.\n- **Nicotina**: Estimulante del sistema nervioso que genera liberación temporal de dopamina, provocando una rápida dependencia.\n- **Vapeadores**: El uso de cigarrillos electrónicos perpetúa la adicción e introduce sustancias altamente tóxicas a los pulmones.\n- **Comorbilidad**: Frecuentemente, el consumo de tabaco se utiliza como 'ansiolítico' ante la abstinencia de otras drogas, lo cual entorpece la recuperación pulmonar y neuronal."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Estrategias para Dejar el Tabaco en la Recuperación 🚬",
            content: "1. **Compromiso total**: Integra la renuncia al tabaco dentro de tus objetivos de sobriedad general.\n2. **Evita la sustitución**: No intentes calmar el deseo de otras sustancias fumando en exceso; busca técnicas de respiración.\n3. **Manejo del antojo**: Cuando sientas deseos de fumar, bebe un vaso de agua, realiza ejercicio o habla con un compañero.\n4. **Limpia tus espacios**: Deshazte de cajetillas y encendedores de tu habitación y áreas comunes."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Tratamiento Clínico de Tabaquismo 🩺",
            content: "La cesación tabáquica cuenta con valiosas herramientas:\n- **Clínicas especializadas de tabaquismo**: Tratamientos clínicos enfocados en adicción a la nicotina.\n- **Terapia Cognitivo-Conductual**: Técnica efectiva para rediseñar hábitos y afrontar el craving por nicotina.\n- **Apoyo Farmacológico Especializado**: Parches de nicotina, chicles o fármacos bajo estricta indicación psiquiátrica."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Contención ante Antojo Severo y Recaídas 🚨",
            content: "Si sientes un deseo incontrolable por encender un cigarrillo:\n1. **Aplaza la conducta**: Espera y respira profundo; recuerda que la intensidad del antojo dura apenas unos minutos.\n2. **Habla en tus terapias**: Comparte con tu terapeuta o en tus grupos que estás batallando con el deseo del tabaco.\n3. **Persevera**: Si tienes un tropiezo, no lo veas como un fracaso total de tu sobriedad; reanuda tu abstinencia de inmediato."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo y Contacto 📞",
            content: supportLine
          }
        ]
      },
      proyecto: {
        title: "Sobre el Proyecto ℹ️",
        description: "**Mente Conecta - Adicciones** ofrece herramientas y orientación para la recuperación integral en centros y grupos de ayuda mutua.",
        sections: [
          {
            id: "def",
            label: "¿Qué es Mente Conecta - Adicciones? 📖",
            title: "Sobre Mente Conecta - Adicciones ℹ️",
            content: "**Mente Conecta - Adicciones** es una plataforma digital de salud mental enfocada en brindar directrices, protocolos preventivos y herramientas de contención psicológica a pacientes en procesos de rehabilitación y miembros de grupos de apoyo."
          },
          {
            id: "mision",
            label: "Nuestra Misión 🎯",
            title: "Misión del Proyecto 🎯",
            content: "Acompañar a las personas en su proceso de sobriedad y rehabilitación integral, facilitando el acceso a información científica y desmitificando el tratamiento de las adicciones."
          },
          {
            id: "ayuda",
            label: "¿Cómo te ayudamos? ✨",
            title: "Apoyo en tu Proceso ✨",
            content: "Ponemos a tu alcance:\n- **Guías de contención** ante ansiedad y craving.\n- **Protocolos de emergencia** por sobredosis y crisis suicidas.\n- **Directorio de atención** y grupos de ayuda de 12 pasos."
          },
          {
            id: "valores",
            label: "Nuestros Valores ❤️",
            title: "Principios de Acompañamiento ❤️",
            content: "1. **Comprensión**: Entendemos la adicción como una enfermedad tratable.\n2. **Confidencialidad**: Resguardamos tu privacidad en tu búsqueda de bienestar.\n3. **Fraternidad**: Creemos firmemente en el valor de la ayuda mutua y el trabajo en grupo."
          }
        ]
      }
    };
  }

  if (type === 4) {
    // ----------------------------------------------------
    // 4. MENTE CONECTA - SEP (Secundaria)
    // ----------------------------------------------------
    return {
      alcohol: {
        title: "Alcohol 🍺",
        description: "Beber alcohol daña tu cerebro que aún está creciendo. No necesitas tomar para divertirte o encajar con tus amigos.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué onda con el Alcohol? 🍺",
            content: "El **alcohol** es una sustancia que hace que tu cerebro funcione más lento, afectando tus reflejos y tus decisiones.\n- **Consumo en menores de edad**: Es muy peligroso porque tu cerebro aún se está desarrollando y el alcohol lo daña más fácil.\n- **Problemas en la escuela**: Beber te hace poner menos atención, olvidar las cosas y bajar tus calificaciones.\n- **Peligros**: Puedes sufrir accidentes, caídas o meterte en problemas graves."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Consejos para Decir que No 🍺",
            content: "1. **Sé tú mismo**: Si tus amigos te presionan para tomar, diles: 'No gracias, prefiero divertirme así'. Un amigo de verdad te respetará.\n2. **Diviértete sano**: Hay muchísimas formas de pasarla chido sin alcohol: deportes, videojuegos, música o salir a pasear.\n3. **Cuida tus salidas**: Si vas a una fiesta, asegúrate de saber cómo vas a regresar a casa y nunca te subas con alguien que tomó.\n4. **Habla con tus papás o profes**: Si te sientes presionado, cuéntaselo a un adulto de confianza."
          },
          {
            id: "asist",
            label: "Asistencia y Orientación 🩺",
            title: "Lugares donde te Ayudan 🩺",
            content: "Si sientes curiosidad o crees que el alcohol te está trayendo problemas:\n- **Orientación Escolar**: Acércate al orientador, psicólogo o al profe que le tengas más confianza en tu secundaria.\n- **Centros CAPA**: Son lugares del gobierno donde te ayudan de forma gratuita y platican contigo de manera privada.\n- **Líneas de ayuda**: Puedes llamar o mandar mensaje y psicólogos expertos te escucharán con atención."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Qué Hacer si un Amigo Tomó de Más 🚨",
            content: "Si un compañero de la secundaria tomó de más y se siente mal:\n1. **Avisa a un adulto**: No trates de ocultarlo por miedo a meterte en problemas; la salud de tu amigo es lo primero.\n2. **No lo dejes solo**: Si está acostado, ponlo de lado para que no se ahogue si llega a vomitar.\n3. **Llama al 911**: Si no responde, se desmaya o no puede respirar bien."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Números de Ayuda 📞",
            content: supportLine
          }
        ]
      },
      ansiedad: {
        title: "Ansiedad 🧘",
        description: "El estrés por los exámenes, las tareas y los cambios de la adolescencia pueden darte **ansiedad**. Aprende a relajarte.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué es la Ansiedad? 🧘",
            content: "La ansiedad es como una alarma que se enciende en tu cuerpo cuando sientes mucho miedo, nervios o estrés.\n- **Nervios por exámenes**: Sentirte tan presionado que te bloqueas en un examen y olvidas lo que estudiaste.\n- **Ansiedad Social**: Miedo extremo a hablar en público, exponer en clase o que tus compañeros se burlen de ti.\n- **Síntomas**: Sentir que el corazón te late rapidísimo, que te falta el aire, sudor en las manos o dolor de estómago."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Tips para Calmarte en la Escuela 🧘",
            content: "1. **Respira hondo**: Respira lento por la nariz contando hasta 4, aguanta el aire y sácalo despacio por la boca.\n2. **Organízate**: Apunta tus tareas en una libreta para que no se te junten todas al final.\n3. **Duerme bien**: Apaga tu celular temprano; dormir te ayuda a que tu cerebro descanse y no esté estresado.\n4. **Evita el café y bebidas energéticas**: Estos refrescos o bebidas hacen que te pongas más nervioso."
          },
          {
            id: "asist",
            label: "Asistencia y Orientación 🩺",
            title: "Apoyo en tu Secundaria 🩺",
            content: "Si sientes que la ansiedad es muy fuerte y te impide disfrutar de tus días:\n- **Habla con Orientación**: En tu secundaria hay personal de psicopedagogía u orientación escolar listos para escucharte.\n- **Platica con tus padres**: Ellos te pueden llevar con un psicólogo que te enseñará juegos y técnicas para relajarte.\n- **Actividades de relajación**: Practica algún deporte o dibuja para distraer tu mente."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Ayudar a un Compañero Nervioso 🚨",
            content: "Si ves que un compañero tiene una crisis de ansiedad en el salón o patio:\n1. **Quédate a su lado**: Dile cosas bonitas con voz suave: 'Respira conmigo, todo va a estar bien, estoy aquí contigo'.\n2. **Llévalo a un lugar tranquilo**: Aléjalo del ruido de la clase o del patio.\n3. **Avisa a un maestro**: Ve con el profe más cercano para que les ayude a controlar la situación."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Números de Ayuda 📞",
            content: supportLine
          }
        ]
      },
      alimentaria: {
        title: "Conducta Alimentaria 🥗",
        description: "A veces nos preocupamos mucho por cómo nos vemos o lo que comemos. Aprende a querer tu cuerpo tal como es.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Tu Imagen Corporal y la Comida 🥗",
            content: "Es la forma en que ves tu cuerpo. A veces, las redes sociales nos hacen creer que debemos ser perfectos, pero eso no es real.\n- **Trastornos alimenticios**: Problemas graves donde las personas dejan de comer (anorexia) o comen y luego se provocan el vómito (bulimia) por miedo a subir de peso.\n- **Atracones**: Comer muchísimo de forma rápida porque te sientes triste, aburrido o estresado.\n- **Señales**: Sentirte muy culpable después de comer o compararte todo el tiempo con los demás."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Amando tu Cuerpo 🥗",
            content: "1. **Aliméntate chido**: Tu cuerpo está creciendo y necesita energía de frutas, verduras y comida sana para estudiar y jugar.\n2. **Cuidado con las redes**: Muchas fotos que ves en internet tienen filtros. No te compares con fotos falsas.\n3. **Habla de tus dudas**: Si te sientes mal con tu cuerpo, platícalo con tu mamá, papá o un orientador de la escuela.\n4. **Valórate**: Eres valioso por tu forma de ser, tus chistes y tu inteligencia, no por tu peso."
          },
          {
            id: "asist",
            label: "Asistencia y Orientación 🩺",
            title: "Orientación en Salud 🩺",
            content: "Si sientes que la comida o tu peso te causan mucha tristeza:\n- **Apoyo Escolar**: Acércate a tus profesores o al área médica de la secundaria para recibir consejos.\n- **Psicólogo y Nutriólogo**: Con ayuda de tus papás, pueden ir con especialistas que te enseñarán a comer rico y sano.\n- **Comunícate**: Compartir tus dudas con tu familia te hará sentir mucho más aliviado."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cuándo Preocuparte por un Amigo 🚨",
            content: "Si notas que un amigo de la escuela:\n1. Nunca quiere comer en el recreo y siempre dice que ya comió en su casa.\n2. Va al baño corriendo justo después de comer.\n3. Se ve muy débil, se marea en educación física o se desmaya.\n4. **Sé buen amigo**: No te burles de su aspecto, dile que te preocupa su salud y que busque ayuda."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Números de Ayuda 📞",
            content: supportLine
          }
        ]
      },
      depresion: {
        title: "Depresión 😔",
        description: "Sentirse triste de vez en cuando es normal, pero si la tristeza dura semanas y ya no te divierte nada, platícalo con alguien.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué es la Depresión en Jóvenes? 😔",
            content: "La depresión es una tristeza muy profunda y larga que no te deja hacer tus actividades de todos los días.\n- **Desinterés**: Sentir que ya nada te gusta, ni tus videojuegos favoritos, ni salir a jugar con tus amigos.\n- **Fatiga**: Estar muy cansado todo el día, tener muchas ganas de llorar o dormir demasiado.\n- **Aislamiento**: Preferir quedarte encerrado en tu cuarto en lugar de convivir con tu familia o amigos de la secundaria."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pasos Sencillos para Sentirte Mejor 😔",
            content: "1. **Empieza con algo chico**: Tiende tu cama, báñate o dibuja un ratito. Las tareas pequeñas te ayudan a activarte.\n2. **Platica con un amigo**: Aunque no tengas ganas de salir, mándale un mensaje a tu mejor amigo de la escuela.\n3. **Sal a caminar**: Toma aire fresco en el patio o en un parque cercano; la luz del día ayuda a tu cerebro.\n4. **No te guardes todo**: Llorar está bien, pero platicar lo que sientes con un adulto te ayudará a encontrar soluciones."
          },
          {
            id: "asist",
            label: "Asistencia y Orientación 🩺",
            title: "Encontrando Apoyo 🩺",
            content: "La depresión se puede superar con ayuda:\n- **Tutor escolar u Orientador**: Están entrenados para escucharte y ayudarte con los problemas escolares y familiares.\n- **Terapia psicológica**: Con el apoyo de tus tutores, ir al psicólogo te ayudará a entender tus emociones.\n- **Actividades extracurriculares**: Talleres de arte, música o deportes te ayudan a despejar la mente."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Apoyar a tu Amigo Triste 🚨",
            content: "Si ves a un amigo de tu salón que está pasando por un momento muy difícil:\n1. **Escúchalo**: No le digas 'no estés triste', solo dile 'aquí estoy para lo que necesites'.\n2. **Invítalo**: Invítalo a sentarse contigo en el recreo o a hacer la tarea juntos, sin presionarlo.\n3. **Avisa**: Si tu amigo dice cosas como que 'la vida no vale la pena', avísale de inmediato a un maestro o director."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Números de Ayuda 📞",
            content: supportLine
          }
        ]
      },
      drogas: {
        title: "Drogas 🚫",
        description: "Las drogas dañan tu cuerpo y pueden arruinar tus planes de vida. Aprende a tomar decisiones seguras.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué son las Drogas? 🚫",
            content: "Son sustancias que cambian la forma en que funciona tu cerebro y cuerpo, creando adicción fácilmente.\n- **Adicción**: Cuando el cerebro se acostumbra tanto a la sustancia que siente que la necesita para estar bien.\n- **Vapeadores y cigarros**: Mucha gente cree que los 'vapes' de sabores no hacen daño, pero tienen nicotina y químicos tóxicos.\n- **Efectos**: Pérdida de memoria, problemas para aprender en la secundaria y cambios feos en tu humor."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Diciendo No con Inteligencia 🚫",
            content: "1. **Busca pasatiempos**: El deporte, la música, bailar o el dibujo son formas geniales de divertirte y liberar energía.\n2. **Infórmate bien**: No le creas a quienes te dicen que 'no pasa nada' o que se siente 'chido'. Investiga los riesgos reales.\n3. **Elige buenos amigos**: Rodéate de compañeros que respeten tus metas y no te presionen a hacer tonterías.\n4. **Pon límites**: Decir 'no quiero' demuestra que eres fuerte y que controlas tu propia vida."
          },
          {
            id: "asist",
            label: "Asistencia y Orientación 🩺",
            title: "Lugares de Apoyo Escolar 🩺",
            content: "Si tienes dudas o conoces a alguien con problemas de adicciones:\n- **Orientación Familiar**: Cuéntale a tus papás o tutores para buscar apoyo juntos.\n- **Atención CAPA**: Centros de salud gratuitos que ayudan a adolescentes con pláticas privadas de prevención.\n- **Talleres Juveniles**: Espacios culturales y deportivos en tu comunidad."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Qué Hacer ante una Emergencia por Consumo 🚨",
            content: "Si un compañero de la secundaria se puso mal por consumir alguna sustancia:\n1. **Pide ayuda a un adulto rápido**: No te quedes callado por miedo al castigo escolar. Salvar su vida es lo principal.\n2. **Ponlo a salvo**: Mantén a tu amigo en un lugar ventilado y no lo dejes solo.\n3. **Llama al 911**: Si no reacciona, se desmaya o tiene problemas para respirar."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Números de Ayuda 📞",
            content: supportLine
          }
        ]
      },
      suicidio: {
        title: "Riesgo de Suicidio 🆘",
        description: "Si sientes que tus problemas no tienen solución y te sientes desesperado, recuerda que hay personas que te queremos ayudar.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Hablemos con la Verdad 🆘",
            content: "A veces, las presiones de la escuela o problemas en casa nos hacen sentir que ya no podemos más.\n- **Pensamientos de muerte**: Sentirse tan triste que piensas en querer desaparecer o hacerte daño.\n- **Mito**: 'Hablar de esto es malo'. **Realidad**: Platicarlo con alguien de confianza libera la tristeza y te permite encontrar ayuda.\n- **Recuerda**: Los problemas de la secundaria y familiares tienen solución. Tu vida es súper valiosa."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pasos para Sentirte a Salvo 🆘",
            content: "1. **Busca a un adulto hoy**: Cuéntale a tus papás, a un profesor de la secundaria o al orientador escolar cómo te sientes.\n2. **No te aisles**: Quédate cerca de tus amigos o familiares cuando te sientas muy triste.\n3. **Guarda los números de ayuda**: Ten el teléfono de la Línea de la Vida en tus contactos.\n4. **Sé paciente contigo**: Las cosas van a mejorar, date la oportunidad de recibir ayuda."
          },
          {
            id: "asist",
            label: "Asistencia y Orientación 🩺",
            title: "Apoyo Inmediato 🩺",
            content: "Hay muchas personas listas para apoyarte en momentos difíciles:\n- **Orientadores de Secundaria**: Profesionales capacitados para ayudarte a manejar tus crisis emocionales.\n- **Líneas telefónicas de crisis**: Atendidas por psicólogos que no te juzgarán y guardarán tu secreto.\n- **Terapia psicológica para jóvenes**: Espacio seguro para platicar tus dudas e inquietudes."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Ayudar a un Amigo que se Quiere Dañar 🚨",
            content: "Si un compañero de la secundaria te dice que ya no quiere vivir:\n1. **Tómalo en serio**: Nunca pienses que es un juego o un chiste.\n2. **Avísale a un adulto ya**: Cuéntaselo a un profesor, orientador o a tus papás de inmediato.\n3. **No lo dejes solo**: Acompáñalo en todo momento hasta que un adulto se haga cargo de él."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Números de Ayuda 📞",
            content: supportLine
          }
        ]
      },
      tabaco: {
        title: "Tabaco y Vapeo 🚬",
        description: "Fumar y usar vapeadores daña tus pulmones. No caigas en la trampa de los sabores atractivos; el vapeo es muy peligroso.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "¿Qué es el Tabaco y el Vapeo? 🚬",
            content: "El **tabaco** es una planta con nicotina que crea adicción muy rápido.\n- **Vapeadores (cigarrillos electrónicos)**: Dispositivos de plástico que calientan un líquido con nicotina y químicos para hacer vapor de sabores.\n- **La Trampa**: Los vapes tienen sabores ricos (como fresa o menta) pero contienen sustancias tóxicas que dañan tus pulmones igual o peor que el cigarro normal.\n- **Consecuencias**: Falta de aire al hacer ejercicio, tos constante y adicción a la nicotina."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Di No al Vapeo y al Cigarro 🚬",
            content: "1. **Evita la curiosidad**: Si en tu grupo de amigos alguien saca un vape y te ofrece, dile: 'Paso, no quiero dañar mis pulmones'.\n2. **Aprende a resistir**: A veces te ofrecen para verse 'cool'. Ser cool es cuidar tu salud y tomar tus propias decisiones.\n3. **Haz deportes**: Correr, jugar fútbol o básquetbol te ayudará a mantener tus pulmones sanos y fuertes.\n4. **Busca información real**: No te creas los videos de internet que dicen que el vape no hace daño; sí hace y mucho."
          },
          {
            id: "asist",
            label: "Asistencia y Orientación 🩺",
            title: "Recursos de Ayuda en tu Escuela 🩺",
            content: "Si ya estás fumando o vapeando y quieres dejarlo:\n- **Acércate a Orientación**: En tu secundaria te darán consejos para romper este hábito sin castigarte.\n- **Platícalo con tu Familia**: Ellos te apoyarán a buscar opciones saludables para canalizar los nervios.\n- **Centros CAPA**: Brindan pláticas privadas de prevención del vapeo y consumo de tabaco para adolescentes."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Ayudar a un Compañero que Vapea 🚨",
            content: "Si ves que un compañero mete vapeadores a la escuela o fuma a escondidas:\n1. **Platica con él**: Dile de forma amigable que el vapeo daña sus pulmones y que no vale la pena el riesgo.\n2. **No participes**: No le ayudes a esconder los cigarros o vapes.\n3. **Busca asesoría**: Si ves que no puede dejarlo, coméntalo de forma discreta con el orientador de la secundaria."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Números de Ayuda 📞",
            content: supportLine
          }
        ]
      },
      proyecto: {
        title: "Sobre el Proyecto ℹ️",
        description: "**Mente Conecta - SEP** es una iniciativa de la Secretaría de Educación Pública para apoyar el bienestar emocional de los alumnos de Secundaria.",
        sections: [
          {
            id: "def",
            label: "¿Qué es Mente Conecta - SEP? 📖",
            title: "Sobre Mente Conecta - SEP ℹ️",
            content: "**Mente Conecta - SEP** es un sitio web diseñado por la Secretaría de Educación Pública para ayudarte a resolver tus dudas sobre salud mental, adicciones y darte consejos para sentirte mejor en tu vida escolar y personal."
          },
          {
            id: "mision",
            label: "Nuestra Misión 🎯",
            title: "Misión del Proyecto 🎯",
            content: "Apoyar a los estudiantes de secundaria a comprender sus emociones, evitar el consumo de sustancias peligrosas y darles herramientas para estudiar felices y seguros."
          },
          {
            id: "ayuda",
            label: "¿Cómo te ayudamos? ✨",
            title: "Herramientas para Ti ✨",
            content: "Te damos:\n- **Tips para estudiar** sin estresarte.\n- **Consejos para decir no** al cigarro, alcohol o vapes.\n- **Contactos directos** con orientadores y psicólogos que te pueden escuchar."
          },
          {
            id: "valores",
            label: "Nuestros Valores ❤️",
            title: "Compromiso con el Alumno ❤️",
            content: "1. **Confianza**: Tu información está a salvo con nosotros.\n2. **Respeto**: Te escuchamos sin juzgarte.\n3. **Cercanía**: Queremos ser un apoyo real en tu paso por la secundaria."
          }
        ]
      }
    };
  }

  if (type === 5) {
    // ----------------------------------------------------
    // 5. MENTE CONECTA - SESyN (Preparatoria / Universidad)
    // ----------------------------------------------------
    return {
      alcohol: {
        title: "Alcohol 🍺",
        description: "En la preparatoria y universidad, las fiestas y la presión social pueden normalizar el abuso del **alcohol**. Cuida tu rendimiento y salud.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "El Alcohol en la Vida Estudiantil 🍺",
            content: "El **alcohol** es un depresor que afecta directamente el lóbulo frontal, encargado de la toma de decisiones y el autocontrol.\n- **Consumo excesivo (Binge drinking)**: Beber 4 o 5 copas en un lapso corto de tiempo, algo común en eventos estudiantiles.\n- **Rendimiento escolar**: Afecta la consolidación de la memoria, dificultando el estudio para exámenes y entrega de proyectos.\n- **Consecuencias**: Accidentes viales, conductas de riesgo y resaca que impacta tu rutina académica."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pautas de Autocuidado en Eventos Sociales 🍺",
            content: "1. **Decide tus límites**: No necesitas beber para divertirte, socializar o ser aceptado en el grupo.\n2. **Planifica tu consumo**: Si decides beber, alterna con agua y come bien antes y durante el evento.\n3. **Regreso a casa seguro**: Nunca conduzcas bajo efectos del alcohol ni subas al auto de alguien que haya bebido.\n4. **Canaliza el estrés**: No utilices el alcohol como una forma de escapar de la presión académica."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo en Preparatoria y Universidad 🩺",
            content: "Si sientes que el consumo de alcohol está afectando tus metas de vida:\n- **Servicio Psicopedagógico**: Acude al departamento de orientación o psicología de tu escuela.\n- **Centros de Atención Juvenil**: Brindan consulta profesional gratuita y confidencial para jóvenes adultos.\n- **Grupos Universitarios de Sobriedad**: Comunidades de estudiantes que promueven un estilo de vida saludable."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Protocolo ante Intoxicación de un Compañero 🚨",
            content: "Si un compañero de la prepa o universidad está excesivamente ebrio:\n1. **No lo dejes solo**: Asegúrate de que permanezca en un lugar seguro.\n2. **Posición de seguridad**: Acuéstalo de lado para prevenir asfixia ante un posible vómito.\n3. **Busca ayuda de adultos o emergencias**: Si pierde el sentido o respira de forma inconstante, llama al **911** de inmediato."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo 📞",
            content: supportLine
          }
        ]
      },
      ansiedad: {
        title: "Ansiedad 🧘",
        description: "El estrés por exámenes, entregas finales y la elección del futuro profesional pueden disparar la **ansiedad**. Aprende a regularla.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Ansiedad Académica y Social 🧘",
            content: "La ansiedad es una respuesta adaptativa ante la presión, pero se vuelve problemática cuando interfiere con tu rendimiento escolar y social.\n- **Ansiedad ante exámenes**: Bloqueo mental y físico al realizar evaluaciones importantes.\n- **Ansiedad de futuro**: Preocupación extrema por la elección de carrera, el empleo y las expectativas familiares.\n- **Síntomas**: Taquicardia, opresión en el pecho, insomnio y pensamientos intrusivos de fracaso."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Técnicas de Organización y Calma 🧘",
            content: "1. **Técnica Pomodoro**: Estudia en bloques de 25 minutos enfocados con descansos de 5 minutos; esto reduce el agobio mental.\n2. **Respiración Diafragmática**: Realiza respiraciones lentas para desacelerar la respuesta de alerta en tu cuerpo.\n3. **Sueño reparador**: Duerme entre 7 y 8 horas; la falta de sueño incrementa drásticamente los niveles de cortisol.\n4. **Limita los estimulantes**: Reduce las bebidas energizantes y café que aumentan el nerviosismo."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Ruta de Bienestar en tu Campus 🩺",
            content: "Si la ansiedad te abruma y afecta tu desempeño escolar:\n- **Orientación Psicológica Escolar**: Acude a las áreas de apoyo psicopedagógico de tu preparatoria o universidad.\n- **Terapia Cognitivo-Conductual**: Recomendada para aprender a reestructurar pensamientos disfuncionales sobre tus estudios.\n- **Talleres de Manejo del Estrés**: Sesiones grupales para aprender mindfulness y técnicas de estudio eficaces."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Auxilio ante Crisis en Clase o Examen 🚨",
            content: "Si un compañero de clase sufre un ataque de pánico o crisis de ansiedad:\n1. **Mantén la calma**: Háblale suavemente, dile 'estás a salvo, enfócate en mi voz y respira'.\n2. **Espacio seguro**: Llévalo fuera del aula a un lugar ventilado y libre de ruidos.\n3. **Enfoque en el presente**: Pídele que mencione 3 cosas que vea a su alrededor para romper el ciclo de pánico."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo 📞",
            content: supportLine
          }
        ]
      },
      alimentaria: {
        title: "Conducta Alimentaria 🥗",
        description: "La presión por encajar en estándares estéticos y los malos horarios de estudio pueden desordenar tu alimentación. Cuida tu salud integral.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Trastornos Alimenticios y Vida Estudiante 🥗",
            content: "Condiciones de salud mental que involucran una relación disfuncional con la comida y la insatisfacción corporal en jóvenes adultos.\n- **Anorexia y Bulimia**: Conductas de restricción de comida o purgas debido a la presión por la imagen corporal.\n- **Comer por estrés**: Atracones de comida chatarra o saltarse comidas durante las épocas de exámenes.\n- **Vigorexia**: Obsesión por el ejercicio físico y dietas proteicas extremas para alcanzar la musculatura ideal."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Estilo de Vida y Relación Sana con la Comida 🥗",
            content: "1. **Filtra tus contenidos**: Deja de seguir cuentas que promuevan cuerpos poco realistas o dietas restrictivas extremas.\n2. **Alimentación regular**: Establece horarios de comida estables, incluso durante periodos de exámenes; tu cerebro necesita glucosa saludable.\n3. **Habla de tus emociones**: Comunica tus inseguridades con amigos o terapeutas en lugar de canalizarlas mediante la alimentación.\n4. **Valora tu cuerpo**: Enfócate en la funcionalidad y salud de tu cuerpo sobre los estándares de moda."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Servicios de Apoyo Integral 🩺",
            content: "Cuentas con redes profesionales para mejorar tu alimentación y bienestar:\n- **Servicio Médico del Campus**: Valoración inicial y canalización con nutriólogos universitarios.\n- **Terapia Psicológica**: Indispensable para abordar la raíz emocional de la insatisfacción corporal.\n- **Talleres de Nutrición Juvenil**: Espacios para aprender a preparar comidas saludables y de bajo costo para estudiantes."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Señales de Alerta en tu Entorno Escolar 🚨",
            content: "Presta atención a estas señales en ti o en tus compañeros:\n1. Desmayos, mareos recurrentes o fatiga crónica en horas de clase.\n2. Evitar comer en grupo constantemente y obsesionarse con las calorías.\n3. **Actitud empática**: No opines sobre el cuerpo de los demás y anima a buscar asesoría médica si notas un deterioro de salud."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo 📞",
            content: supportLine
          }
        ]
      },
      depresion: {
        title: "Depresión 😔",
        description: "El desinterés académico prolongado, la fatiga crónica y el aislamiento de tus amigos universitarios pueden ser señales de **depresión**.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "La Depresión en el Entorno Universitario 😔",
            content: "La depresión es un trastorno clínico del ánimo que afecta la forma de pensar, sentir y desempeñarse a nivel escolar y personal.\n- **Anhedonia**: Pérdida de interés en hobbies, clases, proyectos y actividades sociales que antes se disfrutaban.\n- **Fatiga Crónica**: Sentimiento de agotamiento persistente no relacionado con el esfuerzo físico.\n- **Aislamiento**: Preferir quedarse solo de manera constante y evitar responder a mensajes o llamadas de amigos."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Acciones para Afrontar el Día a Día 😔",
            content: "1. **Objetivos progresivos**: Si te abruman los estudios, proponte avanzar solo 15 minutos en tus pendientes.\n2. **Conéctate de forma sencilla**: Platica con un solo amigo cercano, aunque sea por una llamada breve.\n3. **Movimiento y luz natural**: Sal a caminar un rato por el campus durante los descansos para mejorar la oxigenación.\n4. **Permítete ir despacio**: Entiende que pasar por un bache emocional requiere paciencia y buscar ayuda profesional."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo en Salud Mental Juvenil 🩺",
            content: "La depresión tiene tratamiento efectivo y es posible superarla:\n- **Servicios de Salud Mental en el Campus**: Consulta gratuita con psicoterapeutas escolares.\n- **Psicoterapia Individual**: Orientación especializada en regular emociones y resolver crisis de la juventud.\n- **Consulta de Psiquiatría**: Apoyo de medicamentos en caso de ser recomendado por tu médico."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Ayudar a un Compañero en Crisis 🚨",
            content: "Si notas que un amigo de la escuela muestra síntomas graves de depresión:\n1. **Escucha activamente**: Dale un espacio para hablar sin juzgarlo ni decirle cómo debería sentirse.\n2. **Mantén el contacto**: Invítalo a comer o a estudiar de forma tranquila, haciéndole saber que estás ahí.\n3. **Vinculación inmediata**: Si expresa ideas de no querer continuar, acompáñalo con el orientador o avisa a su familia."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo 📞",
            content: supportLine
          }
        ]
      },
      drogas: {
        title: "Drogas 🚫",
        description: "El consumo de sustancias en la vida universitaria puede afectar tus metas y rendimiento. Infórmate con bases científicas.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Sustancias Adictivas y Cerebro Joven 🚫",
            content: "Las drogas alteran la química cerebral y ponen en riesgo el desarrollo académico e intelectual del estudiante.\n- **Dependencia**: Pérdida de la capacidad de divertirse, estudiar o relacionarse sin consumir la sustancia.\n- **Vapeo y estimulantes**: Sustancias populares en círculos estudiantiles que se asocian falsamente a la concentración o estatus.\n- **Impacto**: Pérdida de materias, deserción universitaria y deterioro cognitivo general."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Alternativas y Asertividad 🚫",
            content: "1. **Canaliza el estrés sanamente**: La práctica de deportes, actividades culturales o pasatiempos genera dopamina de forma natural.\n2. **Infórmate con rigor**: Investiga los efectos reales a mediano y largo plazo de las sustancias en tu cuerpo.\n3. **Círculos positivos**: Elige rodearte de personas que valoren tus metas y respeten tus decisiones de no consumo.\n4. **Aprende a negarte**: Defender tus límites es un signo de madurez y liderazgo en tu entorno."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Apoyo Estudiantil y Clínicas 🩺",
            content: "Si requieres apoyo en torno al consumo de drogas:\n- **Servicio Médico y Psicológico Universitario**: Orientación inicial con absoluta discreción y confidencialidad.\n- **Centros Especializados (UNEME-CAPA)**: Atención psicológica especializada en adicciones para jóvenes adultos.\n- **Grupos Juveniles de Apoyo**: Comunidades de soporte entre estudiantes en proceso de recuperación."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Qué Hacer ante una Emergencia por Consumo 🚨",
            content: "Si un compañero de clase o fiesta presenta una mala reacción o sobredosis:\n1. **Llama al 911 de inmediato**: No demores la llamada por miedo a sanciones escolares; la vida de tu compañero es prioritaria.\n2. **Posición segura**: Coloca a la persona de lado para evitar broncoaspiración y mantén despejadas sus vías respiratorias.\n3. **Sé honesto con los médicos**: Detalla con claridad qué consumió la persona para agilizar el tratamiento."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo 📞",
            content: supportLine
          }
        ]
      },
      suicidio: {
        title: "Riesgo de Suicidio 🆘",
        description: "La sobrecarga académica y las crisis personales pueden hacernos sentir desesperanzados. Queremos apoyarte, no estás solo.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Detección y Prevención del Suicidio 🆘",
            content: "El suicidio es prevenible y requiere atención médica y psicológica oportuna ante la desesperanza extrema.\n- **Ideación Suicida**: Pensamientos persistentes relacionados con acabar con la vida como salida a una crisis.\n- **Señales críticas**: Expresar ideas de muerte, regalar pertenencias queridas, despedidas inusuales o aislamiento extremo de clases.\n- **Mito**: 'Preguntar sobre esto lo incita'. **Realidad**: Ofrecer un espacio seguro y empático para hablar salva vidas."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Estrategias de Seguridad Emocional 🆘",
            content: "1. **Pide ayuda hoy**: Platica de inmediato con un consejero escolar, psicólogo del campus o familiar de confianza.\n2. **Plan de Seguridad**: Ten guardados en tus contactos los números de la Línea de la Vida y de personas que te den calma.\n3. **Evita el aislamiento**: Permanece acompañado en tus momentos de crisis emocional más agudos.\n4. **Busca terapia formal**: La salud mental es una prioridad de salud física."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Red de Salud Mental en el Campus 🩺",
            content: "La universidad o escuela cuenta con recursos para tu protección:\n- **Área de Salud Mental y Psicopedagogía**: Atención prioritaria a estudiantes con crisis emocionales o ideación suicida.\n- **Líneas de Crisis Gratuitas 24/7**: Profesionales especializados en atenderte telefónicamente.\n- **Acompañamiento Terapéutico**: Sesiones enfocadas en dotarte de herramientas para regular las emociones de la vida joven."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Cómo Actuar ante un Compañero en Riesgo 🚨",
            content: "Si un compañero de estudios te confiesa que planea atentar contra su vida:\n1. **Tómalo muy en serio**: Jamás pienses que es para llamar la atención o un chantaje académico.\n2. **No lo dejes solo**: Acompáñalo de manera incondicional hasta que llegue un profesional.\n3. **Informa**: Acude de inmediato al psicólogo del campus, director de carrera o llama al **911**."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo 📞",
            content: supportLine
          }
        ]
      },
      tabaco: {
        title: "Tabaco y Vapeo 🚬",
        description: "El vapeo y fumar tabaco dañan tus pulmones y generan una fuerte dependencia. Evita usar la nicotina para mitigar el estrés académico.",
        sections: [
          {
            id: "def",
            label: "Definiciones 📖",
            title: "Tabaquismo y Vapeo en Estudiantes 🚬",
            content: "El consumo de nicotina mediante cigarros convencionales o electrónicos interfiere con el sistema circulatorio y pulmonar.\n- **Nicotina**: Estimulante altamente adictivo que erróneamente se usa para concentrarse o estudiar bajo estrés.\n- **Vapeadores (cigarrillos electrónicos)**: Introducen aerosoles cargados de metales pesados, dañando irreversiblemente el tejido pulmonar.\n- **Consecuencias**: Menor oxigenación, disminución del rendimiento físico, tos crónica y fuerte dependencia química."
          },
          {
            id: "rec",
            label: "Recomendaciones ✅",
            title: "Pautas de Resistencia y Estilo de Vida 🚬",
            content: "1. **Evita la trampa del estrés**: Fumar no relaja; la nicotina eleva tu ritmo cardíaco y la ansiedad a mediano plazo.\n2. **Aprende a decir no**: Ante la presencia de vapeadores en fiestas o reuniones, defiende tu salud con asertividad.\n3. **Sustitutos de hábito**: Realiza ejercicios cardiovasculares, mantén a la mano chicles sin azúcar o bebe agua fría cuando sientas antojo.\n4. **Espacio libre de humo**: Evita guardar encendedores, cajetillas o dispositivos de vapeo en tu mochila o cuarto."
          },
          {
            id: "asist",
            label: "Asistencia y Seguimiento 🩺",
            title: "Opciones para Dejar el Tabaco en el Campus 🩺",
            content: "Cuentas con apoyo para romper el hábito de fumar:\n- **Servicio Médico y Psicológico Universitario**: Guías de cesación tabáquica dirigidas a estudiantes.\n- **Línea de la Vida**: Ofrece apoyo y seguimiento telefónico gratuito para dejar la nicotina.\n- **Terapia Cognitivo-Conductual**: Ayuda para identificar y modificar los disparadores de consumo de tabaco en tu vida diaria."
          },
          {
            id: "prot",
            label: "Protocolos de Atención 🚨",
            title: "Manejo del Antojo y Recaídas en Exámenes 🚨",
            content: "Si estás intentando dejar el tabaco y te encuentras en temporada de exámenes estresantes:\n1. **Aplaza el antojo**: Espera 10 minutos haciendo respiraciones Pomodoro; el impulso bajará de intensidad.\n2. **Alerta estudiantil**: Avisa a tus amigos que estás dejando de fumar para que eviten ofrecerte o vapear a tu lado.\n3. **Aprende del tropiezo**: Si caes ante la presión, no abandones tu meta. Retoma tu plan de abstinencia al instante."
          },
          {
            id: "lineas",
            label: "Líneas de Apoyo 📞",
            title: "Líneas de Apoyo 📞",
            content: supportLine
          }
        ]
      },
      proyecto: {
        title: "Sobre el Proyecto ℹ️",
        description: "**Mente Conecta - SESyN** es un programa diseñado para promover la salud mental en estudiantes de Preparatoria y Educación Superior.",
        sections: [
          {
            id: "def",
            label: "¿Qué es Mente Conecta - SESyN? 📖",
            title: "Sobre Mente Conecta - SESyN ℹ️",
            content: "**Mente Conecta - SESyN** es una plataforma digital de salud mental orientada a brindar orientación, guías de autocuidado y contactos de crisis a estudiantes de nivel medio superior (preparatoria) y educación superior (universidades)."
          },
          {
            id: "mision",
            label: "Nuestra Misión 🎯",
            title: "Misión del Proyecto 🎯",
            content: "Promover el bienestar socioemocional de los jóvenes estudiantes de preparatoria y universidad, eliminando barreras de estigma y facilitando recursos prácticos de contención."
          },
          {
            id: "ayuda",
            label: "¿Cómo te ayudamos? ✨",
            title: "Recursos Universitarios ✨",
            content: "Te ofrecemos:\n- **Técnicas de manejo del estrés** para la temporada de exámenes.\n- **Protocolos de emergencia** para intervención en crisis en el campus.\n- **Directorio de vinculación** con psicólogos y servicios escolares."
          },
          {
            id: "valores",
            label: "Nuestros Valores ❤️",
            title: "Compromiso Estudiantil ❤️",
            content: "1. **Empatía**: Entendemos el reto de la vida académica moderna.\n2. **Confidencialidad**: Tu búsqueda y uso de la información son completamente seguros.\n3. **Cientificidad**: Contenidos validados científicamente para tu tranquilidad."
          }
        ]
      }
    };
  }
};

export const getWelcomeMessage = (typeLogin) => {
  const type = Number(typeLogin);
  if (type === 1) {
    return "¡Hola! 👋 Soy tu asistente de **Salud Mental y Bienestar**. He seleccionado estos temas para apoyarte en tu salud física y emocional en las Clínicas del EDOMex.\n\n¿En qué categoría te gustaría profundizar hoy? ✨";
  }
  if (type === 3) {
    return "¡Hola! 👋 Bienvenido a tu asistente de **Apoyo en Salud Mental y Recuperación**. He preparado información orientada a acompañarte en tu proceso de rehabilitación y bienestar emocional.\n\n¿En qué área te gustaría profundizar hoy? ✨";
  }
  if (type === 4) {
    return "¡Hola! 👋 Soy tu asistente de **Mente Conecta - SEP**. Aquí encontrarás información muy valiosa para cuidarte, manejar el estrés de la escuela y sentirte mejor contigo mismo.\n\n¿De qué tema te gustaría platicar hoy? ✨";
  }
  if (type === 5) {
    return "¡Hola! 👋 Soy tu asistente de **Salud Mental - SESyN**. Diseñado para apoyarte a manejar el estrés académico, la presión social y cuidar tu bienestar integral en la preparatoria o universidad.\n\n¿En qué tema te gustaría profundizar hoy? ✨";
  }
  return "¡Hola! 👋 Soy tu asistente de **Salud Mental**. He seleccionado estos temas críticos para apoyarte en tu bienestar diario.\n\n¿En qué categoría te gustaría profundizar hoy? ✨";
};

export const getChatbotHeaderTitle = (typeLogin) => {
  const type = Number(typeLogin);
  if (type === 1) return "Asistente Mente Conecta - ISEM";
  if (type === 3) return "Asistente Mente Conecta - Adicciones";
  if (type === 4) return "Asistente Mente Conecta - SEP";
  if (type === 5) return "Asistente Mente Conecta - SESyN";
  return "Asistente Mente Conecta";
};

export const getChatbotFooterText = (typeLogin) => {
  const type = Number(typeLogin);
  if (type === 1) return "© Mente Conecta - ISEM";
  if (type === 3) return "© Mente Conecta - Adicciones";
  if (type === 4) return "© Mente Conecta - SEP";
  if (type === 5) return "© Mente Conecta - SESyN";
  return "© Mente Conecta";
};
