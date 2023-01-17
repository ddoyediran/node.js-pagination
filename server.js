const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.MONGODB_URI;
const PORT = process.env.PORT || 6060;

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

app.get("/users", paginate(users), (req, res) => {
  res.json(res.paginatedResult);

  //   const result = {};
  //   const page = parseInt(req.query.page);
  //   const limit = parseInt(req.query.limit);
  //   const startIndex = (page - 1) * limit;
  //   const endIndex = page * limit;
  //   // to create the next page
  //   if (endIndex < users.length) {
  //     result.next = {
  //       page: page + 1,
  //       limit: limit,
  //     };
  //   }
  //   // to create previous page
  //   if (startIndex > 0) {
  //     result.previous = {
  //       page: page - 1,
  //       limit: limit,
  //     };
  //   }
  //   // add results to result
  //   result.results = users.slice(startIndex, endIndex);
  //   res.json(result);
});

// app.get("/posts", paginate(posts), (req, res) => {
//   res.json(res.paginatedResult);
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

/**
 * @input: model
 * @output:
 */

function paginate(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    // to create the next page
    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    // to create previous page
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    // add results to result
    result.results = model.slice(startIndex, endIndex);
    res.paginatedResult = result;
    next();
  };
}
