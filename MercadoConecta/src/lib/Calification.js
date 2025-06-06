import { supabase } from '../supabaseClient';

export class Calification {
  static async upsert({ userId, commerceId, score }) {
    if (score === 0) {
      // Eliminar si existe
      const { error } = await supabase
        .from('califications')
        .delete()
        .eq('user_id', userId)
        .eq('commerce_id', commerceId);
      if (error) throw new Error(error.message);
      return { deleted: true };
    }

    // Verificar si ya existe
    const { data: existing, error: fetchError } = await supabase
      .from('califications')
      .select('id')
      .eq('user_id', userId)
      .eq('commerce_id', commerceId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(fetchError.message);
    }

    if (existing) {
      // Actualizar
      const { error: updateError } = await supabase
        .from('califications')
        .update({ score })
        .eq('id', existing.id);
      if (updateError) throw new Error(updateError.message);
      return { updated: true };
    } else {
      // Crear
      const { error: insertError } = await supabase
        .from('califications')
        .insert([{ user_id: userId, commerce_id: commerceId, score }]);
      if (insertError) throw new Error(insertError.message);
      return { created: true };
    }
  }
}
