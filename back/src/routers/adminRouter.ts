import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { asyncHandler } from '../middleware/asyncHandler';
import cors from 'cors';

const adminRouter = Router();

const corsOptions = {
  origin: "https://la-herradura-flax.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Aplica CORS a todas las rutas del router
adminRouter.use(cors(corsOptions));

// Ruta de prueba
adminRouter.get("/", (req, res) => {
  res.send("Admin API funcionando correctamente");
});

// Manejo explícito de OPTIONS para login
adminRouter.options('/login', (req, res) => {
  res.sendStatus(204);
});

// Ruta de registro
adminRouter.post('/register', asyncHandler(AdminController.createAdmin));

// Ruta de login con log
adminRouter.post('/login', (req, res, next) => {
  console.log("🔥 Petición POST a /login recibida");
  next();
}, asyncHandler(AdminController.login));

export default adminRouter;
