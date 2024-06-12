import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routes/index.js'; // Ensure correct import
import cors from 'cors';
dotenv.config(); // Initialize dotenv

const app = express();
const port = 3000;

app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Use router middleware
app.use(router);

// Mongoose connect
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  })
  .catch((error) => console.log(error));
