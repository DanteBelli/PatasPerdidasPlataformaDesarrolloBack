import { error } from "console";
import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const register = async (req ,res)=>{
    const {mail , password,rol} = req.body;
    try{
        const hashedPass = await bcrypt.hash(password,10);
        const [exist] = await db.query("SELECT * FROM usuarios where mail = ?",[mail]);
        if(exist.length>0){
            return res.status(400).json({error:"Error"});
        }
await db.query("INSERT INTO usuarios (mail, password, rol) VALUES (?, ?, ?)", [mail, hashedPass, rol]);
        res.status(201).json({message : "Usuario creado"});
    }catch(error){
        console.error("Error",error);
        res.status(500).json({error:"error"});
    }
};
export const login = async (req , res)=>{
    const{mail,password}=req.body;

    try{
        const [usuarios]=await db.query("select * from usuarios where mail = ?",[mail]);
        const usuario = usuarios[0];
        /* probando busqueda de error return res.json({message:"Select Correcto" , usuario: {id: usuario.id , email: usuario.mail, password:usuario.password}});*/
        if(!usuario){
            return res.status(404).json({error:"No se encuentra el user"});
        }
        if (password !== usuario.password) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        res.json({message:"Login Correcto" , usuario: {id: usuario.id , email: usuario.mail}});
    }catch (error){
        console.error("Error en el log",error);
        res.status(500).json({error: "Error"});
    }
};
export const obtenerUsuario = async (req,res)=>{
    const {mail}=req.params;
    try{
        const [usuarios]= await db.query("select id , mail , rol from usuarios where mail = ?",[mail]);
        if(usuarios.length === 0){
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        res.json(usuarios[0]);
    }catch(error){
        console.error("Error",error);
        res.status(500).json({error:"Error"});
    }
};