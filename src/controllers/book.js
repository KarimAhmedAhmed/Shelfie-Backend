const Book = require("../models/bookModel");
const Sequelize = require("sequelize");

module.exports = {
  addBook: async (req, res) => {
    const { title, author, publicationDate } = req.body;
    if (!title || !author || !publicationDate) {
      return res.status(202).json({ error: "All fields are required" });
    }

    try {
      //check if the book is exist by the same author
      const existingbook = await Book.findOne({
        where: {
          title: title,
          author: author,
        },
      });
      if (existingbook) {
        res
          .status(202)
          .json({ error: `${title} is already exist by ${author}` });
      } else {
        const newBook = await Book.create({ title, author, publicationDate });
        res.status(201).json(newBook);
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  searchBooks: async (req, res) => {
    const { title } = req.query;
    if (!title) {
      return res.status(202).json({ error: "Title parameter is required" });
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
