// src/context/authContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { User } from '../../lib/User'; // ajusta la ruta si es distinta
import { toast } from 'react-hot-toast';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener sesión activa al cargar
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    getSession();

    // Escuchar cambios de sesión (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Registrar nuevo usuario
  const register = async ({ nombre, email, password }) => {
    try {
      await User.register({ name: nombre, email, password });
      await User.login({ email, password });
      toast.success(`¡Bienvenido, ${nombre}!`);
      return null;
    } catch (error) {
      toast.error(error.message || 'Error al registrar');
      return error;
    }
  };

  // Iniciar sesión
  const login = async ({ email, password }) => {
    try {
      await User.login({ email, password });
      toast.success('Inicio de sesión exitoso');
      return null;
    } catch (error) {
      toast.error(error.message || 'Error al iniciar sesión');
      return error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
