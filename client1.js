const socket = require("socket.io-client")("http://localhost:3000");
setInterval(() => {
  socket.emit("news", { action: "client1=>client2:getData" });
}, 1000);
socket.on("client1", data => {
  console.log("client1_get", data);
  // socket.emit("news", "client1_post" + Date.now());
});
