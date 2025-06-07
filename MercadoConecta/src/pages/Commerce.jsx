import { useEffect, useState } from 'react';
import { useAuth } from '../components/providers/authContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Commerce as commerceService } from '../lib/Commerce';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { Publications } from '../lib/Publications';
import DynamicSidebar from '../components/DynamicSidebar';
import { Heart } from 'lucide-react';
import FloatingScoreCard from '../components/FloatingScoreCard';
import { FavoriteCommerces } from '../lib/FavoriteCommerces';
import PublicationModal from '../components/PublicationModal';
import PublicationInfoBox from '../components/PublicationInfoBox';
import { Product } from '../lib/Product';
import ProductCard from '../components/ProductCard';
import Paginator from '../components/Paginator';
import ProductModal from '../components/ProductModal';
import ProductDeleteModal from '../components/ProductDeleteModal';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Commerce() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const query = useQuery();
  const id = query.get('id');
  const [commerce, setCommerce] = useState(null);
  const [productsArray, setProductsArray] = useState(null);
  const [publications, setPublications] = useState([]);
  const [isPublicationOpen, setPublicationOpen] = useState(false);
  const [isProductOpen, setProductOpen] = useState(false);
  const [type, setType] = useState('Publicaciones');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [productId, setProductId] = useState(null);
  const [isProductDeleteOpen, setProductDeleteOpen] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const listButtons = [
    {
      label: 'Publicaciones'
    },
    {
      label: 'Productos'
    }
  ];

  const fetchCommerce = async () => {
    await commerceService.getUserInsight(id, user.id)
      .then(setCommerce)
      .catch(console.error);
  }

  const handleFavorite = async () => {
    if (commerce.is_favorite) {
      await FavoriteCommerces.removeFavorite(user.id, id)
        .then(fetchCommerce)
        .catch(console.error)
    } else {
      await FavoriteCommerces.addFavorite(user.id, id)
        .then(fetchCommerce)
        .catch(console.error)
    }
  }

  const onSavePublication = async () => {
    setPublicationOpen(false);
    await fetchCommerce();
  }


  const handleSidebarButtonClick = (label) => {
    setType(label)
  };


  const fecthProducts = async () => {
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const { data, count } = await Product.getProductByCommerce(id, null, itemsPerPage, offset);
      setProductsArray(data);
      setTotalCount(count);
    } catch (error) {
      console.error('Error al cargar productos', error.message);
    }
  };

  const onSaveProduct = async () => {
    setProductOpen(false);
    await fecthProducts();
  }

  const onDeleteProduct = async () => {
    setProductDeleteOpen(false);
    await fecthProducts();
  }


  const fetchPublications = async () => {
    try {
      const data = await Publications.getWithUserReactions(user.id, id);
      setPublications(data);
    } catch (error) {
      console.error('Error al cargar publicaciones:', error.message);
    }
  }

  const openProductModalCreate = () => {
    setProductId(null);
    setProductOpen(true);
  }

  const openProductModalModify = async (id) => {
    await setProductId(id);
    setProductOpen(true);
  }

  const openProductModalDelete = async (id) => {
    await setProductId(id);
    setProductDeleteOpen(true);
  }

  useEffect(() => {
    const hasLogin = () => {
      if (!user) {
        navigate('/');
      }
    };

    const loadAll = async () => {
      await fetchCommerce();
      await fecthProducts();
      await fetchPublications();
    };

    if (id && user) {
      loadAll();
    }

    hasLogin();
  }, [id, user]);


  useEffect(() => {
    fecthProducts();
  }, [currentPage]);


  return (
    <div >
      <Header />
      <NavBar />
      <div className='min-h-screen bg-[#D9D9D9]  m-8  flex'>
        <div className="flex h-[1100px]">
          <div className="h-full">
            {commerce && (
              <DynamicSidebar
                userId={user?.id}
                commerceId={id}
                rating={commerce.user_score}
                isOwner={!commerce.is_owner}
                showEmpresa={true}
                commpress={commerce.commerce_name}
                listButtons={listButtons}
                showConfig={commerce.is_owner}
                onButtonClick={handleSidebarButtonClick}
                onConfig={() => navigate(`/profile-commerce?id=${id}`)}
              />
            )}
          </div>
        </div>
        {type == 'Publicaciones' ?
          <div className="space-y-4 m-8 w-full flex flex-col items-center">

            <div className="flex justify-between items-center mb-4 w-[42%]">
              {!commerce?.is_owner &&
                <button className="flex items-center space-x-2 text-blue-600 font-medium hover:underline" onClick={handleFavorite}>
                  <Heart className={`w-5 h-5 ${commerce?.is_favorite ? 'fill-red-500 text-red-500' : 'text-blue-600'}`} />
                  <span>Volver favorita</span>
                </button>
              }
              {commerce?.is_owner &&
                <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700" onClick={() => setPublicationOpen(true)}>
                  Publicar
                </button>
              }
            </div>

            {publications.map(pub => (
              <PublicationInfoBox
                key={pub.id}
                userId={user?.id ?? ''}
                publicationId={pub.id}
                name={pub.commerce_name ?? 'Desconocido'}
                description={pub.content}
                like={pub.likes}
                dislike={pub.dislikes}
                initialReaction={pub.userReaction}
                onCommerce={() => handleNavigateCommerce(pub.commerce_id)}
              />
            ))}
          </div>

          :
          <div className="space-y-4 m-8 w-full flex flex-col items-center">
            <div className="mb-4 w-[73%]">
              {commerce?.is_owner &&
                <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700" onClick={() => openProductModalCreate()}>
                  Crear Producto
                </button>
              }
            </div>
            <div className="flex justify-center items-center mt-8 space-x-4 py-3 px-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
              {productsArray?.map(prod => (
                <ProductCard
                  key={prod.id}
                  image={prod?.image_url}
                  name={prod?.name}
                  description={prod?.description}
                  price={prod?.price}
                  category={prod?.type_name}
                  isOwner={commerce?.is_owner}
                  onEdit={() => openProductModalModify(prod.id)}
                  onDelete={() => openProductModalDelete(prod.id)}
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
          </div>
        }


        <div className="gap-8">
          <FloatingScoreCard score={commerce?.average_score} />
        </div>

      </div>
      <PublicationModal commereceId={id} userId={user?.id} isOpen={isPublicationOpen} onClose={() => setPublicationOpen(false)} onSave={onSavePublication} />
      <ProductModal commerceId={id} productId={productId} isOpen={isProductOpen} onClose={() => setProductOpen(false)} onSave={onSaveProduct} />
      <ProductDeleteModal productId={productId} isOpen={isProductDeleteOpen} onClose={() => setProductDeleteOpen(false)} onSave={onDeleteProduct} />
    </div>
  );
}