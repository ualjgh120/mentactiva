import { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Delete } from 'lucide-react';
import {
    getSelectedUser,
    validateUserPin,
    setAuthenticatedUser,
    clearSelectedUser,
    type UserProfile,
} from '../utils/users';
import { getAvatarById } from '../utils/avatars';

export function Pin() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const selectedUser = await getSelectedUser();
            setUser(selectedUser);
            setLoading(false);
        }

        loadUser();
    }, []);

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/acceso" replace />;
    }

    const avatar = getAvatarById(user.avatar);

    const handleNumberClick = async (num: string) => {
        if (pin.length >= 4) return;

        const newPin = pin + num;
        setPin(newPin);
        setError('');

        if (newPin.length === 4) {
            const isValid = await validateUserPin(user.id, newPin);

            setTimeout(() => {
                if (isValid) {
                    setAuthenticatedUser(user.id);
                    clearSelectedUser();
                    navigate('/perfil');
                } else {
                    setError('PIN incorrecto. Inténtalo de nuevo.');
                    setPin('');
                }
            }, 200);
        }
    };

    const handleDelete = () => {
        setPin((prev) => prev.slice(0, -1));
        setError('');
    };

    const handleBackToAccess = () => {
        clearSelectedUser();
        navigate('/acceso');
    };

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            <div className="max-w-md mx-auto px-4 sm:px-6 py-10">
                <button
                    onClick={handleBackToAccess}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors"
                >
                    <ArrowLeft style={{ width: 18, height: 18 }} />
                    Cambiar perfil
                </button>

                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5"
                        style={{ backgroundColor: avatar?.bgColor ?? '#E2E8F0' }}
                    >
                        <span style={{ fontSize: 42 }}>{avatar?.emoji ?? '🙂'}</span>
                    </div>

                    <h1 className="text-slate-800 mb-2" style={{ fontSize: 30, fontWeight: 700 }}>
                        {user.name}
                    </h1>

                    <p className="text-slate-500 mb-6" style={{ fontSize: 16 }}>
                        Introduce tu PIN de 4 cifras
                    </p>

                    <div className="flex justify-center gap-3 mb-5">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-5 h-5 rounded-full border-2"
                                style={{
                                    backgroundColor: i < pin.length ? '#2563EB' : 'transparent',
                                    borderColor: i < pin.length ? '#2563EB' : '#CBD5E1',
                                }}
                            />
                        ))}
                    </div>

                    <div className="h-6 mb-4">
                        {error && (
                            <p style={{ color: '#DC2626', fontSize: 14, fontWeight: 600 }}>
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((key, idx) => {
                            if (key === '') {
                                return <div key={idx} />;
                            }

                            if (key === 'del') {
                                return (
                                    <button
                                        key={idx}
                                        onClick={handleDelete}
                                        className="h-16 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-all"
                                    >
                                        <Delete style={{ width: 22, height: 22 }} />
                                    </button>
                                );
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => void handleNumberClick(key)}
                                    className="h-16 rounded-2xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-all"
                                    style={{ fontSize: 24, fontWeight: 700 }}
                                >
                                    {key}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}