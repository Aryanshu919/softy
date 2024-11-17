"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function Redirect(){
    const session = useSession();
    const router = useRouter();
    console.log(session)
    useEffect(() =>{
        if(session.status == "authenticated"){
            router.push("/dashboard"); 

        }
        else{
            router.push("/")
        }
    },[session,router])
    return null;
}
