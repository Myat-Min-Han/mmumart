const express = require("express");
const { tokenRequired } = require("../middlewares/auth.js");
const { Item, Cart, CartItem, History, User } = require("../models/index.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
});

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [{ model: User, as: "seller", attributes: ["id", "name", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/cart", tokenRequired, async (req, res) => {
  const userId = req.user;
  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem, include: [Item] }],
    });

    if (!cart) return res.json([]);

    const items = cart.CartItems.map(ci => ({
      id: ci.id,
      itemId: ci.Item.id,
      name: ci.Item.name || ci.Item.title || "Item",
      price: ci.Item.price,
      quantity: ci.quantity,
      image: ci.Item.imageUrl || ci.Item.image || null,
      variant: ci.Item.condition || null,
    }));

    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/cart", tokenRequired, async (req, res) => {
  const { itemId, quantity } = req.body;
  const userId = req.user;
  const parsedItemId = parseInt(itemId, 10);

  if (Number.isNaN(parsedItemId)) {
    return res.status(400).json({ message: "Invalid item id" });
  }

  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, itemId: parsedItemId },
    });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity, 10) || 1;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        itemId: parsedItemId,
        quantity: parseInt(quantity, 10) || 1,
      });
    }

    res.json({ message: "Item added to cart", cartItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/history", tokenRequired, async (req, res) => {
  const { cartItemIds } = req.body;
  const userId = req.user;

  if (!Array.isArray(cartItemIds) || cartItemIds.length === 0) {
    return res.status(400).json({ message: "No cart items selected" });
  }

  const parsedIds = cartItemIds.map(id => parseInt(id, 10));
  if (parsedIds.some(Number.isNaN)) {
    return res.status(400).json({ message: "Invalid cart item id" });
  }

  try {
    const cartItems = await CartItem.findAll({
      where: { id: parsedIds },
      include: [Item, Cart],
    });

    if (cartItems.length !== parsedIds.length) {
      return res.status(404).json({ message: "One or more cart items were not found" });
    }

    const forbidden = cartItems.some(ci => ci.Cart.userId !== userId);
    if (forbidden) return res.status(403).json({ message: "Forbidden" });

    const historyRows = await History.bulkCreate(cartItems.map(ci => {
      const price = Number(ci.Item.price) || 0;
      const quantity = Number(ci.quantity) || 1;

      return {
        userId,
        cartId: ci.cartId,
        itemId: ci.itemId,
        name: ci.Item.name || ci.Item.title || "Item",
        description: ci.Item.description || null,
        price,
        quantity,
        total: price * quantity,
        status: "Purchased",
      };
    }));

    await CartItem.destroy({ where: { id: parsedIds } });

    res.status(201).json({
      message: "Checkout completed",
      history: historyRows,
    });
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
    const item = await Item.findByPk(id, {
      include: [{ model: User, as: "seller", attributes: ["id", "name", "email"] }],
    });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", tokenRequired, async (req, res) => {
  const {
    title,
    price,
    quantity,
    category,
    custom_category,
    condition,
    pickupLocation,
    description,
    image,
  } = req.body;

  try {
    let imageUrl = null;
    let imagePublicId = null;

    try {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "mmumart_items",
      });
      imageUrl = uploadResponse.secure_url;
      imagePublicId = uploadResponse.public_id;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image");
    }

    const finalCategory = category === "Other" && custom_category ? custom_category : category;

    const itemName = title || "Untitled item";

    const item = await Item.create({
      title: itemName,
      price: parseFloat(price),
      description,
      quantity: parseInt(quantity, 10) || 1,
      category: finalCategory,
      condition,
      pickupLocation,
      imageUrl,
      imagePublicId,
      userId: req.user,
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
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.destroy();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.patch("/cart/:cartItemId", tokenRequired, async (req, res) => {
  const cartItemId = parseInt(req.params.cartItemId, 10);
  const { quantity } = req.body;
  if (Number.isNaN(cartItemId)) return res.status(400).json({ message: "Invalid cart item id" });

  try {
    const cartItem = await CartItem.findByPk(cartItemId, { include: [Item, Cart] });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    // ensure ownership
    if (cartItem.Cart.userId !== req.user) return res.status(403).json({ message: "Forbidden" });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Quantity updated", cartItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/cart/:cartItemId", tokenRequired, async (req, res) => {
  const cartItemId = parseInt(req.params.cartItemId, 10);
  if (Number.isNaN(cartItemId)) return res.status(400).json({ message: "Invalid cart item id" });

  try {
    const cartItem = await CartItem.findByPk(cartItemId, { include: [Cart] });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    if (cartItem.Cart.userId !== req.user) return res.status(403).json({ message: "Forbidden" });

    await cartItem.destroy();
    res.json({ message: "Cart item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
