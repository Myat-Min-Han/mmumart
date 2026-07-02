const express = require("express");
const bcrypt = require("bcrypt");
const { generateToken, tokenRequired } = require("../middlewares/auth.js");
const { User, Cart, CartItem, Item } = require("../models");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashed,
      name,
    });

    res.json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/profile", tokenRequired, async (req, res) => {
  try {
    const user = await User.findByPk(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/history", tokenRequired, async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: { userId: req.user },
      include: [
        {
          model: CartItem,
          include: [Item],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const history = carts.map(cart => ({
      cartId: cart.id,
      createdAt: cart.createdAt,
      items: cart.CartItems.map(ci => ({
        id: ci.Item.id,
        name: ci.Item.name,
        price: ci.Item.price,
        quantity: ci.quantity,
      })),
    }));

    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
