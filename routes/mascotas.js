import { Router } from "express";
const router = Router();
import { listarMascotas, crearMascota } from "../controllers/mascotaController.js";
router.get("/", listarMascotas);
router.post("/", crearMascota);
export default router;
