const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/mail");
const { forgotTemp } = require("../helpers/emailTemplates");

const register = async (req, res, next) => {
  try {
    const { email, name, password, phone } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    await User.create({
      name: name,
      email: email,
      phone: phone,
      password: hashedPass,
    });
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({ message: "User Logged In successfully", token });
  } catch (error) {
    next(error);
  }
};

const getUserByToken = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.id);

    if (!user) {
      return res.status(403).json({ message: "Un Authrozied" });
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    await sendEmail(user.email, "Forgot password", forgotTemp(token));
    res.status(200).json({ message: "Forgot mail sent successfully", user });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    await user.update({
      password: hashedPass,
    });

    res.status(200).json({ message: "Password updated successfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUserByToken,
  forgotPassword,
  resetPassword,
};
