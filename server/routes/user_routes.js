const { getUsersData, createUser, getOneUserData, loginUser, getUsersAds, addUserActivity } = require("../controllers/user_controller");
const {protect} = require('../controllers/auth_controller');
const express = require("express");
const multer = require('multer');

const upload = multer({dest: 'public/images/'});

const router = express.Router();

router.get("/userInfo", protect, getUsersData);
router.get("/userInfo/:Id", getOneUserData);

router.route("/userActivity")
      .get(getUsersAds)
      .post(upload.single('images'), addUserActivity);
// router.get("/userInfo", getUser);

router.post("/signUp", createUser);
router.post("/login", loginUser);

module.exports = router;