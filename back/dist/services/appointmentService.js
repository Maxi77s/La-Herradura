"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const prisma_1 = require("../database/prisma");
exports.AppointmentService = {
    async createAppointment(data) {
        const { date, time, status, description, clientName } = data;
        const appointmentDate = new Date(date);
        if (isNaN(appointmentDate.getTime())) {
            throw new Error("Fecha inválida");
        }
        try {
            return await prisma_1.prisma.appointment.create({
                data: {
                    date: appointmentDate,
                    time,
                    status,
                    description,
                    clientName,
                },
            });
        }
        catch (error) {
            console.error("Error al crear la cita:", error);
            throw new Error("No se pudo crear la cita");
        }
    },
    async getAppointments() {
        try {
            return await prisma_1.prisma.appointment.findMany();
        }
        catch (error) {
            console.error("Error al obtener citas:", error);
            throw new Error("No se pudieron obtener las citas");
        }
    },
    async getAppointmentById(id) {
        try {
            return await prisma_1.prisma.appointment.findUnique({
                where: { id },
            });
        }
        catch (error) {
            console.error("Error al obtener la cita:", error);
            throw new Error("No se pudo obtener la cita");
        }
    },
    async updateAppointmentStatus(id, status) {
        try {
            return await prisma_1.prisma.appointment.update({
                where: { id },
                data: { status },
            });
        }
        catch (error) {
            console.error("Error al actualizar el estado de la cita:", error);
            throw new Error("No se pudo actualizar la cita");
        }
    },
};
