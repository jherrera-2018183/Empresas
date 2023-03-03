const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Sucursal = require('../models/sucursal');

const getSucursal = async (req = request, res = response) => {

    const query = { estado: true };

    const listaSucursal = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query).populate('empresa', 'nombre')
    ]);

    res.json({
        msg: 'get Api - Controlador Sucursal',
        listaSucursal
    });

}

const postSucursal = async (req = request, res = response) => {

    const sucursal = req.body.sucursal.toUpperCase();

    const sucursalDB = await Sucursal.findOne({ sucursal })

    if (sucursalDB) {
        return res.status(400).json({
            msg: `El sucursal ${sucursalDB.sucursal}, ya existe.`
        });
    }

    const data = {
        sucursal,
        empresa: req.empresa._id
    }

    const curse = new Sucursal(data);

    await curse.save()

    res.status(201).json(curse);

}

const sucursalYaExiste = async (req = request, res = response) => {
    const sucursalDB = await Sucursal.findOne({ sucursal })

    if (sucursalDB) {
        return res.status(400).json({
            msg: `El sucursal ${sucursalDB.sucursal}, ya existe.`
        });
    }

}


const putSucursal = async (req = request, res = response) => {


    const { id } = req.params;
    const { estado, empresa, ...resto } = req.body;

    resto.sucursal = resto.sucursal.toUpperCase();
    resto.empresa = req.empresa._id;

    const sucursalEditado = await Sucursal.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(sucursalEditado);



}

const deleteSucursal = async (req = request, res = response) => {
    const { id } = req.params;

    const sucursalEliminado = await Sucursal.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        sucursalEliminado
    });
}

module.exports = {
    getSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal,
    sucursalYaExiste
}


// CONTROLADOR