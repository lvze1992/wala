const socket = require("socket.io-client")("http://localhost:3000");
const ws = require("../../ws.js");
const qs = require("qs");
const Util = require("../../utils.js");
const store = {};
// {
//   type: "B",
//   timestamp: "1604894227589",
//   symbol: "BTCUSDT",
//   firstUpdateId: "861202987141611521",
//   lastUpdateId: "861203006468964353",
//   bids: [["15446.25", "0.1663"]],
//   asks: [["15446.25", "0.1663"]]
// };
socket.on("orderBook", data => {
  const { from, to, forWhat } = data;
  socket.emit("news", { action: `orderBook=>${from}:response` });
  console.log("orderBook_get", data);
  // socket.emit("news", "orderBook_post" + Date.now());
});
function getOrderBook({ symbolId }) {
  const query = { symbolId: symbolId, scale: 0, level: 150 };
  const path = qs.stringify(query);
  ws.registerSubscribe([
    {
      path: `/orderBook?${path}`,
      callBack: data => {
        data.originType = "ws";
        store[path] = data;
        consoleOrderBook();
      }
    }
  ]);
}
function consoleOrderBook() {
  console.clear();
  Object.keys(store).map(i => {
    const data = store[i];
    const { bids, asks, symbol, timestamp } = data;
    const asks5 = asks.slice(0, 5).reverse();
    const bids5 = bids.slice(0, 5);
    const orderBook = asks5
      .concat([[symbol, Util.formatTime(+timestamp)]])
      .concat(bids5);
    console.table(orderBook);
  });
}

getOrderBook({ symbolId: 83 }); //BTCUSDT
getOrderBook({ symbolId: 84 }); //EOSUSDT
