import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appointmentRouter from './routers/appointmentRouter';
import adminRouter from './routers/adminRouter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas correctamente configuradas
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);
const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
