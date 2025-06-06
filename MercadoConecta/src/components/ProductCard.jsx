import { Pencil, Trash2 } from 'lucide-react';

export default function ProductCard({
  image,
  name,
  description,
  price,
  category,
  isOwner = false,
  onEdit,
  onDelete,
}) {
  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 w-[300px] h-[600px]">
      {/* Botones de acción */}
      {isOwner && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button onClick={onEdit}>
            <Pencil className="text-blue-600 hover:text-blue-800 w-5 h-5" />
          </button>
          <button onClick={onDelete}>
            <Trash2 className="text-blue-600 hover:text-red-600 w-5 h-5" />
          </button>
        </div>
      )}

      {/* Imagen */}
      <div className="w-full h-40 bg-gray-200 rounded my-4 overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Foto de producto
          </div>
        )}
      </div>

      {/* Información */}
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-blue-700 font-bold">Precio: ${price}</p>
      <p className="text-sm text-gray-500">Categoría: {category}</p>
    </div>
  );
}
