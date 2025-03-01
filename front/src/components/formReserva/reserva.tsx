<<<<<<< HEAD
import {
  FormValues,
  validateForm,
  ValidationErrors,
} from "@/helpers/validaciones";
import es from "date-fns/locale/es";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
=======
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
>>>>>>> ec31a3d8b4f7523e997b439a440ae868bb8c658d
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
<<<<<<< HEAD
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentView, setCurrentView] = useState<"form" | "payment">("form");
=======
  const [errors, setErrors] = useState<Record<string, string>>({});
>>>>>>> ec31a3d8b4f7523e997b439a440ae868bb8c658d

  useEffect(() => {
<<<<<<< HEAD
    if (currentView === "form") {
      const formValues: FormValues = {
        name,
        phone,
        comments,
        selectedDate,
        occupiedDates,
      };
      const validationErrors = validateForm(formValues);
      setErrors(validationErrors);
    }
  }, [name, phone, comments, selectedDate, occupiedDates, currentView]);
=======
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
>>>>>>> ec31a3d8b4f7523e997b439a440ae868bb8c658d

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : "No seleccionada";

<<<<<<< HEAD
    // Cambiar a la vista de pasarela de pago
    setCurrentView("payment");
=======
    onSubmit({ date: formattedDate, name, phone, comments });

    const whatsappMessage = `Hola, quiero consultar la disponibilidad para el día ${formattedDate}.\n\nNombre: ${name}\nTeléfono: ${phone}\nComentarios: ${comments || "Ninguno"}`;
    const whatsappUrl = `https://wa.me/543585047802?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, "_blank");
>>>>>>> ec31a3d8b4f7523e997b439a440ae868bb8c658d
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
<<<<<<< HEAD
    <div className="max-w-4xl mx-auto p-6 border border-gray-300 rounded shadow-lg bg-white">
      {currentView === "form" ? (
        <>
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Reservar Salón de Eventos
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Fecha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona un día:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                filterDate={(date) => !isDateDisabled(date)}
                locale="es"
                inline
                dayClassName={(date) => {
                  const isOccupied = isDateOccupied(date);
                  const isSelected =
                    selectedDate?.toISOString().split("T")[0] ===
                    date.toISOString().split("T")[0];
                  if (isOccupied) return "bg-red-500 text-white rounded-full";
                  if (isSelected) return "bg-blue-500 text-white rounded-full";
                  return "";
                }}
              />
              {errors.selectedDate && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.selectedDate}
                </p>
              )}
            </div>

            {/* Nombre, Teléfono y Comentarios */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                  placeholder="Ingresa tu nombre completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                  placeholder="Ingresa tu número de teléfono"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comentarios (opcional)
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                  placeholder="Ingresa algún comentario o requerimiento especial"
                />
                {errors.comments && (
                  <p className="text-red-500 text-sm mt-1">{errors.comments}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={Object.keys(errors).length > 0}
              >
                Reservar
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
            Pasarela de Pago
          </h2>
          <p className="text-center mb-4">
            Completa tu pago para confirmar tu reserva.
          </p>
          {/* Aquí puedes integrar tu pasarela de pago */}
          <button
            onClick={() => setCurrentView("form")}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Volver al Formulario
          </button>
        </div>
      )}
=======
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
>>>>>>> ec31a3d8b4f7523e997b439a440ae868bb8c658d
    </div>
  );
};

export default Reserva;
