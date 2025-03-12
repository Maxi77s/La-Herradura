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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const prisma_1 = require("../database/prisma");
const database_1 = __importDefault(require("../config/database"));
exports.AppointmentService = {
    createAppointment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, time, status, description, clientName } = data;
            const appointmentDate = new Date(date);
            if (isNaN(appointmentDate.getTime())) {
                throw new Error("Fecha inválida");
            }
            try {
                return yield prisma_1.prisma.appointment.create({
                    data: { date: appointmentDate, time, status, description, clientName },
                });
            }
            catch (error) {
                console.error("Error al crear la cita:", error);
                throw new Error("No se pudo crear la cita");
            }
            finally {
                // Asegurarse de cerrar la conexión de Prisma
                yield prisma_1.prisma.$disconnect();
            }
        });
    },
    getAppointments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query("SELECT * FROM Appointments;");
                return result.rows;
            }
            catch (error) {
                console.error("Error al obtener citas:", error);
                throw new Error("No se pudieron obtener las citas");
            }
        });
    },
    getAppointmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.prisma.appointment.findUnique({ where: { id } });
            }
            catch (error) {
                console.error("Error al obtener la cita:", error);
                throw new Error("No se pudo obtener la cita");
            }
            finally {
                // Asegurarse de cerrar la conexión de Prisma
                yield prisma_1.prisma.$disconnect();
            }
        });
    },
    updateAppointmentStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.prisma.appointment.update({
                    where: { id },
                    data: { status },
                });
            }
            catch (error) {
                console.error("Error al actualizar el estado de la cita:", error);
                throw new Error("No se pudo actualizar la cita");
            }
            finally {
                // Asegurarse de cerrar la conexión de Prisma
                yield prisma_1.prisma.$disconnect();
            }
        });
    },
};
