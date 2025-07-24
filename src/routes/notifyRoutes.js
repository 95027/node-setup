const { sendNotification } = require("../controllers/notifyControler");

const router = require("express").Router();


router.post("/", sendNotification);


module.exports = router;