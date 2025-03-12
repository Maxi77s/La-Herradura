import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl: { rejectUnauthorized: false }, // Importante para Railway
  idleTimeoutMillis: 30000, // Cierra conexiones inactivas después de 30s
  connectionTimeoutMillis: 5000, // Tiempo máximo para conectar
});

export default pool;
