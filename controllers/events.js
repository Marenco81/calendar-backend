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

const actualizarEvento = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Events.findById(eventId);

        if( !event ) {
            res.status(404).json({
                ok: false,
                msg: "No Event with that id"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No privilege to edit this event'
            });
        }

        const newEvent = {
            ...req.body, 
            user: uid
        }

        const eventUpdated = await Events.findByIdAndUpdate( eventId, newEvent, {new:true} );

        res.json({
            ok: true,
            msg: eventUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact DB Admin'
        });
    }


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
