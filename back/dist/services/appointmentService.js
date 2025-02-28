"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const prisma_1 = require("../database/prisma");
exports.AppointmentService = {
    createAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, time, status, description, clientName } = data;
            const appointmentDate = new Date(date);
            if (isNaN(appointmentDate.getTime())) {
                throw new Error("Fecha inválida");
            }
            return prisma_1.prisma.appointment.create({
                data: {
                    date: appointmentDate,
                    time,
                    status,
                    description,
                    clientName,
                },
            });
        });
    },
    getAppointments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.appointment.findMany({
                select: {
                    id: true, // Asegúrate de incluir el campo id
                    date: true,
                    time: true,
                    status: true,
                    description: true,
                    clientName: true,
                },
            });
        });
    },
    // Función para obtener una cita por ID
    getAppointmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.appointment.findUnique({
                where: { id },
            });
        });
    },
    // Función para actualizar el estado de una cita
    updateAppointmentStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.appointment.update({
                where: { id },
                data: { status },
            });
        });
    },
};
