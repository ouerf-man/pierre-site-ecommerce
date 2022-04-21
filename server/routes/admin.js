const express = require('express');
const router = express.Router();
const adminService = require('../services/admin')

router.route('/login').post(adminService.login)

module.exports = router;