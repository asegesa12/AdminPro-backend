const { response } = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay ningun token'
        });

    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }

    next();


}

module.exports = {
    validarJWT,
}