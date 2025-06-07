import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Container from "../components/Container";
import TypeFilterSelect from "../components/TypeFilterSelect";
import { Commerce } from "../lib/Commerce";
import { useAuth } from "../components/providers/authContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function YourCommerce() {
  const query = useQuery();
  const id = query.get('id');

  const { user } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  // Información general
  const [nombreTienda, setNombreTienda] = useState("");
  const [categoria, setCategoria] = useState("");

  // Dirección - Fila 1
  const [tipoVia, setTipoVia] = useState("");
  const [numero1, setNumero1] = useState("");
  const [letra1, setLetra1] = useState("");
  const [bis1, setBis1] = useState(false);
  const [cardinalidad1, setCardinalidad1] = useState("");

  // Dirección - Fila 2
  const [numero2, setNumero2] = useState("");
  const [letra2, setLetra2] = useState("");
  const [bis2, setBis2] = useState(false);
  const [cardinalidad2, setCardinalidad2] = useState("");
  const [numero3, setNumero3] = useState("");

  // Dirección - Fila 3
  const [datosAdicionales, setDatosAdicionales] = useState("");

  const [address, setAddress] = useState('');

  const fetchCreateOrUpdate = async () => {

    if (!nombreTienda || !categoria || !tipoVia || !numero1 || !numero2 || !numero3) {
      console.log(nombreTienda, categoria, tipoVia, numero1, numero2, numero3);
      setErrorMessage('Por favor completa todos los campos obligatorios.')
      return;
    }

    const payload = {
      name: nombreTienda,
      location: address,
      owner_id: user.id,
      type_id: categoria
    }
    try {
      if (id) {
        await Commerce.update(id, { name: payload.name, location: payload.location, owner_id: payload.owner_id, type_id: payload.type_id })
          .then(navigate(`/commerce?id${id}`))
      } else {
        await Commerce.create(payload).then(navigate('/profile'))
      }
    } catch (error) {
      console.error(error.message);
    }

  }

  useEffect(() => {
    const partOne = [tipoVia, numero1, letra1, bis1 ? 'BIS' : '', cardinalidad1].filter(Boolean).join(" ");
    const partTwo = [numero2, letra2, bis2 ? 'BIS' : '', cardinalidad2].filter(Boolean).join(" ");
    const address = `${partOne} # ${partTwo} - ${numero3}`;
    setAddress(address);
  }, [tipoVia, numero1, letra1, bis1, cardinalidad1, numero2, letra2, bis2, cardinalidad2, numero3, datosAdicionales])

  return (
    <div>
      <Header />
      <div className="my-24">
        <Container title="Tu tienda">
          {errorMessage && (
            <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>
          )}
          {/* Información general */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Información general</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre de tienda"
                value={nombreTienda}
                onChange={(e) => setNombreTienda(e.target.value)}
                className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
              />
              <TypeFilterSelect value={categoria} onChange={(value) => setCategoria(value)} />
            </div>
          </div>

          {/* Dirección */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-6 mt-6">
            <h2 className="text-xl font-semibold">Dirección</h2>

            {/* Fila 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <select
                value={tipoVia}
                onChange={(e) => setTipoVia(e.target.value)}
                className="px-3 py-2 rounded-full bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest"
              >
                <option value="">Tipo de vía</option>
                <option value="calle">Calle</option>
                <option value="carrera">Carrera</option>
                <option value="avenida">Avenida</option>
              </select>
              <input
                type="number"
                maxLength={3}
                placeholder="Número"
                value={numero1}
                onChange={(e) => setNumero1(e.target.value)}
                className="w-full border border-blue-deep/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
              />
              <input
                type="text"
                maxLength={1}
                placeholder="Letra"
                value={letra1}
                onChange={(e) => setLetra1(e.target.value)}
                className="w-full border border-blue-deep/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bis1}
                  onChange={(e) => setBis1(e.target.checked)}
                  className="form-checkbox"
                />
                Bis
              </label>
              <select
                value={cardinalidad1}
                onChange={(e) => setCardinalidad1(e.target.value)}
                className="px-3 py-2 rounded-full bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest"
              >
                <option value="">Cardinalidad</option>
                <option value="norte">Norte</option>
                <option value="sur">Sur</option>
                <option value="este">Este</option>
                <option value="oeste">Oeste</option>
              </select>
            </div>
            {/* Fila 2 */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <input
                type="number"
                maxLength={3}
                placeholder="Número"
                value={numero2}
                onChange={(e) => setNumero2(e.target.value)}
                className="w-full border border-blue-deep/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
              />
              <input
                type="text"
                maxLength={1}
                placeholder="Letra"
                value={letra2}
                onChange={(e) => setLetra2(e.target.value)}
                className="w-full border border-blue-deep/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bis2}
                  onChange={(e) => setBis2(e.target.checked)}
                  className="form-checkbox"
                />
                Bis
              </label>
              <select
                value={cardinalidad2}
                onChange={(e) => setCardinalidad2(e.target.value)}
                className="px-3 py-2 rounded-full bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest"
              >
                <option value="">Cardinalidad</option>
                <option value="norte">Norte</option>
                <option value="sur">Sur</option>
                <option value="este">Este</option>
                <option value="oeste">Oeste</option>
              </select>
              <input
                type="number"
                maxLength={3}
                placeholder="Número"
                value={numero3}
                onChange={(e) => setNumero3(e.target.value)}
                className="w-full border border-blue-deep/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
              />
            </div>
            {/* Fila 3: Datos adicionales */}
            <textarea
              placeholder="Datos adicionales"
              value={datosAdicionales}
              onChange={(e) => setDatosAdicionales(e.target.value)}
              className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400 resize-none"
              rows={3}
            ></textarea>
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
              onClick={fetchCreateOrUpdate}>
              Guardar
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded">
              Cancelar
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
}
