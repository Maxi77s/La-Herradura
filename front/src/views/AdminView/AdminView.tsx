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

  if (!isAuthenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative flex flex-col items-center p-6 bg-gray-50 min-h-screen overflow-hidden">
      {/* Líneas curvas de fondo */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute top-0 left-0 w-full h-64 text-blue-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,160L48,186.7C96,213,192,267,288,245.3C384,224,480,128,576,96C672,64,768,96,864,117.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-full h-64 text-pink-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,32L48,37.3C96,43,192,53,288,64C384,75,480,85,576,101.3C672,117,768,139,864,160C960,181,1056,203,1152,192C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 z-10">
        Bienvenido al área de administración
      </h1>

      <form
        onSubmit={handleCreateAppointment}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-6 z-10"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">Fecha</label>
          <input
            type="date"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Hora</label>
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Estado</label>
          <select
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Activo</option>
            <option value="canceled">Cancelado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Descripción
          </label>
          <textarea
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Nombre del Cliente
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Crear Cita
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
