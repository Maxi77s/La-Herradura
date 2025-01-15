import Nosotros from "@/components/Nosotros/inicio";
import Welcome from "@/components/welcome/welcome";
import ThreeModel from "../../components/modelo3D/herradura3d";
import Section1 from "../section1/seccion1";
import StatisticsSection from "../StatisticsSection/StatisticsSection";
import Reserva from "../reserva/reserva";
const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Fondo detrás del modelo 3D */}
      <div className="absolute inset-0 z-0"></div>

      {/* Contenedor del Modelo 3D */}
      <div className="w-full h-full relative z-1">
        <ThreeModel />
        <Reserva/>
        <Nosotros/>
        <StatisticsSection/>
        <Section1 />
      </div>
    </div>
  );
};

export default Home;