const io = require("socket.io")(3000);
let arr = [];
io.on("connection", socket => {
  console.log("socket", socket);
  socket.on("news", data => {
    arr.forEach(item => {
      item.emit("news", data);
    });
  });
  arr.push(socket);
});
