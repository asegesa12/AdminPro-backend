const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {


    const Erros = validationResult(req);

    if (!Erros.isEmpty()) {
        return res.status(400).json({
            ok: false,
            Errores: Erros.mapped()
        });
    }

    // Pasa al siguiente middleware
    next();

}

module.exports = {
    validarCampos,
}