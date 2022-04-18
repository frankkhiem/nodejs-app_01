const express = require('express');
const csurf = require('csurf');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const contactRouter = require('./contactRoutes');
const authMiddleware = require('../middlewares/auth/auth.middleware');
const User = require('../models/User');

const router = express.Router();

// Render Home page
router.get('/', authMiddleware.checkAuth, async (req, res, next) => {
  let user = await User.findById(req.session.userId);
  res.render('index', {
    user: user
  });
});

router.use('/', authRouter);

// Prevent CSRF Attack
router.use(csurf(), (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Tất cả các route ngoài authRouter đều phải đăng nhập trước khi được truy cập
router.use(authMiddleware.checkAuth);

router.use('/user', userRouter);

router.use('/contacts', contactRouter);

router.use('/test', authMiddleware.checkAuth, (req, res, next) => {
  res.send('test');
});

// Redirect Not Found Page if route not match
// router.use('/*', (req, res, next) => {
//   res.render('pages/notFound', {
//     layout: 'layouts/base.layout.ejs'
//   });
// });

module.exports = router;
