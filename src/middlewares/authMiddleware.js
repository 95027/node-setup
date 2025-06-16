const jwt = require("jsonwebtoken");

const auth = (role = null) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "token not found" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (role && role !== decoded.role) {
        return res.status(403).json({ message: "Forbidden access" });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = auth;
