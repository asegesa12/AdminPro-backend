const { Schema, model } = require('mongoose');

const HospitalScheme = Schema({

    nombre: {
        type: String,
        required: true

    },

    img: {
        type: String
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }




});

HospitalScheme.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Hospital', HospitalScheme);