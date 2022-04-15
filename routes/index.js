const express = require('express');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth/auth.middleware');

const router = express.Router();

// Render Home page
router.get('/', authMiddleware.checkAuth, async (req, res, next) => {
  let user = await User.findById(req.session.userId);
  res.render('index', {
    user: user
  });
});

router.use('/', authRouter);

// Tất cả các route ngoài authRouter đều phải đăng nhập trước khi được truy cập
router.use(authMiddleware.checkAuth); 

router.use('/user', userRouter);

router.use('/test', authMiddleware.checkAuth, (req, res, next) => {
  res.send('test');
});

module.exports = router;
