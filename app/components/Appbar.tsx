"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";



export function Appbar(){
    const session = useSession();
    return <div className="flex justify-between bg-blue-600 px-5 py-2">
        <div className="font-bold flex items-center text-white text-xl">
            <Music />
            <div className="px-1"></div>
            Softy
        </div>
        <div>
            {session?.data?.user && <Button className="bg-white text-black hover:bg-blue-200" onClick={() =>{signOut()}}>Logout</Button>}
            {!session?.data?.user && <Button className="bg-white text-black"onClick={() =>{signIn()}}>sign In</Button>}
        </div>
    </div>
}