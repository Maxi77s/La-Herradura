"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Service {
  image: string;
  title: string;
  description: string;
  backgroundImage: string;
}

const services: Service[] = [
  {
    image:
      "https://scontent.fcor4-2.fna.fbcdn.net/v/t39.30808-6/469351001_562786629724055_4978169740195710305_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=Ga63r-hGI0cQ7kNvgGhUWqV&_nc_zt=23&_nc_ht=scontent.fcor4-2.fna&_nc_gid=AYtPrXxDzI4re1D2grk9Lee&oh=00_AYA47ybTgWaK4BPjgW52oaMNhwGWP8ao1wIiDqgANVBTiQ&oe=6781C071",
    title: "Servicio del Salón",
    description:
      "Espacios modernos y elegantes para bodas, cumpleaños y reuniones.",
    backgroundImage:
      "https://scontent.fcor4-2.fna.fbcdn.net/v/t39.30808-6/469356774_562785593057492_5222374866703448127_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=HSi6oxZDLngQ7kNvgH2AbZv&_nc_zt=23&_nc_ht=scontent.fcor4-2.fna&_nc_gid=AuozMGMS0PHjZjhs7ZNMIHV&oh=00_AYBd7Uo2sxThhsMXjnulVYC2CefsaJ0eyWakgHKs5Z6CuQ&oe=6781D240",
  },
  {
    image: "/image/imagenmario.jpeg",
    title: "Servicio de Coctelería",
    description:
      "Salón La Herradura te ofrece servicio de coctelería por el bartender Mario Nievas ya recibido.Te ofrecemos bebidas con alcohol como también sin alcohol: Daiquiri, sex on the beach, negroni, licuados y mucho más",
    backgroundImage: "/image/coctel.webp",
  },
  {
    image: "/image/catering.webp",
    title: "Servicio de Catering",
    description:
      "Ofrecemos variadas bebidas y comidas para cualquier tipo de evento.",
    backgroundImage: "/image/catering1.webp",
  },
  {
    image:
      "https://scontent.fcor4-2.fna.fbcdn.net/v/t39.30808-6/470133713_567445122591539_8200036398334718074_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=8drNKoHJmCIQ7kNvgF7haIX&_nc_zt=23&_nc_ht=scontent.fcor4-2.fna&_nc_gid=ANZ2z4-TlKPYPLSOB0_HvlZ&oh=00_AYD0y1l4JsPd-Gvn87Svrn6AegOtFnyq61JKeCE8x0Mn9g&oe=6781B09E",
    title: "Servicios Adicionales",
    description: "Música, decoración, iluminación y todo lo que necesites.",
    backgroundImage:
      "https://instagram.fcor4-2.fna.fbcdn.net/v/t39.30808-6/309387417_5421037631312025_7631510122364809371_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDExNTIuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fcor4-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=rO0OxRmGnigQ7kNvgEhU-6d&_nc_gid=c01a11ef139b4eb494ec6e7930ff5dd0&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MjkzODA4MTQyMzYxNDEyNTkyMQ%3D%3D.3-ccb7-5&oh=00_AYAoqT3mSRghKHabKCtGnyAGWFl75mWxtcZvzky0MwRhng&oe=6784308B&_nc_sid=22de04",
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
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor:
            i === activeSlide ? "white" : "rgba(255, 255, 255, 0.5)",
        }}
        className="hover:bg-white transition-colors duration-300"
      />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul style={{ display: "flex", gap: "10px", padding: 0 }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="w-full flex justify-center py-12 px-4 sm:px-6 lg:px-8 pb-20 relative">
      <div
        className="transform scale-90 sm:scale-75 origin-center"
        style={{ maxWidth: "85%", overflow: "hidden" }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-6">
          Nuestros Servicios
        </h2>
        <div className="min-h-[450px] md:min-h-[650px] relative ">
          <Slider {...settings} className="rounded-lg overflow-hidden">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-white rounded-lg overflow-hidden p-4 sm:p-6 min-h-[450px] md:min-h-[650px]"
              >
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${service.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "90%",
                    borderRadius: "10px",
                  }}
                ></div>
                <div className="relative z-10 p-2 sm:p-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-48 h-32 sm:w-64 sm:h-48 object-cover rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative mt-16 sm:mt-[150px] z-10 w-full text-center bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-lg">{service.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
