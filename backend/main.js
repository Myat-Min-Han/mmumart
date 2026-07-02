const express = require('express');
const cors = require('cors');
const http = require('http');
const userRoutes = require('./routes/user.js');
const itemRoutes = require('./routes/item.js');
const chatRoutes = require('./routes/chat.js');
const { initChatSocket } = require('./websocket/chatSocket.js');

const app = express();
const port = 5002;
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/chats', chatRoutes);

initChatSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
