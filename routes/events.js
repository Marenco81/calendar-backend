/*
    Event routes
    /api/events
*/

const {Router} = require('express');
const {validateJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');

const router = Router();




//Todas tiene que pasar por la validacion del JWT
// Obtener eventos
router.get('/', validateJWT , getEventos)


//Crear un nuevo evento
router.post('/', validateJWT , crearEvento)

//Actualizar Evento
router.put('/:id', validateJWT , actualizarEvento)

//Borrar Evento
router.delete('/:id', validateJWT , eliminarEvento)


module.exports = router;