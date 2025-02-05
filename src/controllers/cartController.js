const { Cart, Product } = require('../models');

exports.addToCart = async (req, res) => {
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

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findAll({ where: { userId }, include: Product });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener carrito', error });
    }
};

exports.updateCart = async (req, res) => {
    try {


    } catch (error) {
        res.status(500).json({ message: 'error al editar producto: ', error });

    }

}
