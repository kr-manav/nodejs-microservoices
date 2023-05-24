const asyncHandler = require('express-async-handler');
const { findOneOrderById, findOrdersByCID, createOneOrder, findOneOrderByIdAndUpdate, deleteOneOrder } = require('../services/orderServices');
require('dotenv').config();
const { findOneProductById, findOneProductByIdAndUpdate } = require('../services/productServices')


const decreaseQuantity = async (pid, quantity) => {
    const product = await findOneProductById(pid);

    if (product) {
        await findOneProductByIdAndUpdate(pid, {quantity: product.quantity - quantity})
    } else {
        throw new Error("Product not found");
    }
}

const checkQuantity = async(pid, quantity) => {
    const product = await findOneProductById(pid);

    if (product) {
        if(product.quantity - quantity >= 0){
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

const priceOfProduct = async (pid) => {
    const product = await findOneProductById(pid);

    if (product) {
        return product.price;
    } else {
        throw new Error("Product not found");
    }
}


//@desc Orders List
//@route Get /api/orders/
//@acsess private

const getOrders = async (req, res) => {
    const orders = await findOrdersByCID(req.customer.id);
    if(orders){
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

const placeOrder = asyncHandler(async (req, res) => {
    const { pid, quantity, deliveryDone, deliveryDate, deliveryAddress, receiverPhone, paymentMethod} = req.body;
    
    if (!pid || !deliveryDone || !deliveryDate || !deliveryAddress || !receiverPhone || !paymentMethod || !quantity) {
        res.status(400).json({
            message: "Not found"
        });
        return
    }
    if(await checkQuantity(pid, quantity)){
        const productAmt = await priceOfProduct(pid);
        const orderAmount = quantity * productAmt;
        
        const order = await createOneOrder(quantity, orderAmount, deliveryDone, deliveryDate, deliveryAddress, receiverPhone, paymentMethod, req.customer.id, pid);
        if (order) {
            res.status(200).json({ id: order._id, cid: req.customer.id, pid: pid });
        } else {
            res.status(400).json({
                message: "Data not valid"
            });
        }
        await decreaseQuantity(pid, quantity);
    }else {
        res.status(400).json({
            message: "Not enough Quantity"
        });
    } 
});



//@desc Order Edit
//@route PUT /api/orders/edit
//@acsess private

const editOrder = asyncHandler(async (req, res) => {
    const order = await findOneOrderById({_id: req.params.id});

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