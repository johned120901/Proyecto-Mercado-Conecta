import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import CommerceInfoBox from '../components/CommercesInfoBox';
import { Commerce } from '../lib/Commerce';
import TypeFilterSelect from '../components/TypeFilterSelect';
import LoginModal from './LoginModal';
import Paginator from './Paginator';

export default function BusinessGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [commerces, setCommerces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loginOpen, setLoginOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalCount / itemsPerPage);



  useEffect(() => {
    async function fetchCommerces() {
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const { data, count } = await Commerce.getTopRated(itemsPerPage, offset, {
          searchTerm,
          typeId: typeFilter
        });
        setCommerces(data);
        setTotalCount(count); // nuevo estado
      } catch (error) {
        console.error('Error al cargar comercios:', error.message);
      }
    }
    fetchCommerces();
  }, [currentPage, searchTerm, typeFilter]);


  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blue-50 via-blue-100 to-white text-blue-darkest">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">Negocios destacados</h2>
          <p className="text-blue-vibrant text-lg mt-4">Conoce las mejores tiendas gestionadas por nuestros comerciantes</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mb-10 items-center justify-center">
          {/* Búsqueda por nombre */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-blue-darkest/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Filtro por tipo de tienda */}
          <TypeFilterSelect
            scope="commerce"
            value={typeFilter}
            onChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Grid de comercios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commerces.map((c, i) => (
            <CommerceInfoBox
              key={i}
              image={'https://via.placeholder.com/300x200'} // Reemplaza con c.image_url si está disponible
              commerceName={c.commerce_name}
              location={c.location}
              calification={c.average_score ?? 0}
              comment={`${c.total_reviews ?? 0} comentarios`}
              onClick={() => setLoginOpen(true)}
            />
          ))}
        </div>

        {/* Paginación */}
        <div className="mt-8">
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
        </div>
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
}
