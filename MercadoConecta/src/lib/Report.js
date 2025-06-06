// src/lib/Report.js
import { supabase } from '../supabaseClient';

export class Report {
  constructor({ id, type, content }) {
    this.id = id;
    this.type = type;
    this.content = content;
  }

  static async generateReport({ type, content }) {
    const { data, error } = await supabase.from('reports').insert([{ type, content }]);
    if (error) throw new Error(error.message);
    return data[0];
  }
}
