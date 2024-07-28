import express from "express"
import Product from '../models/product.js'
export const getProduct = async(req,res)=>{
    try{
        const products = await Product.find({})
        res.json(products).status(404)
    }catch(err){
        res.json(err)
    }
}
export const postProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const deleteProduct = async(req,res)=>{

    const {id}= req.params

    try{
        await Product.findByIdAndDelete(id)
        res.json({message:`the product with id ${id}  is deleted `}).status(200)
        console.log("deleted successfully")
    }catch(err){
        res.json(err).status(401)
    }

}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" }); // Handle product not found
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err); // Added status code for errors
    }
};


