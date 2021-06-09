const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = responnse) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre');

    res.json({
        ok: true,
        Hospital: hospitales
    });
}

const createHospital = async(req, res = responnse) => {

    const uid = req.uid;

    const hospital = new Hospital({ usuario: uid, ...req.body })

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            usuario: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

}

const UpdateHospital = (req, res = responnse) => {

    res.json({
        ok: true,
        msg: 'UpdateHospital'
    });
}

const deleteHospital = (req, res = responnse) => {

    res.json({
        ok: true,
        msg: 'deleteHospital'
    });
}

module.exports = {
    getHospitales,
    createHospital,
    UpdateHospital,
    deleteHospital
}