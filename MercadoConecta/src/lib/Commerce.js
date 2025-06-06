import { supabase } from '../supabaseClient';

export class Commerce {
  static async create({ name, location, owner_id, type_id }) {
    const { data, error } = await supabase
      .from('commerces')
      .insert([{ name, location, owner_id, type_id }])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('commerces')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  }

  static async delete(id) {
    const { error } = await supabase
      .from('commerces')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  static async getAll() {
    const { data, error } = await supabase
      .from('commerces')
      .select('*');
    if (error) throw new Error(error.message);
    return data;
  }


  static async getTopRated(limit = 10, offset = 0, filters = {}) {
    let query = supabase
      .from('commerces_top_rated')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    if (filters.searchTerm) {
      query = query.ilike('commerce_name', `%${filters.searchTerm}%`);
    }

    if (filters.typeId) {
      query = query.eq('type_id', filters.typeId);
    }

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);
    return { data, count };
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('commerces')
      .select('*')
      .eq('id', id)
      .single(); // Esperamos solo un resultado

    if (error) throw new Error(error.message);
    return data;
  }

  static async getUserInsight(commerceId, userIdAuth) {
    const { data, error } = await supabase
      .from('v_commerce_user_insight')
      .select('*')
      .eq('commerce_id', commerceId)
      .eq('user_auth_id', userIdAuth) // <- corregido aquí
      .single();
    if (error) throw new Error(error.message);
    return data;
  }



}
