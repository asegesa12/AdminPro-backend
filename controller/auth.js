const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');



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


const GoogleSignIn = async(req, res = response) => {

    const googleToken = req.body.token


    try {
        // Hago la destrecturacion para obtener estos
        // campos atraves de del helop google_verify.

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });

        let usuario;


        // Si no existe el usuario haz esto

        if (!usuarioDB) {

            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {

            usuario = usuarioDB;
            usuario.google = true
        }

        await usuario.save();

        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            msg: 'SignIn',
            token

        });

    } catch (error) {
        res.status(401).json({
            ok: true,
            msg: 'Token Invalid'
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    login,
    GoogleSignIn,
    renewToken
}