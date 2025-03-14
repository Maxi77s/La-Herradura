"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const appointmentService_1 = require("../services/appointmentService");
exports.AppointmentController = {
    createAppointment: (async (req, res) => {
        try {
            const { date, time, status, description, clientName } = req.body;
            if (!date || !time || !status || !description || !clientName) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }
            const appointment = await appointmentService_1.AppointmentService.createAppointment({
                date,
                time,
                status,
                description,
                clientName,
            });
            res.status(201).json(appointment);
        }
        catch (error) {
            console.error('Error al crear cita:', error);
            res.status(400).json({ message: error.message });
        }
    }), // ✅ Se asegura de que sea del tipo correcto
    getAppointments: (async (req, res) => {
        try {
            const appointments = await appointmentService_1.AppointmentService.getAppointments();
            if (!appointments || appointments.length === 0) {
                return res.status(404).json({ message: 'No hay citas disponibles' });
            }
            res.status(200).json(appointments);
        }
        catch (error) {
            console.error('Error al obtener citas:', error);
            res.status(500).json({ message: `Error al obtener citas: ${error.message}` });
        }
    }), // ✅ Tipo correcto para Express
    updateAppointmentStatus: (async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // Estado nuevo que se enviará desde el frontend
        try {
            // Verifica que el ID sea un número válido
            const appointmentId = Number(id);
            if (isNaN(appointmentId)) {
                return res.status(400).json({ message: 'ID inválido' });
            }
            const updatedAppointment = await appointmentService_1.AppointmentService.updateAppointmentStatus(appointmentId, status);
            if (!updatedAppointment) {
                return res.status(404).json({ message: 'Cita no encontrada' });
            }
            res.status(200).json(updatedAppointment);
        }
        catch (error) {
            res.status(500).json({ message: `Error al actualizar la cita: ${error.message}` });
        }
    }), // 🔥 Asegura que tenga el tipo correcto
    getAppointmentById: (async (req, res) => {
        console.log('ID recibido:', req.params.id);
        const { id } = req.params;
        try {
            const id = parseInt(req.params.id, 10); // ✅ Conversión segura
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID inválido' });
            }
            const appointment = await appointmentService_1.AppointmentService.getAppointmentById(id);
            if (!appointment) {
                return res.status(404).json({ message: 'Cita no encontrada' });
            }
            res.status(200).json(appointment);
        }
        catch (error) {
            console.error(`Error al obtener cita con ID ${req.params.id}:`, error);
            res.status(500).json({ message: `Error al obtener la cita: ${error.message}` });
        }
    }), // ✅ Se asegura de que tenga el tipo correcto
};
