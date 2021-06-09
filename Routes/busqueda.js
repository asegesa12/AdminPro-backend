const { Router } = require('express');


const { getBusqueda, getCollection } = require('../controller/busqueda');

const { validarJWT } = require('../middleware/validar-jwt');

const routes = Router();

routes.get('/:busqueda', validarJWT, getBusqueda);

routes.get('/coleccion/:tabla/:busqueda', validarJWT, getCollection);



module.exports = routes;