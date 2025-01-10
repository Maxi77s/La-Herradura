"use client";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Estado para el submenú
  const [hasScrolled, setHasScrolled] = useState(false); // Estado para detectar el scroll

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Detecta el scroll y cambia el estado de hasScrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) { // Cambiar a 150px
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        // Si el menú está abierto, quitamos la opacidad, sino la mantenemos
        isMenuOpen ? "bg-black" : hasScrolled ? "bg-black bg-opacity-50 backdrop-blur-md" : "bg-transparent"
      } fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out`} // Transición suave para los cambios
    >
      <div className="px-4 py-1 flex justify-between items-center">
        {/* Contenedor del Logo y el Menú */}
        <div className="flex items-center w-full justify-between">
          {/* Icono a la izquierda */}
          <div className="flex items-center space-x-6 w-auto h-auto">
            <img
              src="/iconoHerradura.png"
              alt="Icon"
              className="w-48 h-auto object-contain"
            />

            {/* Menú de navegación en pantallas grandes */}
            <div className="hidden md:flex space-x-6 justify-start relative">
              <span className="text-white font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
                Inicio
              </span>

              {/* Servicios con Submenú */}
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleServices}
                >
                  <span className="text-white font-light text-lg transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
                    Servicios
                  </span>
                </div>
              </div>

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
          {/* Capa oscura con efecto de transparencia sobre toda la pantalla */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-40`} // Fondo oscuro y opaco
            onClick={toggleMenu}
          ></div>

          {/* Menú desplegable para pantallas pequeñas */}
          <div className="md:hidden flex flex-col items-center justify-center space-y-6 z-50 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 backdrop-blur-md text-white py-6 h-screen">
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={toggleMenu}
            >
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
            <span className="font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
              Inicio
            </span>
            <div className="relative w-full text-center">
              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={toggleServices}
              >
                <span className="font-light text-lg transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
                  Servicios
                </span>
              </div>
            </div>
            <span className="font-light text-lg cursor-pointer transition-all duration-300 transform hover:scale-110 hover:text-gray-400">
              Contacto
            </span>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
