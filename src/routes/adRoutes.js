const {
  getAllAds,
  registerAd,
  getAdById,
  destroyAd,
} = require("../controllers/adController");
const auth = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", auth("admin"), getAllAds);
router.post("/", auth("admin"), registerAd);
router.get("/:id", auth(), getAdById);
router.delete("/:id", auth("admin"), destroyAd);

module.exports = router;
