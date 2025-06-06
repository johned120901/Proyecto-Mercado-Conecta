import { supabase } from '../supabaseClient';

export class Publications {
  static async getWithUserReactions(userId, commerceId = null, limit = 10) {
    let query = supabase
      .from('publicaciones_con_reacciones_usuario')
      .select('*')
      .order('publication_id', { ascending: false })
      .limit(limit);

    if (commerceId) {
      query = query.eq('commerce_id', commerceId);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return data.map(pub => ({
      id: pub.publication_id,
      title: pub.publication_title,
      content: pub.publication_content,
      commerce_name: pub.commerce_name,
      commerce_id: pub.commerce_id,
      likes: pub.likes,
      dislikes: pub.dislikes,
      userReaction: pub.user_id === userId ? pub.reaction_type : null
    }));
  }


  static async create({ name, content, commerce_id, owner_id }) {
    const { data, error } = await supabase
      .from('publications')
      .insert([
        {
          name,
          content,
          commerce_id,
          owner_id,
          likes: 0,
          dislikes: 0
        }
      ])
      .select();

    if (error) throw new Error(error.message);
    return data[0]; // Devuelve la publicación recién creada
  }

  static async incrementReaction(id, type = 'likes') {
    const { data: current, error: fetchError } = await supabase
      .from('publications')
      .select(type)
      .eq('id', id)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    const newValue = (current?.[type] || 0) + 1;

    const { data, error } = await supabase
      .from('publications')
      .update({ [type]: newValue })
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }



  static async decrementReaction(id, type = 'likes') {
    const { data: current, error: fetchError } = await supabase
      .from('publications')
      .select(type)
      .eq('id', id)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    const newValue = Math.max((current?.[type] || 0) - 1, 0);

    const { data, error } = await supabase
      .from('publications')
      .update({ [type]: newValue })
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }



}
