import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController';


const appointmentRouter = Router();

appointmentRouter.post('/', AppointmentController.createAppointment);
appointmentRouter.get('/', AppointmentController.getAppointments);
appointmentRouter.get('/:id', AppointmentController.getAppointmentById);
appointmentRouter.patch('/:id', AppointmentController.updateAppointmentStatus);


export default appointmentRouter;
