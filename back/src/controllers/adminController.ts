import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

export const AdminController = {
  async createAdmin(req: Request, res: Response) {
    const { username, password } = req.body;
    const admin = await AdminService.createAdmin(username, password);
    res.status(201).json(admin);
  },

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const admin = await AdminService.authenticateAdmin(username, password);
    res.status(200).json(admin);
  },
};
