const { response } = require('express');
const Medico = require('../models/medicos');


const getMedico = async(req, res = response) => {


    const desde = Number(req.query.desde) || 0;

    const [medicos, total] = await Promise.all([
        Medico.find({}, 'nombre img')
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
        .skip(desde)
        .limit(4),

        Medico.countDocuments()
    ]);

    /* const medicos = await Medico.find().populate('usuario', 'nombre img')
         .populate('hospital', 'nombre img');*/

    res.json({
        ok: true,
        Medico: medicos,
        total: total
    })

}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img')

        res.json({
            ok: true,
            Medico: medico
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
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

const UpdateMedico = async(req, res = responnse) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });

        }

        const cambiosMedico = {...req.body, usuario: uid }

        const ActualizarHospital = await Medico.findByIdAndUpdate(id, cambiosMedico, ({ new: true }))

        res.json({
            ok: true,
            ActualizarHospital
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error Al Actualizar'
        });
    }

}

const deleteMedico = async(req, res = responnse) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.staus(404).json({
                ok: false,
                msg: 'Not Exists'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Se ha eliminado el medico...'
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Erro al borrar Medico'
        });
    }

}

module.exports = {
    getMedico,
    createMedico,
    UpdateMedico,
    deleteMedico,
    getMedicoById
}