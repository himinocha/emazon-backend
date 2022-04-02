const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const productRouter = require("./routers/productRouter")
const userRouter = require("./routers/userRouter")

let port = process.env.PORT || 1010;

// connect to mongoDB
mongoID = "emazon-auth";
mongoPWD = "R1aGbKpKK7iqrX4D";
dbName = "products"
const uri = `mongodb+srv://${mongoID}:${mongoPWD}@cluster0.0efgi.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Connected to mongodb.');
    })
    .catch((error) => {
        console.log(error.reason);
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res) => res.send("Hello Word"));
app.get("/api", (req,res) => res.send("Hello API"));
app.use(productRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`BE Server running on port ${port}!`)
});

module.exports = app;