"use client";

import React from "react";

const CustomFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Parte superior del footer */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Marca */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">La Herradura</h1>
            <p className="text-gray-400 text-sm mt-1">
              Salón destinado a eventos
            </p>
          </div>

          {/* Redes sociales y teléfono */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            {/* Redes sociales */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-blue-500 transition duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.675 0h-21.35C.6 0 0 .6 0 1.342v21.317C0 23.4.6 24 1.342 24h11.495v-9.294H9.69V11.31h3.147V8.726c0-3.117 1.894-4.817 4.659-4.817 1.325 0 2.464.099 2.795.143v3.24l-1.917.001c-1.504 0-1.796.715-1.796 1.764v2.31h3.587l-.467 3.396h-3.12V24h6.116C23.4 24 24 23.4 24 22.658V1.342C24 .6 23.4 0 22.675 0z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-pink-500 transition duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.267.07 1.647.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.267.058-1.647.07-4.851.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.267-.07-1.647-.07-4.851s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.267-.058 1.647-.07 4.851-.07zm0-2.163c-3.259 0-3.667.012-4.947.072-1.281.06-2.558.341-3.535 1.317-.977.977-1.257 2.254-1.317 3.535-.06 1.281-.072 1.689-.072 4.947s.012 3.667.072 4.947c.06 1.281.341 2.558 1.317 3.535.977.977 2.254 1.257 3.535 1.317 1.281.06 1.689.072 4.947.072s3.667-.012 4.947-.072c1.281-.06 2.558-.341 3.535-1.317.977-.977 1.257-2.254 1.317-3.535.06-1.281.072-1.689.072-4.947s-.012-3.667-.072-4.947c-.06-1.281-.341-2.558-1.317-3.535-.977-.977-2.254-1.257-3.535-1.317-1.281-.06-1.689-.072-4.947-.072zM12 5.838a6.163 6.163 0 1 0 0 12.326 6.163 6.163 0 1 0 0-12.326zm0 10.326a4.163 4.163 0 1 1 0-8.326 4.163 4.163 0 1 1 0 8.326zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 1 0 0 2.88z"
                  />
                </svg>
              </a>
            </div>

            {/* Número de teléfono */}
            <p className="text-gray-400 text-sm">
              Teléfono: <a href="tel:+54 3585047802" className="text-white hover:underline">+54 3585047802</a>
            </p>
          </div>
        </div>

        {/* Parte inferior del footer */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} La Herradura. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
