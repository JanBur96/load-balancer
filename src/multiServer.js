const express = require("express");

const app1 = express();
app1.get("/", (req, res) => res.send("Hi from Server 1"));
app1.get("/health", (req, res) => res.send("Server 1 is running"));
app1.listen(3001, () => console.log("Server 1 running on port 3001"));

const app2 = express();
app2.get("/", (req, res) => res.send("Hi from Server 2"));
app2.get("/health", (req, res) => res.send("Server 2 is running"));
app2.listen(3002, () => console.log("Server 2 running on port 3002"));

const app3 = express();
app3.get("/", (req, res) => res.send("Hi from Server 3"));
app3.get("/health", (req, res) => res.send("Server 3 is running"));
app3.listen(3003, () => console.log("Server 3 running on port 3003"));

// const app4 = express();
// app4.get("/", (req, res) => res.send("Hi from Server 4"));
// app4.get("/health", (req, res) => res.send("Server 4 is running"));
// app4.listen(3004, () => console.log("Server 4 running on port 3004"));
