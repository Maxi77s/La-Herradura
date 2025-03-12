import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { asyncHandler } from '../middleware/asyncHandler';

const adminRouter = Router();
adminRouter.get("/", (req, res) => {
    res.send("Admin API funcionando correctamente");
  });
adminRouter.post('/register', asyncHandler(AdminController.createAdmin));
adminRouter.post('/login', (req, res, next) => {
  console.log("🔥 Petición POST a /login recibida");
  next();
}, asyncHandler(AdminController.login));

export default adminRouter;
