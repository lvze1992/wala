const io = require("socket.io-client");
const socket = io("http://localhost:3000");
setInterval(() => {
  socket.emit("news", 2);
}, 1000);
