const {response} = require('express');
const Events = require('../models/Events');
const { body } = require('express-validator');

const getEventos = async (req, res = response) => {

    const events = await Events.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        events
    })

};

const crearEvento = async (req, res = response) => {

    //verificar que tenga el evento
    const event = new Events(req.body);

    try {

    event.user = req.uid;

    const eventSaved = await event.save();

      res.json({
        ok: true,
        evento: eventSaved
      })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact the DB Admin'
        });
    }
    

};

const actualizarEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarEvento'
    })

};

const eliminarEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'eliminarEvento'
    })

};


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
