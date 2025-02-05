const Cart = require('../models/Cart'), Product = require('../models/Product');

const addToCart = async (req, res, next) => {
    try {
        const { userId, productId, quantity } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const cartItem = await Cart.create({ userId, productId, quantity });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar al carrito', error });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findAll({ where: { userId }, include: Product });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        const cartItem = await Cart.findOne({ where: { userId, productId } });
        if (!cartItem) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        await cartItem.update({ quantity });
        res.json(cartItem);

    } catch (error) {
        res.status(500).json({ message: 'error al editar producto: ', error });

    }

}

module.exports = { addToCart, getCart, updateCart };