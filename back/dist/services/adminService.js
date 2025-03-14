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
    async createAdmin(username, password) {
        try {
            const existingAdmin = await prisma_1.prisma.admin.findUnique({ where: { username } });
            if (existingAdmin) {
                throw new Error('El usuario ya existe');
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
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
    async authenticateAdmin(username, password) {
        try {
            const admin = await prisma_1.prisma.admin.findUnique({ where: { username } });
            if (!admin || !(await bcrypt_1.default.compare(password, admin.password))) {
                return null;
            }
            const token = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
            return { token, user: { id: admin.id, username: admin.username } };
        }
        catch (error) {
            console.error('Error en autenticación del administrador:', error);
            return null;
        }
        finally {
            // Asegurarse de cerrar la conexión de Prisma
            await prisma_1.prisma.$disconnect();
        }
    },
};
