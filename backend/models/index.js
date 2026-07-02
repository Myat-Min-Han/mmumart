const User = require('./user');
const Cart = require('./cart');
const CartItem = require('./cartItem');
const Item = require('./item');
const History = require('./history');
const ChatConversation = require('./chatConversation');
const ChatMessage = require('./chatMessage');

// one-to-one
User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// one-to-many
Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// one-to-many
Item.hasMany(CartItem, { foreignKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Item, { foreignKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(Item, { foreignKey: 'userId', as: 'items', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Item.belongsTo(User, { foreignKey: 'userId', as: 'seller', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

User.hasMany(History, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
History.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(ChatConversation, { foreignKey: 'buyerId', as: 'buyerChats', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ChatConversation.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(ChatConversation, { foreignKey: 'sellerId', as: 'sellerChats', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ChatConversation.belongsTo(User, { foreignKey: 'sellerId', as: 'seller', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Item.hasMany(ChatConversation, { foreignKey: 'itemId', as: 'chatConversations', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ChatConversation.belongsTo(Item, { foreignKey: 'itemId', as: 'item', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

ChatConversation.hasMany(ChatMessage, { foreignKey: 'conversationId', as: 'messages', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ChatMessage.belongsTo(ChatConversation, { foreignKey: 'conversationId', as: 'conversation', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

User.hasMany(ChatMessage, { foreignKey: 'senderId', as: 'sentMessages', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ChatMessage.belongsTo(User, { foreignKey: 'senderId', as: 'sender', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = { User, Cart, CartItem, Item, History, ChatConversation, ChatMessage };
