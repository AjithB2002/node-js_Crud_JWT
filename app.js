const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

app.use(express.json());
require('dotenv').config();
mongoose.connect("mongodb://127.0.0.1:27017/nodejscrud", {
  retryWrites: true,
  w: "majority"
})
.then(() => {
  console.log("Connected to Database");
  console.log(`Connected to MongoDB on ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
})
.catch((err) => {
  console.error("Error connecting to database:", err);
  console.error("Error details:", err.reason);
});


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 10,
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res, next) => {
      res.status(429).send({ message: "Rate limited" });
    }
  });



  try {
    const crudRouter = require('./crud');
    app.use('/api', limiter, crudRouter); 
  } catch (err) {
    console.error("Error loading crudRouter:", err);
  }

app.listen(3000, () => {
  console.log("Server listening on port 3000");
  console.log(`Server listening on http://localhost:3000`);
}).on('error', (err) => {
  console.log("Error starting express app:", err);
});