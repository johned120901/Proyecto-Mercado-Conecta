export default function PersonalData({ name, email, onClick }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Información general</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClick}>
          Editar perfil
        </button>
      </div>
      <div>
        <h3 className="text-sm text-gray-600">Nombre</h3>
        <p className="text-lg">{name || 'Nombre usuario'}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-600">Correo electrónico</h3>
        <p className="text-lg">{email || 'Correo electrónico'}</p>
      </div>
    </div>
  );

}