const express = require('express');
require('dotenv').config();
const {connectDb} = require('./config/dbConnection')
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT;

const app = express();
connectDb();
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server running on port ", port);
})