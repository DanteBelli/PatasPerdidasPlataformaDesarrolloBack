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
    const{email,password}=req.body;

    try{
        const [usuarios]=await db.query("select * from usuarios where mail = ?",[email]);
        const usuario = usuarios[0];

        if(!usuario){
            return res.status(404).json({error:"No se encuentra el user"});
        }
        const passwordOk = await bcrypt.compare(password,usuario.password);
        if (!passwordOk){
            return res.status(401).json({error:"No se encuentra el usuario"});
        }
        res.json({message:"Login Correcto" , usuario: {id: usuario.id , email: usuario.mail}});
    }catch (error){
        console.error("Error en el log",error);
        res.status(500).json({error: "Error"});
    }
};