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
// Cargar las variables de entorno
dotenv_1.default.config();
// Verificar que la variable de entorno se cargue correctamente
console.log("DATABASE_PUBLIC_URL:", process.env.DATABASE_PUBLIC_URL); // Mostrar URL de la base de datos
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Verificar si JWT_SECRET está configurado
const app = (0, express_1.default)();
// Definir los orígenes permitidos para CORS
const allowedOrigins = [
    "http://localhost:3000",
    "https://la-herradura-flax.vercel.app",
    "https://la-herradura-production.up.railway.app",
    "https://la-herradura-production.up.railway.app/api/admin/login"
];
// Verificar el origen de las peticiones
app.use((req, res, next) => {
    console.log("🔍 Origin de la petición:", req.headers.origin); // Log para verificar el origen
    next();
});
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        console.log("🛠️ Comprobando origen:", origin); // Verificar origen
        if (!origin || allowedOrigins.includes(origin)) {
            console.log("✅ Origen permitido:", origin); // Origen permitido
            callback(null, true);
        }
        else {
            console.log("❌ Origen bloqueado:", origin); // Origen bloqueado
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
// Ruta principal
app.get('/', (req, res) => {
    res.json({ message: '🚀 Servidor funcionando correctamente en Railway ✔️' });
});
// Rutas
app.use('/api/admin', adminRouter_1.default);
app.use('/api/appointments', appointmentRouter_1.default);
// Middleware global para manejo de errores
app.use((err, req, res, next) => {
    console.error("Error ocurrido:", err); // Log detallado del error
    res.status(500).json({ error: 'Hubo un error interno en el servidor' }); // Respuesta JSON en caso de error
});
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway ✔️`);
});
exports.default = app;
