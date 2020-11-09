const io = require("socket.io")(3000);
let arr = [];
io.on("connection", socket => {
  arr.push(socket);
  socket.on("news", data => {
    if (typeof data === "object") {
      const { action } = data;
      const reg = /^(.*?)=>(.*?):(.*?)$/i;
      const [, from, to, forWhat] = reg.exec(action);
      console.log("action", action);
      // console.log("server_get", { from, to, forWhat });
      arr.forEach(item => {
        item.emit(to, { ...data, from, to, forWhat });
      });
    }
  });
});
// 起一个子
// var exec = require("child_process").exec;
// exec("node client1.js", function(error, stdout, stderr) {
//   console.log(stdout);
// });
// var exec = require("child_process").exec;
// exec("ttab " + __dirname + "/client1.js"); //process.cwd()
