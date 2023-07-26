const express = require("express");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routes/user-router");
const app = express();
const PORT = 3002;

const mongoUrl =
  "mongodb+srv://harsh:test1234@cluster0.dyqf09c.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome!", status: "Success", statusCode: 200 });
});

app.use("/api/v1", userRouter);

mongoose.connect(mongoUrl).then(() => {
  console.log("connected to mongo");
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
