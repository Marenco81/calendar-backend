/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

router.post(
    '/new',
     [ //midlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser al menos de 6 caracteres').isLength({min:6}),

     ] ,
      createUser);

router.post(
    '/',
     [ //midlewawares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser al menos de 6 caracteres').isLength({min:6}),
     ] ,
      loginUser);

router.get('/renew', renewToken);

module.exports = router;