const loginValidation = (req, res, next) => {
  let {identify, password} = req.body;
  if( !identify ) {
    res.render('pages/login', {
      layout: 'layouts/base.layout.ejs',
      error: {
        message: 'Email or Username is required'
      },
      identify,
      password
    });
    return
  } else if( !password ) {
    res.render('pages/login', {
      layout: 'layouts/base.layout.ejs',
      error: {
        message: 'Password is required'
      },
      identify,
      password
    });
    return
  }

  next();
}

const registerValidation = (req, res, next) => {
  let {fullname, email, username, password} = req.body;
  let error = {};
  if( !(fullname && email && username && password) ) {
    if( !fullname ) {
      error.message = 'Fullname is required!'
    } else if( !email ) {
      error.message = 'Email is required!'
    } else if( !username ) {
      error.message = 'Username is required!'
    } else if( !password ) {
      error.message = 'Password is required!'
    }

    res.render('pages/register', {
      layout: 'layouts/base.layout.ejs',
      error,
      fullname,
      email,
      username,
      password
    });
    return
  }

  if( !(/\S+@\S+\.\S+/.test(email)) ) {
    res.render('pages/register', {
      layout: 'layouts/base.layout.ejs',
      error: {
        message: 'Wrong email format!'
      },
      fullname,
      email: '',
      username,
      password
    });
    return
  }

  if( !(/^[a-zA-Z0-9]+$/.test(username)) ) {
    res.render('pages/register', {
      layout: 'layouts/base.layout.ejs',
      error: {
        message: 'Username accept a-z A-Z 0-9 without spaces!'
      },
      fullname,
      email,
      username: '',
      password
    });
    return
  }

  next();
}

module.exports = {
  loginValidation,
  registerValidation
}