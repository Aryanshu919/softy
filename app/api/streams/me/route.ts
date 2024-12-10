import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    console.log("inside the get route of me");
    const session = await getServerSession();
    
    const user = await prisma.user.findFirst({
        where:{
            email: session?.user?.email ?? "",
        }
    });
    

    if(!user){
        return NextResponse.json({
            msg: "user not found"
        })
    }


}