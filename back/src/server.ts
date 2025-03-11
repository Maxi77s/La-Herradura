import express, { Request, Response, NextFunction } from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

// Dominio del frontend permitido
const allowedOrigin = "https://la-herradura-flax.vercel.app";

// Configuración de CORS
app.use(cors({
  origin: allowedOrigin,
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middleware manual para asegurarnos de que CORS funciona en todas las respuestas
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(204); // Responder con éxito a las preflight requests
  } else {
    next();
  }
});

app.use(express.json());

// Endpoint raíz para verificar que el servidor responde
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando correctamente');
});

// Rutas de la aplicación
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

// Exportar la aplicación
export default app;