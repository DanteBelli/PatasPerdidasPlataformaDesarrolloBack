import { Router } from "express";
const router = Router();
import { listarMascotas, crearMascota, cerrarCaso } from "../controllers/mascotaController.js";
router.get("/", listarMascotas);
router.post("/", crearMascota);
router.post("/cerrar-caso",cerrarCaso);
export default router;
