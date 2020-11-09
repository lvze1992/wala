const socket = require("socket.io-client")("http://localhost:3000");
const ws = require("../../ws.js");
const qs = require("qs");
const Util = require("../../utils.js");
const store = {};
socket.on("userQueue", data => {
  const { from, to, forWhat } = data;
  socket.emit("news", { action: `userQueue=>${from}:response` });
  console.log("userQueue_get", data);
  // socket.emit("news", "userQueue_post" + Date.now());
});
function getUserQueue() {
  ws.registerSubscribe([
    {
      path: "/user/queue/info",
      callBack: data => {
        console.log("data", data);
      }
    }
  ]);
}

getUserQueue();
