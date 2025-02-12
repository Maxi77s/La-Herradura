import express, { Request, Response, NextFunction } from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

// Configuración de CORS dinámica para permitir cualquier subdominio de Vercel
const allowedOrigins = [
  "http://localhost:3000",
  "https://la-herradura-flax.vercel.app",
  "https://la-herradura-gg1q9spev-e-commerces-projects-7a8d629e.vercel.app"
];

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Detiene el flujo si es una preflight request
  } else {
    next(); // Llamar a next() en todas las demás solicitudes
  }
});

app.use(cors({
  origin: allowedOrigins,
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});