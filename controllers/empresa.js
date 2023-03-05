const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {

    const query = { estado: true };

    const listaEmpresas = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Empresa',
        listaEmpresas
    });

}



const getEmpresaPorID = async (req = request, res = response) => {

    const { id } = req.params;
    const empresaById = await Empresa.findById(id)

    res.status(201).json(empresaById);
}

const postEmpresa = async (req = request, res = response) => {

    const { nombre, correo, password, tipo } = req.body;
    const empresaGuardadoDB = new Empresa({
        nombre, correo, password, tipo
    });


    const salt = bcrypt.genSaltSync();
    empresaGuardadoDB.password = bcrypt.hashSync(password, salt);

    await empresaGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Empresa',
        empresaGuardadoDB
    });

}



const putEmpresa = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, img,  /* rol,*/  estado, google, ...resto } = req.body;

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const empresaEditado = await Empresa.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        empresaEditado
    });

}

const deleteEmpresa = async (req = request, res = response) => {
    const { id } = req.params;

    const empresaEliminado = await Empresa.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar empresa',
        empresaEliminado
    });
}

module.exports = {
    getEmpresas,
    getEmpresaPorID,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
}


