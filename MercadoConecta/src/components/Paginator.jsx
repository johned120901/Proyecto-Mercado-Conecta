export default function Paginator({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4 bg-gray-100 py-3 px-6 rounded-md">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="text-blue-900 font-medium">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}
