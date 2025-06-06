import { useState } from 'react';
import { useAuth } from './providers/authContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    const error = await login({ email, password });

    if (!error) {
      const { data, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo', email)
        .single();

      if (!userError && data) {

        onClose();

        navigate('/dashboard');
      } else {
        setErrorMessage('No se pudo verificar el usuario.');
      }
    } else {
      setErrorMessage('Email o contraseña incorrectos.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative font-sans">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        {/* Título */}
        <h2 className="text-3xl font-heading font-bold mb-8 text-center text-blue-darkest">
          Iniciar sesión
        </h2>

        {/* Mensaje de error */}
        {errorMessage && (
          <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>
        )}

        {/* Formulario */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-darkest mb-2">
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-darkest mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
            />
          </div>

          {/* Botón Entrar */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-vibrant hover:bg-blue-sky text-white font-semibold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
