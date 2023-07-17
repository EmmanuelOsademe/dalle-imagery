import {ObjectId} from "mongoose";
import {Session, User} from "next-auth";
import { Dispatch, SetStateAction } from "react";

export interface PostTypes {
    name: string;
    prompt: string;
    photo: string;
    _id?: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserProfile {
    _id?: ObjectId;
    name: string;
    email: string;
    avatarUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SessionInterface extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    }
}

export interface FormFieldProps {
    labelName?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSurpriseMe?: boolean;
    handleSurpriseMe?: () => void;
    isSearch?: boolean;
    handleClearSearch?: () => void;
    hasName?: boolean
    userName?: string;
}