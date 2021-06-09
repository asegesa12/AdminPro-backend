const { response } = require('express');
const Hospital = require('../models/hospital');
const Medicos = require('../models/medicos');
const Usuario = require('../models/usuario');


const getBusqueda = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    const regexp = new RegExp(busqueda, 'i');

    /* const usuario = await Usuario.find({ nombre: regexp });
     const medico = await Medicos.find({ nombre: regexp });
     const hospital = await Hospital.find({ nombre: regexp });*/

    const [usuario, medicos, hospital] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Medicos.find({ nombre: regexp }),
        Hospital.find({ nombre: regexp })
    ])


    res.json({
        ok: true,
        usuario,
        medicos,
        hospital
    });



}

const getCollection = async(req, res = response) => {


    const table = req.params.tabla;
    const busqueda = req.params.busqueda;


    const regexp = new RegExp(busqueda, 'i');

    let data = []

    switch (table) {
        case 'medicos':

            data = await Medicos.find({ nombre: regexp })
                .populate('usuario', 'nombre')
                .populate('hospital', 'nombre')

            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regexp })
                .populate('usuario', 'nombre');

            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regexp })


            break;

        default:

            return res.status(400).json({
                ok: false,
                msg: 'Collections not founds'
            });


    }



    res.json({
        ok: true,
        collection: table,
        resultados: data
    });


}



module.exports = {
    getBusqueda,
    getCollection

}