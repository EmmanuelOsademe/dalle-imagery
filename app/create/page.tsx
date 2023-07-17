
import { CreatePost } from "@/components";


const Create: React.FC = () => {
   
    return(
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
                <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                    Create imaginative and visually stunning through DALL-E AI and share them with the community
                </p>
            </div>
            <CreatePost />
        </section>
    )
}

export default Create;