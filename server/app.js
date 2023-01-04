const express = require("express");
const { userRouter } = require("./routes");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports=app;
