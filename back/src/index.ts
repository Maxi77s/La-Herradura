import express from 'express';
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

// Configuración de CORS dinámica para permitir cualquier subdominio de Vercel
const allowedOrigins = [
  "http://localhost:3000",  // Desarrollo local
  "https://la-herradura-flax.vercel.app", // Versión principal en Vercel
  "https://la-herradura-n0nq94s5z-e-commerces-projects-7a8d629e.vercel.app",
  /\.vercel\.app$/ // Permitir cualquier subdominio en Vercel
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((o) => typeof o === "string" ? o === origin : o.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true, // Permite autenticación basada en tokens
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  })
);

app.use(express.json());
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
