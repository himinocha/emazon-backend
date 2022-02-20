const express = require("express");
const app = express();
const port = 8888;
const data = require('./data.js')

app.get("/", (req,res) => res.send("Hello Word"));
app.get("/api", (req,res) => res.send("Hello API"));
app.get("/api/products", (req,res) => {
    res.json(data.products)
});

app.listen(port, () => {
    console.log(`BE Server running on port ${port}!`)
});