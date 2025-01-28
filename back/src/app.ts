import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import adminRouter from './routers/adminRouter';
import appointmentRouter from './routers/appointmentRouter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);
app.use(errorHandler);

export default app;
