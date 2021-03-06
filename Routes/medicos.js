const { Router } = require('express');
const { check } = require('express-validator');

const {
    getMedico,
    createMedico,
    UpdateMedico,
    deleteMedico,
    getMedicoById
} = require('../controller/medicos');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const routes = Router();

routes.get('/', getMedico, validarJWT);

routes.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'ID Invalid').isMongoId(),
        validarCampos
    ],
    createMedico);


routes.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], UpdateMedico);

routes.delete('/:id', validarJWT, deleteMedico);
routes.get('/:id', validarJWT, getMedicoById);

module.exports = routes;