const { Order, OrderStatus } = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;
        const order = await Order.create({ userId, items, totalPrice, status: 'Pendiente' });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear pedido', error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await order.update({ status });
        res.json({ message: 'Estado del pedido actualizado', order });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estado del pedido', error });
    }
};
