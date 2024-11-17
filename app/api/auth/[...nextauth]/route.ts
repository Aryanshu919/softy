import nextAuth from "next-auth";
import GooglePorvider from "next-auth/providers/google"
import prisma from "@/app/lib/db";

const handler = nextAuth({
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
          async jwt({ token, user}) {
            // Attach user info to JWT
            if (user) {
              token.id = user.id;
            }
            return token;
          },
    }

})

export { handler as GET , handler as POST}