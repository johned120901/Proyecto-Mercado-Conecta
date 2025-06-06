import { useEffect, useState } from 'react';
import { FavoriteCommerces as favoriteCommercersService } from '../lib/FavoriteCommerces';
import { useAuth } from '../components/providers/authContext';
import { useNavigate } from 'react-router-dom';
import Container from "../components/Container";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import CommerceInfoBox from '../components/CommercesInfoBox';
import Paginator from '../components/Paginator';


export default function FavoriteCommercers() {
  const { user } = useAuth();
  const [commerces, setCommerces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;
  const navigate = useNavigate();

  const navigateCommerce = (id) => {
    navigate(`/commerce?id=${id}`);
  }

  useEffect(() => {
    async function fetchFavoritiCommerces() {
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const { data, count } = await favoriteCommercersService.fetchFavorites(user.id, itemsPerPage, offset);
        setCommerces(data);
        setTotalCount(count);
      } catch (error) {
        console.error('Error al cargar comercios:', error.message);
      }
    }
    if (user) {
      fetchFavoritiCommerces();
    } else {
      navigate('/');
    }
  }, [currentPage]);


  return (
    <div>
      <Header />
      <NavBar />
      <Container title="Tiendas Favortias">
        <div className="flex justify-center items-center mt-8 space-x-4 py-3 px-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {commerces.map((c, i) => (
            <CommerceInfoBox
              key={i}
              image={c.image_url} // Reemplaza con c.image_url si está disponible
              commerceName={c.name}
              location={c.location}
              calification={c.average_score ?? 0}
              comment={`${c.comment_count ?? 0} comentarios`}
              onClick={() => navigateCommerce(c.commerce_id)}
            />
          ))}
        </div>

        <div className="mt-8">
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
        </div>
      </Container>

    </div>
  );
}