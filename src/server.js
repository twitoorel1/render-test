require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");
const initialConnection = require("./database/initialConnection");

// Connect Database
initialConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Home Page Backend");
});

app.use("/", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Working ON => http://localhost:${port}`));
