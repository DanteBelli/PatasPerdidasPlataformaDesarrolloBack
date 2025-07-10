const db = require("../config/db");

exports.listarMascotas = async (req , res) =>{
    const [rows] = await db.query("SELECT * from mascotas");
    res.json(rows);
};

exports.creatMascota = async (req , res) => {
    const {nombre , tipo , descripcion , usuariMail , ubicacion , foto , lat, lng} = req.body;
    const [result] = await db.query("INSERT INTO mascotas (tipo , descripcion , usuariMail , ubicacion, foto , nombre , lat , lng)values(?,?,?,?,?,?,?,?)",
        [tipo , descripcion,usuariMail,ubicacion,foto,nombre,lat,lng]
    );
    res.status(201).json({id:result.insertId});
};

// falta el editar para cuando se hace el match de mascotas