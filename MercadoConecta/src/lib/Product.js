import { supabase } from '../supabaseClient';

export class Product {
  // Obtener productos por tienda
  static async getProductByCommerce(commerceId = null, productId = null, limit = 10, offset = 0) {
    let query = supabase
      .from('v_products_with_type_name')
      .select('*', { count: 'exact' })


    if (commerceId) {
      query = query.eq('commerce_id', commerceId)
        .range(offset, offset + limit - 1);
    }

    if (productId) {
      query = query.eq('id', productId).single();;
    }

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);
    return { data, count };
  }


  static async getById(productId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) throw new Error(error.message);
    return { data };
  }



  // Crear producto
  static async create({ name, description, price, categoryId, commerceId, imageUrl }) {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name,
        content: description,
        price,
        type_id: categoryId,
        commerce_id: commerceId,
        image_url: imageUrl
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Actualizar producto
  static async update(productId, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Eliminar producto
  static async delete(productId) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw new Error(error.message);
    return true;
  }
}
