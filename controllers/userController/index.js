const User = require('../../models/User');

/* [GET] /user */
const showProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    res.render('pages/user/userProfile');
  } catch (error) {
    next(error);
  }
}

/* [PUT] /user */
const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    if( req.body.description ) {
      user.description = req.body.description;
      await user.save();
    }
    res.redirect('/user');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showProfile,
  updateProfile
}