const jwt = require("jsonwebtoken");

const auth = (role = null) => {
  return (req, res, next) => {
    try {
      // const token = req.headers.authorization?.split(" ")[1];
      const token = req.cookies?.token;

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
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({
          message: "Invalid or expired token",
        });
      }
      next(error);
    }
  };
};

module.exports = auth;
