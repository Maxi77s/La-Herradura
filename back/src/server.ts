import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRouter from "./routers/adminRouter";
import appointmentRouter from "./routers/appointmentRouter";

// Cargar variables de entorno
dotenv.config();

// Validación de variables necesarias
if (!process.env.DATABASE_PUBLIC_URL) {
  throw new Error("❌ ERROR: DATABASE_PUBLIC_URL no está configurada.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("❌ ERROR: JWT_SECRET no está configurada.");
}

// Mostrar info por consola
console.log("🔍 DATABASE_PUBLIC_URL:", process.env.DATABASE_PUBLIC_URL);
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// ✅ CORS — solo con esto alcanza
app.use(cors({
  origin: "https://la-herradura-flax.vercel.app", // Tu frontend en producción
  credentials: true,
}));

// ✅ Middleware para parsear JSON
app.use(express.json());

// ✅ Rutas principales
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 Servidor funcionando correctamente en Railway ✔️" });
});

app.use("/api/admin", adminRouter);
app.use("/api/appointments", appointmentRouter);

// ✅ Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error ocurrido:", err.message || err);
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});

export default app;
