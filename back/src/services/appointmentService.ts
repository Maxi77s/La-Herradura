import { prisma } from "../database/prisma";
import pool from "../config/database";

interface CreateAppointmentData {
  date: string;
  time: string;
  status: string;
  description: string;
  clientName: string;
}

export const AppointmentService = {
  async createAppointment(data: CreateAppointmentData) {
    const { date, time, status, description, clientName } = data;
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      throw new Error("Fecha inválida");
    }

    try {
      return await prisma.appointment.create({
        data: { date: appointmentDate, time, status, description, clientName },
      });
    } catch (error) {
      console.error("Error al crear la cita:", error);
      throw new Error("No se pudo crear la cita");
    } finally {
      // Asegurarse de cerrar la conexión de Prisma
      await prisma.$disconnect();
    }
  },

  async getAppointments() {
    try {
      const result = await pool.query("SELECT * FROM Appointments;");
      return result.rows;
    } catch (error) {
      console.error("Error al obtener citas:", error);
      throw new Error("No se pudieron obtener las citas");
    }
  },

  async getAppointmentById(id: number) {
    try {
      return await prisma.appointment.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error al obtener la cita:", error);
      throw new Error("No se pudo obtener la cita");
    } finally {
      // Asegurarse de cerrar la conexión de Prisma
      await prisma.$disconnect();
    }
  },

  async updateAppointmentStatus(id: number, status: "active" | "canceled") {
    try {
      return await prisma.appointment.update({
        where: { id },
        data: { status },
      });
    } catch (error) {
      console.error("Error al actualizar el estado de la cita:", error);
      throw new Error("No se pudo actualizar la cita");
    } finally {
      // Asegurarse de cerrar la conexión de Prisma
      await prisma.$disconnect();
    }
  },
};
