const express = require('express');
const router = express.Router();
const {createProduct, editProduct, deleteProduct, decreaseQuantity, checkQuantity, priceOfProduct} = require("./productController");
const { validateToken } = require('../middleware/validateTokenHandler');

router.post('/create', validateToken, createProduct);

router.put('/edit/:id', validateToken, editProduct);

router.delete('/delete/:id', validateToken, deleteProduct);

router.post('/decreaseQuantity/:id/:quantity', decreaseQuantity)

router.post('/checkQuantity/:id/:quantity', checkQuantity)

router.post('/priceOfProduct/:id', priceOfProduct)



module.exports = router;