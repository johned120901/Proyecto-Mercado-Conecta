import { useState } from 'react';
import { Star, Settings, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Calification } from '../lib/Calification';

export default function DynamicSidebar({ userId, commerceId, rating = 0, isOwner = false, showEmpresa, commpress, listButtons = [], onButtonClick, showConfig }) {
  const [currentRating, setCurrentRating] = useState(rating);
  const navigate = useNavigate();

  const handleStarClick = async (index) => {
    setCurrentRating(index + 1);

    await Calification.upsert({
      userId,
      commerceId,
      score: index + 1,
    });

  };

  const handleConfig = () => {
    navigate()
  }

  return (
    <div className="h-full flex flex-col bg-blue-600 ">
      {/* Empresa Section */}
      {showEmpresa && (
        <div className="space-y-2">
          <div className='m-8'>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="text-white" />
              <span className="font-semibold text-white">{commpress}</span>
            </div>
            {isOwner && (
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 cursor-pointer ${i < currentRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    onClick={() => handleStarClick(i)}
                  />
                ))}
              </div>
            )}
          </div>
          <hr className="border-blue-300" />
        </div>
      )}

      {/* Botones dinámicos */}
      <div className="flex flex-col space-y-2 my-8">
        {listButtons.map((button) => (
          <button className="bg-white hover:bg-blue-50 text-blue-900 font-medium py-2 px-4 rounded shadow" onClick={() => onButtonClick?.(button.label)}>
            {button.label}
          </button>
        ))}
        {/* Puedes agregar más botones aquí */}
      </div>

      {/* Configuración */}

      {showConfig && (
        <div className="mt-auto">
          <hr className="border-blue-300" />
          <div className="pt-4 flex items-center space-x-2 cursor-pointer" onClick={handleConfig}>
            <Settings className="text-white" />
            <span className="text-white font-medium">Configuración</span>
          </div>
        </div>
      )}


    </div>
  );
}
