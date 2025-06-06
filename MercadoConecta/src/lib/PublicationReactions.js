import { supabase } from '../supabaseClient';

export class PublicationReactions {
  static async getUserReaction(userId, publicationId) {
    const { data, error } = await supabase
      .from('publication_reactions')
      .select('reaction_type')
      .eq('user_id', userId)
      .eq('publication_id', publicationId)
      .single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message); // PGRST116 = no rows found
    return data?.reaction_type || null;
  }

  static async setReaction(userId, publicationId, reactionType) {
    const existing = await this.getUserReaction(userId, publicationId);

    if (existing === reactionType) {
      // Remove reaction
      const { error } = await supabase
        .from('publication_reactions')
        .delete()
        .eq('user_id', userId)
        .eq('publication_id', publicationId);

      if (error) throw new Error(error.message);
      return null;
    } else if (existing) {
      // Update reaction
      const { error } = await supabase
        .from('publication_reactions')
        .update({ reaction_type: reactionType })
        .eq('user_id', userId)
        .eq('publication_id', publicationId);

      if (error) throw new Error(error.message);
      return reactionType;
    } else {
      // Insert new reaction
      const { error } = await supabase
        .from('publication_reactions')
        .insert([{ user_id: userId, publication_id: publicationId, reaction_type: reactionType }]);

      if (error) throw new Error(error.message);
      return reactionType;
    }
  }
}
