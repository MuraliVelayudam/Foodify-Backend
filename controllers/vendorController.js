const Vendor = require("../model/vendorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secrete = process.env.JWT_SECRETE_KEY;

const vendorRegistration = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });

    if (vendorEmail) {
      return res
        .status(400)
        .json({ status: "fail", message: "Vendor Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      userName,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).json({
      status: "success",
      message: "Vendor is Successfully Created",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: "Internal Error",
    });
  }
};

// Vendor Login

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secrete, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "Success",
      message: "Vendor Login Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: "Internal Error",
    });
  }
};

// Get All Vendors

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");

    res.status(200).json({
      status: "Success",
      data: { vendors },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Error",
    });
  }
};

// Get Vendor By ID

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  console.log(vendorId);

  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");

    if (!vendor) {
      return res
        .status(404)
        .json({ status: "Fail", message: "Vendor Not Found" });
    }

    res.status(200).json({
      success: "Fail",
      data: {
        vendor,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Error",
    });
  }
};

module.exports = {
  vendorRegistration,
  vendorLogin,
  getAllVendors,
  getVendorById,
};
