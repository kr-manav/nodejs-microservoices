const express = require('express');
const router = express.Router();
const {registerCustomer, loginCustomer, editCustomer, deleteCustomer, currentUser} = require("../controllers/customerController");
const { validateToken } = require('../middleware/validateTokenHandler');

// router.use(validateToken);

router.post('/register', registerCustomer);

router.post('/login', loginCustomer);

router.put('/edit/:id', validateToken, editCustomer);

router.delete('/delete/:id', validateToken, deleteCustomer);

router.get('/currentUser', currentUser)

module.exports = router;