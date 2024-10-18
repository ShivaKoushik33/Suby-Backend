const Product=require("../Models/Product");
const multer=require("multer");
const Firm=require("../Models/Firm");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload=multer({storage:storage});

const addProduct= async(req,res)=>{
    try{
        const{productName,price,category,bestSeller,description}=req.body;
        const image=req.file?req.file.filename:undefined;

        const firmId= req.params.firmId;
        const firm= await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"No Firm found"});
        }
        const product=new Product({
            productName,price,category,bestSeller,description,image,firm:firmId
        });
        const savedProduct=await product.save();

        firm.products.push(savedProduct);

        await firm.save();

        res.status(200).json(savedProduct);
        // console.log("Registered");
        // return res.status(201).json("product added Sucessfully");

    }
    catch(error){
        console.error(error);
        res.status(500).json("Internal server error");
       }
}

const getProductByFirm=async(req,res)=>{
    try{
        firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        const restaurantName=firm.firmName;

        if(!firm){
            return res.status(404).json({error:"No Firm found"});
        }
        const restrauntName=firm.firmName;
        const products=await Product.find({firm:firmId});
        res.status(200).json({restaurantName,products});
    }
    catch(error){
        console.error(error);
        res.status(500).json("Internal server error");
       }
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const deletedProduct=await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            res.stauts(404).json("No Product found");
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json("Internal server error");
       }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};

