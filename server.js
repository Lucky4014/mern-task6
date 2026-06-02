const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");

// Load env variables
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route - User create karo
app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Test Route - Product create karo
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
});

// Get all products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json({ success: true, data: products });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});