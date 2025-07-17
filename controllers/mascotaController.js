import res from "express/lib/response.js";
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
    const { tipo, descripcion, usuariMail, foto, nombre, lat, lng } = req.body;
    const [resul] = await db.query(
      "INSERT INTO mascotas (tipo, descripcion, usuariMail, lat, lng, foto, nombre) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [tipo, descripcion, usuariMail, lat, lng, foto, nombre]
    );
    res.status(201).json({ message: "Creación exitosa", id: resul.insertId });
  } catch (error) {
    console.error("Error en la creación", error);
    res.status(500).json({ error: "Error" });
  }
};
export const cerrarCaso = async(req,res)=>{
  const {id1,id2}= req.body;
  if(!id1 || !id2){
    return res.status(400).json({error:"Error en la seleccion"});
  }
  try{
    await db.query("delete from mascotas where id IN (?,?)",[id1,id2]);
    res.json({message:"Caso cerrado correctamente"});
  }catch(error){
    console.error("Error al cerrar",error);
    res.status(500).json({error:"Error"});
  }
}
