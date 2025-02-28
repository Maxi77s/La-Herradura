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
exports.AdminController = void 0;
const adminService_1 = require("../services/adminService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.AdminController = {
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!username || !password) {
                    return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
                }
                const admin = yield adminService_1.AdminService.createAdmin(username, password);
                return res.status(201).json(admin);
            }
            catch (error) {
                console.error("Error al crear admin:", error.message);
                return res.status(500).json({ message: error.message || "Error interno del servidor" });
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!username || !password) {
                    return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
                }
                const admin = yield adminService_1.AdminService.authenticateAdmin(username, password);
                if (!admin) {
                    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
                }
                // ✅ Generar el token en el backend
                const token = jsonwebtoken_1.default.sign({ id: admin.user.id,
                    username: admin.user.username,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60) }, process.env.JWT_SECRET);
                return res.status(200).json({ token });
            }
            catch (error) {
                console.error("Error en login:", error.message);
                return res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    },
};
