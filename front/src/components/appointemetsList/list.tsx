"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Appointment {
  id: number | null;
  date: string;
  time: string;
  status: "active" | "canceled";
  description: string;
  clientName: string;
}

const AppointmentsList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const checkAuth = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/Login");
    }
    return token;
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = checkAuth();

      if (token) {
        try {
          const response = await fetch(
            "http://localhost:3001/api/appointments",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error fetching appointments");
          }
          const data = await response.json();
          setAppointments(data);
        } catch (err) {
          setError("Error al obtener las citas");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [router]);

  const toggleAppointmentStatus = async (
    id: number | null,
    currentStatus: "active" | "canceled"
  ) => {
    if (id === null || id === undefined) {
      console.error("ID de la cita es inválido:", id);
      return;
    }

    const newStatus = currentStatus === "active" ? "canceled" : "active";
    const token = checkAuth();

    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/appointments/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        if (!response.ok) {
          throw new Error("Error al actualizar el estado de la cita");
        }

        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
      } catch (err) {
        setError("No se pudo actualizar el estado de la cita");
      }
    }
  };

  if (loading) {
    return <div className="text-center text-white">Cargando...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
      <div className="bg-gray-700 w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Lista de Reservas</h1>

        {/* Botón Crear Reserva */}
        <button
          onClick={() => router.push("/Admin")}
          className="w-full mb-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Crear Reserva
        </button>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="space-y-4">
          {appointments.map((appointment, index) => {
            const uniqueKey = appointment.id
              ? `${appointment.id}-${appointment.date}`
              : `fallback-key-${index}`;

            return (
              <div
                key={uniqueKey}
                className="bg-gray-600 p-4 rounded-lg shadow-md"
              >
                <div className="flex flex-col justify-between items-start space-y-2">
                  <p className="text-lg font-semibold text-white">{appointment.clientName}</p>
                  <p className="text-sm text-gray-400">
                    {appointment.date} - {appointment.time}
                  </p>
                  <p className="text-sm text-white">{appointment.description}</p>
                  <button
                    onClick={() =>
                      toggleAppointmentStatus(
                        appointment.id!,
                        appointment.status
                      )
                    }
                    className={`px-4 py-2 w-full text-white font-semibold rounded-md ${
                      appointment.status === "active"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } transition-all duration-300`}
                  >
                    {appointment.status === "active" ? "Cancelar" : "Habilitar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
