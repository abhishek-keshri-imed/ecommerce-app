const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    // Connects to the URI stored in your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected to shop_central");
  } catch (error) {
    // Log the error and stop the process if the DB fails to connect
    console.error("DB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
