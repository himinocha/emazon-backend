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

//filter functions

//filter 1: price
//a price filter function that will receive a higher bound and a lower bound 
//and check if the product’s price is between that range

//products?price1=50&price2=100
productRouter.get('/api/products/price', async (req,res) => {
  //const price1=parseFloat(req.query.price1);
  //const price2=parseFloat(req.query.price2);
  try{
  let product = await Product.find({
    //find all products with price between the 2 given parameters
    price : { $lt : parseFloat(req.query.price2)}
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
}
  catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

//filter 2:condition(rating)
//products?rating=Used
productRouter.post('/api/products/rating', async (req,res) => {
  try{
  let product = await Product.find({
    rating: parseFloat(req.query.rating)
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
}
  catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

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