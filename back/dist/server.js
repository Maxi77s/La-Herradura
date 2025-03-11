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
const allowedOrigins = [
    "http://localhost:3000",
    "https://la-herradura-flax.vercel.app",
    "https://la-herradura-production.up.railway.app",
    "https://la-herradura-production.up.railway.app/api/admin/login"
];
app.use((req, res, next) => {
    console.log("🔍 Origin de la petición:", req.headers.origin);
    next();
});
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        console.log("🛠️ Comprobando origen:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
            console.log("✅ Origen permitido:", origin);
            callback(null, true);
        }
        else {
            console.log("❌ Origen bloqueado:", origin);
            callback(new Error("No permitido por CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// Middleware para manejar preflight requests (OPTIONS)
app.options("*", (0, cors_1.default)());
// Middleware JSON
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('🚀 Servidor funcionando correctamente en Railway ✔️');
});
app.use('/api/admin', adminRouter_1.default);
app.use('/api/appointments', appointmentRouter_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});
