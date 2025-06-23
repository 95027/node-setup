const redisClient = require("../utils/redis");
const { User } = require("../models");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ where: { role: req.role } });

    if (req.cacheKey && req.ttl) {
      await redisClient.setEx(req.cacheKey, req.ttl, JSON.stringify(users));
    }
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.role !== "admin" && req.id != id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
