export default function CommerceDeleteModal({ commerce, isOpen, onClose, onSave }) {
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
          Eliminar empresa
        </h2>

        <div className="space-y-6 mb-8">
          <label className="block text-sm font-medium text-blue-darkest mb-2">
            {commerce?.nombre_comercio} la vas a eliminar. ¿Desea eliminarla definitivamente?
          </label>
        </div>

        <button
          onClick={onSave}
          className="w-full bg-blue-vibrant hover:bg-blue-sky text-white font-semibold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 mx-auto mb-2"
        >
          Si, ya no es mi tienda
        </button>

        <div
          className="text-center gap-2 text-blue-600 text-sm mb-2 hover:text-blue-800 cursor-pointer"
          onClick={onClose}
        >
          <span>No, aun lo es</span>
        </div>
      </div>
    </div>
  )
}