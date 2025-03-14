"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
async function getAppointments() {
    try {
        await exports.prisma.$connect();
        console.log("✅ Conectado correctamente a la base de datos con Prisma");
        const appointments = await exports.prisma.appointment.findMany();
        console.log("🗓️ Citas encontradas:", appointments);
    }
    catch (error) {
        console.error("❌ Error al conectar con la base de datos o al consultar appointments:", error);
        process.exit(1); // <- Esto detendrá el contenedor si falla, pero te dará logs claros
    }
    finally {
        await exports.prisma.$disconnect();
    }
}
getAppointments();
