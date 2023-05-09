
 const mongoose=require('mongoose');
     
 const addressSchema=mongoose.Schema({
    street:{type:String,required:true},
    pincode:{type:Number,required:true},
    state:{type:String,required:true}
    
  })


const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    moblie_No:{type:Number,require:true},
    address_list:{type:[addressSchema]}
})

   const UserModel=mongoose.model("user",userSchema)
     
  module.exports=UserModel




  