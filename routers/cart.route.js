const express=require('express');
const cartRouter=express.Router();
const auth=require('../middlewares/auth');

const CartModel=require('../models/cart.model');

cartRouter.post('/add',async(req,res)=>{
    try{
        const {image,name,price,discounted_price,offer}=req.body;
        console.log(image,name,price,offer)
             const cart=new CartModel({image,name,price,discounted_price,offer})
             await cart.save();
             console.log('data added successfully')
             res.status(200).send({"msg":"product added successfully"});
         }
         catch(err){
            console.log(err);
            res.send(err);
         }
})

cartRouter.get('/',async(req,res)=>{
    try{
        const cart=await CartModel.find();
    res.status(200).send(cart);
    }
    catch(err){
       console.log(err);
       res.send(err);
    }  
})

cartRouter.delete('/delete/:id', async (req, res) => {
    try {
        await CartModel.findByIdAndDelete(req.params.id);
        console.log('removed')
      res.status(200).send({"msg":'Removed from cart'});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  


module.exports=cartRouter;
