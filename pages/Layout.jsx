import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";

export default function Layout({children}) {
    const { data: session } = useSession()
    if(!session) {
        return <main className={`bg-gray-900 w-screen h-screen flex justify-center items-center`}>
            <button onClick={()=>signIn("google")} className={` px-6 py-2 rounded-lg bg-white text-black font-semibold `}>Login with google</button>
        </main>
    }

    return <div className={` bg-gray-900 min-h-screen flex`}>
        <Nav/>
        <div className={`p-4 bg-white my-2 mr-2 rounded-xl flex-grow`}>{children}</div>

    </div>

}
