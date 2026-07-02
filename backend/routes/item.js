const express = require("express");
const { tokenRequired } = require("../middlewares/auth.js");
const { Item } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", tokenRequired, async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const item = await Item.create({ name, price, quantity });
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
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.destroy();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
