const { Router } = require('express');
const { check } = require('express-validator');
const { deleteSucursal, putSucursal, postSucursal, getSucursal } = require('../controllers/sucursal');
const { esRoleValido, emailExiste, existeEmpresaPorId, esSucursalValido, sucursal4Valido, existeSucursalPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esMaestroRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrarSucursal', getSucursal);

router.post('/agregar/sucursal', [
    validarJWT,
    //esMaestroRole,
    check('sucursal', 'El sucursal es obligatorio').not().isEmpty(),
    //validarCampos,
] ,postSucursal);



router.put('/editarSucursal/:id', [
    validarJWT,
    esMaestroRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    validarCampos
] ,putSucursal);


router.delete('/eliminarSucursal/:id', [
    validarJWT,
    tieneRole('ROL_MAESTRO'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeSucursalPorId ),
    validarCampos
] ,deleteSucursal);


module.exports = router;




// 