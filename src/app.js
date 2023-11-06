"use strict";
// app.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const sequelize = require("./dbconfig/database");
const cors = require("cors");
const bookController = require("./controllers/book");

app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
    optionsSuccessStatus: 201,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database and tables synced.");
  })
  .catch((err) => {
    console.error("Error syncing the database:", err);
  });
// Routes
app.post("/api/addBook", bookController.addBook);
app.get("/api/books/search", bookController.searchBooks);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
