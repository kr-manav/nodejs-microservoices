const asyncHandler = require('express-async-handler');
const { deleteOneProduct, findOneProductByIdAndUpdate, createOneProduct, findOneProductById } = require('../services/productServices');
require('dotenv').config();


//@desc Create Product
//@route POST /api/products/create
//@acsess public

const createProduct = asyncHandler(async (req, res) => {
    const { title, image, description, quantity, price, cod, color, delivery} = req.body;
    if (!title || !image || !description || !quantity || !cod || !color || !delivery || !price) {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Not found"
        });;
    }
    
    const product = await createOneProduct(title, image, description, quantity, price, cod, color, delivery, req.customer.id);

    if (product) {
        res.setHeader('Content-type', 'text/json').status(200).json({ id: product._id, title: product.title, cid: req.customer.id });
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Data not valid"
        });
    }
    res.end();

});



//@desc Product Edit
//@route PUT /api/products/edit
//@acsess public

const editProduct = asyncHandler(async (req, res) => {
    const product= await findOneProductById({_id: req.params.id});
    console.log("🚀 ~ file: productController.js:39 ~ editProduct ~ product:", product)

    if (product) {
        const updated = await findOneProductByIdAndUpdate(req.params.id, req.body)
        console.log("🚀 ~ file: productController.js:43 ~ editProduct ~ updated:", updated)
        res.setHeader('Content-type', 'text/json').setHeader('Content-type', 'text/json').status(200).json(updated);
    }

})

//@desc Products Delete
//@route DELETE /api/products/delete
//@acsess public

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await findOneProductById(req.params.id);

    if (product) {
        await deleteOneProduct(req.params.id);
        res.setHeader('Content-type', 'text/json').status(200).json(product);
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Product Not Found"
        });;
    }

});

module.exports = { createProduct, editProduct, deleteProduct }