const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const { register, login,profile,changeRole } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.put("/change-role", authMiddleware, changeRole);


module.exports = router;
