const express = require("express");
const router = express.Router();
const userService = require("../services/user");

router.route("/register").post(userService.signUp);
router.route("/login").post(userService.login);
router
  .route("/resetPassword")
  .get(userService.requestPasswordReset)
  .post(userService.resetPassword);

module.exports = router;
