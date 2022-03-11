const express = require("express");
const Product = require("../models/productModel");

const productRouter = express.Router();

productRouter.get("/api/products", async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({
      status: 200,
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

productRouter.get("/api/products/:productId", async (req, res) => {
  try {
    let product = await Product.findOne({
      _id: req.params.productId,
    });
    if (product) {
      res.status(200).json({
        status: 200,
        data: product,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No product found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = productRouter;

// router.post("/", async (req, res) => {
//   try {
//     let product = new Product(req.body);
//     product = await product.save();
//     res.status(200).json({
//       status: 200,
//       data: product,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 400,
//       message: err.message,
//     });
//   }
// });

// router.put("/:productId", async (req, res) => {
//   try {
//     let product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
//       new: true,
//     });
//     if (product) {
//       res.status(200).json({
//         status: 200,
//         data: product,
//       });
//     }
//     res.status(400).json({
//       status: 400,
//       message: "No product found",
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 400,
//       message: err.message,
//     });
//   }
// });

// router.delete("/:productId", async (req, res) => {
//   try {
//     let product = await Product.findByIdAndRemove(req.params.productId);
//     if (product) {
//       res.status(200).json({
//         status: 200,
//         message: "Product deleted successfully",
//       });
//     } else {
//       res.status(400).json({
//         status: 400,
//         message: "No product found",
//       });
//     }
//   } catch (err) {
//     res.status(400).json({
//       status: 400,
//       message: err.message,
//     });
//   }
// });