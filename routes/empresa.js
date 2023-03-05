//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa,getEmpresaPorID } = require('../controllers/empresa');
const { emailExiste, existeEmpresaPorId, } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/mostrar', getEmpresas);
router.get('/mostrar/:id', getEmpresaPorID);

router.post('/agregar/alumno', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos,
] ,postEmpresa);


router.put('/editar/:id', [
    validarJWT,

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
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeEmpresaPorId ),
    validarCampos
] ,deleteEmpresa);


module.exports = router;
