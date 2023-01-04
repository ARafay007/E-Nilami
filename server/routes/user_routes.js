const { getUserData,getUserAds,createUser} = require("../controllers/user_controller");

const express = require("express");

const router = express.Router();

router.get("/userInfo", getUserData);

// router.get("/userInfo", getUser);

router.post("/signUp", createUser);

module.exports = router;