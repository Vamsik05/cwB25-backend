const express = require('express');
const cors=require('cors');
const {connection,port}=require('./db');
require('dotenv').config();
const userRouter=require('./routers/user.route');
const productRouter=require('./routers/product.route');
const cartRouter=require('./routers/cart.route');
// const {registerRouter,loginRouter}=require('./routers/register.route')

const app=express();

app.use(express.json());
app.use(cors())

app.use('/user',userRouter);

app.use('/product',productRouter);

app.use('/cart',cartRouter);

// app.use('/user',registerRouter)

app.listen(port,async()=>{
    try{
       await connection;
    }catch(err){
        console.log(err);
    }
    console.log(`server started at port:${port}`);
})