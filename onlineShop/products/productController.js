const asyncHandler = require('express-async-handler');
const { deleteOneProduct, findOneProductByIdAndUpdate, createOneProduct, findOneProductById } = require('./productServices');
require('dotenv').config();


//@desc Create Product
//@route POST /api/products/create
//@acsess private

const createProduct = asyncHandler(async (req, res) => {
    const { title, image, description, quantity, price, cod, color, delivery } = req.body;
    if (!title || !image || !description || !quantity || !cod || !color || !delivery || !price) {
        res.status(400).json({
            message: "Not found"
        });;
    }

    const product = await createOneProduct(title, image, description, quantity, price, cod, color, delivery, req.customer.id);

    if (product) {
        res.status(200).json({ id: product._id, title: product.title, cid: req.customer.id });
    } else {
        res.status(400).json({
            message: "Data not valid"
        });
    }
    res.end();

});



//@desc Product Edit
//@route PUT /api/products/edit
//@acsess private

const editProduct = asyncHandler(async (req, res) => {
    const product = await findOneProductById(req.params.id);

    if (product) {
        const updated = await findOneProductByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(updated);
    }

})

//@desc Products Delete
//@route DELETE /api/products/delete
//@acsess private

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await findOneProductById(req.params.id);

    if (product) {
        await deleteOneProduct(req.params.id);
        res.status(200).json(product);
    } else {
        res.status(400).json({
            message: "Product Not Found"
        });;
    }

});

const decreaseQuantity = asyncHandler(async (req, res) => {
    const product = await findOneProductById(req.params.id);

    if (product) {
        try {
            await findOneProductByIdAndUpdate(req.params.id, { quantity: (product.quantity - parseInt(req.params.quantity)) })
            res.status(200).json({
                message: "Quantity Updated"
            })
        } catch (e) {
            console.log("🚀 ~ file: productController.js:86 ~ decreaseQuantity ~ e:", e)

        }
    } else {
        res.status(400).json({
            message: "Product not found"
        });
    }
})

const checkQuantity = asyncHandler(async (req, res) => {

    const product = await findOneProductById(req.params.id);

    if (product) {
        if (product.quantity - req.params.quantity >= 0) {
            res.status(200).json({
                message: true
            });
        } else {
            res.status(400).json({
                message: "Product not in stock"
            });
        }
    } else {
        res.status(400).json({
            message: "Product not found"
        });
    }
})

const priceOfProduct = asyncHandler(async (req, res) => {
    const product = await findOneProductById(req.params.id);

    if (product) {
        res.status(200).json({
            message: product.price
        })
    } else {
        res.status(400).json({
            message: "Product not found"
        });
    }
})

module.exports = { createProduct, editProduct, deleteProduct, decreaseQuantity, checkQuantity, priceOfProduct }