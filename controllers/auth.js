const express = require('express');
const {validationResult} = require('express-validator');
const User = require('../models/User');



const createUser = async (req, res = express.response) => {

    // const {name, email, password} = req.body;

    try {
        const user = new User(req.body);
    
        await user.save();
    
        res.status(201).json({
            ok: true,
            msg: 'registro',
    
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact your DB admin'
        });
    }
    
};

const loginUser = (req, res = express.response) => {

    const {email, password} = req.body;

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