/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const express = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/validar-campos');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const {validateJWT} = require('../middlewares/validar-jwt');

const router = express.Router();

router.post(
    '/new',
     [ //midlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser al menos de 6 caracteres').isLength({min:6}),
        validateFields

     ] ,
      createUser);

router.post(
    '/',
     [ //midlewawares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser al menos de 6 caracteres').isLength({min:6}),
        validateFields
     ] ,
      loginUser);

router.get('/renew', validateJWT , renewToken);

module.exports = router;