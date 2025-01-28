import { prisma } from '../database/prisma'; // Asegúrate de importar el cliente de Prisma

export const AppointmentService = {
  async createAppointment(data: {
    date: string; // Acepta la fecha como una cadena
    time: string;
    status: string;
    description: string;
    clientName: string;
  }) {
    const { date, time, status, description, clientName } = data;

   // Suponiendo que 'date' es una cadena recibida del frontend, convierte a Date
const appointmentDate = new Date(date);

// Verifica si la fecha es válida
if (isNaN(appointmentDate.getTime())) {
  throw new Error('Fecha inválida'); // Lanza un error si la fecha no es válida
}

return prisma.appointment.create({
  data: {
    date: appointmentDate, // Utiliza la instancia Date para Prisma
    time,
    status,
    description,
    clientName,
  },
});

  },

  async getAppointments() {
    return await prisma.appointment.findMany();
  },
};
