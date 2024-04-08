const express = require("express");
const verifyToken = require("../middlewares/tokenVerify");
const { addFirm, deleteFirmById } = require("../controllers/firmController");

const firmRoute = express.Router();

firmRoute.post("/add_firm", verifyToken, addFirm);

firmRoute.delete("/:firmId", deleteFirmById);

firmRoute.get("/upload/:imageName", async (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent(("Content-Type", "image/jpeg"));
  res.send(path.join(__dirname, "..", "uploads", imageName));
});

module.exports = firmRoute;
