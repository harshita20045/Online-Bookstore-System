import Cart from "../models/cart.model.js"

export const addToCart = async (req, res) => {
  try {
    const { userId, book, quantity, unitPrice } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
    
      const itemIndex = cart.items.findIndex(item => item.book.toString() === book);

      if (itemIndex > -1) {
       
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ book, quantity, unitPrice });
      }
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
   
      const newCart = await Cart.create({
        userId,
        items: [{ book, quantity, unitPrice }]
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.book");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
    if (itemIndex === -1) return res.status(404).json({ message: "Book not in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.book.toString() !== bookId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
