# Documentación Técnica Completa — MenteActiva

---

## STACK TECNOLÓGICO:

- **Frontend:** React 18.3 + TypeScript (strict mode) + Vite 6.3
- **Estilos:** Tailwind CSS 4.1 (plugin `@tailwindcss/vite`, sin PostCSS manual) + sistema de tokens CSS custom (theme.css con variables oklch)
- **Backend:** Supabase (PostgreSQL + Auth + anon key publicable)
- **Componentes UI:** Radix UI (48 componentes primitivos) + shadcn/ui
- **Animaciones:** Framer Motion (motion/react) + tw-animate-css
- **Efectos visuales:** canvas-confetti (partículas al completar ejercicios)
- **Gráficas:** Recharts (BarChart, LineChart, PieChart)
- **Routing:** React Router DOM 7 (createBrowserRouter)
- **Iconos:** Lucide React 0.487
- **Formularios:** React Hook Form 7.55
- **Despliegue:** Vercel (CI/CD automático desde GitHub, rewrites SPA)
- **Tipado de entorno:** vite-env.d.ts con interfaces ImportMetaEnv para VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY

---

## ESTRUCTURA COMPLETA DEL PROYECTO:

```
menteactiva/
├── .env.local                → Variables de entorno (Supabase URL + anon key)
├── .gitignore                → Excluye node_modules, dist, .env, .env.local, .DS_Store
├── ATTRIBUTIONS.md           → Licencias: shadcn/ui (MIT), Unsplash (media)
├── index.html                → Punto de entrada HTML (lang="es", favicon SVG, #root)
├── package.json              → Nombre: "menteactiva", versión 0.0.1, scripts dev/build/preview
├── package-lock.json         → Lockfile de dependencias (~204KB)
├── postcss.config.mjs        → Vacío: Tailwind v4 gestiona PostCSS automáticamente
├── tsconfig.json             → Target ESNext, strict: true, JSX react-jsx, alias @/ → src/
├── tsconfig.node.json        → Configuración aislada para vite.config.ts
├── vercel.json               → Rewrites: todas las rutas → /index.html (SPA routing)
├── vite.config.ts            → Plugins: react() + tailwindcss(), alias @ → ./src, assetsInclude SVG/CSV
│
├── guidelines/
│   └── Guidelines.md         → Plantilla de reglas de diseño (botones, layouts, accesibilidad)
│
├── public/
│   ├── img_inicio.jpg        → Imagen hero de la página de inicio (~365KB)
│   └── menteactiva-favicon.svg → Favicon SVG del proyecto
│
├── services/
│   └── sessions.ts           → Versión legacy de guardado de sesiones (saveSessionDB, getUserSessions)
│
├── dist/                     → Carpeta de build de producción (generada por `vite build`)
│   ├── index.html            → HTML compilado
│   └── assets/               → JS/CSS optimizados y hasheados
│
└── src/
    ├── main.tsx              → Punto de entrada React: ReactDOM.createRoot + StrictMode + imports de CSS
    ├── vite-env.d.ts         → Declaraciones TypeScript para import.meta.env (VITE_SUPABASE_*)
    │
    ├── styles/
    │   ├── index.css         → Barrel: importa fonts.css + tailwind.css + theme.css
    │   ├── fonts.css         → Definición de @font-face para tipografías del proyecto
    │   ├── tailwind.css      → Entry de Tailwind v4: @import 'tailwindcss' + source scan + tw-animate-css
    │   └── theme.css         → Sistema de diseño: 40+ tokens CSS (colores oklch, radios, tipografía, dark mode)
    │
    └── app/
        ├── App.tsx           → Componente raíz: <RouterProvider router={router} />
        ├── routes.tsx        → createBrowserRouter con Layout como wrapper y 13 rutas (6 protegidas)
        │
        ├── components/
        │   ├── Layout.tsx           → Header sticky con navegación adaptativa (visitante vs autenticado),
        │   │                          menú móvil animado (AnimatePresence), logout, footer con disclaimer
        │   ├── ProtectedRoute.tsx   → HOC: verifica getAuthenticatedUser() → <Navigate to="/acceso"> si null
        │   ├── common/
        │   │   └── ResponsiveImage.tsx → <img> con fallback SVG on error (base64 inline placeholder)
        │   └── ui/                  → 48 componentes shadcn/ui basados en Radix UI:
        │       ├── accordion.tsx      ├── alert-dialog.tsx    ├── alert.tsx
        │       ├── aspect-ratio.tsx   ├── avatar.tsx          ├── badge.tsx
        │       ├── breadcrumb.tsx     ├── button.tsx          ├── calendar.tsx
        │       ├── card.tsx           ├── carousel.tsx        ├── chart.tsx
        │       ├── checkbox.tsx       ├── collapsible.tsx     ├── command.tsx
        │       ├── context-menu.tsx   ├── dialog.tsx          ├── drawer.tsx
        │       ├── dropdown-menu.tsx  ├── form.tsx            ├── hover-card.tsx
        │       ├── input-otp.tsx      ├── input.tsx           ├── label.tsx
        │       ├── menubar.tsx        ├── navigation-menu.tsx ├── pagination.tsx
        │       ├── popover.tsx        ├── progress.tsx        ├── radio-group.tsx
        │       ├── resizable.tsx      ├── scroll-area.tsx     ├── select.tsx
        │       ├── separator.tsx      ├── sheet.tsx           ├── sidebar.tsx
        │       ├── skeleton.tsx       ├── slider.tsx          ├── sonner.tsx
        │       ├── switch.tsx         ├── table.tsx           ├── tabs.tsx
        │       ├── textarea.tsx       ├── toggle-group.tsx    ├── toggle.tsx
        │       ├── tooltip.tsx        ├── use-mobile.ts       └── utils.ts (cn helper)
        │
        ├── lib/
        │   └── supabase.ts          → createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)
        │
        ├── pages/
        │   ├── Acceso.tsx           → Selección de perfil por avatar (grid responsive 2-3 cols)
        │   ├── Pin.tsx              → Teclado numérico virtual PIN 4 dígitos + keydown listener
        │   ├── CrearUsuario.tsx     → Formulario: nombre + PIN (regex ^\d{4}$) + selector avatar emoji
        │   ├── Home.tsx             → Hero con imagen, estadísticas, catálogo de ejercicios, CTA
        │   ├── Exercises.tsx        → Centro de entrenamiento con 3 tarjetas de ejercicio animadas
        │   ├── MemoriaVisual.tsx    → Juego emparejamiento de cartas emoji con 3 niveles
        │   ├── MemoriaSecuencial.tsx → Juego tipo Simón Dice con 4 botones de colores
        │   ├── CalculoBasico.tsx    → Aritmética con selección múltiple y 3 dificultades
        │   ├── Perfil.tsx           → Dashboard personal: nivel, progreso, historial, barras por ejercicio
        │   ├── PanelCuidador.tsx    → Dashboard analítico: 4 KPIs + 3 gráficas Recharts + tabla historial
        │   └── Informacion.tsx      → Página informativa sobre la plataforma
        │
        └── utils/
            ├── users.ts             → CRUD completo de perfiles en Supabase (tabla 'users')
            ├── stats.ts             → Registro y consulta de sesiones (tabla 'sessions')
            └── avatars.ts           → Catálogo de 6 avatares con emoji, label y bgColor
```

---

## MODELO DE DATOS (Supabase/PostgreSQL):

**Tabla `users`:** `id` (uuid PK auto), `created_at` (timestamptz), `name` (text), `pin` (text, 4 dígitos almacenado en plano), `avatar` (text, referencia al id del catálogo de avatares: 'abuela-1', 'abuelo-1', 'persona-1'...).

**Tabla `sessions`:** `id` (uuid PK auto), `created_at` (timestamptz), `user_id` (uuid FK → users.id), `exercise` (text: 'memoria-visual' | 'memoria-secuencial' | 'calculo'), `exercise_name` (text: nombre legible), `score` (integer), `level` (integer), `duration` (integer, minutos).

---

## SISTEMA DE RUTAS (routes.tsx):

| Ruta | Componente | Protegida | Descripción |
|---|---|---|---|
| `/` | `Home` | No | Página de bienvenida con hero, ejercicios y CTA |
| `/acceso` | `Acceso` | No | Selector de perfiles existentes por avatar |
| `/pin` | `Pin` | No | Validación de PIN numérico de 4 dígitos |
| `/crear-usuario` | `CrearUsuario` | No | Registro de nuevo perfil |
| `/ejercicios` | `Exercises` | Sí | Catálogo de los 3 ejercicios disponibles |
| `/memoria-visual` | `MemoriaVisual` | Sí | Juego de emparejamiento de cartas |
| `/memoria-secuencial` | `MemoriaSecuencial` | Sí | Juego tipo Simón Dice |
| `/calculo` | `CalculoBasico` | Sí | Ejercicio de aritmética |
| `/perfil` | `Perfil` | Sí | Dashboard personal del usuario |
| `/cuidador` | `PanelCuidador` | Sí | Panel de seguimiento para familiares |
| `/informacion` | `Informacion` | No | Información sobre la plataforma |

Todas las rutas son hijas de `Layout`, que actúa como wrapper con header, navegación y footer persistentes. Las rutas protegidas usan `<ProtectedRoute>` que verifica `getAuthenticatedUser()` y redirige a `/acceso` si no hay sesión activa.

---

## FUNCIONALIDADES PRINCIPALES:

**Autenticación por PIN de 4 dígitos:** Pantalla `/acceso` carga todos los perfiles de Supabase (tabla `users`) → los muestra en grid con avatar emoji y nombre → al pulsar un perfil, guarda el `userId` en `sessionStorage` (`menteactiva_selected_user`) → navega a `/pin` → teclado numérico virtual con grid 3×4 (1-9, vacío, 0, borrar) + listener `window.keydown` para teclado físico → al completar 4 dígitos, ejecuta `validateUserPin()` que compara pin en plano → si válido: `setAuthenticatedUser(userId)` en `sessionStorage` (`menteactiva_authenticated_user`) + `clearSelectedUser()` + `navigate('/perfil')` → si inválido: muestra error + resetea PIN. `ProtectedRoute` verifica sesión con `getAuthenticatedUser()` (busca userId en `sessionStorage` → `getUserById()` en Supabase) en cada renderizado.

**Creación de perfiles:** Formulario único con 3 campos: nombre (mínimo 2 caracteres), PIN (validación regex `^\d{4}$`, input con `inputMode="numeric"` y `maxLength={4}`, filtra no-dígitos con `replace(/\D/g, '')`), avatar (selector visual de 6 opciones emoji con indicador de selección). Al submit: `createUser(name, pin, avatar)` → INSERT en tabla `users` → `setSelectedUser(newUser.id)` → navega a `/pin` para primer acceso.

**Memoria Visual:** 3 niveles de dificultad (4/6/8 parejas de cartas). `createDeck(pairCount)` genera array de CardItem con `shuffleArray()` (sort random). Estado: `cards: CardItem[]`, `selectedIds: number[]`, `moves: number`, `matches: number`, `isChecking: boolean` (bloqueo UI), `completed: boolean`. Lógica: `handleCardClick()` voltea carta (flipped: true) + añade a selectedIds → `useEffect` detecta `selectedIds.length === 2` → compara valores → si coinciden: `matched: true` + incrementa matches + timeout 700ms → si no coinciden: flip back + timeout 900ms. Al completar todas las parejas: `setCompleted(true)` + `confetti()` con 100 partículas + `saveSession()` a Supabase. Grid responsivo con `gridTemplateColumns: repeat(4, minmax(0, 1fr))`.

**Memoria Secuencial (Simón Dice):** 4 botones de colores (Azul #3B82F6, Verde #22C55E, Amarillo #F59E0B, Rojo #EF4444) con estados normal/lit. Fases: `'idle' | 'showing' | 'player' | 'correct' | 'wrong'`. Demo: `playSequence()` ilumina cada botón 580ms (ON_MS) con pausa de 850ms entre pasos (STEP_MS) y lead de 600ms (LEAD_MS), usando `setTimeout` encadenados almacenados en `useRef<ReturnType<typeof setTimeout>[]>` para cancelación limpia. Input del jugador: `handleButtonPress()` valida elemento a elemento contra `sequence[playerPos]`. Si acierta toda la secuencia: `advanceLevel()` añade un botón aleatorio + `confetti` cada 3 niveles. Si falla: `phase='wrong'` + guarda `saveSession(score = sequence.length - 1)`. `clearTimers()` limpia todos los timeouts pendientes al reiniciar o desmontar componente.

**Cálculo Básico:** 3 niveles de dificultad. Fácil: solo sumas de 1 cifra. Medio: sumas y restas (`−`), resta siempre positiva (`num2 = random * num1`). Difícil: sumas, restas y multiplicaciones (`×`), multiplicación con factores 2-10. `generateOptions(answer, difficulty)` crea 4 opciones únicas: spread variable por dificultad (5/10/20), `Set<number>` para evitar duplicados, filtra negativos (`opt > 0`), fallback fill si no alcanza 4 opciones. 10 preguntas por sesión (`TOTAL_QUESTIONS = 10`). Feedback: mensajes aleatorios de acierto/error con emojis. `Confetti` cada 5 aciertos y al finalizar con ≥80% de aciertos. Al completar: `saveSession()` con score final y nivel mapeado (facil=1, medio=2, dificil=3).

**Perfil de usuario:** Carga datos con `getAuthenticatedUser()` + `getStats(user.id)`. Calcula nivel experiencia: 1-4 sesiones = Principiante, 5-9 = Aprendiz, 10-19 = Intermedio, 20-29 = Avanzado, 30+ = Experto. Barra de progreso al siguiente nivel con `progressToNext = min((sessions.length / (level * 10)) * 100, 100)`. Muestra 4 KPIs (sesiones totales, días activo vía `Set<date.slice(0,10)>`, minutos totales, nivel actual). Barras de progreso por tipo de ejercicio con colores diferenciados (#2563EB memoria visual, #16A34A memoria secuencial, #D97706 cálculo). Historial reciente: últimas 8 sesiones en orden descendente.

**Panel de Cuidador:** Dashboard analítico con 4 KPIs idénticos al perfil + 3 gráficas Recharts: (1) `BarChart` actividad semanal (últimos 7 días, sesiones por día), (2) `PieChart` distribución por tipo de ejercicio (donut chart con innerRadius=50, outerRadius=80), (3) `LineChart` evolución de puntuaciones (últimas 14 sesiones, type="monotone"). Tabla HTML con las 6 sesiones más recientes (fecha formateada `es-ES`, ejercicio, puntuación con badge, duración, nivel). Nota legal de disclaimer en banner ámbar. Auto-refresh con `window.addEventListener('focus', refresh)` para actualizar datos al volver a la pestaña.

**Layout y Navegación:** Header sticky con `backdrop-blur-md` y `bg-white/80`. Navegación adaptativa: visitantes ven 3 ítems (Inicio, Ejercicios, Información), usuarios autenticados ven 5 (+ Mi Perfil, Para Cuidadores). Navegación desktop: barra tipo segmented control con indicador activo azul (#2563EB). Navegación móvil: menú hamburguesa con AnimatePresence (entrada/salida con opacity + height). Botón logout visible solo si autenticado. Footer con logo, disclaimer médico y copyright. `handleProtectedNavigation()` intercepta clics a rutas protegidas y redirige a `/acceso` si no hay sesión.

**Despliegue:** `vercel.json` con rewrites `"source": "/(.*)"` → `"destination": "/index.html"` para que todas las rutas del SPA funcionen sin 404. Build: `vite build` genera bundle optimizado en `dist/`. CI/CD: push a `main` en GitHub → Vercel detecta y despliega automáticamente.
