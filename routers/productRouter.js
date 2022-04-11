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

productRouter.post("/api/products/email", async (req, res) => {
  try {
    let product = await Product.find({
      userEmail: req.body.email
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

productRouter.post("/api/products/upload", async (req,res) => {
  try {
      await Product.create({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        brand: req.body.brand,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock,
        userEmail: req.body.userEmail,
        description: req.body.description,
      })
      res.json({ status: 'ok' })
  } catch (err) {
      res.json({ status: 'error', error: 'error uploading the Product'})
  }
});

// search by name
productRouter.post("/api/products/searchName", async (req, res) => {
  try {
    let search = new RegExp(req.body.name);
    let product = search? await Product.find({
      name: { $regex: search, $options: 'i' }
    }): [];
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

//filter function

//price filter(bad grammar)
// productRouter.get('/api/products/:price1/:price2',authenticate, async (req,res) => {
//   try{
//   price1=parseFloat(req.params.price1);
//   price2=parseFloat(req.params.price2);
//   price=parseFloat(req.params.price)
//   if(price>price1,price<price2){
//     res.status(200).json({
//       status: 200,
//       data: product,
//     });
//   }}
//   catch (err) {
//     res.status(400).json({
//       status: 400,
//       message: err.message,
//     });
//   }
// });

// //pagination:jumping to pages and deciding how many items one page will contain
// productRouter.get('/api/products',authenticate, async (req,res) => {
//   const match = {}

//   if(req.query.published){
//       match.published = req.query.published === 'true'
//   }
//   try {
//       await req.user.populate({
//           path:'/api/products',
//           match,
//           options:{
//               limit: parseInt(req.query.limit),
//               skip: parseInt(req.query.skip)
//           }
//       }).execPopulate()
//       res.send(req.user.posts)
//   } catch (error) {
//       res.status(500).send()
//   }
// })

// //sort function
// productRouter.get('/api/products',authenticate, async (req,res) => {
//   const match = {}
//   const sort  = {}

//   if(req.query.published){
//       match.published = req.query.published === 'true'
//   }

//   if(req.query.sortBy && req.query.OrderBy){
//       sort[req.query.sortBy]   = req.query.OrderBy === 'desc' ? -1 : 1
//   }
  
//   try {
//       await req.user.populate({
//           path:'/api/products',
//           match,
//           options:{
//               limit: parseInt(req.query.limit),
//               skip: parseInt(req.query.skip),
//               sort
//           }
//       }).execPopulate()
//       res.send(req.user.posts)
//   } catch (error) {
//       res.status(500).send()
//   }
// })
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