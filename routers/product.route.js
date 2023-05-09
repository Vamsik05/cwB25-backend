const express=require('express');
const ProductModel=require('../models/product.model');

productRouter=express.Router();


productRouter.post('/add',async(req,res)=>{
  try{
 const {image,name,price,discounted_price,offer}=req.body;
      const product=new ProductModel({image,name,price,discounted_price,offer})
      await product.save();
      res.status(200).send('product added successfully');
  }
  catch(err){
     console.log(err);
     res.send(err);
  }
     
})

productRouter.get('/get',async(req,res)=>{
          try{
            const products=await ProductModel.find()
            res.status(200).json(products); 
          } 
          catch(err){
            console.log(err);
            res.send(err);
          }
})

module.exports=productRouter;