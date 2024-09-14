import express from "express";
import mongoose from "mongoose";
import Product from "../modules/products.model.js"
import { createProducts, deleteProduct, editProductMethode1, editProductMethode2, getProducts } from "../controllers/prodcuts.controller.js";
const router=express.Router();

router.post("/",createProducts )
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
router.get('/',getProducts )
router.delete('/delete/:id',deleteProduct)
// 1 methode 
router.put('/edit/:id',editProductMethode1)

// 2 methode
router.put('/:id',editProductMethode2)

export default  router;