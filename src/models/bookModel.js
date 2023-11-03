const Sequelize = require("sequelize");
const sequelize = require("../dbconfig/database");

const Book = sequelize.define("Book", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  publicationDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Book;
