const { response } = require('express');
const Medico = require('../models/medicos');


const getMedico = async(req, res = responnse) => {

    const medicos = await Medico.find().populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })

}

const createMedico = async(req, res = responnse) => {

    const uid = req.uid;

    const user_medico = new Medico({ usuario: uid, ...req.body });

    try {

        const medicDb = await user_medico.save();

        res.json({
            ok: true,
            Medico: medicDb
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}

const UpdateMedico = (req, res = responnse) => {

    res.json({
        ok: true,
        msg: 'UpdateMedico'
    });
}

const deleteMedico = (req, res = responnse) => {

    res.json({
        ok: true,
        msg: 'delete Medicos'
    });
}

module.exports = {
    getMedico,
    createMedico,
    UpdateMedico,
    deleteMedico
}