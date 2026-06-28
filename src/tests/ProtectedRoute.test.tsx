import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../app/components/ProtectedRoute';
import * as users from '../app/utils/users';

vi.mock('../app/utils/users', () => ({
  getAuthenticatedUser: vi.fn(),
}));

const fakeUser = {
  id: 'u1',
  name: 'Ana',
  pin: 'hash',
  avatar: 'abuela-1',
  createdAt: '2026-01-01',
};

function renderProtected() {
  return render(
    <MemoryRouter initialEntries={['/perfil']}>
      <Routes>
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <div>CHILD-OK</div>
            </ProtectedRoute>
          }
        />
        <Route path="/acceso" element={<div>ACCESO-OK</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProtectedRoute (componente real)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('no muestra nada mientras comprueba la sesión', () => {
    vi.mocked(users.getAuthenticatedUser).mockReturnValue(new Promise(() => {}));

    renderProtected();

    expect(screen.queryByText('CHILD-OK')).not.toBeInTheDocument();
    expect(screen.queryByText('ACCESO-OK')).not.toBeInTheDocument();
  });

  it('renderiza el contenido protegido si hay una sesión autenticada', async () => {
    vi.mocked(users.getAuthenticatedUser).mockResolvedValue(fakeUser);
    renderProtected();
    await waitFor(() => expect(screen.getByText('CHILD-OK')).toBeInTheDocument());
  });

  it('redirige a /acceso si no hay sesión autenticada', async () => {
    vi.mocked(users.getAuthenticatedUser).mockResolvedValue(null);
    renderProtected();
    await waitFor(() => expect(screen.getByText('ACCESO-OK')).toBeInTheDocument());
    expect(screen.queryByText('CHILD-OK')).not.toBeInTheDocument();
  });
});
