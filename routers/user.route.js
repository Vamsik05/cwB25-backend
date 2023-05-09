const express=require('express');
const UserModel = require('../models/user.model');
const userRouter=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

// const app=express();
// app.use(express.json())


// userRouter.post('/register',async(req,res)=>{
//     const { name, email, password, mobile_no }=req.body
//     const newUser=new UserModel(user)
//     newUser.save()
//     .then((result)=>{
//          res.send('Successful')
//     })
//     .catch((err)=>{
//      console.log(err)
//      res.send(err)
//     })  
// })

userRouter.post('/register', async(req , res)=>{
    const {name,email, password,mobile_no} = req.body
    try{
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send('User with this email already exists')
        }
        bcrypt.hash(password, 5 , async(req, hash)=>{
            const user = new UserModel({name, email, mobile_no, password:hash})
            await user.save()
            res.status(200).json({'msg':'Register Successfull !'})
        })
    }catch(err){
        res.status(500).json({'err':err.message})
     }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email})
   if(user){
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            const token=jwt.sign({userID:user._id,user:user.email},'user')
           res.status(200).json({'msg':'Login successful',token:token});
        }
        else{
            res.status(400).json('Incorrect user credentials');
        }
    })
   }else{
       res.status(400).send('You are not a registered user');
         }
     }
    catch(err){
        res.status(400).json({'err':err.message});
    }
})




module.exports=userRouter;