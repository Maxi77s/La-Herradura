import express from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  "http://localhost:3000",
  "https://la-herradura-flax.vercel.app",
  "https://la-herradura-production.up.railway.app"
];

// Configuración de CORS
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🟢 Solicitud recibida de:", origin); // Debug para ver qué origen llega
      if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true, // Permite el envío de cookies y autenticación
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  })
);

// Asegurar que las solicitudes OPTIONS sean manejadas correctamente
app.options("*", cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

// Puerto del servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway`);
});
