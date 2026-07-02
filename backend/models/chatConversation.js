const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ChatConversation = sequelize.define('ChatConversation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  timestamps: true,
});

module.exports = ChatConversation;
