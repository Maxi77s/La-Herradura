"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const asyncHandler_1 = require("../middleware/asyncHandler");
const cors_1 = __importDefault(require("cors"));
const adminRouter = (0, express_1.Router)();
// Opciones CORS específicas para rutas sensibles como /login
const corsOptions = {
    origin: "https://la-herradura-flax.vercel.app",
    credentials: true,
};
// Ruta de prueba
adminRouter.get("/", (req, res) => {
    res.send("Admin API funcionando correctamente");
});
// Ruta de registro
adminRouter.post('/register', (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.createAdmin));
// 🔥 PREVENTIVO: Habilitar preflight OPTIONS para /login
adminRouter.options('/login', (0, cors_1.default)(corsOptions));
// Ruta de login con CORS aplicado
adminRouter.post('/login', (0, cors_1.default)(corsOptions), (req, res, next) => {
    console.log("🔥 Petición POST a /login recibida");
    next();
}, (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.login));
exports.default = adminRouter;
