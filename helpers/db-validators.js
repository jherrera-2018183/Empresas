
const Empresa = require('../models/empresa');
const sucursal = require('../models/sucursal');





const emailExiste = async (correo = '') => {

    const existeEmail = await Empresa.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya existe y esta registrado en la DB`);
    }

}
const nombreExiste = async (nombre  = '') => {

    const nombreExiste = await sucursal.findOne({ nombre });

    if (nombreExiste) {
        throw new Error(`El nombre : ${nombre} ya existe y esta registrado en la DB`);
    }

}

const existeEmpresaPorId = async (id) => {

    const existeUser = await Empresa.findById(id);

    if (!existeUser) {
        throw new Error(`El id ${id} no existe en la DB`);
    }

}

const existeSucursalPorId = async (id) => {

    const existeUser = await sucursal.findById(id);

    if (!existeUser) {
        throw new Error(`El id ${id} no existe en la DB`);
    }

}



module.exports = {
    emailExiste,
    existeEmpresaPorId,
    existeSucursalPorId,
    nombreExiste
}