const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.js');
const itemRoutes = require('./routes/item.js');

const app = express();
const port = 5002;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
