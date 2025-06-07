import { useState, useEffect } from "react";

export default function ProfileModifyModal({ profile, isOpen, onClose, onSave }) {
  const [nameValue, handleName] = useState('');
  const [emailValue, handleEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen && profile) {
      handleName(profile.name || '');
      handleEmail(profile.email || '');
    }
  }, [isOpen, profile]);

  const validateSave = () => {
    if (!nameValue || !emailValue) {
      setErrorMessage('Por favor completa todos los campos obligatorios.');
      return;
    }
    onSave({ name: nameValue, email: emailValue });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
        <h2 className="text-3xl font-heading font-bold mb-8 text-center text-blue-darkest">
          Editar perfil
        </h2>
        {errorMessage && (
          <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>
        )}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-darkest mb-2">Nombres</label>
            <input
              value={nameValue}
              onChange={({ target: { value } }) => handleName(value)}
              type="text"
              className="w-full border border-blue-deep/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-vibrant text-blue-darkest placeholder-gray-400"
            />
          </div>
          <button
            onClick={validateSave}
            className="w-full bg-blue-vibrant hover:bg-blue-sky text-white font-semibold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
