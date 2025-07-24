const redisClient = require("../utils/redis/redis");

const cache = (keyPrefix, ttl = 60 * 10) => {
  return async (req, res, next) => {
    try {
      const cacheKey = keyPrefix + ":" + req.role;

      const cached = await redisClient.get(cacheKey);

      if (cached) {
        return res.status(200).json({ [keyPrefix]: JSON.parse(cached) });
      }

      req.cacheKey = cacheKey;
      req.ttl = ttl;

      next();
    } catch (error) {
      console.log(`redis cache error: `, error);
      next();
    }
  };
};

module.exports = cache;
