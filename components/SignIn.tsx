"use client"

import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import {CustomButton} from "."

interface Provider {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>

const SignIn: React.FC = () => {
    const [providers, setProviders] = useState<Providers | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        fetchProviders();
    }, []);

    if(!providers)return;
    console.log(providers)

    return (
        <div className="relative">
            <CustomButton 
                title="Sign In"
                type="button"
                bgColor="bg-[#00b4d8]"
                textColor="text-[#001d3d]"
                fontStyle="font-semibold"
                handleClick={() => setIsOpen((prev) => !prev)}
                rightIcon={isOpen ? "/arrow-up.svg" : "arrow-down.svg"}
            />
            {isOpen && (
                <div className="absolute top-[50px] right-0 flex flex-col gap-2 p-2 rounded-md bg-blue-50 z-10 w-[200px]">
                    <div className="w-full text-center font-semibold text-[18px]">
                        Sign in with:
                    </div>
                    {Object.values(providers).map((provider) => (
                        <div 
                            key={provider.name}
                            onClick={() => signIn(provider?.id)}
                            className="flex items-center justify-start gap-7 hover:bg-blue-200 p-2 rounded-md w-full"
                        >
                            <Image 
                                src={`/${provider?.id}.svg`}
                                alt={`${provider.name} logo`}
                                width={25}
                                height={25}
                                className="object-cover"
                            />
                            <span>{provider.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SignIn;