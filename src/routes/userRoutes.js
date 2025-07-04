const { getAllUsers, getUserById } = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const cache = require("../middlewares/cache");

const router = require("express").Router();

router.get("/", auth("admin"), getAllUsers);
router.get("/:id", auth(), getUserById);

module.exports = router;
