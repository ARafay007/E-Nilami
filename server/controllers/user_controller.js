const user = require("../models/user_model");

exports.getUserData = (req, res) => {
  try {
    res.status(200).json({ data: "Request Recieved" });
  } catch (e) {}
};
