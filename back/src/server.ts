import express, { Request, Response } from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

// Configuración de CORS para permitir cualquier subdominio de Vercel y Railway
const allowedOrigins = [
  "http://localhost:3000",  // Localhost para desarrollo
  "https://la-herradura-flax.vercel.app",  // Subdominio específico de Vercel
  "https://la-herradura-production.up.railway.app",  // URL de producción en Railway
  /\.vercel\.app$/,  // Permite cualquier subdominio en Vercel
];

// Configuración de CORS
app.use(cors({
  origin: (origin, callback) => {
    // Si la solicitud no tiene origen o si el origen está permitido
    if (!origin || allowedOrigins.some(o => (typeof o === "string" ? o === origin : o.test(origin)))) {
      callback(null, true);  // Permite la solicitud
    } else {
      callback(new Error("No permitido por CORS"));  // Rechaza la solicitud
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS",  // Métodos permitidos
  allowedHeaders: "Content-Type, Authorization",  // Encabezados permitidos
  credentials: true,  // Permite el envío de cookies
}));

app.use(express.json());

// Endpoint raíz para verificar que el servidor responde
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Servidor funcionando correctamente en Railway ✔️');
});

// Rutas principales
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

// Puerto del servidor
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});
