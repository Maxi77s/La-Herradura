import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { asyncHandler } from "../middleware/asyncHandler";
import cors from "cors";

const adminRouter = Router();

// Opciones específicas para este router (si no están ya aplicadas globalmente)
const corsOptions = {
  origin: "https://la-herradura-flax.vercel.app", // tu frontend
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Aplica CORS solo a las rutas que lo necesitan, o bien a todo el router
adminRouter.use(cors(corsOptions));

// Rutas
adminRouter.get("/", (req, res) => {
  res.send("Admin API funcionando correctamente");
});

// Preflight OPTIONS (opcional si cors() está bien configurado)
adminRouter.options("/login", cors(corsOptions));

// Registro
adminRouter.post("/register", asyncHandler(AdminController.createAdmin));

// Login con log
adminRouter.post(
  "/login",
  (req, res, next) => {
    console.log("🔥 Petición POST a /login recibida");
    next();
  },
  asyncHandler(AdminController.login)
);

export default adminRouter;
