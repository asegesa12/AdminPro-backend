const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

const crearUsuarios = async(req, res = response) => {

    const { email, nombre, password } = req.body;


    try {
        const existEmail = await Usuario.findOne({ email });

        // Validate exits email
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario(req.body);

        // Encrypt Password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Save Users
        await usuario.save();

        // Obtain tokens after create a user.
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })

    }


}

const UpdateUsers = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await Usuario.findById(uid);

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'Not Found'
            })
        }
        const { password, google, email, ...campos } = req.body;

        if (userDB.email !== email) {


            const exist_email = await Usuario.findOne({ email });

            if (exist_email) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ese email ya esta en uso'
                });
            }

        }

        campos.email = email;

        const ActualizarUsuario = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: ActualizarUsuario
        })

    } catch (error) {
        console.log(error);
        ok: false,
            res.status(500).json({
                msg: 'Internal Error, Checks update updates method'
            });
    }
}

const borrarUsuarios = async(req, res = responde) => {

    const uid = req.params.id;

    try {

        const userDB = await Usuario.findById(uid);

        if (!userDB) {
            res.status(400).json({
                ok: false,
                msg: 'Not Exist'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        })

    }
}



module.exports = {
    getUsuarios,
    crearUsuarios,
    UpdateUsers,
    borrarUsuarios
}