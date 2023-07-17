"use client";

import { PostTypes } from "@/types/common.types";
import { useState } from "react";
import { Card, FormField, Loader } from ".";


const SearchPosts:React.FC<{posts: Array<PostTypes>}> = ({posts}) => {

    const [searchText, setSearchText] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Array<PostTypes>>([]);
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout>>(

    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = posts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLocaleLowerCase().includes(searchText.toLowerCase()));
                setSearchResult(searchResult);
            }, 500)
        )
    }

    const clearSearch = () => {
        setSearchText("");
    }

    return (
        <>
            <div className="mt-16">
                <FormField 
                    labelName="Search Posts"
                    type="text"
                    name="text"
                    placeholder="Search posts"
                    value={searchText}
                    handleChange={handleSearchChange}
                    isSearch={true}
                    handleClearSearch={clearSearch}
                />
            </div>
            <div className="mt-10">
                {searchText && (
                    <h2 className="font-medium text-[#666e75] text-xl mb-3">
                        Showing results for <span className="text-[#222328]">{searchText}</span>
                    </h2>
                )}
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-2">
                    {searchText ? (
                        <RenderCards data={searchResult} title="No results found"/>
                    ) : (
                        <RenderCards data={posts} title="No posts found"/>
                    )}
                </div>
            </div>
        </>
    )
}

interface RenderCardsProps {
    data: Array<PostTypes>;
    title: string;
}

const RenderCards: React.FC<RenderCardsProps> = ({data, title}) => {

    if(data?.length > 0){
        return data.map((post) => (<Card key={post._id as any as string} {...post}/>))
    }

    return (
        <h2 className="mt-5 font-bold text-[#085f99] text-xl uppercase">
            {title}
        </h2>
    )
}

export default SearchPosts;