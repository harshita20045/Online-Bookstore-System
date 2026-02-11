import Order from "../models/order.model.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );

    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Orders of a User
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .populate("items.bookId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
