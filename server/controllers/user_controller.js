const user = require("../models/user_model");

exports.getUserData = (req, res) => {
  try {
    res.status(200).json({ data: "Request Recieved" });
  } catch (e) {}
};

exports.getUserAds = (req, res) => {
  try {
    res.status(200).json({ data: "Request Recieved" });
  } catch (e) {}
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const data = await user.create(req.body);
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ e });
  }
};
