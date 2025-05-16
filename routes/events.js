/*
    Event routes
    /api/events
*/

const {Router} = require('express');
const {validateJWT} = require('../middlewares/validar-jwt');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();




//Todas tiene que pasar por la validacion del JWT
// Obtener eventos
router.get('/', validateJWT , getEventos)


//Crear un nuevo evento
router.post(
    '/',
    [ //middlewares
        check('title', 'The title is mandatory').not().isEmpty(),
        check('start', 'The start date is mandatory').custom(isDate),
        check('end', 'The end date is mandatory').custom(isDate),
    ] , 
    validateFields, validateJWT , crearEvento)

//Actualizar Evento
router.put('/:id', validateJWT , actualizarEvento)

//Borrar Evento
router.delete('/:id', validateJWT , eliminarEvento)


module.exports = router;