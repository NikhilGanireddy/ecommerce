import Layout from "@/pages/Layout";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import {FiEdit} from "react-icons/fi";
import {HiOutlineTrash} from "react-icons/hi";

export default function Products() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("/api/products").then(response => {
            setProducts(response.data)
        })
    }, [])

    return (<Layout>
        <div className={` w-full flex flex-col gap-12`}>
            <Link href={"/products/new"} className={`btn`}>Add a Product</Link>

            <table className={`table-basic`}>
                <thead>
                <tr>
                    <td>
                        Products list
                    </td>
                    <td></td>
                </tr>

                </thead>
                <tbody>
                {products.map(productData => {
                    return <tr key={productData._id}>
                        <td>{productData.title}</td>
                        <td className={`flex gap-4 justify-center items-center`}>
                            <Link href={"/products/edit/" + productData._id}>
                                <FiEdit/>
                                Edit
                            </Link>
                            <Link href={"/products/delete/" + productData._id}>
                                <HiOutlineTrash/>
                                Delete
                            </Link>
                        </td>
                    </tr>
                })}
                </tbody>

            </table>
        </div>
    </Layout>)

}
