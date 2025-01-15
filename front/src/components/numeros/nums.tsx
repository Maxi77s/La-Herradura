"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatisticsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animar solo la primera vez que entra en vista
    threshold: 0.2, // Activar cuando el 20% del elemento es visible
  });

  return (
    <section className="relative py-16 bg-gray-50 shadow-md">
      {/* Línea decorativa arriba */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          ¡Gracias por confiar en nosotros!
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
        >
          {/* Clientes que confiaron */}
          <div className="p-6 bg-white rounded-md shadow-lg">
            {inView && (
              <p className="text-4xl font-extrabold text-gray-800">
                <CountUp
                  start={0}
                  end={100}
                  duration={5}
                />
                <span className="text-indigo-600">+</span>
              </p>
            )}
            <p className="mt-2 text-sm text-gray-600">Clientes que confiaron</p>
          </div>

          {/* Eventos realizados */}
          <div className="p-6 bg-white rounded-md shadow-lg">
            {inView && (
              <p className="text-4xl font-extrabold text-gray-800">
                <CountUp
                  start={0}
                  end={250}
                  duration={5}
                />
                <span className="text-green-600">+</span>
              </p>
            )}
            <p className="mt-2 text-sm text-gray-600">Eventos realizados</p>
          </div>

          {/* Años de experiencia */}
          <div className="p-6 bg-white rounded-md shadow-lg">
            {inView && (
              <p className="text-4xl font-extrabold text-gray-800">
                <CountUp
                  start={0}
                  end={3}
                  duration={5}
                />
                <span className="text-yellow-600">+</span>
              </p>
            )}
            <p className="mt-2 text-sm text-gray-600">Años de experiencia</p>
          </div>
        </div>
      </div>

      {/* Línea decorativa abajo */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
    </section>
  );
};

export default StatisticsSection;
