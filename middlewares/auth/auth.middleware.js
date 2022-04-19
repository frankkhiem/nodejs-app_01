const User = require('../../models/User');

const checkAuth = async (req, res, next) => {
  try {
    if( req.session.userId ) {
      let user = await User.findById(req.session.userId);
      if (user) {
        res.locals.user = user;
        next();
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    next(error);
  }
}

const preventRedirectToLogin = async (req, res, next) => {
  let redirectPath = req.query.redirect_path || '/';
  try {
    if( !req.session.userId ) {
      next();
    } else {
      let user = await User.findById(req.session.userId);
      if (user) {
        res.redirect(redirectPath);
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkAuth,
  preventRedirectToLogin
}