"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const prisma_1 = require("../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'secretoSuperSeguro';
exports.AdminService = {
    // Crear un nuevo administrador con contraseña cifrada
    async createAdmin(username, password) {
        try {
            // Verificar si el usuario ya existe
            const existingAdmin = await prisma_1.prisma.admin.findUnique({ where: { username } });
            if (existingAdmin) {
                throw new Error('El usuario ya existe');
            }
            // Cifrar la contraseña antes de guardarla
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            // Crear el nuevo administrador con la contraseña cifrada
            const newAdmin = await prisma_1.prisma.admin.create({
                data: { username, password: hashedPassword },
            });
            return { id: newAdmin.id, username: newAdmin.username };
        }
        catch (error) {
            console.error('Error al crear el administrador:', error);
            throw new Error('Error al crear el administrador');
        }
        finally {
            // Asegurarse de cerrar la conexión de Prisma
            await prisma_1.prisma.$disconnect();
        }
    },
    // Autenticar al administrador y generar un token JWT
    async authenticateAdmin(username, password) {
        try {
            // Buscar al administrador por nombre de usuario
            const admin = await prisma_1.prisma.admin.findUnique({ where: { username } });
            if (!admin) {
                return null; // Si no se encuentra el usuario, retornar null
            }
            // Comparar la contraseña proporcionada con la almacenada en la base de datos
            const isPasswordValid = await bcrypt_1.default.compare(password, admin.password);
            if (!isPasswordValid) {
                return null; // Si la contraseña no es válida, retornar null
            }
            // Generar un token JWT si la autenticación es exitosa
            const token = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
            // Retornar el token y los datos del usuario
            return { token, user: { id: admin.id, username: admin.username } };
        }
        catch (error) {
            console.error('Error en autenticación del administrador:', error);
            return null; // En caso de error, retornar null
        }
        finally {
            // Asegurarse de cerrar la conexión de Prisma
            await prisma_1.prisma.$disconnect();
        }
    },
    // Actualizar las contraseñas en texto plano a contraseñas cifradas en la base de datos
    async updatePlainPasswords() {
        try {
            const admins = await prisma_1.prisma.admin.findMany();
            for (const admin of admins) {
                // Si la contraseña es en texto plano, cifrarla
                const isPasswordPlain = await bcrypt_1.default.compare(admin.password, admin.password);
                if (!isPasswordPlain) {
                    const hashedPassword = await bcrypt_1.default.hash(admin.password, 10);
                    await prisma_1.prisma.admin.update({
                        where: { id: admin.id },
                        data: { password: hashedPassword },
                    });
                    console.log(`Contraseña actualizada para el usuario: ${admin.username}`);
                }
            }
            await prisma_1.prisma.$disconnect();
        }
        catch (error) {
            console.error('Error al actualizar contraseñas:', error);
        }
    },
};
