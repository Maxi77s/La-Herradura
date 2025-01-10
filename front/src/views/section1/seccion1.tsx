import Seccion1 from "@/components/carrusel/carrusel";

const Seccion1Page = () => {
  return (
    <div className="relative min-h-screen">
      {/* Fondo con gradiente animado más visible */}
      <div className="absolute inset-0 animate-gradient-background z-0"></div>
      
      <div className="absolute inset-0 bg-opacity-20 backdrop-blur-sm z-10"></div>
      
      <div className="relative z-20">
        <Seccion1 />
      </div>
    </div>
  );
};

export default Seccion1Page;
