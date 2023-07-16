import { PostTypes } from "@/types/common.types";
import {Schema, models, model} from "mongoose";

const PostSchema = new Schema<PostTypes>({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 10
    },
    photo: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Post = models.Post || model<PostTypes>('Post', PostSchema);
export default Post;