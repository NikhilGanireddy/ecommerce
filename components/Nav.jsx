import Link from "next/link";
import {MdSpaceDashboard} from "react-icons/md";
import {useRouter} from "next/router";
import {SiPhpmyadmin} from "react-icons/si";
import {BsFillBoxFill} from "react-icons/bs";
import {GiStack} from "react-icons/gi";
import {AiFillSetting} from "react-icons/ai";
import {FaRegListAlt} from "react-icons/fa";

export default function Nav() {

    const router = useRouter()
    const pathName = router.pathname
    const inactiveClass = "flex gap-2 pl-2 pr-6 py-2 rounded-l-xl items-center"
    const activeClass = `${inactiveClass} text-gray-900 bg-white`


    return (<aside className={`text-white py-4 pl-4 flex flex-col gap-6`}>
        <Link href={"/"} className={` mr-4 flex gap-2 p-2 text-white justify-center items-center`}>
            <SiPhpmyadmin size={20}/>
            Ecommerce Admin</Link>
        <nav>
            <Link className={pathName==="/" ? activeClass : inactiveClass} href={"/"}>
                <MdSpaceDashboard size={20}/>
                Dashboard</Link>
            <Link className={pathName.includes("/products") ? activeClass : inactiveClass} href={"/products"}>
                <BsFillBoxFill size={20}/>
                Products</Link>
            <Link className={pathName.includes("/categories") ? activeClass : inactiveClass} href={"/categories"}>
                <FaRegListAlt size={20}/>
                Categories </Link>
            <Link className={pathName.includes("/orders") ? activeClass : inactiveClass} href={"/orders"}>
                <GiStack size={20}/>
                Orders</Link>
            <Link className={pathName.includes("/settings") ? activeClass : inactiveClass} href={"/settings"}>
                <AiFillSetting size={20}/>
                Settings </Link>
        </nav>
    </aside>)
}
