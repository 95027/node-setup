const { activityLogger } = require("./src/helpers/jobs");
const client = require("./src/utils/redis/redis");

async function listenToQueue(queueName, handler) {
  console.log(`Listening to ${queueName}....`);

  while (true) {
    try {
      const result = await client.brPop(queueName, 0);
      const event = JSON.parse(result.element);
      console.log(`job received ${queueName}....`, event);

      await handler(event);
    } catch (error) {
      console.error(`Error in ${queueName}`, error);
    }
  }
}

listenToQueue("activityEventQueue", activityLogger);
