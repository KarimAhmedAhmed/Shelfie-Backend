const Book = require("../models/bookModel");
const Sequelize = require("sequelize");

module.exports = {
  addBook: async (req, res) => {
    const { title, author, publicationDate } = req.body;
    if (!title || !author || !publicationDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const newBook = await Book.create({ title, author, publicationDate });
      res.status(201).json(newBook);
    } catch (err) {
      console.error("Error adding book:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  searchBooks: async (req, res) => {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: "Title parameter is required" });
    }

    try {
      const matchingBooks = await Book.findAll({
        where: {
          title: {
            [Sequelize.Op.iLike]: `%${title}%`,
          },
        },
      });
      res.json(matchingBooks);
    } catch (err) {
      console.error("Error searching books:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
