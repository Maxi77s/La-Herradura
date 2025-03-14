import { prisma } from '../database/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secretoSuperSeguro';

export const AdminService = {
  // Crear un nuevo administrador con contraseña cifrada
  async createAdmin(username: string, password: string) {
    try {
      // Verificar si el usuario ya existe
      const existingAdmin = await prisma.admin.findUnique({ where: { username } });
      if (existingAdmin) {
        throw new Error('El usuario ya existe');
      }

      // Cifrar la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo administrador con la contraseña cifrada
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

  // Autenticar al administrador y generar un token JWT
  async authenticateAdmin(username: string, password: string) {
    try {
      // Buscar al administrador por nombre de usuario
      const admin = await prisma.admin.findUnique({ where: { username } });
      if (!admin) {
        return null; // Si no se encuentra el usuario, retornar null
      }

      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return null; // Si la contraseña no es válida, retornar null
      }

      // Generar un token JWT si la autenticación es exitosa
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      // Retornar el token y los datos del usuario
      return { token, user: { id: admin.id, username: admin.username } };
    } catch (error) {
      console.error('Error en autenticación del administrador:', error);
      return null; // En caso de error, retornar null
    } finally {
      // Asegurarse de cerrar la conexión de Prisma
      await prisma.$disconnect();
    }
  },

  // Actualizar las contraseñas en texto plano a contraseñas cifradas en la base de datos
  async updatePlainPasswords() {
    try {
      const admins = await prisma.admin.findMany();
      
      for (const admin of admins) {
        // Si la contraseña es en texto plano, cifrarla
        const isPasswordPlain = await bcrypt.compare(admin.password, admin.password);
        if (!isPasswordPlain) {
          const hashedPassword = await bcrypt.hash(admin.password, 10);
          await prisma.admin.update({
            where: { id: admin.id },
            data: { password: hashedPassword },
          });
          console.log(`Contraseña actualizada para el usuario: ${admin.username}`);
        }
      }

      await prisma.$disconnect();
    } catch (error) {
      console.error('Error al actualizar contraseñas:', error);
    }
  },
};
