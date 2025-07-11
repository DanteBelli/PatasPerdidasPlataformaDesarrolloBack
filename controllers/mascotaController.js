import db from "../config/db.js";
export const listarMascotas = async (req,res)=>
{
    try{
        const [mascotas]=await db.query("Select * from mascotas");
        res.json(mascotas);
    }catch(error){
        res.status(400).json({error:"Error"});
    }
};
export const crearMascota = async (req, res) => {
  try {
    const { tipo, descripcion, usuario_email, foto, nombre, lat, lng } = req.body;
    const [resul] = await db.query(
      "INSERT INTO mascotas (tipo, descripcion, usuario_email, lat, lng, foto, nombre) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [tipo, descripcion, usuario_email, lat, lng, foto, nombre]
    );
    res.status(201).json({ message: "Creación exitosa", id: resul.insertId });
  } catch (error) {
    console.error("Error en la creación", error);
    res.status(500).json({ error: "Error" });
  }
};
