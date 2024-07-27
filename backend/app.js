import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv';
import productRoutes from "./routers/product.js"
dotenv.config();
const app=express()
app.use(express.json())


app.use('/api/products', productRoutes)



// MongoDB connection string
const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(console.log('MongoDB connected'))
  .catch(err => console.log(err));



app.listen(5000, ()=>{
    console.log(`the app is running at http://localhost:5000`)
})