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

const registrosController =
require('../controllers/registros.controller');





// ======================================
// OBTENER REGISTROS
// ======================================

router.get(

    '/',

    registrosController.obtenerRegistros

);





// ======================================
// LIMPIAR REGISTROS
// ======================================

router.delete(

    '/',

    registrosController.limpiarRegistros

);





// ======================================
// EXPORTAR
// ======================================

module.exports = router;