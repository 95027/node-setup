const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (err) => console.log(err));

// (async () => {
//   await client.connect();
// })();

module.exports = client;
