import { Router } from "express";
import { register,login,obtenerUsuario } from "../controllers/authController.js";
const router = Router();
router.post("/register",register);
router.post("/login",login);
router.get("/usuario/:mail",obtenerUsuario);
export default router;