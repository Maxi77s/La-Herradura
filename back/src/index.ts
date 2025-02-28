import express, { Request, Response, NextFunction } from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.envproduction' : '.env' });

const app = express();

// Configuración de CORS para permitir cualquier subdominio de Vercel y localhost
const allowedOrigins = [
  "http://localhost:3000",
  "https://la-herradura-flax.vercel.app",
  "https://la-herradura-gg1q9spev-e-commerces-projects-7a8d629e.vercel.app",
  "https://la-herradura-production.up.railway.app",
  /\.vercel\.app$/ // Permite cualquier subdominio en Vercel
];

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.some(o => (typeof o === "string" ? o === origin : o.test(origin)))) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware CORS global
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => (typeof o === "string" ? o === origin : o.test(origin)))) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

app.use(express.json());
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
