/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const express = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const router = express.Router();


router.post('/new', createUser);

router.post('/', loginUser);

router.get('/renew', renewToken);

module.exports = router;