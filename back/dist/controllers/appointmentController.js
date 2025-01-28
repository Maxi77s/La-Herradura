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
exports.AppointmentController = void 0;
const appointmentService_1 = require("../services/appointmentService");
exports.AppointmentController = {
    createAppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, time, status, description, clientName } = req.body;
            const appointment = yield appointmentService_1.AppointmentService.createAppointment({
                date,
                time,
                status,
                description,
                clientName,
            });
            res.status(201).json(appointment);
        });
    },
    getAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield appointmentService_1.AppointmentService.getAppointments();
            res.status(200).json(appointments);
        });
    },
};
