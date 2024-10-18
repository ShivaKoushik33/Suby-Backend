const express=require("express");
const router=express.Router();
const productController=require("../Controllers/productController");
const product = require("../Models/Product");

router.post("/add-product/:firmId",productController.addProduct);

router.get("/:firmId/products",productController.getProductByFirm);

router.get("/uploads/:imgName",(req,res)=>{
    const imgName=req.params.imgName;
    res.headersSent("Content-type","image/jpeg");
    res.sendFile(path.join(__dirname),"..","uploads",imgName);
});

router.delete("/:productId",productController.deleteProductById);
module.exports=router;