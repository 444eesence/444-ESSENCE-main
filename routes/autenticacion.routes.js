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

const autenticacionController =
require('../controllers/autenticacion.controller');





// ======================================
// REGISTRO
// ======================================

router.post(

    '/registro',

    autenticacionController.registro

);





// ======================================
// LOGIN
// ======================================

router.post(

    '/login',

    autenticacionController.login

);





// ======================================
// EXPORTAR
// ======================================

module.exports = router;