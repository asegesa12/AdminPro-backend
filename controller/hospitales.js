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

const UpdateHospital = async(req, res = responnse) => {

    const id = req.params.id
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);


        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital Not Found'

            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const UpdateHospital = await Hospital.findByIdAndUpdate(id, cambiosHospital, ({ new: true }))

        res.json({
            ok: true,
            msg: 'Hospital Actualizado',
            UpdateHospital
        });

    } catch (error) {

        res.status(500).json({
            ok: true,
            msg: 'Error al Actualizar'
        });

    }

}

const deleteHospital = async(req, res = responnse) => {

    const id = req.params.id

    try {

        const hospitalDb = await Hospital.findById(id);

        if (!hospitalDb) {
            res.status(400).json({
                ok: false,
                msg: 'Ese hospital no existe'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital Eliminado',

        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al Borrar'
        });
    }

}

module.exports = {
    getHospitales,
    createHospital,
    UpdateHospital,
    deleteHospital
}