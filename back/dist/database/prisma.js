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
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
function getAppointments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.prisma.$connect();
            console.log("✅ Conectado correctamente a la base de datos con Prisma");
            const appointments = yield exports.prisma.appointment.findMany();
            console.log("🗓️ Citas encontradas:", appointments);
        }
        catch (error) {
            console.error("❌ Error al conectar con la base de datos o al consultar appointments:", error);
            process.exit(1); // <- Esto detendrá el contenedor si falla, pero te dará logs claros
        }
        finally {
            yield exports.prisma.$disconnect();
        }
    });
}
getAppointments();
