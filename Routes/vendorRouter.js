const vendorController=require("../Controllers/vendorController");
const express=require("express");

const router=express.Router();

router.post("/register",vendorController.vendorRegister);
router.post("/login",vendorController.vendorLogin);
router.get("/all-vendors",vendorController.getAllVendors);
router.get("/single-vendor/:apple",vendorController.getVendor);

module.exports=router;