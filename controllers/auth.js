const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt');



const createUser = async (req, res = express.response) => {

    const {email, password} = req.body;

    try {

        let user = await User.findOne({email});
        console.log(user);

        if(user) {
            res.status(400).json({
                ok: false,
                msg: 'That email has already been used on an User'
            })
        }
        user = new User(req.body);

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    
        await user.save();

        // Generar JWT
        
        const token = await generateJWT(user.id, user.name);
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact your DB admin'
        });
    }
    
};

const loginUser = async (req, res = express.response) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        console.log(user);

        if(!user) {
            res.status(400).json({
                ok: false,
                msg: 'No existing User with that email'
            });
        }
        //Confirmar password

        const validPassword = bcrypt.compareSync( password, user.password );

        if(!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Incorrect Password'
            });
        }

        // Generar JWT

        const token = await generateJWT(user.id, user.name);


        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact your DB admin'
        });
    }

    
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