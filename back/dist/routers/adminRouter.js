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
const corsOptions = {
    origin: "https://la-herradura-flax.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
// Aplica CORS a todas las rutas del router
adminRouter.use((0, cors_1.default)(corsOptions));
// Ruta de prueba
adminRouter.get("/", (req, res) => {
    res.send("Admin API funcionando correctamente");
});
// Manejo explícito de OPTIONS para login
adminRouter.options('/login', (req, res) => {
    res.sendStatus(204);
});
// Ruta de registro
adminRouter.post('/register', (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.createAdmin));
// Ruta de login con log
adminRouter.post('/login', (req, res, next) => {
    console.log("🔥 Petición POST a /login recibida");
    next();
}, (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.login));
exports.default = adminRouter;
