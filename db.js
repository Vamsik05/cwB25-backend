const { default: mongoose } = require('mongoose');
const UserModel=require('./models/user.model');
// const UserModel = require('./models/user.model');
// const mogoose=require('mongoose');
require('dotenv').config();

const connection=mongoose.connect(process.env.mongoURL)
.then(()=>{
  console.log("connected to mongoDB")
})
.catch((err)=>{
    console.log(err)
});

//    const user=new UserModel({
//       name:"vamsi",
//       email:"tugrp@example.com",
//       password:"vamsi123",
//       moblie_No:123456789,
//       address_list:[]
//    })

//    user.save()
//    .then(dummyUser=>{
//     console.log(dummyUser);
//    })
//    .catch((err)=>{
// console.log(err)
//    })
const port=process.env.PORT;

  // const UserModel=mongoose.model

module.exports={connection,port}

