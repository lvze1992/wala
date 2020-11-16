//起服务
// var exec = require("child_process").exec;
// exec("node server.js", function(error, stdout, stderr) {
//   console.log(1);
// });
// exec("node client/data/orderBook.js", function(error, stdout, stderr) {
//   console.log(2);
// });
// exec("node client/user/userQueue.js", function(error, stdout, stderr) {
//   console.log(3);
// });

//获取实时数据
const socket = require("socket.io-client")("http://localhost:3000", {
  forceNode: false
});
socket.on("userQueueListener", data => {
  console.log("userQueueListener", data.queue.length);
});
socket.on(`orderBookListener`, data => {
  console.log(`orderBookListener`, data.result.symbol, data.result.timestamp);
});
function getCurMarket() {
  socket.emit("news", {
    action: `orderBookListener=>orderBook:getOrderBook(83)`
  });
  // const orderBook = await
}
setInterval(() => {
  getCurMarket();
}, 5000);
