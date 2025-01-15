"use client";

import Reserva from "@/components/formReserva/reserva";

const reserva = () => {
  const occupiedDates = ["2025-01-20", "2025-01-16"]; // Fechas ocupadas
  const handleBooking = (data: {
    date: string;
    name: string;
    phone: string;
    comments: string;
  }) => {
    console.log("Datos de la reserva:", data);
  };

  return <Reserva occupiedDates={occupiedDates} onSubmit={handleBooking} />;
};

export default reserva;
