const Orders = require('../models/orderModel')
require('dotenv').config();

const findOneOrderById = async (id) => {
    return await Orders.findOne({ _id: id });
}

const findOrdersByCID = async(id) => {
    return await Orders.find({cid: id})
}

const createOneOrder = async (quantity, orderAmount, deliveryDone, deliveryDate, deliveryAddress, receiverPhone, paymentMethod, cid, pid) => {
    return await Orders.create({
        quantity: quantity,
        orderAmount: orderAmount,
        deliveryDone:deliveryDone,
        deliveryDate:deliveryDate,
        deliveryAddress:deliveryAddress,
        receiverPhone:receiverPhone,
        paymentMethod:paymentMethod,
        orderCancelled: false,
        cid: cid,
        pid: pid
    })
}

const findOneOrderByIdAndUpdate = async (id, updateValue) => {
    return await Orders.findByIdAndUpdate(id, updateValue)
}

const deleteOneOrder = async (id) => {
    return await Orders.deleteOne({ _id: id });
}

module.exports = {
    findOneOrderById, findOrdersByCID, createOneOrder, findOneOrderByIdAndUpdate, deleteOneOrder
}