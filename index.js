require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Create express server
const app = express();

// Configure CORS
app.use(cors());

// Database
dbConnection();

// mean_user
// bBFlkHEfkvfpVOXY

// Routes
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
