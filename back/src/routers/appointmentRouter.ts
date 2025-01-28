import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';

const appointmentRouter = Router();

appointmentRouter.post('/', AppointmentController.createAppointment);
appointmentRouter.get('/', AppointmentController.getAppointments);

export default appointmentRouter;
