import express from "express";
import { tokenRequired } from "../middlewares/auth";
import prisma from "../prisma/client";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  try {
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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

router.delete("/:id", tokenRequired, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  try {
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ message: "Item not found" });

    await prisma.item.delete({ where: { id } });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});