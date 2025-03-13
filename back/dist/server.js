"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter_1 = __importDefault(require("./routers/adminRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const appointmentRouter_1 = __importDefault(require("./routers/appointmentRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Lista de orígenes permitidos
const allowedOrigins = [
    "http://localhost:3000",
    "https://la-herradura-flax.vercel.app",
    "https://la-herradura-production.up.railway.app"
];
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        console.log("🟢 Solicitud recibida de:", origin); // Debug para ver qué origen llega
        if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true, // Permite el envío de cookies y autenticación
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
}));
// Asegurar que las solicitudes OPTIONS sean manejadas correctamente
app.options("*", (0, cors_1.default)());
// Middleware para parsear JSON
app.use(express_1.default.json());
// Rutas
app.use('/api/admin', adminRouter_1.default);
app.use('/api/appointments', appointmentRouter_1.default);
// Puerto del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway`);
});
