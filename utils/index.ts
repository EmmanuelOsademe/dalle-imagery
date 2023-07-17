import FileSaver from "file-saver";
import { surpriseMePrompts } from "@/constants";
import React from "react";
import { PostTypes } from "@/types/common.types";

export const getRandomPrompt = (prompt: string) => {

    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt){
        getRandomPrompt(prompt);
    }

    return randomPrompt;
}

export const downloadImage = async (_id: string, photo: string) => {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, posts: Array<PostTypes>, searchTimeout: ReturnType<typeof setTimeout>) => {
    clearTimeout(searchTimeout);
    
}