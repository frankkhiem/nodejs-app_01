const createContactValidation = (req, res, next) => {
  let {contactName, phoneNumber, email} = req.body;
  if( !contactName ) {
    res.render('pages/contacts/createContact', {
      error: {
        message: 'Contact name is required'
      },
      contactName,
      phoneNumber,
      email
    });
    return
  } else if( !phoneNumber ) {
    res.render('pages/contacts/createContact', {
      error: {
        message: 'Phone number is required'
      },
      contactName,
      phoneNumber,
      email
    });
    return
  }

  if( !(/^[0-9]+$/.test(phoneNumber)) ) {
    res.render('pages/contacts/createContact', {
      error: {
        message: 'Phone number accepts only numbers 0-9'
      },
      contactName,
      phoneNumber: '',
      email
    });
    return
  }

  if( email && !(/\S+@\S+\.\S+/.test(email)) ) {
    res.render('pages/contacts/createContact', {
      error: {
        message: 'Email format wrong! Ex: example@host.com'
      },
      contactName,
      phoneNumber,
      email: ''
    });
    return
  }

  next();
}

const updateContactValidation = (req, res, next) => {
  let {contactName, phoneNumber, email} = req.body;
  let error = {};
  if( !contactName ) {
    error.message = 'Contact name is required';
    req.error = error;
  } else if( !phoneNumber ) {
    error.message = 'Phone number is required';
    req.error = error;
  } else if( !(/^[0-9]+$/.test(phoneNumber)) ) {
    error.message = 'Phone number accepts only numbers 0-9';
    req.error = error;
  } else if( email && !(/\S+@\S+\.\S+/.test(email)) ) {
    error.message = 'Email format wrong! Ex: example@host.com';
    req.error = error;
  }

  next();
}

module.exports = {
  createContactValidation,
  updateContactValidation
}