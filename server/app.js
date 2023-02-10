const express = require("express");
const cors = require('cors');
const { userRouter } = require("./routes");

const app = express();

app.use(cors({origin: '*'}));

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.all('*', (req, res, next) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on the server`
  });
});

module.exports=app;
