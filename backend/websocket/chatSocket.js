const WebSocket = require("ws");
const { verifyToken } = require("../middlewares/auth.js");
const { ChatConversation, ChatMessage, User } = require("../models");

const clientsByUser = new Map();

function sendJson(socket, payload) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  }
}

function addClient(userId, socket) {
  if (!clientsByUser.has(userId)) clientsByUser.set(userId, new Set());
  clientsByUser.get(userId).add(socket);
}

function removeClient(userId, socket) {
  const clients = clientsByUser.get(userId);
  if (!clients) return;

  clients.delete(socket);
  if (clients.size === 0) clientsByUser.delete(userId);
}

function broadcastToUser(userId, payload) {
  const clients = clientsByUser.get(userId);
  if (!clients) return;

  for (const client of clients) {
    sendJson(client, payload);
  }
}

async function handleMessage(socket, rawMessage) {
  let payload;
  try {
    payload = JSON.parse(rawMessage.toString());
  } catch {
    sendJson(socket, { type: "error", message: "Invalid message format" });
    return;
  }

  if (payload.type !== "send_message") {
    sendJson(socket, { type: "error", message: "Unsupported event type" });
    return;
  }

  const conversationId = parseInt(payload.conversationId, 10);
  const messageText = String(payload.message || "").trim();

  if (Number.isNaN(conversationId) || !messageText) {
    sendJson(socket, { type: "error", message: "Conversation and message are required" });
    return;
  }

  try {
    const conversation = await ChatConversation.findByPk(conversationId);
    if (!conversation) {
      sendJson(socket, { type: "error", message: "Conversation not found" });
      return;
    }

    const isParticipant = conversation.buyerId === socket.userId || conversation.sellerId === socket.userId;
    if (!isParticipant) {
      sendJson(socket, { type: "error", message: "Forbidden" });
      return;
    }

    const message = await ChatMessage.create({
      conversationId,
      senderId: socket.userId,
      message: messageText,
    });

    await conversation.update({ updatedAt: new Date() });

    const fullMessage = await ChatMessage.findByPk(message.id, {
      include: [{ model: User, as: "sender", attributes: ["id", "name", "email"] }],
    });

    const event = {
      type: "new_message",
      conversationId,
      message: fullMessage,
    };

    broadcastToUser(conversation.buyerId, event);
    broadcastToUser(conversation.sellerId, event);
  } catch (err) {
    sendJson(socket, { type: "error", message: err.message });
  }
}

function initChatSocket(server) {
  const wss = new WebSocket.WebSocketServer({ server, path: "/ws/chat" });

  wss.on("connection", (socket, request) => {
    const url = new URL(request.url, "http://localhost");
    const token = url.searchParams.get("token");

    try {
      const decoded = verifyToken(token);
      socket.userId = decoded.userId;
    } catch {
      socket.close(1008, "Invalid token");
      return;
    }

    addClient(socket.userId, socket);
    sendJson(socket, { type: "connected", userId: socket.userId });

    socket.on("message", (rawMessage) => {
      handleMessage(socket, rawMessage);
    });

    socket.on("close", () => {
      removeClient(socket.userId, socket);
    });
  });

  return wss;
}

module.exports = { initChatSocket };
