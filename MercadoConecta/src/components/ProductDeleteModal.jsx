import { useEffect, useState } from "react";
import { Product } from "../lib/Product";

export default function ProductDeleteModal({ productId, isOpen, onClose, onSave }) {
  const [product, setProduct] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProduct = async () => {
    try {
      const { data } = await Product.getById(productId);
      const {
        name,
      } = data;
      setProduct(name ?? '');
    } catch (error) {
      console.error('Error al cargar productos', error.message);
    }
  };


  const handleDelete = async () => {
    try {
      await Product.delete(productId);
      onSave();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    if (isOpen && productId) {
      fetchProduct()
    }
  }, [isOpen, productId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-heading font-bold mb-8 text-center text-blue-darkest">
          Eliminar producto
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>
        )}

        <div className="space-y-6 mb-8">
          <label className="block text-sm font-medium text-blue-darkest mb-2">
            El {product} va desaparecer de su catalogo de forma permanente. ¿Desea eliminar?
          </label>
        </div>

        <button
          onClick={handleDelete}
          className="w-full bg-blue-vibrant hover:bg-blue-sky text-white font-semibold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 mx-auto mb-2"
        >
          Guardar
        </button>

        <div
          className="text-center gap-2 text-blue-600 text-sm mb-2 hover:text-blue-800 cursor-pointer"
          onClick={onClose}
        >
          <span>No, rechazar</span>
        </div>
      </div>
    </div>
  );
}