import Seccion1 from "@/components/carrusel/carrusel";

const Seccion1Page = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/FondoHerradura.webp")' }}>
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-0"></div>
      <div className="relative z-10">
        <Seccion1 />
      </div>
    </div>
  );
};

export default Seccion1Page;
