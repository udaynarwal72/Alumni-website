const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const { default: router } = require('./src/routes');
require('dotenv').config();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie parser middleware
app.use(cookieParser());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(router)

//mongoose connect 
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Start the server and run the main function
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
