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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
// adminService.ts
const prisma_1 = require("../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'secretoSuperSeguro';
exports.AdminService = {
    createAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingAdmin = yield prisma_1.prisma.admin.findUnique({ where: { username } });
                if (existingAdmin) {
                    throw new Error('El usuario ya existe');
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newAdmin = yield prisma_1.prisma.admin.create({
                    data: { username, password: hashedPassword },
                });
                return { id: newAdmin.id, username: newAdmin.username };
            }
            catch (error) {
                console.error('Error al crear el administrador:', error);
                throw new Error('Error al crear el administrador');
            }
        });
    },
    authenticateAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield prisma_1.prisma.admin.findUnique({ where: { username } });
                if (!admin || !(yield bcrypt_1.default.compare(password, admin.password))) {
                    return null;
                }
                const token = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
                return { token, user: { id: admin.id, username: admin.username } };
            }
            catch (error) {
                console.error('Error en autenticación del administrador:', error);
                return null;
            }
        });
    },
};
