import { prisma } from '../database/prisma';
import bcrypt from 'bcrypt';

export const AdminService = {
  async createAdmin(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.admin.create({
      data: { username, password: hashedPassword },
    });
  },

  async authenticateAdmin(username: string, password: string) {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) throw new Error('Invalid username or password');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new Error('Invalid username or password');

    return { id: admin.id, username: admin.username };
  },
};
