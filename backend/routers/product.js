import express from "express"
import {getProduct, deleteProduct,postProduct,updateProduct} from "../controllers/productController.js"


const router = express.Router()

router.get('/',  getProduct)

router.post("/", postProduct)

router.delete("/:id", deleteProduct)

router.put("/:id",updateProduct)


export default router 