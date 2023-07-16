"use client";

import {useState} from "react";
import Image from "next/image";
import {CustomButton} from ".";
import { signOut } from "next-auth/react";
import { SessionInterface } from "@/types/common.types";

const SignOut: React.FC<{session: SessionInterface}> = ({session}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative" onClick={() => setIsOpen((prev) => !prev)}>
            <div className="flex justify-between items-center gap-4 px-5 py-1 bg-blue-50 rounded-md">
                <Image 
                    src={session?.user?.image!}
                    alt="Profile picture"
                    width={34}
                    height={34}
                    className="object-cover rounded-full"
                />
                <Image 
                    src={isOpen ? "/arrow-up.svg" : "arrow-down.svg"}
                    alt={isOpen ? "Arrow up icon" : "Arrow down icon"}
                    width={20}
                    height={20}
                    className="object-cover"
                />
            </div>
            
            {isOpen && (
                <div 
                    className="absolute top-[50px] text-center px-5 py-2.5 rounded-2xl bg-blue-100 w-[110px] right-0 z-10"
                    onClick={() => signOut()}
                >
                    Sign out
                </div>
            )}
        </div>
    )
}

export default SignOut;