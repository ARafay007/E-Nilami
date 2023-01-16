const { getUsersData, createUser, getOneUserData, loginUser, getUsersAds, addUserActivity } = require("../controllers/user_controller");
const {protect} = require('../controllers/auth_controller');

const express = require("express");

const router = express.Router();

router.get("/userInfo", protect, getUsersData);
router.get("/userInfo/:Id", getOneUserData);

router.route("/userActivity")
      .get(getUsersAds)
      .post(addUserActivity);
// router.get("/userInfo", getUser);

router.post("/signUp", createUser);
router.post("/login", loginUser);

module.exports = router;