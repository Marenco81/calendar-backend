const express = require('express');
const {validationResult} = require('express-validator');



const createUser = (req, res = express.response) => {

    const {name, email, password} = req.body;

    // if( name.length < 5 ) {
    //     return res.status(400).json({
    //         ok:false,
    //         msg: 'El nombre debe contener al menos 5 letras'
    //     })
    // }

    //Manejo de errores

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password

    })
};

const loginUser = (req, res = express.response) => {

    const {email, password} = req.body;

    //Manejo de errores

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    res.status(200).json({
        ok: true,
        msg: 'login',
        email,
        password
    })
};

const renewToken = (req, res = express.response) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
};