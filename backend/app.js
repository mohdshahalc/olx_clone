const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// CORS FIX
app.use(cors({
  origin: [
    "http://localhost:5173",   // Vite local frontend
    "http://localhost:3000",   // React dev server (optional)
    "https://olx-clone-ochre.vercel.app" // your deployed frontend
  ]
}));


app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("OLX API Running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;