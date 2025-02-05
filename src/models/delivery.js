const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Order = require('./Order');

const Delivery = sequelize.define('Delivery', {
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
    deliveryPersonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('Asignado', 'En camino', 'Entregado', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Asignado'
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

User.hasMany(Delivery, { foreignKey: 'deliveryPersonId' });
Delivery.belongsTo(User, { foreignKey: 'deliveryPersonId' });

Order.hasOne(Delivery, { foreignKey: 'orderId' });
Delivery.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Delivery;
