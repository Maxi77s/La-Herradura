import { prisma } from "../database/prisma";
import bcrypt from "bcrypt";

async function updatePlainPasswords() {
  try {
    const admins = await prisma.admin.findMany();

    for (const admin of admins) {
      if (!admin.password.startsWith("$2b$")) { // Verificar si ya está hasheada
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        await prisma.admin.update({
          where: { id: admin.id },
          data: { password: hashedPassword },
        });
        console.log(`🔒 Contraseña actualizada para ${admin.username}`);
      }
    }

    console.log("✅ Todas las contraseñas han sido actualizadas correctamente.");
  } catch (error) {
    console.error("❌ Error al actualizar contraseñas:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la función automáticamente al correr el script
updatePlainPasswords();
