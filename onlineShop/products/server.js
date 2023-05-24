const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const errorHandler = require("../middleware/errorHandler");

const port = process.env.PRODUCT_PORT;
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api/products", require("./productRoute"));
    app.use(errorHandler);

    app.listen(port, () => {
        console.log("Server running on port ", port);
    })
});