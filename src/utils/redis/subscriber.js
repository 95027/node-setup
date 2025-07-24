const redisClient = require("./redis");

let subscriber;

async function getSubscriber() {
  if (!subscriber) {
    subscriber = redisClient.duplicate();
    await subscriber.connect();
  }

  return subscriber;
}

module.exports = {
  getSubscriber,
};
