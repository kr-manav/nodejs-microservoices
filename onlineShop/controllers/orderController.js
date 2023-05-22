const asyncHandler = require('express-async-handler');
const { findOneOrderById, findOrdersByCID, createOneOrder, findOneOrderByIdAndUpdate, deleteOneOrder } = require('../services/orderServices');
const { decreaseQuantity, priceOfProduct } = require('./productController');
require('dotenv').config();


//@desc Create Order
//@route POST /api/orders/create
//@acsess private

const placeOrder = asyncHandler(async (req, res) => {
    const { pid, quantity, deliveryDone, deliveryDate, deliveryAddress, receiverPhone, paymentMethod} = req.body;
    
    if (!pid || !deliveryDone || !deliveryDate || !deliveryAddress || !receiverPhone || !paymentMethod || !quantity) {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Not found"
        });
        return
    }

    const productAmt = await priceOfProduct(pid);
    const orderAmount = quantity * productAmt;
    
    const order = await createOneOrder(quantity, orderAmount, deliveryDone, deliveryDate, deliveryAddress, receiverPhone, paymentMethod, req.customer.id, pid);
    if (order) {
        res.setHeader('Content-type', 'text/json').status(200).json({ id: order._id, cid: req.customer.id, pid: pid });
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Data not valid"
        });
    }
    res.end();
    await decreaseQuantity(pid, quantity);
});



//@desc Order Edit
//@route PUT /api/orders/edit
//@acsess private

const editOrder = asyncHandler(async (req, res) => {
    const order = await findOneOrderById({_id: req.params.id});

    if (order) {
        const updated = await findOneOrderByIdAndUpdate(req.params.id, req.body)
        res.setHeader('Content-type', 'text/json').setHeader('Content-type', 'text/json').status(200).json(updated);
    }

})

//@desc Orders Delete
//@route DELETE /api/orders/delete
//@acsess private

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await findOneOrderById(req.params.id);

    if (order) {
        await deleteOneOrder(req.params.id);
        res.setHeader('Content-type', 'text/json').status(200).json(order);
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Order Not Found"
        });
    }

})

const getOrders = async (req, res) => {
    const orders = await findOrdersByCID(req.customer.id);
    if(orders){
        res.setHeader('Content-type', 'text/json').status(200).json(orders);
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "No orders found"
        });;
    } 
}


module.exports = { getOrders, placeOrder, editOrder, deleteOrder }