var db = require('mysql-promise')();
//Importar módulos y comnponentes
const key_database = require('./key_database');

class Db{

    constructor(){
        db.configure(key_database.key);
    }

    async querySelect(query, params){
        //await db.query(query);
        let resp = await db.query(query, params);
        return resp[0];
    }

}

module.exports = Db;
