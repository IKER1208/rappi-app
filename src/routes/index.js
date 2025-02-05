const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const catalogController = require('../controllers/catalogController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const deliveryController = require('../controllers/deliveryController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/* === RUTAS DE AUTENTICACIÓN === */
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

/* === RUTAS PARA CLIENTES === */
router.get('/catalog', catalogController.getCatalog);
router.post('/cart/add', authMiddleware, roleMiddleware(['cliente']), cartController.addToCart);
router.get('/cart/:userId', authMiddleware, roleMiddleware(['cliente']), cartController.getCart);
router.post('/order/create', authMiddleware, roleMiddleware(['cliente']), orderController.createOrder);
router.get('/order/history/:userId', authMiddleware, roleMiddleware(['cliente']), orderController.getOrderHistory);

/* === RUTAS PARA REPARTIDORES === */
router.get('/delivery/orders', authMiddleware, roleMiddleware(['repartidor']), deliveryController.getAssignedOrders);
router.patch('/delivery/update/:orderId', authMiddleware, roleMiddleware(['repartidor']), deliveryController.updateOrderStatus);

/* === RUTAS PARA ADMINISTRACIÓN Y OTROS === */
router.post('/order/cancel/:orderId', authMiddleware, orderController.cancelOrder); // Clientes pueden cancelar pedidos
router.post('/delivery/cancel/:orderId', authMiddleware, roleMiddleware(['repartidor']), deliveryController.cancelAndReassign);

module.exports = router;
