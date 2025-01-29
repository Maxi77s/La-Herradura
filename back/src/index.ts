import express from 'express'; // Importar express correctamente
import adminRouter from './routers/adminRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import appointmentRouter from './routers/appointmentRouter';
dotenv.config();

const app = express(); // Crear la instancia de Express solo una vez

app.use(cors());
app.use(express.json()); // Middleware para parsear JSON
app.use('/api/admin', adminRouter); // Configurar las rutas
app.use('/api/appointments', appointmentRouter);
const PORT = process.env.PORT || 3001;
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
