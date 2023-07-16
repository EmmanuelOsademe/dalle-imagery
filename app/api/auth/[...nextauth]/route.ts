import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { SessionInterface, UserProfile } from "@/types/common.types";
import { connectToMongoDB } from "@/db/mongodb";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    theme: {
        colorScheme: "auto",
        logo: "/next.svg"
    },
    callbacks: {
        async session({session}) {
            try {
                await connectToMongoDB();
                
                const email = session?.user?.email;
                const userData = await User.findOne({email}) as UserProfile;
                if(!userData){
                    throw new Error("User not found");
                }

                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...userData
                    }
                }
                
                return newSession as SessionInterface;
            } catch (e: any) {
                console.log(e.message);
                return session;
            }
        },
        async signIn({user}){
            try {
                await connectToMongoDB();

                const userExists = await User.findOne({email: user?.email});
                if(!userExists){
                    await User.create({
                        name: user.name,
                        email: user.email,
                        avatarUrl: user.image
                    })
                }

                return true;
            } catch (e: any) {
                console.log(e.message);
                return false;
            }
        }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};