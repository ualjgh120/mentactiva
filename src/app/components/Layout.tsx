import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Brain,
  Home,
  Layers,
  User,
  Users,
  Info,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Mail,
  Phone,
  Instagram,
  Twitter,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  clearAuthenticatedUser,
  clearSelectedUser,
  getAuthenticatedUser,
  type UserProfile,
} from '../utils/users';

const VISITOR_NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/ejercicios', label: 'Ejercicios', icon: Layers },
  { to: '/informacion', label: 'Información', icon: Info },
];

const USER_NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/ejercicios', label: 'Ejercicios', icon: Layers },
  { to: '/perfil', label: 'Mi Perfil', icon: User },
  { to: '/cuidador', label: 'Para Cuidadores', icon: Users },
  { to: '/informacion', label: 'Información', icon: Info },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUserState] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      setLoadingUser(true);
      const user = await getAuthenticatedUser();
      setAuthenticatedUserState(user);
      setLoadingUser(false);
    }

    loadUser();
  }, [location.pathname]);

  const navItems = authenticatedUser ? USER_NAV_ITEMS : VISITOR_NAV_ITEMS;

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const handleProtectedNavigation = (to: string) => {
    setMenuOpen(false);

    const protectedRoutes = ['/ejercicios', '/perfil', '/cuidador'];

    if (!authenticatedUser && protectedRoutes.includes(to)) {
      navigate('/acceso');
      return;
    }

    navigate(to);
  };

  const handleLogout = () => {
    clearAuthenticatedUser();
    clearSelectedUser();
    setAuthenticatedUserState(null);
    setMenuOpen(false);
    navigate('/acceso');
  };

  if (loadingUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-200"
              >
                <Brain className="text-white" style={{ width: 24, height: 24 }} />
              </motion.div>
              <div>
                <span
                  className="text-slate-900 tracking-tight block"
                  style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}
                >
                  MenteActiva
                </span>
                <p className="text-slate-400 hidden sm:block" style={{ fontSize: 11, fontWeight: 500 }}>
                  Estimulación cognitiva
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              <nav className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <motion.button
                    key={to}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProtectedNavigation(to)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative ${isActive(to)
                        ? 'text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                      }`}
                    style={isActive(to) ? { backgroundColor: '#2563EB' } : {}}
                  >
                    <Icon style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="h-6 w-px bg-slate-200 mx-2" />

              {authenticatedUser ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end mr-1">
                    <span className="text-slate-900 leading-none" style={{ fontSize: 13, fontWeight: 700 }}>
                      {authenticatedUser.name}
                    </span>
                    <span className="text-slate-400 leading-none mt-1" style={{ fontSize: 11 }}>
                      Usuario
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
                    title="Cerrar sesión"
                  >
                    <LogOut style={{ width: 18, height: 18 }} />
                  </motion.button>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/acceso"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center gap-2"
                  >
                    <User style={{ width: 18, height: 18 }} />
                    Acceder
                  </Link>
                </motion.div>
              )}
            </div>

            <button
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X style={{ width: 24, height: 24 }} /> : <Menu style={{ width: 24, height: 24 }} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden shadow-xl"
            >
              <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <button
                    key={to}
                    onClick={() => handleProtectedNavigation(to)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 text-left ${isActive(to)
                        ? 'text-white shadow-lg shadow-blue-100'
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                      }`}
                    style={isActive(to) ? { backgroundColor: '#2563EB' } : {}}
                  >
                    <div className={`p-2 rounded-xl ${isActive(to) ? 'bg-white/20' : 'bg-slate-100'}`}>
                      <Icon style={{ width: 20, height: 20 }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{label}</span>
                    <ChevronRight className={`ml-auto opacity-40 ${isActive(to) ? 'text-white' : ''}`} style={{ width: 16, height: 16 }} />
                  </button>
                ))}

                {authenticatedUser ? (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {authenticatedUser.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold" style={{ fontSize: 15 }}>{authenticatedUser.name}</p>
                        <p className="text-slate-500" style={{ fontSize: 12 }}>Usuario activado</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-red-500 border border-red-50 font-bold hover:bg-red-50 transition-colors"
                    >
                      <LogOut style={{ width: 18, height: 18 }} />
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/acceso"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-white font-bold transition-all shadow-lg shadow-blue-100"
                    style={{ backgroundColor: '#2563EB' }}
                  >
                    <User style={{ width: 20, height: 20 }} />
                    Acceder a mi cuenta
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-900/20">
                <Brain className="text-white" style={{ width: 14, height: 14 }} />
              </div>
              <span className="text-white font-bold" style={{ fontSize: 16 }}>
                MenteActiva
              </span>
            </div>
            
            <p className="text-slate-400 text-center max-w-xl" style={{ fontSize: 12, lineHeight: 1.5 }}>
              Esta plataforma es una herramienta de apoyo y no sustituye diagnóstico ni tratamiento médico.
            </p>

            <p className="text-slate-500 font-medium" style={{ fontSize: 11 }}>
              © 2026 MenteActiva
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}