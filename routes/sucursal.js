const { Router } = require('express');
const { check } = require('express-validator');
const { deleteSucursal, putSucursal, postSucursal, getSucursal, sucursalYaExiste } = require('../controllers/sucursal');
const { emailExiste, existeEmpresaPorId,  existeSucursalPorId, nombreExiste,  } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/mostrarSucursal', getSucursal);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom( nombreExiste ),
    validarCampos
] ,postSucursal);



router.put('/editarSucursal/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    validarCampos
] ,putSucursal);


router.delete('/eliminarSucursal/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    validarCampos
] ,deleteSucursal);


module.exports = router;




// 