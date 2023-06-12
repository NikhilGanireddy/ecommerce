import Layout from "@/pages/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";

export default function EditProduct() {

    const router = useRouter()
    const id = router.query.id
    const [productData, setProductData] = useState(null)

    const goBack=(ev)=>{
        ev.preventDefault()
        router.back()
    }

    useEffect(() => {
        if (!id) return
        axios.get("/api/products?id=" + id).then((response) => setProductData(response.data))
    }, [id])

    return (<Layout>
        <div className={` w-full flex justify-between items-center`}>
            <h1 className={` w-max text-left text-2xl font-semibold text-gray-900 `}>Edit product</h1>
            <button onClick={goBack}  className={` capitalize  hover:bg-gray-300 rounded-lg px-6 py-2 bg-gray-400 transition`}> go back</button>
        </div>
        {productData && <ProductForm {...productData}/>}

    </Layout>)
}
