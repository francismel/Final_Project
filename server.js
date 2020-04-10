const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(logger("dev"));
app.use(express.json());
require("dotenv").config();

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const usersRouter = require("./routes/api/users");
const analysisRequestRouter = require("./routes/api/analysisRequest");

app.use("/api/users", require("./routes/api/users"));
// app.use("/analysisRequest", analysisRequestRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
