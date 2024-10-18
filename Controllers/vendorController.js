const Vendor=require("../Models/Vendor");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotEnv=require("dotenv");

dotEnv.config();
const secretKey=process.env.WhatIsYourName;

const vendorRegister=async(req,res)=>{
    const{username,email,password}=req.body;
try{
    const vendorEmail=await Vendor.findOne({email});
    if(vendorEmail){
        return res.status(400).json("Email already exists");
    }
    const hashedPassword=await bcrypt.hash(password,11);

    const newVendor=new Vendor({
        username,
        email,
        password:hashedPassword
    });
    await newVendor.save();
    console.log("Registered");
    return res.status(201).json("Vendor Registered Sucessfully");
    
}
catch(error){
    console.log(error)
    res.status(500).json({error:"Internal Server Error"});
}
}
// vendor login

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"Invalid login Credentials"});
        }

        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"2h"});
        
        res.status(200).json({success:"Sucessful Login",token});
        console.log(email,"Token ",token);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getAllVendors = async(req,res)=>{
    try{
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getVendor=async(req,res)=>{
    const vendorId=req.params.apple;
    try{
        const vendor=await Vendor.findById(vendorId).populate('Firm');
        if(!vendor){
            return res.status(404).json({error:"Vendor not found"});
        }
        res.status(200).json({vendor});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}


module.exports={vendorRegister,vendorLogin,getAllVendors,getVendor};
