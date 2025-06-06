import { supabase } from '../supabaseClient';

export class Types {
  static async getAll(scope = null) {
    let query = supabase.from('types').select('*');

    if (scope) {
      query = query.eq('scope', scope);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }
}
