/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
import prisma  from "@/app/lib/db";
//@ts-expect-error
import youtubesearchapi from "youtube-search-api";
import { getServerSession } from "next-auth";


const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url : z.string()
})

export async function POST(req: NextRequest){

    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = data.url.match(YT_REGEX);
        
        if(!isYt){
            return NextResponse.json({
              message: "Wrong url"
            },{
                status: 411
            })
        }
         
        
        const extractedId = data.url.split("?v=")[1];

        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a : { width : number}, b: {width: number}) => a.width < b.width ? -1 : 1);
        
        const stream = await prisma.stream.create({
           data:{
                userId: data.creatorId,
                url : data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "No Title",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://cdn.dribbble.com/users/683081/screenshots/2728654/media/d6f3cc39f60fcd48bc2236264b4748b9.png",
                bigImg: thumbnails[thumbnails.length -1].url ?? "https://cdn.dribbble.com/users/683081/screenshots/2728654/media/d6f3cc39f60fcd48bc2236264b4748b9.png"
               }
            
        })
        return NextResponse.json({
            ...stream,
            haveupvoted:false,
            upvotes:0
        })
    } catch (e) {
        return NextResponse.json({
            error: e,
            message: "Error while adding a stream"
        },{
            status: 411
        })
        
    }
}



export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
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
    if(!creatorId){
        return NextResponse.json({
            msg: "creatorId not found"
        },{
            status: 411
        })
    }
    const streams = await prisma.stream.findMany({
        where:{
            userId: creatorId,
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
            upvotes: _count.upvotes,
            haveUpVoted: rest.upvotes.length ? true : false
        }))
    })
}