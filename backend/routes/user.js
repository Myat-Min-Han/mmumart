const express = require("express");
const bcrypt = require("bcrypt");
const { generateToken, tokenRequired } = require("../middlewares/auth.js");
const { User, History } = require("../models/index.js");

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
    const rows = await History.findAll({
      where: { userId: req.user },
      order: [["createdAt", "DESC"]],
    });

    const history = rows.map(row => ({
      id: row.id,
      item_id: row.itemId,
      cart_id: row.cartId,
      name: row.name,
      description: row.description,
      price: row.price,
      quantity: row.quantity,
      total: row.total,
      status: row.status,
      date: row.createdAt,
    }));

    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
