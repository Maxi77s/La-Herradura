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
  throw new Error("❌ ERROR: JWT_SECRET no está configurado en las variables de entorno.");
}

// Mostrar variables de entorno (solo para depuración, eliminar en producción)
console.log("🔍 DATABASE_PUBLIC_URL:", process.env.DATABASE_PUBLIC_URL);
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  "http://localhost:3001",
  "https://la-herradura-flax.vercel.app",
  "https://la-herradura-production.up.railway.app",
];

// Middleware para verificar el origen de las peticiones (para depuración)
app.use((req, res, next) => {
  console.log("🔍 Origin de la petición:", req.headers.origin);
  next();
});

// Configuración de CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        console.log("✅ Origen permitido:", origin);
        callback(null, true);
      } else {
        console.log("❌ Origen bloqueado:", origin);
        callback(new Error("No permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware para manejar preflight requests (OPTIONS)
app.options("*", cors());

// Middleware JSON
app.use(express.json());

// Ruta principal
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 Servidor funcionando correctamente en Railway ✔️" });
});

// Rutas
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
