const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = 3000;

const mongoUrl =
  "mongodb+srv://harsh:test1234@cluster0.dyqf09c.mongodb.net/?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.json({ message: "Welcome!", status: "Success", statusCode: 200 });
});

app.post("/api/v1/registerUser", (req, res) => {
  res.json({ message: "user registered", status: "success" });
});
mongoose.connect(mongoUrl).then(() => {
  console.log("connected to mongo");
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
