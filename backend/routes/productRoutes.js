const router = require("express").Router();

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getMyProducts } = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/my-products", authMiddleware, getMyProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, roleMiddleware("seller"), upload.single("image"), createProduct);

// SELLER ONLY - Update Own Product
router.put("/:id", authMiddleware, roleMiddleware("seller"), updateProduct);

// SELLER OR ADMIN - Delete Product
router.delete("/:id", authMiddleware, roleMiddleware("seller", "admin"), deleteProduct);

module.exports = router;