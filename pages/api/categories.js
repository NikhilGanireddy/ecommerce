import {Category} from "@/models/Category";
import {mongooseConnection} from "@/lib/monggose";

export default async function Handler(req, res) {

    const {method} = req
    await mongooseConnection()

    if (method === "GET") {
        res.json(await Category.find().populate("parent"))
    }

    if (method === "POST") {
        const {
            name, parentCategory, properties
        } = req.body
        const categoryDoc = await Category.create({name, parent: parentCategory || undefined, properties})
        res.json(categoryDoc)
    }

    if (method === "PUT") {
        const {name, parent: parentCategory, _id, properties} = req.body
        const categoryDoc = await Category.updateOne({_id}, {name, parent: parentCategory, properties})
        res.json(categoryDoc)
    }

    if (method === "DELETE") {
        const {_id} = req.query
        await Category.deleteOne({_id})
        res.json("ok")
    }

}
