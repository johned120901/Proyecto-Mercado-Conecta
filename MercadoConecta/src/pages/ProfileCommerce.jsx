import { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Commerce as commerceService } from '../lib/Commerce';
import { useLocation, useNavigate } from "react-router-dom";
import ImageUploadField from "../components/ImageUploadField";
import CommerceDeleteModal from "../components/CommerceDeleteModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export default function ProfileCommerce() {

  const query = useQuery();
  const id = query.get('id');
  const [commerce, setCommerce] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCommerce = async () => {
    await commerceService.getById(id)
      .then(setCommerce)
      .catch(console.error);
  }

  const setImage = async (url) => {
    try {
      await commerceService.update(id, { image_url: url });
    } catch (error) {
      console.log(error.message);
    }
  }

  const onEdit = () => {
    navigate(`/your-commerce?id=${id}`);
  }

  const onDelete = () => {
    setOpen(true);
  }

  const deleteCommerce = async () => {
    try {
      await commerceService.delete(id).then(navigate('/profile'));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchCommerce()
    }
  }, [id]);

  return (
    <div>
      <Header />
      <NavBar />
      <div className="space-y-4 mt-24 mb-8 w-full flex flex-col items-center">
        <div className='w-[20%]'>
          <ImageUploadField
            initialUrl={commerce?.image_url || ''}
            onUpload={(url) => setImage(url)}
            label="Puedes cambiar tu foto de tu tienda"
            commerce={true}
          />
        </div>
        <span className="text-[50px]">{commerce?.nombre_comercio || ''}</span>
      </div>
      <div className="bg-[#D9D9D9]  w-[50%] m-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md  flex my-8 items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm text-gray-600">Nombre de la tienda</h3>
              <p className="text-lg font-medium">{commerce?.nombre_comercio || 'Nombre usuario'}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Categoría</h3>
              <p className="text-lg font-medium">{commerce?.tipo_nombre || 'Categoría'}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Dirección</h3>
              <p className="text-lg font-medium">{commerce?.location || 'Dirección'}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-40 mt-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
              onClick={onEdit}
            >
              Editar tienda
            </button>
            <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
              onClick={onDelete}
            >
              Eliminar tienda
            </button>
          </div>
        </div>

      </div>
      <CommerceDeleteModal commerce={commerce} isOpen={isOpen} onClose={() => setOpen(false)} onSave={deleteCommerce} />
    </div>
  )
}