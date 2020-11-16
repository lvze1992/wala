const socket = require("socket.io-client")("http://localhost:3000");
const ws = require("../../ws.js");
const qs = require("qs");
const Util = require("../../utils.js");
let cacheQueue = [];
let loopTimer = null;
// socket.on("userQueue", data => {
//   const { from, to, forWhat } = data;
//   socket.emit("news", { action: `userQueue=>${from}:response` });
//   console.log("userQueue_get", data);
//   // socket.emit("news", "userQueue_post" + Date.now());
// });
function loopEmitQueue() {
  clearInterval(loopTimer);
  loopTimer = setInterval(() => {
    if (cacheQueue.length) {
      socket.emit("news", {
        action: `userQueue=>userQueueListener:${cacheQueue.length}`,
        queue: cacheQueue
      });
      cacheQueue = [];
    }
  }, 500);
}
function getUserQueue() {
  ws.registerSubscribe([
    {
      path: "/user/queue/info",
      callBack: data => {
        cacheQueue.push(data);
      }
    }
  ]);
}

getUserQueue();
loopEmitQueue();
