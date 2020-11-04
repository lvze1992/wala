const io = require("socket.io-client");
const socket = io("http://localhost:3000");
// setInterval(() => {
//   socket.emit("news", 3);
// }, 1000);
socket.on("news", data => {
  console.log(data);
});
