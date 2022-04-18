const User = require('../../models/User');
const bcrypt = require('bcrypt');

/* [GET] /login */
const showLogin = (req, res, next) => {
  res.render('pages/login', {
    layout: 'layouts/base.layout.ejs'
  });
}

/* [POST] /login */
const login = async (req, res, next) => {
  try {
    let user = await User.findOne({
      $or: [
        {
          email: req.body.identify,
        },
        {
          username: req.body.identify,
        }
      ]
    }).select('+password');

    if( user ) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if( match ) {
        req.session.userId = user.id;
        if( req.body.remember ) {
          //Bật remember me sẽ duy trì đăng nhập trong 1 ngày thay cho 1h
          req.session.cookie.maxAge = 24 * 60 * 60 * 1000 
        }
        res.redirect('/');
      }
      else {
        res.render('pages/login', {
          layout: 'layouts/base.layout.ejs',
          error: {
            message: 'Password wrong!'
          },
          identify: req.body.identify,
          password: ''
        });
      }
    }
    else {
      res.render('pages/login', {
        layout: 'layouts/base.layout.ejs',
        error: {
          message: 'Email or Username wrong!'
        },
        identify: '',
        password: req.body.password
      });
    }
  } catch (error) {
    next(error);
  }
};

/* [GET] /register */
const showRegister = (req, res, next) => {
  res.render('pages/register', {
    layout: 'layouts/base.layout.ejs'
  });
}

/* [POST] /register */
const register = async (req, res, next) => {
  try {
    let existUser = await User.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          username: req.body.username
        }
      ]
    });
    
    if(existUser) {
      res.render('pages/register', {
        layout: 'layouts/base.layout.ejs',
        error: {
          message: 'Email or Username existed'
        },
        fullname: req.body.fullname,
        email: '',
        username: '',
        password: req.body.password
      });
      return
    }
    else {
      let newUser = {
        name: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10)
      };
      let user = await User.create(newUser);
      req.session.userId = user.id;
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
};

/* [GET] /logout */
const logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = {
  showLogin,
  login,
  showRegister,
  register,
  logout
}