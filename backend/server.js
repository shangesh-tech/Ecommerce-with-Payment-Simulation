const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const paymentRoutes = require("./routes/paymentRoute");



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the "backend/showcase/mobile" directory
app.use('/images', express.static(path.join(__dirname, '/showcase')));

// Log responses
app.use((req, res, next) => {
  console.log(`Path: ${req.path} | Method: ${req.method}`);
  next();
});

// Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1",userRoutes)
app.use("/api/v1",paymentRoutes)

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });
