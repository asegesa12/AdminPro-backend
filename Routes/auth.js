const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { login, GoogleSignIn, renewToken } = require('../controller/auth');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

// api/login

router.post('/', [

    check('email', 'email is require').isEmail(),
    check('password', 'password is require').not().isEmpty(),
    validarCampos

], login)

router.post('/google', [
    check('token', 'Token is Require').not().isEmpty(),
    validarCampos

], GoogleSignIn)

router.get('/renew', validarJWT, renewToken)




module.exports = router;