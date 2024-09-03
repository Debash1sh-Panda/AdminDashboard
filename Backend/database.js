const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection = async () => {
  try {
    await mongoose
      .connect(process.env.CLOUD_DATA_BASE_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then(() => console.log("Database conntected :)"))
      .catch((error) => console.log("Database is not Connected", error));
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { databaseConnection };