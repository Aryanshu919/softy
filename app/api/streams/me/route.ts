import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession();
    console.log("Server side session ",session);
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

   const streams = await prisma.stream.findMany({
        where:{
            userId: user.id,
        },
        include:{
            _count:{
                select:{
                    upvotes:true
                }
            },
            upvotes:{
                where:{
                    userId: user.id
                }
            }
        }
   })

    return NextResponse.json({
        streams : streams.map(({_count, ...rest}) =>({
            ...rest,
            upvotes:_count.upvotes
        }))
    })
}