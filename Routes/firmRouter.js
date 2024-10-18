const express=require("express");
const firmController=require("../Controllers/firmController");
const verifyToken=require("../Middleware/verifyToken");


const router=express.Router();

router.post("/add-firm",verifyToken,firmController.addFirm);

router.get("/uploads/:imgName",(req,res)=>{
    const imgName=req.params.imgName;
    res.headersSent("Content-type","image/jpeg");
    res.sendFile(path.join(__dirname),"..","uploads",imgName);
});
router.get("/get-all-firms",firmController.getAllFirms);

router.delete("/:firmId",firmController.deleteFirmById);
module.exports=router;

