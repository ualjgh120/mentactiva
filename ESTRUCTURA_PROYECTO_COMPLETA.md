# Estructura Completa del Proyecto — MenteActiva

Este documento refleja la organización del proyecto con una breve descripción de la función de cada archivo y carpeta.

```
menteactiva/
├── dist/                     → Carpeta de distribución con el código optimizado para producción
│   ├── assets/               → Archivos JavaScript y CSS compilados y minificados
│   │   ├── index-BOxnAVdR.js → Lógica principal de la aplicación empaquetada
│   │   └── index-DHvyLjTl.css → Estilos globales de la aplicación procesados
│   └── index.html            → Punto de entrada HTML para el despliegue final
├── guidelines/               → Documentación interna sobre estándares del proyecto
│   └── Guidelines.md         → Manual de estilo, componentes y reglas de diseño
├── node_modules/             → Directorio que contiene todas las dependencias y librerías externas
├── public/                   → Recursos estáticos que se copian tal cual al servidor
│   ├── img_inicio.jpg        → Imagen principal de la pantalla de bienvenida
│   ├── info_img.jpg          → Imagen utilizada en la sección de información
│   └── menteactiva-favicon.svg → Icono oficial de la plataforma en formato vectorial
├── src/                      → Código fuente principal de la aplicación
│   ├── app/                  → Núcleo de la lógica React (componentes, rutas, páginas)
│   │   ├── components/       → Piezas de interfaz reutilizables
│   │   │   ├── common/       → Componentes genéricos compartidos por toda la app
│   │   │   │   └── ResponsiveImage.tsx → Componente para carga resiliente de imágenes
│   │   │   ├── ui/           → Biblioteca de componentes visuales (shadcn/ui)
│   │   │   │   ├── accordion.tsx      → Menús desplegables verticales
│   │   │   │   ├── alert-dialog.tsx    → Ventanas de confirmación críticas
│   │   │   │   ├── alert.tsx          → Banners de aviso o información
│   │   │   │   ├── aspect-ratio.tsx   → Control de proporciones de contenedores
│   │   │   │   ├── avatar.tsx          → Representación visual de usuarios
│   │   │   │   ├── badge.tsx          → Etiquetas e indicadores de estado
│   │   │   │   ├── breadcrumb.tsx     → Indicadores de ruta de navegación
│   │   │   │   ├── button.tsx          → Botones interactivos del sistema
│   │   │   │   ├── calendar.tsx        → Selector de fechas interactivo
│   │   │   │   ├── card.tsx            → Contenedores de contenido estructurado
│   │   │   │   ├── carousel.tsx        → Visualizador de contenido deslizable
│   │   │   │   ├── chart.tsx           → Integración base para gráficas Recharts
│   │   │   │   ├── checkbox.tsx        → Inputs de selección múltiple
│   │   │   │   ├── collapsible.tsx     → Contenedores que se expanden/contraen
│   │   │   │   ├── command.tsx         → Paleta de comandos e inputs de búsqueda
│   │   │   │   ├── context-menu.tsx   → Menús de clic derecho personalizados
│   │   │   │   ├── dialog.tsx          → Ventanas modales emergentes
│   │   │   │   ├── drawer.tsx          → Paneles deslizantes laterales o inferiores
│   │   │   │   ├── dropdown-menu.tsx  → Menús de opciones desplegables
│   │   │   │   ├── form.tsx            → Wrappers para validación de formularios
│   │   │   │   ├── hover-card.tsx      → Previsualización al pasar el ratón
│   │   │   │   ├── input-otp.tsx       → Inputs especializados para códigos/PINs
│   │   │   │   ├── input.tsx           → Campos de entrada de texto básicos
│   │   │   │   ├── label.tsx           → Etiquetas asociadas a formularios
│   │   │   │   ├── menubar.tsx         → Barra de menú superior persistente
│   │   │   │   ├── navigation-menu.tsx → Sistema de navegación principal
│   │   │   │   ├── pagination.tsx      → Controles de paginación de listas
│   │   │   │   ├── popover.tsx         → Globos informativos flotantes
│   │   │   │   ├── progress.tsx        → Barras de estado y carga
│   │   │   │   ├── radio-group.tsx     → Selección de opción única entre varias
│   │   │   │   ├── resizable.tsx       → Paneles con tamaño ajustable manualmente
│   │   │   │   ├── scroll-area.tsx     → Contenedores con scroll personalizado
│   │   │   │   ├── select.tsx          → Selectores de opciones tradicionales
│   │   │   │   ├── separator.tsx       → Líneas divisorias de contenido
│   │   │   │   ├── sheet.tsx           → Paneles laterales de gran tamaño
│   │   │   │   ├── sidebar.tsx         → Panel de navegación lateral izquierdo
│   │   │   │   ├── skeleton.tsx        → Marcadores de posición durante la carga
│   │   │   │   ├── slider.tsx          → Controles deslizantes de valores numéricos
│   │   │   │   ├── sonner.tsx          → Notificaciones "toast" emergentes
│   │   │   │   ├── switch.tsx          → Interruptores de estado On/Off
│   │   │   │   ├── table.tsx           → Visualización de datos tabulares
│   │   │   │   ├── tabs.tsx            → Navegación por pestañas internas
│   │   │   │   ├── textarea.tsx        → Campos de texto multilínea
│   │   │   │   ├── toggle-group.tsx    → Grupo de botones de estado persistente
│   │   │   │   ├── toggle.tsx          → Botón de estado binario individual
│   │   │   │   ├── tooltip.tsx         → Mensajes de ayuda breves al foco
│   │   │   │   ├── use-mobile.ts       → Hook para detectar dispositivos móviles
│   │   │   │   └── utils.ts            → Utilidades de estilo (tailwind-merge)
│   │   │   ├── Layout.tsx              → Estructura visual común (Header/Footer)
│   │   │   └── ProtectedRoute.tsx      → Lógica de seguridad para acceso restringido
│   │   ├── lib/              → Configuraciones de librerías externas
│   │   │   └── supabase.ts   → Cliente oficial de conexión con Supabase
│   │   ├── pages/            → Vistas principales de la aplicación
│   │   │   ├── Acceso.tsx           → Selección de perfiles registrados
│   │   │   ├── CalculoBasico.tsx    → Juego de aritmética mental
│   │   │   ├── CrearUsuario.tsx     → Formulario de registro de perfiles
│   │   │   ├── Exercises.tsx        → Selector del tipo de ejercicio
│   │   │   ├── Home.tsx             → Pantalla principal de la plataforma
│   │   │   ├── Informacion.tsx      → Página de ayuda y detalles legales
│   │   │   ├── MemoriaSecuencial.tsx → Juego de repetición de patrones
│   │   │   ├── MemoriaVisual.tsx    → Juego de emparejar cartas
│   │   │   ├── PanelCuidador.tsx    → Analítica detallada para familiares
│   │   │   ├── Perfil.tsx           → Dashboard individual del usuario
│   │   │   └── Pin.tsx              → Pantalla de validación de seguridad
│   │   ├── utils/            → Funciones auxiliares y lógica de negocio
│   │   │   ├── avatars.ts           → Definición visual de iconos de perfil
│   │   │   ├── gameUtils.ts         → Lógica pura de juegos (generación de datos)
│   │   │   ├── stats.ts             → Cálculos de progreso y guardado de sesiones
│   │   │   └── users.ts             → Gestión de usuarios y hasheo de PIN
│   │   ├── App.tsx           → Componente de entrada al árbol de React
│   │   └── routes.tsx        → Configuración de rutas y navegación
│   ├── styles/               → Estilos globales y tokens de diseño
│   │   ├── fonts.css         → Declaración de fuentes tipográficas
│   │   ├── index.css         → Importación de capas base de estilos
│   │   ├── tailwind.css      → Configuración específica de Tailwind CSS
│   │   └── theme.css         → Variables de diseño (colores oklch, espaciados)
│   ├── test/                 → Configuración técnica para pruebas
│   │   └── setup.ts          → Inicialización de entorno para Vitest
│   ├── tests/                → Suite de 38 pruebas automatizadas
│   │   ├── Pin.test.tsx      → Tests de la pantalla de seguridad
│   │   ├── ProtectedRoute.test.tsx → Tests de control de acceso
│   │   ├── gameUtils.test.ts → Tests de la lógica central de juegos
│   │   └── stats.test.ts     → Tests de cálculos de estadísticas
│   ├── main.tsx              → Punto de montaje de la app en el DOM
│   └── vite-env.d.ts         → Tipado para variables de entorno de Vite
├── .env.local                → Claves de conexión con Supabase (Privado)
├── .gitignore                → Archivos excluidos del control de versiones
├── ATTRIBUTIONS.md           → Reconocimiento de autores de recursos externos
├── DOCUMENTACION_TECNICA.md  → Guía completa del desarrollador y académica
├── ESTRUCTURA_PROYECTO_COMPLETA.md → Este inventario técnico
├── index.html                → Plantilla base del documento HTML
├── package-lock.json         → Historial exacto de versiones de dependencias
├── package.json              → Manifiesto del proyecto (scripts y librerías)
├── tsconfig.json             → Reglas de tipado de TypeScript
├── tsconfig.node.json        → Configuración de TypeScript para herramientas Node
├── vercel.json               → Configuración de despliegue para Vercel
└── vite.config.ts            → Configuración unificada de compilador y tests
```
