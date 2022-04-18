const User = require('../../models/User');
const Contact = require('../../models/Contact');

const showContacts = async (req, res, next) => {
  let user = await User.findById(req.session.userId).populate('contacts');
  res.json(user.contacts);
}

const createContact = async (req, res, next) => {
  try {
    let {contactName, phoneNumber, email} = req.query;

    let user = await User.findById(req.session.userId);

    let newContact = await Contact.create({
      name: contactName,
      phone: phoneNumber,
      email: email
    });

    user.contacts.push(newContact);
    await user.save();

    res.redirect('/contacts/')
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showContacts,
  createContact
}
