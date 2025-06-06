import { useEffect, useState } from "react";
import TypeFilterSelect from "./TypeFilterSelect";
import { Product } from "../lib/Product";
import ImageUploadField from "./ImageUploadField";

export default function ProductModal({ commerceId, productId = '', isOpen, onClose, onSave }) {
  const [nameValue, setName] = useState('');
  const [descriptionValue, setDescription] = useState('');
  const [priceValue, setPrice] = useState('');
  const [imageValue, setImage] = useState('');
  const [typeValue, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProduct = async () => {
    try {
      const { data } = await Product.getById(productId);
      const {
        name,
        content,
        price,
        image_url,
        type_name
      } = data;
      setName(name ?? '');
      setDescription(content ?? '');
      setPrice(price ?? '');
      setImage(image_url ?? '');
      setType(type_name ?? '');
    } catch (error) {
      console.error('Error al cargar productos', error.message);
    }
  };


  const handleSave = async () => {
    try {
      if (!nameValue || !priceValue || !typeValue) {
        setErrorMessage('Por favor completa todos los campos obligatorios.');
        return;
      }

      const payload = {
        name: nameValue,
        description: descriptionValue,
        price: parseFloat(priceValue),
        categoryId: typeValue,
        commerceId,
        imageUrl: imageValue
      };

      if (productId) {
        await Product.update(productId, {
          name: payload.name,
          content: payload.description,
          price: payload.price,
          type_id: payload.categoryId,
          image_url: payload.imageUrl
        });
      } else {
        await Product.create(payload);
      }

      onSave();
      cleanValue(); // Para recargar productos o cerrar modal
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const cleanValue = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setType('');
  }


  useEffect(() => {
    if (isOpen && productId) {
      fetchProduct();
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
          Producto
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>
        )}

        <div className="space-y-6 mb-8">
          <label className="block text-sm font-medium text-blue-darkest mb-2">
            Nombre de producto
          </label>
          <input
            type="text"
            value={nameValue || ''}
            onChange={({ target: { value } }) => setName(value)}
            className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
          />
        </div>

        <div className="space-y-6 mb-8">
          <label className="block text-sm font-medium text-blue-darkest mb-2">
            Descripción
          </label>
          <textarea
            value={descriptionValue || ''}
            onChange={({ target: { value } }) => setDescription(value)}
            className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
          />
        </div>

        <div className="space-y-6 mb-8">
          <label className="block text-sm font-medium text-blue-darkest mb-2">
            Precio
          </label>
          <input
            type="amount"
            value={priceValue || ''}
            onChange={({ target: { value } }) => setPrice(value)}
            className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
          />
        </div>

        <div className="space-y-6 mb-8">
          <TypeFilterSelect
            scope="product"
            value={typeValue || ''}
            onChange={(value) => {
              setType(value);
            }}
          />
        </div>

        <div className="space-y-6 mb-8">
          <ImageUploadField
            initialUrl={imageValue || ''}
            onUpload={(url) => setImage(url)}
            label="Adjuntar foto del producto"
          />
        </div>


        <button
          onClick={handleSave}
          className="w-full bg-blue-vibrant hover:bg-blue-sky text-white font-semibold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 mx-auto mb-2"
        >
          Guardar
        </button>
      </div>
    </div>
  )
}