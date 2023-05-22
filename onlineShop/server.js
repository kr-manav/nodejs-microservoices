const express = require('express');
require('dotenv').config();
const {connectDb} = require('./config/dbConnection')
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT;

const app = express();
connectDb();
app.use(express.json());
app.use("/api/customers", require("./routes/customerRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoute"));

app.use(errorHandler);

app.listen(port, () => {
    console.log("Server running on port ", port);
})