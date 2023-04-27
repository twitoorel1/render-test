require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index");
const initialConnection = require("./database/initialConnection");

// Connect Database
initialConnection();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(cors({
  credentials: true,
  origin: "https://orel-deploy.onrender.com/",
}))


app.get("/", (req, res) => {
  res.send("Home Page Backend");
});

app.use("/", routes);

app.use("/", express.static(path.resolve(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Working ON => http://localhost:${port}`));
