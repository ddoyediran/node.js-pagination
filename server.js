const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./model/userModel");

const mongo_url = process.env.MONGODB_URI;
const PORT = process.env.PORT || 6060;

const app = express();

// connecting to the database
mongoose
  .connect(mongo_url)
  .then((results) => {
    console.log("Connected to MongoDB database");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// initializing db to mongoose connection method
const db = mongoose.connection;

// inserting data to the user collection database
db.once("open", async () => {
  if ((await User.countDocuments().exec()) > 0) {
    return console.log("user already inserted to database");
  }

  Promise.all([
    User.create({ name: "user1" }),
    User.create({ name: "user2" }),
    User.create({ name: "user3" }),
    User.create({ name: "user4" }),
    User.create({ name: "user5" }),
    User.create({ name: "user6" }),
    User.create({ name: "user7" }),
    User.create({ name: "user8" }),
    User.create({ name: "user9" }),
    User.create({ name: "user10" }),
  ])
    .then(() => console.log("Added users to database"))
    .catch(() =>
      console.log("error occurred while inserting data to database")
    );
});

app.get("/users", paginate(User), (req, res) => {
  res.json(res.paginatedResult);
});

// app.get("/posts", paginate(posts), (req, res) => {
//   res.json(res.paginatedResult);
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Helper function perform pagination
// INPUT: model
// OUTPUT: returns result of pagination
function paginate(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    // to create the next page
    if (endIndex < (await model.countDocuments().exec())) {
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
    try {
      result.results = await model.find().limit(limit).skip(startIndex);
      res.paginatedResult = result;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
