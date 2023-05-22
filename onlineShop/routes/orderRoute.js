const express = require('express');
const router = express.Router();
const {getOrders, placeOrder, editOrder, deleteOrder} = require("../controllers/orderController");
const { validateToken } = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/', getOrders);

router.post('/placeOrder', placeOrder);

router.put('/editOrder/:id', editOrder);

router.delete('/deleteOrder/:id', deleteOrder);


module.exports = router;