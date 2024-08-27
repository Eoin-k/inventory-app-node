const express = require("express");
const path = require("node:path");
const app = express();
const mainRouter = require("./routes/mainRouter");
const port = process.env.port || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use("/", mainRouter);

app.listen(port, () => console.log(`app is running on port ${port}`));
