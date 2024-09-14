import express from "express";
import mongoose from "mongoose";
import Product from "../modules/products.model.js"
const router=express.Router();

router.post("/", async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(401).json({ success: false, message: "please provied all fileds" })

    }
    const newProduct = await Product.create(product);
    try {
        await newProduct.save()
        return res.status(201).json({ success: true, data: newProduct })


    } catch (error) {
        console.error("Error in create products", error.message);
        res.status(500).json({ success: false, message: "Server Error" })

    }
})
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    try {


        if (product) {
            return res.status(200).json({ success: true, data: product })
        }
        return res.status(403).json({ success: false, message: "Prouct not Found" })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })

    }
})
router.get('/', async (req, res) => {

    try {
        const products = await Product.find({})
        return res.status(200).json({ success: true, data: products })

    } catch (error) {
        res.status(500).json({ success: false, message: `Server Error,${error.message}` })

    }
})
router.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;
try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"product delete"})
    
} catch (error) {
    
}
})
// 1 methode 
router.put('/edit/:id',async(req,res)=>{
    const {id}=req.params;
    const productNew=req.body;
    try {
        const productOld=await Product.findById(id)

        if(!productOld){
          return   res.status(403).json({success:false,message:"Product not found "})
        }
        else {
            console.log("test",productOld);
        
                 console.log("productNew",productNew);
             productOld.name=productNew.name;
             productOld.price=productNew.price;
             productOld.image=productNew.image;

             const newProduct = await Product.create(productOld);

                await newProduct.save()
             return res.status(201).json({ success: true, data: newProduct })

            
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Problem in api"})
    }
})

// 2 methode
router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product Id"});
    }
    try {
        const productUpdate=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(201).json({success:true,data:productUpdate})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"})
    }
})

export default  router;