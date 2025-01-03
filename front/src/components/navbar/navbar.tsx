"use client";
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent fixed top-0 left-0 z-50 w-full">
      <div className="px-4 py-2 flex justify-between items-center">
        {/* Contenedor del Logo y el Menú */}
        <div className="flex items-center w-full justify-between">
          {/* Icono a la izquierda */}
          <div className="flex items-center space-x-6 w-auto h-auto">
            <img
              src="/iconoHerradura.png"
              alt="Icon"
              className="w-48 h-auto object-contain"
            />

            {/* Menú de navegación en pantallas grandes, alineado a la izquierda */}
            <div className="hidden md:flex space-x-6 justify-start">
              <span className="text-white font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
                Inicio
              </span>
              <span className="text-white font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
                Servicios
              </span>
              <span className="text-white font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
                Contacto
              </span>
            </div>
          </div>

          {/* Icono de menú hamburguesa para pantallas pequeñas */}
          <div className="md:hidden flex items-center" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Fondo cristalino cuando el menú hamburguesa está abierto */}
      {isMenuOpen && (
        <>
          {/* Capa oscura con efecto de transparencia (cubriendo toda la pantalla) */}
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={toggleMenu} // Cierra el menú cuando haces clic fuera
          ></div>

          {/* Menú desplegable para pantallas pequeñas, con fondo cristalino */}
          <div className="md:hidden flex flex-col items-center justify-center space-y-6 z-50 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 backdrop-blur-lg text-white py-6 h-screen">
            {/* Icono de cerrar el menú */}
            <div className="absolute top-4 right-4 cursor-pointer" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Opciones del menú */}
            <span
              className="font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400"
              onClick={toggleMenu} // Cierra el menú cuando se hace clic en las opciones
            >
              Inicio
            </span>
            <span
              className="font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400"
              onClick={toggleMenu}
            >
              Servicios
            </span>
            <span
              className="font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400"
              onClick={toggleMenu}
            >
              Contacto
            </span>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
