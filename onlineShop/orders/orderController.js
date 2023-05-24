const asyncHandler = require('express-async-handler');
const { findOneOrderById, findOrdersByCID, createOneOrder, findOneOrderByIdAndUpdate, deleteOneOrder } = require('./orderServices');
require('dotenv').config();
const axios = require('axios');

//@desc Orders List
//@route Get /api/orders/
//@acsess private

const getOrders = async (req, res) => {
    const orders = await findOrdersByCID(req.customer.id);
    if (orders) {
        res.status(200).json(orders);
    } else {
        res.status(400).json({
            message: "No orders found"
        });;
    }
}

//@desc Create Order
//@route POST /api/orders/create
//@acsess private
const checkQuantity = async (pid, quantity) => {
    const response = await axios.post(`http://localhost:5001/api/products/checkQuantity/${pid}/${quantity}`)
    if(response.data.message){
        return true
    }else{
        return false
    }

}

const priceOfProduct = async (pid) => {
    const response = await axios.post(`http://localhost:5001/api/products/priceOfProduct/${pid}`)
    if(response.data.message){
        return response.data.message;
    } else {
        return 0;
    }
}

const decreaseQuantity = async (pid, quantity) => {
    const response = await axios.post(`http://localhost:5001/api/products/decreaseQuantity/${pid}/${quantity}}`)
    if(response.data.message){
        return true
    }else {
        return false
    }
}

const placeOrder = asyncHandler(async (req, res) => {
    const { pid, quantity, deliveryDone, deliveryDate, deliveryAddress, receiverPhone, paymentMethod } = req.body;

    if (!pid || !deliveryDone || !deliveryDate || !deliveryAddress || !receiverPhone || !paymentMethod || !quantity) {
        res.status(400).json({
            message: "Not found"
        });
        return
    }


    if (await checkQuantity(pid, quantity)) {
        const productAmt = await priceOfProduct(pid);
        const orderAmount = quantity * productAmt;
        if (await decreaseQuantity(pid, quantity)) {
            const order = await createOneOrder(quantity, orderAmount, deliveryDone, deliveryDate, deliveryAddress, receiverPhone, paymentMethod, req.customer.id, pid);
            res.status(200).json({ id: order._id, cid: req.customer.id, pid: pid });

        } else {
            res.status(400).json({
                message: "Quantity not updated but order created"
            });
        }
    } else {
        res.status(400).json({
            message: "Data not valid"
        });
    }

});


//@desc Order Edit
//@route PUT /api/orders/edit
//@acsess private

const editOrder = asyncHandler(async (req, res) => {
    const order = await findOneOrderById({ _id: req.params.id });

    if (order) {
        const updated = await findOneOrderByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(updated);
    }

})

//@desc Orders Delete
//@route DELETE /api/orders/delete
//@acsess private

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await findOneOrderById(req.params.id);

    if (order) {
        await deleteOneOrder(req.params.id);
        res.status(200).json(order);
    } else {
        res.status(400).json({
            message: "Order Not Found"
        });
    }

})

module.exports = { getOrders, placeOrder, editOrder, deleteOrder }