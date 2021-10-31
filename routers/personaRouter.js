const express = require('express');
const PersonaController = require('../controllers/personaController');


class PersonaRouter{

    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
        const personaC = new PersonaController();
        this.router.get('/personas', personaC.obtenerPersonas);
        this.router.get('/personas/:email', personaC.obtenerPersonaPorEmail);
        this.router.post('/personas', personaC.registrarPersona);
        this.router.put('/personas', personaC.actualizarPersona);
        this.router.delete('/personas', personaC.eliminarPersona);

    }

}

module.exports = PersonaRouter;

