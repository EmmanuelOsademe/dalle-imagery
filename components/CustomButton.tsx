"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

interface Props {
    title: string;
    rightIcon?: string;
    handleClick: MouseEventHandler;
    type: "button" | "submit";
    bgColor?: string;
    textColor?: string;
    fontStyle?: string;
}


const CustomButton: React.FC<Props> = ({title, rightIcon, handleClick, type, bgColor, textColor, fontStyle}) => {

    return (
        <button
            type={type}
            onClick={handleClick}
            className={
                `flex items-center justify-center gap-2 w-full text-[16px] sm:w-auto px-5 py-2.5 rounded-2xl cursor-pointer
                ${bgColor || "bg-[#085F99]"}
                ${textColor || "text-white"}
                ${fontStyle || "font-medium"}
                `
            }
        >
            {title}
            {rightIcon && (
                <Image 
                    src={rightIcon}
                    alt="Button Icon"
                    width={14}
                    height={14}
                    className="object-cover"
                />
            )}
        </button>
    )
}

export default CustomButton;