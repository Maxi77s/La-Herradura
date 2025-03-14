"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function updatePlainPasswords() {
    try {
        const admins = await prisma_1.prisma.admin.findMany();
        for (const admin of admins) {
            if (!admin.password.startsWith("$2b$")) { // Verificar si ya está hasheada
                const hashedPassword = await bcrypt_1.default.hash(admin.password, 10);
                await prisma_1.prisma.admin.update({
                    where: { id: admin.id },
                    data: { password: hashedPassword },
                });
                console.log(`🔒 Contraseña actualizada para ${admin.username}`);
            }
        }
        console.log("✅ Todas las contraseñas han sido actualizadas correctamente.");
    }
    catch (error) {
        console.error("❌ Error al actualizar contraseñas:", error);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
// Ejecutar la función automáticamente al correr el script
updatePlainPasswords();
