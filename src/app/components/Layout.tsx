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
} from 'lucide-react';
import { clearActiveUser, getActiveUser, type UserProfile } from '../utils/users';

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
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      setLoadingUser(true);
      const user = await getActiveUser();
      setActiveUser(user);
      setLoadingUser(false);
    }

    loadUser();
  }, [location.pathname]);

  const navItems = activeUser ? USER_NAV_ITEMS : VISITOR_NAV_ITEMS;

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const handleProtectedNavigation = (to: string) => {
    setMenuOpen(false);

    const protectedRoutes = ['/ejercicios', '/perfil', '/cuidador'];

    if (!activeUser && protectedRoutes.includes(to)) {
      navigate('/acceso');
      return;
    }

    navigate(to);
  };

  const handleLogout = () => {
    clearActiveUser();
    setActiveUser(null);
    setMenuOpen(false);
    navigate('/acceso');
  };

  if (loadingUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#2563EB' }}
              >
                <Brain className="text-white" style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <span
                  className="text-slate-800 tracking-tight"
                  style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}
                >
                  MentActiva
                </span>
                <p className="text-slate-400 hidden sm:block" style={{ fontSize: 11, lineHeight: 1 }}>
                  Estimulación cognitiva
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center">
              <nav className="flex items-center gap-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <button
                    key={to}
                    onClick={() => handleProtectedNavigation(to)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(to)
                      ? 'text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    style={isActive(to) ? { backgroundColor: '#2563EB' } : {}}
                  >
                    <Icon style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{label}</span>
                  </button>
                ))}
              </nav>

              {activeUser ? (
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition flex items-center gap-2"
                >
                  <LogOut style={{ width: 16, height: 16 }} />
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  to="/acceso"
                  className="ml-4 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Acceder
                </Link>
              )}
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? <X style={{ width: 26, height: 26 }} /> : <Menu style={{ width: 26, height: 26 }} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <button
                  key={to}
                  onClick={() => handleProtectedNavigation(to)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${isActive(to)
                    ? 'text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  style={isActive(to) ? { backgroundColor: '#2563EB' } : {}}
                >
                  <Icon style={{ width: 20, height: 20 }} />
                  <span style={{ fontSize: 17, fontWeight: 500 }}>{label}</span>
                  <ChevronRight className="ml-auto opacity-40" style={{ width: 16, height: 16 }} />
                </button>
              ))}

              {activeUser ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-slate-700 hover:bg-slate-100 transition-all duration-200"
                >
                  <LogOut style={{ width: 20, height: 20 }} />
                  <span style={{ fontSize: 17, fontWeight: 500 }}>Cerrar sesión</span>
                </button>
              ) : (
                <Link
                  to="/acceso"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white transition-all duration-200"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  <User style={{ width: 20, height: 20 }} />
                  <span style={{ fontSize: 17, fontWeight: 500 }}>Acceder</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#2563EB' }}
              >
                <Brain className="text-white" style={{ width: 14, height: 14 }} />
              </div>
              <span className="text-slate-700" style={{ fontWeight: 600, fontSize: 15 }}>
                MentActiva
              </span>
            </div>
            <p className="text-slate-400 text-center" style={{ fontSize: 13 }}>
              Esta plataforma es una herramienta de apoyo y no sustituye diagnóstico ni tratamiento médico.
            </p>
            <p className="text-slate-400" style={{ fontSize: 13 }}>
              © 2026 MentActiva
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}