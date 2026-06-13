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

const adminsController =
require('../controllers/admins.controller');





// ======================================
// ADMIN PRINCIPAL
// ======================================

router.get(

    '/admin',

    adminsController.obtenerAdminPrincipal

);





// ======================================
// OBTENER ADMINS
// ======================================

router.get(

    '/admins',

    adminsController.obtenerAdmins

);





// ======================================
// CREAR ADMIN
// ======================================

router.post(

    '/admins',

    adminsController.crearAdmin

);





// ======================================
// EDITAR ADMIN
// ======================================

router.put(

    '/admins/:id',

    adminsController.editarAdmin

);





// ======================================
// HACER PRINCIPAL
// ======================================

router.put(

    '/admins/principal/:id',

    adminsController.hacerPrincipal

);





// ======================================
// ELIMINAR ADMIN
// ======================================

router.delete(

    '/admins/:id',

    adminsController.eliminarAdmin

);



// ======================================
// CAMBIAR PASSWORD
// ======================================

router.put(

    '/admins/password/:id',

    adminsController.cambiarPassword

);

// ======================================
// EXPORTAR
// ======================================

module.exports = router;