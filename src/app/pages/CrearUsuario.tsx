import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { AVATAR_OPTIONS } from '../utils/avatars';
import { createUser, setActiveUser } from '../utils/users';

export function CrearUsuario() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0].id);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim().length < 2) {
            setError('Introduce un nombre válido.');
            return;
        }

        if (!/^\d{4}$/.test(pin)) {
            setError('El PIN debe tener 4 cifras.');
            return;
        }

        const newUser = await createUser(name, pin, avatar);

        if (!newUser) {
            setError('No se pudo crear el perfil. Inténtalo de nuevo.');
            return;
        }

        setActiveUser(newUser.id);
        navigate('/pin');
    };

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
                <Link
                    to="/acceso"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors"
                >
                    <ArrowLeft style={{ width: 18, height: 18 }} />
                    Volver a perfiles
                </Link>

                <div className="text-center mb-10">
                    <div className="text-6xl mb-4">👤</div>
                    <h1 className="text-slate-800 mb-3" style={{ fontSize: 34, fontWeight: 700 }}>
                        Crear nuevo perfil
                    </h1>
                    <p className="text-slate-500 max-w-xl mx-auto" style={{ fontSize: 17, lineHeight: 1.6 }}>
                        Crea un perfil sencillo para la persona usuaria. Después podrá acceder con su nombre y un PIN de 4 cifras.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm"
                >
                    <div className="mb-6">
                        <label className="block text-slate-700 mb-2" style={{ fontSize: 16, fontWeight: 600 }}>
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError('');
                            }}
                            placeholder="Ej. María"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ fontSize: 17 }}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-slate-700 mb-2" style={{ fontSize: 16, fontWeight: 600 }}>
                            PIN de 4 cifras
                        </label>
                        <input
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            value={pin}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setPin(value);
                                setError('');
                            }}
                            placeholder="1234"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ fontSize: 17 }}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-slate-700 mb-4" style={{ fontSize: 16, fontWeight: 600 }}>
                            Elige un avatar
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {AVATAR_OPTIONS.map((option) => {
                                const selected = avatar === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setAvatar(option.id)}
                                        className="relative rounded-2xl border-2 p-4 transition-all duration-200"
                                        style={{
                                            backgroundColor: option.bgColor,
                                            borderColor: selected ? '#2563EB' : '#E2E8F0',
                                        }}
                                    >
                                        <div className="text-4xl mb-2">{option.emoji}</div>
                                        <div className="text-slate-600" style={{ fontSize: 12, fontWeight: 600 }}>
                                            {option.label}
                                        </div>

                                        {selected && (
                                            <div
                                                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: '#2563EB' }}
                                            >
                                                <Check className="text-white" style={{ width: 14, height: 14 }} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="h-6 mb-4">
                        {error && (
                            <p style={{ color: '#DC2626', fontSize: 14, fontWeight: 600 }}>
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-2xl text-white py-4 transition-all hover:opacity-90"
                        style={{ backgroundColor: '#2563EB', fontSize: 18, fontWeight: 700 }}
                    >
                        Crear perfil
                    </button>
                </form>
            </div>
        </div>
    );
}