const router = require("express").Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const advertiserRoutes = require("./advertiserRoutes");
const adRoutes = require("./adRoutes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/advertiser", advertiserRoutes);
router.use("/ad", adRoutes);

module.exports = router;
