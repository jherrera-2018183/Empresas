//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { sucursalYaExiste } = require('../controllers/sucursal');
const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa, validacionSucursal, getEmpresaPorID } = require('../controllers/empresa');
const { esRoleValido, emailExiste, existeEmpresaPorId, esSucursalValido, sucursalValido, esElSucursalValido} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, rolSucursalValido, esMaestroRole } = require('../middlewares/validar-roles');
const role = require('../models/role');

const router = Router();

router.get('/mostrar', getEmpresas);
router.get('/mostrar/:id', getEmpresaPorID);

router.post('/agregar/alumno', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol').default('ROL_ALUMNO').custom( esRoleValido ),
    //validarCampos,
] ,postEmpresa);
/*
router.put('/asignar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEmpresaPorId ),
    check('sucursal').custom(esSucursalValido),
    check('sucursal2').custom(esSucursalValido), 
    check('sucursal3').custom( esSucursalValido ),
    check('sucursal4', 'Un alumno solo puede registrarse a 3 sucursals').isEmpty(), 
    validarCampos
] ,putEmpresa);
*/

router.post('/agregar/profesor', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').default('ROL_MAESTRO').custom( esRoleValido ),
    validarCampos,
] ,postEmpresa);

router.put('/editar/:id', [
    validarJWT,
    esMaestroRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEmpresaPorId ),
    validarCampos
] ,putEmpresa);


router.delete('/eliminarAlumno/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEmpresaPorId ),
    validarCampos
] ,deleteEmpresa);


router.delete('/eliminar/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ROL_MAESTRO'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEmpresaPorId ),
    validarCampos
] ,deleteEmpresa);


module.exports = router;
