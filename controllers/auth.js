const express = require('express');



const createUser = (req, res = express.response) => {

    res.json({
        ok: true,
        msg: 'registro'
    })
};

const loginUser = (req, res = express.response) => {

    res.json({
        ok: true,
        msg: 'login'
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