import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { asyncHandler } from '../middleware/asyncHandler';
import cors from 'cors';

const adminRouter = Router();

// Opciones CORS específicas para rutas sensibles como /login
const corsOptions = {
  origin: "https://la-herradura-flax.vercel.app",
  credentials: true,
};

// Ruta de prueba
adminRouter.get("/", (req, res) => {
  res.send("Admin API funcionando correctamente");
});

// Ruta de registro
adminRouter.post('/register', asyncHandler(AdminController.createAdmin));

// 🔥 PREVENTIVO: Habilitar preflight OPTIONS para /login
adminRouter.options('/login', cors(corsOptions));

// Ruta de login con CORS aplicado
adminRouter.post('/login', cors(corsOptions), (req, res, next) => {
  console.log("🔥 Petición POST a /login recibida");
  next();
}, asyncHandler(AdminController.login));

export default adminRouter;
