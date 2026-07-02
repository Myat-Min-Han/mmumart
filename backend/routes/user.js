import express from "express";
import bcrypt from "bcryptjs";
import { generateToken, tokenRequired } from "../middlewares/auth";
import prisma from "../prisma/client";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    res.json({ message: "User registered" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
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
    const user = await prisma.user.findUnique({ where: { id: req.user } });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/history", tokenRequired, async (req, res) => {
  try {
    const carts = await prisma.cart.findMany({
      where: { userId: req.user },
      include: {
        items: {
          include: {
            item: true, 
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const history = carts.map(cart => ({
      cartId: cart.id,
      createdAt: cart.createdAt,
      items: cart.items.map(ci => ({
        id: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
      })),
    }));

    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;