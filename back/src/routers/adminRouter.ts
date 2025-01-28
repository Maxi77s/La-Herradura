import { Router } from 'express';
import { AdminController } from '../controllers/adminController';

const adminRouter = Router();

adminRouter.post('/register', AdminController.createAdmin);
adminRouter.post('/login', AdminController.login);

export default adminRouter;
