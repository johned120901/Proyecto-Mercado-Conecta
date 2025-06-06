import { useState } from 'react';
import RegisterModal from './RegisterModal';
import RotatingText from './ux/RotatingText'; // 👈 Importando desde components/ux/RotatingText
import heroBg from '../assets/fondo.png'; // 👈 Fondo

export default function Hero() {
  const [regOpen, setRegOpen] = useState(false);

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay para oscurecer el fondo */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido principal */}
      <div className="relative z-10 px-4 max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Bienvenido a <span className="text-blue-vibrant">Mercado Conecta</span>
        </h1>

        {/* Rotating Text debajo del título */}
        <div className="mt-4 flex justify-center">
          <RotatingText
            texts={['Optimización', 'Facilidad', 'Crecimiento', 'Éxito']}
            mainClassName="px-4 py-2 bg-blue-vibrant text-white rounded-full text-lg font-semibold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        <p className="text-lg md:text-2xl text-white/80">
          Simplifica la gestión de tu pequeño negocio de forma inteligente y eficiente.
        </p>

        <button
          onClick={() => setRegOpen(true)}
          className="mt-6 px-8 py-4 bg-blue-vibrant hover:bg-blue-sky text-white font-semibold rounded-full text-lg transition-transform transform hover:scale-105"
        >
          Regístrate gratis
        </button>
      </div>

      {/* Modal de registro */}
      <RegisterModal isOpen={regOpen} onClose={() => setRegOpen(false)} />
    </section>
  );
}
