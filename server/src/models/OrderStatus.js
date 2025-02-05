const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');

const OrderStatus = sequelize.define('OrderStatus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('Pendiente', 'En camino', 'Entregado', 'Cancelado'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: true });

Order.hasMany(OrderStatus, { foreignKey: 'orderId' });
OrderStatus.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = OrderStatus;
