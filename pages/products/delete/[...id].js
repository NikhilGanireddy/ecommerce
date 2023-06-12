import Layout from "@/pages/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function DeleteProduct(){

    const router = useRouter()
    const [productInfo,setProductInfo] = useState()
    const id = router.query.id

    const deleteProduct=async (ev)=>{
        ev.preventDefault()
        await axios.delete("/api/products?id="+id)
        router.back()
    }
    const goBack = (ev)=>{
        ev.preventDefault()
        router.back()
    }

    useEffect(()=>{
        if (!id) return
        else {
            axios.get("/api/products?id="+id).then(response=>{setProductInfo(response.data)})
        }
    },[])

    return<Layout>
        <h1>Do you really want to delete "{productInfo?.title}"?</h1>
        <div className={` flex items-center gap-4 mt-4`}>
            <button onClick={deleteProduct} className={ `btn-red`}>Yes</button>
            <button onClick={goBack} className={`btn`}>No</button>
        </div>
    </Layout>
}
