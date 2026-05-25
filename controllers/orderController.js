const { Order, OrderItem, CartItem, Product, sequelize } = require('../models');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;

    // Get cart items
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [Product],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total amount
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.Product.price * item.quantity;
    });

    // Create order
    const order = await Order.create({ userId, totalAmount }, { transaction: t });

    // Create order items
    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.Product.price,
      }, { transaction: t });

      // Update product stock (optional but recommended)
      const product = item.Product;
      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    // Clear cart
    await CartItem.destroy({ where: { userId }, transaction: t });

    await t.commit();
    res.status(201).json(order);
  } catch (err) {
    if (t) await t.rollback();
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: OrderItem,
        include: [Product]
      }],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
