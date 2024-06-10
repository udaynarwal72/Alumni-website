const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./src/routes'); // Ensure correct import
const { default: connectDB } = require('./src/db');

const app = express();
const port = 3000;

// Cookie parser middleware
app.use("/", router);

// Mongoose connect
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  })
  .catch((error) => console.log(error));

