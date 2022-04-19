const express = require('express');
const contactValidation = require('../../middlewares/validations/contact.validation');
const contactController = require('../../controllers/contactController');

const router = express.Router();

router.get('/', contactController.showContacts);

router.get('/create', contactController.showCreateContact);

router.post('/', contactValidation.createContactValidation, contactController.createContact);

router.get('/:id/edit', contactController.showEditContact);

router.put('/:id', contactValidation.updateContactValidation, contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

router.delete('/:id/force-delete', contactController.forceDeleteContact);

router.get('/favorite', contactController.showFavoriteContacts);

router.delete('/:id/favorite', contactController.deleteFavoriteContact);

router.get('/trashes', contactController.showTrashes);

router.patch('/:id/restore', contactController.restoreContact);

router.post('/custom-handling', contactController.customHandler);

module.exports = router;