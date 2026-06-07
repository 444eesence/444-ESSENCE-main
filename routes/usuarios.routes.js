// ======================================
// EXPRESS
// ======================================

const express =
require('express');

const router =
express.Router();





// ======================================
// CONTROLLER
// ======================================

const usuariosController =
require('../controllers/usuarios.controller');





// ======================================
// OBTENER USUARIOS
// ======================================

router.get(

    '/',

    usuariosController.obtenerUsuarios

);





// ======================================
// ELIMINAR USUARIO
// ======================================

router.delete(

    '/:id',

    usuariosController.eliminarUsuario

);





// ======================================
// EXPORTAR
// ======================================

module.exports = router;