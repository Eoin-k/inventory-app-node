const express = require("express");
const app = express();
const mainRouter = require("./routes/mainRouter");
const port = process.env.port || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", mainRouter);

app.listen(port, () => console.log(`app is running on port ${port}`));
