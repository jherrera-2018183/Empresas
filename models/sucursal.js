const { Schema, model } = require('mongoose');

const SucursalSchema = new Schema({
    
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']

    },
    direccion:{
        type:String,
        required:[true, 'La direccion es obligatoria']
    },
    municipio:{
        type: String,
        enum: ['Ciudad de Guatemala', 'Mixco', 'Villa Nueva', 'San Miguel Petapa'],
        required:[true, 'El municipio es obligatoria']
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Empresa'
    },
});


module.exports = model('Sucursal', SucursalSchema);