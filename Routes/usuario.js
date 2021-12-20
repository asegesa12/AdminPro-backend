const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuarios, UpdateUsers, borrarUsuarios } = require('../controller/usuario');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT, validarRoles, validarRoles_Usuarios } = require('../middleware/validar-jwt');

const routes = Router();

routes.get('/', validarJWT, getUsuarios);
routes.post('/', [
        check('nombre', 'name is require').not().isEmpty(),
        check('password', 'password is require').not().isEmpty(),
        check('email', 'email is require').isEmail(),
        validarCampos
    ],
    crearUsuarios);


routes.put('/:id', [
    validarJWT,
    validarRoles_Usuarios,
    check('nombre', 'name is require').not().isEmpty(),
    check('role', 'role is require').not().isEmpty(),
    check('email', 'email is require').isEmail(),
    validarCampos
], UpdateUsers);

routes.delete('/:id', validarRoles, validarJWT, borrarUsuarios);

module.exports = routes;