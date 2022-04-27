const express = require('express');
const router = express.Router();
const adminService = require('../services/admin')

router.route('/login').post(adminService.login)
router
  .route("/resetPassword")
  .get(adminService.requestPasswordReset)
  .post(adminService.resetPassword);

module.exports = router;