"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_PUBLIC_URL,
    ssl: { rejectUnauthorized: false }, // Importante para Railway
    idleTimeoutMillis: 30000, // Cierra conexiones inactivas después de 30s
    connectionTimeoutMillis: 5000, // Tiempo máximo para conectar
});
exports.default = pool;
