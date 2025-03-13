import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function getAppointments() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado correctamente a la base de datos con Prisma");

    const appointments = await prisma.appointment.findMany();
    console.log("🗓️ Citas encontradas:", appointments);
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos o al consultar appointments:", error);
    process.exit(1); // <- Esto detendrá el contenedor si falla, pero te dará logs claros
  } finally {
    await prisma.$disconnect();
  }
}

getAppointments();

