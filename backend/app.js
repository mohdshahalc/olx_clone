const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// CORS FIX
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://olx-clone-ochre.vercel.app"
  ]
}));


app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;