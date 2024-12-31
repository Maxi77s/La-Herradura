import ThreeModel from "../../components/modelo3D/herradura3d";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#1f1f1f]">
      {/* Fondo detrás del modelo 3D */}
      <div className="absolute inset-0 z-0"></div>

      {/* Contenedor del Modelo 3D */}
      <div className="w-full h-full relative z-1">

        <ThreeModel />
      </div>
    </div>
  );
};

export default Home;
