import express from 'express';
import userRoutes from './routes/user.js';
import itemRoutes from './routes/item.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const port = 5000;

app.use('/users', userRoutes);
app.use('/items', itemRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})