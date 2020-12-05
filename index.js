require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Create express server
const app = express();

// Configure CORS
app.use(cors());

// Body parse and body read
app.use(express.json());

// Database
dbConnection();

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/medics", require("./routes/medics"));
app.use("/api/all", require("./routes/search"));
app.use("/api/upload", require("./routes/uploads"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
