

export default function FloatingScoreCard({ score = 5.0 }) {
  return (
    <div className="sticky top-20 right-0 bg-white border border-gray-300 rounded-lg shadow-md p-4 w-60">
      <p className="text-gray-700 font-semibold mb-2">Puntuación promedio</p>
      <div className="flex flex-col items-center">
        <svg className="w-16 h-16 text-yellow-400 fill-current mb-1" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span className="text-xl font-bold text-gray-800">{score.toFixed(1)}</span>
      </div>
    </div>
  );
}

