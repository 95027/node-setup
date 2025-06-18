const {
  registerAdvertiser,
  getAllAdvertisers,
  getAdvertiserById,
  destroyAdvertiser,
} = require("../controllers/advertiserController");
const auth = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", auth("admin"), getAllAdvertisers);
router.post("/", auth("admin"), registerAdvertiser);
router.get("/:id", auth("admin"), getAdvertiserById);
router.delete("/:id", auth("admin"), destroyAdvertiser);

module.exports = router;
