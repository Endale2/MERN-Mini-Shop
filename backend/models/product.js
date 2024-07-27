import mongoose from "mongoose";

const ProductSchema=mongoose.Schema({
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

},
{timestamp:true}

);


const ProductModel=mongoose.model("Product",ProductSchema);

export default ProductModel;