import React, { useEffect, useState } from 'react';
import { LogOut, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../components/providers/authContext';
import { useNavigate } from 'react-router-dom';
import { User as UserModel } from '../lib/User';

export default function NavBar() {
  const { user, logout } = useAuth(); // recupera el email del usuario logueado
  const [nombre, setNombre] = useState('');
  const [searchValue, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNombre = async () => {
      if (user?.email) {
        try {
          const nombreUsuario = await UserModel.getUserNameByEmail(user.email);
          setNombre(nombreUsuario);
        } catch (error) {
          console.error('Error al obtener nombre:', error.message);
        }
      }
    };

    fetchNombre();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  const search = () => {
    navigate(`/search-resut?name=${searchValue}`);
  }
  
  return (
    <div className="mt-16 bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo y título */}
      <a href="/profile" className="flex items-center space-x-3 cursor-pointer hover:text-gray-300">
        <User size={16} />
        <span>{nombre || 'Usuario'}</span>
      </a>

      {/* Menú de navegación */}
      <div className="hidden md:flex space-x-6 text-sm font-medium">
        <a href="/dashboard" className="hover:text-gray-200">Inicio</a>
        <a href="/maps" className="hover:text-gray-200">Mapa</a>
        <a href="/favoriteCommercers" className="hover:text-gray-200">Tiendas favoritas</a>
      </div>

      {/* Centro: buscador */}
      <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm max-w-xs w-full mx-6">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-3 py-1 text-sm text-black focus:outline-none w-full"
          onChange={({ target: { value } }) => setSearch(value)}
        />
        <button className="px-2 text-gray-600"
          onClick={search}
        >
          <Search size={18} />
        </button>
      </div>

      {/* Usuario y acciones */}
      <div className="flex items-center space-x-4">

        <Bell size={20} className="cursor-pointer hover:text-gray-300" />
        <button onClick={handleLogout} title="Cerrar sesión">
          <LogOut size={20} className="hover:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
