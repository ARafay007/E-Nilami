const express = require("express");
const cors = require('cors');
const { userRouter } = require("./routes");
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use(cors({origin: '*'}));
app.use(express.static(`${__dirname}/public/images`));
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   message: `Can't find ${req.originalUrl} on the server`
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on the server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports=app;
