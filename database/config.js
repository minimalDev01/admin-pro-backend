const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB Online");
  } catch (error) {
    throw new Error("Database error on init, see log");
  }
};

module.exports = {
  dbConnection,
};
