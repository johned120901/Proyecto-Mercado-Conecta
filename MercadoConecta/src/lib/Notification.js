// src/lib/Notification.js
import { supabase } from '../supabaseClient';

export class Notification {
  constructor({ id, name, message, location }) {
    this.id = id;
    this.name = name;
    this.message = message;
    this.location = location;
  }

  async sendNotification() {
    const { error } = await supabase.from('notifications').insert([{
      name: this.name,
      message: this.message,
      location: this.location,
    }]);
    if (error) throw new Error(error.message);
  }

  static async configureNotification(notificationId, newData) {
    const { error } = await supabase
      .from('notifications')
      .update(newData)
      .eq('id', notificationId);
    if (error) throw new Error(error.message);
  }
}
