const express = require('express');
const contactController = require('../../controllers/contactController');

const router = express.Router();

router.get('/', contactController.showContacts);

router.get('/favorite', contactController.showFavoriteContacts);

router.get('/create', contactController.showCreateContact);

router.post('/', contactController.createContact);

router.get('/edit/:id', contactController.showEditContact);

router.put('/:id', contactController.updateContact);

router.patch('/:id/restore', contactController.restoreContact);

router.delete('/:id', contactController.deleteContact);

router.delete('/:id/force-delete', contactController.forceDeleteContact);

router.delete('/favorite/:id', contactController.deleteFavoriteContact);

router.get('/trashes', contactController.showTrashes);

router.post('/custom-handling', contactController.customHandler);

module.exports = router;