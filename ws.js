const { Stomp } = require("@stomp/stompjs");
const _config = require("./config.js");
Object.assign(global, { WebSocket: require("ws") });
if (typeof TextEncoder !== "function") {
  const TextEncodingPolyfill = require("text-encoding");
  TextEncoder = TextEncodingPolyfill.TextEncoder;
  TextDecoder = TextEncodingPolyfill.TextDecoder;
}
let SubscribeList = [];
const client = Stomp.client(`${_config.ws_api}/ws/websocket`);
client.heartbeat.outgoing = 1000;
client.heartbeat.incoming = 1000;
client.reconnect_delay = 3000;
client.debug = function(message) {
  if (message === "<<< PONG") {
    console.log("<<< PONG");
  }
};
client.connect(
  {
    Authorization: `bearer ${_config.access_token}`
  },
  () => {
    global.SubscribeList.map(ws => {
      const { path, callBack } = ws;
      console.log("path", path);
      client.subscribe(path, data => {
        //TODO 这个ask做什么用？？
        data.ack();
        try {
          callBack(JSON.parse(data.body));
        } catch (e) {}
      });
    });
  },
  e => {
    console.log("ws error:" + e);
  }
);

function registerSubscribe(ws) {
  //TODO map集合或其他去重
  global.SubscribeList = [].concat(global.SubscribeList || [], ws);
}
module.exports = { registerSubscribe };
