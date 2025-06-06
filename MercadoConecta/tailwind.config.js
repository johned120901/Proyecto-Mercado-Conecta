/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-darkest': '#05172E',    // Fondo profundo
        'blue-deep': '#09244A',        // Segundo tono profundo
        'blue-intense': '#0E3F78',     // Azul saturado para secciones
        'blue-vibrant': '#1083D6',     // Botones y acciones principales
        'blue-sky': '#1071B9',         // Hover para botones y links
        'blue-midnight': '#050E1B',    // Fondo muy oscuro para overlays
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
