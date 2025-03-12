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
// Cargar variables de entorno
dotenv_1.default.config();
if (!process.env.DATABASE_PUBLIC_URL) {
    throw new Error("❌ ERROR: DATABASE_PUBLIC_URL no está configurada en las variables de entorno.");
}
if (!process.env.JWT_SECRET) {
    throw new Error("❌ ERROR: JWT_SECRET no está configurada en las variables de entorno.");
}
// Mostrar variables de entorno (solo para depuración, eliminar en producción)
console.log("🔍 DATABASE_PUBLIC_URL:", process.env.DATABASE_PUBLIC_URL);
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);
const app = (0, express_1.default)();
// CORS Options
const corsOptions = {
    origin: "https://la-herradura-flax.vercel.app", // Cambia si tu frontend cambia de dominio
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
// Middleware JSON primero
app.use(express_1.default.json());
// Configuración de CORS global
app.use((0, cors_1.default)(corsOptions));
// Middleware adicional para asegurarse que todos los headers CORS estén presentes SIEMPRE
const corsMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://la-herradura-flax.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        res.sendStatus(204); // <-- sin "return", solo ejecuta y termina
    }
    else {
        next();
    }
};
app.use(corsMiddleware);
// Ruta principal
app.get("/", (req, res) => {
    res.json({ message: "🚀 Servidor funcionando correctamente en Railway ✔️" });
});
// Middleware para ver origen de peticiones (solo para debug)
app.use((req, res, next) => {
    console.log("🔍 Origin de la petición:", req.headers.origin);
    next();
});
// Rutas API
app.use("/api/admin", adminRouter_1.default);
app.use("/api/appointments", appointmentRouter_1.default);
// Middleware global para manejo de errores
app.use((err, req, res, next) => {
    console.error("❌ Error ocurrido:", err.message || err);
    res.status(err.status || 500).json({ error: err.message || "Hubo un error interno en el servidor" });
});
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});
exports.default = app;
