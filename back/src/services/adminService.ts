import { prisma } from '../database/prisma';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secretoSuperSeguro';

export const AdminService = {
  async createAdmin(username: string, password: string) {
    try {
      const existingAdmin = await prisma.admin.findUnique({ where: { username } });
      if (existingAdmin) {
        throw new Error('El usuario ya existe');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await prisma.admin.create({
        data: { username, password: hashedPassword },
      });

      return { id: newAdmin.id, username: newAdmin.username };
    } catch (error) {
      console.error('Error al crear el administrador:', error);
      throw new Error('Error al crear el administrador');
    } finally {
      // Asegurarse de cerrar la conexión de Prisma
      await prisma.$disconnect();
    }
  },

  async authenticateAdmin(username: string, password: string) {
    try {
      const admin = await prisma.admin.findUnique({ where: { username } });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return null;
      }

      const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
      return { token, user: { id: admin.id, username: admin.username } };
    } catch (error) {
      console.error('Error en autenticación del administrador:', error);
      return null;
    } finally {
      // Asegurarse de cerrar la conexión de Prisma
      await prisma.$disconnect();
    }
  },

  async getAdmins() {
    try {
      const result = await pool.query("SELECT id, username FROM Admin;");
      return result.rows;
    } catch (error) {
      console.error('Error al obtener administradores:', error);
      throw new Error('Error al obtener administradores');
    }
  }
};
