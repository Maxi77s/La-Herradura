import { Request, Response } from "express";
import { AdminService } from "../services/adminService";
import jwt from "jsonwebtoken";

export const AdminController = {
  async createAdmin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
      }

      const admin = await AdminService.createAdmin(username, password);
      return res.status(201).json(admin);
    } catch (error: any) {
      console.error("Error al crear admin:", error.message);
      return res.status(500).json({ message: error.message || "Error interno del servidor" });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
      }

      const admin = await AdminService.authenticateAdmin(username, password);
      if (!admin) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }

      // ✅ Generar el token en el backend
      const token = jwt.sign(
        { id: admin.user.id, username: admin.user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' } // Esto ya maneja la expiración
      );
      
      return res.status(200).json({ token });
    } catch (error: any) {
      console.error("Error en login:", error.message);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
