const express = require("express");
const {
  vendorRegistration,
  vendorLogin,
  getAllVendors,
  getVendorById,
} = require("../controllers/vendorController");

const vendorRoute = express.Router();
vendorRoute.post("/register", vendorRegistration);
vendorRoute.post("/login", vendorLogin);
vendorRoute.get("/all_Vendors", getAllVendors);
vendorRoute.get("/vendor_/:id", getVendorById);
module.exports = vendorRoute;
