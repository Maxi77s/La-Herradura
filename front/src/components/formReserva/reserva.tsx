"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

const esLocale = {
  ...es,
  options: {},
};
registerLocale("es", esLocale);

const DatePicker = dynamic(
  () => import("react-datepicker").then((mod) => mod.default as React.ComponentType<any>),
  { ssr: false }
);

interface ReservaProps {
  occupiedDates: string[];
  onSubmit: (data: {
    date: string;
    name: string;
    phone: string;
    comments: string;
  }) => void;
}

const Reserva: React.FC<ReservaProps> = ({ onSubmit }) => {
  const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchOccupiedDates = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/api/appointments/`);
        const data = await response.json();
        
        const dates = data
          .filter((appointment: { status: string }) => appointment.status === "active")
          .map((appointment: { date: string }) => appointment.date.split("T")[0]);
        
        setOccupiedDates(dates);
      } catch (error) {
        console.error("Error al obtener las fechas ocupadas:", error);
      }
    };

    fetchOccupiedDates();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedDate) newErrors.selectedDate = "Por favor selecciona una fecha.";
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!phone.trim()) newErrors.phone = "El número de teléfono es obligatorio.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "No seleccionada";

    onSubmit({ date: formattedDate, name, phone, comments });

    const whatsappMessage = `Hola, quiero consultar la disponibilidad para el día ${formattedDate}.\n\nNombre: ${name}\nTeléfono: ${phone}\nComentarios: ${comments || "Ninguno"}`;
    const whatsappUrl = `https://wa.me/543585047802?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, "_blank");
  };

  const isDateOccupied = (date: Date): boolean => {
    const formattedDate = date.toISOString().split("T")[0];
    return occupiedDates.includes(formattedDate);
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || isDateOccupied(date);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 flex justify-center items-start">
      <div className="flex flex-col lg:flex-row gap-8 items-start w-11/12 max-w-5xl p-6 mt-16 border border-gray-700 rounded-lg shadow-xl bg-gray-950">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-3">Selecciona un día:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            locale="es"
            filterDate={(date: Date) => !isDateDisabled(date)}
            inline
            calendarClassName="bg-gray-800 border-gray-700 text-gray-300"
            dayClassName={(date: Date) => {
              const isOccupied = isDateOccupied(date);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (isOccupied) return "bg-red-600 text-white rounded-full";
              if (date >= today)
                return "hover:bg-green-400 hover:text-black rounded-full";
              return "";
            }}
          />
          {errors.selectedDate && <p className="text-red-500 text-sm mt-2">{errors.selectedDate}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Nombre Completo *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-200" placeholder="Ingresa tu nombre" />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Teléfono *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-200" placeholder="Ingresa tu teléfono" />
            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Comentarios (opcional)</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-gray-200" placeholder="Ingresa un comentario" />
          </div>

          <button type="submit" className="w-full px-5 py-3 bg-teal-600 hover:bg-teal-500 rounded-lg text-white font-semibold">Consultar día de reserva</button>
        </form>
      </div>
    </div>
  );
};

export default Reserva;
