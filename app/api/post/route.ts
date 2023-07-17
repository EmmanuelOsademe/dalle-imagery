import { PostTypes } from "@/types/common.types";
import Post from "@/models/post";
import {v2 as cloudinary} from "cloudinary";
import { connectToMongoDB } from "@/db/mongodb";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const POST = async (req: Request) => {
    
    try {
        await connectToMongoDB();
        const {name, prompt, photo} = await req.json() as PostTypes;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name, 
            prompt,
            photo: photoUrl.secure_url
        })
        return new Response(JSON.stringify({success: true, data: newPost}), {status: 201});
    } catch (e: any) {
        console.log(e.message);
        return new Response(e?.message, {status: 500});
    }

}

export const GET = async (req: Request, res: Response) => {

    try {
        await connectToMongoDB();

        const posts = await Post.find({});
        console.log(posts.length);
        return new Response(JSON.stringify(posts), {status: 200})
    } catch (e: any) {
        console.log(e.message);
        return new Response(e?.message, {status: 500});
    }
}