import express from "express";
import { tokenRequired } from "../middlewares/auth";
import prisma from "../prisma/client";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

router.post("/", tokenRequired, async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const item = await prisma.item.create({
      data: { name, price, quantity },
    });
    res.json({ message: "Item created", item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});