const {
  register,
  login,
  getUserByToken,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/me", auth(), getUserByToken);
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/forgot-pass", forgotPassword);
router.post("/reset-pass", resetPassword);

module.exports = router;
