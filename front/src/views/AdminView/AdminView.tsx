"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/Login"); // Redirige al login si no hay token
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Oculta el Navbar al entrar y lo restaura al salir
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "none";

    return () => {
      if (navbar) navbar.style.display = ""; // Restaura el Navbar
    };
  }, []);

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formattedDate = new Date(date).toISOString(); // Convertir la fecha a formato ISO-8601

    const appointmentData = {
      date: formattedDate,
      time,
      status,
      description,
      clientName,
    };

    try {
      const response = await fetch("http://localhost:3001/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Cita creada con éxito");
      } else {
        const data = await response.json();
        setError(data.message || "Error al crear la cita");
      }
    } catch (error) {
      setError("Error de conexión");
    }
  };

  const handleRedirectToAppointments = () => {
    router.push("/appointmentsList");
  };

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
      <div className="bg-gray-700 w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Bienvenido al área de administración</h1>
        
        <button
          onClick={handleRedirectToAppointments}
          className="w-full mb-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Turnos
        </button>

        <form
          onSubmit={handleCreateAppointment}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300">Fecha</label>
            <input
              type="date"
              className="w-full mt-1 p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Hora</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Estado</label>
            <select
              className="w-full mt-1 p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Activo</option>
              <option value="canceled">Cancelado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Descripción</label>
            <textarea
              className="w-full mt-1 p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Nombre del Cliente</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Crear Cita
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
