const errorHandler = (err, req, res, next) => {
  const message = err?.message || "Internal Server Error";
  const status = err?.status || 500;
  console.log(message);
  res.status(status).json({ message });
};

module.exports = errorHandler;
