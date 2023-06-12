import Layout from "@/pages/Layout";
import {useSession} from "next-auth/react";

const Home = () => {

    const {data:session} = useSession()
    return (
        <Layout>
            <div className={`px-4 py-3 bg-gray-300 rounded-xl flex justify-between items-center`}>
                <h1 className={` text-xl font-semibold`}>Hello, <span>{session?.user?.name}</span></h1>
                <img src={session?.user?.image} alt={session?.user?.name} width={30} height={30} className={`rounded-full`}/>
            </div>
        </Layout>)
}

export default Home
