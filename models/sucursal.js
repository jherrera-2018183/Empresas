const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    sucursal: {
        type: String,
        required: [true , 'El sucursal es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    }
});


module.exports = model('Sucursal', SucursalSchema);