const express = require("express");
const bodyParser = require("body-parser");
const vendorRoute = require("./routers/vendorRoute");
const firmRoute = require("./routers/firmRoute");
const productRoute = require("./routers/productRoute");
const path = require("path");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/vendor", vendorRoute);
app.use("/api/firm", firmRoute);
app.use("/api/product", productRoute);
app.use("./uploads", express.static("uploads"));

module.exports = app;
