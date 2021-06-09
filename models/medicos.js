const { Schema, model } = require('mongoose');

const MedicoScheme = Schema({

    nombre: {
        type: String,
        required: true

    },

    img: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },

    hospital: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital'
    },




});

MedicoScheme.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Medico', MedicoScheme);