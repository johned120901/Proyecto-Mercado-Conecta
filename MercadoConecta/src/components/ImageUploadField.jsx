import { useEffect, useState } from 'react';
import { ImagePlus } from 'lucide-react';

export default function ImageUploadField({ onUpload, label = "Adjuntar foto del producto", initialUrl = '', commerce = false }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialUrl) {
      setUploadedUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'MercadoConecta');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/drve7ob6t/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
        onUpload(data.secure_url);
      } else {
        throw new Error('No se pudo obtener la URL de la imagen');
      }
    } catch (err) {
      setError('Error al subir la imagen');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-darkest mb-2">
        {label}
      </label>

      <div className="flex items-center space-x-4 mb-2">
        <label className="cursor-pointer text-blue-600 hover:underline flex items-center space-x-2">
          <ImagePlus className="w-5 h-5" />
          {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        {uploadedUrl && !commerce && <span className="text-sm text-green-600">✅ Imagen cargada</span>}
      </div>

      {uploadedUrl && (
        <img
          src={uploadedUrl}
          alt="Vista previa"
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      )}

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
