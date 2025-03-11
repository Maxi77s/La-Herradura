"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const adminRouter_1 = __importDefault(require("./routers/adminRouter"));
const appointmentRouter_1 = __importDefault(require("./routers/appointmentRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "https://la-herradura-flax.vercel.app",
    "https://la-herradura-production.up.railway.app"
];
// Middleware de CORS optimizado
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin); // Devolver origen específico en vez de `true`
        }
        else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Middleware para manejar preflight requests (OPTIONS)
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Middleware para parsear JSON
app.use(express_1.default.json());
// Rutas
app.use('/api/admin', adminRouter_1.default);
app.use('/api/appointments', appointmentRouter_1.default);
// Ruta raíz para verificar que el backend está funcionando
app.get('/', (req, res) => {
    res.send('🚀 Servidor funcionando correctamente en Railway ✔️');
});
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
// Exportar app si Railway lo requiere
exports.default = app;
