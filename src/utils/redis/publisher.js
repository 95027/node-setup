const redisClient = require("./redis");

async function publishNotification(payload){

    if(!redisClient.isOpen) await redisClient.connect();

    await redisClient.publish("notifications", JSON.stringify(payload));

}

module.exports = {
    publishNotification,
}