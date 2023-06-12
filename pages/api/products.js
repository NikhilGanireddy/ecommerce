import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";
import {Product} from "@/models/Products";
import {mongooseConnection} from "@/lib/monggose";

export default async function handle(req, res) {
    const {method} = req
    await mongooseConnection()

    if (method === "GET") {

        if (req.query?.id) {
            res.json(await Product.findOne({_id: req.query.id}))
        } else {
            res.json(await Product.find())
        }
    }

    if (method === "POST") {
        const {title, description, price,category} = req.body
        const productDoc = await Product.create({title, description, price,category})
        res.json(productDoc)
    }

    if (method === 'PUT') {
        const {title, description, price, _id,category} = req.body
        Product.updateOne({_id},{title, description, price,category}).then(res.json(true))
        // Product.updateOne({_id}, {title, description, price})
        // res.json(true)
    }

    if (method === "DELETE"){
        if (req.query?.id){
            await Product.deleteOne({_id:req.query.id})
            res.json(true)
        }
    }

}
