const Sequelize = require("sequelize");
require("dotenv").config();

var sequelize;
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize(
    process.env.DB_Name_test,
    process.env.DB_Username_test,
    process.env.DB_Password_test,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_Name,
    process.env.DB_Username,
    process.env.DB_Password,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
}

module.exports = sequelize;
