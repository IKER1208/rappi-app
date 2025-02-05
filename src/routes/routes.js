const express = require('express');
const route = express.Router();

const authController = require('../controllers/authController');
const catalogController = require('../controllers/catalogController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const deliveryController = require('../controllers/deliveryController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');




/* === RUTAS DE AUTENTICACIÓN === */
route.post('/auth/register', authController.register);
route.post('/auth/login', authController.login);
/* === RUTAS PARA CLIENTES === */
route.get('/catalog', catalogController.getProducts);
route.post('/cart/add', authMiddleware, roleMiddleware(['cliente']), cartController.addToCart);
route.put('/cart/update', authMiddleware, roleMiddleware(['cliente']), cartController.updateCart);
route.get('/cart/:userId', authMiddleware, roleMiddleware(['cliente']), cartController.getCart);
route.post('/order/create', authMiddleware, roleMiddleware(['cliente']), orderController.createOrder);
route.get('/order/history/:userId', authMiddleware, roleMiddleware(['cliente']), orderController.getOrderHistory);

// /* === RUTAS PARA REPARTIDORES === */
// route.get('/delivery/orders', authMiddleware, roleMiddleware(['repartidor']), deliveryController.getAssignedOrders);
// route.patch('/delivery/update/:orderId', authMiddleware, roleMiddleware(['repartidor']), deliveryController.updateOrderStatus);

// /* === RUTAS PARA ADMINISTRACIÓN Y OTROS === */
// route.post('/order/cancel/:orderId', authMiddleware, orderController.cancelOrder); // Clientes pueden cancelar pedidos
// route.post('/delivery/cancel/:orderId', authMiddleware, roleMiddleware(['repartidor']), deliveryController.cancelAndReassign);

module.exports = route;
