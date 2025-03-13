"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
// Cargar variables de entorno
dotenv_1.default.config();
// Verificar que la URL de la base de datos exista
if (!process.env.DATABASE_PUBLIC_URL) {
    throw new Error("❌ Falta DATABASE_PUBLIC_URL en el archivo .env o en las variables de Railway");
}
// Instanciar Prisma
const prisma = new client_1.PrismaClient();
// Inicializar Express
const app = (0, express_1.default)();
// Lista de orígenes permitidos (CORS)
const allowedOrigins = [
    'http://localhost:3000',
    'https://la-herradura-flax.vercel.app',
    'https://la-herradura-production.up.railway.app'
];
// Middleware de CORS
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware para manejar preflight requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Middleware para parsear JSON
app.use(express_1.default.json());
// Rutas principales
app.get('/', (req, res) => {
    res.send('🚀 Backend corriendo correctamente en Railway ✔️');
});
// Ruta de salud
app.get('/status', (req, res) => {
    res.status(200).send({ status: 'ok' });
});
// Ruta de prueba para ver si Prisma funciona bien
app.get('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield prisma.appointment.findMany();
        res.json(appointments);
    }
    catch (err) {
        console.error('❌ Error al consultar citas:', err);
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
}));
// Puerto
const PORT = Number(process.env.PORT) || 3001;
// Iniciar el servidor
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway`);
    }
    catch (err) {
        console.error('❌ Error al conectar con la base de datos:', err);
        process.exit(1);
    }
}));
// Exportar app si Railway lo necesita
exports.default = app;
