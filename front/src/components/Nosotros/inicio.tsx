"use client";

import { motion } from "framer-motion";


const Inicio = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 5 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 5 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 5 } },
  };

  return (
    <>
      {/* Título principal */}
      <div 
      id="nosotros"
      className="py-28">
        
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center text-black text-3xl md:text-4xl font-bold tracking-wide"
        >
          ACERCA DE
        </motion.h1>
      </div>

      {/* Sección 1: Texto a la izquierda, Imagen a la derecha */}
      <div className="flex flex-col md:flex-row items-center justify-center py-14 md:py-28 px-6 md:px-40 mt-[-150px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="md:w-2/5 text-center md:text-left space-y-4"
        >
          <h2 className="text-black text-xl md:text-2xl font-bold">Nosotros</h2>
          <p className="text-black text-sm md:text-base">
            En Salón La Herradura, nos dedicamos a ofrecer experiencias
            memorables y personalizadas para cada uno de nuestros clientes. Con
            un enfoque en la calidad y la atención al detalle, brindamos un
            espacio único y bien equipado, ideal para cualquier tipo de evento.
            Nuestro equipo se esfuerza por garantizar que cada ocasión se viva
            de manera especial, proporcionando un servicio excepcional y un
            ambiente acogedor para todos los asistentes.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInRight}
          className="md:w-2/5 flex justify-center mt-6 md:mt-0"
        >
          <img
            src="/image/front.jpg"
            alt="Experiencias inolvidables"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-md"
          />
        </motion.div>
      </div>

      {/* Sección 2: Imagen a la izquierda, Texto a la derecha */}
      <div className="flex flex-col md:flex-row-reverse items-center bg-color4 justify-center py-14 md:py-28 px-6 md:px-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInRight}
          className="md:w-2/5 text-center md:text-left space-y-4"
        >
          <h2 className="text-black text-xl md:text-2xl font-bold">
            Nuestra Visión
          </h2>
          <p className="text-black text-sm md:text-base">
            Nuestra visión es ser el lugar de referencia para celebraciones en
            la región, ofreciendo un entorno versátil y lleno de posibilidades
            para eventos de todo tipo. Buscamos innovar constantemente,
            adaptándonos a las necesidades de nuestros clientes y superando sus
            expectativas, convirtiendo cada evento en una experiencia única.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="md:w-2/5 flex justify-center mt-6 md:mt-0"
        >
          <img
            src="/image/fiesta.jpeg"
            alt="Innovación y Visión"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-md"
          />
        </motion.div>
      </div>

      {/* Sección 3: Texto a la izquierda, Imagen a la derecha */}
      <div className="flex flex-col md:flex-row items-center justify-center py-14 md:py-28 px-6 md:px-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="md:w-2/5 text-center md:text-left space-y-4"
        >
          <h2 className="text-black text-xl md:text-2xl font-bold">
            Nuestra Misión
          </h2>
          <p className="text-black text-sm md:text-base">
            En Salón La Herradura, nuestra misión es proporcionar un espacio
            ideal y servicios de alta calidad que hagan de cada evento una
            ocasión especial. Ofrecemos un ambiente cómodo, funcional y decorado
            con esmero, brindando equipamientos completos como cocina, asador,
            patio recreativo y más. Además, ofrecemos un servicio de coctelería
            de alta gama, con bebidas alcohólicas y sin alcohol, asegurando que
            cada evento sea una celebración memorable para todos.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInRight}
          className="md:w-2/5 flex justify-center mt-6 md:mt-0"
        >
          <img
            src="/image/imagenmario.jpeg"
            alt="Misión Transformadora"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-md"
          />
        </motion.div>
      </div>
    </>
  );
};

export default Inicio;
