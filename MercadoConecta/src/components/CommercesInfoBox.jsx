import { MapPin, Star } from 'lucide-react';

export default function CommerceInfoBox({
  image,
  commerceName,
  location,
  calification,
  comment,
  onClick
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg w-full max-w-sm"
    >
      <img
        src={image}
        alt={`Imagen de ${commerceName}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{commerceName}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={16} className="mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center mt-2">
          {stars.map((star) => (
            <Star
              key={star}
              size={18}
              className={`mr-1 ${calification >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">{calification.toFixed(1)}</span>
        </div>
        <p className="text-sm text-gray-700 mt-2">{comment}</p>
      </div>
    </div>
  );
}
