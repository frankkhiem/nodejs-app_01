const Contact = require('../../models/Contact');

/* [GET] /contacts */
const showContacts = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let perPage = 10;

    let countContacts = await Contact.countDocuments({
      owner: req.session.userId
    });

    let totalPages = Math.ceil(countContacts / perPage) || 1;

    if( page > totalPages ) {
      res.redirect(`/contacts?page=${totalPages}`);
      return
    }
    
    let contacts = await Contact.find({
      owner: req.session.userId
    }).limit(perPage).skip( (page - 1) * perPage );

    let countContactsDeleted = await Contact.countDocumentsDeleted({
      owner: req.session.userId
    });

    res.render('pages/contacts/listContacts', {
      contacts,
      countContactsDeleted,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    next(error)
  }
}

/* [GET] /contacts/favorite */
const showFavoriteContacts = async (req, res, next) => {
  try {
    let contacts = await Contact.find({
      _id: {
        $in: req.session.favoriteContacts
      }
    });
    res.render('pages/contacts/favoriteContacts', {
      contacts
    });
  } catch (error) {
    next(error)
  }
}

/* [GET] /contacts/create */
const showCreateContact = (req, res, next) => {
  res.render('pages/contacts/createContact');
}

/* [POST] /contacts */
const createContact = async (req, res, next) => {
  try {
    let {contactName, phoneNumber, email} = req.body;

    await Contact.create({
      name: contactName,
      phone: phoneNumber,
      email: email,
      owner: req.session.userId
    });

    res.redirect('/contacts')
  } catch (error) {
    next(error);
  }
}

/* [GET] /contacts/:id/edit */
const showEditContact = async (req, res, next) => {
  try {
    if( req.query.errorMessage ) {
      res.locals.error = {
        message: req.query.errorMessage
      }
    }
    let contact = await Contact.findById(req.params.id);
    res.render('pages/contacts/editContact', {
      contact
    });
  } catch (error) {
    next(error)
  }
}

/* [PUT] /contacts/:id */
const updateContact = async (req, res, next) => {
  if( req.error ) {
    res.redirect(`/contacts/${req.params.id}/edit?errorMessage=${req.error.message}`);
    return;
  }
  try {
    let contact = await Contact.findById(req.params.id);
    let {contactName, phoneNumber, email} = req.body;

    contact.name = contactName;
    contact.phone = phoneNumber;
    contact.email = email;
    
    await contact.save();
    res.redirect('/contacts');
  } catch (error) {
    next(error);
  }
}

/* [PATCH] /contacts/:id/restore */
const restoreContact = async (req, res, next) => {
  try {
    await Contact.restore({
      _id: req.params.id
    });
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}

/* [DELETE] /contacts/:id */
const deleteContact = async (req, res, next) => {
  try {
    // soft delete
    await Contact.deleteById(req.params.id);
    res.redirect('/contacts');
  } catch (error) {
    next(error);
  }
}

/* [DELETE] /contacts/:id/force-delete */
const forceDeleteContact = async (req, res, next) => {
  try {
    // force delete
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}

/* [DELETE] /contacts/favorite/:id */
const deleteFavoriteContact = async (req, res, next) => {
  try {
    // delete favorite contact
    let index = req.session.favoriteContacts.indexOf(req.params.id);
    if( index > -1 ) {
      req.session.favoriteContacts.splice(index, 1);
    }
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}

/* [GET] /contacts/trashes */
const showTrashes = async (req, res, next) => {
  try {
    let contactsDeleted = await Contact.findDeleted({
      owner: req.session.userId
    });

    res.render('pages/contacts/trashesContacts', {
      contacts: contactsDeleted
    });
  } catch (error) {
    next(error)
  }
}

/* [POST] /contacts/custom-handing */
const customHandler = async (req, res, next) => {
  try {
    if( req.body.contactIds === '' ) {
      res.redirect('back');
      return
    }
    
    const handleType = req.body.handleType;
    const contactIds = req.body.contactIds.split(',');

    if( handleType === 'addToFavorite' ) {
      contactIds.forEach(id => {
        if( !req.session.favoriteContacts.includes(id) ) {
          req.session.favoriteContacts.push(id);
        }
      });
    } else if( handleType === 'multipleDelete' ) {
      await Contact.delete({
        _id: {
          $in: contactIds
        }
      });      
    } else if( handleType === 'multipleRestore' ) {
      await Contact.restore({
        _id: {
          $in: contactIds
        }
      }); 
    } else if( handleType === 'multipleForceDelete' ) {
      await Contact.deleteMany({
        _id: {
          $in: contactIds
        }
      });
    }
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showContacts,
  showFavoriteContacts,
  showCreateContact,
  createContact,
  showEditContact,
  updateContact,
  restoreContact,
  deleteContact,
  forceDeleteContact,
  deleteFavoriteContact,
  showTrashes,
  customHandler
}
