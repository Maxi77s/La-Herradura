import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRouter from "./routers/adminRouter";
import appointmentRouter from "./routers/appointmentRouter";

// Cargar variables de entorno
dotenv.config();

if (!process.env.DATABASE_PUBLIC_URL) {
  throw new Error("❌ ERROR: DATABASE_PUBLIC_URL no está configurada en las variables de entorno.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("❌ ERROR: JWT_SECRET no está configurada en las variables de entorno.");
}

// Mostrar variables de entorno (solo para depuración, eliminar en producción)
console.log("🔍 DATABASE_PUBLIC_URL:", process.env.DATABASE_PUBLIC_URL);
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// CORS Options
const corsOptions = {
  origin: "https://la-herradura-flax.vercel.app", // Cambia si tu frontend cambia de dominio
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware JSON primero
app.use(express.json());

// Configuración de CORS global
app.use(cors(corsOptions));

// Middleware adicional para asegurarse que todos los headers CORS estén presentes SIEMPRE
const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "https://la-herradura-flax.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(204); // <-- sin "return", solo ejecuta y termina
  } else {
    next();
  }
};

app.use(corsMiddleware);


// Ruta principal
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 Servidor funcionando correctamente en Railway ✔️" });
});

// Middleware para ver origen de peticiones (solo para debug)
app.use((req, res, next) => {
  console.log("🔍 Origin de la petición:", req.headers.origin);
  next();
});

// Rutas API
app.use("/api/admin", adminRouter);
app.use("/api/appointments", appointmentRouter);

// Middleware global para manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error ocurrido:", err.message || err);
  res.status(err.status || 500).json({ error: err.message || "Hubo un error interno en el servidor" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});

export default app;
