"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Detect scroll to add background blur
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className={`${
        isMenuOpen
          ? "bg-black"
          : hasScrolled
          ? "bg-black bg-opacity-60 backdrop-blur-md"
          : "bg-transparent"
      } fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out font-poppins`}
    >
      <div className="px-4 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/image/LAHERRADURA.png"
            alt="Icon"
            className="w-24 h-auto object-contain hover:brightness-150 transition-all duration-300"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.span
            whileHover={{ scale: 1.1, color: "linear-gradient(to right, #3AB4F2, #65C0BA)" }}
            className="text-white font-light text-lg cursor-pointer transition-all duration-300"
          >
            Inicio
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.1, color: "linear-gradient(to right, #3AB4F2, #65C0BA)" }}
            className="text-white font-light text-lg cursor-pointer transition-all duration-300"
          >
            Servicios
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.1, color: "linear-gradient(to right, #3AB4F2, #65C0BA)" }}
            className="text-white font-light text-lg cursor-pointer transition-all duration-300"
          >
            Contacto
          </motion.span>
        </div>

        {/* Social Media Icons */}
        <div className="hidden md:flex space-x-4">
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-white text-lg hover:text-[#25D366] transition-all duration-300" />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white text-lg hover:text-[#E1306C] transition-all duration-300" />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-white text-lg hover:text-[#1877F2] transition-all duration-300" />
          </a>
        </div>

        {/* Hamburger Menu */}
        <div
          className="md:hidden flex items-center"
          onClick={toggleMenu}
        >
          <motion.svg
            whileHover={{ scale: 1.1, fill: "#3AB4F2" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </motion.svg>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black bg-opacity-90 backdrop-blur-md flex flex-col items-center justify-center space-y-8"
        >
          <motion.div
            className="absolute top-6 right-6 cursor-pointer"
            onClick={toggleMenu}
          >
            <motion.svg
              whileHover={{ scale: 1.2, fill: "#3AB4F2" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          </motion.div>

          <motion.span
            whileHover={{ scale: 1.2, color: "#3AB4F2" }}
            className="text-white font-light text-lg cursor-pointer"
          >
            Inicio
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.2, color: "#3AB4F2" }}
            className="text-white font-light text-lg cursor-pointer"
          >
            Servicios
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.2, color: "#3AB4F2" }}
            className="text-white font-light text-lg cursor-pointer"
          >
            Contacto
          </motion.span>
          <div className="flex space-x-4">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-white text-xl hover:text-[#25D366] transition-all duration-300" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-xl hover:text-[#E1306C] transition-all duration-300" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white text-xl hover:text-[#1877F2] transition-all duration-300" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
