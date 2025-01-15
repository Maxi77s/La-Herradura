import {
    FormValues,
    validateForm,
    ValidationErrors,
} from "@/helpers/validaciones";
import es from "date-fns/locale/es";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

registerLocale("es", es);

interface BookingFormProps {
  occupiedDates: string[];
  onSubmit: (data: {
    date: string;
    name: string;
    phone: string;
    comments: string;
  }) => void;
}

const Reserva: React.FC<BookingFormProps> = ({ occupiedDates, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Convert occupiedDates to Date objects
  const occupiedDateObjects = occupiedDates.map((date) => new Date(date));

  // Validate the form on any field change
  useEffect(() => {
    const formValues: FormValues = {
      name,
      phone,
      comments,
      selectedDate,
      occupiedDates,
    };
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);
  }, [name, phone, comments, selectedDate, occupiedDates]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Si no hay errores, envía los datos
    onSubmit({
      date: selectedDate!.toISOString().split("T")[0],
      name,
      phone,
      comments,
    });
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
    <div className="max-w-4xl mx-auto p-6 border border-gray-300 rounded shadow-lg bg-white">
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
            <p className="text-red-500 text-sm mt-2">{errors.selectedDate}</p>
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
    </div>
  );
};

export default Reserva;
