import mongoose, {model, models, Schema} from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true}, description: {type: String, required: true}, price: {
        type: Number, required: true
    }, category: {type: mongoose.Types.ObjectId, ref:"Category"}
})

export const Product = models.Product || model("Product", ProductSchema)


