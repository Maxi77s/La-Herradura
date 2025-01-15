"use client";

import React from "react";

const Welcome: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-16 md:py-32 px-6 relative">
      {/* Capa de superposición */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-pink-500 opacity-10 blur-3xl"></div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center space-y-6">
        {/* Título con animación */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-white animate-fade-in">
          Noches <span className="text-yellow-400">inolvidables</span> en{" "}
          <span className="text-yellow-400">La Herradura</span>
        </h2>

        {/* Subtítulo con animación */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-slide-in">
          Ven y crea recuerdos eternos en un ambiente elegante y único diseñado para
          tu evento perfecto. Disfruta de una experiencia inigualable con servicio
          exclusivo y atención personalizada.
        </p>

        {/* Botones de llamada a la acción */}
        <div className="mt-8 space-x-6 flex justify-center animate-pop-in">
          <a
            href="#about"
            className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-md hover:bg-yellow-600 transition-all duration-300"
          >
            Conoce más
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 font-semibold rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
          >
            Contáctanos
          </a>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-16 left-16 w-16 h-16 bg-yellow-400 rounded-full opacity-40 blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-400 rounded-full opacity-30 blur-lg animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
      </div>
    </section>
  );
};

export default Welcome;
