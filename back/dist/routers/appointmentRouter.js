"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const appointmentRouter = (0, express_1.Router)();
appointmentRouter.post('/', appointmentController_1.AppointmentController.createAppointment);
appointmentRouter.get('/', appointmentController_1.AppointmentController.getAppointments);
appointmentRouter.get('/:id', appointmentController_1.AppointmentController.getAppointmentById);
appointmentRouter.patch('/:id', appointmentController_1.AppointmentController.updateAppointmentStatus);
exports.default = appointmentRouter;
