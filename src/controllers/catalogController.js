const { Product } = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};
const postProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = await Product.create({ name, description, price });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error });
    }
};
const putProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await product.update({ name, description, price });
        res.json(product);

    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
};

module.exports = {
    getProducts,
    postProduct,
    putProduct
}