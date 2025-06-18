const userRouter = require("./user_routes");
const chatRouter = require('./chat_routes');
const signedUrlRouter = require('./s3_signed_url_routes');

const route = {
  userRouter,
  chatRouter,
  signedUrlRouter,
};

module.exports = route;
