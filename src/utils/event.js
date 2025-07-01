const client = require("./redis");

const publishEvent = async (queueName, event) => {
  await client.lPush(queueName, JSON.stringify(event));
  console.log(`Event Queued ${queueName}`, event);
};

module.exports = publishEvent;
