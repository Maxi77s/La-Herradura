import express, { Request, Response, NextFunction } from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://la-herradura-flax.vercel.app",
  /\.vercel\.app$/
];

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (!origin || allowedOrigins.some(o => (typeof o === "string" ? o === origin : o.test(origin)))) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

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

// 🚀 Vercel necesita que exportemos `app`
export default app;
