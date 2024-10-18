const express=require("express");
const mongoose=require("mongoose");
const dotEnv=require("dotenv");
const port =process.env.PORT || 4000;
const app=express();
const bodyParser=require("body-parser");
const vendorRoutes=require("./Routes/vendorRouter");
const firmRoutes=require("./Routes/firmRouter");
const productRoutes=require("./Routes/productRouter");
const path=require("path");
const cors = require('cors');
dotEnv.config();



mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongoose connected Sucessfully");
    })
    .catch((error)=>{
        console.log(error);
    })
app.use(cors());
app.use(bodyParser.json());
app.use("/vendor",vendorRoutes);
app.use("/firm",firmRoutes);
app.use("/product",productRoutes);
app.use("/uploads",express.static("uploads"));
app.listen(port,()=>{
    console.log('Server started and running at '+port);
})

app.use("/",(req,res)=>{
    res.send("<h1>Welcome to Suby</h1>");
})