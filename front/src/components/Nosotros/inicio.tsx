const Inicio = () => {
  return (
    <>
      {/* Título principal */}
      <div className="py-28">
        <h1 className="text-center text-black text-3xl md:text-4xl font-bold tracking-wide">
          ACERCA DE 
        </h1>
      </div>

      {/* Sección 1: Texto a la izquierda, Imagen a la derecha */}
      <div className="flex flex-col md:flex-row items-center justify-center py-14 md:py-28 px-6 md:px-40 mt-[-10px]">
        <div className="md:w-2/5 text-center md:text-left space-y-4">
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
        </div>
        <div className="md:w-2/5 flex justify-center mt-6 md:mt-0">
          <img
            src="/image/front.jpg"
            alt="Experiencias inolvidables"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-md"
          />
        </div>
      </div>

      {/* Sección 2: Imagen a la izquierda, Texto a la derecha */}
      <div className="flex flex-col md:flex-row-reverse items-center bg-color4 justify-center py-14 md:py-28 px-6 md:px-40">
        <div className="md:w-2/5 text-center md:text-left space-y-4">
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
        </div>
        <div className="md:w-2/5 flex justify-center mt-6 md:mt-0">
          <img
            src="/image/fiesta.jpeg"
            alt="Innovación y Visión"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-md"
          />
        </div>
      </div>

      {/* Sección 3: Texto a la izquierda, Imagen a la derecha */}
      <div className="flex flex-col md:flex-row items-center justify-center py-14 md:py-28 px-6 md:px-40">
        <div className="md:w-2/5 text-center md:text-left space-y-4">
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
        </div>
        <div className="md:w-2/5 flex justify-center mt-6 md:mt-0">
          <img
            src="/image/imagenmario.jpeg"
            alt="Misión Transformadora"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-md"
          />
        </div>
      </div>
    </>
  );
};

export default Inicio;
