const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresa');
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

const postSucursal = async( req= request, res = response ) =>{

    try {
        const {nombre, direccion, municipio} = req.body;
        const empresaId = req.empresa._id;

        const sucursalDB = new Sucursal({nombre, direccion, municipio, empresa: empresaId});

        await sucursalDB.save();

        const empresa = await Empresa.findById(empresaId);
        
        empresa.sucursales.push(sucursalDB._id);
        await empresa.save();
        
        res.json({
          msg: 'Post - Sucursal Agregada',
          sucursalDB
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({
          msg: 'Error al guardar la empresa en la base de datos'
        });
      }


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