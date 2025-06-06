import { supabase } from '../supabaseClient';

export class FavoriteCommerces {

  static async fetchFavorites(user_id, limit = 10, offset = 0) {
    const { data, error, count } = await supabase
      .from('v_favorite_commerces')
      .select('*', { count: 'exact' })
      .eq('user_id', user_id)
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
    return { data, count };
  }

  static async addFavorite(userId, commerceId) {
    const { error } = await supabase
      .from('favorite_commerces')
      .insert({ user_id: userId, commerce_id: commerceId });

    if (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
    return true;
  }

  static async removeFavorite(userId, commerceId) {
    const { error } = await supabase
      .from('favorite_commerces')
      .delete()
      .match({ user_id: userId, commerce_id: commerceId });

    if (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
    return true;
  }
}
