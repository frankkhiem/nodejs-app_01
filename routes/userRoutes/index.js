const express = require('express');
const authMiddleware = require('../../middlewares/auth/auth.middleware');
const userController = require('../../controllers/userController');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Day la Trang user');
});

module.exports = router;
