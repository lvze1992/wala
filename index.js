const { socket } = require("./client.js");
const { client0 } = require("./client0.js");
const { client1 } = require("./client1.js");

client0(socket);
client1(socket);
