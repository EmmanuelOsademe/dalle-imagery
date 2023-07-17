"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { preview } from "@/assets";
import { PostTypes } from "@/types/common.types";
import {Loader, FormField} from "@/components";
import { getRandomPrompt } from "@/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";

const CreatePost: React.FC = () => {
    const router = useRouter();

    const {data: session} = useSession();

    const [form, setForm] = useState<PostTypes>({name: session?.user?.name!, prompt: "", photo: ""});
    const [generatingImg, setGeneratingImg] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const generateImage = async () => {
        if(!form.prompt){
            alert("Please enter a propmt");
        }else{
            try {
                setGeneratingImg(true);

                const response = await fetch("/api/dalle", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({prompt: form.prompt})
                })

                const data = await response.json();

                setForm({
                    ...form,
                    photo: `data:image/jpeg;base64,${data.photo}`
                })
            } catch (e: any) {
                alert(e.message);
            }finally {
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
            }finally {
                setLoading(false);
            }
        }else{
            alert("Please provide prompt and generate an image");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({
            ...form,
            prompt: randomPrompt
        })
    }

    return (
        <form className="mt-8 max-w-3xl" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <FormField 
                    labelName={`enter your prompt`}
                    type="text"
                    name="prompt"
                    placeholder="A futuristic cyborg dance club, neon lights"
                    value={form.prompt}
                    handleChange={handleChange}
                    isSurpriseMe={true}
                    handleSurpriseMe={handleSurpriseMe}
                    hasName={true}
                    userName={session?.user?.name.split(" ")[0]}
                />
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-56 h-56 p-3 flex justify-center items-center">
                    {form.photo ? (
                        <Image 
                            src={form.photo}
                            alt={form.prompt}
                            fill
                            className="object-contain rounded-md"
                        />
                    ) : (
                        <Image 
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-contain opacity-40 rounded-md"
                        />
                    )}
                    {generatingImg && (
                        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0, 0, 0, 0.5)] rounded-lg">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
            <button
                type="button"
                onClick={generateImage}
                className="mt-5 text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                {generatingImg ? "Generating..." : "Generate"}
            </button>
            <div className="mt-8">
                <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image, you can share it with others in the community</p>
                <button
                    type="submit"
                    className="mt-2 text-white bg-[#085f99] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    {loading ? "Sharing..." : "Share with the Community"}
                </button>
            </div>
        </form>
    )
}

export default CreatePost;