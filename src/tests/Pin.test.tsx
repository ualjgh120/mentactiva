import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Pin } from '../app/pages/Pin';
import * as users from '../app/utils/users';

vi.mock('../app/utils/users', () => ({
  getSelectedUser: vi.fn(),
  validateUserPin: vi.fn(),
  setAuthenticatedUser: vi.fn(),
  clearSelectedUser: vi.fn(),
}));

const fakeUser = {
  id: 'u1',
  name: 'Ana',
  pin: 'hash',
  avatar: 'abuela-1',
  createdAt: '2026-01-01',
};

function renderPin() {
  return render(
    <MemoryRouter initialEntries={['/pin']}>
      <Routes>
        <Route path="/pin" element={<Pin />} />
        <Route path="/perfil" element={<div>PERFIL-OK</div>} />
        <Route path="/acceso" element={<div>ACCESO-OK</div>} />
      </Routes>
    </MemoryRouter>
  );
}

function typeDigits(digits: string) {
  digits.split('').forEach((d) => fireEvent.keyDown(window, { key: d }));
}

describe('Pin (componente real)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirige a /acceso si no hay usuario seleccionado', async () => {
    vi.mocked(users.getSelectedUser).mockResolvedValue(null);
    renderPin();
    await waitFor(() => expect(screen.getByText('ACCESO-OK')).toBeInTheDocument());
  });

  it('muestra el nombre del usuario seleccionado', async () => {
    vi.mocked(users.getSelectedUser).mockResolvedValue(fakeUser);
    renderPin();
    await waitFor(() => expect(screen.getByText('Ana')).toBeInTheDocument());
  });

  it('no permite más de 4 dígitos: el estado interno no crece más allá de 4 cifras', async () => {
    vi.mocked(users.getSelectedUser).mockResolvedValue(fakeUser);
    vi.mocked(users.validateUserPin).mockResolvedValue(false);
    renderPin();
    await waitFor(() => expect(screen.getByText('Ana')).toBeInTheDocument());

    // El 5º dígito debe descartarse; si el límite real fuera >4, el estado
    // interno tendría 5 cifras en vez de 4, lo cual se delata al borrar una
    // y teclear una más: con tope correcto en 4, "1234"+del+"9" -> "1239"
    // (8 -> 1,2,3,4 -> del -> 123 -> 9 -> 1239). Con el bug (tope en 5),
    // el estado pasaría a "1234" tras el backspace y la siguiente pulsación
    // ya no completaría 4 cifras, así que nunca se dispararía la 2ª validación.
    typeDigits('12345');
    await waitFor(() => expect(users.validateUserPin).toHaveBeenCalledWith('u1', '1234'));

    fireEvent.keyDown(window, { key: 'Backspace' });
    fireEvent.keyDown(window, { key: '9' });

    await waitFor(() => expect(users.validateUserPin).toHaveBeenCalledWith('u1', '1239'));
    expect(users.validateUserPin).toHaveBeenCalledTimes(2);
  });

  it('PIN incorrecto muestra el mensaje de error y no autentica', async () => {
    vi.mocked(users.getSelectedUser).mockResolvedValue(fakeUser);
    vi.mocked(users.validateUserPin).mockResolvedValue(false);
    renderPin();
    await waitFor(() => expect(screen.getByText('Ana')).toBeInTheDocument());

    typeDigits('1234');

    await waitFor(() =>
      expect(screen.getByText('PIN incorrecto. Inténtalo de nuevo.')).toBeInTheDocument()
    );
    expect(users.setAuthenticatedUser).not.toHaveBeenCalled();
  });

  it('PIN correcto autentica al usuario y navega a /perfil', async () => {
    vi.mocked(users.getSelectedUser).mockResolvedValue(fakeUser);
    vi.mocked(users.validateUserPin).mockResolvedValue(true);
    renderPin();
    await waitFor(() => expect(screen.getByText('Ana')).toBeInTheDocument());

    typeDigits('1234');

    await waitFor(() => expect(screen.getByText('PERFIL-OK')).toBeInTheDocument());
    expect(users.setAuthenticatedUser).toHaveBeenCalledWith('u1');
    expect(users.clearSelectedUser).toHaveBeenCalled();
  });

  it('Backspace borra el último dígito introducido', async () => {
    vi.mocked(users.getSelectedUser).mockResolvedValue(fakeUser);
    vi.mocked(users.validateUserPin).mockResolvedValue(true);
    renderPin();
    await waitFor(() => expect(screen.getByText('Ana')).toBeInTheDocument());

    fireEvent.keyDown(window, { key: '1' });
    fireEvent.keyDown(window, { key: '2' });
    fireEvent.keyDown(window, { key: 'Backspace' });
    typeDigits('999');

    await waitFor(() => expect(users.validateUserPin).toHaveBeenCalledWith('u1', '1999'));
  });
});
