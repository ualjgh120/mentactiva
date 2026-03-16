import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Exercises } from './pages/Exercises';
import { MemoriaVisual } from './pages/MemoriaVisual';
import { MemoriaSecuencial } from './pages/MemoriaSecuencial';
import { CalculoBasico } from './pages/CalculoBasico';
import { Perfil } from './pages/Perfil';
import { PanelCuidador } from './pages/PanelCuidador';
import { Informacion } from './pages/Informacion';
import { Acceso } from './pages/Acceso';
import { Pin } from './pages/Pin';
import { CrearUsuario } from './pages/CrearUsuario';
import { ProtectedRoute } from './components/ProtectedRoute';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },

      { path: 'acceso', Component: Acceso },
      { path: 'pin', Component: Pin },
      { path: 'crear-usuario', Component: CrearUsuario },
      {
        path: 'ejercicios',
        element: (
          <ProtectedRoute>
            <Exercises />
          </ProtectedRoute>
        ),
      },
      {
        path: 'memoria-visual',
        element: (
          <ProtectedRoute>
            <MemoriaVisual />
          </ProtectedRoute>
        ),
      },
      {
        path: 'memoria-secuencial',
        element: (
          <ProtectedRoute>
            <MemoriaSecuencial />
          </ProtectedRoute>
        ),
      },
      {
        path: 'calculo',
        element: (
          <ProtectedRoute>
            <CalculoBasico />
          </ProtectedRoute>
        ),
      },
      {
        path: 'perfil',
        element: (
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cuidador',
        element: (
          <ProtectedRoute>
            <PanelCuidador />
          </ProtectedRoute>
        ),
      },
      { path: 'informacion', Component: Informacion },
    ],
  },
]);