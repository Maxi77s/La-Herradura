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
// Opciones específicas para este router (si no están ya aplicadas globalmente)
const corsOptions = {
    origin: "https://la-herradura-flax.vercel.app", // tu frontend
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
// Aplica CORS solo a las rutas que lo necesitan, o bien a todo el router
adminRouter.use((0, cors_1.default)(corsOptions));
// Rutas
adminRouter.get("/", (req, res) => {
    res.send("Admin API funcionando correctamente");
});
// Preflight OPTIONS (opcional si cors() está bien configurado)
adminRouter.options("/login", (0, cors_1.default)(corsOptions));
// Registro
adminRouter.post("/register", (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.createAdmin));
// Login con log
adminRouter.post("/login", (req, res, next) => {
    console.log("🔥 Petición POST a /login recibida");
    next();
}, (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.login));
exports.default = adminRouter;
