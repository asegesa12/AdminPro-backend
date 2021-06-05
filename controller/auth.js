const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await Usuario.findOne({ email });

        // Verificando Email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });

        }

        // Verificando Password

        const password_ = bcrypt.compareSync(password, userDB.password);

        if (!password_) {
            return res.status(400).json({
                ok: false,
                msg: ' Password Invalid'
            });
        }

        //Generar Tokens
        const token = await generarJWT(userDB.id);

        res.json({
            ok: true,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}

module.exports = {
    login
}