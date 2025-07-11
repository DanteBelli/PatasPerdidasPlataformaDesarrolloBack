import express from "express";
import cors from "cors";
import mascotaRoute from"./routes/mascotas.js";
import authRoutes from "./routes/auth.js"
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/mascotas", mascotaRoute);
app.listen(PORT, () => {
  console.log(`La url de acceso es http://localhost:${PORT}`);
});