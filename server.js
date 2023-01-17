const express = require("express");
const mongoose = require("mongoose");

const app = express();

const users = [
  { id: 1, name: "user1" },
  { id: 2, name: "user2" },
  { id: 3, name: "user3" },
  { id: 4, name: "user4" },
  { id: 5, name: "user5" },
  { id: 6, name: "user6" },
  { id: 7, name: "user7" },
  { id: 8, name: "user8" },
  { id: 9, name: "user9" },
  { id: 10, name: "user10" },
];

app.get("/", (req, res) => {
  res.json(users);
});

app.listen(6060, () => {
  console.log("App is running on port 6060");
});
