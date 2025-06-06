import React, { useState } from 'react';
import { Menu, LogIn, Landmark } from 'lucide-react'; // 👈 Importamos el icono para el "logo"
import LoginModal from './LoginModal';
import { useAuth } from '../components/providers/authContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth();


  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Icono como "logo" */}
      <div className="flex items-center space-x-3">
        <Landmark className="h-8 w-8 text-blue-600" /> {/* 👈 Icono usado como logo */}
        {/* Opcionalmente, puedes agregar texto al lado */}
        <span className="font-bold text-lg text-blue-900">Mercado Conecta</span>
      </div>

      {/* Navegación */}

      {/* Botón login y menú hamburguesa */}
      <div className="flex items-center space-x-4">
        {/* Botón Iniciar sesión */}
        {!user && <button
          onClick={() => setLoginOpen(true)}
          className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Iniciar sesión
        </button>}

        {/* Botón hamburguesa en móviles */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-blue-900"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden">
          {/* Botón login visible también en móvil */}
          {!user && <button
            onClick={() => { setLoginOpen(true); setMobileOpen(false); }}
            className="w-10/12 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm transition"
          >
            Iniciar sesión
          </button>}
        </div>
      )}

      {/* Modal de login */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
