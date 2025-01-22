"use client";
import { motion } from "framer-motion"; // Usamos framer-motion para animaciones suaves
import React, { useState } from "react";
import { useInView } from "react-intersection-observer"; // Para detectar cuando entra en vista
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Service {
  title: string;
  description: string;
  backgroundImage: string;
}

const services: Service[] = [
  {
    title: "Servicio del Salón",
    description:
      "Espacios modernos y elegantes para bodas, cumpleaños y reuniones.",
    backgroundImage: "/image/servicio.jpeg",
  },
  {
    title: "Servicio de Coctelería",
    description:
      "Salón La Herradura te ofrece servicio de coctelería por el bartender Mario Nievas ya recibido. Te ofrecemos bebidas con alcohol como también sin alcohol: Daiquiri, sex on the beach, negroni, licuados y mucho más",
    backgroundImage: "/image/coctel.webp",
  },
  {
    title: "Servicio de Catering",
    description:
      "Ofrecemos variadas bebidas y comidas para cualquier tipo de evento.",
    backgroundImage: "/image/catering1.webp",
  },
  {
    title: "Servicios Adicionales",
    description: "Música, decoración, iluminación y todo lo que necesites.",
    backgroundImage: "/image/otrosServicios.jpg",
  },
];

const ServiceCarousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    beforeChange: (current: number, next: number) => setActiveSlide(next),
    customPaging: (i: number) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: i === activeSlide ? "black" : "rgba(0, 0, 0, 0.5)",
        }}
        className="hover:bg-white transition-all duration-300 transform hover:scale-150"
      />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "relative",
          bottom: "-7px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul style={{ display: "flex", gap: "10px", padding: 0 }}>{dots}</ul>
      </div>
    ),
  };

  // Detectar cuando la sección entra en vista
  const { ref, inView } = useInView({
    triggerOnce: true, // Esto asegura que la animación solo se ejecute una vez al entrar en vista
    threshold: 0.3, // Esto controla qué tan visible tiene que estar el elemento para activar la animación
  });

  return (
    <div
    
      ref={ref}
      className="w-full flex justify-center py-8 px-4 sm:px-6 lg:px-8 pb-16 relative"
    >
      <div
      id="service"
        className="transform scale-100 sm:scale-75 origin-center"
        style={{ maxWidth: "85%", overflow: "visible" }}
      >
        {/* Título con animación y ajustes para evitar superposición en móviles */}
        <motion.h2
          className="text-[32px] sm:text-[40px] leading-[6px] font-semibold text-center text-gray-800 mb-4 sm:mb-16 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          Nuestros Servicios
        </motion.h2>

        {/* Párrafo con animación */}
        <motion.p
          className="text-lg text-center text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }} // Con retraso para la animación del párrafo
        >
          Ofrecemos una amplia variedad de servicios para hacer que tu evento
          sea único y memorable. Desde un ambiente elegante hasta cocteles y
          catering personalizados.
        </motion.p>

        <div
          className="relative min-h-[300px] sm:min-h-[450px] md:min-h-[650px]"
          style={{ paddingBottom: "80px" }}
        >
          <Slider {...settings} className="rounded-lg overflow-hidden">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative text-white rounded-lg overflow-hidden min-h-[300px] sm:min-h-[450px] md:min-h-[650px]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${service.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="absolute bottom-0 w-full bg-black bg-opacity-70 p-3 sm:p-4 md:p-6 rounded-b-lg shadow-xl">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Botón "Ver más fotos" con enlace */}
        <motion.a
          href="https://www.facebook.com/LaHerraduraSDE" // Cambia este enlace por el de tu página de Facebook
          target="_blank" // Abre el enlace en una nueva pestaña
          rel="noopener noreferrer" // Previene vulnerabilidades de seguridad
        >
          <motion.button
            className="flex justify-center mx-auto mt-8 px-8 py-3 bg-gradient-to-r from-blue-500  to-black text-white text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }} // Animación con un pequeño retraso
          >
            Ver más 
          </motion.button>
        </motion.a>
      </div>
    </div>
  );
};

export default ServiceCarousel;
