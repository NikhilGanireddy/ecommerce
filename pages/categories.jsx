import Layout from "@/pages/Layout";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {GrClose} from "react-icons/gr";
import {HiOutlineTrash} from "react-icons/hi";

export default function Categories() {

    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])
    const [parentCategory, setParentCategory] = useState("")
    const [editedCategory, setEditedCategory] = useState()
    const [properties, setProperties] = useState([])


    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        axios.get("/api/categories").then(result => {
            setCategories(result.data)
            console.log( categories)
        })
    }
    const saveCategory = async (ev) => {
        ev.preventDefault()
        if (editedCategory) {
            await axios.put("/api/categories", {
                name, parentCategory, _id: editedCategory._id, properties: properties.map((p) => ({
                        name: p.name, value: p.value.split(",")
                    }))
            }).then(setEditedCategory(null))
        } else {
            await axios.post("/api/categories", {name, parentCategory, properties})
        }
        setName("")
        fetchCategories()
    }

    function editCategory(category) {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
    }

    function deleteCategory(category) {
        axios.delete("/api/categories?_id=" + category._id)
        fetchCategories()
    }

    function addProperty() {
        setProperties((prev) => {
            return [...prev, {name: "", value: ""}]
        })
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prevState => {
            const properties = [...prevState]
            properties[index].name = newName
            return properties
        })
    }

    function handlePropertyValueChange(index, property, newValue) {
        setProperties(prevState => {
            const properties = [...prevState]
            properties[index].value = newValue
            return properties
        })
    }

    function removeProperty(index) {
        setProperties(prev => {
            return [...prev].filter((prop, propIndex) => {
                return propIndex !== index
            })
        })
    }

    return (<Layout>
        <div className={"relative flex w-full h-full flex-col gap-6"}>
            <h1 className={`text-2xl font-semibold mb-2`}>{editedCategory ? `Edit the category ${editedCategory.name}` : "Category"}</h1>
            <form onSubmit={saveCategory} className={`flex flex-col gap-2`}>
                <div className={"flex gap-2"}>
                    <input className={`mb-0`} value={name} placeholder={`Category name`} onChange={ev => {
                        setName(ev.target.value)
                    }}/>
                    <select className={"mb-0"} value={parentCategory}
                            onChange={ev => setParentCategory(ev.target.value)}>
                        <option value={""}>No Parent Category</option>
                        {categories.length > 0 && categories.map(category => {
                            return (<option value={category._id}>
                                {category.name}
                            </option>)
                        })}
                    </select>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label className={"mb-0"}>Properties</label>
                    <button onClick={addProperty} type={"button"}
                            className={"px-6 py-2 rounded-lg text-black w-max font-semiboldnpm rnu bg-gray-300"}
                            type={"button"}>Add new property
                    </button>
                    {properties.length > 0 && properties.map((property, index) => {
                        return (<div key={index} className={"flex gap-2 items-center justify-center"}>
                            <input
                                type={"text"}
                                placeholder={"Property Name (Color, RAM....."}
                                value={property.name}
                                className={"mb-0"}
                                onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}/>
                            <input
                                type={"text"}
                                placeholder={"Property Value (Black, 8GB....."}
                                className={"mb-0"}
                                value={property.value}
                                onChange={(ev) => handlePropertyValueChange(index, property, ev.target.value)}/>
                            <div
                                className={"cursor-pointer px-4 py-2 flex items-center justify-center gap-2 bg-gray-900 rounded-xl text-white"}
                                onClick={() => removeProperty(index)}
                            >
                                <HiOutlineTrash size={20}/>
                                <span>Remove</span>
                            </div>
                        </div>)
                    })}

                </div>
                <div className={"flex items-center gap-2"}>
                    {editedCategory &&
                        <button type={"button"} className={`mb-0 font-semibold bg-gray-300 px-6 py-2 rounded-lg`}
                                onClick={() => {
                                    setEditedCategory(null)
                                    setName("")
                                    setCategories("")
                                    fetchCategories()
                                }}>Cancel</button>

                    }
                    <button type={"submit"} className={`btn mb-0 font-semibold`}>Save</button>
                </div>

            </form>
            {!editedCategory && <table className={"border p-2"}>
                <thead className={"bg-blue-300"}>
                <tr>
                    <td className={"text-center text-2xl font-semibold"}>Category Name</td>
                    <td className={"text-center text-2xl font-semibold"}>Parent Category</td>

                </tr>
                </thead>
                <tbody>
                {categories.length > 0 && categories.map((category) => {
                    return (<tr key={category._id}>
                        <td className={"text-center"}>{category.name}</td>
                        <td className={"text-center"}>{category?.parent?.name}</td>
                        <td className={"p-2 flex justify-center gap-4 items-center"}>
                            <button onClick={event => editCategory(category)} className={"btn"}>Edit</button>
                            <button onClick={event => deleteCategory(category)} className={"btn"}>Delete</button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>}

        </div>
    </Layout>)
}

