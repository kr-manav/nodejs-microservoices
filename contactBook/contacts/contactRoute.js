const express = require('express');
const router = express.Router();
const {getContact, createContact, updateContact, deleteContact} = require("./contactController");
const { validateToken } = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route('/').post(createContact);

router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)
router.route('/:id').delete(deleteContact);

module.exports = router;