import ProductForm from "@/components/ProductForm";
import Layout from "@/pages/Layout";
import {useRouter} from "next/router";

export default function NewProduct() {

    const router = useRouter()
    const goBack=(ev)=>{
        ev.preventDefault()
        router.back()
    }
    return (<Layout>
        <div className={` w-full flex justify-between items-center`}>
            <h1 className={` w-max text-left text-2xl font-semibold capitalize text-gray-900 `}>New product</h1>
            <button onClick={goBack} className={` capitalize  hover:bg-gray-300 rounded-lg px-6 py-2 bg-gray-400 transition`}> go back</button>
        </div>
        <ProductForm/>
    </Layout>)
}
