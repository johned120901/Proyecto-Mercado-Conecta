import { useEffect, useState } from 'react';
import { Types } from '../lib/Types'; // Asegúrate de que la ruta sea correcta

function TypeFilterSelect({ scope = 'commerce', value, onChange }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const data = await Types.getAll(scope);
        setTypes(data);
      } catch (error) {
        console.error('Error al cargar tipos:', error.message);
      }
    }
    fetchTypes();
  }, [scope]);

  return (
    <select
      className="px-4 py-2 rounded-full bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="">Todos los tipos</option>
      {types.map((type) => (
        <option key={type.id} value={type.id}>
          {type.name}
        </option>
      ))}
    </select>
  );
}

export default TypeFilterSelect;
