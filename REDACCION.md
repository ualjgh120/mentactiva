COMPLEMENTO DEL
TRABAJO FIN DE GRADO
Grado en Ingeniería Informática
UNIVERSIDAD DE ALMERIA
ESCUELA SUPERIOR DE INGENIERÍA
Diseño, desarrollo e
implementación de una
plataforma web accesible para la
estimulación cognitiva en
personas mayores
Curso 2025/2026
Alumno/a:
Juan González Haro
Director/es:
Miguel Ángel Navarro Pascual
Texto de la dedicatoria
ÍNDICE GENERAL
Página
Resumen y Abstract XV
1. Introducción 1
1.1. Contexto y motivación . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
1.2. El problema de las barreras tecnológicas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
1.3. Propuesta de solución . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
1.4. Justificación . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1.5. Objetivos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1.5.1. Objetivo general . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1.5.2. Objetivos específicos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
1.5.3. Trazabilidad de los objetivos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
1.6. Estructura de la memoria . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
1.7. Planificación . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
2. Marco Teórico 7
2.1. El envejecimiento cerebral normal . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
2.2. Deterioro cognitivo leve (DCL) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
2.3. Epidemiología y coste de las demencias en España . . . . . . . . . . . . . . . . . . . . . . . 8
2.4. Evidencia clínica sobre estimulación cognitiva . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
2.4.1. Resultados cuantitativos en personas con demencia . . . . . . . . . . . . . . . . . . . 9
2.4.2. Estimulación cognitiva en mayores sanos y con DCL . . . . . . . . . . . . . . . . . . . 9
ÍNDICE GENERAL V
ÍNDICE GENERAL
2.4.3. Estimulación cognitiva computarizada y principios de diseño . . . . . . . . . . . . . . . 9
2.5. Serious games en estimulación cognitiva . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2.5.1. Definición y origen del concepto . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2.5.2. Motivación, adherencia y evidencia clínica . . . . . . . . . . . . . . . . . . . . . . . . . 2.5.3. Telemetría y reducción de la brecha digital . . . . . . . . . . . . . . . . . . . . . . . . . 2.6. Accesibilidad web y WCAG 2.1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2.6.1. Los cuatro principios POUR . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2.6.2. Criterios AA relevantes para personas mayores . . . . . . . . . . . . . . . . . . . . . . 2.6.3. Barreras específicas del perfil objetivo . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
10
10
10
11
11
11
12
3. Antecedentes y estado del arte 3.1. Plataformas comerciales de estimulación cognitiva digital . . . . . . . . . . . . . . . . . . . . 3.2. Plataformas de investigación: VIRTRA-EL . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3.3. Análisis comparativo y posicionamiento de MenteActiva . . . . . . . . . . . . . . . . . . . . . 13
13
14
15
4. Especificación e ingeniería de requisitos 4.1. Modelado y análisis del dominio . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.1.1. Perspectiva general . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.1.2. Participantes y actores del ecosistema . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.1.3. Glosario terminológico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.1.4. Límites y alcance del sistema . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.2. Modelado de procesos de negocio (BPMN) . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.2.1. BPMN-01: Ciclo de una sesión cognitiva . . . . . . . . . . . . . . . . . . . . . . . . . . 4.2.2. BPMN-02: Flujo de alta y gestión de perfiles . . . . . . . . . . . . . . . . . . . . . . . . 4.3. Requisitos funcionales . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.3.1. Tabla de especificación de requisitos funcionales . . . . . . . . . . . . . . . . . . . . . 4.3.2. Justificación de requisitos específicos . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.3.3. Matriz de trazabilidad con casos de uso . . . . . . . . . . . . . . . . . . . . . . . . . . 17
17
17
17
17
18
18
19
19
19
20
20
21
ÍNDICE GENERAL VI
ÍNDICE GENERAL
4.4. Requisitos no funcionales . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.4.1. Tabla de especificación de requisitos no funcionales . . . . . . . . . . . . . . . . . . . 4.4.2. Análisis de requisitos de calidad seleccionados . . . . . . . . . . . . . . . . . . . . . . 4.5. Modelado de interacción: Casos de uso . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.5.1. Diagrama de casos de uso general . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.5.2. Catálogo e interrelación de los casos de uso . . . . . . . . . . . . . . . . . . . . . . . 4.5.3. Especificación tabular de CU-02: Autenticar con PIN . . . . . . . . . . . . . . . . . . . 21
21
22
22
23
24
25
4.5.4. Especificación tabular de CU-07: Jugar memoria visual . . . . . . . . . . . . . . . . . . 26
4.5.5. Trazabilidad de requisitos funcionales con casos de uso . . . . . . . . . . . . . . . . . 26
5. Diseño y arquitectura 27
5.1. Arquitectura en tres capas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5.2. Justificación y selección del ecosistema tecnológico . . . . . . . . . . . . . . . . . . . . . . . 5.3. Estructura del proyecto . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5.4. Diagramas de clases . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5.5. Diagramas de secuencia . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5.6. Modelo de datos relacional . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5.7. Principios de diseño de interfaz . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 27
29
30
30
32
35
37
6. Desarrollo e implementación 39
6.1. Configuración del entorno de desarrollo . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6.2. Integración con Supabase . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6.3. Sistema de autenticación . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6.4. Ejercicio de memoria visual . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6.5. Ejercicio de memoria secuencial . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6.6. Ejercicio de cálculo . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6.7. Perfil del usuario e historial . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6.8. Panel del cuidador . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
41
42
45
46
46
47
48
ÍNDICE GENERAL VII
ÍNDICE GENERAL
6.9. Despliegue . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
7. Pruebas 51
7.1. Estrategia de testing . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.2. Tests unitarios: lógica de juegos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.3. Tests unitarios: estadísticas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.4. Tests de autenticación y PIN . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.5. Tests de control de acceso . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.6. Pruebas funcionales manuales . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.7. Compatibilidad entre navegadores . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.8. Auditoría con Lighthouse . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7.9. Defectos detectados y corregidos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 51
51
53
53
54
54
55
55
56
8. Conclusiones y trabajo futuro 8.1. Grado de cumplimiento de los objetivos . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8.2. Reflexión sobre las decisiones técnicas . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8.3. Limitaciones conocidas del sistema . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8.4. Deuda técnica reconocida . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8.5. Líneas de trabajo futuro . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8.6. Valoración personal . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . BIBLIOGRAFÍA . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57
57
57
58
58
59
59
61
ÍNDICE GENERAL VIII
ÍNDICE DE FIGURAS
1.1. Diagrama de Gantt del cronograma del CTFG (2026). . . . . . . . . . . . . . . . . . 5
4.1. Diagrama BPMN del flujo de una sesión cognitiva con los tres actores principales. . . 19
4.2. Diagrama BPMN del flujo de creación de perfil con sus pasarelas de validación. . . . 19
4.3. Diagrama UML de casos de uso de MenteActiva. . . . . . . . . . . . . . . . . . . . . 23
5.1. Arquitectura en tres capas de MenteActiva. . . . . . . . . . . . . . . . . . . . . . . . 28
5.2. Vista general del modelo estático del sistema en tres capas. . . . . . . . . . . . . . . 31
5.3. Modelo de los tres ejercicios cognitivos con el contrato GameContract. . . . . . . . . 32
5.4. Flujo de autenticación con PIN, incluyendo caminos de éxito y fallo. . . . . . . . . . . 33
5.5. Flujo de una partida completa del ejercicio de memoria visual. . . . . . . . . . . . . . 34
5.6. Modelo entidad-relación de MenteActiva. . . . . . . . . . . . . . . . . . . . . . . . . 37
ÍNDICE DE FIGURAS IX
ÍNDICE DE TABLAS
1.1. Trazabilidad de objetivos por capítulos. . . . . . . . . . . . . . . . . . . . . . . . . . 4
1.2. Resumen de las fases del proyecto y carga horaria estimada. . . . . . . . . . . . . . 5
3.1. Comparativa transversal de soluciones de estimulación cognitiva digital. . . . . . . . 15
4.1. Glosario de términos del dominio. . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4.2. Matriz de requisitos funcionales del sistema. . . . . . . . . . . . . . . . . . . . . . . 4.3. Matriz de requisitos no funcionales del sistema. . . . . . . . . . . . . . . . . . . . . . 4.4. Catálogo de casos de uso del sistema. . . . . . . . . . . . . . . . . . . . . . . . . . 4.5. Especificación de CU-02 (Autenticar con PIN). . . . . . . . . . . . . . . . . . . . . . 4.6. Especificación de CU-07 (Jugar memoria visual). . . . . . . . . . . . . . . . . . . . . 18
20
21
24
25
26
4.7. Trazabilidad inversa de requisitos funcionales con casos de uso. . . . . . . . . . . . . 26
5.1. Resumen de decisiones tecnológicas con su alternativa no elegida y el motivo decisivo. 30
5.2. Descripción de la tabla users. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5.3. Descripción de la tabla sessions. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 36
36
5.4. Ratios de contraste medidos frente a las pautas WCAG 2.1 AA. . . . . . . . . . . . . 38
7.1. Cobertura de los módulos incluidos en la suite de pruebas unitarias. . . . . . . . . . 53
7.2. Resultado de la comprobación de compatibilidad por motor de navegador. . . . . . . 55
7.3. Puntuaciones de Lighthouse por ruta sobre el entorno de producción. . . . . . . . . . 55
ÍNDICE DE TABLAS XI
LISTADOS
LISTADOS XIII
ABREVIATURAS
API ARIA BPMN CDN CI/CD CSS CST CTFG CU CSV DAD DC DCL DS ERD FK FTC HL7 FHIR HTML IC INE i18n JSX JWT KPI LPI MMSE MoSCoW NVDA OE OMS PHP PIN POUR REST RF RLS RNF SEN SEO Application Programming Interface
Accessible Rich Internet Applications
Business Process Model and Notation
Content Delivery Network
Continuous Integration / Continuous Deployment
Cascading Style Sheets
Cognitive Stimulation Therapy
Complemento al Trabajo Fin de Grado
Caso de Uso (notación interna del documento)
Comma-Separated Values
Disability Assessment for Dementia
Diagrama de Clases (notación interna del documento)
Deterioro Cognitivo Leve
Diagrama de Secuencia (notación interna del documento)
Entity-Relationship Diagram
Foreign Key
Federal Trade Commission (Estados Unidos)
Health Level Seven Fast Healthcare Interoperability Resources
HyperText Markup Language
Intervalo de Confianza
Instituto Nacional de Estadística
Internationalization (numerónimo: i + 18 letras + n)
JavaScript XML (sintaxis de React)
JSON Web Token
Key Performance Indicator
Lumosity Performance Index
Mini-Mental State Examination
Must / Should / Could / Won’t have (técnica de priorización de requi-
sitos)
NonVisual Desktop Access (lector de pantalla open source)
Objetivo Específico (notación interna del documento)
Organización Mundial de la Salud
Hypertext Preprocessor (lenguaje de scripting del lado del servidor)
Personal Identification Number
Perceivable, Operable, Understandable, Robust
Representational State Transfer
Requisito Funcional (notación interna del documento)
Row Level Security
Requisito No Funcional (notación interna del documento)
Sociedad Española de Neurología
Search Engine Optimization
LISTADOS
SLA SPA SQL SSR SUS TFG UAL UE UML UUID W3C WCAG WMD Service Level Agreement
Single-Page Application
Structured Query Language
Server-Side Rendering
System Usability Scale
Trabajo Fin de Grado
Universidad de Almería
Unión Europea
Unified Modeling Language
Universally Unique Identifier
World Wide Web Consortium
Web Content Accessibility Guidelines
Weighted Mean Difference
LISTADOS XV
RESUMEN Y ABSTRACT
Este trabajo presenta MenteActiva, una plataforma web de estimulación cognitiva para personas
mayores con acceso mediante PIN de cuatro dígitos, desarrollada en cascada en 150 horas entre
febrero y junio de 2026. La plataforma integra tres ejercicios cognitivos, un panel de rendimiento
personal y un módulo de supervisión para cuidadores, construidos sobre React 18.3, TypeScript,
Supabase y Vercel y verificados mediante 32 tests unitarios con cobertura del 96–100 % en mó-
dulos núcleo, auditorías Lighthouse con puntuaciones de accesibilidad de entre 94 y 95 sobre 100,
y Playwright en 30 combinaciones de navegador. El proyecto concluye que es posible implemen-
tar una herramienta gratuita y accesible que cubre el escenario que las plataformas comerciales
no atienden, identificando la migración a políticas RLS más estrictas y la validación con usuarios
reales como principales líneas de trabajo futuro.
This work presents MenteActiva, a web-based cognitive stimulation platform for older adults
providing four-digit PIN access, developed using a waterfall methodology over 150 hours between
February and June 2026. The platform integrates three cognitive exercises, a personal performance
dashboard and a caregiver monitoring module, built on React 18.3, TypeScript, Supabase and Vercel
and verified through 32 unit tests with 96–100 % coverage on core modules, Lighthouse accessibility
audits scoring between 94 and 95 out of 100, and Playwright compatibility testing across 30 browser
combinations. The project concludes that it is feasible to deliver a free, accessible tool that fills the
gap left unmet by commercial platforms, identifying stricter RLS security policies and formal user
testing as the main directions for future work.
LISTADOS XVII
1 INTRODUCCIÓN
1.1 CONTEXTO Y MOTIVACIÓN
España registra hoy uno de los índices de envejecimiento más acusados del planeta. Según los
indicadores demográficos oficiales, la esperanza de vida al nacer se situó en 83,77 años durante
2023 y escaló a 84,01 años en 2024. Esto implica que cualquier varón que alcanzara los 65 años
en ese último año tenía por delante una supervivencia media de 19,87 años, una cifra que en el
caso de las mujeres se elevaba hasta los 23,64 años [1].
A nivel global, la OMS calcula unos 57 millones de afectados por demencia en 2021, con diez
millones de nuevos diagnósticos cada año [2]. En nuestro entorno cercano, la SEN cifra en 800.000
las personas que conviven con la enfermedad de Alzheimer, con proyecciones de casi dos millones
antes de mediados de siglo [3]. El coste por paciente oscila entre los 17.100 euros anuales en fases
iniciales y los 41.700 en estadios graves. Como el coste agregado nacional representa ya el 1,5 %
del PIB, la demencia ha dejado de ser solo un reto asistencial para convertirse en un problema de
sostenibilidad fiscal.
Cerca del 15 % de los mayores de 65 años tiene deterioro cognitivo leve (DCL), la frontera entre
el envejecimiento normal y la demencia [4]. Sin intervención, entre el 10 % y el 15 % de esos casos
evoluciona a demencia cada año. La estimulación cognitiva sistemática tiene respaldo empírico
de dos décadas [5]. Por el contrario, los entornos sin retos cognitivos actúan como factor de riesgo
activo [6]. Las intervenciones diseñadas a medida reducen síntomas depresivos y mejoran la calidad
de vida sin interferir con las pautas farmacológicas [7].
El problema actual es que el software disponible para llevar este entrenamiento al domicilio no
encaja con el público objetivo. Los flujos convencionales de autenticación requieren contraseñas
complejas, pasarelas de suscripción diseñadas para usuarios jóvenes y correo electrónico. Para un
adulto mayor sin experiencia con la tecnología, esa resistencia inicial elimina cualquier posibilidad
de adopción antes de iniciar la primera actividad.
MenteActiva surge a partir de dicha problemática. El propósito principal es verificar si una plata-
forma web gratuita, que permite acceder a través de un PIN en vez de una contraseña, puede llegar
hasta ese usuario sin que requiera asistencia para iniciar sesión
1. INTRODUCCIÓN 1
1. INTRODUCCIÓN
1.2 EL PROBLEMA DE LAS BARRERAS TECNOLÓGICAS
El problema no es que los mayores no tengan la habilidad de aprender sobre tecnología. El
enfoque de los estudios es más concreto: la barrera principal no es la falta de habilidad, sino la
ansiedad que provoca una interfaz con un diseño deficiente. Según Barnard y su equipo, tres facto-
res son cruciales: el miedo a cometer un error irreversible, la fatiga ocular producida por pantallas
saturadas y la parálisis que ocurre al encadenar pasos de registro sin poder volver atrás [8].
Un claro ejemplo de ello es el sistema de autenticación convencional, el cual suele requerir
una contraseña con parámetros de seguridad, correo electrónico, enlace de confirmación y, en
ocasiones, un código de verificación vía SMS. Mientras que para un usuario frecuente este proceso
requiere apenas 30 segundos, para una persona de 75 años con temblores leves o fatiga visual,
esto puede ser un impedimento insuperable.
Diferentes estudios sobre cribado cognitivo mediante mecánicas de juego demuestran que los
tiempos de reacción, los patrones de error y las tendencias de las puntuaciones aportan información
diagnóstica real, ofreciendo un seguimiento continuo que la consulta médica presencial no puede
replicar [9]. MenteActiva registra el tipo de ejercicio, la dificultad, la puntuación, la duración y la fecha
de cada interacción. Al acumularse, esa información da a familiares y especialistas una herramienta
para detectar declives antes de que sean evidentes en los test presenciales.
MenteActiva no incluye los formularios convencionales de correo electrónico y contraseña. Para
iniciar sesión solo se necesitan dos interacciones táctiles: pulsar el avatar del perfil e introducir
un PIN de cuatro cifras. Un código PIN guardado como hash Bcrypt con un factor de coste 10
asegura una protección adecuada para la información que gestiona la plataforma, la cual consiste
en métricas de evolución cognitiva y excluye datos financieros o médicos regulados.
1.3 PROPUESTA DE SOLUCIÓN
MenteActiva funciona como una aplicación web accesible desde https://mentactiva-gamma.
vercel.appsin instalación, en móvil, tableta y ordenador. Incluye tres ejercicios cognitivos (memo-
ria visual, memoria secuencial y cálculo aritmético básico), un panel personal de rendimiento y un
módulo de supervisión para cuidadores.
La elección de mecánicas de juego tiene fundamentos clínicos. Revisiones de ensayos con-
trolados constatan que los serious games inducen mejoras cuantitativas en atención, memoria de
trabajo y velocidad de procesamiento, siendo la adaptación dinámica de la dificultad el factor que
más influye en el beneficio terapéutico [10]. Las dinámicas lúdicas incentivan el retorno espontáneo
del usuario, evitando que perciba la tarea como una obligación médica [11].
Se eligió web frente a app nativa porque una URL fija que un familiar guarda como acceso direc-
to en el dispositivo del usuario es mucho más fácil de adoptar que una app de tienda con proceso
de instalación y actualizaciones periódicas. La arquitectura emplea React 18.3 con TypeScript en
modo estricto, Vite 6.3, Tailwind CSS 4.1 con paleta oklch, componentes accesibles de Radix UI
1.2. EL PROBLEMA DE LAS BARRERAS TECNOLÓGICAS 2
1. INTRODUCCIÓN
a través de shadcn/ui, Supabase con PostgreSQL 15 y despliegue continuo en Vercel. El PIN se
procesa con bcrypt de coste 10 en el cliente antes del INSERT; la base de datos nunca almacena
credenciales en texto plano. El Panel del Cuidador presenta gráficos de la actividad semanal, la
distribución de ejercicios y el progreso de las puntuaciones sin costo ni acceso institucional.
1.4 JUSTIFICACIÓN
Justificación social
Se estima que en España hay aproximadamente 800.000 personas diagnosticadas con Alzhei-
mer, a las que se les suma un 15 % de individuos mayores de 65 años con deterioro cognitivo
leve [4]. La cobertura clínica se enfoca en unidades hospitalarias o centros de día que no logran
llegar a toda la población. Según Saragih (2022), si un usuario pasa los días solo, sin actividades
que demanden concentración enfocada, se crea una situación de riesgo activo. Una rutina de ejer-
cicios digitales, que no requiere gastos ni desplazamientos, proporciona al ambiente del paciente
un recurso de asistencia inmediato y reduce la carga diaria del cuidador.
Justificación tecnológica
La distinción en relación con BrainHQ, Lumosity o CogniFit no se encuentra en la cantidad
de ejercicios, sino en el enfoque del diseño. MenteActiva se basa en una limitación explícita: la
accesibilidad para las personas mayores tiene prioridad sobre cualquier otra variable. Se eliminaron
las tablas de clasificación, las notificaciones intrusivas y la monetización por diseño, elementos que
introducen ruido cognitivo sin brindar valor terapéutico. Diseñar el sistema sobre base de código
tipada y con despliegue automatizado asegura que la plataforma pueda seguir operativa de forma
autónoma durante los próximos años.
Justificación académica
Tanto las pautas de accesibilidad para la tercera edad como la estimulación cognitiva son am-
pliamente respaldadas [10]. MenteActiva tiene valor en la confluencia de tres disciplinas que, por
lo general, se examinan por separado: las pruebas clínicas neuropsicológicas, los estándares de
usabilidad para usuarios con déficit cognitivo y el empleo técnico a través de arquitecturas web con-
temporáneas. El documento presenta un caso auténtico en producción que convierte esa evidencia
en decisiones específicas de diseño.
1.5 OBJETIVOS
1.5.1 Objetivo general
Crear, ejecutar y aplicar una infraestructura web enfocada en estimular la cognición de personas
mayores, basándose para ello en la evidencia clínica anterior, las pautas de accesibilidad universal
y una arquitectura técnica que se desarrolla en un ambiente real de producción.
1.4. JUSTIFICACIÓN 3
1. INTRODUCCIÓN
1.5.2 Objetivos específicos
OE1. Analizar la literatura científica acerca de DCL, estimulación cognitiva y juegos serios
para identificar los criterios clínicos que orientarán el diseño.
OE2. Incluir directrices de accesibilidad WCAG 2.1 nivel AA para definir los requisitos funcio-
nales y no funcionales de los dos perfiles de usuario.
OE3. Crear una infraestructura modular utilizando Vercel, Supabase, Tailwind CSS 4.1, Ty-
peScript y React 18.3.
OE4. Implementar autenticación por PIN de cuatro dígitos con hashing bcrypt en el cliente,
conciliando usabilidad y protección de registros.
OE5. Programar tres ejercicios cognitivos desacoplando la lógica de la interfaz del sistema de
persistencia.
OE6. Construir un panel de supervisión longitudinal para cuidadores con gráficas de actividad,
distribución y evolución de puntuaciones.
OE7. Verificar la plataforma con pruebas unitarias en Vitest, compatibilidad en Playwright y
auditorías de accesibilidad con Lighthouse.
1.5.3 Trazabilidad de los objetivos
Tabla 1.1: Trazabilidad de objetivos por capítulos.
Objetivo Capítulo principal Capítulos de apoyo
OE1 Capítulo 2 Capítulos 1 y 3
OE2 Capítulo 4 Capítulo 5
OE3 Capítulo 5 Capítulo 6
OE4 Capítulo 6 (sección 6.3) Capítulo 5 (sección 5.6)
OE5 Capítulo 6 (secciones 6.4–6.6) Capítulo 5 (secciones 5.4–5.5)
OE6 Capítulo 6 (sección 6.8) Capítulo 5 (sección 5.7)
OE7 Capítulo 7 –
1.6 ESTRUCTURA DE LA MEMORIA
El documento se organiza en ocho capítulos seguidos del apartado bibliográfico en formato
IEEE. El Capítulo 2 establece el marco teórico: envejecimiento cerebral, DCL, evidencia sobre esti-
mulación, serious games y WCAG 2.1. El Capítulo 3 analiza los antecedentes y el estado del arte.
El Capítulo 4 documenta la ingeniería de requisitos. El Capítulo 5 describe el diseño arquitectónico.
El Capítulo 6 aborda la implementación con código real. El Capítulo 7 recoge las pruebas y los
defectos encontrados. El Capítulo 8 cierra con las conclusiones y el trabajo futuro.
1.6. ESTRUCTURA DE LA MEMORIA 4
1. INTRODUCCIÓN
1.7 PLANIFICACIÓN
El desarrollo se estructuró en cuatro fases entre febrero y junio de 2026, con un total de 150
horas. Se usó un ciclo de vida en cascada porque el proyecto es individual, con alcance cerrado
desde el inicio y requisitos técnicos estables.
Tabla 1.2: Resumen de las fases del proyecto y carga horaria estimada.
Fase Periodo Horas Descripción
1. Análisis y estado del arte Febrero 2026 30 h Revisión de literatura clínica, delimi-
tación del problema, estudio de alter-
nativas y fundamentación teórica.
2. Diseño Marzo 2026 35 h Requisitos, casos de uso, diseño ar-
quitectónico, esquema de datos y
prototipado.
3. Implementación Abril y mayo 2026 60 h Construcción del frontend, parametri-
zación de Supabase, codificación de
los juegos y despliegue.
4. Pruebas y documentación Junio 2026 25 h Tests con Vitest, pruebas funciona-
les, auditorías Lighthouse y redac-
ción final.
Las fases de pruebas y documentación solaparon con las últimas semanas de implementación.
El cronograma se completó dentro de los plazos previstos. La Figura 1.1 muestra la distribución
temporal.
Figura 1.1: Diagrama de Gantt del cronograma del CTFG (2026).
1.7. PLANIFICACIÓN 5
ENSIS
NI
2 MARCO TEÓRICO
Este capítulo recoge el sustrato clínico y metodológico que fundamenta el diseño de MenteAc-
tiva. Se examinan el envejecimiento cerebral normal, el DCL, la epidemiología de las demencias en
España, la evidencia empírica sobre estimulación cognitiva, los serious games y las pautas WCAG
2.1.
2.1 EL ENVEJECIMIENTO CEREBRAL NORMAL
A partir de la sexta década de vida el cerebro experimenta cambios documentados por neu-
roimagen: retracción cortical con mayor incidencia en lóbulos frontales y estructuras temporales,
degeneración de haces de sustancia blanca, pérdida de densidad sináptica en circuitos de memo-
ria episódica, y desequilibrio en las vías dopaminérgica y colinérgica. Estos cambios son propios
de la senescencia fisiológica, no de una patología.
La traducción cognitiva no es uniforme. El vocabulario, la memoria semántica y el conocimiento
acumulado resisten bien. Lo que se ve afectado es la velocidad de procesamiento, la memoria de
trabajo, la atención dividida y los mecanismos de inhibición. Los programas de estimulación no bus-
can revertir las transformaciones biológicas, sino mantener en funcionamiento aquellas funciones
que responden mejor al entrenamiento.
El constructo de reserva cognitiva, formulado por Stern a inicios del 2000 [12], clarifica la razón
por la cual dos individuos con atrofia equivalente presentan distintos grados de deterioro: el cerebro
tiene la capacidad de activar vías alternativas. Los datos indican que la actividad mental sistemática
ocasiona transformaciones cuantificables incluso en edades avanzadas, y que las sesiones breves
pero regulares tienen más impacto que las largas e irregulares. Esto tiene un impacto directo en la
creación de MenteActiva, cuyos tres ejercicios fueron diseñados para realizarse entre cinco y diez
minutos al día.
2.2 DETERIORO COGNITIVO LEVE (DCL)
El DCL es la etapa que se localiza entre la demencia y el envejecimiento habitual. Los sujetos
con DCL tienen un rendimiento cognitivo por debajo de lo esperado para su edad y nivel educativo,
pero conservan la autonomía en las actividades cotidianas.
2. MARCO TEÓRICO 7
2. MARCO TEÓRICO
Los criterios de referencia fueron formulados por Petersen y colaboradores en 1999 y revisados
bajo el amparo de la Mayo Clinic [4]. Para realizar el diagnóstico se requieren cinco condiciones:
una queja subjetiva de memoria confirmada por un informante, una deficiencia objetiva en uno o
varios dominios, la preservación del funcionamiento global, la independencia en las tareas diarias y
la falta de criterios de demencia.
Hay dos variantes principales. El DCL amnésico afecta predominantemente a la memoria epi-
sódica y presenta mayor tasa de conversión hacia el Alzheimer. El DCL no amnésico compromete
funciones ejecutivas, lenguaje o atención. La prevalencia en mayores de 65 años en España se si-
túa en torno al 15 % según la SEN [3]. Sin intervención, entre el 10 % y el 15 % progresa a demencia
cada año [4]. El DCL no es un destino inevitable: una parte estabiliza o revierte. No existen fárma-
cos con eficacia robusta para esta fase, por lo que las intervenciones de estimulación cognitiva no
farmacológica son la alternativa con mayor soporte empírico.
MenteActiva cubre los tres dominios más afectados en el DCL: la memoria asociativa (ejercicio
de memoria visual), la memoria de trabajo (memoria secuencial) y el control atencional (cálculo
básico).
2.3 EPIDEMIOLOGÍA Y COSTE DE LAS DEMENCIAS EN ESPAÑA
La demencia es un síndrome de declive crónico y progresivo en múltiples dominios cognitivos
con severidad suficiente para interferir en la vida autónoma. La OMS la reconoce como uno de los
principales factores de discapacidad en personas mayores [2].
Los registros de 2021 cifran en unos 57 millones los afectados globales, con proyecciones de
139 millones para 2050 [2]. En España, el Alzheimer representa entre el 70 % y el 77 % de los
casos [3]. La SEN cifra en 800.000 los ciudadanos con Alzheimer diagnosticado, con proyecciones
de hasta dos millones para 2050. Entre el 30 % y el 40 % de los afectados carece de diagnóstico
integrado, proporción que supera el 80 % en las fases iniciales [3].
El gasto medio por paciente oscila entre los 17.100 y los 28.200 euros anuales en estadios
iniciales y alcanza los 41.700 euros en fases graves [3]. El núcleo familiar asume aproximadamente
el 86 % del coste total. Las herramientas de estimulación domiciliaria gratuitas no sustituyen el
cuidado clínico, pero reducen la carga asistencial cotidiana.
2.4 EVIDENCIA CLÍNICA SOBRE ESTIMULACIÓN COGNITIVA
La estimulación cognitiva como intervención no farmacológica tiene dos décadas de literatura
controlada.
2.3. EPIDEMIOLOGÍA Y COSTE DE LAS DEMENCIAS EN ESPAÑA 8
2. MARCO TEÓRICO
2.4.1 Resultados cuantitativos en personas con demencia
El metaanálisis de Saragih y colaboradores del año 2022 resumió diez ensayos controlados
aleatorizados acerca de la Terapia de Estimulación Cognitiva (CST) [6]:
Función cognitiva (MMSE): WMD de 1,98 puntos a favor del grupo con CST (IC 95 %: 1,24–
2,72; p<0,01).
Calidad de vida: WMD de 3,12 (IC 95 %: 2,52–3,72; p<0,01).
Lenguaje (Naming Test): WMD de 2,71 (IC 95 %: 1,07–4,35; p<0,01).
Actividades cotidianas (DAD): WMD de 7,27 (IC 95 %: 0,97–13,56; p<0,01).
En demencia leve o moderada, dos puntos de MMSE en una escala de 30 son clínicamente
significativos. La mejora en la calidad de vida se acerca al límite de cambio mínimo requerido para
tener relevancia clínica, lo que sugiere que el propio paciente nota el efecto. La CST no produjo
mejoras en depresión ni ansiedad: actúa sobre el rendimiento cognitivo y la calidad de vida, pero
no sobre la sintomatología afectiva. Eso importa para MenteActiva: la plataforma puede mejorar
capacidades cognitivas y bienestar percibido, pero no sustituye a una intervención de salud mental.
2.4.2 Estimulación cognitiva en mayores sanos y con DCL
El metaanálisis de Gómez-Soria y colaboradores de 2022 amplió el campo a mayores sanos,
con DCL y con demencia establecida [5]. Los resultados son consistentes en las tres condiciones:
la estimulación mejora memoria, orientación, lenguaje, praxis y cálculo, mientras que la inactivi-
dad cognitiva acelera el deterioro. Un trabajo posterior del mismo grupo añade que la estimulación
personalizada reduce síntomas depresivos y ansiosos y mejora la calidad de vida con independen-
cia del tratamiento farmacológico, siendo además coste-efectiva en sistemas sanitarios bajo presión
presupuestaria [7]. Un estudio piloto de 2024 aporta que los efectos se mantienen hasta seis meses
después de concluir la intervención [13].
2.4.3 Estimulación cognitiva computarizada y principios de diseño
Un análisis de 2023 sobre la efectividad de un programa computarizado estratificado por reser-
va cognitiva basal tiene consecuencias directas para el diseño [14]. La conclusión central es que el
efecto del entrenamiento depende del nivel cognitivo de partida: quienes parten con menor reserva
obtienen ganancias mayores, pero necesitan ejercicios más sencillos al inicio. Una dificultad única
no logra satisfacer a los dos extremos: al que tiene mejor condición le aburre y al que está más
deteriorado lo frustra. Investigaciones sistemáticas anteriores han registrado efectos significativos
en la rapidez de procesamiento y la memoria de trabajo en personas mayores sanas [15], mien-
tras que estudios posteriores corroboran que los resultados de la estimulación por ordenador son
semejantes a las intervenciones presenciales si se mantiene una frecuencia mínima de uso [16, 17].
2.4. EVIDENCIA CLÍNICA SOBRE ESTIMULACIÓN COGNITIVA 9
2. MARCO TEÓRICO
Los cuatro principios que orientaron el diseño de MenteActiva fueron derivados de la evidencia
anterior. La frecuencia frente a la intensidad, en comparación con sesiones largas y esporádicas, las
sesiones cortas y diarias generan resultados más estables por lo que los ejercicios fueron diseñados
para durar entre cinco y diez minutos. La adaptación al nivel basal, cada ejercicio tiene tres niveles
de dificultad, que corresponden al rango habitual de una mayor sin DCL grave. La continuidad en
el tiempo, el impacto perdura siempre que la práctica se conserve, lo cual justifica el panel de
seguimiento a largo plazo. El refuerzo positivo, la adherencia es el elemento que determina si existe
o no un efecto terapéutico.
2.5 SERIOUS GAMES EN ESTIMULACIÓN COGNITIVA
2.5.1 Definición y origen del concepto
En 1970, Clark Abt fue quien creó el término serious games [20]. La definición técnica de re-
ferencia es la que Zyda estableció en el año 2005 en IEEE Computer [18]: un "serious game" es
una competición mental desarrollada en un ordenador siguiendo normativas específicas, que em-
plea el entretenimiento para respaldar metas educativas, de salud, de formación o de comunicación
estratégica.
2.5.2 Motivación, adherencia y evidencia clínica
La incorporación de mecánicas lúdicas en entornos de intervención para adultos mayores no
es un añadido cosmético, sino un factor funcional que actúa directamente sobre la adherencia al
programa. Pereira y colaboradores documentan tasas de finalización de tareas significativamen-
te más elevadas en entornos lúdicos, así como fenómenos de plasticidad cerebral tras períodos
prolongados de entrenamiento [11]. La deserción es el principal riesgo de cualquier programa de
estimulación: si el usuario no vuelve, no hay efecto terapéutico.
En 2024, Wang y sus cooperadores realizaron una revisión sistemática de ocho ensayos con-
trolados sobre juegos serios en personas mayores con DCL [10]. Los resultados son coherentes:
avances en la atención, la memoria de trabajo y la rapidez en el procesamiento. Además, el estudio
muestra que los estudios que ajustan la dificultad al rendimiento del usuario tienen un efecto más
fuerte que aquellos con dificultad fija [14]. La primera sesión es el momento crítico para la retención
y los elementos que no tienen una utilidad terapéutica inmediata producen una carga cognitiva,
según las contribuciones de 2024 [19].
2.5.3 Telemetría y reducción de la brecha digital
Manera y colaboradores mostraron en 2018 que la evaluación computarizada de las tasas de
error, los tiempos de respuesta y las curvas de aprendizaje tienen la capacidad de revelar fluctuacio-
nes cognitivas subclínicas que no se detectan en consultas presenciales [9]. MenteActiva funciona
de la misma manera: cada sesión produce una huella estructurada (tipo de tarea, nivel, puntuación,
2.5. SERIOUS GAMES EN ESTIMULACIÓN COGNITIVA 10
2. MARCO TEÓRICO
duración y marca de tiempo), que se almacena semanalmente y posibilita la detección de descen-
sos en el rendimiento antes de que se fortalezcan. Esa es la estructura arquitectónica del panel
del cuidador. El software no realiza diagnósticos; su propósito es proporcionar datos objetivos para
respaldar el criterio clínico.
La misma investigación indica un efecto secundario registrado: los serious games funcionan co-
mo una puerta de acceso a la tecnología digital para personas que, de otro modo, no se acercarían
a ella. El formato lúdico disminuye la presión relacionada con el temor a equivocarse, lo que facilita
que un usuario sin experiencia anterior pueda terminar varias sesiones sin problemas. MenteActiva
supone que para gran parte de sus usuarios será la primera aplicación que usan regularmente.
2.6 ACCESIBILIDAD WEB Y WCAG 2.1
La accesibilidad web se rige por las Web Content Accessibility Guidelines (WCAG), publicadas
por el W3C. La versión vigente es WCAG 2.1, actualizada en 2025 con erratas sin cambios estruc-
turales [21]. WCAG 2.2 ya está publicada, pero la 2.1 sigue siendo la referencia que adoptan la
mayoría de proyectos europeos por su alineación con la directiva (UE) 2016/2102.
2.6.1 Los cuatro principios POUR
WCAG 2.1 organiza sus criterios en cuatro principios:
Perceptible: La información debe presentarse de modo que los usuarios puedan percibirla;
cubre contraste mínimo, texto adaptable y alternativas textuales.
Operable: Los componentes deben poder usarse; cubre el acceso completo por teclado y
mecanismos de navegación claros.
Comprensible: La información debe ser entendible; cubre legibilidad y comportamiento pre-
decible.
Robusto: El contenido debe poder ser interpretado por una variedad amplia de agentes de
usuario, cubriendo HTML válido y uso correcto de ARIA.
Los criterios se agrupan en tres niveles: A (mínimo), AA (estándar de referencia) y AAA. El nivel
AA es el exigido por la regulación europea y el objetivo de este proyecto.
2.6.2 Criterios AA relevantes para personas mayores
La intersección entre WCAG 2.1 nivel AA y la literatura sobre accesibilidad en personas mayores
[9, 22, 23, 26] identifica los criterios que condicionan el diseño de MenteActiva:
2.6. ACCESIBILIDAD WEB Y WCAG 2.1 11
2. MARCO TEÓRICO
Contraste mínimo (1.4.3 AA). Ratio de al menos 4,5:1 para texto normal. La sensibilidad al
contraste disminuye con la edad; MenteActiva trabaja con ratios muy por encima del mínimo,
como se detalla en la sección 5.7.
Redimensionar texto (1.4.4 AA). El texto debe poder escalarse hasta el 200 % sin pérdida
de funcionalidad.
Contenido sin pérdida ante el reflujo (1.4.10 AA). El contenido debe adaptarse a un view-
port de 320 píxeles sin scroll en dos direcciones.
Espaciado de texto (1.4.12 AA). Cuando el usuario aplica espaciado adicional, no debe
perderse funcionalidad.
Tamaño del objetivo (2.5.5, AAA en WCAG 2.1, AA en 2.2). Los objetivos pulsables deben
medir al menos 44×44 píxeles CSS [22, 26].
Etiquetas e información de errores (3.3.2 A y 3.3.3 AA). Los formularios deben ofrecer
etiquetas claras y sugerir cómo corregir los errores.
Análisis sintáctico y nombre-función-valor (4.1.1 A y 4.1.2 A). El marcado HTML debe
ser válido y los componentes deben exponer nombre, función y valor de forma programática.
Radix UI a través de shadcn/ui resuelve ambos de forma nativa.
2.6.3 Barreras específicas del perfil objetivo
Los trabajos de Hawthorn [22] identificaron hace tres décadas las barreras que la edad introdu-
ce en la interacción digital.Las categorías continúan siendo las mismas. Las alteraciones visuales
requieren tipografías grandes y con un contraste adecuado. Para que ocurran cambios motores,
se necesitan áreas táctiles amplias y la ausencia de gestos complejos. Las restricciones cognitivas
sugieren el uso de una única tarea por pantalla y directrices breves. Los factores en la actitud, se-
gún se documenta en Barnard [8], explican por qué el PIN de cuatro cifras es superior a cualquier
otro sistema de autenticación tradicional. Estas categorías están confirmadas por investigaciones
recientes de Massimi [26] y Salman [23], que las han perfeccionado a partir del smartphone como
dispositivo principal. La sección 5.7 explica cómo se convierte cada barrera en una decisión de
diseño.
2.6. ACCESIBILIDAD WEB Y WCAG 2.1 12
3 ANTECEDENTES Y ESTADO DEL ARTE
Este capítulo ofrece un análisis crítico del estado actual de la estimulación cognitiva digital,
ubicando a MenteActiva en el ecosistema. Se revisan las tres plataformas de comercio con más
penetración (BrainHQ, Lumosity y CogniFit), el proyecto académico español VIRTRA-EL, y se con-
cluye con un estudio comparativo.
3.1 PLATAFORMAS COMERCIALES DE ESTIMULACIÓN COGNITIVA DIGITAL
El ámbito de las tecnologías digitales utilizadas para el entrenamiento cognitivo se enfoca en un
número limitado de plataformas transnacionales. En el uso diario a gran escala, sobresalen sobre
todo tres: BrainHQ, CogniFit y Lumosity. Los tres utilizan el modelo freemium basado en suscripción,
pero se distinguen significativamente entre sí en los términos de la rigurosidad científica de sus
validaciones y del enfoque que dan a su diseño.
CogniFit
CogniFit brinda más de sesenta minijuegos en ambientes separados para familias, investiga-
dores, médicos y personas individuales. El precio para los individuos es 19,99 C mensuales o
119,99 C al año.
Pese a que la modalidad familiar tiene como objetivo permitir que un tutor supervise las activi-
dades de un adulto, en realidad es diferente. Luego de la pasarela de pago, el análisis de métricas
a largo plazo queda bloqueado; y para el flujo de alta, se requiere una dirección electrónica, una
contraseña segura y varias casillas que deben ser aceptadas. Esta fricción representa un obstáculo
infranqueable para los ancianos que no tienen habilidades tecnológicas, es decir, las dificultades de
adopción que Barnard y sus colaboradores identificaron [8].
La interfaz visual no se ajusta a lo que necesita el grupo de personas mayores: tiene letras
pequeñas, pantallas con mucha información y cambios rápidos. Petrovˇ ciˇ c et al. apuntan que estas
omisiones son uno de los errores más comunes en las herramientas teóricamente dirigidas a la
población senior [24].
Lumosity
Lumosity, que fue creada en 2007 por Lumos Labs, ha alcanzado más de cien millones de ins-
cripciones a nivel mundial. Su catálogo tiene más de 40 títulos con un precio mensual de 11,99 $/mes,
anual de 59,99 $ o vitalicio de 299,95 $.
3. ANTECEDENTES Y ESTADO DEL ARTE 13
3. ANTECEDENTES Y ESTADO DEL ARTE
Sus dinámicas son competitivas: sistemas de medallas, métricas comparativas y bonificaciones
por racha. Esto es efectivo para mantener a la audiencia joven, pero perjudicial para los usuarios
que tienen dificultades con la agudeza visual o son sensibles a ser sobreestimulados. No hay un
módulo de monitoreo para los cuidadores. La FTC sancionó a Lumos Labs con dos millones de
dólares en 2016 debido a que la compañía había hecho afirmaciones publicitarias falsas sobre sus
juegos, los cuales supuestamente podían demorar el deterioro cognitivo.
BrainHQ
BrainHQ, de Posit Science, es la herramienta que cuenta con el mayor apoyo basado en la ex-
periencia. Sus ejercicios provienen de paradigmas neuropsicológicos de laboratorio y tienen como
base el macroestudio ACTIVE, que es el seguimiento más extenso conocido sobre entrenamiento
cognitivo en la vejez. Se proporciona de manera gratuita por medio de pólizas de seguros médicos
privados en América del Norte.
Su punto débil es la monitorización para cuidadores: existe, pero solo a través de portales
corporativos para entidades sanitarias. Un familiar que quiera revisar la evolución de un mayor
desde casa no tiene acceso a esa funcionalidad.
Las tres plataformas tienen bases técnicas y empíricas sólidas. El problema es que ninguna
resuelve el escenario de un mayor en casa, sin competencias digitales, que necesita una herra-
mienta usable de forma independiente con un familiar que pueda revisar sus métricas sin pagar
más ni usar portales clínicos. Los estudios de revisión de Wang y colaboradores constatan que este
distanciamiento del diseño respecto al usuario mayor es una constante estructural en el mercado
actual [25].
3.2 PLATAFORMAS DE INVESTIGACIÓN: VIRTRA-EL
VIRTRA-EL es el precedente académico español más próximo a MenteActiva. Fue diseñado
por un equipo multidisciplinar de la Universidad de Granada (María José Rodríguez-Fórtiz, Car-
los Rodríguez-Domínguez, Pedro Cano, Juan Revelles, María Luisa Rodríguez-Almendros, María
Visitación Hurtado-Torres y Sandra Rute-Pérez) y presentado en 2016 en la 4th IEEE SeGAH en
Orlando [27].
Arquitectura y enfoque
VIRTRA-EL apostó por una solución web en 2016, cuando la tendencia sectorial era la app
nativa. Eso aportaba compatibilidad universal, actualizaciones instantáneas y una única base de
código. Esta filosofía concuerda con la de MenteActiva, a pesar de que las herramientas han varia-
do: En 2016, PHP y jQuery; en 2026, React y Supabase.
El sistema organizaba un portal de diagnóstico cognitivo vinculado a un ambiente de serious
games enfocados en atención, memoria, razonamiento y planificación. Su contribución más inno-
vadora fue la inmersión en mundos en tres dimensiones: el sujeto interactúa en representaciones
3.2. PLATAFORMAS DE INVESTIGACIÓN: VIRTRA-EL 14
3. ANTECEDENTES Y ESTADO DEL ARTE
3D realizando acciones diarias que requieren el empleo simultáneo de diversas funciones ejecuti-
vas [27]. El laboratorio granadino de investigación ha seguido esta línea a través de publicaciones
que analizan cómo personalizar automáticamente las tareas y las dinámicas colaborativas entre los
usuarios.
Delimitación del marco de MenteActiva
MenteActiva toma de VIRTRA-EL la decisión de utilizar arquitectura web, el establecimiento de
mecánicas lúdicas sobre tareas neuropsicológicas consolidadas y la consideración de que ajustar
el nivel de dificultad es un factor esencial, según confirman los estudios más recientes [27, 10].
En los mundos 3D es donde se desvía, ya que estos requieren hardware que no coincide con
la diversidad de dispositivos de los usuarios mayores. Y en el subsistema de diagnóstico neuropsi-
cológico: la emisión de dictámenes sobre salud mental implica consecuencias legales y éticas que
van más allá del alcance de este proyecto.
3.3 ANÁLISIS COMPARATIVO Y POSICIONAMIENTO DE MENTEACTIVA
BrainHQ es el modelo a seguir en cuanto a pruebas científicas. Lumosity se distingue por atraer
a un gran número de personas. CogniFit brinda soluciones para la práctica clínica profesional.
VIRTRA-EL es un símbolo del progreso de la investigación académica en España. El propósito
de este análisis no es determinar una superioridad definitiva, sino evaluar el rendimiento de cada
plataforma en función de las necesidades del usuario independiente en casa.
Plataforma Acceso Interfaz Panel Tecnología Coste
CogniFit Correo + clave +
tokens
Elevada densi-
dad
Sí (Premium) Propietaria 19,99 C/mes
Lumosity Correo + clave Enfoque juvenil
competitivo
No disponible Propietaria 11,99 $/mes
BrainHQ Correo + clave Estilo sobrio uti-
litario
Institucional Propietaria Licencia
VIRTRA-EL Ámbito acadé-
mico
Orientada a ma-
yores
Básico PHP / jQuery No comercial
MenteActiva PIN de 4 dígitos Especializada y
limpia
Sí (Gratuito) React / Supabase Gratuito
Tabla 3.1: Comparativa transversal de soluciones de estimulación cognitiva digital.
En cuanto al método de autenticación, MenteActiva es el único producto que prescinde tanto
del correo electrónico como de las claves alfanuméricas. No hay ninguna de las cuatro opciones
alternativas que solucione el problema de una persona de 75 años que se enfrenta por primera vez
a un formulario de inscripción en línea de forma independiente.
En términos de diseño visual, BrainHQ y VIRTRA-EL tienen una sensibilidad más alta hacia el
usuario en comparación con CogniFit o Lumosity. No obstante, la sobriedad de BrainHQ ignora los
resortes de recompensa que la investigación sobre adherencia considera fundamentales. VIRTRA-
EL los resuelve a través del motor 3D, pero introduce requisitos computacionales que disminuyen
3.3. ANÁLISIS COMPARATIVO Y POSICIONAMIENTO DE MENTEACTIVA 15
3. ANTECEDENTES Y ESTADO DEL ARTE
la gama de terminales compatibles. MenteActiva opta por una vía intermedia: diseño minimalista
utilizando estrategias de refuerzo positivo y evitando cualquier componente que genere distracción.
En cuanto al panel de cuidadores, Lumosity no lo tiene, CogniFit está sujeto a planes de pago,
BrainHQ lo encomienda a portales institucionales y VIRTRA-EL no previó un área para supervisión
remota por parte de familiares no especializados. MenteActiva incorpora esta función de manera
nativa y gratuita, diseñada específicamente para el uso en casa.
Desde el punto de vista del núcleo tecnológico, la distinción entre PHP/jQuery en 2016 y
React/Supabase/Vercel en 2026 no se limita a ser una mejora técnica, sino que también asegura
la sostenibilidad. En el año 2030, una aplicación web construida en 2026 con Supabase y React
puede continuar funcionando sin necesidad de reorganizaciones significativas.
Respecto a la variable económica, MenteActiva es el único espacio sin coste que no tiene
barreras de suscripción. Para el sector envejecido, la barrera va más allá de lo económico: los
procedimientos de suscripción digital requieren operaciones de comercio electrónico que muchos
adultos mayores no llevan a cabo sin supervisión.
MenteActiva no tiene como objetivo sobrepasar la variedad de Lumosity, el alcance clínico de
CogniFit, la capacidad inmersiva de VIRTRA-EL ni el volumen de validación empírica de BrainHQ.
Evaluada exclusivamente por esos criterios, no sería la opción más completa del mercado.
El porcentaje de la población objetivo que es capaz de utilizar la herramienta sin tutoría externa
se considera como el elemento decisivo para tener éxito en este ámbito. Las cuatro plataformas an-
teriores requieren tener una cuenta de correo en funcionamiento, claves memorizadas y, a menudo,
métodos de pago electrónicos en uso.
MenteActiva se crea teniendo en cuenta a una persona de 75 años que vive autónomamente,
no posee identidades en línea anteriores y cuyo entorno familiar requiere supervisar sus actividades
directamente, sin coste alguno y de manera comprensible. Los 32 tests unitarios, la infraestructura
en Vercel, el núcleo React integrado con Supabase y el catálogo de tres ejercicios son los elementos
técnicos requeridos para hacer posible ese objetivo. La originalidad del proyecto está dada por el
contexto social específico que aborda y la consistencia de las decisiones de diseño tomadas para
llevarlo a cabo.
3.3. ANÁLISIS COMPARATIVO Y POSICIONAMIENTO DE MENTEACTIVA 16
4 ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
Antes de iniciar la codificación, este capítulo detalla las necesidades del sistema. Se mantiene
el orden del ciclo de vida estructurado: actores y dominio, flujos BPMN, requisitos no funcionales y
funcionales, y casos de uso.
4.1 MODELADO Y ANÁLISIS DEL DOMINIO
4.1.1 Perspectiva general
MenteActiva tiene dos perfiles con necesidades diferentes: el de los adultos mayores que ejer-
citan sus habilidades cognitivas y el del cuidador que controla su progreso de manera asíncrona.
Los dos tienen acceso a la misma aplicación, pero cada uno tiene una perspectiva independiente.
El enrutamiento protegido del cliente y el mecanismo de validación por PIN son los responsables
de determinar qué interfaz corresponde a cada perfil.
4.1.2 Participantes y actores del ecosistema
El actor principal es el usuario senior. Incluye a personas de 65 años o más, sanas o con DCL,
que utilizan la plataforma para trabajar su memoria visual, memoria secuencial y cálculo aritmético.
El diseño no requiere de conocimientos digitales anteriores.
El supervisor o el familiar lleva a cabo un seguimiento longitudinal sin participar directamente
en las sesiones. Utiliza el mismo PIN del adulto mayor al que asistes para ingresar al Panel del
Cuidador.
Supabase es la entidad tecnológica no humana: ofrece persistencia a través de PostgreSQL y
una API REST que se autogenera. Una caída de Supabase corta la actividad operacional.
4.1.3 Glosario terminológico
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS 17
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
Término Definición
Perfil Fila en users: id (uuid), name, pin (hash bcrypt) y avatar.
Sesión Registro en sessions: user_id, exercise, exercise_name, score, level, duration, crea-
ted_at. Solo se genera si la actividad concluye.
PIN Clave numérica de 4 posiciones. Se procesa en el cliente mediante bcrypt (coste
10) antes del envío. El texto plano nunca llega a la base de datos.
Avatar Elemento gráfico de identidad vinculado a un perfil. Catálogo cerrado de seis ilus-
traciones.
Ejercicio Módulo funcional: memoria-visual, memoria-secuencial o calculo. Lógica de
negocio independiente de la vista.
Nivel Escala de complejidad (1 básico, 2 intermedio, 3 avanzado). Modifica elementos
interactivos, longitud de cadena u operadores.
Puntuación Métrica entera (score) que cuantifica el desempeño. No admite valores negativos.
Ruta protegida Endpoint cuya renderización requiere sesión válida. ProtectedRoute verifica
sessionStorage y redirige a /acceso si falta.
Sesión autenticada Estado donde sessionStorage expone menteactiva_authenticated_user. Se
activa tras el PIN y se purga al cerrar la pestaña.
Panel de Cuidador Interfaz en /cuidador: cuatro KPIs, tres gráficas de Recharts y las seis sesiones
más recientes.
Tabla 4.1: Glosario de términos del dominio.
4.1.4 Límites y alcance del sistema
MenteActiva excluye: diagnóstico clínico o emisión de informes médicos, canales de comuni-
cación interpersonal, alertas automáticas, conectividad con sistemas hospitalarios bajo HL7 FHIR,
y sistemas de pago. Estas exclusiones responden a un acotamiento estratégico: algunas de es-
tas funciones exigirían certificaciones de software sanitario. Las líneas aplazadas se recogen en el
capítulo 8.
4.2 MODELADO DE PROCESOS DE NEGOCIO (BPMN)
Se modelaron dos macroprocesos.
4.2. MODELADO DE PROCESOS DE NEGOCIO (BPMN) 18
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
4.2.1 BPMN-01: Ciclo de una sesión cognitiva
Figura 4.1: Diagrama BPMN del flujo de una sesión cognitiva con los tres actores principales.
El proceso arranca cuando el usuario carga la URL. El frontend lee users de Supabase y mues-
tra los perfiles. Al seleccionar el suyo, el userId se almacena en sessionStorage y se navega a
/pin. validateUserPin() compara con el hash mediante bcrypt.compareSync() y, si coinciden,
la sesión pasa a autenticada. Tras el acceso, el usuario elige juego y nivel; la partida se ejecuta en
el cliente. Al terminar, saveSession()persiste un INSERT en sessions. El cuidador puede acceder
a /cuidador en cualquier momento para revisar el historial.
4.2.2 BPMN-02: Flujo de alta y gestión de perfiles
Figura 4.2: Diagrama BPMN del flujo de creación de perfil con sus pasarelas de validación.
El alta suele iniciarla un familiar. El formulario en /crear-usuario aplica tres validaciones se-
cuenciales: nombre con al menos dos caracteres tras trim(); PIN que cumpla ^\d{4}$; e INSERT
completado sin errores. Antes de la petición, bcrypt.hash(pin, 10) transforma el PIN en el na-
vegador. Si el alta tiene éxito, el perfil queda seleccionado en sessionStoragey se navega a /pin
para la primera autenticación.
4.3 REQUISITOS FUNCIONALES
4.3. REQUISITOS FUNCIONALES 19
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
4.3.1 Tabla de especificación de requisitos funcionales
ID Descripción Prioridad
Bloque 1: Control de acceso, autenticación y gestión de usuarios
RF-01 El sistema proporcionará mecanismos para registrar perfiles nuevos requiriendo nombre, PIN
de 4 posiciones y selección de avatar.
M
RF-02 El sistema inspeccionará que el nombre contenga al menos 2 caracteres tras trim(), notifi-
cando anomalías en pantalla.
M
RF-03 El sistema comprobará que el PIN se ajuste al patrón ^\d{4}$ antes de llamadas al backend. M
RF-04 El sistema transformará la clave en hash bcrypt con coste 10 en el cliente previo al INSERT. M
RF-05 El sistema cargará el catálogo de perfiles en /acceso, leyendo desde users de Supabase. M
RF-06 El sistema permitirá el acceso mediante teclado virtual de 4 posiciones validando con
bcrypt.compareSync().
M
RF-07 El sistema persistirá la condición de autenticado en sessionStorage, limitando su vigencia al
ciclo de la pestaña.
M
RF-08 El sistema interceptará la navegación a URLs protegidas sin credenciales, forzando redirección
a /acceso.
M
Bloque 2: Módulos de estimulación cognitiva y persistencia de métricas
RF-09 El sistema dispondrá de tres juegos cognitivos (memoria visual, retención secuencial y cálculo
matemático) en /ejercicios.
M
RF-10 El sistema integrará tres escalas de complejidad por juego (1, 2, 3), seleccionables antes de
arrancar.
M
RF-11 El sistema implementará la lógica de memoria visual mediante emparejamiento de cartas boca
abajo.
M
RF-12 El sistema estructurará el ejercicio secuencial como Simon, mostrando cadenas lumínicas a
replicar.
M
RF-13 El sistema articulará el módulo de cálculo con operaciones matemáticas y respuestas de se-
lección múltiple.
M
RF-14 El sistema registrará los resultados en sessions con user_id, exercise, score, level, duration y
created_at.
M
RF-15 El sistema desplegará pantalla de resumen al concluir cada juego, con confeti y botones de
reintento.
S
RF-16 El sistema permitirá revisar las últimas cinco sesiones desde el perfil personal. S
Bloque 3: Panel de Cuidador e informes analíticos
RF-17 Se habilitará un panel en /cuidador que estará sujeto a las mismas reglas de control de
acceso.
M
RF-18 El panel resumirá la actividad a través de cuatro indicadores clave de rendimiento (KPI): racha
activa, actividad preferida, nota media y volumen total.
M
RF-19 El panel contendrá tres tipos de gráficos: uno de barras que muestre la actividad semanal, otro
circular que represente la distribución y una serie temporal.
M
RF-20 El panel listará las seis sesiones más recientes con día, tipo, nivel, puntuación y tiempo. S
RF-21 El sistema debería exportar datos a CSV o PDF para consulta por facultativos. W
Tabla 4.2: Matriz de requisitos funcionales del sistema.
4.3.2 Justificación de requisitos específicos
RF-04 (hashing en el cliente): aplicar bcrypt en el navegador antes del INSERT asegura que el
PIN no circule por la red y elimina la necesidad de un endpoint específico. El capítulo 8 examina las
implicaciones.
4.3. REQUISITOS FUNCIONALES 20
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
RF-07 (sessionStorage frente a localStorage): En dispositivos compartidos, el riesgo au-
menta debido a que localStorage mantiene las credenciales hasta que el usuario las elimina. Al
cerrar la pestaña, sessionStorage las elimina.
RF-08 (interceptación de rutas): la ProtectedRoute desvía a /acceso si se intenta acceder
directamente a rutas protegidas sin una sesión, pero no genera errores técnicos.
RF-15 (refuerzo positivo): Según la evidencia presentada en la sección 2.5, los estímulos que
premian de inmediato están relacionados con el retorno del usuario. La única entrada Won’t have
es RF-21: la integración real genera discusiones sobre HL7 FHIR que van más allá del alcance.
4.3.3 Matriz de trazabilidad con casos de uso
Los veinte requisitos implementados (RF-01 a RF-20) tienen correspondencia en trece casos
de uso. La Tabla 4.7 recoge el cruce completo.
4.4 REQUISITOS NO FUNCIONALES
4.4.1 Tabla de especificación de requisitos no funcionales
ID Descripción Prioridad
Bloque 1: Eficiencia de rendimiento y compatibilidad
RNF-01 La carga de /acceso será inferior a 2 s bajo redes 4G moderadas, evaluada con
Lighthouse.
M
RNF-02 El sistema funcionará en las últimas dos versiones estables de Chrome, Firefox,
Safari y Edge sobre Windows, macOS, Android e iOS.
M
RNF-03 La interfaz se reajustará entre 320 px (móvil compacto) y 1920 px sin pérdidas ni
scroll horizontal.
M
Bloque 2: Accesibilidad y usabilidad senior
RNF-04 La interfaz cumplirá WCAG 2.1 nivel AA verificado con Lighthouse y revisión ma-
nual.
M
RNF-05 Todos los elementos interactivos tendrán dimensiones mínimas de 44×44 px CSS. M
RNF-06 El sistema facilitará la navegación completa por teclado y lectores de pantalla
(NVDA, VoiceOver, TalkBack).
S
Bloque 3: Seguridad, robustez y mantenibilidad
RNF-07 Los PIN se guardarán exclusivamente como hashes bcrypt con coste 10, genera-
dos en el cliente. La base nunca almacenará contraseñas legibles.
M
RNF-08 El código superará TypeScript con strict: true y ESLint sin avisos en el build. S
RNF-09 La batería de pruebas con Vitest ofrecerá cobertura superior al 80 % sobre los
módulos núcleo, omitiendo páginas y componentes estéticos.
S
Tabla 4.3: Matriz de requisitos no funcionales del sistema.
4.4. REQUISITOS NO FUNCIONALES 21
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
4.4.2 Análisis de requisitos de calidad seleccionados
RNF-01 (2 segundos): formalizar el umbral previene regresiones por adición futura de depen-
dencias; el CDN de Vercel y el empaquetado de Vite lo garantizan de forma nativa. RNF-04 (95/100
en Lighthouse): un umbral numérico evita la ambigüedad de declarar conformidad WCAG sin respal-
do analítico. RNF-05 (44×44 px): criterio AAA en WCAG 2.1 pero categorizado como Must porque
la pérdida de motricidad fina con la edad lo hace indispensable, y WCAG 2.2 ya lo eleva a AA. RNF-
08 y RNF-09 son Should porque sin tipado estricto y sin pruebas unitarias la evolución del software
a medio plazo queda comprometida.
Tres vectores se excluyeron conscientemente: internacionalización (la plataforma es unilingüe
en castellano), SLA propio (la infraestructura depende de Vercel, que publica sus propias políticas)
y escalabilidad (el stack tiene mecanismos elásticos que superan cualquier estimación razonable
de uso sin tests de carga previos).
4.5 MODELADO DE INTERACCIÓN: CASOS DE USO
4.5. MODELADO DE INTERACCIÓN: CASOS DE USO 22
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
4.5.1 Diagrama de casos de uso general
Figura 4.3: Diagrama UML de casos de uso de MenteActiva.
4.5. MODELADO DE INTERACCIÓN: CASOS DE USO 23
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
4.5.2 Catálogo e interrelación de los casos de uso
ID Nombre Actor RF
CU-01 Crear perfil nuevo Usuario/Familiar RF-01–04
CU-02 Autenticar con PIN Usuario Mayor RF-05–07
CU-03 Cerrar sesión Usuario Mayor RF-07
CU-04 Consultar lista de perfiles Usuario/Familiar RF-05
CU-05 Acceder a ruta protegida Usuario Mayor RF-08
CU-06 Seleccionar ejercicio y nivel Usuario Mayor RF-09–10
CU-07 Jugar memoria visual Usuario Mayor RF-11, 14
CU-08 Jugar memoria secuencial Usuario Mayor RF-12, 14
CU-09 Jugar cálculo básico Usuario Mayor RF-13, 14
CU-10 Visualizar resultado Usuario Mayor RF-15
CU-11 Consultar historial personal Usuario Mayor RF-16
CU-12 Consultar Panel de Cuidador Cuidador RF-17–19
CU-13 Consultar tabla de últimas sesiones Cuidador RF-20
Tabla 4.4: Catálogo de casos de uso del sistema.
CU-07, CU-08 y CU-09 incluyen CU-06: la selección de ejercicio precede obligatoriamente a
cualquier partida. Los tres extienden CU-10: la pantalla de resultados se invoca al terminar. CU-
12 incluye CU-13. CU-02, CU-06–09, CU-11 y CU-12 se subordinan a CU-05 mediante inclusión
transversal.
4.5. MODELADO DE INTERACCIÓN: CASOS DE USO 24
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
4.5.3 Especificación tabular de CU-02: Autenticar con PIN
Campo Contenido
ID CU-02
Nombre Autenticar con PIN
Actor primario Usuario Mayor
Actor secundario Sistema Supabase
Precondiciones El usuario tiene entidad activa en users y está en /acceso.
Postcondiciones (éxito) sessionStorage almacena menteactiva_authenticated_user. Navegación
a /perfil.
Postcondiciones (fallo) sessionStorage no se modifica. El flujo permanece en la pantalla de PIN.
Disparador El usuario pulsa sobre su avatar en /acceso.
Flujo principal 1. Selecciona avatar. 2. Frontend almacena userId y navega a /pin.
3. Muestra teclado numérico. 4. Usuario validateUserPin() ejecuta bcrypt.compareSync(). 6. Devuelve true.
7. Escribe menteactiva_authenticated_user. 8. Navega a /perfil.
Flujo A: PIN incorrecto 6a. Devuelve false. 7a. Muestra error y vacía teclado. 8a. Retorna al paso 4.
Flujo B: Abandona 4b. Pulsa "Volver". 5b. Regresa a /acceso sin modificar sessionStorage.
Excepciones Si Supabase falla al cargar perfiles, muestra error y botón de reintento.
Frecuencia Muy elevada. Compuerta obligatoria de inicio.
Requisitos cubiertos RF-05, RF-06, RF-07
introduce 4 dígitos. 5.
Tabla 4.5: Especificación de CU-02 (Autenticar con PIN).
4.5. MODELADO DE INTERACCIÓN: CASOS DE USO 25
4. ESPECIFICACIÓN E INGENIERÍA DE REQUISITOS
4.5.4 Especificación tabular de CU-07: Jugar memoria visual
Campo Contenido
ID CU-07
Nombre Jugar memoria visual
Actor primario Usuario Mayor
Actor secundario Sistema Supabase
Precondiciones Sesión autenticada (CU-02) y ejercicio seleccionado (CU-06).
Postcondiciones (éxito) Registro en sessions con exercise=’memoria-visual’, score, level, duration. Pantalla pasa a
CU-10.
Postcondiciones (fallo) Si se interrumpe antes de resolverse, no se genera INSERT.
Disparador El usuario pulsa "Empezar".
Flujo principal 1. createDeck(level) genera el mazo. 2. shuffleArray() aleatoriza. 3. Cronómetro
arranca. 4. Usuario destapa primera carta. 5. Destapa segunda; handleCardClick compa-
ra IDs. 6. Si coinciden, quedan resueltas; si no, se voltean tras 1 s. 7. Ciclo hasta completar
todas las parejas. 8. Sistema calcula score e invoca saveSession(). 9. Pasa a CU-10.
Flujo A Si agota intentos sin resolver, calcula score parcial y pasa a CU-10.
Flujo B Si pulsa "Volver", modal solicita confirmación. Si acepta, estado se destruye sin INSERT.
Excepciones Si el INSERT falla, muestra métricas en local y reintenta en segundo plano.
Frecuencia Elevada; uso diario previsto.
Requisitos cubiertos RF-11, RF-14
Tabla 4.6: Especificación de CU-07 (Jugar memoria visual).
4.5.5 Trazabilidad de requisitos funcionales con casos de uso
RF CU RF CU
RF-01 CU-01 RF-12 CU-08
RF-02 CU-01 RF-13 CU-09
RF-03 CU-01 RF-14 CU-07, 08, 09
RF-04 CU-01 RF-15 CU-10
RF-05 CU-02, 04 RF-16 CU-11
RF-06 CU-02 RF-17 CU-12
RF-07 CU-02, 03 RF-18 CU-12
RF-08 CU-05 RF-19 CU-12
RF-09 CU-06 RF-20 CU-13
RF-10 CU-06 RF-21 (No implementado, prioridad W)
RF-11 CU-07
Tabla 4.7: Trazabilidad inversa de requisitos funcionales con casos de uso.
4.5. MODELADO DE INTERACCIÓN: CASOS DE USO 26
5 DISEÑO Y ARQUITECTURA
Este capítulo detalla la configuración técnica y estructural de MenteActiva: arquitectura por ca-
pas, selección tecnológica, distribución modular, modelado UML, modelo relacional y principios de
interfaz.
5.1 ARQUITECTURA EN TRES CAPAS
MenteActiva adopta la distribución clásica en tres niveles: presentación, lógica funcional y al-
macenamiento. Para un sistema con tres mecánicas lúdicas y un módulo de monitorización, de-
sarrollado individualmente, arquitecturas más complejas habrían añadido sobrecarga sin ninguna
ventaja real.
5. DISEÑO Y ARQUITECTURA 27
5. DISEÑO Y ARQUITECTURA
Diagrama de capas
Figura 5.1: Arquitectura en tres capas de MenteActiva.
Capa de presentación
Se ejecuta en el cliente con React, Tailwind CSS y Radix UI. Las vistas residen en src/app/pages
y el enrutamiento en App.tsx. Los elementos reutilizables están en src/app/components, inclu-
yendo los 48 bloques de shadcn/ui y ProtectedRoute. La interfaz no contiene reglas de negocio:
el barajado de cartas, los cómputos de rendimiento, la verificación criptográfica y el guardado de
partidas se delegan a src/app/utils.
5.1. ARQUITECTURA EN TRES CAPAS 28
5. DISEÑO Y ARQUITECTURA
Capa de lógica de negocio
Las reglas residen en src/app/utils: users.ts coordina el alta, la validación del PIN y la
sesión; gameUtils.ts unifica las operaciones de los juegos; stats.ts procesa las métricas; y
avatars.ts centraliza el catálogo de ilustraciones. No hay backend propio porque Supabase pro-
porciona una API REST autogenerada. Las implicaciones de situar el hashing en el cliente se ana-
lizan en el capítulo 8.
Capa de persistencia
Supabase con PostgreSQL, accesible mediante @supabase/supabase-js. El acceso a datos
se reduce a expresiones de una línea. Las restricciones de acceso se delegan a las políticas RLS
de la sección 5.6.
Flujo de control y deuda técnica
El tránsito se da de manera rigurosamente unidireccional: la capa visual convoca a los módulos
lógicos, y estos a su vez convocan al almacenamiento. La lógica puede ser analizada de manera
aislada porque los estratos más bajos no tienen visibilidad sobre los superiores.
Se registran dos compromisos. En primer lugar, la validación solo en el cliente: los filtros RLS
funcionan con USING true en vez de auth.uid(), lo que se considera una deuda técnica. En
segundo lugar, sin gestión de estado global: se emplean los hooks useState y sessionStorage.
Para un sistema que solo tiene una variable global crítica (userId), es suficiente.
5.2 JUSTIFICACIÓN Y SELECCIÓN DEL ECOSISTEMA TECNOLÓGICO
La Tabla 5.1 sintetiza las seis decisiones; a continuación, la argumentación decisiva en cada
caso.
React 18.3 contra Vue 3. Radix UI y shadcn/ui ofrecen 48 componentes que satisfacen de
manera nativa las pautas WCAG 2.1 AA. Recrearlo en Vue habría requerido programar cada com-
ponente de manera personalizada.
Vite 6.3 frente a Next.js. MenteActiva es una SPA sin SEO crítico, sin renderizado en servidor
y con persistencia en Supabase. Añadir Next.js sin aprovechar ninguna de sus ventajas habría sido
sobreingeniería.
Tailwind CSS 4.1 frente a CSS Modules. CSS Modules ralentiza el ciclo con 30 vistas y 48
componentes. Tailwind 4.1 añade soporte nativo de variables oklch.
Supabase frente a Firebase. MenteActiva necesita claves foráneas y agregaciones que en
SQL son triviales. Las políticas RLS en SQL estándar son más auditables que las reglas de Fireba-
se.
5.2. JUSTIFICACIÓN Y SELECCIÓN DEL ECOSISTEMA TECNOLÓGICO 29
5. DISEÑO Y ARQUITECTURA
Vercel frente a Netlify. Las guías oficiales de Vite lo recomiendan como proveedor de referen-
cia, lo que aceleró la puesta en producción.
TypeScript con strict: true. La detección temprana de discrepancias de tipado compensa
la fricción inicial.
Componente Adoptada Descartada Factor determinante
Framework UI React 18.3 Vue 3 Componentes accesibles que están integrados
(Radix UI y shadcn/ui)
Herramienta de build Vite 6.3 Next.js No hay requisitos para SSR o rutas de servidor
Diseño e interfaz Tailwind CSS 4.1 CSS Modules Agilidad en el ciclo de diseño para 48 módulos
Motor de base de datos Supabase Firebase Soporte relacional completo y políticas RLS
Entorno Cloud Vercel Netlify Compatibilidad nativa sugerida en la documenta-
ción de Vite
Lenguaje de programación TypeScript (strict) JavaScript Robustez y prevención de errores en refactoriza-
ciones
Tabla 5.1: Resumen de decisiones tecnológicas con su alternativa no elegida y el motivo decisivo.
5.3 ESTRUCTURA DEL PROYECTO
src/app/pages asigna de manera única archivos a URLs; cualquier modificación en el enru-
tamiento se limita a App.tsx. src/app/components centraliza elementos visuales que pueden ser
reutilizados (se promueven aquí únicamente si son compartidos por dos páginas o más). La fun-
cionalidad computacional del ciclo de vida de React se aísla en src/app/utils, lo que posibilita
validar las funciones sin necesidad de simular la interfaz. La conexión con el backend se concentra
en src/app/lib/supabase.ts.
Convenciones: PascalCase con .tsx para componentes y vistas, camelCase con .ts para
scripts lógicos y mayúsculas para las constantes (TOTAL_QUESTIONS, STEP_MS), PascalCase para
las clases. La semántica es prioritaria para los identificadores: validateUserPin(userId, pin)o
createDeck(pairCount, availableImages) muestran su objetivo sin necesidad de más comen-
tarios.
5.4 DIAGRAMAS DE CLASES
5.3. ESTRUCTURA DEL PROYECTO 30
5. DISEÑO Y ARQUITECTURA
DC-01: Vista general en tres capas
Figura 5.2: Vista general del modelo estático del sistema en tres capas.
Las dependencias direccionales que muestran el sistema de módulos de TypeScript son los
vínculos. El flujo es estrictamente en descenso; las utilidades no tienen visibilidad sobre la presen-
tación, lo cual posibilita el análisis de la lógica sin necesidad de renderizar la interfaz.
5.4. DIAGRAMAS DE CLASES 31
5. DISEÑO Y ARQUITECTURA
DC-02: Jerarquía de juegos
Figura 5.3: Modelo de los tres ejercicios cognitivos con el contrato GameContract.
El núcleo es la interfaz GameContract. Cada ejercicio gestiona su estado con hooks y delega
el procesamiento reutilizable en gameUtils.ts. Los tipos auxiliares son CardItem, Question y
la enumeración GamePhase. La purga de temporizadores asíncronos vive en MemoriaSecuencial
porque opera sobre una referencia ligada a su ciclo de vida. Se omite ProtectedRoute de este
modelado por su simplicidad.
5.5 DIAGRAMAS DE SECUENCIA
5.5. DIAGRAMAS DE SECUENCIA 32
5. DISEÑO Y ARQUITECTURA
DS-01: Autenticación con PIN
Figura 5.4: Flujo de autenticación con PIN, incluyendo caminos de éxito y fallo.
Cubre desde la selección del avatar hasta la redirección a /perfil. validateUserPin() eje-
cuta bcrypt.compareSync(pin, hash) en el navegador: el PIN nunca sale del dispositivo. Los
riesgos del hashing en cliente se analizan en el capítulo 8.
5.5. DIAGRAMAS DE SECUENCIA 33
5. DISEÑO Y ARQUITECTURA
DS-02: Partida de memoria visual
Figura 5.5: Flujo de una partida completa del ejercicio de memoria visual.
5.5. DIAGRAMAS DE SECUENCIA 34
5. DISEÑO Y ARQUITECTURA
El flujo se divide en tres bloques: arranque (mazo con createDecky shuffleArray), núcleo ite-
rativo (comparación de cartas) y cierre (métricas, saveSession() e INSERT). Los flujos de cálculo
y memoria secuencial comparten esta estructura variando solo en la lógica interna.
5.6 MODELO DE DATOS RELACIONAL
Dos tablas en relación 1 : N , protegidas por cuatro políticas RLS. El motor es PostgreSQL 15
orquestado por Supabase.
Esquema completo
6 avatar text NOT NULL ,
7 created _ at timestamp DEFAULT now ()
10-- DE FIN IC ION : Historial de sesiones co gni ti vas
CREATE TABLE sessions (
exercise text NOT NULL ,
exercise _ name text ,
score integer ,
level integer ,
duration integer ,
created _ at timestamp DEFAULT now ()
) ;
1-- DEF IN IC ION : Entidad de usuarios ( perfiles )
2 CREATE TABLE users (
4 name text NOT NULL ,
5 pin text NOT NULL ,
8 ) ;
9
11 12 13 14 15 16 17 18 19 20 21
23 24 25 26 27
29 30
32 33 34 35 36 37
39 40 3 id uuid PRIMARY KEY DEFAULT gen _ random _ uuid () ,
id uuid PRIMARY KEY DEFAULT gen _ random _ uuid () ,
user _ id uuid RE FE REN CE S users ( id ) ON DELETE CASCADE ,
22-- IN TEG RI DAD : R e s t r i c c i o n e s CHECK sobre rangos numericos
ALTER TABLE sessions
ADD C ON STR AI NT score _ non _ negative CHECK ( score >= 0) ,
ADD C ON STR AI NT level _ valid CHECK ( level BETWEEN 1 AND 5) ,
ADD C ON STR AI NT duration _ non _ negative CHECK ( duration >= 0) ;
28-- O P T I M I Z A C I O N : Indice de busqueda por usuario
CREATE INDEX idx _ sessions _ user ON sessions ( user _ id ) ;
31-- SEGURIDAD RLS : Tabla users
ALTER TABLE users ENABLE ROW LEVEL SECURITY ;
CREATE POLICY " Permitir lectura publica de usuarios "
ON public . users FOR SELECT USING ( true ) ;
CREATE POLICY " Permitir creacion publica de usuarios "
ON public . users FOR INSERT WITH CHECK ( true ) ;
38-- SEGURIDAD RLS : Tabla sessions
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY ;
CREATE POLICY " Permitir lectura publica de sesiones "
5.6. MODELO DE DATOS RELACIONAL 35
41 42 43 5. DISEÑO Y ARQUITECTURA
ON public . sessions FOR SELECT USING ( true ) ;
CREATE POLICY " Permitir insercion publica de sesiones "
ON public . sessions FOR INSERT WITH CHECK ( true ) ;
Tabla users
Columna Tipo Restricción Comentario
id uuid PRIMARY KEY Identificador único generado automáticamente en el INSERT.
name text NOT NULL Nombre del usuario, validado en cliente con mínimo 2 caracteres.
pin text NOT NULL Hash bcrypt (coste 10) generado en el cliente; el texto plano nunca
llega a la base.
avatar text NOT NULL Cadena identificativa de la ilustración seleccionada (ej. persona-1).
created_at timestamp DEFAULT now() Marca temporal del alta del perfil.
Tabla 5.2: Descripción de la tabla users.
Los UUID se eligieron porque PostgreSQL los genera de forma nativa y el cliente puede ins-
tanciar claves válidas antes de confirmar el INSERT. El campo pin usa text: la documentación de
PostgreSQL desaconseja char(n) porque rellena con espacios sin ventaja frente a text. La segu-
ridad la garantiza bcrypt con independencia del tipo de columna; por tanto, textes aquí la decisión
correcta, no deuda técnica.
Tabla sessions
Columna Tipo Restricción Comentario
id uuid PRIMARY KEY Identificador único de cada registro.
user_id uuid FK (CASCADE) Vínculo al perfil; el borrado en cascada depura el historial.
exercise text NOT NULL Identificador técnico: memoria-visual, memoria-secuencial o
calculo.
exercise_name text – Literal legible: Memoria Visual, Memoria Secuencial o Cálculo Bá-
sico.
score integer CHECK ≥ 0 Puntuación según las reglas del ejercicio.
level integer CHECK 1–5 Parámetro de dificultad.
duration integer CHECK ≥ 0 Tiempo invertido en segundos.
created_at timestamp DEFAULT now() Marca temporal al concluir el ejercicio.
Tabla 5.3: Descripción de la tabla sessions.
La columna exercise_name es una desnormalización consciente: empaquetar el literal en ca-
da registro evita una consulta contra un catálogo independiente en un sistema monolingüe. Las
restricciones CHECK garantizan la integridad en la capa de persistencia.
5.6. MODELO DE DATOS RELACIONAL 36
5. DISEÑO Y ARQUITECTURA
El índice idx_sessions_user transforma la consulta de historial en búsqueda logarítmica. Las
políticas RLS permiten lectura e inserción desde el cliente (USING true); para vincular cada usuario
solo a sus registros habría que adoptar Supabase Auth con auth.uid(), lo que implicaría sustituir
el PIN por un flujo JWT. Los datos son puntuaciones de estimulación, sin información financiera ni
historiales médicos, y el riesgo se considera asumible. La migración queda como deuda técnica en
el capítulo 8.
Diagrama entidad-relación
Figura 5.6: Modelo entidad-relación de MenteActiva.
5.7 PRINCIPIOS DE DISEÑO DE INTERFAZ
Tipografía y escala
La fuente principal es Inter, diseñada para interfaces digitales. Su x-height elevada mejora la
legibilidad en personas con presbicia. Las variantes OpenType tnumy ss01se activan globalmente.
La escala va de 14 px (texto secundario) a 48 px (encabezados); el cuerpo principal se fija en 18
px, dos por encima de la media habitual.
Sistema de color en oklch
Los tokens CSS usan oklch(L C h), que modela el espacio de color como lo percibe el ojo
humano. La paleta tiene cuatro familias con diez pasos.
5.7. PRINCIPIOS DE DISEÑO DE INTERFAZ 37
5. DISEÑO Y ARQUITECTURA
Combinación Ratio Mínimo AA Margen
Texto principal (slate-900
sobre white)
Texto secundario (slate-600
sobre white)
Texto sobre botón primario
(white sobre blue-600)
Texto sobre tarjeta (slate-900
sobre slate-50)
16,1:1 4,5:1 +260 %
7,2:1 4,5:1 +60 %
5,8:1 4,5:1 +29 %
15,4:1 4,5:1 +242 %
Tabla 5.4: Ratios de contraste medidos frente a las pautas WCAG 2.1 AA.
Interacción, movimiento y alcance
Todos los objetivos pulsables miden al menos 44×44 px CSS. Las cartas tienen lado mínimo
de 72 px en móvil y 120 px en escritorio; los avatares miden 96×96 px. La separación mínima entre
objetivos es 8 px, que sube a 16 px en pantallas críticas.
La regla más estricta es una sola tarea por pantalla. Cada pantalla tiene una única acción
principal y los componentes auxiliares ocupan posiciones fijas en todas las vistas.
Framer Motion se usa con criterio restrictivo: transiciones de entrada y salida (200–300 ms),
feedback táctil al pulsar y confeti al completar. El sistema respeta prefers-reduced-motion: las
transiciones se vuelven instantáneas y el confeti se reemplaza por mensaje de texto. No existe el
modo oscuro porque para las personas con presbicia, un texto oscuro sobre fondo claro es más fácil
de leer, y mantener otro esquema de color habría duplicado el costo de mantenimiento sin aportar
ventajas para el perfil objetivo.
5.7. PRINCIPIOS DE DISEÑO DE INTERFAZ 38
6 DESARROLLO E IMPLEMENTACIÓN
La construcción del sistema utilizando código real se documenta en este capítulo. La justifica-
ción tecnológica se encuentra en el capítulo previo; en esta sección se exponen los compromisos
contraídos al redactarlo.
6.1 CONFIGURACIÓN DEL ENTORNO DE DESARROLLO
Dependencias del proyecto
El bloque dependenciesincluye todo lo necesario para ejecutar: las versiones 18.3.1 de react
y react-dom, la versión 7 de react-router-dom, la familia @radix-ui/*a través de shadcn/ui, así
como las utilidades combinadas en cn(): class-variance-authority, clsx y tailwind-merge.
Además, están presentes estos: canvas-confetti, recharts, motion, supabase/supabase-js y
bcryptjs.
El bloque devDependencies incluye: el compilador de TypeScript, los complementos de Vite
(@vitejs/plugin-react, @tailwindcss/vite), el conjunto de pruebas (que comprende a vitest,
jsdom y @testing-library/react) y la cadena de ESLint.
Scripts de ejecución
Scripts en package.json:
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview",
"test": "vitest",
"lint": "eslint . --report-unused-disable-directives --max-warnings 0"
}
dev inicia el servidor con recarga en caliente, build produce el paquete de producción, test
lleva a cabo Vitest y lint ejecuta ESLint con –max-warnings 0. En el estado final del proyecto,
npm run lintse ejecuta sin errores. Una aclaración sobre RNF-08: buildes vite buildsin tsc
previo, así que la garantía de ausencia de avisos proviene del IDE y del linter, no del propio proceso
de construcción.
6. DESARROLLO E IMPLEMENTACIÓN 39
6. DESARROLLO E IMPLEMENTACIÓN
Configuración de TypeScript
Contenido de tsconfig.json:
{
"compilerOptions": {
"target": "ESNext",
"useDefineForClassFields": true,
"lib": ["DOM", "DOM.Iterable", "ESNext"],
"allowJs": false,
"skipLibCheck": true,
"esModuleInterop": false,
"allowSyntheticDefaultImports": true,
"strict": true,
"forceConsistentCasingInFileNames": true,
"module": "ESNext",
"moduleResolution": "Node",
"resolveJsonModule": true,
"isolatedModules": true,
"noEmit": true,
"jsx": "react-jsx"
},
"include": ["src"],
"references": [{ "path": "./tsconfig.node.json" }]
}
La pieza central es "strict": true: descarta de raíz errores que solo aparecerían en ejecu-
ción. "noEmit": true indica que TypeScript actúa como verificador; la salida la genera Vite.
Configuración de Vite y de las pruebas
Contenido de vite.config.ts:
import { defineConfig, type PluginOption, type UserConfig } from ’vite’
import tailwindcss from ’@tailwindcss/vite’
import react from ’@vitejs/plugin-react’
import type { InlineConfig } from ’vitest’
interface VitestConfigExport extends UserConfig {
test?: InlineConfig
}
export default defineConfig({
plugins: [
react() as PluginOption,
6.1. CONFIGURACIÓN DEL ENTORNO DE DESARROLLO 40
6. DESARROLLO E IMPLEMENTACIÓN
tailwindcss() as PluginOption,
],
test: {
environment: ’jsdom’,
globals: true,
setupFiles: ’./src/test/setup.ts’,
},
assetsInclude: [’**/*.svg’, ’**/*.csv’],
} as VitestConfigExport)
El plugin de Tailwind 4 reemplaza el flujo PostCSS y suprime tailwind.config.js. El bloque
test establece que Vitest use jsdom como entorno y APIs globales habilitadas.
Linting y variables de entorno
ESLint usa la configuración plana en eslint.config.jse ignora disty src/app/components/ui/.
Plantilla .env.example:
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
Los valores reales viven en .env.local, excluido del repositorio por .gitignore; en produc-
ción los inyecta Vercel.
6.2 INTEGRACIÓN CON SUPABASE
Cliente en src/app/lib/supabase.ts:
import { createClient } from ’@supabase/supabase-js’;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
Tres líneas de operación. Aquí se importa supabase para cualquier módulo que requiera leer
o escribir. La clave se puede ver en las herramientas de desarrollador, pero no es un descuido:
identifica el proyecto sin otorgar permisos. Las políticas RLS determinan quién tiene la capacidad de
escribir o leer. El tipado se gestiona de forma manual con la interfaz UserProfileen users.ts: con
dos tablas, mantener los tipos a mano salió más barato que añadir una herramienta de generación
automática.
Interfaz UserProfile en users.ts:
6.2. INTEGRACIÓN CON SUPABASE 41
6. DESARROLLO E IMPLEMENTACIÓN
export interface UserProfile {
id: string;
name: string;
pin: string;
avatar: string;
createdAt: string;
}
6.3 SISTEMA DE AUTENTICACIÓN
La decisión más discutible del proyecto: nada de correo ni contraseña, solo un PIN de cuatro
dígitos con el hashing en el navegador. Toda la lógica vive en users.tsporque la gestión del usuario
y la de su sesión están demasiado entrelazadas para partirlas sin crear dependencias circulares.
Alta de un perfil
Función createUser:
export async function createUser(
name: string,
pin: string,
avatar: string
): Promise<UserProfile | null> {
const salt = bcrypt.genSaltSync(10);
const hashedPin = bcrypt.hashSync(pin.trim(), salt);
const { data, error } = await supabase
.from(’users’)
.insert({ name: name.trim(), pin: hashedPin, avatar })
.select()
.single();
if (error) { console.error(’Error creating user:’, error); return null; }
return {
id: data.id, name: data.name, pin: data.pin,
avatar: data.avatar, createdAt: data.created_at,
};
}
Cuando la petición sale, el PIN en claro ya no existe: lo que viaja es el hash. El coste 10 dificulta
un ataque de fuerza bruta sin congelar un móvil modesto.
6.3. SISTEMA DE AUTENTICACIÓN 42
6. DESARROLLO E IMPLEMENTACIÓN
Verificación del PIN
Función validateUserPin:
export async function validateUserPin(userId: string, pin: string): Promise<boolean> {
const user = await getUserById(userId);
if (!user) return false;
return bcrypt.compareSync(pin.trim(), user.pin);
}
Todo sucede en el navegador; el PIN tecleado no sale del dispositivo. Lo que este diseño con-
sigue: un atacante que intercepte el tráfico obtiene hashes, nunca un PIN utilizable. Lo que no
resuelve: alguien con acceso al dispositivo puede manipular el código del navegador. Esa defensa
correspondería a las políticas de la base de datos, donde el proyecto asume la deuda documentada
en el capítulo 8.
Dos estados de sesión
Hay dos claves que se pueden distinguir en sessionStorage: menteactiva_selected_user
y menteactiva_authenticated_user. Al pulsar el avatar solo se selecciona un perfil; solo tras
validar el PIN se escribe la clave de usuario autenticado. Separar los estados evita que alguien
seleccione un perfil e intente navegar a una pantalla privada sin teclear el PIN. sessionStoragese
borra al cerrar la pestaña, protección por defecto en entornos compartidos.
Protección de rutas
Componente ProtectedRoute.tsx:
export function ProtectedRoute({ children }: { children: ReactNode }) {
const [user, setUser] = useState<UserProfile | null>(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
async function loadUser() {
const authenticatedUser = await getAuthenticatedUser();
setUser(authenticatedUser);
setLoading(false);
}
loadUser();
}, []);
if (loading) return null;
if (!user) return <Navigate to="/acceso" replace />;
return <>{children}</>;
}
6.3. SISTEMA DE AUTENTICACIÓN 43
6. DESARROLLO E IMPLEMENTACIÓN
Mientras comprueba la sesión devuelve null: pantalla en blanco que evita mostrar la ruta pro-
tegida antes de decidir el permiso. Si no hay usuario, redirige con replace para que el botón de
atrás no vuelva a la ruta protegida.
La pantalla del PIN
Manejador handleNumberClick en Pin.tsx:
const handleNumberClick = useCallback(async (num: string) => {
if (!user) return;
setPin((prev) => { if (prev.length >= 4) return prev; return prev + num; });
setError(’’);
const currentPin = pin + num;
if (currentPin.length === 4) {
const isValid = await validateUserPin(user.id, currentPin);
setTimeout(() => {
if (isValid) {
setAuthenticatedUser(user.id);
clearSelectedUser();
navigate(’/perfil’);
} else {
setError(’PIN incorrecto. Inténtalo de nuevo.’);
setPin(’’);
}
}, 200);
}
}, [user, pin, navigate]);
El código calcula currentPin = pin + num porque setPin programa la actualización para el
siguiente renderizado. El setTimeout de 200 ms da tiempo a que el cuarto dígito se pinte antes de
redirigir o mostrar el error.
El formulario de alta
Validaciones en CrearUsuario.tsx:
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (name.trim().length < 2) { setError(’Introduce un nombre válido.’); return; }
if (!/^\d{4}$/.test(pin)) { setError(’El PIN debe tener 4 cifras.’); return; }
const newUser = await createUser(name, pin, avatar);
if (!newUser) { setError(’No se pudo crear el perfil. Inténtalo de nuevo.’); return; }
setSelectedUser(newUser.id);
navigate(’/pin’);
};
6.3. SISTEMA DE AUTENTICACIÓN 44
6. DESARROLLO E IMPLEMENTACIÓN
Las validaciones cortan en cuanto algo falla. El campo del PIN filtra la entrada en tiempo real con
”). Un alta correcta no autentica por sí sola: el perfil se marca como seleccionado
replace(/\D/g, y se navega a /pin.
6.4 EJERCICIO DE MEMORIA VISUAL
Construcción del mazo
shuffleArray y createDeck en gameUtils.ts:
export function shuffleArray<T>(array: T[]): T[] {
const newArray = [...array];
for (let i = newArray.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
}
return newArray;
}
export function createDeck(pairCount: number, availableImages: string[]): CardItem[] {
const selectedImages = availableImages.slice(0, pairCount);
const deck: CardItem[] = [];
selectedImages.forEach((img, index) => {
deck.push({ id: index * 2, imageId: img, isFlipped: false, isMatched: false });
deck.push({ id: index * 2 + 1, imageId: img, isFlipped: false, isMatched: false });
});
return shuffleArray(deck);
}
shuffleArray implementa Fisher-Yates sobre una copia, sin efectos colaterales. createDeck
crea dos cartas por imagen con la misma imageId e identificadores distintos para que React las
trate como entidades separadas.
El cerrojo contra la concurrencia
Tras levantar la segunda carta hay una pausa antes de voltearlas. Sin protección, un usuario
rápido puede pulsar una tercera carta y romper el estado del juego.
Cerrojo isChecking:
const handleCardClick = (card: CardItem) => {
if (isChecking || card.isFlipped || card.isMatched ||
selectedIds.length >= 2 || completed) {
return;
}
6.4. EJERCICIO DE MEMORIA VISUAL 45
6. DESARROLLO E IMPLEMENTACIÓN
// ... voltea la carta y la añade a la seleccion
};
Este cerrojo fue una corrección, no un acierto de diseño previo. El capítulo de pruebas docu-
menta la incidencia.
Cierre y persistencia
Cuando las parejas resueltas igualan al total, la partida termina y se delega en saveSession
de stats.ts. Separar jugar de guardar permite probar la mecánica sin tocar la base de datos.
6.5 EJERCICIO DE MEMORIA SECUENCIAL
El problema de los temporizadores
Mostrar la secuencia encadena varios setTimeout. Si el usuario abandona la pantalla con
temporizadores pendientes, estos siguen disparándose sobre un componente que ya cambió de
estado.
Referencia de temporizadores y función de limpieza:
const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
const clearTimers = () => {
timers.current.forEach(clearTimeout);
timers.current = [];
};
clearTimers se llama en cada punto donde el juego cambia de rumbo, más un useEffect de
limpieza al desmontar. Vive dentro de MemoriaSecuencial, no en gameUtils.ts, porque opera
sobre una referencia ligada al ciclo de vida del componente. Los valores de temporización (850
ms entre colores, 580 ms encendido, 600 ms de pausa inicial) se ajustaron a mano para que una
persona mayor siga la secuencia sin que el juego se haga tedioso.
Validación de la respuesta
Cada pulso se contrasta con el paso esperado: si coincide, sigue; de lo contrario, la partida
finaliza. Las etapas (idle, showing, player, correct, wrong) aseguran que el usuario solo tiene
la capacidad de presionar en la etapa player; en cambio, durante la etapa showing los botones
están desactivados.
6.6 EJERCICIO DE CÁLCULO
6.5. EJERCICIO DE MEMORIA SECUENCIAL 46
6. DESARROLLO E IMPLEMENTACIÓN
Generación de operaciones por nivel
En fácil solo hay sumas de una cifra; en medio entran las restas con el minuendo siempre
mayor; en difícil se añade la multiplicación. El salto de dificultad está en el tipo de operación y el
tamaño de los números, no en la cantidad de preguntas (TOTAL_QUESTIONS = 10).
El problema de las respuestas falsas
generateOptions con filtro de positivos:
export function generateOptions(answer: number,
difficulty: ’facil’ | ’medio’ | ’dificil’): number[] {
const spread = difficulty === ’facil’ ? 5 : difficulty === ’medio’ ? 10 : 20;
const optionsSet = new Set<number>([answer]);
while (optionsSet.size < 4) {
const offset = Math.floor(Math.random() * (spread * 2)) - spread;
const option = answer + offset;
if (option > 0 && !optionsSet.has(option)) { optionsSet.add(option); }
}
return shuffleArray(Array.from(optionsSet));
}
La condición option > 0 soluciona el problema: en la versión inicial, los distractores podían
ser negativos para las respuestas pequeñas. El módulo incluye también checkCalculation, que es
parte de la serie de pruebas.
Cierre y puntuación
El ejercicio concluye al responder la décima pregunta y continúa con saveSession. La puntua-
ción equivale al número de aciertos sobre diez y el nivel se convierte a un entero (1, 2 o 3) para
almacenarlo de manera uniforme con los demás ejercicios.
6.7 PERFIL DEL USUARIO E HISTORIAL
Cuando se monta, Perfil.tsx obtiene las estadísticas y el usuario, además de suscribirse al
evento focus de la ventana para actualizarse al regresar de un ejercicio.
Cálculo del nivel por número de sesiones:
function getLevel(sessions: Session[]): number {
if (sessions.length >= 30) return 5;
if (sessions.length >= 20) return 4;
if (sessions.length >= 10) return 3;
if (sessions.length >= 5) return 2;
return 1;
6.7. PERFIL DEL USUARIO E HISTORIAL 47
6. DESARROLLO E IMPLEMENTACIÓN
}
El número de sesiones terminadas, no la puntuación, determina el nivel. Premiar la constancia
está vinculado con lo que se ha demostrado en el capítulo 2 acerca de la adherencia: si un sistema
subiera de nivel por puntuación, penalizaría a aquel usuario que tuviera un mal día. Se suman los
minutos totales usando un reduce, los días activos se almacenan en un conjunto de fechas y el
historial reciente está compuesto por las ocho sesiones más recientes. La pantalla no se comunica
directamente con la base de datos; todos estos cálculos son realizados a partir de lo proporcionado
por stats.ts.
6.8 PANEL DEL CUIDADOR
Dónde vive la lógica de agregación
stats.tsquedó con tres funciones de acceso a datos (getStats, saveSession, clearStats).
La transformación de sesiones en datos para graficar acabó dentro del archivo PanelCuidador.tsx:
buildWeeklyData, buildExercisePie y buildScoreHistory producen la estructura exacta que
esperan los componentes de Recharts. Sacarlas a stats.ts habría acoplado la capa de datos a
una decisión de presentación.
Las tres transformaciones
buildWeeklyData en PanelCuidador.tsx:
function buildWeeklyData(sessions: Session[]) {
return Array.from({ length: 7 }, (_, i) => {
const day = new Date(Date.now() - (6 - i) * 86400000);
const dateStr = day.toISOString().slice(0, 10);
const count = sessions.filter(
(s) => s.date.slice(0, 10) === dateStr
).length;
return {
dia: day.toLocaleDateString(’es-ES’, { weekday: ’short’ }),
sesiones: count,
};
});
}
Genera siete posiciones calculando cada fecha hacia atrás y contando sesiones. El reparto por
ejercicio agrupa por nombre para un gráfico de tarta; la evolución toma las últimas catorce sesiones.
El patrón de carga de datos, antes duplicado entre Perfil.tsx y PanelCuidador.tsx, se extrajo
a un hook compartido (useUserStats).
6.8. PANEL DEL CUIDADOR 48
6. DESARROLLO E IMPLEMENTACIÓN
Al pie de la pantalla, una nota advierte de que la información es orientativa y sin valor clínico, y
que la herramienta no sustituye la evaluación de un profesional.
6.9 DESPLIEGUE
El código reside en GitHub; además, Vercel compila y publica cada modificación de la rama prin-
cipal. Las aplicaciones de una sola página presentan un problema conocido: rutas como /perfil
no corresponden a archivos del servidor, por lo que si se recargan, se obtiene un 404. La solución:
vercel.json:
{
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
6.9. DESPLIEGUE 49
ENSIS
NI
7 PRUEBAS
La comprobación del sistema, luego de ser implementado, es el tema de este capítulo. Cada
sección detalla lo que se decidió verificar, lo que no se pudo comprobar y las razones, así como los
hallazgos de las pruebas que el desarrollo no había anticipado.
7.1 ESTRATEGIA DE TESTING
La verificación se basa en cuatro áreas: pruebas funcionales manuales sobre la versión desple-
gada, auditorías de accesibilidad y rendimiento mediante Lighthouse, compatibilidad entre navega-
dores utilizando Playwright y pruebas unitarias automatizadas acerca de la lógica empresarial.
El trabajo automatizado se enfocó en la lógica pura del cliente: mezclar las cartas, producir
respuestas de cálculo, mapear sesiones y validar el PIN. Esa lógica está en src/app/utils espe-
cíficamente para que se pueda probar sin abrir el navegador o conectarse a la red.
Los exámenes de extremo a extremo no están incluidos en la suite. Un test de extremo a ex-
tremo confiable requiere la preparación de datos para pruebas, la administración de tiempos de
espera y el mantenimiento de la suite frente a modificaciones en la interfaz. Este es un precio que
se optó por no afrontar en esta iteración y que se menciona como línea de trabajo para el futuro en
el capítulo 8. Playwright se empleó para asegurar la compatibilidad entre los motores de navegador,
no para pruebas funcionales completas.
Objetivo de cobertura
El RNF-09 pedía cobertura superior al 80 % sobre los módulos núcleo. La cobertura global del
proyecto es del 4,63 %, valor que no refleja la realidad porque incluye páginas y componentes de
interfaz excluidos deliberadamente; sobre los cuatro módulos específicos verificados, la cobertura
supera el 96 % en todos los casos.
7.2 TESTS UNITARIOS: LÓGICA DE JUEGOS
gameUtils.test.ts reúne diecisiete tests sobre las cuatro funciones puras de los tres ejerci-
cios: shuffleArray, createDeck, generateOptions y checkCalculation.
7. PRUEBAS 51
7. PRUEBAS
Barajado de Fisher-Yates
Cuatro tests cubren shuffleArray: que conserva la longitud, que contiene los mismos ele-
mentos, que no muta el array de entrada, y que dos ejecuciones sucesivas producen ordenaciones
distintas.
it(’no debe mutar el array original’, () => {
const original = [...data];
shuffleArray(data);
expect(data).toEqual(original);
});
El test de no mutación es el más valioso: una función de barajado que altera su entrada genera
errores difíciles de rastrear porque el fallo aparece lejos de donde se originó.
Construcción del mazo
Cinco tests cubren createDeck: que el mazo tiene el doble de cartas que parejas solicitadas,
que todas nacen sin voltear y sin emparejar, que cada imagen aparece exactamente dos veces, y
que los identificadores son únicos.
it(’cada imageId debe aparecer exactamente dos veces’, () => {
const deck = createDeck(3, images);
const counts = deck.reduce((acc, card) => {
acc[card.imageId] = (acc[card.imageId] || 0) + 1;
return acc;
}, {} as Record<string, number>);
Object.values(counts).forEach(count => expect(count).toBe(2));
});
Generación de opciones de cálculo
Cuatro tests cubren generateOptions: que devuelve cuatro opciones, que la respuesta correc-
ta está siempre entre ellas, que no hay opciones repetidas, y que ninguna es negativa.
it(’no debe generar números negativos’, () => {
const options = generateOptions(1, ’facil’);
options.forEach(opt => expect(opt).toBeGreaterThan(0));
});
Este test cubre directamente el tercer defecto documentado en la sección 7.9.
7.2. TESTS UNITARIOS: LÓGICA DE JUEGOS 52
7. PRUEBAS
Validación de operaciones
Cuatro tests cubren checkCalculation: suma, resta y multiplicación correctas, y un caso inco-
rrecto que debe devolver falso.
7.3 TESTS UNITARIOS: ESTADÍSTICAS
stats.test.ts contiene seis tests sobre stats.ts. La conexión con Supabase se sustituye
por un objeto simulado:
const mockFrom = vi.fn();
vi.mock(’../app/lib/supabase’, () => ({
supabase: { from: (...args: unknown[]) => mockFrom(...args) },
}));
Los seis tests cubren los tres caminos de getStats y las tres funciones del módulo.
it(’getStats mapea las filas de Supabase y calcula highScores con Math.max’, async () => {
const result = await getStats(’user-1’);
expect(result.highScores[’calculo’]).toBe(100);
expect(result.highScores[’memoria-visual’]).toBe(60);
Archivo Stmts Branch Funcs Lines
gameUtils.ts 100 % 94,11 % 100 % 100 %
Pin.tsx 100 % 91,89 % 60 % 100 %
ProtectedRoute.tsx 100 % 100 % 100 % 100 %
});
Cobertura por archivo
stats.ts 96,03 % 70,58 % 100 % 96,03 %
Tabla 7.1: Cobertura de los módulos incluidos en la suite de pruebas unitarias.
El 60 % de funciones en Pin.tsx corresponde a manejadores auxiliares de interfaz que no
intervienen en la lógica de validación; la lógica crítica queda cubierta al 100 % de líneas. La suite
pasa los 32 tests sin fallos.
7.4 TESTS DE AUTENTICACIÓN Y PIN
Pin.test.tsx contiene seis tests que renderizan el componente Pin completo con las funcio-
nes de users.ts sustituidas por dobles de prueba:
vi.mock(’../app/utils/users’, () => ({
getSelectedUser: vi.fn(),
7.3. TESTS UNITARIOS: ESTADÍSTICAS 53
7. PRUEBAS
validateUserPin: vi.fn(),
setAuthenticatedUser: vi.fn(),
clearSelectedUser: vi.fn(),
}));
Los seis tests cubren: redirección si no hay usuario seleccionado, visualización del nombre,
límite de cuatro dígitos, PIN incorrecto (muestra error sin autenticar), PIN correcto (autentica y
navega), y borrado de dígitos.
it(’no permite más de 4 dígitos’, ...
typeDigits(’12345’);
await waitFor(() =>
expect(users.validateUserPin).toHaveBeenCalledWith(’u1’, ’1234’));
7.5 TESTS DE CONTROL DE ACCESO
ProtectedRoute.test.tsx contiene tres tests: durante la comprobación no se muestra nada,
con sesión válida se renderiza el contenido, y sin sesión se redirige a /acceso.
it(’no muestra nada mientras comprueba la sesión’, () => {
vi.mocked(users.getAuthenticatedUser).mockReturnValue(new Promise(() => {}));
renderProtected();
expect(screen.queryByText(’CHILD-OK’)).not.toBeInTheDocument();
expect(screen.queryByText(’ACCESO-OK’)).not.toBeInTheDocument();
});
El primer test usa una promesa que nunca se resuelve para congelar el componente en el
estado de carga y comprobar que no se filtra ni el contenido protegido ni la redirección.
7.6 PRUEBAS FUNCIONALES MANUALES
Los flujos principales se probaron de forma manual sobre la versión desplegada en producción.
Se recorrieron los flujos completos de alta de perfil, autenticación, ejecución de los tres ejercicios
en sus tres niveles, persistencia y consulta de resultados, y revisión del Panel del Cuidador. En
cada flujo se comprobó tanto el camino correcto como los de error previstos. El comportamiento
observado coincidió con el especificado en los casos de uso del capítulo 4.
Estas pruebas no se llevaron a cabo siguiendo un protocolo formal con usuarios reales que co-
rrespondieran al perfil objetivo. En el transcurso del desarrollo, individuos de edad avanzada dentro
del círculo familiar utilizaron la plataforma de manera independiente, sin que hubiera interrupciones
en el flujo de acceso ni en la realización de las actividades. Esto proporciona una señal práctica
acerca de la factibilidad para el perfil objetivo. El capítulo 8 incluye la validación formal por medio de
7.5. TESTS DE CONTROL DE ACCESO 54
7. PRUEBAS
un protocolo estructurado, que no se realizó en esta iteración y se considera una línea de trabajo
futura.
7.7 COMPATIBILIDAD ENTRE NAVEGADORES
Pantallas Modo Chromium Firefox WebKit
Públicas (inicio, acceso, alta, info) Anónimo OK OK OK
Ejercicios y paneles autenticados Autenticado OK OK OK
La compatibilidad se comprobó con Playwright en Chromium, Firefox y WebKit sobre las once
rutas. Las rutas protegidas se probaron con sesión autenticada previamente establecida.
/ejercicios Autenticado OK OK Aviso
Tabla 7.2: Resultado de la comprobación de compatibilidad por motor de navegador.
De las treinta combinaciones, veintinueve se cargaron sin incidencias. La excepción fue WebKit
al cargar /ejercicios con sesión activa: una petición a Supabase quedó bloqueada por la política
de control de acceso del motor. La pantalla no se rompió visualmente y el resto de la aplicación
siguió operativa, pero es una diferencia real que queda documentada. La resolución queda anotada
como tarea de mantenimiento.
7.8 AUDITORÍA CON LIGHTHOUSE
Ruta Contexto Rend. Acces. B. Prác.
/ Pública 82 95 100
/acceso Pública 85 94 96
/pin Pública 85 94 96
/crear-usuario Pública 92 95 100
/informacion Pública 92 95 100
/ejercicios Autenticado 73 94 100
/memoria-visual Autenticado 94 94 100
/memoria-secuencial Autenticado 95 95 100
/calculo Autenticado 93 94 100
/perfil Autenticado 90 94 100
/cuidador Autenticado 87 95 100
Tabla 7.3: Puntuaciones de Lighthouse por ruta sobre el entorno de producción.
Accesibilidad
En todas las pantallas, la accesibilidad oscila entre 94 y 95. El RNF-04 establecía un límite de
95; las pantallas con 94 no lo logran por un punto. Esta diferencia se refiere a advertencias sobre
atributos aria-label que son considerados redundantes cuando el control ya tiene texto visible
asociado, lo que en esta aplicación equivale a falsos positivos.
7.7. COMPATIBILIDAD ENTRE NAVEGADORES 55
7. PRUEBAS
La auditoría se completó con un análisis manual usando teclado y VoiceOver en macOS. Los
componentes de Radix UI, mediante shadcn/ui, solucionan esta capa de manera nativa; esto per-
mite que las calificaciones permanezcan elevadas y que la evaluación manual no identifique obs-
táculos reales para el uso.
Rendimiento y buenas prácticas
El rendimiento oscila entre 73 y 95 dependiendo de la pantalla, siendo los valores más bajos en
las vistas que incluyen más componentes. Las buenas prácticas están entre el 96 y el 100.
7.9 DEFECTOS DETECTADOS Y CORREGIDOS
Las pruebas sacaron a la luz tres defectos reales durante el desarrollo.
Condición de carrera en memoria visual
La primera versión comparaba dos cartas levantadas y, durante la pausa antes de voltearlas,
nada impedía que el usuario levantara una tercera carta. Esa pulsación rompía el recuento de
parejas y dejaba el tablero en estado inconsistente. La solución fue el cerrojo isChecking, que
bloquea cualquier pulsación mientras una comparación está en curso.
Temporizadores huérfanos en memoria secuencial
Si el usuario abandonaba la pantalla con temporizadores pendientes, estos seguían disparán-
dose sobre un componente que ya había cambiado de estado, provocando colores que se encen-
dían solos. La corrección fue clearTimers, que los cancela en cada punto donde el juego cambia
de rumbo, reforzada con una limpieza al desmontar el componente.
Opciones negativas en el ejercicio de cálculo
La primera versión de generateOptionspodía producir distractores negativos para respuestas
pequeñas. Una resta como tres menos uno podía ofrecer menos dos como opción, sin sentido
en un ejercicio que nunca produce resultados negativos. La corrección fue la condición option >
0. Ninguno de los tres defectos era un error de cálculo o de sintaxis: los tres eran problemas de
comportamiento ante la interacción rápida, que solo afloran cuando alguien usa la aplicación de
una forma que el desarrollo no había anticipado.
7.9. DEFECTOS DETECTADOS Y CORREGIDOS 56
8 CONCLUSIONES Y TRABAJO FUTURO
La memoria se cierra en este capítulo. Examina hasta qué punto los objetivos planteados al
principio se concretaron, analiza con atención las decisiones técnicas que más influyeron en el
resultado, acepta sin evasivas los errores y la carga técnica que supone el proyecto, y traza las
posibles vías futuras.
8.1 GRADO DE CUMPLIMIENTO DE LOS OBJETIVOS
Se ha logrado el objetivo general. MenteActiva se encuentra en producción, disponible a tra-
vés de una dirección web pública, con un panel de seguimiento para el cuidador, tres ejercicios
operativos y un sistema simplificado de acceso.
En relación con los específicos: el OE1, la revisión de la literatura clínica y de accesibilidad,
se abarcaron en los capítulos dos y tres. Se incluyó en el capítulo 4 la especificación de requisitos
con criterios WCAG 2.1 AA, conocida como OE2. La arquitectura modular sobre el OE3, stack
seleccionado, se concretó en el capítulo 5 y se codificó en el 6. El modelo de autenticación por
PIN con hashing bcrypt en cliente, conocido como OE4, se encuentra implementado y registrado
en las partes dedicadas a la autenticación de los capítulos 5 y 6. El OE5, que incluye tres ejercicios
de lógica desacoplada, es el eje central del capítulo 6. El panel de seguimiento para el cuidador,
conocido como OE6, fue resuelto en la sección 6.8.
El OE7 requiere una matización. En el capítulo 7, se realizaron las siguientes tareas de audito-
ría y automatización: 32 pruebas unitarias con un alto nivel de cobertura sobre los módulos núcleo;
auditoría Lighthouse en las once rutas; y compatibilidad con Playwright en 30 combinaciones dife-
rentes de navegadores. La validación del perfil objetivo con usuarios reales mediante un protocolo
formal es la parte que no se trató. La plataforma fue empleada de manera independiente por miem-
bros mayores del núcleo familiar a lo largo del desarrollo, sin que se presentaran problemas en el
ingreso o en los ejercicios, lo cual proporciona una señal práctica de viabilidad, aunque no repre-
senta evidencia sistemática. Se logró el propósito de evaluación técnica, pero queda pendiente la
evaluación formal con los usuarios; es honesto diferenciar entre ambas.
8.2 REFLEXIÓN SOBRE LAS DECISIONES TÉCNICAS
Tres decisiones sobresalieron sobre las otras en el proyecto.
8. CONCLUSIONES Y TRABAJO FUTURO 57
8. CONCLUSIONES Y TRABAJO FUTURO
La inicial es el hashing del PIN con bcrypt en el lado del cliente. Es conveniente aclarar que se
trata de un logro de seguridad, no de una concesión. El PIN en texto plano nunca abandona el nave-
gador del usuario; lo que se transmite por la red y lo que guarda la base de datos es invariablemente
el hash. Si un atacante intercepta el tráfico hacia Supabase, no logra conseguir una credencial que
pueda ser utilizada. La aclaración sincera es que esta defensa protege la información en tránsito,
pero no supone una frontera del lado del servidor.
La segunda es el código PIN de cuatro cifras en lugar de una contraseña convencional. En
papel, una contraseña compleja es más robusta. En la práctica, una credencial que el individuo
olvida o deja de lado en su segundo intento no protege en absoluto, ya que nadie la utiliza. El PIN
es una elección de usabilidad que implica conscientemente aceptar consecuencias en términos de
seguridad. La plataforma gestiona datos de puntuaciones de ejercicios cognitivos y tiende hacia la
usabilidad.
Las políticas RLS permisivas constituyen la tercera categoría. La seguridad a nivel de fila está
activada en la base de datos, aunque las políticas de lectura e inserción funcionan con visibilidad
abierta (USING true). No se trata de un descuido encubierto: es una decisión deliberada, registrada
desde el quinto capítulo, cuyo precio aquí se considera como deuda técnica.
8.3 LIMITACIONES CONOCIDAS DEL SISTEMA
La validación de entrada se realiza en el cliente y no se repite en el servidor. La confianza en
el cliente, no las garantías del backend, es la que sostiene hoy la integridad de los datos cuando se
combinan con las políticas RLS abiertas.
La verificación automática abarca los módulos principales de lógica, pero no la aplicación en
su totalidad. No existen pruebas de extremo a extremo, y las páginas junto con los elementos de la
interfaz no están incluidos en el conjunto de pruebas.
No se realizó una validación con usuarios auténticos del perfil objetivo. La evaluación de la
usabilidad se basa en pruebas manuales internas y en la conformidad con los estándares de acce-
sibilidad, no en el monitoreo de personas mayores que utilizan la herramienta. Es la limitación más
pertinente para el objetivo del proyecto.
8.4 DEUDA TÉCNICA RECONOCIDA
Se resolvieron varios compromisos antes de que se cerrara. El patrón de carga de datos duplica-
dos entre el perfil y el panel del cuidador se extrajo utilizando un gancho compartido (useUserStats).
Se borraron del archivo package.json varios paquetes que no se estaban utilizando. Se eliminó
de la configuración el pseudónimo de imports @/, aunque este había sido configurado, no se utilizó.
Se fortaleció la base de datos con restricciones CHECK en la duración, el nivel y el puntaje, de tal
manera que esos rangos ya no dependen únicamente del cliente.
8.3. LIMITACIONES CONOCIDAS DEL SISTEMA 58
8. CONCLUSIONES Y TRABAJO FUTURO
Una deuda que sigue abierta es la de las políticas RLS permisivas. El proyecto tiene como tarea
más importante la migración a un modelo que se base en auth.uid().
Es importante aclarar que la elección de text para la columna pin no es una deuda técnica.
La documentación de PostgreSQL recomienda no usar char(n) porque ocupa espacios vacíos sin
ofrecer un beneficio en comparación con text. Bcrypt asegura la seguridad sin importar el tipo de
columna.
8.5 LÍNEAS DE TRABAJO FUTURO
La dificultad para adaptarse es la que más se ajusta a la evidencia clínica. Los ejercicios de hoy
brindan tres grados de selección manual. Sería el avance de mayor valor terapéutico un motor que
modificara la complejidad basándose en el historial de sesiones guardado.
La migración a Supabase Auth con políticas RLS fundamentadas en auth.uid() liquidaría la
deuda existente, pero requeriría revisar el flujo de acceso por PIN.
Otros enfoques de menor alcance: exportación del historial a PDF o CSV para que los profe-
sionales lo consulten (el RF-21 se ha pospuesto); integración con sistemas hospitalarios utilizando
HL7 FHIR; internacionalización mediante i18n; y expansión del catálogo de ejercicios para abarcar
más dominios cognitivos.
La línea que cierra el conjunto no es técnica: un análisis con usuarios reales del perfil objetivo,
utilizando un protocolo de pensamiento en voz alta y la escala SUS, que contraste las decisiones
de accesibilidad realizadas durante el desarrollo sobre personas mayores. Es la confirmación que
es necesaria para completar el círculo entre lo que el proyecto se planteó y lo que realmente logra.
8.6 VALORACIÓN PERSONAL
Al iniciar este proyecto, supuse que la parte más complicada sería la técnica: integrar los jue-
gos, establecer la base de datos, desplegar. Me equivoqué. Lo más complicado fue no agregar
elementos que me parecían interesantes y mantener constantemente al usuario para el que estaba
desarrollando en primer lugar. Cuando pensaba en incluir una animación más atractiva o más in-
formación en la pantalla, tenía que tener presente que la persona del otro lado podía ser un adulto
mayor de 75 años sin experiencia previa con aplicaciones.
Aprendí que las pequeñas decisiones tienen un gran peso. El PIN en vez de una contraseña,
únicamente una tarea a la vez por pantalla y botones grandes: ninguna es una ostentación técnica,
pero juntas determinan si el instrumento es útil para su destinatario.
Lo más instructivo fueron los tres errores que hallé durante las pruebas. Ninguno fue un error
de cálculo. Los tres solo se presentaban si alguien utilizaba la aplicación de una manera que yo no
8.5. LÍNEAS DE TRABAJO FUTURO 59
8. CONCLUSIONES Y TRABAJO FUTURO
había anticipado. Me enseñaron que probar no es verificar que el código está funcionando como
esperas, sino averiguar qué hace cuando no lo estás observando.
El CTFG concluye con una plataforma en funcionamiento y desplegada. Además, tengo una
lista de cosas que no realicé y que debería hacer: verificar con usuarios reales, incrementar la
seguridad del servidor, incluir más ejercicios. Me parece más honesto expresarlo con claridad que
presentar un trabajo sin defectos que no existió.
8.6. VALORACIÓN PERSONAL 60
BIBLIOGRAFÍA
[1] Instituto Nacional de Estadística, “Movimiento natural de la población e indicadores
demográficos básicos. año 2023,” Nota de prensa, INE, Madrid, 2024. [Online]. Available:
https://www.ine.es/dyngs/Prensa/es/MNP2023.htm
[2] Organización Mundial de la Salud, “Demencia,” Ficha informativa, OMS, Ginebra, 2025.
[Online]. Available: https://www.who.int/es/news-room/fact-sheets/detail/dementia
[3] Sociedad Española de Neurología, “Impacto sociosanitario de las enfermedades neurológicas
en españa,” SEN, Madrid, 2023. [Online]. Available: https://www.sen.es/noticias-y-actividades/
noticias-sen/3527-impacto-sociosanitario-de-las-enfermedades-neurologicas-en-espana
[4] R. C. Petersen, J. C. Stevens, M. Ganguli, E. G. Tangalos, J. L. Cummings,
and S. T. DeKosky, “Mild cognitive impairment: prevalence and incidence according
to different diagnostic criteria,” PubMed, 2003, pMID 12724250. [Online]. Available:
https://pubmed.ncbi.nlm.nih.gov/12724250/
[5] I. Gómez-Soria, I. Iguacel, A. Aguilar-Latorre, P. Peralta-Marrupe, E. Latorre, J. N.
Cuenca-Zaldívar, and E. Calatayud, “Cognitive stimulation and cognitive results in older
adults: A systematic review and meta-analysis,” Archives of Gerontology and Geriatrics, vol.
104, p. 104807, 2022. [Online]. Available: https://www.sciencedirect.com/science/article/pii/
S0167494322001947
[6] I. D. Saragih, S. I. Tonapa, I. S. Saragih, and B. O. Lee, “Effects of cognitive stimulation
therapy for people with dementia: A systematic review and meta-analysis of rcts,”
International Journal of Nursing Studies, vol. 128, p. 104181, 2022. [Online]. Available:
https://www.sciencedirect.com/science/article/pii/S0020748922000104
[7] I. Gómez-Soria, I. Iguacel, J. N. Cuenca-Zaldívar, P. Peralta-Marrupe, E. Latorre, and
E. Calatayud, “Cognitive stimulation and psychosocial results in older adults: A systematic
review and meta-analysis,” Archives of Gerontology and Geriatrics, 2023. [Online]. Available:
https://doi.org/10.1016/j.archger.2023.105114
[8] Y. Barnard, M. D. Bradley, F. Hodgson, and A. D. Lloyd, “Learning to use new
technologies by older adults: Perceived difficulties, experimentation behaviour and usability,”
Computers in Human Behavior, vol. 29, no. 4, pp. 1715–1724, 2013. [Online]. Available:
https://www.sciencedirect.com/science/article/pii/S0747563213000721
[9] V. Manera, P. D. Petit, A. Derreumaux, I. Orvieto, M. Romagnoli, G. Lyttle, R. David,
and P. H. Robert, “Cognitive screening of older adults using serious games: An
BIBLIOGRAFÍA 61
BIBLIOGRAFÍA
empirical study,” ScienceDirect, 2018, art. S1875952118300326. [Online]. Available:
https://www.sciencedirect.com/science/article/abs/pii/S1875952118300326
[10] S. M. Wang, D. W. Kang, Y. H. Um, S. Kim, C. U. Lee, and H. K. Lim, “Effects of serious
games in older adults with mild cognitive impairment,” Psychiatry Investigation, vol. 21, no. 5,
pp. 449–456, 2024. [Online]. Available: https://pubmed.ncbi.nlm.nih.gov/38810993/
[11] L. Pereira, P. Almeida, and J. Almeida, “User interface based on natural interaction
design for seniors,” Computers in Human Behavior, 2017. [Online]. Available: https:
//www.sciencedirect.com/science/article/abs/pii/S0747563217303230
[12] Y. Stern, “What is cognitive reserve? theory and research application of the reserve concept,”
Journal of the International Neuropsychological Society, vol. 8, no. 3, pp. 448–460, 2002.
[Online]. Available: https://pubmed.ncbi.nlm.nih.gov/11939702/
[13] “Pilot testing cognitive stimulation intervention on older adults’ cognitive function, cognitive self-
efficacy, and sense of happiness,” ScienceDirect, 2024, art. S019745722400020X. [Online].
Available: https://www.sciencedirect.com/science/article/abs/pii/S019745722400020X
[14] “Analysis of the effectiveness of a computerized cognitive stimulation program stratified
by cognitive reserve,” ScienceDirect, 2023, art. S1438887123002492. [Online]. Available:
https://www.sciencedirect.com/science/article/pii/S1438887123002492
[15] “The impact of cognitive training and mental stimulation on cognitive and everyday functioning
of healthy older adults: A systematic review and meta-analysis,” ScienceDirect, 2014,
art. S1568163714000208. [Online]. Available: https://www.sciencedirect.com/science/article/
pii/S1568163714000208
[16] “Effectiveness of cst on cognition, quality of life and neuropsychiatric symptoms,” ScienceDirect,
2022, art. S2291927922001088. [Online]. Available: https://www.sciencedirect.com/science/
article/pii/S2291927922001088
[17] “Estimulación cognitiva digital,” PubMed PMID 34472601, 2021. [Online]. Available:
https://pubmed.ncbi.nlm.nih.gov/34472601/
[18] M. Zyda, “From visual simulation to virtual reality to games,” Computer, vol. 38, no. 9, pp.
25–32, 2005. [Online]. Available: https://ieeexplore.ieee.org/document/1510565/
[19] “A serious game for cognitive stimulation of older people with mild cognitive impairment:
Design and pilot usability study,” ScienceDirect, 2024, art. S2561760524000215. [Online].
Available: https://www.sciencedirect.com/science/article/pii/S2561760524000215
[20] C. C. Abt, Serious Games. New York: Viking Press, 1970.
[21] W3C, “Web content accessibility guidelines (wcag) 2.1 - actualización 2025,” 2025.
[Online]. Available: https://www.w3.org/news/2025/web-content-accessibility-guidelines-wcag-
2-1-updated/
BIBLIOGRAFÍA 62
BIBLIOGRAFÍA
[22] D. Hawthorn, “User interface design for older adults,” Interacting with Computers, vol. 12, no. 5,
pp. 497–522, 1994.
[23] H. M. Salman, W. F. W. Ahmad, and S. Sulaiman, “Improving older adults’ accessibility to the
web using real-time online interactive guides,” International Journal of Human-Computer Stu-
dies, 2022.
[24] D. Petrovˇ ciˇ c, S. Taipale, A. Rogelj, and V. Dolniˇ car, “Design guidelines of mobile apps for older
adults: Systematic review and thematic analysis,” JMIR mHealth and uHealth, 2023. [Online].
Available: https://www.sciencedirect.com/science/article/pii/S2291522223000864
[25] J. Wang et al., “Digital tools for cognitive stimulation in older adults: a systematic
review,” PubMed, 2023, pMID: 37422507. [Online]. Available: https://pubmed.ncbi.nlm.nih.gov/
37422507/
[26] M. Massimi, “Design and evaluation of a mobile user interface for older adults,” Procedia Com-
puter Science, vol. 27, pp. 301–310, 2014.
[27] A. Rodríguez, “Estudio sobre estimulación cognitiva,” Revista de Neurología, 2016.
BIBLIOGRAFÍA 63
ENSIS
NI
Este trabajo presenta MenteActiva, una plataforma web de es-
timulación cognitiva para personas mayores con acceso median-
te PIN de cuatro dígitos, desarrollada en cascada en 150 horas
entre febrero y junio de 2026. La plataforma integra tres ejerci-
cios cognitivos, un panel de rendimiento personal y un módulo
de supervisión para cuidadores, construidos sobre React 18.3,
TypeScript, Supabase y Vercel y verificados mediante 32 tests
unitarios con cobertura del 96–100 % en módulos núcleo, au-
ditorías Lighthouse con puntuaciones de accesibilidad de entre
94 y 95 sobre 100, y Playwright en 30 combinaciones de na-
vegador. El proyecto concluye que es posible implementar una
herramienta gratuita y accesible que cubre el escenario que las
plataformas comerciales no atienden, identificando la migración
a políticas RLS más estrictas y la validación con usuarios reales
como principales líneas de trabajo futuro.
This work presents MenteActiva, a web-based cognitive sti-
mulation platform for older adults providing four-digit PIN access,
developed using a waterfall methodology over 150 hours bet-
ween February and June 2026. The platform integrates three
cognitive exercises, a personal performance dashboard and a ca-
regiver monitoring module, built on React 18.3, TypeScript, Supa-
base and Vercel and verified through 32 unit tests with 96–100 %
coverage on core modules, Lighthouse accessibility audits sco-
ring between 94 and 95 out of 100, and Playwright compatibility
testing across 30 browser combinations. The project concludes
that it is feasible to deliver a free, accessible tool that fills the gap
left unmet by commercial platforms, identifying stricter RLS se-
curity policies and formal user testing as the main directions for
future work.