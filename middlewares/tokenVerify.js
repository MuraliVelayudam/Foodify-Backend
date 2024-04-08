const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Vendor = require("../model/vendorModel");
dotenv.config();

const secrete = process.env.JWT_SECRETE_KEY;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      error: "Token is Required",
    });
  }
  try {
    const decode = jwt.verify(token, secrete);

    const vendor = await Vendor.findById(decode.vendorId);

    if (!vendor) {
      return res
        .status(404)
        .json({ status: "Fail", error: "Vendor is Not Found" });
    }

    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: "Fail",
      error: "Invalid Token",
    });
  }
};

module.exports = verifyToken;
