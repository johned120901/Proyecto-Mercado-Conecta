import React, { useState } from 'react';
import { useAuth } from './providers/authContext'; // ruta corregida
import { useNavigate } from 'react-router-dom';

export default function RegisterModal({ isOpen, onClose }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const error = await register(formData);
    if (error) {
      // Ya se muestra toast en authContext, pero puedes reforzarlo aquí si quieres
      console.error('Error al registrar:', error);
    } else {
      onClose();
      navigate('/dashboard');
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
          Crear cuenta
        </h2>

        {/* Formulario */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-darkest mb-2">Nombres</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              type="text"
              placeholder="Tu nombre"
              className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-darkest mb-2">Correo</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="tu@correo.com"
              className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-darkest mb-2">Contraseña</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
            />
          </div>

          {/* Botón */}
          <button
            onClick={handleRegister}
            className="w-full bg-blue-vibrant hover:bg-blue-sky text-white font-semibold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
