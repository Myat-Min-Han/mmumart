const User = require('./user');
const Cart = require('./cart');
const CartItem = require('./cartItem');
const Item = require('./item');

User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Item.hasMany(CartItem, { foreignKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
CartItem.belongsTo(Item, { foreignKey: 'itemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


module.exports = { User, Cart, CartItem, Item };
