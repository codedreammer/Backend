const http = require("http");
const fs = require("fs");

function logRequest(req) {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Failed to write log");
    }
  });
}


const server = http.createServer((req, res) => {

  logRequest(req); 

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Server Working");
});


server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
