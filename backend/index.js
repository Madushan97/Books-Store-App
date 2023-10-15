import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose, { get } from 'mongoose';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// middlewear for parsing request body
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type'],
  })
);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to the root');
});

app.use('/books', bookRoute);

mongoose
  .connect(mongoDBURL)
  .then((result) => {
    console.log(`App connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
