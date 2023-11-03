const bookController = require("../../../controllers/book");

describe("searchBooks Function", () => {
  it("should return matching books", async () => {
    const reqAdd = {
      body: {
        title: "Book 1",
        author: "Author 1",
        publicationDate: "2023-11-03",
      },
    };
    const resAdd = {
      status: jest.fn(() => resAdd),
      json: jest.fn(),
    };

    await bookController.addBook(reqAdd, resAdd);
    // Mock the request object with a query parameter for the searchTerm\
    const searchTerm = "Book 1";

    const req = {
      query: { title: searchTerm },
    };

    const res = {
      json: jest.fn(),
    };

    // Call the searchBooks function with the mocked request and response
    await bookController.searchBooks(req, res);

    // Assert that the response matches the expected result (an array containing one book)
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Book 1",
          author: "Author 1",
        }),
      ])
    );
  });

  it("should return an empty array when no matches are found", async () => {
    const searchTerm = "Nonexistent Book";

    // Mock the request object with a query parameter for the searchTerm
    const req = {
      query: { title: searchTerm },
    };

    const res = {
      json: jest.fn(),
    };

    // Call the searchBooks function with the mocked request and response
    await bookController.searchBooks(req, res);

    // Assert that the response is an empty array, as no matches are found
    expect(res.json).toHaveBeenCalledWith([]);
  });
});
