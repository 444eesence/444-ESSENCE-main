

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

const productosController =
require('../controllers/productos.controller');





// ======================================
// OBTENER TODOS LOS PRODUCTOS
// ======================================

router.get(

    '/',

    productosController.obtenerProductos

);





// ======================================
// OBTENER PRODUCTO POR ID
// ======================================

router.get(

    '/:id',

    productosController.obtenerProducto

);





// ======================================
// CREAR PRODUCTO
// ======================================

router.post(

    '/',

    productosController.crearProducto

);





// ======================================
// ACTUALIZAR PRODUCTO
// ======================================

router.put(

    '/:id',

    productosController.actualizarProducto

);





// ======================================
// ELIMINAR PRODUCTO
// ======================================

router.delete(

    '/:id',

    productosController.eliminarProducto

);





// ======================================
// EXPORTAR ROUTER
// ======================================

module.exports = router;