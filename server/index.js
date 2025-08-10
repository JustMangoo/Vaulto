// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const CollectionListRoutes = require("./routes/api/CollectionList");
const CollectionItemsRoutes = require("./routes/api/CollectionItems");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/CollectionList", CollectionListRoutes);
app.use("/api/CollectionItems", CollectionItemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
