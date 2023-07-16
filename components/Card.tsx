import { PostTypes } from "@/types/common.types";
import { download } from "@/assets";
import Image from "next/image";
import { downloadImage } from "@/utils";

const Card: React.FC<PostTypes> = ({_id, prompt, photo, name}) => {

    return (
        <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
            <img 
                src={photo}
                alt={prompt}
                className="w-full h-auto object-cover rounded-xl"
            />
            <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] rounded-md">
                <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
                <div className="mt-5 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
                            {name[0]}
                        </div>
                        <p className="text-white text-md">{name}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => downloadImage(String(_id), photo)}
                        className="outline-none bg-transparent border-none"
                    >
                        <Image 
                            src={download}
                            alt="download icon"
                            width={24}
                            height={24}
                            className="object-contain invert"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;