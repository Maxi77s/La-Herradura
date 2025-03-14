import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRouter from './routers/adminRouter';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  "http://localhost:3000",
  "https://la-herradura-flax.vercel.app",
  "https://la-herradura-production.onrender.com"
];

// Middleware de CORS optimizado
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para manejar preflight requests (OPTIONS)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

// Ruta raíz para verificar si el backend está vivo
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Backend funcionando correctamente en Render ✔️');
});

// Verificar conexión con base de datos
if (!process.env.DATABASE_URL) {
  throw new Error("❌ Falta DATABASE_URL en el entorno (.env o Render)");
}

// Escuchar en el puerto asignado por Render o local
const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
