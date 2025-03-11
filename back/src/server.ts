import express, { Request, Response } from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://la-herradura-flax.vercel.app",
  "https://la-herradura-production.up.railway.app",
];

app.use((req, res, next) => {
  console.log("🔍 Origin de la petición:", req.headers.origin);
  next();
});

app.use(cors({
  origin: (origin, callback) => {
    console.log("🛠️ Comprobando origen:", origin);
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
}));

// Middleware para manejar preflight requests (OPTIONS)
app.options("*", cors());

// Middleware JSON
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Servidor funcionando correctamente en Railway ✔️');
});

app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});
