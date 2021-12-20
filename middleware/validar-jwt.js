const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay ningun token'
        });

    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }

    next();


}

const validarRoles = async(req, res = response, next) => {
    const uid = req.uid;

    try {

        const userDB = await Usuario.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not exists'
            })

        }

        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'You dont have priviligies'
            })
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        });

    }
}


const validarRoles_Usuarios = async(req, res = response, next) => {
    const uid = req.uid;
    const id = req.params.id;

    try {

        const userDB = await Usuario.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not exists'
            })

        }

        // This was my lastest change from  20/12/21 3:00 AM

        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'You dont have priviligies'
            })

        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        });

    }
}

module.exports = {
    validarJWT,
    validarRoles,
    validarRoles_Usuarios
}