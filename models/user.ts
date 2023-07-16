import { UserProfile } from "@/types/common.types";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<UserProfile>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String
    }
}, {timestamps: true})

const User = models.User || model<UserProfile>("User", UserSchema);
export default User;