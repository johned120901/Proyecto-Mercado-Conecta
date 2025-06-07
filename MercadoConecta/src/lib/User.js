// src/lib/User.js
import { supabase } from '../supabaseClient';

export class User {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Registro
  static async register({ name, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);
    return data.user;
  }

  // Login
  static async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data.user;
  }

  // Recuperar contraseña
  static async forgetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
    return true;
  }

  // ✅ Obtener solo el nombre del usuario
  static async getUserNameByEmail(email) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('nombreusuarios')
      .eq('correo', email)
      .single();

    if (error) throw new Error(error.message);
    return data.nombreusuarios;
  }

  // ✅ Obtener todos los datos del usuario
  static async getUserByEmail(email) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', email)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // (opcional) obtener por ID
  static async getUserById(id) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }


  static async updateUserTable({ name, email }) {
    const { error } = await supabase
      .from('usuarios')
      .update({ nombreusuarios: name })
      .eq('correo', email);

    if (error) throw new Error(error.message);
  }


}
