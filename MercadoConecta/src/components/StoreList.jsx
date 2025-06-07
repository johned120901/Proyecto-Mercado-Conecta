import { ShoppingCart, Heart } from "lucide-react";

export default function StoreList({ stores = [], onStoreClick, onToggleFavorite }) {

  return (
    <div className="flex flex-col gap-2">
      {stores.length === 0 ? (
        <p className="text-gray-500 italic">No hay tiendas relacionadas</p>
      ) : (
        stores.map((store, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            <button
              onClick={() => onStoreClick(store)}
              className="flex items-center gap-3"
            >
              <ShoppingCart className="text-gray-600" />
              <span className="text-gray-800 font-medium">{store.name}</span>
            </button>

            {store.isFavorite && (
              <button onClick={() => onToggleFavorite(store)}>
                <Heart className="w-5 h-5 text-blue-500 fill-blue-500" />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
