const { Order } = require('../models');
const assignDelivery = require('../utils/assignDelivery');

exports.getOrdersForDelivery = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { status: 'Pendiente' } });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
};

exports.updateDeliveryStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        if (status === 'Cancelado') {
            await assignDelivery(orderId);
        }

        await order.update({ status });
        res.json({ message: 'Estado del pedido actualizado', order });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar estado del pedido', error });
    }
};
