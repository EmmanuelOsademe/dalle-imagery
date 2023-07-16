"use client";

import { useState } from "react";
import {useRouter} from "next/navigation";
import { preview } from "@/assets";
import { FormField, Loader } from "@/components";
import { getRandomPrompt } from "@/utils";
import Image from "next/image";
import { PostTypes } from "@/types/common.types";

const CreatePost: React.FC = () => {
    const router = useRouter();

    const [form, setForm] = useState<PostTypes>({
        name: "",
        photo: "",
        prompt: ""
    });
    const [generatingImg, setGeneratingImg] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const generateImage = async () => {
        if(!form.prompt){
            alert("Please provide a prompt")
        }else{
            try {
                setGeneratingImg(true);

                const response = await fetch("/api/dalle", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({prompt: form.prompt})
                });

                const data = await response.json();

                setForm({
                    ...form,
                    photo: `data:image/jpeg;base64,${data.photo}`
                })
            } catch (e: any) {
                alert(e.message);
            } finally{
                setGeneratingImg(false);
            }
        }

    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if(form.name && form.prompt && form.photo){
            setLoading(true);

            try {
                const response = await fetch("/api/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                })

                await response.json();
                router.push("/");
            } catch (e: any) {
                alert(e.message);
            } finally{
                setLoading(false);
            }
        }else{
            alert("Please enter your name, your prompt, and a photo")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({
            ...form,
            prompt: randomPrompt
        })
    }
    
    return(
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                    Create imaginative and visually stunning through DALL-E AI and share them with the community
                </p>
            </div>
            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <FormField 
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField 
                        labelName="Your Prompt"
                        type="text"
                        name="prompt"
                        placeholder="A futuristic cyborg dance club, neon lights"
                        value={form.prompt}
                        isSurpriseMe={true}
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <Image 
                                src={form.photo}
                                alt={form.prompt}
                                fill
                                className="object-contain"
                            />
                        ) : (
                            <Image 
                                src={preview}
                                alt="Preview"
                                className="w-9/12 h-9/12 object-contain opacity-40"
                            />
                        )}
                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0, 0, 0, 0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5 flex gap-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        className="text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {generatingImg ? "Generating..." : "Generate"}
                    </button>
                </div>
                <div className="mt-10">
                    <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image, you can share it with others in the community</p>
                    <button
                        type="submit"
                        className="mt-3 text-white bg-[#085f99] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {loading ? "Sharing..." : "Share with the community"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost;