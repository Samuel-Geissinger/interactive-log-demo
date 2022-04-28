const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "d7195402a8f64376a3281978aefb76b0",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

rollbar.log("Hello world!");

const students = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/api/student", (req, res) => {
  const { name } = req.body;
  name = name.trim();

  students.push(name);
  rollbar.log("Student added successfully", {
    author: "Scott",
    type: "manual entry",
  });
  res.status(200).send(students);
});

const port = process.env.PORT || 5040;
app.use(rollbar.errorHandler());
app.listen(port, () => console.log(`listening on port ${port}`));
