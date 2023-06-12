"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Layout from "@/pages/Layout";
import {AiOutlineCloudUpload} from "react-icons/ai";

export default function ProductForm({
                                        _id,
                                        title: exisitinfTitle,
                                        description: existingDescription,
                                        price: existingPrice,
                                        category: existingCategory
                                    }) {
    const [categories, setCategories] = useState([])

    const [title, setTitle] = useState(exisitinfTitle || "")
    const [description, setDescription] = useState(existingDescription || "")
    const [price, setPrice] = useState(existingPrice || "")
    const [category, setCategory] = useState(existingCategory || [])


    const router = useRouter()

    useEffect(() => {
        axios.get("/api/categories").then(response => setCategories(response.data))
    }, [])

    const saveProduct = async (ev) => {
        ev.preventDefault()
        const data = {title, description, price, category}
        if (_id) {
            //update
            await axios.put("/api/products", {...data, _id}).then(() => router.push("/products"))
        } else {
            //create
            await axios.post("/api/products", data).then(() => {
                setTitle("");
                setDescription("")
                setPrice("")
                router.push("/products")
            })
        }
    }
    return (<div className={` flex flex-col w-full gap-6 items-center`}>
        <form onSubmit={saveProduct} className={` w-full flex flex-col justify-center`}>
            <label>Name</label>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Name`}/>
            <label>Categories</label>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                {categories.length > 0 && categories.map((c) => {
                    return <option value={c._id}>{c.name}</option>
                })}

            </select>

            <label>Description</label>
            <textarea
                className={`min-h-[100px]`}
                placeholder={`Description`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price (in USD)</label>
            <input
                type={"number"}
                placeholder={`$`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button
                className={`btn`}
                type={"submit"}>Save
            </button>
        </form>
    </div>)
}
