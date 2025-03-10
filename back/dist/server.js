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
// Configuración de CORS para permitir cualquier subdominio de Vercel y Railway
const allowedOrigins = [
    "http://localhost:3000",
    "https://la-herradura-flax.vercel.app",
    "https://la-herradura-production.up.railway.app",
    /\.vercel\.app$/ // Permite cualquier subdominio en Vercel
];
// Middleware personalizado para manejar preflight y headers manuales
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (!origin || allowedOrigins.some(o => (typeof o === "string" ? o === origin : o.test(origin)))) {
        res.setHeader("Access-Control-Allow-Origin", origin || "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Configuración oficial de CORS (por si otros clientes lo usan)
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some(o => (typeof o === "string" ? o === origin : o.test(origin)))) {
            callback(null, true);
        }
        else {
            callback(new Error("No permitido por CORS"));
        }
    },
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));
app.use(express_1.default.json());
// Endpoint raíz para verificar que el servidor responde
app.get('/', (req, res) => {
    res.send('🚀 Servidor funcionando correctamente en Railway ✔️');
});
// Rutas principales
app.use('/api/admin', adminRouter_1.default);
app.use('/api/appointments', appointmentRouter_1.default);
// Puerto del servidor
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});
