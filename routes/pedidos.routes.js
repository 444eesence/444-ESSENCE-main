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

const pedidosController =
require('../controllers/pedidos.controller');





// ======================================
// OBTENER PEDIDOS
// ======================================

router.get(

    '/',

    pedidosController.obtenerPedidos

);





// ======================================
// CREAR PEDIDO
// ======================================

router.post(

    '/',

    pedidosController.crearPedido

);





// ======================================
// MARCAR ENVIADO
// ======================================

router.put(

    '/enviar/:id',

    pedidosController.marcarEnviado

);





// ======================================
// CANCELAR PEDIDO
// ======================================

router.delete(

    '/:id',

    pedidosController.cancelarPedido

);





// ======================================
// EXPORTAR
// ======================================

module.exports = router;