import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function getAppointments() {
    const appointments = await prisma.appointment.findMany(); // Aquí recuperas todas las citas
  
    console.log(appointments); // Aquí deberías ver las citas con el campo `id` incluido
  }
  
  getAppointments();