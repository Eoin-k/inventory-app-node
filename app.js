const express = require("express");
const path = require("node:path");
require("dotenv").config();
const app = express();
const mainRouter = require("./routes/mainRouter");
const port = process.env.port || 5432;
console.log(port);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use("/", mainRouter);

app.listen(port, () => console.log(`app is running on port ${port}`));
