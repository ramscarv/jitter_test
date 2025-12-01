const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

/**
 * @route POST /order
 * @desc Cria um novo pedido
 * @access Public
 */
router.post('/order', createOrder);

/**
 * @route GET /order/:orderId
 * @desc Obtém um pedido pelo ID
 * @access Public
 */
router.get('/order/:orderId', getOrder);

/**
 * @route GET /order/list
 * @desc Lista todos os pedidos
 * @access Public
 */
router.get('/order', listOrders);

/**
 * @route PUT /order/:orderId
 * @desc Atualiza um pedido existente
 * @access Public
 */
router.put('/order/:orderId', updateOrder);

/**
 * @route DELETE /order/:orderId
 * @desc Deleta um pedido
 * @access Public
 */
router.delete('/order/:orderId', deleteOrder);

module.exports = router;