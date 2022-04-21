const express = require('express');
const router = express.Router();
const contactService = require('../services/Contact')

router.route('').post(contactService.addMessage)
    .get(contactService.getAll)

module.exports = router