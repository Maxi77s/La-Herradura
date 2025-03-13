import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Cargar variables de entorno
dotenv.config();

// Verificar que la URL de la base de datos exista
if (!process.env.DATABASE_PUBLIC_URL) {
  throw new Error("❌ Falta DATABASE_PUBLIC_URL en el archivo .env o en las variables de Railway");
}

// Instanciar Prisma
const prisma = new PrismaClient();

// Inicializar Express
const app = express();

// Lista de orígenes permitidos (CORS)
const allowedOrigins = [
  'http://localhost:3000',
  'https://la-herradura-flax.vercel.app',
  'https://la-herradura-production.up.railway.app'
];

// Middleware de CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para manejar preflight requests
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas principales
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Backend corriendo correctamente en Railway ✔️');
});

// Ruta de salud
app.get('/status', (req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

// Ruta de prueba para ver si Prisma funciona bien
app.get('/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (err) {
    console.error('❌ Error al consultar citas:', err);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
});

// Puerto
const PORT = Number(process.env.PORT) || 3001;

// Iniciar el servidor
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`✅ Servidor corriendo en http://localhost:${PORT} o en Railway`);
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
    process.exit(1);
  }
});

// Exportar app si Railway lo necesita
export default app;
