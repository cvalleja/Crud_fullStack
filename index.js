const express = require('express');
const cors = require('cors');
const PersonaRouter = require('./routers/personaRouter');

class Server{
    constructor(){
        //crear una app express
        this.app = express();
        this.config();
    }

    config(){
        this.app.set('PORT', process.env.PORT || 3000);
        //Indicar que se procesarán datos en formato JSON
        this.app.use(express.json());
        //Permitir conexiones de origen cruzado
        this.app.use(cors());
        //Crear ruta raíz
        let router = express.Router();
        router.get('/', (req, res)=>{
            res.status(200).json({message: 'All ok'});
        });
        //Añadir ruta raíz a express
        this.app.use(router);
        //Crear objetos del paquete 'routers'
        const personaR = new PersonaRouter();

        //Añadir rutas del paquete 'routers' a la app express
        this.app.use(personaR.router);

        //Poner a la escucha el servidor
        this.app.listen(this.app.get('PORT'), ()=>{
            console.log(`Servidor corriendo por el puerto-> ${this.app.get('PORT')}`);            
        });
    }
}

new Server();
