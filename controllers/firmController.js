const Vendor = require("../model/vendorModel");
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

const addFirm = async (req, res) => {
  const { firmName, address, region, category, offer, cuisine } = req.body;

  const image = req.file ? req.file.filename : undefined;

  try {
    const vendor = await Vendor.findById(req.vendorId);

    if (!vendor) {
      return res.status(404).json({
        status: "Fail",
        error: "Vendor Not Found",
      });
    }

    const newFirm = new Firm({
      firmName,
      address,
      region,
      category,
      offer,
      image,
      cuisine,
      vendor: vendor._id,
    });

    const savedFirm = await newFirm.save();
    vendor.firm.push(savedFirm);

    await vendor.save();

    res.status(201).json({
      status: "Success",
      message: "New Firm is Added Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// Delete Firm

const deleteFirmById = async (req, res) => {
  const firmId = req.params.firmId;
  try {
    const firm = await Firm.findByIdAndDelete(firmId);

    if (!firm) {
      return res.status(404).json({
        status: "Fail",
        error: "Firm Not Found",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Firm Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  addFirm: [upload.single("image"), addFirm],
  deleteFirmById,
};
