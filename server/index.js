const mongoose = require("mongoose");
require('dotenv').config();
const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);
const app = require("./app.js");

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected Sucessffully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3005, () => {
  console.log("App is Listening 3005");
});
