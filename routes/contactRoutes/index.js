const express = require('express');
const contactController = require('../../controllers/contactController');

const router = express.Router();

router.get('/', contactController.showContacts);

router.get('/create', contactController.createContact);

module.exports = router;