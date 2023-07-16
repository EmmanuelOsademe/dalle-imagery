"use client";

import Link from "next/link";
import Image from "next/image";
import {logo} from "@/assets";
import {SignIn, SignOut} from ".";
import { useSession } from "next-auth/react";


const Header: React.FC = () => {
    const {data: session} = useSession();

    return (
        <header className="sticky z-10 top-0 w-full h-[73px] flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#EbEbF4]">
            <Link href="/">
                <Image 
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={20}
                    className="object-cover"
                />
            </Link>
            <div className="flex justify-end items-center gap-4">
                {session?.user ? (
                    <>
                        <SignOut session={session} />
                        <Link 
                            href="/create"
                            className="font-inter font-medium bg-[#085F99] text-white px-4 py-2 rounded-md"
                        >
                            Create
                        </Link>
                    </>
                ) : <SignIn />}
            </div>
        </header>
    )
}

export default Header;