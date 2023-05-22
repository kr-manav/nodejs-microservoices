const express = require('express');
const router = express.Router();
const {createProduct, editProduct, deleteProduct} = require("../controllers/productController");
const { validateToken } = require('../middleware/validateTokenHandler');

router.use(validateToken)

router.post('/create', createProduct);

router.put('/edit/:id', editProduct);

router.delete('/delete/:id', deleteProduct);

module.exports = router;