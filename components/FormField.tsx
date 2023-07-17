import { FormFieldProps } from "@/types/common.types";

const FormField: React.FC<FormFieldProps> = ({isSearch, handleClearSearch, hasName, userName, labelName, type, name, placeholder, value, handleChange, handleSurpriseMe, isSurpriseMe}) => {

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-900"
                >
                    {hasName ? (
                        <>Hello <strong>{userName}</strong>, {labelName}</>
                    ): <>{labelName}</>}
                </label>
                {isSurpriseMe && (
                    <button
                        type="button"
                        onClick={handleSurpriseMe}
                        className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
                    >
                        Surprise me
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <input 
                    type={type} 
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#085f99] focus:border-[#085f99] outline-none block w-full p-3"
                />
                {isSearch && (
                    <button
                        type="button"
                        onClick={handleClearSearch}
                        className="font-semibold text-sm bg-[#ececf1] py-3 px-1 rounded-[5px] text-black w-[100px]"
                    >
                        Clear filter
                    </button>
                )}
            </div>
        </div>
    )
}

export default FormField;