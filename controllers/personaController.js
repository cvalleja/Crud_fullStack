const Db = require("../database/db")

class PersonaController{

    constructor(){
        this.connection = new Db();
    }

    //Método para obtener todas las personas
    obtenerPersonas(req, res){
        let conn = new Db();
        conn.querySelect("SELECT * FROM personas", []).then(resp =>{
            console.log(resp);
            res.status(200).json(resp);
        }).catch(error =>{
            res.status(500).send();
        });
        //console.log("Este es otro proceso");
    }

    async obtenerPersonaPorEmail(req, res){
        let email = req.params.email;
        //Crear objeto
        let conn = new Db();
        let person = await conn.querySelect("SELECT * FROM personas WHERE email = ?", [email]);
        res.status(200).json(person);
    }

    registrarPersona(req, res){
        let {nombre, apellido, telefono, email} = req.body;
        //crear objeto de conexión
        let conn = new Db();
        let query = "INSERT INTO personas(nombre, apellido, telefono, email) VALUES(?, ?, ?, ?)";
        let params = [nombre, apellido, telefono, email];
        conn.querySelect(query, params).then(resp=>{
            res.status(201).send();
        }).catch(error=>{
            console.log(error)
            res.status(500).send();
        });
    }

    actualizarPersona(req, res){
        let {nombre, apellido, telefono, email} = req.body;
        let conn = new Db();
        let query = "UPDATE personas SET nombre = ?, apellido = ?, email = ?";
        let params = [nombre, apellido, telefono, email, id];
        conn.querySelect(query, params).then(resp=>{
            res.status(200).send();
        }).catch(error =>{
            res.status(500).send();
        });
    }

    async eliminarPersona(req, res){
        let {id} = req.body;
        let conn = new Db();
        let query = "DELETE FROM personas WHERE id = ?";
        let params = [id];
        await conn.querySelect(query, params);
        res.status(200).send();
    }

}

module.exports = PersonaController;
