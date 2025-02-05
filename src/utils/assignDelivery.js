const Order = require('../models/Order');
const Delivery = require('../models/delivery');
const User = require('../models/User');

/**
 * Función para reasignar un pedido a otro repartidor disponible cuando el original cancela.
 * @param {number} orderId - ID del pedido a reasignar.
 * @returns {Promise<{success: boolean, message: string}>} Resultado de la reasignación.
 */
const assignNewDeliveryPerson = async (orderId) => {
    try {
        // Buscar el pedido en la base de datos
        const order = await Order.findByPk(orderId);
        if (!order) {
            return { success: false, message: 'Pedido no encontrado' };
        }

        // Verificar si el pedido ya fue entregado o cancelado
        if (order.status === 'Entregado' || order.status === 'Cancelado') {
            return { success: false, message: 'No se puede reasignar este pedido' };
        }

        // Buscar un repartidor disponible (que no esté entregando otro pedido)
        const availableDeliveryPerson = await User.findOne({
            where: { role: 'repartidor' },
            include: {
                model: Delivery,
                where: { status: 'Asignado' },
                required: false
            }
        });

        if (!availableDeliveryPerson) {
            return { success: false, message: 'No hay repartidores disponibles' };
        }

        // Actualizar la entrega con el nuevo repartidor
        await Delivery.update(
            { deliveryPersonId: availableDeliveryPerson.id, status: 'Asignado' },
            { where: { orderId } }
        );

        return { success: true, message: `Pedido reasignado al repartidor ${availableDeliveryPerson.name}` };
    } catch (error) {
        console.error('Error al reasignar el pedido:', error);
        return { success: false, message: 'Error interno al reasignar el pedido' };
    }
};

module.exports = { assignNewDeliveryPerson };
