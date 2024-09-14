import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser"
import { connectDB } from "./config/db.js";
import Product from "./modules/products.model.js";
import mongoose from "mongoose";
import productRouter from "./routers/products.router.js"
dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middlewares
app.use(cors()); // For cross-origin resource sharing
app.use(bodyParser.json()); // For parsing JSON in request body
app.use('/api/product',productRouter)

app.listen(3000, () => {
    connectDB()
    console.log("serveur connect in port 3000")
})