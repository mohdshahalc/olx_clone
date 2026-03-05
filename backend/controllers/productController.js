const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image: req.file ? req.file.filename : null,
      seller: req.user.id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS (with search, filter, sort)
exports.getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = {};

    if (search) {
      
      const searchRule = { $regex: search, $options: "i" };

      query.$or = [
        { title: searchRule },
        { category: searchRule },
        { description: searchRule }
      ];
    }

    if (category) {
      query.category = category;
    }

    let products = Product.find(query).populate("seller", "name email phone");

    if (sort === "low") {
      products = products.sort({ price: 1 });
    }

    if (sort === "high") {
      products = products.sort({ price: -1 });
    }

    const result = await products;
    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("seller", "name email phone createdAt");

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT (Seller only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.seller.toString() !== req.user.id)
      return res.status(403).json({ message: "Not your product" });

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Seller can delete own product
    if (
      req.user.role === "seller" &&
      product.seller.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not your product" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};