const Stripe = require('stripe');
const { Order } = require('../models');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Procesa un pago con Stripe.
 * @param {string} token - Token de la tarjeta del cliente.
 * @param {number} amount - Monto total a cobrar (en centavos).
 * @param {string} currency - Moneda del pago (ej: "usd").
 * @returns {Promise<{success: boolean, message: string, chargeId?: string}>}
 */
const processPayment = async (token, amount, currency = 'usd') => {
    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source: token,
            description: 'Pago en Rappi-App'
        });

        return { success: true, message: 'Pago exitoso', chargeId: charge.id };
    } catch (error) {
        console.error('Error en el pago:', error);
        return { success: false, message: error.message };
    }
};

/**
 * Realiza un reembolso en Stripe.
 * @param {number} orderId - ID del pedido a reembolsar.
 * @returns {Promise<{success: boolean, message: string}>}
 */
const refundPayment = async (orderId) => {
    try {
        // Buscar la orden en la base de datos
        const order = await Order.findByPk(orderId);
        if (!order) {
            return { success: false, message: 'Pedido no encontrado' };
        }

        // Verificar que el pedido tiene un pago registrado
        if (!order.chargeId) {
            return { success: false, message: 'No hay pago asociado para reembolsar' };
        }

        // Procesar el reembolso en Stripe
        await stripe.refunds.create({ charge: order.chargeId });

        return { success: true, message: 'Reembolso realizado con éxito' };
    } catch (error) {
        console.error('Error en el reembolso:', error);
        return { success: false, message: error.message };
    }
};

module.exports = { processPayment, refundPayment };
