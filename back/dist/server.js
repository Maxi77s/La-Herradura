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
// Validación de variables necesarias
if (!process.env.DATABASE_PUBLIC_URL) {
    throw new Error("❌ ERROR: DATABASE_PUBLIC_URL no está configurada.");
}
if (!process.env.JWT_SECRET) {
    throw new Error("❌ ERROR: JWT_SECRET no está configurada.");
}
// Mostrar info por consola
console.log("🔍 DATABASE_PUBLIC_URL:", process.env.DATABASE_PUBLIC_URL);
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);
const app = (0, express_1.default)();
// ✅ CORS — solo con esto alcanza
app.use((0, cors_1.default)({
    origin: "https://la-herradura-flax.vercel.app", // Tu frontend en producción
    credentials: true,
}));
// ✅ Middleware para parsear JSON
app.use(express_1.default.json());
// ✅ Rutas principales
app.get("/", (req, res) => {
    res.json({ message: "🚀 Servidor funcionando correctamente en Railway ✔️" });
});
app.use("/api/admin", adminRouter_1.default);
app.use("/api/appointments", appointmentRouter_1.default);
// ✅ Manejo de errores
app.use((err, req, res, next) => {
    console.error("❌ Error ocurrido:", err.message || err);
    res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
});
// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});
exports.default = app;
