const bookController = require("../../../controllers/book");
const sequelize = require("../../../dbconfig/database");

beforeAll(async () => {
  // Connect to the test database
  await sequelize.sync({ force: true });
});
describe("addBook Function", () => {
  it("should add a new book", async () => {
    const req = {
      body: {
        title: "Test Book",
        author: "Test Author",
        publicationDate: "2023-10-31",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await bookController.addBook(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Book",
        author: "Test Author",
      })
    );
  });

  it("should handle missing fields", async () => {
    const req = { body: { title: "Test Book" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await bookController.addBook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });
});
