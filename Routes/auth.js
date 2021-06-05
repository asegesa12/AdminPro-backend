const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { login } = require('../controller/auth');

const router = Router();


router.post('/', [

    check('email', 'email is require').isEmail(),
    check('password', 'password is require').not().isEmpty(),
    validarCampos

], login)





module.exports = router;