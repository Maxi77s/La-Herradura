import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointmentService';

export const AppointmentController = {
  async createAppointment(req: Request, res: Response) {
    try {
      const { date, time, status, description, clientName } = req.body;

      // Llamamos al servicio para crear la cita
      const appointment = await AppointmentService.createAppointment({
        date,
        time,
        status,
        description,
        clientName,
      });

      // Respondemos con los datos de la cita creada
      res.status(201).json(appointment);
    } catch (error:any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAppointments(req: Request, res: Response) {
    const appointments = await AppointmentService.getAppointments();
    res.status(200).json(appointments);
  },
};
