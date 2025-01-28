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
const prisma_1 = require("../database/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.AdminService = {
    createAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            return prisma_1.prisma.admin.create({
                data: { username, password: hashedPassword },
            });
        });
    },
    authenticateAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield prisma_1.prisma.admin.findUnique({ where: { username } });
            if (!admin)
                throw new Error('Invalid username or password');
            const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
            if (!isPasswordValid)
                throw new Error('Invalid username or password');
            return { id: admin.id, username: admin.username };
        });
    },
};
