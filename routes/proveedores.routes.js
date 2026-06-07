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

const proveedoresController =
require('../controllers/proveedores.controller');





// ======================================
// OBTENER PROVEEDORES
// ======================================

router.get(

    '/',

    proveedoresController.obtenerProveedores

);





// ======================================
// CREAR PROVEEDOR
// ======================================

router.post(

    '/',

    proveedoresController.crearProveedor

);





// ======================================
// ACTUALIZAR PROVEEDOR
// ======================================

router.put(

    '/:id',

    proveedoresController.actualizarProveedor

);





// ======================================
// ELIMINAR PROVEEDOR
// ======================================

router.delete(

    '/:id',

    proveedoresController.eliminarProveedor

);





// ======================================
// EXPORTAR
// ======================================

module.exports = router;