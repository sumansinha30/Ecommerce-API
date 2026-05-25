const { CartItem, Product } = require('../models');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if item already in cart
    let cartItem = await CartItem.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += (quantity || 1);
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ userId, productId, quantity: quantity || 1 });
    }

    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [Product],
    });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const cartItem = await CartItem.findOne({ where: { id, userId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
