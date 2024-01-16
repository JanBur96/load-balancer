const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require("http");

const app = express();
const PORT = 3000;

const servers = [
  {
    host: "localhost",
    port: 3001,
  },
  {
    host: "localhost",
    port: 3002,
  },
  {
    host: "localhost",
    port: 3003,
  },
  {
    host: "localhost",
    port: 3004,
  },
];

let currentServer = 0;

function getNextServer() {
  const server = servers[currentServer];
  currentServer = (currentServer + 1) % servers.length;
  return server;
}

function checkHealth() {
  console.log("Checking health of servers...");

  servers.forEach((server) => {
    const req = http.get(
      `http://${server.host}:${server.port}/health`,
      (res) => {
        if (res.statusCode !== 200) {
          console.log(
            `Server ${server.host}:${server.port} is down or has problems.`
          );
        } else {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => console.log(data));
        }
      }
    );
    req.on("error", (e) => {
      console.error(
        `Problem with request to ${server.host}:${server.port}: ${e.message}`
      );
    });
  });
}

setInterval(checkHealth, 10000);

app.use((req, res, next) => {
  const server = getNextServer();
  const proxy = createProxyMiddleware({
    target: `http://${server.host}:${server.port}`,
    changeOrigin: true,
  });
  return proxy(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Load balancer running on port ${PORT}`);
});
