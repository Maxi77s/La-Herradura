"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateInputs()) return; // Si la validación falla, detiene la ejecución.

    try {
      const res = await fetch("http://localhost:3001/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("isLoggedIn", "true"); // Guarda el estado de sesión
        sessionStorage.setItem("token", data.token); // Guarda el token JWT
        router.push("/Admin"); // Redirige al componente admin
      } else {
        const data = await res.json();
        setError(data.message || "Usuario o contraseña incorrectos."); // Muestra mensaje de error del backend
      }
    } catch (err) {
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
