import { useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { Commerce } from "../lib/Commerce";
import TypeFilterSelect from "../components/TypeFilterSelect";
import { Star } from "lucide-react";
import StoreList from "../components/StoreList";
import Paginator from "../components/Paginator";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResult() {
  const query = useQuery();
  const name = query.get('name');

  const [typeFilter, setTypeFilter] = useState('');
  const [score, setScore] = useState('');
  const [commerces, setCommerces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const navigate = useNavigate();

  const fetchCommerce = async () => {
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const { data, count } = await Commerce.getTopRated(itemsPerPage, offset, {
        searchTerm: name,
        typeId: typeFilter,
        score
      });
      const commerces = data.map(item => {
        return {
          id: item.commerce_id,
          name: item.commerce_name,
        }
      });
      setCommerces(commerces);
      setTotalCount(count);
    } catch (error) {
      console.error('Error al cargar comercios:', error.message);
    }
  }

  const handleStarClick = async (index) => {
    setScore(index + 1);
  };

  const onStoreClick = (store) => {
    navigate(`/commerce?id=${store.id}`)
  }

  useEffect(() => {
    fetchCommerce();
  }, [name, typeFilter, score, currentPage]);

  return (
    <div>
      <Header />
      <NavBar />
      <Container title="Resultado de busqueda:">
        <div>
          <p className="text-blue-vibrant text-lg mt-4">Filtrar por:</p>
        </div>
        <div className="my-8 flex">
          <TypeFilterSelect
            scope="commerce"
            value={typeFilter}
            onChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
          />
          <div className="flex space-x-1 my-4 mx-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 cursor-pointer ${i < score ? 'fill-yellow-400 text-yellow-400' : 'text-white'
                  }`}
                onClick={() => handleStarClick(i)}
              />
            ))}
          </div>
        </div>
        <hr />
        <StoreList stores={commerces} onStoreClick={onStoreClick} />
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      </Container>
    </div>
  )
}