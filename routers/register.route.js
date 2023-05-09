const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const userRouter=express.Router();
const UserModel=require('../models/user.model');


userRouter.post('/register', async (req, res) => {
      try {
        const { name, email, password, mobile_no } = req.body;
    
        // Check if the email is already registered
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already registered' });
        }
    
        // Create a new user object
        const newUser = new UserModel({
          name,
          email,
          password,
          mobile_no,
        });
    
        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log('registered')
    
        // Respond with a success message
        res.status(200).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering user' });
      }
    });


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
              res.status(400).json('Wrong user credentials');
          }
      })
     }else{
         res.status(400).send('user not found in database');
           }
       }
      catch(err){
          res.status(400).json({'err':err.message});
      }
  })




module.exports=userRouter