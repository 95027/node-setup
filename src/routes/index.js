const router = require("express").Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const advertiserRoutes = require("./advertiserRoutes");
const adRoutes = require("./adRoutes");
const notifyRoutes = require("./notifyRoutes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/advertiser", advertiserRoutes);
router.use("/ad", adRoutes);
router.use("/notify", notifyRoutes);

module.exports = router;
