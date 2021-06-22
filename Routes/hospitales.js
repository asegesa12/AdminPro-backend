const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitales, createHospital, UpdateHospital, deleteHospital } = require('../controller/hospitales');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const routes = Router();

routes.get('/', getHospitales);

routes.post('/', [

        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createHospital);


routes.put('/:id', [

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

], UpdateHospital);

routes.delete('/:id', validarJWT, deleteHospital);

module.exports = routes;