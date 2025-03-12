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
    throw new Error("❌ ERROR: JWT_SECRET no está configurado en las variables de entorno.");
}
// Mostrar variables de entorno (solo para depuración, eliminar en producción)
console.log("🔍 DATABASE_PUBLIC_URL:", process.env.DATABASE_PUBLIC_URL);
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);
const app = (0, express_1.default)();
// Middleware para manejar preflight requests (OPTIONS)
app.options("*", (0, cors_1.default)());
// CORS Options
const corsOptions = {
    origin: "https://la-herradura-flax.vercel.app", // Cambia por la URL de tu frontend en Vercel
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
// Configuración de CORS
app.use((0, cors_1.default)(corsOptions));
// Middleware para verificar el origen de las peticiones (para depuración)
app.use((req, res, next) => {
    console.log("🔍 Origin de la petición:", req.headers.origin);
    next();
});
// Middleware JSON
app.use(express_1.default.json());
// Ruta principal
app.get("/", (req, res) => {
    res.json({ message: "🚀 Servidor funcionando correctamente en Railway ✔️" });
});
// Rutas
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
