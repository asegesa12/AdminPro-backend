const { Router } = require('express');
const { check } = require('express-validator');

const { fileUpload, retornarImg } = require('../controller/uploads');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const expressFileUpload = require('express-fileupload')

const routes = Router();

routes.use(expressFileUpload());

routes.put('/:tabla/:id', validarJWT, fileUpload);
routes.get('/:tabla/:foto', retornarImg);


module.exports = routes;