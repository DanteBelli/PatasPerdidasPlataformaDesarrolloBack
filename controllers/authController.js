const { error } = require("console");
const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.register = async (req , res) => {
    const {mail, password} = req.body;

    const [existe] =await db.query("Select * from usuarios where email = ?",[mail]);
    if (existe.length > 0)return res.status(400).json({error:"Usuario ya existente"});

    const hashed = await bcrypt.hash(password,10);
    await db.query("Insert into usuarios(mail,password,rol)VALUES(?,?,?)",[mail,hashed,"usuario"]);

    res.status(201).json({message:"Usuario Creado"});
};

exports.login = async (req , res) =>{
    const {mail , password} = req.body;
    const [usuarios] = await db.query("SELECT * FROM usuarios where mail = ?",[mail]);
    if(usuarios.length ===0)return res.status(404).json({error : "No existe este usuario"});

    const ok = await bcrypt.compare(password , usuarios[0].password);
    if(!ok)return res.status(401).json({error: "Error en la constraseña"});

    res.json({id: usuarios[0].id, mail: usuarios[0].mail });
};

