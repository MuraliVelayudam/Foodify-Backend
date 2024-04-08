const Product = require("../model/productModel");
const Firm = require("../model/firmModel");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  const { productName, price, category, description, bestSeller } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const firmId = req.params.firmId;

    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({
        status: "Fail",
        error: "Firm Not Found",
      });
    }

    const newProduct = new Product({
      productName,
      price,
      category,
      description,
      bestSeller,
      image,
      firm: firm._id,
    });

    const savedProduct = await newProduct.save();

    firm.products.push(savedProduct);

    await firm.save();

    res.status(201).json({
      status: "Success",
      message: "Products are Added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// Get Products By Firm ID

const getProductByFirmId = async (req, res) => {
  const firmId = req.params.firmId;

  try {
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({
        status: "Fail",
        error: "Firm Not Found",
      });
    }

    const firmName = firm.firmName;
    const products = await Product.find({ firm: firmId });

    res.status(200).json({
      status: "Success",
      data: {
        firmName,
        products,
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

// Delete Product

const deleteProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        status: "Fail",
        error: "No Product Found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Product Delete Successfully",
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
  addProduct: [upload.single("image"), addProduct],
  getProductByFirmId,
  deleteProductById,
};
