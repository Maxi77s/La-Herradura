"use client";

import React, { useState, useEffect } from "react";
import Reserva from "@/components/formReserva/reserva";

const reserva = () => {
  const occupiedDates = ["2025-01-20", "2025-01-21"]; // Fechas ocupadas
  const handleBooking = (data: {
    date: string;
    name: string;
    phone: string;
    comments: string;
  }) => {
    console.log("Datos de la reserva:", data);
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 min-h-screen">
      {/* Contenedor de la reserva con espaciado interno controlado */}
      <div className="pt-16">
        <Reserva occupiedDates={occupiedDates} onSubmit={handleBooking} />
      </div>
    </div>
  );
};

export default reserva;
