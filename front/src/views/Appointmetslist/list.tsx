"use client"
import AppointmentsList from '@/components/appointemetsList/list'
import React, { useEffect } from 'react'

const list = () => {
      // Oculta el Navbar al entrar y lo restaura al salir
      useEffect(() => {
        const navbar = document.querySelector("nav");
        if (navbar) navbar.style.display = "none";
    
        return () => {
          if (navbar) navbar.style.display = ""; // Restaura el Navbar
        };
      }, []);
  return (
    
    <AppointmentsList />
  )
}

export default list
