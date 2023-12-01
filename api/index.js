const express = require("express")
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')

const app = express();

app.use(express.json());
app.use(
  cors({ credentials: true, origin: "http://localhost:3000" })
);
// app.use(cookieParser());

const mongoUrl = process.env.MONGO;
if (!mongoUrl) {
  console.error("wrong mongo url");
  process.exit(1);
}
mongoose.connect(mongoUrl);

app.use("/user", userRouter);
app.use("/post", postRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "test test 1" });
});


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});