"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Obtiene la URL de la API de las variables de entorno
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Validar los campos de entrada
  const validateInputs = () => {
    if (!username.trim()) {
      setError("El nombre de usuario es obligatorio.");
      return false;
    }
    if (!password.trim()) {
      setError("La contraseña es obligatoria.");
      return false;
    }
    return true;
  };

  // Manejar el login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar el error previo

    // Validar los inputs antes de proceder
    if (!validateInputs()) return;

    try {
      // Log para verificar la URL de la API
      console.log("API URL:", API_URL);

      // Realizar la solicitud de login
      const res = await fetch(`${API_URL}api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
        mode: "cors",
      });

      // Log para verificar la respuesta del servidor
      console.log("Respuesta del servidor:", res);

      if (res.ok) {
        const data = await res.json();

        // Log para verificar los datos recibidos
        console.log("Datos del backend:", data);

        // Guardar el estado de sesión y el token en sessionStorage
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("token", data.token);

        // Redirigir al panel de administración
        console.log("Redirigiendo a /admin");
        router.push("/Admin");
      } else {
        const data = await res.json();
        // Log para verificar el mensaje de error recibido
        console.log("Error del backend:", data);
        setError(data.message || "Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      // Capturar y loguear errores de conexión
      console.error("Error de conexión o solicitud:", err);
      setError("Error de conexión. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
