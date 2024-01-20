const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require("http");

const app = express();
const PORT = 3000;

const servers = [
  {
    host: "localhost",
    port: 3001,
    currentConnections: 22,
  },
  {
    host: "localhost",
    port: 3002,
    currentConnections: 11,
  },
  {
    host: "localhost",
    port: 3003,
    currentConnections: 6,
  },
  {
    host: "localhost",
    port: 3004,
    currentConnections: 9,
  },
];

function getAlgorithm() {
  if (process.argv.slice(2).includes("--round-robin")) {
    return "Round Robin";
  } else if (process.argv.slice(2).includes("--least-connections")) {
    return "Least Connections";
  } else {
    // error
    console.error(
      "Please specify a load balancing algorithm: --round-robin or --least-connections"
    );
    process.exit(1);
  }
}

let currentAlgorithm = getAlgorithm();
let currentServer = 0;

function getNextServer() {
  const server = servers[currentServer];
  currentServer = (currentServer + 1) % servers.length;

  return server;
}

function getLeastBusyServer() {
  let leastBusyServer = servers[0];
  servers.forEach((server) => {
    if (server.currentConnections < leastBusyServer.currentConnections) {
      leastBusyServer = server;
    }
  });

  return leastBusyServer;
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
      servers.splice(servers.indexOf(server), 1);
    });
  });
}

setInterval(checkHealth, 1000);

if (currentAlgorithm === "Round Robin") {
  app.use((req, res, next) => {
    const server = getNextServer();
    const proxy = createProxyMiddleware({
      target: `http://${server.host}:${server.port}`,
      changeOrigin: true,
    });
    return proxy(req, res, next);
  });
} else if (currentAlgorithm === "Least Connections") {
  app.use((req, res, next) => {
    const server = getLeastBusyServer();
    server.currentConnections++;
    const proxy = createProxyMiddleware({
      target: `http://${server.host}:${server.port}`,
      changeOrigin: true,
    });
    return proxy(req, res, () => {
      server.currentConnections--;
      next();
    });
  });
}

app.listen(PORT, () => {
  console.log(
    `Load balancer running on port ${PORT} using ${currentAlgorithm} algorithm.`
  );
});
