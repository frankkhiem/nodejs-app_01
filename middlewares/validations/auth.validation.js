const loginValidation = (req, res, next) => {
  let {identify, password} = req.body;
  if( !identify ) {
    res.render('pages/auth/login', {
      layout: 'layouts/base.layout.ejs',
      error: {
        message: 'Email or Username is required'
      },
      identify,
      password
    });
    return
  } else if( !password ) {
    res.render('pages/auth/login', {
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
  let {fullname, email, username, password, confirmPassword} = req.body;
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

    res.render('pages/auth/register', {
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
    res.render('pages/auth/register', {
      layout: 'layouts/base.layout.ejs',
      error: {
        message: 'Email format wrong! Ex: example@host.com'
      },
      fullname,
      email: '',
      username,
      password
    });
    return
  }

  if( !(/^[a-zA-Z0-9]+$/.test(username)) ) {
    res.render('pages/auth/register', {
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

  if( password !== confirmPassword ) {
    res.render('pages/auth/register', {
      layout: 'layouts/base.layout.ejs',
      error: {
        message: 'Confirm password wrong!'
      },
      fullname,
      email,
      username,
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