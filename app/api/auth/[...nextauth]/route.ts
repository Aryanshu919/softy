import NextAuth from "next-auth";
import GooglePorvider from "next-auth/providers/google"
import prisma from "@/app/lib/db";

const handler = NextAuth({
    providers:[
        GooglePorvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret", 
    session: {
        strategy: "jwt", 
    },
    callbacks:{
         async signIn(params){
            if(!params.user.email){
                return false;
            }
            try {
                console.log("creating a entry for user")
                await prisma.user.create({
                    data:{
                        email: params.user.email,
                        provider: "Google",

                    }
                })
                
            } catch (error) {
                console.log("error while creating entry for user")
                console.log(error);
            }
            return true;
        },
    }

})

export { handler as GET , handler as POST}