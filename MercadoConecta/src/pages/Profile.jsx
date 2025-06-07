import { User } from "lucide-react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useAuth } from "../components/providers/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserModel } from '../lib/User';
import DynamicSidebar from "../components/DynamicSidebar";
import PersonalData from "../components/PersonalData";
import StoreList from "../components/StoreList";
import { Commerce } from "../lib/Commerce";
import { FavoriteCommerces } from "../lib/FavoriteCommerces";
import FavoriteRemoveModal from "../components/FavoriteRemoveModal";
import ProfileModifyModal from "../components/ProfileModifyModal";

export default function Profile() {
  const { user } = useAuth();
  const [nombre, setNombre] = useState('');
  const [type, setType] = useState('Infomacion general');
  const [commerces, setCommerces] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isOpenFavorite, setIsFavorite] = useState(false);
  const [commerceId, setCommerceId] = useState('');
  const [isOpenProfile, setIsProfile] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const listButtons = [
    {
      label: 'Infomacion general'
    },
    {
      label: 'Tiendas favoritas'
    }
  ];

  const handleSidebarButtonClick = (label) => {
    setType(label)
  };

  const onAddCommerce = () => {
    navigate('/your-commerce');
  }

  const fetchCommerceOwner = async () => {
    const data = await Commerce.getCommerceOwner(user.id);
    const commerces = data.map(item => {
      return {
        id: item.commerce_id,
        name: item.commerce_name,
      }
    });
    setCommerces(commerces);
  }

  const fetchFavorites = async () => {
    const data = await FavoriteCommerces.getFavoritesByUser(user.id);
    const commerces = data.map(item => {
      return {
        id: item.commerce_id,
        name: item.name,
        isFavorite: true
      }
    });
    setFavorites(commerces);
  }

  const onStoreClick = (store) => {
    navigate(`/commerce?id=${store.id}`)
  }

  const onFavoriteRemove = (commerce) => {
    setCommerceId(commerce.id);
    setIsFavorite(true);
  }

  const fetchRemoveFavorite = async () => {
    try {
      await FavoriteCommerces.removeFavorite(user.id, commerceId).then(() => {
        setIsFavorite(false);
        fetchFavorites();
      });
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchModifyUser = async (profile) => {
    try {
      await UserModel.updateUserTable(profile);
      setIsProfile(false);
      fetchNombre();
    } catch (error) {
      console.error('Error al actualizar perfil:', error.message);
    }
  };


  const fetchNombre = async () => {
    if (user?.email) {
      try {
        const nombreUsuario = await UserModel.getUserNameByEmail(user.email);
        setNombre(nombreUsuario);
        fetchCommerceOwner();
        fetchFavorites();
      } catch (error) {
        console.error('Error al obtener nombre:', error.message);
      }
    }
  };

  useEffect(() => {
    const hasLogin = () => {
      if (!user) {
        navigate('/');
      }
    };

    fetchNombre();
    hasLogin();
  }, [user]);



  return (
    <div>
      <Header />
      <NavBar />
      <div className="space-y-4 mt-32 mb-8 w-full flex flex-col items-center">
        <User size={150} />
        <span className="text-[50px]">{nombre || 'Usuario'}</span>
      </div>
      <div className=' bg-[#D9D9D9] w-[50%] m-auto flex'>
        <div className="flex h-[500px] w-[25%]">
          <div className="h-full">
            <DynamicSidebar
              userId={user?.id}
              showConfig={false}
              showEmpresa={false}
              listButtons={listButtons}
              onButtonClick={handleSidebarButtonClick}
            />
          </div>
        </div>
        {type == 'Infomacion general' ?
          <div className="flex flex-col gap-8 p-8 w-full">
            <PersonalData name={nombre || ''} email={user?.email || ''} onClick={() => setIsProfile(true)} />
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mis tiendas</h2>
                <button
                  onClick={onAddCommerce}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Agregar tienda
                </button>
              </div>
              <StoreList stores={commerces} onStoreClick={onStoreClick} />
            </div>

          </div>
          :
          <div className="flex flex-col gap-8 p-8 w-full">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
              <StoreList stores={favorites} onStoreClick={onStoreClick} onToggleFavorite={onFavoriteRemove} />
            </div>
          </div>
        }
      </div>
      <FavoriteRemoveModal commerceId={commerceId} isOpen={isOpenFavorite} onClose={() => setIsFavorite(false)} onSave={fetchRemoveFavorite} />
      <ProfileModifyModal profile={{ name: nombre, email: user?.email || '' }} isOpen={isOpenProfile} onClose={() => setIsProfile(false)} onSave={fetchModifyUser} />
    </div>
  )
}