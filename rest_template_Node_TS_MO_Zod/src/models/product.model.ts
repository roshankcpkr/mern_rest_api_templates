import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

import { UserDocument } from "./user.model";

const nanoid = customAlphabet('1234567890abcdef', 10)
export interface ProductDocument extends mongoose.Document {
    user: UserDocument['_id'],
    title: string,
    description: string,
    price: number,
    images: string,
    createdAt: Date,
    updatedAt: Date,

}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`
    
    },
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    images: [{type: String}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema)

export default ProductModel