import express from 'express'; // Importar express correctamente
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express(); // Crear la instancia de Express solo una vez

// Configuración de CORS con múltiples orígenes permitidos
const allowedOrigins = [
  "http://localhost:3000", // Desarrollo local
  "https://la-herradura-2fxi8h43r-e-commerces-projects-7a8d629e.vercel.app", // Frontend en Vercel
  "https://la-herradura-flax.vercel.app/" // Otra versión del frontend en Vercel
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true, // Permite cookies y autenticación basada en tokens
  })
);

app.use(express.json()); // Middleware para parsear JSON
app.use('/api/admin', adminRouter); // Configurar las rutas
app.use('/api/appointments', appointmentRouter);

const PORT = process.env.PORT || 3001;
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
