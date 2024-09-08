import mongosse from "mongoose";
const productSchema = new  mongosse.Schema({
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
image:{
    type:String,
    required:true
}
},{
    timestamps:true
});

const Product = mongosse.model('products',productSchema);
export default Product