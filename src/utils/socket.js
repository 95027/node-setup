const { Server } = require("socket.io");
const { getSubscriber } = require("./redis/subscriber");

const clients = new Map();

async function setSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected: ", socket);
    clients.set(socket.id, socket);

    socket.on("disconnect", () => {
      clients.delete(socket.id);
      console.log("client disconnected: ", socket);
    });
  });

  const subscriber = await getSubscriber();
  await subscriber.subscribe("notifications", (msg) => {
    const data = JSON.parse(msg);
    io.emit("notification", data);
  });
}

module.exports = setSocket;
