const { publishNotification } = require("../utils/redis/publisher");

const sendNotification = async (req, res, next) => {
  try {
    const { title } = req.body;

    const payload = {
      title,
      time: new Date().toLocaleTimeString(),
    };

    await publishNotification(payload);

    res.status(200).json({ message: "notification sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendNotification,
};
