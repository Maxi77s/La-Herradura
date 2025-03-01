import { prisma } from "../database/prisma";

export const AppointmentService = {
  async createAppointment(data: {
    date: string;
    time: string;
    status: string;
    description: string;
    clientName: string;
  }) {
    const { date, time, status, description, clientName } = data;
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      throw new Error("Fecha inválida");
    }
    return prisma.appointment.create({
      data: {
        date: appointmentDate,
        time,
        status,
        description,
        clientName,
      },
    });
  },

  async getAppointments() {
    return await prisma.appointment.findMany({
      select: {
        id: true, // Asegúrate de incluir el campo id
        date: true,
        time: true,
        status: true,
        description: true,
        clientName: true,
      },
    });
  },

  // Función para obtener una cita por ID
  async getAppointmentById(id: number) {
    return await prisma.appointment.findUnique({
      where: { id },
    });
  },

  // Función para actualizar el estado de una cita
  async updateAppointmentStatus(id: number, status: "active" | "canceled") {
    return await prisma.appointment.update({
      where: { id },
      data: { status },
    });
  },
};
