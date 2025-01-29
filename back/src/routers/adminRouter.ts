import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { asyncHandler } from '../middleware/asyncHandler';

const adminRouter = Router();

adminRouter.post('/register', asyncHandler(AdminController.createAdmin));
adminRouter.post('/login', asyncHandler(AdminController.login));

export default adminRouter;
