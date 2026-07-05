const express = require("express");
const { Op } = require("sequelize");
const { tokenRequired } = require("../middlewares/auth.js");
const { ChatConversation, ChatMessage, Item, User } = require("../models/index.js");

const router = express.Router();

const userSummary = ["id", "name", "email"];
const itemSummary = ["id", "title", "price", "imageUrl", "userId"];

const conversationIncludes = [
  { model: Item, as: "item", attributes: itemSummary },
  { model: User, as: "buyer", attributes: userSummary },
  { model: User, as: "seller", attributes: userSummary },
  {
    model: ChatMessage,
    as: "messages",
    separate: true,
    limit: 1,
    order: [["createdAt", "DESC"]],
    include: [{ model: User, as: "sender", attributes: userSummary }],
  },
];

function isParticipant(conversation, userId) {
  return conversation && (conversation.buyerId === userId || conversation.sellerId === userId);
}

router.get("/", tokenRequired, async (req, res) => {
  try {
    const conversations = await ChatConversation.findAll({
      where: {
        [Op.or]: [{ buyerId: req.user }, { sellerId: req.user }],
      },
      include: conversationIncludes,
      order: [["updatedAt", "DESC"]],
    });

    res.json(conversations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/conversations", tokenRequired, async (req, res) => {
  const itemId = parseInt(req.body.itemId, 10);
  if (Number.isNaN(itemId)) return res.status(400).json({ message: "Invalid item id" });

  try {
    const item = await Item.findByPk(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (!item.userId) return res.status(400).json({ message: "This item does not have a seller yet" });
    if (item.userId === req.user) return res.status(400).json({ message: "You cannot chat with yourself for this item" });

    const [conversation] = await ChatConversation.findOrCreate({
      where: {
        itemId: item.id,
        buyerId: req.user,
        sellerId: item.userId,
      },
      defaults: {
        itemId: item.id,
        buyerId: req.user,
        sellerId: item.userId,
      },
    });

    const fullConversation = await ChatConversation.findByPk(conversation.id, {
      include: conversationIncludes,
    });

    res.status(201).json(fullConversation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/conversations/:id", tokenRequired, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid conversation id" });

  try {
    const conversation = await ChatConversation.findByPk(id, {
      include: conversationIncludes,
    });

    if (!conversation) return res.status(404).json({ message: "Conversation not found" });
    if (!isParticipant(conversation, req.user)) return res.status(403).json({ message: "Forbidden" });

    res.json(conversation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/conversations/:id/messages", tokenRequired, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid conversation id" });

  try {
    const conversation = await ChatConversation.findByPk(id);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });
    if (!isParticipant(conversation, req.user)) return res.status(403).json({ message: "Forbidden" });

    const messages = await ChatMessage.findAll({
      where: { conversationId: id },
      include: [{ model: User, as: "sender", attributes: userSummary }],
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
