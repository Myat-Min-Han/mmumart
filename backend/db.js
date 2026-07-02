require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});


(async () => {
  try {
    await sequelize.authenticate();
    require('./models');
    await sequelize.sync({ alter: true });
    console.log('Connected to Neon Postgres via Sequelize');
    console.log('Sequelize tables synced successfully');
  } catch (error) {
    console.error('Connection failed:', error);
  }
})();

module.exports = sequelize;
