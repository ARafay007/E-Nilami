const { getUserData } = require("../controllers/user_controller");

const express = require("express");

const router = express.Router();

router.get("/userInfo", getUserData);

module.exports = router;