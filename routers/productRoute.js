const express = require("express");
const {
  addProduct,
  getProductByFirmId,
  deleteProductById,
} = require("../controllers/productController");

const productRoute = express.Router();

productRoute.post("/add_product/:firmId", addProduct);
productRoute.get("/:firmId/products", getProductByFirmId);
productRoute.delete("/:productId", deleteProductById);
productRoute.get("/upload/:imageName", async (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path(__dirname, "..", "uploads", imageName));
});

module.exports = productRoute;
