import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-transparent fixed top-0 left-0 z-50 w-full">
      <div className="px-4 py-2 flex justify-start items-center">
        {/* Icon on the left */}
        <div className="w-auto h-auto">
          <img
            src="/iconoHerradura.png"
            alt="Icon"
            className="w-48 h- object-contain" // Cambia el tamaño según necesites
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
