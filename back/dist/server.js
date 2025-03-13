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
// Configuración de CORS dinámica para permitir cualquier subdominio de Vercel
const allowedOrigins = [
    "http://localhost:3000", // Desarrollo local
    "https://la-herradura-flax.vercel.app", // Versión principal en Vercel
    "https://la-herradura-production.up.railway.app",
    /\.vercel\.app$/ // Permitir cualquier subdominio en Vercel
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.some((o) => typeof o === "string" ? o === origin : o.test(origin))) {
            callback(null, true);
        }
        else {
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true, // Permite autenticación basada en tokens
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
}));
app.use(express_1.default.json());
app.use('/api/admin', adminRouter_1.default);
app.use('/api/appointments', appointmentRouter_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
