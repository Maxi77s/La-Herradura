import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRouter from './routers/adminRouter';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://la-herradura-flax.vercel.app",
  "https://la-herradura-production.up.railway.app"
];

// Middleware de CORS optimizado
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // Devolver origen específico en vez de `true`
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
app.use('/admin', adminRouter);
app.use('/appointments', appointmentRouter);

// Ruta raíz para verificar que el backend está funcionando
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Servidor funcionando correctamente en Railway ✔️');
});

if (!process.env.DATABASE_PUBLIC_URL) {
  throw new Error("Falta DATABASE_PUBLIC_URL en .env o Railway Variables");
}

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway`);
});



// Exportar app si Railway lo requiere
export default app;
